document.addEventListener('DOMContentLoaded', () => {

    const carouselContainer = document.querySelector('.carousel-container');
    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');
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

document.addEventListener('DOMContentLoaded', () => {

    const carouselContainer = document.querySelector('.carousel-container');
    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

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

// Contact modal logic
const modal = document.getElementById("contact-modal");
const openBtn = document.getElementById("open-contact-modal");
const closeBtn = document.querySelector(".close-button");

if (modal && openBtn && closeBtn) {
  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

// Brand modal setup
const brandModal = document.getElementById("brand-modal");
const closeBtnBrand = brandModal.querySelector(".close-button");

document.querySelectorAll(".brand-logo").forEach(logo => {
  logo.addEventListener("click", () => {
    const name = logo.dataset.name;
    const url = logo.dataset.url;
    const description = logo.dataset.description;
    const src = logo.src;

    document.getElementById("brand-modal-logo").src = src;
    document.getElementById("brand-modal-logo").alt = name + " Logo";
    document.getElementById("brand-modal-name").textContent = name;
    document.getElementById("brand-modal-url").textContent = url.replace(/^https?:\/\//, '');
    document.getElementById("brand-modal-url").href = url;
    document.getElementById("brand-modal-description").textContent = description;
    document.getElementById("brand-modal-link").href = url;

    brandModal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => brandModal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === brandModal) brandModal.style.display = "none";
});
