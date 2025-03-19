document.addEventListener("DOMContentLoaded", () => {
    // Dropdown Menu Functionality (Unchanged)
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.addEventListener('mouseenter', function () {
            this.querySelector('.dropdown-content')?.classList.add('show');
        });

        dropdown.addEventListener('mouseleave', function () {
            this.querySelector('.dropdown-content')?.classList.remove('show');
        });
    }

    // Quote Section Animation (Unchanged)
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



    document.addEventListener("DOMContentLoaded", () => {
        let slideIndex = 1;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        
        // Create dots
        const dotsContainer = document.querySelector('.dots-container');
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => currentSlide(index + 1));
            dotsContainer.appendChild(dot);
        });
    
        function showSlides(n) {
            let i;
            if (n > slides.length) {slideIndex = 1}
            if (n < 1) {slideIndex = slides.length}
    
            // Hide all slides and pause videos
            slides.forEach(slide => {
                slide.style.display = "none";
                const video = slide.querySelector('video');
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            });
    
            // Update dots
            const dots = document.querySelectorAll('.dot');
            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex-1].classList.add('active');
    
            // Show current slide and play video if present
            slides[slideIndex-1].style.display = "block";
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
    
        // Event listeners for next/prev buttons
        prevButton.addEventListener('click', () => plusSlides(-1));
        nextButton.addEventListener('click', () => plusSlides(1));
    
        // Auto advance slides
        setInterval(() => plusSlides(1), 5000);
    
        // Show first slide
        showSlides(slideIndex);
    });})