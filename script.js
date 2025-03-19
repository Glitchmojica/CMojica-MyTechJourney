document.addEventListener("DOMContentLoaded", () => {
    // Dropdown Menu Functionality
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.addEventListener('mouseenter', function () {
            this.querySelector('.dropdown-content')?.classList.add('show');
        });

        dropdown.addEventListener('mouseleave', function () {
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

    // Slideshow Functionality
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
    
        // Hide all slides, pause videos, and reset captions
        slides.forEach(slide => {
            slide.style.display = "none";
            const video = slide.querySelector('video');
            const caption = slide.querySelector('.caption');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            if (caption) {
                caption.style.opacity = '0';
                caption.style.transform = 'translateY(100%)';
            }
        });
    
        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[slideIndex-1]) {
            dots[slideIndex-1].classList.add('active');
        }
    
        // Show current slide, play video if present, and animate caption
        slides[slideIndex-1].style.display = "block";
        const currentVideo = slides[slideIndex-1].querySelector('video');
        const currentCaption = slides[slideIndex-1].querySelector('.caption');
        
        if (currentVideo) {
            currentVideo.play().catch(e => console.log("Video play error:", e));
        }
        
        // Animate caption
        if (currentCaption) {
            setTimeout(() => {
                currentCaption.style.opacity = '1';
                currentCaption.style.transform = 'translateY(0)';
            }, 300);
        }
    }
    

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    // Event listeners for next/prev buttons
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => plusSlides(-1));
        nextButton.addEventListener('click', () => plusSlides(1));
    }

    // Auto advance slides
    const slideInterval = setInterval(() => plusSlides(1), 5000);

    // Show first slide
    showSlides(slideIndex);

    // Pause auto-advance when hovering over slideshow
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slideshowContainer.addEventListener('mouseleave', () => {
            setInterval(() => plusSlides(1), 5000);
        });
    }
});
