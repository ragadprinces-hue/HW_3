/*
  Virtual University Events Guide Website
  Main JavaScript file.

  Shared behaviors include the responsive navbar, Home slider, Events filtering,
  Event Details action previews, Contact validation, and Arabic/English language switching.
*/

const LANGUAGE_STORAGE_KEY = 'vueg-language';
const THEME_STORAGE_KEY = 'vueg-theme';
const EVENT_FILTERS_STORAGE_KEY = 'vueg-event-filters';
let currentLanguage = 'en';

const arText = {
  'Skip to main content': 'تجاوز إلى المحتوى الرئيسي',
  'Virtual University': 'الجامعة الافتراضية',
  'Events Guide': 'دليل الفعاليات',
  'Home': 'الرئيسية',
  'Events': 'الفعاليات',
  'Event Details': 'تفاصيل الفعالية',
  'About': 'عن المنصة',
  'Contact': 'تواصل معنا',
  'Submit Event': 'إرسال فعالية',
  'Discover academic, cultural, sports, and student-life events in one accessible campus guide.': 'اكتشف الفعاليات الأكاديمية والثقافية والرياضية والطلابية في دليل جامعي واحد سهل الاستخدام.',
  'Quick Links': 'روابط سريعة',
  '© 2026 Virtual University Events Guide. All rights reserved.': '© 2026 دليل فعاليات الجامعة الافتراضية. جميع الحقوق محفوظة.',
  'Built for students, organizers, and campus communities.': 'صُمم للطلاب والمنظمين ومجتمعات الحرم الجامعي.',

  'Campus events hub': 'مركز فعاليات الحرم الجامعي',
  'Discover what is happening across your virtual campus.': 'اكتشف ما يحدث في حرمك الجامعي الافتراضي.',
  'Explore academic talks, cultural nights, sports activities, music shows, and student-led experiences in one modern university events guide.': 'استكشف المحاضرات الأكاديمية والأمسيات الثقافية والأنشطة الرياضية والعروض الموسيقية وتجارب الطلاب في دليل جامعي حديث واحد.',
  'Browse Events': 'تصفح الفعاليات',
  'View Featured': 'عرض المميز',
  'Upcoming events': 'فعاليات قادمة',
  'Main categories': 'تصنيفات رئيسية',
  'Language ready': 'يدعم اللغات',
  'This week': 'هذا الأسبوع',
  'Student Innovation Forum': 'ملتقى الابتكار الطلابي',
  'Meet student builders, explore prototype showcases, and vote for the most promising campus innovation.': 'تعرف على الطلاب المبدعين، واستكشف عروض النماذج الأولية، وصوّت لأفضل ابتكار جامعي واعد.',
  'May 08, 2026': '08 مايو 2026',
  'Virtual Main Hall': 'القاعة الافتراضية الرئيسية',
  'Featured events': 'فعاليات مميزة',
  'Hand-picked events for this month': 'فعاليات مختارة لهذا الشهر',
  'Use the slider controls to preview major academic, cultural, and student-life events.': 'استخدم أزرار العرض لمعاينة أبرز الفعاليات الأكاديمية والثقافية والطلابية.',
  'Academic': 'أكاديمي',
  'Culture': 'ثقافي',
  'Sports': 'رياضي',
  'Music': 'موسيقى',
  'Career': 'مهني',
  'Workshop': 'ورشة عمل',
  'Workshops': 'ورش عمل',
  'Volunteering': 'تطوع',
  'Technology': 'تقنية',
  'Community': 'مجتمع',
  'Online': 'عن بُعد',
  'AI Research Expo': 'معرض أبحاث الذكاء الاصطناعي',
  'Faculty mentors and student teams present practical research demos, poster sessions, and applied AI case studies.': 'يعرض أعضاء هيئة التدريس وفرق الطلاب نماذج بحثية عملية وجلسات ملصقات ودراسات تطبيقية في الذكاء الاصطناعي.',
  'Date: May 12, 2026': 'التاريخ: 12 مايو 2026',
  'Time: 10:00 AM': 'الوقت: 10:00 صباحًا',
  'Location: Innovation Auditorium': 'الموقع: قاعة الابتكار',
  'International Culture Night': 'ليلة الثقافات العالمية',
  'A student-led celebration with performances, digital booths, stories, and creative showcases from different communities.': 'احتفال طلابي يضم عروضًا وأجنحة رقمية وقصصًا وإبداعات من مجتمعات متنوعة.',
  'Date: May 18, 2026': 'التاريخ: 18 مايو 2026',
  'Time: 06:30 PM': 'الوقت: 06:30 مساءً',
  'Location: Student Center': 'الموقع: مركز الطلاب',
  'Virtual Fitness Challenge': 'تحدي اللياقة الافتراضي',
  'Join teams, track progress, and compete in friendly weekly challenges designed for remote university students.': 'انضم إلى فرق، وتابع تقدمك، وشارك في تحديات أسبوعية ودية مصممة لطلاب الجامعة عن بُعد.',
  'Date: May 22, 2026': 'التاريخ: 22 مايو 2026',
  'Time: 04:00 PM': 'الوقت: 04:00 مساءً',
  'Location: Online Arena': 'الموقع: الساحة الإلكترونية',
  'Categories': 'التصنيفات',
  'Find events by interest': 'ابحث عن الفعاليات حسب الاهتمام',
  'Quick category buttons help students jump into the experiences that match their goals and hobbies.': 'تساعد أزرار التصنيفات السريعة الطلاب على الوصول إلى التجارب التي تناسب أهدافهم وهواياتهم.',
  'Latest events': 'أحدث الفعاليات',
  'Recently added campus activities': 'أنشطة جامعية مضافة حديثًا',
  'Reusable event cards show key details clearly and link students to the event details page.': 'تعرض بطاقات الفعاليات القابلة لإعادة الاستخدام التفاصيل المهمة بوضوح وتربط الطلاب بصفحة التفاصيل.',
  'See All Events': 'عرض كل الفعاليات',
  'Design Thinking Sprint': 'تحدي التفكير التصميمي',
  'Practice problem framing, rapid ideation, and prototype feedback in a guided student workshop.': 'تدرّب على تحديد المشكلات وتوليد الأفكار السريعة وتلقي الملاحظات على النماذج في ورشة طلابية موجهة.',
  'Open Mic Evening': 'أمسية الميكروفون المفتوح',
  'Students perform music, poetry, and short spoken-word pieces in a relaxed virtual lounge.': 'يقدم الطلاب عروضًا موسيقية وشعرية ومقاطع إلقاء قصيرة في صالة افتراضية مريحة.',
  'Graduate Career Fair': 'معرض وظائف الخريجين',
  'Connect with employers, attend resume clinics, and explore internships for emerging graduates.': 'تواصل مع أصحاب العمل، واحضر عيادات السيرة الذاتية، واستكشف فرص التدريب للخريجين الجدد.',
  'Digital Lounge': 'الصالة الرقمية',
  'Design Lab': 'مختبر التصميم',
  'Career Hall': 'قاعة المسار المهني',
  'View Details': 'عرض التفاصيل',

  'All campus events': 'كل فعاليات الحرم الجامعي',
  'Find the right event for your week.': 'اعثر على الفعالية المناسبة لأسبوعك.',
  'Browse academic talks, cultural activities, sports challenges, music showcases, career sessions, and student workshops. Use filters to narrow events by category, date, and location.': 'تصفح المحاضرات الأكاديمية والأنشطة الثقافية والتحديات الرياضية والعروض الموسيقية والجلسات المهنية وورش الطلاب. استخدم المرشحات لتضييق النتائج حسب التصنيف والتاريخ والموقع.',
  'Live listing': 'قائمة مباشرة',
  'events available across campus': 'فعاليات متاحة عبر الحرم الجامعي',
  'All categories': 'كل التصنيفات',
  'Date': 'التاريخ',
  'All locations': 'كل المواقع',
  'Innovation Auditorium': 'قاعة الابتكار',
  'Student Center': 'مركز الطلاب',
  'Online Arena': 'الساحة الإلكترونية',
  'Arts Theater': 'مسرح الفنون',
  'Community Hub': 'مركز المجتمع',
  'Digital Lab': 'المختبر الرقمي',
  'Virtual Room': 'غرفة افتراضية',
  'Reset filters': 'إعادة ضبط المرشحات',
  'All': 'الكل',
  'No events match the selected filters. Try another category, date, or location.': 'لا توجد فعاليات تطابق المرشحات المحددة. جرّب تصنيفًا أو تاريخًا أو موقعًا آخر.',
  'Explore student research posters, demos, and faculty-led discussions about applied artificial intelligence.': 'استكشف ملصقات أبحاث الطلاب والعروض التجريبية والنقاشات التي يقودها أعضاء هيئة التدريس حول الذكاء الاصطناعي التطبيقي.',
  'Celebrate global student communities through performances, stories, digital booths, and creative showcases.': 'احتفل بمجتمعات الطلاب العالمية من خلال العروض والقصص والأجنحة الرقمية والمعارض الإبداعية.',
  'Join remote teams, track weekly activities, and participate in friendly wellness challenges.': 'انضم إلى فرق عن بُعد، وتابع الأنشطة الأسبوعية، وشارك في تحديات عافية ودية.',
  'Student Music Showcase': 'عرض الموسيقى الطلابي',
  'Enjoy live student performances, acoustic sessions, and collaborative digital music sets.': 'استمتع بعروض طلابية مباشرة وجلسات موسيقية وتعاونات رقمية.',
  'Meet employers, attend resume clinics, and discover internship paths for emerging graduates.': 'قابل أصحاب العمل، واحضر جلسات تحسين السيرة الذاتية، واكتشف مسارات التدريب للخريجين الجدد.',
  'UX Sprint Workshop': 'ورشة تجربة المستخدم السريعة',
  'Practice user research, wireframing, and rapid prototyping in a hands-on design sprint.': 'مارس بحث المستخدم ورسم الهياكل والنمذجة السريعة ضمن تحدي تصميم عملي.',
  'Campus Volunteer Meetup': 'لقاء التطوع الجامعي',
  'Connect with service clubs and choose upcoming community initiatives to support this semester.': 'تواصل مع أندية الخدمة واختر مبادرات مجتمعية قادمة لدعمها هذا الفصل.',
  'Tech Connect Forum': 'منتدى التواصل التقني',
  'Hear from student developers and alumni founders about building practical digital products.': 'استمع إلى مطوري الطلاب ورواد الأعمال من الخريجين حول بناء منتجات رقمية عملية.',
  'Research Methods Webinar': 'ندوة طرق البحث',
  'Learn practical planning, citation, and presentation techniques for student research projects.': 'تعلّم تقنيات عملية للتخطيط والتوثيق والعرض في مشاريع البحث الطلابية.',

  'Featured academic event': 'فعالية أكاديمية مميزة',
  'A university-wide showcase of student research, faculty innovation, and practical artificial intelligence projects designed for learning, networking, and discovery.': 'معرض جامعي لأبحاث الطلاب وابتكارات أعضاء هيئة التدريس ومشاريع الذكاء الاصطناعي العملية، مصمم للتعلم وبناء العلاقات والاكتشاف.',
  'Date & Time': 'التاريخ والوقت',
  'May 12, 2026 · 10:00 AM - 2:30 PM': '12 مايو 2026 · 10:00 صباحًا - 2:30 مساءً',
  'Location': 'الموقع',
  'Innovation Auditorium, Main Virtual Campus': 'قاعة الابتكار، الحرم الافتراضي الرئيسي',
  'Category': 'التصنيف',
  'Academic · Technology · Research': 'أكاديمي · تقنية · بحث',
  'Add to Calendar': 'إضافة إلى التقويم',
  'Share Event': 'مشاركة الفعالية',
  'Registration open': 'التسجيل مفتوح',
  'Seats are limited for live demos.': 'المقاعد محدودة للعروض المباشرة.',
  'Join early to reserve a demo walkthrough and meet participating student teams.': 'انضم مبكرًا لحجز جولة في العروض والتعرف على الفرق الطلابية المشاركة.',
  'About this event': 'عن هذه الفعالية',
  'The AI Research Expo brings together undergraduate and graduate students, instructors, and industry guests to present applied research projects. Attendees can explore poster sessions, interactive prototypes, and short talks focused on responsible AI, learning technologies, data visualization, and student-built tools.': 'يجمع معرض أبحاث الذكاء الاصطناعي طلاب البكالوريوس والدراسات العليا والمدرسين وضيوف الصناعة لعرض مشاريع بحثية تطبيقية. يمكن للحضور استكشاف جلسات الملصقات والنماذج التفاعلية والعروض القصيرة حول الذكاء الاصطناعي المسؤول وتقنيات التعلم وتصوير البيانات وأدوات الطلاب.',
  'The program is designed to be accessible for all students. You can join to learn about current research, discover collaboration opportunities, or simply get inspired by how technology is being used across academic disciplines.': 'صُمم البرنامج ليكون مناسبًا لجميع الطلاب. يمكنك الانضمام للتعرف على الأبحاث الحالية واكتشاف فرص التعاون أو الاستلهام من استخدام التقنية عبر التخصصات الأكاديمية.',
  'student demos': 'عروض طلابية',
  'faculty talks': 'محاضرات أعضاء هيئة التدريس',
  'Q&A sessions': 'جلسات أسئلة وأجوبة',
  'Gallery': 'المعرض',
  'Event gallery': 'معرض الفعالية',
  '4 images': '4 صور',
  'Prototype demos': 'عروض النماذج',
  'Faculty talks': 'محاضرات الهيئة التدريسية',
  'Poster sessions': 'جلسات الملصقات',
  'Networking': 'التواصل',
  'Event location': 'موقع الفعالية',
  'Main Virtual Campus · North Academic District': 'الحرم الافتراضي الرئيسي · المنطقة الأكاديمية الشمالية',
  'Schedule': 'الجدول',
  'Welcome and opening remarks': 'ترحيب وكلمات افتتاحية',
  'Student research demos': 'عروض أبحاث الطلاب',
  'Faculty lightning talks': 'عروض سريعة لأعضاء هيئة التدريس',
  'Poster walk and networking': 'جولة الملصقات والتواصل',
  'Keep exploring': 'واصل الاستكشاف',
  'Related events': 'فعاليات ذات صلة',
  'View all events': 'عرض كل الفعاليات',
  'Campus Tech Forum': 'منتدى التقنية الجامعي',
  'Discuss emerging digital tools, student innovation, and responsible technology practices.': 'ناقش الأدوات الرقمية الناشئة وابتكار الطلاب وممارسات التقنية المسؤولة.',
  'UX Workshop Sprint': 'ورشة تجربة المستخدم السريعة',
  'Learn practical design methods for planning, prototyping, and testing student-facing products.': 'تعلّم أساليب تصميم عملية للتخطيط والنمذجة واختبار المنتجات الموجهة للطلاب.',
  'Research Skills Webinar': 'ندوة مهارات البحث',
  'Build stronger digital research habits with library experts and academic mentors.': 'طوّر عادات بحث رقمية أقوى مع خبراء المكتبة والمرشدين الأكاديميين.',

  'About the guide': 'عن الدليل',
  'A smarter way to discover campus life.': 'طريقة أذكى لاكتشاف الحياة الجامعية.',
  'The Virtual University Events Guide brings academic talks, student activities, cultural nights, sports programs, and career opportunities into one friendly, bilingual front-end experience.': 'يجمع دليل فعاليات الجامعة الافتراضية المحاضرات الأكاديمية والأنشطة الطلابية والأمسيات الثقافية والبرامج الرياضية وفرص المسار المهني في تجربة واجهة أمامية ثنائية اللغة وسهلة الاستخدام.',
  'Explore Events': 'استكشف الفعاليات',
  'Contact Organizers': 'تواصل مع المنظمين',
  'events yearly': 'فعالية سنويًا',
  'event categories': 'تصنيفات فعاليات',
  'languages': 'لغتان',
  'student access': 'وصول الطلاب',
  'Platform description': 'وصف المنصة',
  'Built for students, organizers, and campus communities.': 'صُممت للطلاب والمنظمين ومجتمعات الحرم الجامعي.',
  'Our platform helps students quickly find events that match their interests while giving organizers a clear, reusable structure for presenting event details.': 'تساعد منصتنا الطلاب على العثور بسرعة على الفعاليات التي تناسب اهتماماتهم، وتمنح المنظمين بنية واضحة وقابلة لإعادة الاستخدام لعرض التفاصيل.',
  'The guide focuses on practical browsing, strong visual hierarchy, responsive cards, simple filters, and accessible content patterns that work in Arabic and English.': 'يركز الدليل على تصفح عملي وتسلسل بصري واضح وبطاقات متجاوبة ومرشحات بسيطة وأنماط محتوى ميسّرة تعمل بالعربية والإنجليزية.',
  'Easy discovery': 'اكتشاف سهل',
  'Events are grouped into clear categories with concise details, direct actions, and friendly navigation.': 'تُجمع الفعاليات في تصنيفات واضحة مع تفاصيل موجزة وإجراءات مباشرة وتنقل مريح.',
  'Inclusive access': 'وصول شامل',
  'Bilingual content and RTL/LTR-ready layouts make the experience useful for a wider university audience.': 'يجعل المحتوى ثنائي اللغة والتخطيطات الجاهزة للاتجاهين التجربة مفيدة لجمهور جامعي أوسع.',
  'Quality publishing': 'نشر عالي الجودة',
  'Every event should include accurate dates, location, category, description, and organizer contact path.': 'يجب أن تتضمن كل فعالية تواريخ وموقعًا وتصنيفًا ووصفًا ومسار تواصل مع المنظم بدقة.',
  'Mobile first': 'الهاتف أولًا',
  'Cards, navigation, forms, and sections are designed to stay readable and comfortable on small screens.': 'صُممت البطاقات والتنقل والنماذج والأقسام لتبقى مقروءة ومريحة على الشاشات الصغيرة.',
  'Vision & mission': 'الرؤية والرسالة',
  'Connecting every learner to meaningful university experiences.': 'ربط كل متعلم بتجارب جامعية ذات معنى.',
  'Vision': 'الرؤية',
  'A connected digital campus where no valuable event is missed.': 'حرم رقمي مترابط لا تضيع فيه أي فعالية مهمة.',
  'We imagine a university community where students can easily discover opportunities to learn, participate, network, and celebrate campus culture.': 'نتخيل مجتمعًا جامعيًا يستطيع فيه الطلاب اكتشاف فرص التعلم والمشاركة والتواصل والاحتفاء بثقافة الحرم بسهولة.',
  'Mission': 'الرسالة',
  'Make events easier to publish, browse, filter, and understand.': 'جعل نشر الفعاليات وتصفحها وتصفيتها وفهمها أكثر سهولة.',
  'The website organizes event information into consistent layouts, helpful cards, practical filters, and responsive pages that work for different languages and devices.': 'ينظم الموقع معلومات الفعاليات في تخطيطات متسقة وبطاقات مفيدة ومرشحات عملية وصفحات متجاوبة تعمل مع لغات وأجهزة مختلفة.',
  'Team': 'الفريق',
  'The people behind the guide.': 'الأشخاص خلف الدليل.',
  'A small cross-functional student services team keeps the experience clear, welcoming, and up to date.': 'يحافظ فريق صغير متعدد الاختصاصات من خدمات الطلاب على تجربة واضحة ومرحبة ومحدثة.',
  'Lina Haddad': 'لينا حداد',
  'Student Engagement Lead': 'قائدة تفاعل الطلاب',
  'Omar Saleh': 'عمر صالح',
  'Events Coordinator': 'منسق الفعاليات',
  'Maya Nasser': 'مايا ناصر',
  'Content & Translation': 'المحتوى والترجمة',
  'Sami Faris': 'سامي فارس',
  'Community Support': 'دعم المجتمع',
  'Publishing policies': 'سياسات النشر',
  'Simple rules for trustworthy event listings.': 'قواعد بسيطة لقوائم فعاليات موثوقة.',
  'Policies keep the platform useful, safe, and consistent for the whole university community.': 'تحافظ السياسات على فائدة المنصة وأمانها واتساقها للمجتمع الجامعي بأكمله.',
  'Accurate details': 'تفاصيل دقيقة',
  'Each event should include a correct title, date, time, location, category, and clear description before publishing.': 'يجب أن تتضمن كل فعالية عنوانًا وتاريخًا ووقتًا وموقعًا وتصنيفًا ووصفًا واضحًا قبل النشر.',
  'Respectful content': 'محتوى محترم',
  'Listings must be inclusive, student-friendly, and aligned with university community standards.': 'يجب أن تكون القوائم شاملة ومناسبة للطلاب ومتوافقة مع معايير المجتمع الجامعي.',
  'Timely updates': 'تحديثات في الوقت المناسب',
  'Organizers should update cancelled, postponed, or location-changed events as early as possible.': 'على المنظمين تحديث الفعاليات الملغاة أو المؤجلة أو التي تغير موقعها في أقرب وقت ممكن.',
  'Accessible communication': 'تواصل ميسّر',
  'Descriptions should be concise, readable, and understandable in both Arabic and English where available.': 'ينبغي أن تكون الأوصاف موجزة ومقروءة ومفهومة بالعربية والإنجليزية عند توفر ذلك.',

  'Contact & Event Support': 'التواصل ودعم الفعاليات',
  'Let’s help your campus event reach the right audience.': 'لنساعد فعاليتك الجامعية على الوصول إلى الجمهور المناسب.',
  'Ask a question, send feedback, or request help publishing a university event. Our student-life team reviews messages and routes them to the right organizer.': 'اطرح سؤالًا، أو أرسل ملاحظاتك، أو اطلب المساعدة في نشر فعالية جامعية. يراجع فريق الحياة الطلابية الرسائل ويوجهها إلى المنظم المناسب.',
  'Send a Message': 'أرسل رسالة',
  '24h response target': 'هدف الرد خلال 24 ساعة',
  'Campus events support desk': 'مكتب دعم فعاليات الحرم',
  'For event submissions, partnership requests, accessibility questions, and platform feedback.': 'لاستقبال طلبات الفعاليات وطلبات الشراكة وأسئلة الوصول وملاحظات المنصة.',
  'Message Form': 'نموذج الرسالة',
  'Tell us how we can help': 'أخبرنا كيف يمكننا مساعدتك',
  'All fields are required so we can understand your request and reply accurately.': 'كل الحقول مطلوبة حتى نفهم طلبك ونرد بدقة.',
  'Required fields': 'حقول مطلوبة',
  'Message ready!': 'الرسالة جاهزة!',
  'Your message passed validation. This front-end demo does not send data to a server.': 'اجتازت رسالتك التحقق. هذا العرض الأمامي لا يرسل البيانات إلى خادم.',
  'Please check the form.': 'يرجى مراجعة النموذج.',
  'Complete all fields and enter a valid email address.': 'أكمل كل الحقول وأدخل بريدًا إلكترونيًا صالحًا.',
  'Name': 'الاسم',
  'Please enter your name.': 'يرجى إدخال اسمك.',
  'Email': 'البريد الإلكتروني',
  'Please enter a valid email address.': 'يرجى إدخال بريد إلكتروني صالح.',
  'Message': 'الرسالة',
  'Please write a message.': 'يرجى كتابة رسالة.',
  'We only validate this demo in the browser; no personal data is submitted.': 'يتم التحقق من هذا العرض في المتصفح فقط؛ لا يتم إرسال أي بيانات شخصية.',
  'Send Message': 'إرسال الرسالة',
  'Contact Info': 'معلومات التواصل',
  'Reach the events team': 'تواصل مع فريق الفعاليات',
  'Use these channels for quick questions, official coordination, and social updates.': 'استخدم هذه القنوات للأسئلة السريعة والتنسيق الرسمي وتحديثات التواصل الاجتماعي.',
  'Phone': 'الهاتف',
  'Office Hours': 'ساعات العمل',
  'Sunday–Thursday, 9:00 AM–5:00 PM': 'الأحد–الخميس، 9:00 صباحًا–5:00 مساءً',
  'Follow campus updates': 'تابع تحديثات الحرم',

  'Dark': 'داكن',
  'Light': 'فاتح',
  'Book a Seat': 'احجز مقعدًا',
  'Booking preview': 'معاينة الحجز',
  'Book your seat': 'احجز مقعدك',
  'This is a front-end booking preview. It validates your entry but does not submit data to a server.': 'هذه معاينة حجز للواجهة الأمامية. تتحقق من بياناتك لكنها لا ترسل البيانات إلى خادم.',
  'Full name': 'الاسم الكامل',
  'Email address': 'البريد الإلكتروني',
  'Preferred session': 'الجلسة المفضلة',
  'Choose a session': 'اختر جلسة',
  'Student research demos': 'عروض أبحاث الطلاب',
  'Faculty lightning talks': 'عروض أعضاء هيئة التدريس السريعة',
  'Poster walk and networking': 'جولة الملصقات وبناء العلاقات',
  'Student ID': 'الرقم الجامعي',
  'Optional': 'اختياري',
  'Accessibility or attendance notes': 'ملاحظات الوصول أو الحضور',
  'Cancel': 'إلغاء',
  'Confirm Booking Preview': 'تأكيد معاينة الحجز',
  'Optional notes for the event team': 'ملاحظات اختيارية لفريق الفعالية'
};

