document.addEventListener("DOMContentLoaded", () => {
    // Constants
    const ANIMATION_DURATION = 300;
    const QUOTE_INTERVAL = 3000;

    // DOM Elements
    const logoVideo = document.querySelector('#logo-video');
    const navLinks = document.querySelectorAll('nav a');
    const contactForm = document.querySelector('.contact form');
    const showcaseItems = document.querySelectorAll('.showcase-item');
    const quoteContainer = document.getElementById('quote-container');

    // Quotes Array
    const quotes = [
        {
            text: "Design is not just what it looks like and feels like. Design is how it works.",
            author: "Steve Jobs"
        },
        {
            text: "Music is the universal language of mankind.",
            author: "Henry Wadsworth Longfellow"
        },
        {
            text: "Fashion is the armor to survive the reality of everyday life.",
            author: "Bill Cunningham"
        },
        {
            text: "Simplicity is the ultimate sophistication.",
            author: "Leonardo da Vinci"
        },
        {
            text: "Everything is designed, but few things are designed well.",
            author: "Brian Reed"
        }
    ];

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

    // Quote Rotation Handler
    function handleQuoteRotation() {
        let currentIndex = 0;

        function updateQuote() {
            const quote = quotes[currentIndex];
            quoteContainer.style.opacity = 0;

            setTimeout(() => {
                quoteContainer.innerHTML = `
                    <h2>"${quote.text}"</h2>
                    <p>- ${quote.author}</p>
                `;
                quoteContainer.style.opacity = 1;
            }, 500);

            currentIndex = (currentIndex + 1) % quotes.length;
        }

        updateQuote(); // Initial quote
        setInterval(updateQuote, QUOTE_INTERVAL);
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
        handleQuoteRotation();
        handleContactForm();
    }

    init();
});
