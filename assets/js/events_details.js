/*
  Events dataset for this project.

  This file is intentionally data-only (no DOM manipulation, no auto-init).
  It is consumed by `assets/js/main.js` to render the Events list and the
  Event Details page by `?id=...`.
*/

(function attachUniversityEventsData() {
    const events = [
        {
            id: 'innovation-week',
            image: 'assets/img/events_images/innovation-week/main.jpeg',
            gallery: [
                'assets/img/events_images/innovation-week/1.jpeg',
                'assets/img/events_images/innovation-week/2.jpeg',
                'assets/img/events_images/innovation-week/3.jpeg',
                'assets/img/events_images/innovation-week/4.jpeg',
            ],
            category: 'tech',
            location: 'innovationHall',
            date: '2026-04-28',
            time: '10:00 AM - 1:00 PM',
            featured: true,
            en: {
                title: 'Tech Innovation Week',
                description: 'Hands-on demos, startup pitches, and workshops led by university innovators.',
                full: 'Tech Innovation Week brings students, faculty, and local partners together for product demos, design sprints, AI showcases, and startup mentoring. The program is designed for beginners and experienced makers alike.',
            },
            ar: {
                title: 'أسبوع الابتكار التقني',
                description: 'عروض تفاعلية ومسابقات ناشئة وورش يقودها مبتكرو الجامعة.',
                full: 'يجمع أسبوع الابتكار التقني الطلاب وأعضاء هيئة التدريس والشركاء حول عروض المنتجات ومختبرات الذكاء الاصطناعي وجلسات الإرشاد للمشاريع.',
            },
        },
        {
            id: 'culture-festival',
            image: 'assets/img/events_images/culture-festival/main.jpeg',
            gallery: [
                'assets/img/events_images/culture-festival/1.jpeg',
                'assets/img/events_images/culture-festival/2.jpeg',
                'assets/img/events_images/culture-festival/3.jpeg',
                'assets/img/events_images/culture-festival/4.jpeg',
            ],
            category: 'culture',
            location: 'mainTheater',
            date: '2026-05-02',
            time: '5:00 PM - 9:00 PM',
            featured: true,
            en: {
                title: 'Culture Festival',
                description: 'A student-led celebration of food, stories, exhibitions, and cross-cultural performances.',
                full: 'The Culture Festival highlights the diversity of campus life through student booths, heritage performances, short talks, and collaborative art spaces.',
            },
            ar: {
                title: 'مهرجان الثقافة',
                description: 'احتفال طلابي بالطعام والقصص والمعارض والعروض الثقافية.',
                full: 'يبرز مهرجان الثقافة تنوع الحياة الجامعية من خلال أجنحة طلابية وعروض تراثية ومساحات فنية مشتركة.',
            },
        },
        {
            id: 'sports-finals',
            image: 'assets/img/events_images/sports-finals/main.jpeg',
            gallery: [
                'assets/img/events_images/sports-finals/1.jpeg',
                'assets/img/events_images/sports-finals/2.jpeg',
                'assets/img/events_images/sports-finals/3.jpeg',
                'assets/img/events_images/sports-finals/4.jpeg',
            ],
            category: 'sports',
            location: 'sportsComplex',
            date: '2026-05-09',
            time: '3:00 PM - 7:00 PM',
            featured: true,
            en: {
                title: 'University Sports Finals',
                description: 'Cheer for student teams in football, basketball, and track finals.',
                full: 'The annual sports finals bring together university teams and supporters for an afternoon of finals, awards, and community energy.',
            },
            ar: {
                title: 'نهائيات الرياضة الجامعية',
                description: 'شجع فرق الطلاب في نهائيات كرة القدم والسلة والجري.',
                full: 'تجمع نهائيات الرياضة السنوية فرق الجامعة وجماهيرها في يوم مليء بالمنافسة والجوائز وروح المجتمع.',
            },
        },
        {
            id: 'music-night',
            image: 'assets/img/events_images/music-night/main.jpeg',
            gallery: [
                'assets/img/events_images/music-night/1.jpeg',
                'assets/img/events_images/music-night/2.jpeg',
                'assets/img/events_images/music-night/3.jpeg',
                'assets/img/events_images/music-night/4.jpeg',
            ],
            category: 'music',
            location: 'artsHall',
            date: '2026-05-16',
            time: '7:00 PM - 10:00 PM',
            featured: false,
            en: {
                title: 'Student Music Night',
                description: 'Live student bands, acoustic sets, and an open mic finale.',
                full: 'Student Music Night gives campus performers a polished stage and gives visitors a relaxed evening of music, lights, and community.',
            },
            ar: {
                title: 'ليلة الموسيقى الطلابية',
                description: 'فرق طلابية مباشرة وعروض هادئة وميكروفون مفتوح.',
                full: 'تمنح ليلة الموسيقى الطلابية للموهوبين منصة أنيقة وتمنح الحضور أمسية مريحة من الموسيقى والأضواء.',
            },
        },
        {
            id: 'volunteer-day',
            image: 'assets/img/events_images/volunteer-day/main.jpeg',
            gallery: [
                'assets/img/events_images/volunteer-day/1.jpeg',
                'assets/img/events_images/volunteer-day/2.jpeg',
                'assets/img/events_images/volunteer-day/3.jpeg',
                'assets/img/events_images/volunteer-day/4.jpeg',
            ],
            category: 'community',
            location: 'campusGarden',
            date: '2026-06-01',
            time: '8:30 AM - 12:30 PM',
            featured: false,
            en: {
                title: 'Community Volunteer Day',
                description: 'Join service teams for campus garden upgrades and local outreach activities.',
                full: 'Community Volunteer Day connects students with meaningful service projects, including campus beautification, donations sorting, and neighborhood outreach.',
            },
            ar: {
                title: 'يوم التطوع المجتمعي',
                description: 'انضم إلى فرق الخدمة لتحسين حديقة الجامعة والتواصل المحلي.',
                full: 'يربط يوم التطوع المجتمعي الطلاب بمشاريع خدمية مفيدة تشمل تجميل الحرم وترتيب التبرعات والتواصل مع الحي.',
            },
        },
        {
            id: 'career-expo',
            image: 'assets/img/events_images/career-expo/main.jpeg',
            gallery: [
                'assets/img/events_images/career-expo/1.jpeg',
                'assets/img/events_images/career-expo/2.jpeg',
                'assets/img/events_images/career-expo/3.jpeg',
                'assets/img/events_images/career-expo/4.jpeg',
            ],
            category: 'career',
            location: 'alumniCenter',
            date: '2026-06-12',
            time: '11:00 AM - 4:00 PM',
            featured: false,
            en: {
                title: 'Career Pathways Expo',
                description: 'Meet employers, alumni mentors, and career advisors in one focused afternoon.',
                full: 'The Career Pathways Expo is built for students planning internships, first jobs, or graduate study. Expect employer booths, resume feedback, and alumni networking.',
            },
            ar: {
                title: 'معرض المسار المهني',
                description: 'قابل جهات التوظيف والمرشدين والخريجين في يوم واحد.',
                full: 'صمم معرض المسار المهني للطلاب الذين يخططون للتدريب أو الوظيفة الأولى أو الدراسات العليا مع أجنحة توظيف ومراجعة سيرة ذاتية.',
            },
        },
    ];

    const meta = {
        categories: {
            tech: { en: 'Technology', ar: 'تقنية' },
            culture: { en: 'Culture', ar: 'ثقافة' },
            sports: { en: 'Sports', ar: 'رياضة' },
            music: { en: 'Music', ar: 'موسيقى' },
            community: { en: 'Community', ar: 'مجتمع' },
            career: { en: 'Career', ar: 'المسار المهني' },
        },
        locations: {
            innovationHall: { en: 'Innovation Hall', ar: 'قاعة الابتكار' },
            mainTheater: { en: 'Main Theater', ar: 'المسرح الرئيسي' },
            sportsComplex: { en: 'Sports Complex', ar: 'المجمع الرياضي' },
            artsHall: { en: 'Arts Hall', ar: 'قاعة الفنون' },
            campusGarden: { en: 'Campus Garden', ar: 'حديقة الجامعة' },
            alumniCenter: { en: 'Alumni Center', ar: 'مركز الخريجين' },
        },
    };

    window.VUEG_EVENTS = events;
    window.VUEG_EVENT_META = meta;
})();