const arAttributeText = {
  'Switch language': 'تبديل اللغة',
  'Main navigation': 'التنقل الرئيسي',
  'Toggle navigation': 'فتح أو إغلاق التنقل',
  'Virtual University Events Guide home': 'الرئيسية - دليل فعاليات الجامعة الافتراضية',
  'Featured events slider controls': 'أزرار عرض الفعاليات المميزة',
  'Previous featured event': 'الفعالية المميزة السابقة',
  'Next featured event': 'الفعالية المميزة التالية',
  'Featured event slides': 'شرائح الفعاليات المميزة',
  'Show AI Research Expo': 'عرض معرض أبحاث الذكاء الاصطناعي',
  'Show International Culture Night': 'عرض ليلة الثقافات العالمية',
  'Show Virtual Fitness Challenge': 'عرض تحدي اللياقة الافتراضي',
  'Platform highlights': 'أبرز مميزات المنصة',
  'Highlighted campus event': 'فعالية جامعية بارزة',
  'Event categories': 'تصنيفات الفعاليات',
  'Event filters': 'مرشحات الفعاليات',
  'Quick category filters': 'مرشحات التصنيف السريعة',
  'Social media links': 'روابط التواصل الاجتماعي',
  'Follow us on X': 'تابعنا على إكس',
  'Follow us on Instagram': 'تابعنا على إنستغرام',
  'Follow us on LinkedIn': 'تابعنا على لينكدإن',
  'University support desk illustration': 'رسم توضيحي لمكتب دعم الجامعة',
  'AI Research Expo event artwork': 'رسم فعالية معرض أبحاث الذكاء الاصطناعي',
  'International Culture Night event artwork': 'رسم فعالية ليلة الثقافات العالمية',
  'Virtual Fitness Challenge event artwork': 'رسم فعالية تحدي اللياقة الافتراضي',
  'Student Music Showcase event artwork': 'رسم فعالية عرض الموسيقى الطلابي',
  'Graduate Career Fair event artwork': 'رسم فعالية معرض وظائف الخريجين',
  'UX Sprint Workshop event artwork': 'رسم فعالية ورشة تجربة المستخدم السريعة',
  'Campus Volunteer Meetup event artwork': 'رسم فعالية لقاء التطوع الجامعي',
  'Tech Connect Forum event artwork': 'رسم فعالية منتدى التواصل التقني',
  'Webinar event artwork': 'رسم فعالية الندوة الإلكترونية',
  'e.g. Sara Ahmed': 'مثال: سارة أحمد',
  'Tell us about your question, event, or feedback...': 'اكتب سؤالك أو تفاصيل فعاليتك أو ملاحظاتك...',
  'Switch to dark mode': 'التبديل إلى الوضع الداكن',
  'Switch to light mode': 'التبديل إلى الوضع الفاتح',
  'Switch theme': 'تبديل المظهر',
  'Close booking modal': 'إغلاق نافذة الحجز',
  'Event booking form': 'نموذج حجز الفعالية',
  'Scroll to top': 'العودة إلى الأعلى',
  'student@virtualuniversity.edu': 'student@virtualuniversity.edu'
};

