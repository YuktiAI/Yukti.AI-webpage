(function () {
    'use strict';

    // ── Smooth scroll (with header offset) ───────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerEl = document.getElementById('site-header');
                const offset = headerEl ? headerEl.offsetHeight + 8 : 88;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
            closeMobileMenu();
        });
    });

    // ── Header scroll shadow + Sticky mobile CTA (4d) ───────
    const header = document.getElementById('site-header');
    const heroSection = document.getElementById('hero');
    const mobileCta = document.getElementById('mobile-cta-bar');
    const mobileMenu = document.getElementById('mobile-menu');

    if (header) {
        window.addEventListener('scroll', () => {
            // Header shadow
            header.style.boxShadow = window.scrollY > 24
                ? '0 4px 40px rgba(0,0,0,0.55)'
                : 'none';

            // Sticky mobile CTA — show after scrolling past hero
            if (mobileCta && heroSection) {
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                const pastHero = window.scrollY > heroBottom - 100;
                const menuOpen = mobileMenu && mobileMenu.classList.contains('menu-open');

                // Hide when near footer/contact to avoid covering content
                const contactSection = document.getElementById('contact');
                const nearFooter = contactSection
                    ? (window.scrollY + window.innerHeight) > contactSection.offsetTop + 100
                    : false;

                if (pastHero && !menuOpen && !nearFooter) {
                    mobileCta.classList.add('cta-visible');
                } else {
                    mobileCta.classList.remove('cta-visible');
                }
            }
        }, { passive: true });
    }

    // ── Mobile Menu ──────────────────────────────────────────
    const hamburgerBtn  = document.getElementById('hamburger-btn');
    const mobCloseBtn   = document.getElementById('mob-close-btn');

    // Focus trap helpers (2d)
    function getFocusableElements(container) {
        return container.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
    }

    let _focusTrapHandler = null;

    function openMobileMenu() {
        if (mobileMenu) mobileMenu.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
        if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');

        // Hide sticky CTA while menu is open
        if (mobileCta) mobileCta.classList.remove('cta-visible');

        // Focus trap (2d)
        if (mobileMenu) {
            // Focus the close button
            const closeBtn = document.getElementById('mob-close-btn');
            if (closeBtn) closeBtn.focus();

            const focusableEls = getFocusableElements(mobileMenu);
            if (focusableEls.length === 0) return;

            const firstFocusable = focusableEls[0];
            const lastFocusable = focusableEls[focusableEls.length - 1];

            _focusTrapHandler = function (e) {
                if (e.key !== 'Tab') return;
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            };
            mobileMenu.addEventListener('keydown', _focusTrapHandler);
        }
    }
    function closeMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('menu-open');
            // Remove focus trap handler
            if (_focusTrapHandler) {
                mobileMenu.removeEventListener('keydown', _focusTrapHandler);
                _focusTrapHandler = null;
            }
        }
        document.body.style.overflow = '';
        if (hamburgerBtn) {
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            // Return focus to hamburger button (2d)
            hamburgerBtn.focus();
        }
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileMenu);
    if (mobCloseBtn) mobCloseBtn.addEventListener('click', closeMobileMenu);
    
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    // Close-trigger links inside mobile menu
    document.querySelectorAll('.mob-close-trigger').forEach(el => {
        el.addEventListener('click', closeMobileMenu);
    });

    // ── Mobile Accordion ─────────────────────────────────────
    document.querySelectorAll('.mob-acc-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const arrow   = btn.querySelector('.mob-acc-arrow');
            if (!content || !arrow) return;
            const isOpen  = content.classList.contains('acc-open');

            // Collapse all
            document.querySelectorAll('.mob-acc-content').forEach(c => c.classList.remove('acc-open'));
            document.querySelectorAll('.mob-acc-arrow').forEach(a => a.classList.remove('rotated'));

            if (!isOpen) {
                content.classList.add('acc-open');
                arrow.classList.add('rotated');
            }
        });
    });

    // ── Scroll Reveal (IntersectionObserver) ─────────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ── Nav Dropdown: keyboard/click toggle support ───────────
    document.querySelectorAll('.nav-item .nav-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const item     = this.closest('.nav-item');
            if (!item) return;
            const dropdown = item.querySelector('.nav-dropdown');
            if (!dropdown) return;
            const isForced = dropdown.classList.contains('force-open');

            // Close all
            document.querySelectorAll('.nav-dropdown.force-open').forEach(d => d.classList.remove('force-open'));
            document.querySelectorAll('.nav-btn[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false'));

            if (!isForced) {
                dropdown.classList.add('force-open');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.nav-dropdown.force-open').forEach(d => d.classList.remove('force-open'));
        document.querySelectorAll('.nav-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
    });

    // Prevent body scroll when mobile menu is open (resize)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) closeMobileMenu();
    });

    // ── Reduced-motion check ─────────────────────────────────
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsHoverFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // ── Hero Carousel (auto-cycling slides) ──────────────────
    const heroCarousel = document.getElementById('hero-carousel');
    if (heroCarousel) {
        const slides = heroCarousel.querySelectorAll('.hero-slide');
        const dots   = document.querySelectorAll('#hero-carousel-dots .hero-dot');
        const TOTAL  = slides.length;
        let current  = 0;
        let autoTimer = null;
        let manualPauseTimer = null;

        function goToSlide(index) {
            slides[current].classList.remove('hero-slide-active');
            dots[current].classList.remove('hero-dot-active');
            dots[current].removeAttribute('aria-current');
            current = ((index % TOTAL) + TOTAL) % TOTAL;
            slides[current].classList.add('hero-slide-active');
            dots[current].classList.add('hero-dot-active');
            dots[current].setAttribute('aria-current', 'true');
        }

        function startAuto() {
            stopAuto();
            if (prefersReducedMotion) return;
            autoTimer = setInterval(() => goToSlide(current + 1), 2000);
        }
        function stopAuto() {
            if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
        }

        // Dot click navigation
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.dataset.dot, 10);
                goToSlide(idx);
                stopAuto();
                // Resume after 5s of inactivity
                clearTimeout(manualPauseTimer);
                manualPauseTimer = setTimeout(startAuto, 5000);
            });
        });

        // Pause on hover over the whole card
        const heroTiltCard = document.getElementById('hero-tilt-card');
        if (heroTiltCard) {
            heroTiltCard.addEventListener('mouseenter', stopAuto);
            heroTiltCard.addEventListener('mouseleave', startAuto);
        }

        // Page Visibility API
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopAuto(); else startAuto();
        });

        startAuto();
    }

    // ── 3D Tilt: Hero card ───────────────────────────────────
    if (supportsHoverFine && !prefersReducedMotion) {
        const heroCard = document.getElementById('hero-tilt-card');
        if (heroCard) {
            let heroRafId = null;
            let heroTargetRx = 0, heroTargetRy = 0;

            heroCard.addEventListener('mouseenter', () => {
                heroCard.style.willChange = 'transform';
                // Remove transform transition for smooth tracking
                heroCard.style.transition = 'box-shadow 300ms ease';
            });

            heroCard.addEventListener('mousemove', (e) => {
                if (heroRafId) return;
                heroRafId = requestAnimationFrame(() => {
                    const rect = heroCard.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;
                    // Map 0-1 to -1 to 1, then clamp to ±8 degrees
                    heroTargetRy = Math.max(-8, Math.min(8, (x - 0.5) * 16));
                    heroTargetRx = Math.max(-8, Math.min(8, (0.5 - y) * 16));
                    heroCard.style.setProperty('--rx', heroTargetRx + 'deg');
                    heroCard.style.setProperty('--ry', heroTargetRy + 'deg');
                    heroRafId = null;
                });
            });

            heroCard.addEventListener('mouseleave', () => {
                if (heroRafId) { cancelAnimationFrame(heroRafId); heroRafId = null; }
                heroCard.style.transition = 'transform 400ms ease-out, box-shadow 300ms ease';
                heroCard.style.setProperty('--rx', '0deg');
                heroCard.style.setProperty('--ry', '0deg');
                setTimeout(() => { heroCard.style.willChange = ''; }, 400);
            });
        }
    }

    // ── 3D Tilt: Intelligence Stack cards ────────────────────
    if (supportsHoverFine && !prefersReducedMotion) {
        document.querySelectorAll('.tilt-card').forEach(card => {
            const inner = card.querySelector('.tilt-card-inner');
            if (!inner) return;
            let rafId = null;

            card.addEventListener('mouseenter', () => {
                card.classList.add('tilt-active');
                inner.style.willChange = 'transform';
            });

            card.addEventListener('mousemove', (e) => {
                if (rafId) return;
                rafId = requestAnimationFrame(() => {
                    const rect = inner.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;
                    const ry = Math.max(-10, Math.min(10, (x - 0.5) * 20));
                    const rx = Math.max(-10, Math.min(10, (0.5 - y) * 20));
                    inner.style.setProperty('--rx', rx + 'deg');
                    inner.style.setProperty('--ry', ry + 'deg');
                    rafId = null;
                });
            });

            card.addEventListener('mouseleave', () => {
                if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
                card.classList.remove('tilt-active');
                inner.style.setProperty('--rx', '0deg');
                inner.style.setProperty('--ry', '0deg');
                setTimeout(() => { inner.style.willChange = ''; }, 400);
            });
        });
    }

})();

// ── Contact Form (sends via Web3Forms to connect@yuktiiai.in) ──
async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('formSuccess');

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
    }

    try {
        const formData = new FormData(form);
        formData.append('access_key', 'c760839c-bd7f-4a83-9a0d-5e637edbf7f2');
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if (result.success) {
            successMsg.textContent = 'Thank you! We\'ll get back to you soon.';
            successMsg.className = 'p-4 mb-6 bg-green-500/10 border border-green-500/30 text-green-400 font-medium text-sm text-center';
            successMsg.style.display = 'block';
            form.reset();
            setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
        } else {
            successMsg.textContent = 'Something went wrong. Please try again.';
            successMsg.className = 'p-4 mb-6 bg-red-500/10 border border-red-500/30 text-red-400 font-medium text-sm text-center';
            successMsg.style.display = 'block';
            setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
        }
    } catch (error) {
        successMsg.textContent = 'Network error. Please try again later.';
        successMsg.className = 'p-4 mb-6 bg-red-500/10 border border-red-500/30 text-red-400 font-medium text-sm text-center';
        successMsg.style.display = 'block';
        setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    }
}