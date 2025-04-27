// Slideshow functionality (homepage)
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots-container');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

// Only run slideshow if slides exist
if (slides.length) {
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlideFunc() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlideFunc);

    setInterval(nextSlide, 5000); // Auto-advance slides every 5 seconds
}

// Form submission functionality (simple form)
const form = document.getElementById('contact-form');
const formResponse = document.getElementById('form-response');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        formResponse.textContent = "Thank you for your message! I'll get back to you soon.";
        form.reset();
    });
}