const arTitles = {
  'Home | Virtual University Events Guide': 'الرئيسية | دليل فعاليات الجامعة الافتراضية',
  'Events | Virtual University Events Guide': 'الفعاليات | دليل فعاليات الجامعة الافتراضية',
  'Event Details | Virtual University Events Guide': 'تفاصيل الفعالية | دليل فعاليات الجامعة الافتراضية',
  'About | Virtual University Events Guide': 'عن المنصة | دليل فعاليات الجامعة الافتراضية',
  'Contact | Virtual University Events Guide': 'تواصل معنا | دليل فعاليات الجامعة الافتراضية'
};

// Attributes translated alongside visible text so accessibility labels and form hints stay bilingual.
const translatedAttributes = ['aria-label', 'alt', 'placeholder', 'title'];
let originalDocumentTitle = '';

// Language preference helpers keep Arabic/English selection persistent without requiring a backend.
function getStoredLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'ar' ? 'ar' : 'en';
  } catch (error) {
    return 'en';
  }
}

function saveLanguage(language) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    // Local storage may be unavailable in some browsers or privacy modes.
  }
}

function translateOriginalText(originalText, language) {
  if (language !== 'ar') return originalText;
  return arText[originalText] || originalText;
}

function translateOriginalAttribute(originalText, language) {
  if (language !== 'ar') return originalText;
  return arAttributeText[originalText] || arText[originalText] || originalText;
}

