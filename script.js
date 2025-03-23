document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 1;
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    // Create dots
    const dotsContainer = document.querySelector('.dots-container');
    if (dotsContainer && slides.length > 0) {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => currentSlide(index + 1));
            dotsContainer.appendChild(dot);
        });
    }

    function showSlides(n) {
        if (!slides.length) return;

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = "none";
            slide.classList.remove('active');
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });

        // Show current slide
        slides[slideIndex-1].style.display = "block";
        setTimeout(() => {
            slides[slideIndex-1].classList.add('active');
        }, 10);

        // Play video if present
        const currentVideo = slides[slideIndex-1].querySelector('video');
        if (currentVideo) {
            currentVideo.play().catch(e => console.log("Video play error:", e));
        }

        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[slideIndex-1]) {
            dots[slideIndex-1].classList.add('active');
        }
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    // Initialize first slide
    if (slides.length > 0) {
        slides[0].style.display = "block";
        slides[0].classList.add('active');
        const firstDot = document.querySelector('.dot');
        if (firstDot) {
            firstDot.classList.add('active');
        }
    }

    // Event listeners for next/prev buttons
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => plusSlides(-1));
        nextButton.addEventListener('click', () => plusSlides(1));
    }

    // Auto advance slides
    let slideInterval = setInterval(() => plusSlides(1), 5000);

    // Pause auto-advance when hovering over slideshow
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slideshowContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => plusSlides(1), 5000);
        });
    }
});
