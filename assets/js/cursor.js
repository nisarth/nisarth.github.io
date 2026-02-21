/* ============================================================
   NISARTH PATEL — CUSTOM CURSOR
   Two-layer cursor with hover states and click ripple
   ============================================================ */

(function () {
    'use strict';

    // Disable on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    const label = document.querySelector('.cursor-label');

    if (!dot || !outline) return;

    let mouseX = 0, mouseY = 0;
    let outX = 0, outY = 0;
    let raf;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function animateOutline() {
        outX += (mouseX - outX) * 0.12;
        outY += (mouseY - outY) * 0.12;
        outline.style.left = outX + 'px';
        outline.style.top = outY + 'px';
        raf = requestAnimationFrame(animateOutline);
    }

    animateOutline();

    // Hover detection on interactive elements
    const hoverSelectors = 'a, button, [role="button"], input, textarea, select, .service-card, .work-card, .portfolio-item, .blog-card, .filter-btn, .faq-question, .nav-cta, .tilt-card';

    function addHoverListeners() {
        document.querySelectorAll(hoverSelectors).forEach((el) => {
            el.addEventListener('mouseenter', () => {
                outline.classList.add('is-hovering');
                const viewText = el.dataset.cursor || '';
                if (label) label.textContent = viewText || '';
            });
            el.addEventListener('mouseleave', () => {
                outline.classList.remove('is-hovering');
                if (label) label.textContent = '';
            });
        });
    }

    addHoverListeners();

    // Re-apply after dynamic content if needed
    window.refreshCursorListeners = addHoverListeners;

    // Click ripple
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-burst';
        ripple.style.cssText = `
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 80px;
      height: 80px;
      margin-left: -40px;
      margin-top: -40px;
    `;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
    });

    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        outline.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        outline.style.opacity = '1';
    });

})();