function preserveWhitespace(originalValue, translatedValue) {
  const leadingSpace = originalValue.match(/^\s*/)?.[0] || '';
  const trailingSpace = originalValue.match(/\s*$/)?.[0] || '';
  return `${leadingSpace}${translatedValue}${trailingSpace}`;
}

// Translates only visible text nodes while preserving whitespace and avoiding script/style content.
function translateTextNodes(language) {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    }
  );

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    if (!node.originalTextValue) {
      node.originalTextValue = node.nodeValue;
    }

    const originalValue = node.originalTextValue;
    const originalTrimmed = originalValue.trim();
    const translated = translateOriginalText(originalTrimmed, language);
    node.nodeValue = preserveWhitespace(originalValue, translated);
  });
}

function translateAttributes(language) {
  const elements = document.querySelectorAll('*');

  elements.forEach((element) => {
    translatedAttributes.forEach((attributeName) => {
      if (!element.hasAttribute(attributeName)) return;

      if (!element.originalI18nAttributes) {
        element.originalI18nAttributes = {};
      }

      if (!element.originalI18nAttributes[attributeName]) {
        element.originalI18nAttributes[attributeName] = element.getAttribute(attributeName);
      }

      const originalValue = element.originalI18nAttributes[attributeName];
      element.setAttribute(attributeName, translateOriginalAttribute(originalValue, language));
    });
  });
}

function getLocalizedEventCount(visibleCount) {
  if (currentLanguage === 'ar') {
    if (visibleCount === 0) return 'عرض 0 فعالية';
    if (visibleCount === 1) return 'عرض فعالية واحدة';
    if (visibleCount === 2) return 'عرض فعاليتين';
    return `عرض ${visibleCount} فعاليات`;
  }

  const noun = visibleCount === 1 ? 'event' : 'events';
  return `Showing ${visibleCount} ${noun}`;
}

function getEventActionMessage(action) {
  const messages = {
    en: {
      calendar: 'Calendar action preview: this UI-only button is ready for a future calendar integration.',
      share: 'Share action preview: this UI-only button is ready for a future sharing workflow.',
      default: 'Action preview is ready.',
    },
    ar: {
      calendar: 'معاينة إجراء التقويم: هذا الزر واجهة فقط وجاهز لتكامل تقويم مستقبلي.',
      share: 'معاينة إجراء المشاركة: هذا الزر واجهة فقط وجاهز لمسار مشاركة مستقبلي.',
      default: 'معاينة الإجراء جاهزة.',
    },
  };

  return messages[currentLanguage][action] || messages[currentLanguage].default;
}

// Applies both text translation and document direction so AR uses RTL and EN uses LTR.
function applyLanguage(language) {
  currentLanguage = language;
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  document.documentElement.lang = language;
  document.documentElement.dir = direction;
  document.body.dir = direction;
  document.body.dataset.language = language;

  document.title = language === 'ar' ? (arTitles[originalDocumentTitle] || originalDocumentTitle) : originalDocumentTitle;

  translateTextNodes(language);
  translateAttributes(language);

  if (window.refreshEventsListingLanguage) {
    window.refreshEventsListingLanguage();
  }

  if (window.refreshEventDetailsLanguage) {
    window.refreshEventDetailsLanguage();
  }

  const languageToggle = document.querySelector('[data-language-toggle]');
  if (languageToggle) {
    languageToggle.textContent = language === 'ar' ? 'EN' : 'AR';
    languageToggle.setAttribute('aria-label', getUiMessage(language === 'ar' ? 'switchLanguageToEnglish' : 'switchLanguageToArabic'));
  }

  if (window.refreshEventFilters) {
    window.refreshEventFilters();
  }

  if (window.refreshFeaturedSliderLanguage) {
    window.refreshFeaturedSliderLanguage();
  }

  if (window.refreshThemeToggle) {
    window.refreshThemeToggle();
  }

  if (window.refreshScrollToTopLabel) {
    window.refreshScrollToTopLabel();
  }
}

function initLanguageSwitcher() {
  originalDocumentTitle = document.title;
  const languageToggle = document.querySelector('[data-language-toggle]');
  const initialLanguage = getStoredLanguage();

  applyLanguage(initialLanguage);

  languageToggle?.addEventListener('click', () => {
    const nextLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    saveLanguage(nextLanguage);
    applyLanguage(nextLanguage);
  });
}

// Initialize page-safe modules; each init exits early when its matching markup is not present.
document.addEventListener('DOMContentLoaded', () => {
  initResponsiveNavbar();
  initLanguageSwitcher();
  initThemeToggle();
  initScrollToTop();
  initFeaturedSliderDynamic();
  initFeaturedSlider();
  initEventsFiltering();
  initEventDetailsRendering();
  initEventDetailActions();
  initBookingModal();
  initContactFormValidation();
  initHomeEvents();
});

