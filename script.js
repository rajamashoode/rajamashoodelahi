document.addEventListener('DOMContentLoaded', function() {

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Select all elements you want to animate on scroll
    // **** UPDATED: Added .journal-post-item ****
    const elementsToAnimate = document.querySelectorAll(
        '.initial-hidden, .service-item, .timeline-item, .about-image, .about-text, .section-title, .contact-info, .contact-form, .journal-post-item'
    );

    elementsToAnimate.forEach(el => {
        // Add initial-hidden class if it's not already present and element should animate
        // This ensures elements targeted directly (like .journal-post-item) also get the initial state
        if (!el.classList.contains('initial-hidden') && (el.classList.contains('journal-post-item') || el.classList.contains('service-item') || el.classList.contains('timeline-item'))) {
            el.classList.add('initial-hidden');
        }
        observer.observe(el);
    });

    // --- Animate Hero Content on Load ---
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('visible');
        }, 100);
    }

    // --- Dynamic Year in Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Active Nav Link Styling ---
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    // Get the filename from the URL (e.g., "about.html")
    const currentPath = window.location.pathname.split("/").pop() || 'index.html'; // Default to index.html if path is empty

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop();
        link.classList.remove('active'); // Remove active class from all
        // Check if the link's href matches the current page's filename
        if (currentPath === linkPath) {
            link.classList.add('active'); // Add active class to the current page link
        }
    });


    // --- Optional: Header Hide/Show on Scroll ---
    /*
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            // Scroll Down
            document.body.classList.add('scroll-down');
        } else {
            // Scroll Up or near top
            document.body.classList.remove('scroll-down');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);
    */

});
