document.addEventListener('DOMContentLoaded', () => {

    const brands = [
        {
            logo: 'madeby13.png',
            name: 'MadeBy13',
            description: 'MadeBy13 started a neurodivergent clothing company that has grown into so much more.',
            url: 'https://madeby13.com/'
        },
        {
            logo: 'echomate.png',
            name: 'EchoMate App',
            description: 'This is a description for the second innovative digital tool.',
            url: 'https://echomate.app/'
        },
        {
            logo: 'autismoverland.png',
            name: 'AutismOverland',
            description: 'A community-focused project that brings people together.',
            url: 'https://autismoverland.com/'
        },
        {
            logo: 'wheredirtlies.png',
            name: '@WhereDirtLies',
            description: 'An AI powered social media account.',
            url: 'https://wheredirtlies.com/'
        },
        {
            logo: '13audhd.png',
            name: '13AuDHD',
            description: 'A personal brand of Thirteen.',
            url: 'https://13audhd.com/'
        }
    ];

    const carouselContainer = document.querySelector('.carousel-container');
    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    // Populate carousel with brand logos
    brands.forEach(brand => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        const img = document.createElement('img');
        img.src = brand.logo;
        img.alt = brand.name + ' Logo';
        img.classList.add('brand-logo');
        img.dataset.name = brand.name;
        img.dataset.description = brand.description;
        img.dataset.url = brand.url;
        img.dataset.logo = brand.logo;
        slide.appendChild(img);
        carouselTrack.appendChild(slide);
    });

    let allSlides = Array.from(carouselTrack.children);
    let currentIndex = 0;
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;

    function getSlideWidth() {
        allSlides = Array.from(carouselTrack.children);
        return allSlides.length > 0 ? allSlides[0].offsetWidth : 0;
    }

    function updateCarousel() {
        carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    }

    function startDrag(event) {
        isDragging = true;
        startPosition = getPositionX(event);
        carouselContainer.classList.add('dragging');
        const transformMatrix = window.getComputedStyle(carouselTrack).transform;
        if (transformMatrix !== 'none') {
            previousTranslate = parseFloat(transformMatrix.split(',')[4]) || 0;
        } else {
            previousTranslate = 0;
        }
        currentTranslate = previousTranslate;
    }

    function drag(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        const diff = currentPosition - startPosition;
        currentTranslate = previousTranslate + diff;
        updateCarousel();
    }

    function endDrag(event) {
        if (!isDragging) return;
        isDragging = false;
        carouselContainer.classList.remove('dragging');

        const movedBy = currentTranslate - previousTranslate;
        const slideWidth = getSlideWidth();

        if (movedBy < -50 && currentIndex < allSlides.length - 1) {
            currentIndex++;
        }
        if (movedBy > 50 && currentIndex > 0) {
            currentIndex--;
        }

        currentTranslate = -currentIndex * slideWidth;
        updateCarousel();
    }

    const handleResize = () => {
        // Recalculate slide width and update positions on resize
        const slideWidth = getSlideWidth();
        currentTranslate = -currentIndex * slideWidth;
        updateCarousel();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial calculation

    // Navigation button functionality
    nextButton.addEventListener('click', () => {
        if (currentIndex < allSlides.length - 1) {
            currentIndex++;
            const slideWidth = getSlideWidth();
            currentTranslate = -currentIndex * slideWidth;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            const slideWidth = getSlideWidth();
            currentTranslate = -currentIndex * slideWidth;
            updateCarousel();
        }
    });

    // Keyboard navigation
    window.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevButton.click();
        if (e.key === 'ArrowRight') nextButton.click();
    });

    // Touch and Mouse event listeners for dragging
    carouselContainer.addEventListener('mousedown', startDrag);
    carouselContainer.addEventListener('touchstart', startDrag);

    carouselContainer.addEventListener('mousemove', drag);
    carouselContainer.addEventListener('touchmove', drag);

    carouselContainer.addEventListener('mouseup', endDrag);
    carouselContainer.addEventListener('mouseleave', endDrag);
    carouselContainer.addEventListener('touchend', endDrag);
    carouselContainer.addEventListener('touchcancel', endDrag);

    // Modal functionality (unchanged)

});
