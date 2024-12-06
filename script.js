window.onload = function() {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none'; // Hide the preloader
};


let currentIndex = 0;

function updateSlider(index) {
    const slider = document.querySelector('.slider');
    const card = document.querySelector('.slider .card'); // Assuming each card has a class 'card'
    const cardWidth = card.offsetWidth; // Width of one card
    const gap = 30; // Gap between cards

    // Calculate the exact offset for the desired slide, including gaps
    const offset = index * (cardWidth + gap);
    slider.style.transform = `translateX(-${offset}px)`; // Move slider
    slider.style.opacity = 0.6; // Fade effect for smoother transition
    setTimeout(() => {
        slider.style.opacity = 1;
    }, 350); // Fade duration

    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.menu-item[data-index="${index + 1}"]`).classList.add('active');
}

// Event listener for menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => { 
        const index = parseInt(item.getAttribute('data-index')) - 1; // Convert data-index to number
        currentIndex = index;
        updateSlider(index); // Update slider to the clicked item
    });
});

// Initialize Hammer.js for swipe functionality
const slider = document.querySelector('.slider');
const hammer = new Hammer(slider);

// Swipe left to go to the next slide
hammer.on('swipeleft', () => {
    const totalItems = document.querySelectorAll('.menu-item').length;
    if (currentIndex < totalItems - 1) {
        currentIndex++;
        updateSlider(currentIndex);
    }
});

// Swipe right to go to the previous slide
hammer.on('swiperight', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider(currentIndex);
    }
});

// Ensure the correct position on window resize
window.addEventListener('resize', () => {
    updateSlider(currentIndex);
});

// Initialize the slider with the first slide active
updateSlider(currentIndex);
