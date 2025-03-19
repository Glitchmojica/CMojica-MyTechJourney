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



    // Slideshow Functionality
    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("slide");
        let dots = document.getElementsByClassName("dot");

        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
       
        slides[slideIndex - 1].style.display = "block";
    }

    //Automatic Slideshow
    setInterval(() => {
        plusSlides(1);
    }, 3000) // Change image every 3 seconds

    //Generate dots dynamically and add event listeners
    const dotsContainer = document.querySelector('.dots-container');
    const slides = document.querySelectorAll('.slide');

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => currentSlide(i + 1));
        dotsContainer.appendChild(dot);
    }
});



