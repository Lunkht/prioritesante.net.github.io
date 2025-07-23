document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const carouselInner = carousel.querySelector('.carousel-inner');
        const carouselItems = carousel.querySelectorAll('.carousel-item');
        const prevButton = carousel.querySelector('.carousel-control.prev');
        const nextButton = carousel.querySelector('.carousel-control.next');
        let currentIndex = 0;

        function showSlide(index) {
            const totalItems = carouselItems.length;
            if (index >= totalItems) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = totalItems - 1;
            } else {
                currentIndex = index;
            }
            const offset = -currentIndex * 100;
            carouselInner.style.transform = `translateX(${offset}%)`;
        }

        nextButton.addEventListener('click', () => {
            showSlide(currentIndex + 1);
        });

        prevButton.addEventListener('click', () => {
            showSlide(currentIndex - 1);
        });

        // Auto-play
        setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000); // Change slide every 5 seconds
    }
});