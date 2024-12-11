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

    // Cursor position and movement
  let clientX = -100;
  let clientY = -100;
  const innerCursor = document.querySelector(".cursor--small");

  const initCursor = () => {
    document.addEventListener("mousemove", e => {
      clientX = e.clientX;
      clientY = e.clientY;
    });

    const render = () => {
      innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  };

  initCursor();

  // Canvas setup for the noisy circle cursor
  let lastX = 0;
  let lastY = 0;
  let isStuck = false;
  let group, stuckX, stuckY, bigCoordinates = [];

  const initCanvas = () => {
    const canvas = document.querySelector(".cursor--canvas");
    const shapeBounds = { width: 75, height: 75 };
    paper.setup(canvas);
    const strokeColor = "rgba(255, 0, 0, 0.5)";
    const segments = 8;
    const radius = 15;
    const noiseScale = 150;
    const noiseRange = 4;
    let isNoisy = false;

    const polygon = new paper.Path.RegularPolygon(
      new paper.Point(0, 0),
      segments,
      radius
    );
    polygon.strokeColor = strokeColor;
    polygon.smooth();
    group = new paper.Group([polygon]);
    group.applyMatrix = false;

    const noiseObjects = polygon.segments.map(() => new SimplexNoise());

    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const map = (value, in_min, in_max, out_min, out_max) => (
      ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );

    paper.view.onFrame = event => {
      if (!isStuck) {
        lastX = lerp(lastX, clientX, 0.2);
        lastY = lerp(lastY, clientY, 0.2);
        group.position = new paper.Point(lastX, lastY);
      } else if (isStuck) {
        lastX = lerp(lastX, stuckX, 0.2);
        lastY = lerp(lastY, stuckY, 0.2);
        group.position = new paper.Point(lastX, lastY);
      }

      if (isStuck && polygon.bounds.width < shapeBounds.width) {
        polygon.scale(1.08);
      } else if (!isStuck && polygon.bounds.width > 30) {
        if (isNoisy) {
          polygon.segments.forEach((segment, i) => {
            segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1]);
          });
          isNoisy = false;
          bigCoordinates = [];
        }
        polygon.scale(0.92);
      }

      if (isStuck && polygon.bounds.width >= shapeBounds.width) {
        isNoisy = true;
        if (bigCoordinates.length === 0) {
          polygon.segments.forEach((segment, i) => {
            bigCoordinates[i] = [segment.point.x, segment.point.y];
          });
        }

        polygon.segments.forEach((segment, i) => {
          const noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0);
          const noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1);

          const distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange);
          const distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange);

          const newX = bigCoordinates[i][0] + distortionX;
          const newY = bigCoordinates[i][1] + distortionY;

          segment.point.set(newX, newY);
        });
      }
      polygon.smooth();
    };
  };

  initCanvas();