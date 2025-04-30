document.addEventListener("DOMContentLoaded", () => {
    // Constants and State
    const SLIDE_INTERVAL_TIME = 5000; // 5 seconds
    const SLIDE_TRANSITION_DELAY = 10;
    let slideIndex = 1;
    let slideInterval;

    // DOM Elements
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dotsContainer = document.querySelector('.dots-container');
    const slideshowContainer = document.querySelector('.slideshow-container');

    // Initialize Dots Navigation
    function initializeDots() {
        if (!dotsContainer || !slides.length) return;

        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Slide ${index + 1}`);
            dot.addEventListener('click', () => currentSlide(index + 1));
            dotsContainer.appendChild(dot);
        });
    }

    // Show Slides Function
    function showSlides(n) {
        if (!slides.length) return;

        // Handle slide index bounds
        slideIndex = n > slides.length ? 1 : n < 1 ? slides.length : n;

        // Reset all slides
        slides.forEach(slide => {
            slide.style.display = "none";
            slide.classList.remove('active');
            handleVideoReset(slide);
        });

        // Show and activate current slide
        const currentSlide = slides[slideIndex - 1];
        currentSlide.style.display = "block";
        
        // Use requestAnimationFrame for smooth transition
        requestAnimationFrame(() => {
            setTimeout(() => {
                currentSlide.classList.add('active');
            }, SLIDE_TRANSITION_DELAY);
        });

        // Handle video playback
        handleVideoPlay(currentSlide);
        updateDots();
    }

    // Video Handling Functions
    function handleVideoReset(slide) {
        const video = slide.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }

    function handleVideoPlay(slide) {
        const video = slide.querySelector('video');
        if (video) {
            video.play().catch(error => {
                console.warn("Video playback error:", error);
            });
        }
    }

    // Update Dots Navigation
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex - 1);
        });
    }

    // Navigation Functions
    function plusSlides(n) {
        showSlides(slideIndex + n);
    }

    function currentSlide(n) {
        showSlides(n);
    }

    // Initialize Slideshow
    function initializeSlideshow() {
        if (!slides.length) return;

        const firstSlide = slides[0];
        firstSlide.style.display = "block";
        firstSlide.classList.add('active');

        const firstDot = document.querySelector('.dot');
        if (firstDot) firstDot.classList.add('active');

        // Set up auto-advance
        startSlideInterval();
    }

    // Interval Control Functions
    function startSlideInterval() {
        slideInterval = setInterval(() => plusSlides(1), SLIDE_INTERVAL_TIME);
    }

    function stopSlideInterval() {
        clearInterval(slideInterval);
    }

    // Event Listeners
    function setupEventListeners() {
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                plusSlides(-1);
                stopSlideInterval();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                plusSlides(1);
                stopSlideInterval();
            });
        }

        if (slideshowContainer) {
            slideshowContainer.addEventListener('mouseenter', stopSlideInterval);
            slideshowContainer.addEventListener('mouseleave', startSlideInterval);
        }

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') plusSlides(-1);
            if (e.key === 'ArrowRight') plusSlides(1);
        });
    }

    // Initialize Everything
    function init() {
        initializeDots();
        initializeSlideshow();
        setupEventListeners();
    }

    init();
});
