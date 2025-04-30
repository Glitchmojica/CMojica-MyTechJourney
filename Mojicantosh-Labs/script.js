document.addEventListener("DOMContentLoaded", () => {
    // Constants
    const ANIMATION_DURATION = 300;

    // DOM Elements
    const logoVideo = document.querySelector('#logo-video');
    const navLinks = document.querySelectorAll('nav a');
    const contactForm = document.querySelector('.contact form');
    const showcaseItems = document.querySelectorAll('.showcase-item');

    // Logo Video Handler
    function handleLogoVideo() {
        if (logoVideo) {
            logoVideo.play().catch(error => {
                console.warn("Logo video playback error:", error);
            });

            logoVideo.addEventListener('ended', () => {
                logoVideo.currentTime = 0;
                logoVideo.play().catch(error => {
                    console.warn("Logo video replay error:", error);
                });
            });

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

    // Navigation Handler
    function handleNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // Showcase Items Animation
    function handleShowcaseAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        showcaseItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Contact Form Handler
    function handleContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitButton = contactForm.querySelector('button');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                try {
                    // Simulate form submission
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    alert('Message sent successfully!');
                    contactForm.reset();
                } catch (error) {
                    console.error('Form submission error:', error);
                    alert('There was an error sending your message. Please try again.');
                } finally {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }
            });
        }
    }

    // Initialize Everything
    function init() {
        handleLogoVideo();
        handleNavigation();
        handleShowcaseAnimation();
        handleContactForm();
    }

    init();
});
