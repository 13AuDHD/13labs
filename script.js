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
