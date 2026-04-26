# Deployment Guide
## Virtual University Events Guide Website

This project is ready for static deployment on GitHub Pages.

## Verified deployment structure

The project root contains:

```text
index.html
about.html
contact.html
event.html
events.html
assets/
  css/styles.css
  js/main.js
  img/
PRD.md
TASKS.md
TESTING.md
FINAL_REVIEW.md
DEPLOYMENT.md
```

## Pre-deployment checks completed

- `index.html` is located at the project root.
- All required HTML pages are located at the project root.
- `assets/css/styles.css` is linked from all pages.
- `assets/js/main.js` is linked from all pages.
- Local `href` and `src` references resolve correctly.
- JavaScript syntax check passed with `node --check assets/js/main.js`.
- The website uses only front-end technologies: HTML, CSS, JavaScript, Bootstrap CDN, and Google Fonts.

## GitHub Pages deployment steps

1. Create a new GitHub repository.
2. Upload the project files so that `index.html` is in the repository root.
3. Commit and push the files to the default branch, usually `main`.
4. Open the repository on GitHub.
5. Go to **Settings** > **Pages**.
6. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/root`
7. Save the settings.
8. Wait for GitHub Pages to publish the site.
9. Open the live Pages URL and test:
   - Navigation links
   - Home slider
   - Events filters
   - Event Details buttons and booking modal
   - Contact form validation
   - Arabic/English language toggle
   - RTL/LTR layout behavior
   - Dark mode toggle
   - Mobile responsiveness

## Important note

The actual GitHub upload, Pages enablement, and live website test must be done from the user's GitHub account. Those actions cannot be completed from this local project environment.
