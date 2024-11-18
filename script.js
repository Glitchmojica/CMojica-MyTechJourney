document.addEventListener("DOMContentLoaded", () => {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            const video = slide.querySelector('video');
            slide.style.display = i === index ? 'block' : 'none';
            slide.style.opacity = i === index ? '1' : '0';
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

    // Cursor setup
    let clientX = -100;
    let clientY = -100;
    const innerCursor = document.querySelector(".cursor--small");

    document.addEventListener("mousemove", (event) => {
        clientX = event.clientX;
        clientY = event.clientY;
    });

    function initCursor() {
        const render = () => {
            innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    }

    initCursor();

    // Set up canvas for the red circle cursor
    function initCanvas() {
        const canvas = document.querySelector(".cursor--canvas");
        if (!canvas) return;  // Ensure canvas exists to avoid errors
        const shapeBounds = { width: 75, height: 75 };

        paper.setup(canvas);
        const strokeColor = "rgba(255, 0, 0, 0.5)";
        const strokeWidth = 1;
        const segments = 8;
        const radius = 15;

        const polygon = new paper.Path.RegularPolygon(new paper.Point(0, 0), segments, radius);
        polygon.strokeColor = strokeColor;
        polygon.strokeWidth = strokeWidth;
        polygon.smooth();

        const group = new paper.Group([polygon]);
        group.applyMatrix = false;

        const noiseObjects = polygon.segments.map(() => new SimplexNoise());
        let lastX = 0, lastY = 0;

        paper.view.onFrame = (event) => {
            lastX += (clientX - lastX) * 0.2;
            lastY += (clientY - lastY) * 0.2;
            group.position = new paper.Point(lastX, lastY);
        }
    }

    initCanvas();
});
