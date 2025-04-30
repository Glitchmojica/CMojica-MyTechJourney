document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 1;
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

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
