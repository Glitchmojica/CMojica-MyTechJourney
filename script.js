document.addEventListener("DOMContentLoaded", () => {
    let currentSlideIndex = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        
        slides.forEach((slide, i) => {
            const video = slide.querySelector('video');
            slide.classList.toggle('active', i === index);
            dots[i].classList.toggle('active', i === index);

            if (video) {
                if (i === index) {
                    video.play();  // Play the video on the active slide
                } else {
                    video.pause(); // Pause the video on inactive slides
                    video.currentTime = 0; // Reset video to start
                }
            }
        });
    }

    function changeSlide(n) {
        const slides = document.querySelectorAll('.slide');
        currentSlideIndex = (currentSlideIndex + n + slides.length) % slides.length;
        showSlide(currentSlideIndex);
    }

    function setSlide(index) {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
    }

    showSlide(currentSlideIndex);

    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => changeSlide(-1));
        nextBtn.addEventListener('click', () => changeSlide(1));
    }

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => setSlide(index));
    });

    // Show Chibi-Einstein on hover
    const quoteContainer = document.getElementById('quote-container');
    const chibiEinstein = document.getElementById('chibi-einstein');
    chibiEinstein.style.display = 'none';

    quoteContainer.addEventListener('mouseover', () => {
        chibiEinstein.style.display = 'block';
    });

    quoteContainer.addEventListener('mouseout', () => {
        chibiEinstein.style.display = 'none';
    });
});