function initEventDetailsRendering() {
  const title = document.getElementById('eventTitle');
  if (!title) return;

  const events = getProjectEvents();
  if (events.length === 0) return;

  const render = () => {
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get('id');
    const event = events.find((item) => item.id === requestedId) || events[0];
    const text = getLocalizedEventText(event);

    const breadcrumb = document.getElementById('eventBreadcrumbTitle');
    if (breadcrumb) breadcrumb.textContent = text.title;
    title.textContent = text.title;

    const lead = document.getElementById('eventLead');
    if (lead) lead.textContent = text.description;

    const dateTime = document.getElementById('eventDateTime');
    if (dateTime) dateTime.textContent = `${formatEventDateLong(event.date)} · ${event.time}`;

    const locationLabel = getMetaLabel('locations', event.location);
    const categoryLabel = getMetaLabel('categories', event.category);

    const location = document.getElementById('eventLocation');
    if (location) location.textContent = locationLabel;

    const category = document.getElementById('eventCategory');
    if (category) category.textContent = categoryLabel;

    const heroImage = document.getElementById('eventHeroImage');
    if (heroImage) {
      heroImage.src = event.image;
      heroImage.alt = text.title;
    }

    const about = document.getElementById('eventAboutText');
    if (about) about.textContent = text.full || text.description;

    const aboutExtra = document.getElementById('eventAboutTextExtra');
    if (aboutExtra) {
      aboutExtra.classList.add('d-none');
    }

    const sidebarLocationTitle = document.getElementById('eventSidebarLocationTitle');
    if (sidebarLocationTitle) sidebarLocationTitle.textContent = locationLabel;

    const bookingBadge = document.getElementById('bookingEventBadge');
    if (bookingBadge) bookingBadge.textContent = text.title;

    const relatedGrid = document.querySelector('[data-related-events-grid]');
    if (relatedGrid) {
      const related = events.filter((item) => item.id !== event.id).slice(0, 3);
      relatedGrid.innerHTML = related.map((item) => {
        const relatedText = getLocalizedEventText(item);
        const relatedCategory = getMetaLabel('categories', item.category);
        return `
          <div class="col-md-6 col-xl-4">
            <article class="event-card event-list-card h-100 related-event-card">
              <img class="event-card-img" src="${escapeHtml(item.image)}" alt="${escapeHtml(relatedText.title)}" width="900" height="560" decoding="async" loading="lazy">
              <div class="event-card-body">
                <div class="d-flex justify-content-between align-items-start gap-3">
                  <span class="badge rounded-pill ${getCategoryBadgeClass(item.category)}">${escapeHtml(relatedCategory)}</span>
                  <span class="event-date">${escapeHtml(formatEventDateShort(item.date))}</span>
                </div>
                <h2>${escapeHtml(relatedText.title)}</h2>
                <p>${escapeHtml(relatedText.description)}</p>
                <a class="btn btn-primary stretched-link" href="event.html?id=${encodeURIComponent(item.id)}">${escapeHtml(getViewDetailsLabel())}</a>
              </div>
            </article>
          </div>
        `;
      }).join('');
    }

    // ✅ GALLERY FIX STARTS HERE
    const galleryGrid = document.querySelector('[data-event-gallery]');
    const galleryCount = document.querySelector('[data-gallery-count]');

    if (galleryGrid && Array.isArray(event.gallery)) {
      const captions = [
        'Prototype demos',
        'Faculty talks',
        'Poster sessions',
        'Networking',
      ];

      galleryGrid.innerHTML = event.gallery.slice(0, 4).map((image, index) => `
      <figure class="gallery-item ${index === 0 ? 'gallery-item-large' : ''}">
        <img 
          src="${escapeHtml(image)}" 
          alt="${escapeHtml(text.title)} gallery image ${index + 1}" 
          width="900" 
          height="620" 
          decoding="async" 
          loading="lazy">
        <figcaption>${escapeHtml(captions[index] || `Gallery image ${index + 1}`)}</figcaption>
      </figure>
    `).join('');

      if (galleryCount) {
        galleryCount.textContent = `${Math.min(event.gallery.length, 4)} images`;
      }
    }
    // ✅ GALLERY FIX ENDS HERE
  };

  window.refreshEventDetailsLanguage = render;
  render();
}

// Keeps the responsive menu usable with Bootstrap JS and with the local CSS fallback.
function initResponsiveNavbar() {
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  if (!navbarCollapse) return;

  const hasBootstrapCollapse = () => typeof bootstrap !== 'undefined' && Boolean(bootstrap.Collapse);

  const showMenu = () => {
    navbarCollapse.classList.add('show');
    navbarToggler?.setAttribute('aria-expanded', 'true');
  };

  const hideMenu = () => {
    if (hasBootstrapCollapse()) {
      bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
    } else {
      navbarCollapse.classList.remove('show');
    }
    navbarToggler?.setAttribute('aria-expanded', 'false');
  };

  navbarToggler?.addEventListener('click', () => {
    if (hasBootstrapCollapse()) return;
    navbarCollapse.classList.contains('show') ? hideMenu() : showMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (!navbarCollapse.classList.contains('show')) return;
      hideMenu();
    });
  });
}


function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function escapeHtml(value) {
  const element = document.createElement('span');
  element.textContent = String(value);
  return element.innerHTML;
}

function getProjectEvents() {
  if (Array.isArray(window.VUEG_EVENTS) && window.VUEG_EVENTS.length > 0) {
    return window.VUEG_EVENTS;
  }

  if (typeof EVENTS !== 'undefined' && Array.isArray(EVENTS) && EVENTS.length > 0) {
    return EVENTS;
  }

  return [];
}

function getProjectEventMeta() {
  if (window.VUEG_EVENT_META && typeof window.VUEG_EVENT_META === 'object') {
    return window.VUEG_EVENT_META;
  }
  return { categories: {}, locations: {} };
}

function getLocalizedEventText(event) {
  if (!event) {
    return { title: '', description: '', full: '' };
  }

  const localized = currentLanguage === 'ar' ? event.ar : event.en;
  return localized || event.en || event.ar || { title: '', description: '', full: '' };
}

function getMetaLabel(group, key) {
  const meta = getProjectEventMeta();
  const entry = meta?.[group]?.[key];
  if (!entry) return key;
  if (currentLanguage === 'ar') return entry.ar || entry.en || key;
  return entry.en || entry.ar || key;
}

function formatEventDateShort(dateString) {
  const locale = currentLanguage === 'ar' ? 'ar' : 'en-US';
  const date = new Date(`${dateString}T00:00:00`);

  try {
    return new Intl.DateTimeFormat(locale, { month: 'short', day: '2-digit' }).format(date);
  } catch (error) {
    return dateString;
  }
}

function formatEventDateLong(dateString) {
  const locale = currentLanguage === 'ar' ? 'ar' : 'en-US';
  const date = new Date(`${dateString}T00:00:00`);

  try {
    return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  } catch (error) {
    return dateString;
  }
}

function getCategoryBadgeClass(category) {
  const map = {
    tech: 'text-bg-secondary',
    culture: 'text-bg-success',
    sports: 'text-bg-info',
    music: 'text-bg-danger',
    community: 'text-bg-primary',
    career: 'text-bg-warning',
  };
  return map[category] || 'text-bg-primary';
}

function getViewDetailsLabel() {
  return currentLanguage === 'ar' ? 'عرض التفاصيل' : 'View Details';
}

function renderEventsGridFromDataset(eventsGrid, events) {
  if (!eventsGrid) return;

  eventsGrid.innerHTML = events.map((event) => {
    const text = getLocalizedEventText(event);
    const categoryLabel = getMetaLabel('categories', event.category);
    const locationLabel = getMetaLabel('locations', event.location);
    const shortDate = formatEventDateShort(event.date);
    const longDate = formatEventDateLong(event.date);

    return `
      <div class="col-md-6 col-xl-4" data-event-card data-event-id="${escapeHtml(event.id)}" data-category="${escapeHtml(event.category)}" data-date="${escapeHtml(event.date)}" data-location="${escapeHtml(event.location)}">
        <article class="event-card event-list-card h-100">
          <img class="event-card-img" src="${escapeHtml(event.image)}" alt="${escapeHtml(text.title)}" width="900" height="560" decoding="async" loading="lazy">
          <div class="event-card-body">
            <div class="d-flex justify-content-between align-items-start gap-3">
              <span class="badge rounded-pill ${getCategoryBadgeClass(event.category)}">${escapeHtml(categoryLabel)}</span>
              <span class="event-date">${escapeHtml(shortDate)}</span>
            </div>
            <h2>${escapeHtml(text.title)}</h2>
            <p>${escapeHtml(text.description)}</p>
            <div class="event-meta-list compact">
              <span>${escapeHtml(longDate)}</span>
              <span>${escapeHtml(locationLabel)}</span>
            </div>
            <a class="btn btn-primary stretched-link" href="event.html?id=${encodeURIComponent(event.id)}">${escapeHtml(getViewDetailsLabel())}</a>
          </div>
        </article>
      </div>
    `;
  }).join('');
}

function updateEventCardFromDataset(card, event) {
  if (!card || !event) return;
  const text = getLocalizedEventText(event);

  card.dataset.category = event.category;
  card.dataset.date = event.date;
  card.dataset.location = event.location;

  const badge = card.querySelector('.badge');
  if (badge) {
    badge.className = `badge rounded-pill ${getCategoryBadgeClass(event.category)}`;
    badge.textContent = getMetaLabel('categories', event.category);
  }

  const dateEl = card.querySelector('.event-date');
  if (dateEl) dateEl.textContent = formatEventDateShort(event.date);

  const title = card.querySelector('h2');
  if (title) title.textContent = text.title;

  const description = card.querySelector('p');
  if (description) description.textContent = text.description;

  const metaSpans = card.querySelectorAll('.event-meta-list span');
  if (metaSpans.length >= 2) {
    metaSpans[0].textContent = formatEventDateLong(event.date);
    metaSpans[1].textContent = getMetaLabel('locations', event.location);
  }

  const img = card.querySelector('img');
  if (img) {
    img.src = event.image;
    img.alt = text.title;
  }

  const link = card.querySelector('a.btn');
  if (link) {
    link.href = `event.html?id=${encodeURIComponent(event.id)}`;
    link.textContent = getViewDetailsLabel();
  }
}

