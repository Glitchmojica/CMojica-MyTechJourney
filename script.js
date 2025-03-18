document.addEventListener("DOMContentLoaded", () => {
    // Initialize variables
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slideInterval = 5000; // 5 seconds between automatic slides
    let slideTimer;

    // Slideshow Functions
    function showSlide(index) {
        if (!slides.length) return;
        
        currentSlideIndex = (index + slides.length) % slides.length;
        
        slides.forEach((slide, i) => {
            const isActive = i === currentSlideIndex;
            slide.classList.toggle('active', isActive);
            dots[i]?.classList.toggle('active', isActive);

            const video = slide.querySelector('video');
            if (video) {
                if (isActive) {
                    video.play().catch(err => console.warn("Video playback error:", err));
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }

    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    function previousSlide() {
        showSlide(currentSlideIndex - 1);
    }

    function startSlideTimer() {
        stopSlideTimer();
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    function stopSlideTimer() {
        if (slideTimer) clearInterval(slideTimer);
    }

    // Event Listeners for Slideshow
    document.querySelector('.prev')?.addEventListener('click', () => {
        previousSlide();
        startSlideTimer();
    });

    document.querySelector('.next')?.addEventListener('click', () => {
        nextSlide();
        startSlideTimer();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startSlideTimer();
        });
    });

    // Dropdown Menu Functionality
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-content')?.classList.add('show');
        });

        dropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-content')?.classList.remove('show');
        });
    }

    // Quote Section Animation
    const quoteSection = document.getElementById('quote-section');
    const chibiEinstein = document.getElementById('chibi-einstein');

    if (quoteSection && chibiEinstein) {
        quoteSection.addEventListener('mouseenter', () => {
            chibiEinstein.style.opacity = '1';
        });

        quoteSection.addEventListener('mouseleave', () => {
            chibiEinstein.style.opacity = '0';
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
                previousSlide();
                startSlideTimer();
                break;
            case 'ArrowRight':
                nextSlide();
                startSlideTimer();
                break;
            case 'Escape':
                document.querySelector('.dropdown-content')?.classList.remove('show');
                break;
        }
    });

    // Initialize slideshow
    showSlide(0);
    startSlideTimer();

    // Pause slideshow when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopSlideTimer();
        } else {
            startSlideTimer();
        }
    });

    // Stop slideshow when user interacts with it
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopSlideTimer);
        sliderContainer.addEventListener('mouseleave', startSlideTimer);
    }
});
