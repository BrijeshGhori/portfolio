document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in-up class to sections
    const animateElements = document.querySelectorAll('.skills-card, .process-card, .project-card, .testimonial-card, h2, .skills-desc-wrapper, .hero-title, .hero-bottom');
    
    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Skills slider controls
    const skillsGrid = document.querySelector('.skills-grid');
    const skillArrows = document.querySelectorAll('.skills .arrow-btn');
    
    if (skillsGrid && skillArrows.length === 2) {
        skillArrows[0].addEventListener('click', () => {
            skillsGrid.scrollBy({ left: -374, behavior: 'smooth' });
        });
        skillArrows[1].addEventListener('click', () => {
            skillsGrid.scrollBy({ left: 374, behavior: 'smooth' });
        });
    }

    // Sticky Header & Scroll Spy
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Dark Mode Header Detection
        const headerRect = header.getBoundingClientRect();
        const headerCenterY = headerRect.top + headerRect.height / 2;
        let isOverDarkSection = false;

        document.querySelectorAll('.dark-section, .footer').forEach(darkEl => {
            const rect = darkEl.getBoundingClientRect();
            if (headerCenterY >= rect.top && headerCenterY <= rect.bottom) {
                isOverDarkSection = true;
            }
        });

        if (isOverDarkSection) {
            header.classList.add('dark-mode');
        } else {
            header.classList.remove('dark-mode');
        }

        // Scroll Spy
        let currentSectionId = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 3 && rect.bottom >= 100) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Trigger once on load
    window.dispatchEvent(new Event('scroll'));

    // Custom Cursor
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-glow');
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    let mouseX = -100, mouseY = -100;
    let cursorX = -100, cursorY = -100;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        
        const target = e.target;
        
        // Detect dark section
        const isDark = target.closest('.dark-section') || target.closest('.footer') || target.closest('.badge') || target.closest('.process-card:hover');
        if (isDark) {
            cursor.classList.add('light-mode');
            cursorDot.classList.add('light-mode');
        } else {
            cursor.classList.remove('light-mode');
            cursorDot.classList.remove('light-mode');
        }
        
        // Detect if over navbar
        const isHeader = target.closest('.header');
        if (isHeader) {
            cursor.classList.add('nav-mode');
            cursorDot.classList.add('nav-mode');
        } else {
            cursor.classList.remove('nav-mode');
            cursorDot.classList.remove('nav-mode');
        }
        
        // Detect interactive
        const isClickable = target.closest('a') || target.closest('button') || target.closest('.project-card') || target.closest('.process-card') || target.closest('.skill-card');
        if (isClickable) {
            cursor.classList.add('hovering');
            cursorDot.classList.add('hovering');
        } else {
            cursor.classList.remove('hovering');
            cursorDot.classList.remove('hovering');
        }
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
});
