document.addEventListener('DOMContentLoaded', () => {

    const brands = [
        {
            logo: 'brand1_logo.png',
            name: 'Purposeful Brand 1',
            description: 'This is a mission statement for the first purposeful brand.',
            url: 'https://example.com/brand1'
        },
        {
            logo: 'brand2_logo.png',
            name: 'Digital Tool 2',
            description: 'This is a description for the second innovative digital tool.',
            url: 'https://example.com/brand2'
        },
        {
            logo: 'brand3_logo.png',
            name: 'Community Project 3',
            description: 'A community-focused project that brings people together.',
            url: 'https://example.com/brand3'
        },
        {
            logo: 'brand4_logo.png',
            name: 'Accessible Tech 4',
            description: 'Technology designed with accessibility at its core.',
            url: 'https://example.com/brand4'
        },
        {
            logo: 'brand5_logo.png',
            name: 'Bold Visuals 5',
            description: 'A brand that pushes the boundaries of visual design.',
            url: 'https://example.com/brand5'
        }
    ];

    const carouselTrack = document.querySelector('.carousel-track');

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

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const slides = Array.from(carouselTrack.children);
    const slideWidth = slides[0].getBoundingClientRect().width;

    let currentIndex = 0;

    function moveToSlide(track, currentSlide, targetSlide) {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }

    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);


    nextButton.addEventListener('click', e => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        carouselTrack.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    });

    prevButton.addEventListener('click', e => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1;
        }
        carouselTrack.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    });

    window.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        }
        if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });

    // Modal
    const modal = document.getElementById('brandModal');
    const modalLogo = modal.querySelector('.modal-logo');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalLink = modal.querySelector('.modal-link');
    const closeButton = modal.querySelector('.close-button');

    carouselTrack.addEventListener('click', e => {
        if (e.target.classList.contains('brand-logo')) {
            modalLogo.src = e.target.dataset.logo;
            modalTitle.textContent = e.target.dataset.name;
            modalDescription.textContent = e.target.dataset.description;
            modalLink.href = e.target.dataset.url;
            modal.style.display = 'block';
        }
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', e => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
});
