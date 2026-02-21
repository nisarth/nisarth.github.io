/* ============================================================
   NISARTH PATEL — ANIMATIONS JS
   GSAP ScrollTrigger · Counters · Parallax · Tilt
   ============================================================ */

(function () {
    'use strict';

    function initAnimations() {
        if (typeof gsap === 'undefined') return;

        // Register ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // ── Scroll Progress Bar ──
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            gsap.to(progressBar, {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                },
            });
        }

        // ── Reveal Up (generic .reveal-up elements) ──
        gsap.utils.toArray('.reveal-up').forEach((el) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    once: true,
                },
            });
        });

        // ── Clip-path text reveal ──
        gsap.utils.toArray('.clip-reveal').forEach((el) => {
            gsap.to(el, {
                clipPath: 'inset(0 0% 0 0)',
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true,
                },
            });
        });

        // ── Section headings stagger reveal ──
        gsap.utils.toArray('.section-heading').forEach((heading) => {
            gsap.fromTo(heading,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
                }
            );
        });

        // ── Service Cards stagger ──
        const serviceCards = gsap.utils.toArray('.service-card');
        if (serviceCards.length) {
            gsap.fromTo(serviceCards,
                { y: 60, opacity: 0, rotateX: 3 },
                {
                    y: 0, opacity: 1, rotateX: 0,
                    duration: 0.7,
                    ease: 'power3.out',
                    stagger: 0.08,
                    scrollTrigger: {
                        trigger: serviceCards[0].parentElement,
                        start: 'top 85%',
                        once: true,
                    },
                }
            );
        }

        // ── Work Cards ──
        gsap.utils.toArray('.work-card').forEach((card, i) => {
            gsap.fromTo(card,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 88%', once: true },
                }
            );
        });

        // ── Portfolio items ──
        gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
            gsap.fromTo(item,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.6,
                    delay: (i % 3) * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: item, start: 'top 90%', once: true },
                }
            );
        });

        // ── Blog Cards ──
        gsap.utils.toArray('.blog-card').forEach((card, i) => {
            gsap.fromTo(card,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.6,
                    delay: (i % 3) * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 90%', once: true },
                }
            );
        });

        // ── Stat Counter ──
        gsap.utils.toArray('.stat-number').forEach((el) => {
            const target = parseInt(el.dataset.count || el.textContent, 10);
            if (isNaN(target)) return;

            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    let startTime = null;
                    const duration = 2000;

                    function step(timestamp) {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.round(eased * target) + (el.dataset.suffix || '+');
                        if (progress < 1) requestAnimationFrame(step);
                        else el.textContent = target + (el.dataset.suffix || '+');
                    }
                    requestAnimationFrame(step);
                },
            });
        });

        // ── Skill bars ──
        gsap.utils.toArray('.skill-fill').forEach((bar) => {
            const pct = bar.dataset.width || '0%';
            gsap.to(bar, {
                scaleX: parseFloat(pct) / 100,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: { trigger: bar, start: 'top 85%', once: true },
            });
        });

        // ── Process timeline line draw ──
        gsap.utils.toArray('.process-step::before, .process-line').forEach((line) => {
            gsap.to(line, {
                scaleY: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: line.parentElement,
                    start: 'top 70%',
                    once: true,
                },
            });
        });

        // ── Process steps reveal ──
        gsap.utils.toArray('.process-step').forEach((step, i) => {
            gsap.fromTo(step,
                { x: -40, opacity: 0 },
                {
                    x: 0, opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: step, start: 'top 80%', once: true },
                }
            );
        });

        // ── Timeline items (about page) ──
        gsap.utils.toArray('.timeline-item').forEach((item, i) => {
            gsap.fromTo(item,
                { x: -30, opacity: 0 },
                {
                    x: 0, opacity: 1,
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: item, start: 'top 85%', once: true },
                }
            );
        });

        // ── AI Feature Cards ──
        gsap.utils.toArray('.ai-feature-card').forEach((card, i) => {
            gsap.fromTo(card,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.6,
                    delay: i * 0.12,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 88%', once: true },
                }
            );
        });

        // ── Value Cards ──
        gsap.utils.toArray('.value-card').forEach((card, i) => {
            gsap.fromTo(card,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 88%', once: true },
                }
            );
        });

        // ── Audit banner ──
        const auditBanner = document.querySelector('.audit-banner');
        if (auditBanner) {
            gsap.fromTo(auditBanner,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: auditBanner, start: 'top 85%', once: true },
                }
            );
        }

        // ── About teaser ──
        const aboutTeaser = document.querySelector('.about-teaser');
        if (aboutTeaser) {
            gsap.fromTo(aboutTeaser.querySelector('.about-teaser-visual'),
                { x: -50, opacity: 0 },
                {
                    x: 0, opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: aboutTeaser, start: 'top 80%', once: true },
                }
            );
            gsap.fromTo(aboutTeaser.querySelector('.about-teaser-text'),
                { x: 50, opacity: 0 },
                {
                    x: 0, opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: aboutTeaser, start: 'top 80%', once: true },
                }
            );
        }

        // ── Testimonial section ──
        const testimonialWrap = document.querySelector('.testimonial-section');
        if (testimonialWrap) {
            gsap.fromTo(testimonialWrap,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: { trigger: testimonialWrap, start: 'top 85%', once: true },
                }
            );
        }

        // ── Tech stack items ──
        const techItems = gsap.utils.toArray('.tech-item');
        if (techItems.length) {
            gsap.fromTo(techItems,
                { y: 20, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: techItems[0].parentElement, start: 'top 85%', once: true },
                }
            );
        }

        // ── Parallax images ──
        gsap.utils.toArray('[data-parallax]').forEach((el) => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            gsap.to(el, {
                y: () => el.offsetHeight * speed * -1,
                ease: 'none',
                scrollTrigger: {
                    trigger: el.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        });

        // ── CTA banner particle scatter ──
        const ctaBanner = document.querySelector('.cta-banner-section');
        if (ctaBanner) {
            gsap.fromTo(ctaBanner.querySelector('.cta-banner-title'),
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: ctaBanner, start: 'top 80%', once: true },
                }
            );
        }

        // ── Footer reveal ──
        const footer = document.querySelector('.footer');
        if (footer) {
            gsap.fromTo(footer,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: { trigger: footer, start: 'top 95%', once: true },
                }
            );
        }
    }

    // 3D card tilt effect
    function initCardTilt() {
        document.querySelectorAll('.tilt-card').forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (e.clientX - cx) / (rect.width / 2);
                const dy = (e.clientY - cy) / (rect.height / 2);
                const rotX = -dy * 6;
                const rotY = dx * 6;

                card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                card.style.transition = 'transform 0.5s ease';
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        });
    }

    // Magnetic hover for nav links
    function initMagnetic() {
        document.querySelectorAll('.magnetic').forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (e.clientX - cx) * 0.25;
                const dy = (e.clientY - cy) * 0.25;
                el.style.transform = `translate(${dx}px, ${dy}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
                el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            });

            el.addEventListener('mouseenter', () => {
                el.style.transition = 'none';
            });
        });
    }

    // Swiper initialization 
    function initSwiper() {
        const swiperEl = document.querySelector('.testimonials-swiper');
        if (!swiperEl || typeof Swiper === 'undefined') return;

        new Swiper('.testimonials-swiper', {
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            speed: 700,
            effect: 'fade',
            fadeEffect: { crossFade: true },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
            },
        });
    }

    // Initialize everything
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initAnimations();
            initCardTilt();
            initMagnetic();
            initSwiper();
        });
    } else {
        initAnimations();
        initCardTilt();
        initMagnetic();
        initSwiper();
    }

})();