// Central UI message dictionary for dynamic labels, alerts, and status text.
function getUiMessage(key, replacements = {}) {
  const messages = {
    en: {
      sliderStatus: 'Slide {current} of {total}: {title}',
      activeFilters: 'Active filters',
      categoryFilter: 'Category',
      dateFilter: 'Date',
      locationFilter: 'Location',
      removeFilter: 'Remove {label} filter',
      resetReady: 'Clear all selected filters',
      contactSuccessTitle: 'Message ready!',
      contactSuccessMessage: 'Your message passed validation. This front-end demo does not send data to a server.',
      contactErrorTitle: 'Please check the form.',
      contactErrorMessage: 'Complete all fields and enter a valid email address.',
      actionReadyTitle: 'Action ready',
      themeDarkLabel: 'Dark',
      themeLightLabel: 'Light',
      themeSwitchToDark: 'Switch to dark mode',
      themeSwitchToLight: 'Switch to light mode',
      switchLanguageToArabic: 'Switch language to Arabic',
      switchLanguageToEnglish: 'Switch language to English',
      scrollToTop: 'Scroll to top',
      bookingSuccessTitle: 'Booking preview ready!',
      bookingSuccessMessage: 'Your seat request passed validation. This demo keeps booking UI front-end only.',
      bookingErrorTitle: 'Please check your booking details.',
      bookingErrorMessage: 'Enter your name, a valid email address, and choose a preferred session.',
    },
    ar: {
      sliderStatus: 'الشريحة {current} من {total}: {title}',
      activeFilters: 'المرشحات النشطة',
      categoryFilter: 'التصنيف',
      dateFilter: 'التاريخ',
      locationFilter: 'الموقع',
      removeFilter: 'إزالة مرشح {label}',
      resetReady: 'مسح كل المرشحات المحددة',
      contactSuccessTitle: 'الرسالة جاهزة!',
      contactSuccessMessage: 'اجتازت رسالتك التحقق. هذا العرض الأمامي لا يرسل البيانات إلى خادم.',
      contactErrorTitle: 'يرجى مراجعة النموذج.',
      contactErrorMessage: 'أكمل كل الحقول وأدخل بريدًا إلكترونيًا صالحًا.',
      actionReadyTitle: 'الإجراء جاهز',
      themeDarkLabel: 'داكن',
      themeLightLabel: 'فاتح',
      themeSwitchToDark: 'التبديل إلى الوضع الداكن',
      themeSwitchToLight: 'التبديل إلى الوضع الفاتح',
      switchLanguageToArabic: 'التبديل إلى اللغة العربية',
      switchLanguageToEnglish: 'التبديل إلى اللغة الإنجليزية',
      scrollToTop: 'العودة إلى الأعلى',
      bookingSuccessTitle: 'معاينة الحجز جاهزة!',
      bookingSuccessMessage: 'اجتاز طلب مقعدك التحقق. يحافظ هذا العرض على واجهة الحجز فقط.',
      bookingErrorTitle: 'يرجى مراجعة تفاصيل الحجز.',
      bookingErrorMessage: 'أدخل اسمك وبريدًا إلكترونيًا صالحًا واختر جلسة مفضلة.',
    },
  };

  const template = messages[currentLanguage]?.[key] || messages.en[key] || key;
  return Object.entries(replacements).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, value),
    template
  );
}

// Shared alert renderer keeps contact, booking, and event-action feedback consistent.
function setAlertContent(alertElement, { variant = 'success', title = '', message = '' }) {
  if (!alertElement) return;

  alertElement.classList.remove('alert-success', 'alert-danger', 'alert-warning', 'alert-info');
  alertElement.classList.add(`alert-${variant}`);
  alertElement.innerHTML = `<strong>${escapeHtml(title)}</strong>${message ? ` ${escapeHtml(message)}` : ''}`;
}

function showDynamicAlert(alertElement, options) {
  if (!alertElement) return;

  const { autohide = 0 } = options;
  setAlertContent(alertElement, options);
  alertElement.classList.remove('d-none');

  if (alertElement.hideTimerId) {
    window.clearTimeout(alertElement.hideTimerId);
  }

  if (autohide > 0) {
    alertElement.hideTimerId = window.setTimeout(() => {
      alertElement.classList.add('d-none');
      alertElement.hideTimerId = null;
    }, autohide);
  }
}

function hideDynamicAlert(alertElement) {
  if (!alertElement) return;

  alertElement.classList.add('d-none');
  if (alertElement.hideTimerId) {
    window.clearTimeout(alertElement.hideTimerId);
    alertElement.hideTimerId = null;
  }
}

// Theme preference helpers support the bonus dark-mode toggle with graceful fallbacks.
function getStoredTheme() {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
  } catch (error) {
    // Local storage may be unavailable.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    // Local storage may be unavailable.
  }
}

function updateThemeToggle(theme) {
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const themeIcon = document.querySelector('[data-theme-toggle-icon]');
  const themeLabel = document.querySelector('[data-theme-toggle-label]');
  if (!themeToggle) return;

  const isDark = theme === 'dark';
  const labelKey = isDark ? 'themeLightLabel' : 'themeDarkLabel';
  const ariaKey = isDark ? 'themeSwitchToLight' : 'themeSwitchToDark';

  const currentTheme = document.documentElement.getAttribute('data-theme');

  if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
  if (themeLabel) themeLabel.textContent = getUiMessage(labelKey);
  themeToggle.setAttribute('aria-label', getUiMessage(ariaKey));
  themeToggle.setAttribute('title', getUiMessage(ariaKey));
  themeToggle.setAttribute('aria-pressed', String(isDark));
  updateLogoByTheme(currentTheme);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.body.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  updateThemeToggle(theme);
}

function initThemeToggle() {
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const initialTheme = getStoredTheme();

  applyTheme(initialTheme);
  window.refreshThemeToggle = () => updateThemeToggle(document.body.dataset.theme || initialTheme);

  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.body.dataset.theme === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });
}

// Progressive scroll-to-top control is injected by JS so pages stay clean and reusable.
function initScrollToTop() {
  const button = document.createElement('button');
  button.className = 'scroll-to-top';
  button.type = 'button';
  button.setAttribute('data-scroll-to-top', '');
  button.innerHTML = '<span aria-hidden="true">↑</span>';
  document.body.append(button);

  const updateLabel = () => button.setAttribute('aria-label', getUiMessage('scrollToTop'));
  const updateVisibility = () => button.classList.toggle('is-visible', window.scrollY > 420);

  window.refreshScrollToTopLabel = updateLabel;
  updateLabel();
  updateVisibility();

  window.addEventListener('scroll', updateVisibility, { passive: true });
  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });
}

// Saved event filters improve return visits on the Events page without server storage.
function getStoredEventFilters() {
  try {
    const savedFilters = JSON.parse(localStorage.getItem(EVENT_FILTERS_STORAGE_KEY) || '{}');
    return {
      category: savedFilters.category || 'all',
      date: savedFilters.date || '',
      location: savedFilters.location || 'all',
    };
  } catch (error) {
    return { category: 'all', date: '', location: 'all' };
  }
}

function saveEventFilters(filters) {
  try {
    localStorage.setItem(EVENT_FILTERS_STORAGE_KEY, JSON.stringify(filters));
  } catch (error) {
    // Local storage may be unavailable.
  }
}

function getSelectedOptionText(selectElement) {
  if (!selectElement) return '';
  return selectElement.options[selectElement.selectedIndex]?.textContent.trim() || '';
}

