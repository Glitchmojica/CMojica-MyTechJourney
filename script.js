document.addEventListener("DOMContentLoaded", () => {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            dots[i].classList.toggle('active', i === index);

            const video = slide.querySelector('video');
            if (video) {
                if (i === index) {
                    video.play();
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }

    function changeSlide(n) {
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
    prevBtn.addEventListener('click', () => changeSlide(-1));
    nextBtn.addEventListener('click', () => changeSlide(1));

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => setSlide(index));
    });

    // Handle dropdown menu behavior
    const dropdown = document.querySelector('.dropdown');
    dropdown.addEventListener('click', function(event) {
        event.preventDefault();
        const content = this.querySelector('.dropdown-content');
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });

    // Chibi Einstein hover logic
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
