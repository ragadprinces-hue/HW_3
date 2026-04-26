from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess
import shutil

ROOT = Path('.').resolve()
PAGES = ['index.html', 'events.html', 'event.html', 'about.html', 'contact.html']

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.attrs = []
    def handle_starttag(self, tag, attrs):
        self.tags.append(tag)
        self.attrs.append((tag, dict(attrs)))
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

def parse(page):
    parser = Parser()
    parser.feed((ROOT / page).read_text(encoding='utf-8'))
    return parser

def get_attrs(parser, tag=None, attr=None):
    for t, d in parser.attrs:
        if tag and t != tag:
            continue
        if attr and attr not in d:
            continue
        yield d

results = []

def check(name, ok, detail=''):
    results.append((name, bool(ok), detail))

# Common structure and assets
for page in PAGES:
    html = (ROOT / page).read_text(encoding='utf-8')
    parser = parse(page)
    check(f'{page}: header/main/footer', all(tag in parser.tags for tag in ['header', 'main', 'footer']))
    check(f'{page}: responsive viewport meta', 'name="viewport"' in html and 'width=device-width' in html)
    check(f'{page}: Bootstrap CSS CDN', 'cdn.jsdelivr.net/npm/bootstrap' in html and 'bootstrap.min.css' in html)
    check(f'{page}: Bootstrap JS bundle', 'bootstrap.bundle.min.js' in html)
    check(f'{page}: styles.css linked', 'assets/css/styles.css' in html)
    check(f'{page}: main.js linked', 'assets/js/main.js' in html)
    check(f'{page}: Cairo/Tajawal fonts', 'fonts.googleapis.com' in html and ('Cairo' in html or 'Tajawal' in html))
    check(f'{page}: language toggle', 'data-language-toggle' in html)
    check(f'{page}: theme toggle', 'data-theme-toggle' in html)
    check(f'{page}: responsive navbar', 'navbar-toggler' in html and 'navbar-collapse' in html)

# Link and asset integrity
for page in PAGES:
    parser = parse(page)
    for d in get_attrs(parser, attr='href'):
        href = d['href'].strip()
        if not href or href.startswith(('#', 'http', 'mailto:', 'tel:', 'javascript:')):
            continue
        target = href.split('#', 1)[0].split('?', 1)[0]
        if target:
            check(f'{page}: href exists: {href}', (ROOT / target).exists(), str(ROOT / target))
    for tag, attr in [('script', 'src'), ('img', 'src')]:
        for d in get_attrs(parser, tag=tag, attr=attr):
            src = d[attr].strip()
            if not src or src.startswith(('http', 'data:')):
                continue
            target = src.split('#', 1)[0].split('?', 1)[0]
            check(f'{page}: {tag} source exists: {src}', (ROOT / target).exists(), str(ROOT / target))

# Functional structure: filtering
events_html = (ROOT / 'events.html').read_text(encoding='utf-8')
check('events: category filter', 'data-event-filter="category"' in events_html)
check('events: date filter', 'data-event-filter="date"' in events_html)
check('events: location filter', 'data-event-filter="location"' in events_html)
check('events: reset filters button', 'data-reset-event-filters' in events_html)
check('events: no-results alert', 'data-no-results' in events_html)
card_tags = re.findall(r'<(?:article|div)\b[^>]*data-event-card[^>]*>', events_html)
check('events: event cards count', len(card_tags) >= 6, f'{len(card_tags)} cards')
missing = []
for tag in card_tags:
    for attr in ['data-category', 'data-date', 'data-location']:
        if attr not in tag:
            missing.append(attr)
check('events: card filter attributes', not missing, str(missing[:5]))
check('events: event detail links', 'href="event.html"' in events_html)

# Functional structure: contact validation
contact_html = (ROOT / 'contact.html').read_text(encoding='utf-8')
check('contact: form exists', 'data-contact-form' in contact_html)
check('contact: required fields', all(f'data-contact-field="{field}"' in contact_html for field in ['name', 'email', 'message']))
check('contact: success/error alerts', 'data-contact-alert="success"' in contact_html and 'data-contact-alert="error"' in contact_html)