function formatReadableDate(dateValue) {
  if (!dateValue) return '';

  const [year, month, day] = dateValue.split('-').map(Number);
  if (!year || !month || !day) return dateValue;

  const date = new Date(Date.UTC(year, month - 1, day));
  const locale = currentLanguage === 'ar' ? 'ar' : 'en';
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

// Accessible featured-events carousel with autoplay, keyboard, touch, and reduced-motion support.
function initFeaturedSlider() {
  const slider = document.querySelector('[data-featured-slider]');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('[data-featured-slide]'));
  const dots = Array.from(slider.querySelectorAll('[data-slider-dot]'));
  const previousButton = document.querySelector('[data-slider-prev]');
  const nextButton = document.querySelector('[data-slider-next]');

  if (slides.length === 0) return;

  slider.setAttribute('role', 'region');
  slider.setAttribute('aria-roledescription', 'carousel');
  slider.tabIndex = slider.tabIndex >= 0 ? slider.tabIndex : 0;

  const status = document.createElement('p');
  status.className = 'visually-hidden';
  status.setAttribute('aria-live', 'polite');
  slider.append(status);

  const progress = document.createElement('span');
  progress.className = 'featured-slider-progress';
  progress.setAttribute('aria-hidden', 'true');
  slider.append(progress);

  slides.forEach((slide, index) => {
    if (!slide.id) slide.id = `featured-slide-${index + 1}`;
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${index + 1} / ${slides.length}`);
  });

  dots.forEach((dot, index) => {
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-controls', slides[index]?.id || '');
  });

  let currentIndex = 0;
  let autoplayId = null;
  let isInteractionPaused = false;
  let touchStartX = 0;
  let touchStartY = 0;
  const autoplayDelay = 6500;

  const updateProgress = () => {
    progress.classList.remove('is-running');
    progress.style.setProperty('--slider-delay', `${autoplayDelay}ms`);

    if (!autoplayId || prefersReducedMotion()) return;

    window.requestAnimationFrame(() => {
      progress.classList.add('is-running');
    });
  };

  const showSlide = (targetIndex, options = {}) => {
    const { announce = true } = options;
    currentIndex = (targetIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
      slide.tabIndex = isActive ? 0 : -1;
    });

    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
      dot.tabIndex = isActive ? 0 : -1;
    });

    const activeTitle = slides[currentIndex].querySelector('h3, h2')?.textContent.trim() || '';
    if (announce) {
      status.textContent = getUiMessage('sliderStatus', {
        current: String(currentIndex + 1),
        total: String(slides.length),
        title: activeTitle,
      });
    }

    updateProgress();
  };

  const nextSlide = () => showSlide(currentIndex + 1);
  const previousSlide = () => showSlide(currentIndex - 1);

  const stopAutoplay = () => {
    if (!autoplayId) return;
    window.clearInterval(autoplayId);
    autoplayId = null;
    updateProgress();
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (prefersReducedMotion() || document.hidden || isInteractionPaused || slides.length < 2) return;
    autoplayId = window.setInterval(nextSlide, autoplayDelay);
    updateProgress();
  };

  nextButton?.addEventListener('click', () => {
    nextSlide();
    startAutoplay();
  });

  previousButton?.addEventListener('click', () => {
    previousSlide();
    startAutoplay();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetIndex = Number(dot.dataset.sliderDot);
      if (Number.isNaN(targetIndex)) return;
      showSlide(targetIndex);
      startAutoplay();
    });
  });

  const pauseForInteraction = () => {
    isInteractionPaused = true;
    stopAutoplay();
  };

  const resumeAfterInteraction = () => {
    isInteractionPaused = false;
    startAutoplay();
  };

  slider.addEventListener('mouseenter', pauseForInteraction);
  slider.addEventListener('mouseleave', resumeAfterInteraction);
  slider.addEventListener('focusin', pauseForInteraction);
  slider.addEventListener('focusout', resumeAfterInteraction);

  slider.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      currentLanguage === 'ar' ? previousSlide() : nextSlide();
      startAutoplay();
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      currentLanguage === 'ar' ? nextSlide() : previousSlide();
      startAutoplay();
    }

    if (event.key === 'Home') {
      event.preventDefault();
      showSlide(0);
      startAutoplay();
    }

    if (event.key === 'End') {
      event.preventDefault();
      showSlide(slides.length - 1);
      startAutoplay();
    }
  });

  slider.addEventListener('touchstart', (event) => {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    pauseForInteraction();
  }, { passive: true });

  slider.addEventListener('touchend', (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
      const swipedForward = currentLanguage === 'ar' ? deltaX > 0 : deltaX < 0;
      swipedForward ? nextSlide() : previousSlide();
    }

    resumeAfterInteraction();
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAutoplay() : startAutoplay();
  });

  window.refreshFeaturedSliderLanguage = () => showSlide(currentIndex, { announce: false });

  showSlide(0, { announce: false });
  startAutoplay();
}
// Events listing filter system updates cards, result counts, filter chips, and saved preferences.
function initEventsFiltering() {
  const categoryFilter = document.querySelector('[data-event-filter="category"]');
  const dateFilter = document.querySelector('[data-event-filter="date"]');
  const locationFilter = document.querySelector('[data-event-filter="location"]');
  const resetButton = document.querySelector('[data-reset-event-filters]');
  const resultCount = document.querySelector('[data-filter-count]');
  const noResults = document.querySelector('[data-no-results]');
  const quickCategoryButtons = Array.from(document.querySelectorAll('[data-quick-category]'));
  const totalCount = document.querySelector('#eventsTotalCount');
  const eventsGrid = document.querySelector('[data-events-grid]');

  const updateFilterOptionLabels = () => {
    if (categoryFilter) {
      Array.from(categoryFilter.options).forEach((option) => {
        if (!option.value || option.value === 'all') return;
        option.textContent = getMetaLabel('categories', option.value);
      });
    }

    if (locationFilter) {
      Array.from(locationFilter.options).forEach((option) => {
        if (!option.value || option.value === 'all') return;
        option.textContent = getMetaLabel('locations', option.value);
      });
    }
  };

  updateFilterOptionLabels();

  const datasetEvents = getProjectEvents();
  let cards = Array.from(document.querySelectorAll('[data-event-card]'));

  if (cards.length === 0 && eventsGrid && datasetEvents.length > 0) {
    renderEventsGridFromDataset(eventsGrid, datasetEvents);
    cards = Array.from(eventsGrid.querySelectorAll('[data-event-card]'));
  }

  if (cards.length === 0) return;

  if (totalCount) {
    totalCount.textContent = String(cards.length);
  }

  const activeFilters = document.createElement('div');
  activeFilters.className = 'active-filter-summary d-none';
  activeFilters.setAttribute('data-active-filters', '');
  activeFilters.setAttribute('aria-live', 'polite');

  if (eventsGrid) {
    eventsGrid.parentNode.insertBefore(activeFilters, eventsGrid);
  }

  const setQuickCategoryState = (activeCategory) => {
    quickCategoryButtons.forEach((button) => {
      const isActive = button.dataset.quickCategory === activeCategory;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  const getFilters = () => ({
    category: categoryFilter?.value || 'all',
    date: dateFilter?.value || '',
    location: locationFilter?.value || 'all',
  });

  const hasActiveFilters = (filters) => (
    filters.category !== 'all' || Boolean(filters.date) || filters.location !== 'all'
  );

  const setSelectValue = (selectElement, value, fallback = 'all') => {
    if (!selectElement) return;
    const hasValue = Array.from(selectElement.options).some((option) => option.value === value);
    selectElement.value = hasValue ? value : fallback;
  };

  const applyStoredFilters = (filters) => {
    setSelectValue(categoryFilter, filters.category, 'all');
    setSelectValue(locationFilter, filters.location, 'all');
    if (dateFilter) dateFilter.value = filters.date || '';
  };

  const eventMatchesFilters = (card, filters) => {
    const matchesCategory = filters.category === 'all' || card.dataset.category === filters.category;
    const matchesDate = !filters.date || card.dataset.date === filters.date;
    const matchesLocation = filters.location === 'all' || card.dataset.location === filters.location;

    return matchesCategory && matchesDate && matchesLocation;
  };

  const buildFilterChips = (filters) => {
    const chips = [];

    if (filters.category !== 'all') {
      chips.push({
        key: 'category',
        label: getUiMessage('categoryFilter'),
        value: getSelectedOptionText(categoryFilter),
      });
    }

    if (filters.date) {
      chips.push({
        key: 'date',
        label: getUiMessage('dateFilter'),
        value: formatReadableDate(filters.date),
      });
    }

    if (filters.location !== 'all') {
      chips.push({
        key: 'location',
        label: getUiMessage('locationFilter'),
        value: getSelectedOptionText(locationFilter),
      });
    }

    return chips;
  };

  const updateActiveFilterSummary = (filters) => {
    const chips = buildFilterChips(filters);
    activeFilters.classList.toggle('d-none', chips.length === 0);

    if (chips.length === 0) {
      activeFilters.innerHTML = '';
      return;
    }

    activeFilters.innerHTML = `
      <span class="active-filter-label">${escapeHtml(getUiMessage('activeFilters'))}</span>
      <div class="active-filter-chip-list">
        ${chips.map((chip) => `
          <button class="active-filter-chip" type="button" data-remove-filter="${chip.key}" aria-label="${escapeHtml(getUiMessage('removeFilter', { label: chip.label }))}">
            <span>${escapeHtml(chip.label)}: ${escapeHtml(chip.value)}</span>
            <strong aria-hidden="true">×</strong>
          </button>
        `).join('')}
      </div>
    `;
  };

  const updateEvents = () => {
    const filters = getFilters();
    let visibleCount = 0;

    cards.forEach((card) => {
      const isVisible = eventMatchesFilters(card, filters);
      card.classList.toggle('d-none', !isVisible);
      card.querySelector('.event-card')?.classList.toggle('is-filtered-out', !isVisible);
      if (isVisible) visibleCount += 1;
    });

    if (resultCount) {
      resultCount.textContent = getLocalizedEventCount(visibleCount);
    }

    noResults?.classList.toggle('d-none', visibleCount !== 0);
    setQuickCategoryState(filters.category);
    updateActiveFilterSummary(filters);

    if (resetButton) {
      resetButton.disabled = !hasActiveFilters(filters);
      resetButton.setAttribute('aria-label', getUiMessage('resetReady'));
    }

    saveEventFilters(filters);
  };

  window.refreshEventFilters = updateEvents;

  window.refreshEventsListingLanguage = () => {
    updateFilterOptionLabels();
    const events = getProjectEvents();
    cards.forEach((card) => {
      const eventId = card.dataset.eventId;
      const event = events.find((item) => item.id === eventId);
      if (event) updateEventCardFromDataset(card, event);
    });
    updateEvents();
  };
  applyStoredFilters(getStoredEventFilters());

  [categoryFilter, dateFilter, locationFilter].forEach((filter) => {
    filter?.addEventListener('change', updateEvents);
  });

  quickCategoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!categoryFilter) return;
      categoryFilter.value = button.dataset.quickCategory || 'all';
      updateEvents();
    });
  });

  activeFilters.addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-remove-filter]');
    if (!removeButton) return;

    const filterName = removeButton.dataset.removeFilter;
    if (filterName === 'category' && categoryFilter) categoryFilter.value = 'all';
    if (filterName === 'date' && dateFilter) dateFilter.value = '';
    if (filterName === 'location' && locationFilter) locationFilter.value = 'all';
    updateEvents();
  });

  resetButton?.addEventListener('click', () => {
    if (categoryFilter) categoryFilter.value = 'all';
    if (dateFilter) dateFilter.value = '';
    if (locationFilter) locationFilter.value = 'all';
    updateEvents();
  });

  updateEvents();
}
// UI-only detail actions preview future calendar/share integrations without backend dependencies.
function initEventDetailActions() {
  const feedback = document.querySelector('[data-event-action-feedback]');
  const actionButtons = document.querySelectorAll('[data-event-action]');
  if (!feedback || actionButtons.length === 0) return;

  actionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.eventAction;
      showDynamicAlert(feedback, {
        variant: 'success',
        title: getUiMessage('actionReadyTitle'),
        message: getEventActionMessage(action),
        autohide: 4200,
      });
    });
  });
}

// Bonus booking modal validates required fields while keeping booking front-end only.
function initBookingModal() {
  const form = document.querySelector('[data-booking-form]');
  if (!form) return;

  const fields = {
    name: form.querySelector('[data-booking-field="name"]'),
    email: form.querySelector('[data-booking-field="email"]'),
    session: form.querySelector('[data-booking-field="session"]'),
  };
  const alertElement = form.querySelector('[data-booking-alert]');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setFieldState = (field, isValid) => {
    if (!field) return;
    field.classList.toggle('is-invalid', !isValid);
    field.classList.toggle('is-valid', isValid && field.value.trim().length > 0);
    field.setAttribute('aria-invalid', String(!isValid));
  };

  const validateField = (fieldName) => {
    const field = fields[fieldName];
    if (!field) return true;

    const value = field.value.trim();
    const isValid = fieldName === 'email' ? emailPattern.test(value) : value.length > 0;
    setFieldState(field, isValid);
    return isValid;
  };

  const resetBookingFormState = () => {
    hideDynamicAlert(alertElement);
    Object.values(fields).forEach((field) => {
      field?.classList.remove('is-valid', 'is-invalid');
      field?.removeAttribute('aria-invalid');
    });
  };

  Object.keys(fields).forEach((fieldName) => {
    fields[fieldName]?.addEventListener('input', () => {
      validateField(fieldName);
      hideDynamicAlert(alertElement);
    });

    fields[fieldName]?.addEventListener('change', () => {
      validateField(fieldName);
      hideDynamicAlert(alertElement);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isValid = Object.keys(fields).every(validateField);
    showDynamicAlert(alertElement, {
      variant: isValid ? 'success' : 'danger',
      title: getUiMessage(isValid ? 'bookingSuccessTitle' : 'bookingErrorTitle'),
      message: getUiMessage(isValid ? 'bookingSuccessMessage' : 'bookingErrorMessage'),
    });

    if (isValid) {
      form.reset();
      Object.values(fields).forEach((field) => {
        field?.classList.remove('is-valid', 'is-invalid');
        field?.removeAttribute('aria-invalid');
      });
    }
  });

  form.closest('.modal')?.addEventListener('hidden.bs.modal', resetBookingFormState);
}

// Contact form validation checks required fields and email format before showing feedback.
function initContactFormValidation() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const fields = {
    name: form.querySelector('[data-contact-field="name"]'),
    email: form.querySelector('[data-contact-field="email"]'),
    message: form.querySelector('[data-contact-field="message"]'),
  };

  const successAlert = document.querySelector('[data-contact-alert="success"]');
  const errorAlert = document.querySelector('[data-contact-alert="error"]');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setFieldState = (field, isValid) => {
    if (!field) return;
    field.classList.toggle('is-invalid', !isValid);
    field.classList.toggle('is-valid', isValid && field.value.trim().length > 0);
    field.setAttribute('aria-invalid', String(!isValid));
  };

  const validateField = (fieldName) => {
    const field = fields[fieldName];
    if (!field) return true;

    const value = field.value.trim();
    const isValid = fieldName === 'email' ? emailPattern.test(value) : value.length > 0;
    setFieldState(field, isValid);
    return isValid;
  };

  const validateForm = () => Object.keys(fields).every(validateField);

  const showFormAlert = (type) => {
    const isSuccess = type === 'success';
    hideDynamicAlert(isSuccess ? errorAlert : successAlert);
    showDynamicAlert(isSuccess ? successAlert : errorAlert, {
      variant: isSuccess ? 'success' : 'danger',
      title: getUiMessage(isSuccess ? 'contactSuccessTitle' : 'contactErrorTitle'),
      message: getUiMessage(isSuccess ? 'contactSuccessMessage' : 'contactErrorMessage'),
    });
  };

  Object.keys(fields).forEach((fieldName) => {
    fields[fieldName]?.addEventListener('input', () => {
      validateField(fieldName);
      hideDynamicAlert(successAlert);
      hideDynamicAlert(errorAlert);
    });

    fields[fieldName]?.addEventListener('blur', () => validateField(fieldName));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isValid = validateForm();
    showFormAlert(isValid ? 'success' : 'error');

    if (isValid) {
      form.reset();
      Object.values(fields).forEach((field) => {
        field?.classList.remove('is-valid', 'is-invalid');
        field?.removeAttribute('aria-invalid');
      });
    }
  });
}


function initHomeEvents() {
  const container = document.querySelector('[data-latest-events]');
  if (!container) return;

  const events = window.VUEG_EVENTS || [];
  if (!events.length) return;

  const latest = events.slice(3, 6); // you can sort later if needed

  container.innerHTML = latest.map(event => {
    const text = getLocalizedEventText(event);
    const category = getMetaLabel('categories', event.category);

    return `
      <div class="col-md-6 col-xl-4">
        <article class="event-card h-100">
          <img 
            src="${escapeHtml(event.image)}" 
            class="event-card-img"
            alt="${escapeHtml(text.title)}"
            loading="lazy"
          >

          <div class="event-card-body">
            <div class="d-flex justify-content-between align-items-start gap-3">
              <span class="badge rounded-pill ${getCategoryBadgeClass(event.category)}">
                ${escapeHtml(category)}
              </span>
              <span class="event-date">
                ${escapeHtml(formatEventDateShort(event.date))}
              </span>
            </div>

            <h3>${escapeHtml(text.title)}</h3>
            <p>${escapeHtml(text.description)}</p>

            <div class="event-meta-list compact">
              <span>${escapeHtml(getMetaLabel('locations', event.location))}</span>
              <span>${escapeHtml(event.time)}</span>
            </div>

            <a 
              class="stretched-link card-link" 
              href="event.html?id=${encodeURIComponent(event.id)}">
              ${escapeHtml(getViewDetailsLabel())}
            </a>
          </div>
        </article>
      </div>
    `;
  }).join('');
}

function initFeaturedSliderDynamic() {
  const track = document.querySelector('[data-featured-track]');
  if (!track) return;

  const events = window.VUEG_EVENTS || [];
  if (!events.length) return;

  const featured = events.filter(e => e.featured);
  if (!featured.length) return;

  track.innerHTML = featured.map((event, index) => {
    const text = getLocalizedEventText(event);
    const category = getMetaLabel('categories', event.category);
    const location = getMetaLabel('locations', event.location);

    return `
      <article class="featured-slide ${index === 0 ? 'is-active' : ''}" data-featured-slide>
        <div class="row g-0 align-items-stretch">
          
          <div class="col-lg-5">
            <div class="featured-visual">
              <img 
                src="${escapeHtml(event.image)}" 
                alt="${escapeHtml(text.title)}"
                class="w-100 h-100 object-fit-cover"
                loading="lazy"
              >
            </div>
          </div>

          <div class="col-lg-7">
            <div class="featured-content">
              <span class="badge rounded-pill ${getCategoryBadgeClass(event.category)}">
                ${escapeHtml(category)}
              </span>

              <h3>${escapeHtml(text.title)}</h3>
              <p>${escapeHtml(text.description)}</p>

              <div class="event-meta-list">
                <span>${escapeHtml(formatEventDateLong(event.date))}</span>
                <span>${escapeHtml(event.time)}</span>
                <span>${escapeHtml(location)}</span>
              </div>

              <a class="btn btn-primary" href="event.html?id=${encodeURIComponent(event.id)}">
                ${escapeHtml(getViewDetailsLabel())}
              </a>
            </div>
          </div>

        </div>
      </article>
    `;
  }).join('');

  // ✅ Build dots dynamically
  const dotsContainer = document.querySelector('.slider-dots');
  if (dotsContainer) {
    dotsContainer.innerHTML = featured.map((_, index) => `
      <button 
        class="slider-dot ${index === 0 ? 'is-active' : ''}" 
        type="button" 
        data-slider-dot="${index}">
      </button>
    `).join('');
  }
}

function updateLogoByTheme(theme) {
  const logo = document.querySelector('[data-site-logo]');
  if (!logo) return;

  if (theme === 'dark') {
    logo.src = 'assets/img/logo_dark.png';
  } else {
    logo.src = 'assets/img/logo_light.png';
  }
}