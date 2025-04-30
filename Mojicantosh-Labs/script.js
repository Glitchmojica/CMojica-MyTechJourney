document.addEventListener("DOMContentLoaded", () => {
    // Constants
    const SCROLL_OFFSET = 100;
    const ANIMATION_DURATION = 300;

    // DOM Elements
    const logoVideo = document.querySelector('#logo-video');
    const navLinks = document.querySelectorAll('nav a');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const serviceCards = document.querySelectorAll('.service-card');
    const contactForm = document.querySelector('.contact-form form');

    // Logo Video Handler
    function handleLogoVideo() {
        if (logoVideo) {
            // Ensure video starts playing
            logoVideo.play().catch(error => {
                console.warn("Logo video playback error:", error);
            });

            // Add event listeners for continuous playback
            logoVideo.addEventListener('ended', () => {
                logoVideo.currentTime = 0;
                logoVideo.play().catch(error => {
                    console.warn("Logo video replay error:", error);
                });
            });

            // Handle loading errors
            logoVideo.addEventListener('error', (e) => {
                console.error("Logo video error:", e);
                logoVideo.style.display = 'none';
            });

            // Ensure video plays when it becomes visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        logoVideo.play().catch(error => {
                            console.warn("Logo video visibility playback error:", error);
                        });
                    }
                });
            });
            observer.observe(logoVideo);
        }
    }

    // Smooth Scroll Function
    function smoothScroll(target, duration) {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - SCROLL_OFFSET;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Navigation Handler
    function handleNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) smoothScroll(target, ANIMATION_DURATION);
                }
            });
        });
    }

    // Portfolio Items Animation
    function handlePortfolioAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        portfolioItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Service Cards Animation
    function handleServiceCardsAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        serviceCards.forEach(card => {
            observer.observe(card);
        });
    }

    // Contact Form Handler
    function handleContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Add loading state
                const submitButton = contactForm.querySelector('button');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                try {
                    // Here you would typically send the form data to your server
                    // For now, we'll just simulate a submission
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Show success message
                    alert('Message sent successfully!');
                    contactForm.reset();
                } catch (error) {
                    console.error('Form submission error:', error);
                    alert('There was an error sending your message. Please try again.');
                } finally {
                    // Reset button state
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }
            });
        }
    }

    // Scroll Animation Handler
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // Initialize Everything
    function init() {
        handleLogoVideo();
        handleNavigation();
        handlePortfolioAnimation();
        handleServiceCardsAnimation();
        handleContactForm();
        handleScrollAnimation();
    }

    init();
});
