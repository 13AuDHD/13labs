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
   const slides = Array.from(carouselTrack.children);
   const slideWidth = slides.length > 0 ? slides()[0].offsetWidth : 0; // Get initial slide width

   let currentIndex = 0;
   let isDragging = false;
   let startPosition = 0;
   let currentTranslate = 0;
   let previousTranslate = 0;

   // Initialize slides positions
   const setSlidePosition = (slide, index) => {
       slide.style.left = slideWidth * index + 'px';
   };

   function updateCarousel() {
       carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
   }

   function getPositionX(event) {
       return event.type.includes('mouse') ? event.clientX : event.touches()[0].clientX;
   }

   function startDrag(event) {
       isDragging = true;
       startPosition = getPositionX(event);
       carouselContainer.classList.add('dragging');
       // Get current translateX value
       const transformMatrix = window.getComputedStyle(carouselTrack).transform;
       if (transformMatrix !== 'none') {
           previousTranslate = parseFloat(transformMatrix.split(', ')[4]);
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

       if (movedBy < -50 && currentIndex < slides.length - 1) {
           currentIndex++;
       }
       if (movedBy > 50 && currentIndex > 0) {
           currentIndex--;
       }

       // Recalculate slideWidth in case of resizing
       const newSlideWidth = slides.length > 0 ? slides()[0].offsetWidth : 0;
       currentTranslate = -currentIndex * newSlideWidth;
       updateCarousel();
   }

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

   // Update slides array after they are added to the DOM
   const updateSlides = () => Array.from(carouselTrack.children);
   let allSlides = updateSlides();

   // Recalculate slideWidth and update positions on resize
   const handleResize = () => {
       allSlides = updateSlides();
       if (allSlides.length > 0) {
           const newSlideWidth = allSlides()[0].offsetWidth;
           currentTranslate = -currentIndex * newSlideWidth;
           updateCarousel();
       }
   };

   window.addEventListener('resize', handleResize);
   handleResize(); // Initial calculation

   // Navigation button functionality
   nextButton.addEventListener('click', () => {
       if (currentIndex < allSlides.length - 1) {
           currentIndex++;
           const newSlideWidth = allSlides.length > 0 ? allSlides()[0].offsetWidth : 0;
           currentTranslate = -currentIndex * newSlideWidth;
           updateCarousel();
       }
   });

   prevButton.addEventListener('click', () => {
       if (currentIndex > 0) {
           currentIndex--;
           const newSlideWidth = allSlides.length > 0 ? allSlides()[0].offsetWidth : 0;
           currentTranslate = -currentIndex * newSlideWidth;
           updateCarousel();
       }
   });

   // Keyboard navigation
   window.addEventListener('keydown', function(e) {
       if (e.key === 'ArrowLeft') {
           prevButton.click();
       }
       if (e.key === 'ArrowRight') {
           nextButton.click();
       }
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

   // Modal functionality (remains the same)
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

// Helper function to get touches array (for better compatibility)
function touches() {
   return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
       ? event.changedTouches
       : [event];
}