# Functional structure: detail actions and booking modal
event_html = (ROOT / 'event.html').read_text(encoding='utf-8')
check('event detail: calendar/share actions', 'data-event-action="calendar"' in event_html and 'data-event-action="share"' in event_html)
check('event detail: action feedback', 'data-event-action-feedback' in event_html)
check('event detail: map image', 'map-innovation-auditorium.svg' in event_html)
check('event detail: gallery images', len(re.findall(r'gallery-[\w-]+\.svg', event_html)) >= 4)
check('event detail: booking modal', 'data-booking-form' in event_html and 'modal' in event_html)

# Responsive / cross-browser readiness
css = (ROOT / 'assets/css/styles.css').read_text(encoding='utf-8')
js = (ROOT / 'assets/js/main.js').read_text(encoding='utf-8')
check('responsive: CSS media queries', css.count('@media') >= 3, f'{css.count("@media")} media queries')
check('responsive: Bootstrap grid classes in pages', any(re.search(r'\bcol-(?:\d|sm|md|lg|xl|xxl)', (ROOT / page).read_text(encoding='utf-8')) for page in PAGES))
check('responsive: RTL support', bool(re.search(r"\[dir=[\"']rtl[\"']\]", css)))
check('responsive: reduced motion support', 'prefers-reduced-motion' in css)
check('browser readiness: standards-based APIs', all(api in js for api in ['addEventListener', 'classList', 'querySelector', 'localStorage']))
check('browser readiness: no module/bundler dependency', 'type="module"' not in ''.join((ROOT / p).read_text(encoding='utf-8') for p in PAGES))
check('browser readiness: Bootstrap CDN used consistently', all('bootstrap.bundle.min.js' in (ROOT / p).read_text(encoding='utf-8') for p in PAGES))

# JavaScript checks
try:
    subprocess.run(['node', '--check', 'assets/js/main.js'], cwd=ROOT, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    check('javascript: syntax check', True)
except subprocess.CalledProcessError as e:
    check('javascript: syntax check', False, e.stderr.strip())
check('javascript: slider enhancements', all(term in js for term in ['touchstart', 'visibilitychange', 'prefersReducedMotion']))
check('javascript: filtering logic', all(term in js for term in ['initEventsFiltering', 'eventMatchesFilters', 'saveEventFilters']))
check('javascript: contact validation logic', all(term in js for term in ['initContactFormValidation', 'emailPattern', 'showFormAlert']))
check('javascript: alert helpers', all(term in js for term in ['showDynamicAlert', 'hideDynamicAlert', 'setAlertContent']))

passed = sum(1 for _, ok, _ in results if ok)
failed = [(name, detail) for name, ok, detail in results if not ok]
print(f'Passed {passed}/{len(results)} checks')
for name, ok, detail in results:
    status = 'PASS' if ok else 'FAIL'
    extra = f' - {detail}' if detail else ''
    print(f'[{status}] {name}{extra}')

report = ['# Group 13 Testing Report', '', f'Automated/static checks passed: {passed}/{len(results)}', '']
report.append('## Tested areas')
report.extend([
    '- Functional: internal links and assets, Events page filter structure, event detail links, Contact form validation hooks, Event Details actions, and booking modal structure.',
    '- Responsive: viewport metadata, Bootstrap navbar/grid usage, CSS media queries, RTL layout rules, and reduced-motion support.',
    '- Browser readiness: standards-based HTML/CSS/JavaScript patterns, Bootstrap CDN consistency, and no bundler/module dependency.',
    '- JavaScript: `node --check assets/js/main.js` syntax validation plus selector/feature coverage checks.',
    '',
])
report.append('## Browser testing note')
report.append('This environment does not provide stable launchable Firefox or Edge browsers, and Chromium headless launch was not reliable here. I completed browser-readiness checks through standards-based static validation instead. Final manual browser launch testing should still be performed on Chrome, Firefox, and Edge after deployment or in a local desktop browser.')
report.append('')
report.append('## Results')
if failed:
    report.append('Some checks failed:')
    for name, detail in failed:
        report.append(f'- FAIL: {name}' + (f' — {detail}' if detail else ''))
else:
    report.append('All available automated/static checks passed.')
report.append('')
(Path('TESTING.md')).write_text('\n'.join(report), encoding='utf-8')

raise SystemExit(0 if not failed else 1)
