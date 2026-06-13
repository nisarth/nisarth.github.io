/* ============================================================
   NISARTH PATEL - MAIN JS
   Lenis · Navigation · Loader · Page Transitions · FAQ · Forms
   ============================================================ */

/* ── Google Analytics (auto-loaded on every page via this file) ── */
(function () {
    var GA_ID = 'G-372JGPFET7';
    // Inject the gtag.js script tag
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    // Initialise dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
})();


(function () {
    'use strict';

    // ── Lenis Smooth Scroll ──
    function initLenis() {
        if (typeof Lenis === 'undefined') return;
        const lenis = new Lenis({ lerp: 0.08, duration: 1.4 });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Connect to GSAP ScrollTrigger if present
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => lenis.raf(time * 1000));
            gsap.ticker.lagSmoothing(0);
        }

        window.__lenis = lenis;
    }

    // ── Navigation ──
    function initNav() {
        const nav = document.querySelector('.nav');
        const hamburger = document.querySelector('.nav-hamburger');
        const overlay = document.querySelector('.nav-overlay');
        const closeBtn = document.querySelector('.nav-overlay-close');
        const overlayLinks = document.querySelectorAll('.nav-overlay-link');

        if (!nav) return;

        // Scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const current = window.scrollY;
            if (current > 80) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            lastScroll = current;
        }, { passive: true });

        // Hamburger
        function openOverlay() {
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';

            // Animate links in
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(overlayLinks,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
                );
            } else {
                overlayLinks.forEach((link, i) => {
                    setTimeout(() => {
                        link.style.opacity = '1';
                        link.style.transform = 'translateY(0)';
                    }, i * 80);
                });
            }
        }

        function closeOverlay() {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }

        if (hamburger) hamburger.addEventListener('click', openOverlay);
        if (closeBtn) closeBtn.addEventListener('click', closeOverlay);

        overlayLinks.forEach((link) => {
            link.addEventListener('click', closeOverlay);
        });

        // Escape key closes overlay
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeOverlay();
        });

        // Mark current page link
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link, .nav-overlay-link').forEach((link) => {
            let href = link.getAttribute('href');
            if (!href) return;

            // Normalize index.html and root path
            const isHomePath = (currentPath === 'index.html' || currentPath === '');
            const isHomeHref = (href === './' || href === 'index.html');

            if (href === currentPath || (isHomePath && isHomeHref)) {
                link.style.color = 'var(--accent-primary)';
            }
        });
    }

    // ── Page Loader (index.html only) ──
    function initLoader() {
        const loader = document.getElementById('loader');
        if (!loader) return;

        const loaderPath = loader.querySelector('.loader-logo path');
        const loaderBar = loader.querySelector('.loader-bar-fill');

        // SVG stroke animation
        if (loaderPath) {
            loaderPath.style.animation = 'draw-path 1s ease forwards';
            loaderPath.style.strokeDashoffset = '300';
        }

        // Progress bar
        if (loaderBar) {
            if (typeof gsap !== 'undefined') {
                gsap.to(loaderBar, { scaleX: 1, duration: 1, ease: 'power2.inOut' });
            } else {
                loaderBar.style.transition = 'transform 1s ease';
                loaderBar.style.transform = 'scaleX(1)';
            }
        }

        // Hide loader after animation
        const hideLoader = () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(loader, {
                    opacity: 0,
                    duration: 0.4,
                    delay: 1.3,
                    ease: 'power2.out',
                    onComplete: () => {
                        loader.style.display = 'none';
                        // Animate hero content in
                        animateHeroIn();
                    },
                });
            } else {
                setTimeout(() => {
                    loader.style.transition = 'opacity 0.4s ease';
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                        animateHeroIn();
                    }, 400);
                }, 1300);
            }
        };

        hideLoader();
    }

    function animateHeroIn() {
        const nav = document.querySelector('.nav');
        const heroWords = document.querySelectorAll('.hero-word-inner');
        const heroSub = document.querySelector('.hero-sub');
        const heroCtas = document.querySelector('.hero-ctas');
        const scrollInd = document.querySelector('.scroll-indicator');
        const heroBadge = document.querySelector('.hero-badge');

        if (typeof gsap === 'undefined') return;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (nav) tl.fromTo(nav, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
        if (heroBadge) tl.fromTo(heroBadge, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2');
        if (heroWords.length) {
            tl.fromTo(heroWords,
                { y: '110%' },
                { y: '0%', duration: 0.7, stagger: 0.1 },
                '-=0.3'
            );
        }
        if (heroSub) tl.fromTo(heroSub, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.4');
        if (heroCtas) tl.fromTo(heroCtas, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, '-=0.3');
        if (scrollInd) tl.fromTo(scrollInd, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2');
    }

    // ── Page Transitions ──
    function initPageTransitions() {
        const overlay = document.getElementById('page-transition');
        if (!overlay) return;

        // Fade in from black on page load
        overlay.classList.remove('active');

        document.querySelectorAll('a[href]').forEach((link) => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('http') ||
                href.startsWith('mailto:') || href.startsWith('tel:') ||
                href.startsWith('https://wa.me')) return;

            link.addEventListener('click', (e) => {
                e.preventDefault();
                overlay.classList.add('active');
                setTimeout(() => { window.location.href = href; }, 320);
            });
        });
    }

    // ── FAQ Accordion ──
    function initFAQ() {
        document.querySelectorAll('.faq-question').forEach((question) => {
            question.addEventListener('click', () => {
                const item = question.closest('.faq-item');
                const answer = item.querySelector('.faq-answer');
                const isOpen = item.classList.contains('open');

                // Close all
                document.querySelectorAll('.faq-item.open').forEach((openItem) => {
                    openItem.classList.remove('open');
                    openItem.querySelector('.faq-answer').style.maxHeight = '0';
                });

                // Open this one
                if (!isOpen) {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }

    // ── Filter Buttons ──
    function initFilters() {
        document.querySelectorAll('.filter-bar').forEach((bar) => {
            const buttons = bar.querySelectorAll('.filter-btn');
            buttons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    buttons.forEach((b) => b.classList.remove('active'));
                    btn.classList.add('active');

                    const filter = btn.dataset.filter;
                    const container = document.querySelector(btn.dataset.target || '.portfolio-grid, .blog-grid');
                    if (!container) return;

                    const items = container.querySelectorAll('[data-category]');
                    items.forEach((item) => {
                        if (filter === 'all' || item.dataset.category.includes(filter)) {
                            item.style.display = '';
                            if (typeof gsap !== 'undefined') {
                                gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
                            }
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
        });
    }

    // ── Contact Form ──
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Check for success redirect
        if (window.location.search.includes('success=true')) {
            form.style.display = 'none';
            var success = document.querySelector('.form-success');
            if (success) success.style.display = 'block';
        }

        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
                return;
            }

            // If form has action (Formsubmit.co), let it submit natively
            if (form.action && form.action.includes('formsubmit.co')) {
                var btn = form.querySelector('[type="submit"]');
                btn.textContent = 'Sending...';
                btn.disabled = true;
                return; // Allow native form submission
            }

            e.preventDefault();
            var btn = form.querySelector('[type="submit"]');
            var originalTxt = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            // Fallback: show success after delay
            setTimeout(function () {
                showFormSuccess(form);
            }, 600);
        });
    }

    function validateForm(form) {
        let valid = true;
        form.querySelectorAll('[required]').forEach((field) => {
            field.style.borderColor = '';
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--accent-secondary)';
                valid = false;
            }
        });
        const email = form.querySelector('[type="email"]');
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            email.style.borderColor = 'var(--accent-secondary)';
            valid = false;
        }
        return valid;
    }

    function showFormSuccess(form) {
        form.style.display = 'none';
        const success = document.querySelector('.form-success');
        if (success) success.style.display = 'block';
    }

    function showFormError(form, btn, originalTxt) {
        btn.textContent = originalTxt;
        btn.disabled = false;
        alert('Something went wrong. Please email pnisarth@gmail.com directly.');
    }

    // ── Letter scramble for nav links ──
    function initScramble() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        document.querySelectorAll('.nav-link').forEach((link) => {
            const original = link.textContent.trim();
            link.addEventListener('mouseenter', () => {
                let iteration = 0;
                const maxIter = original.length * 2;
                const interval = setInterval(() => {
                    link.textContent = original.split('').map((char, i) => {
                        if (char === ' ') return ' ';
                        if (i < iteration / 2) return original[i];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join('');
                    iteration++;
                    if (iteration > maxIter) {
                        clearInterval(interval);
                        link.textContent = original;
                    }
                }, 40);
            });
        });
    }

    // ── Theme Toggle ──
    function initThemeToggle() {
        var saved = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', saved);

        document.querySelectorAll('.theme-toggle').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var current = document.documentElement.getAttribute('data-theme') || 'dark';
                var next = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
            });
        });
    }

    // ── Back to Top ──
    function initBackToTop() {
        var btn = document.querySelector('.back-to-top');
        if (!btn) return;
        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });
        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── Cookie Consent ──
    function initCookieConsent() {
        if (localStorage.getItem('cookie-consent')) return;
        var banner = document.querySelector('.cookie-banner');
        if (!banner) return;
        setTimeout(function () { banner.classList.add('visible'); }, 1500);
        banner.querySelectorAll('[data-cookie]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                localStorage.setItem('cookie-consent', btn.dataset.cookie);
                banner.classList.remove('visible');
                if (btn.dataset.cookie === 'decline') {
                    // Disable GA if declined
                    window['ga-disable-G-372JGPFET7'] = true;
                }
            });
        });
    }

    // ── Article TOC Generation ──
    function initArticleTOC() {
        var tocContainer = document.querySelector('.article-toc ol');
        var articleBody = document.querySelector('.article-body');
        if (!tocContainer || !articleBody) return;

        var headings = articleBody.querySelectorAll('h2, h3');
        headings.forEach(function (heading, i) {
            var id = heading.id || heading.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            heading.id = id;
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#' + id;
            a.textContent = heading.textContent;
            if (heading.tagName === 'H3') a.classList.add('toc-h3');
            a.addEventListener('click', function (e) {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            li.appendChild(a);
            tocContainer.appendChild(li);
        });

        // Highlight active heading on scroll
        var tocLinks = tocContainer.querySelectorAll('a');
        function updateActiveTOC() {
            var scrollPos = window.scrollY + 120;
            var active = null;
            headings.forEach(function (heading, i) {
                if (heading.offsetTop <= scrollPos) active = i;
            });
            tocLinks.forEach(function (link, i) {
                link.classList.toggle('active', i === active);
            });
        }
        window.addEventListener('scroll', updateActiveTOC, { passive: true });
    }

    // ── Reading Progress ──
    function initReadingProgress() {
        var bar = document.querySelector('.article-progress');
        var body = document.querySelector('.article-body');
        if (!bar || !body) return;

        window.addEventListener('scroll', function () {
            var rect = body.getBoundingClientRect();
            var bodyTop = rect.top + window.scrollY;
            var bodyHeight = rect.height;
            var progress = Math.min(Math.max((window.scrollY - bodyTop + 300) / bodyHeight, 0), 1);
            bar.style.width = (progress * 100) + '%';
        }, { passive: true });
    }

    // ── Social Sharing ──
    function initShareButtons() {
        document.querySelectorAll('.share-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var platform = btn.dataset.platform;
                var url = encodeURIComponent(window.location.href);
                var title = encodeURIComponent(document.title);
                var shareUrls = {
                    twitter: 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title,
                    linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + url,
                    whatsapp: 'https://wa.me/?text=' + title + ' ' + url,
                    email: 'mailto:?subject=' + title + '&body=' + url,
                };
                if (platform === 'copy') {
                    navigator.clipboard.writeText(window.location.href).then(function () {
                        btn.textContent = 'Copied!';
                        setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
                    });
                } else if (shareUrls[platform]) {
                    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
                }
            });
        });
    }

    // ── Service Worker Registration ──
    function initServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js').catch(function () {});
        }
    }

    // ── Initialize all on DOM ready ──
    function init() {
        initThemeToggle();
        initLenis();
        initNav();
        initLoader();
        initPageTransitions();
        initFAQ();
        initFilters();
        initContactForm();
        initScramble();
        initBackToTop();
        initCookieConsent();
        initArticleTOC();
        initReadingProgress();
        initShareButtons();
        initServiceWorker();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
