document.addEventListener("DOMContentLoaded", () => {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // Show specific slide and toggle visibility of video
    function showSlide(index) {
        slides.forEach((slide, i) => {
            const isActive = i === index;
            slide.classList.toggle('active', isActive);
            dots[i]?.classList.toggle('active', isActive);

            // Handle video play/pause
            const video = slide.querySelector('video');
            if (video) {
                if (isActive) {
                    video.play().catch((err) => console.warn("Error playing video:", err));
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }

    // Change slide by a given number (e.g., next or previous)
    function changeSlide(n) {
        currentSlideIndex = (currentSlideIndex + n + slides.length) % slides.length;
        showSlide(currentSlideIndex);
    }

    // Set a specific slide as active
    function setSlide(index) {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
    }

    // Initial slide setup
    showSlide(currentSlideIndex);

    // Navigation buttons
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    prevBtn?.addEventListener('click', () => changeSlide(-1));
    nextBtn?.addEventListener('click', () => changeSlide(1));

    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => setSlide(index));
    });

    // Dropdown menu behavior
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.addEventListener('click', function (event) {
            const content = this.querySelector('.dropdown-content');
            if (content) {
                event.preventDefault();
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (event) {
            if (!dropdown.contains(event.target)) {
                const content = dropdown.querySelector('.dropdown-content');
                if (content) content.style.display = 'none';
            }
        });
    }

    // Chibi Einstein hover logic
    const quoteContainer = document.getElementById('quote-container');
    const chibiEinstein = document.getElementById('chibi-einstein');

    if (quoteContainer && chibiEinstein) {
        chibiEinstein.style.display = 'none';

        quoteContainer.addEventListener('mouseenter', () => {
            chibiEinstein.style.display = 'block';
        });

        quoteContainer.addEventListener('mouseleave', () => {
            chibiEinstein.style.display = 'none';
        });
    }
});
