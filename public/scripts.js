let currentSlide = 0;

function showSlide(index) {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-item');
  const totalSlides = slides.length;

  if (index < 0) {
    currentSlide = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }

  track.style.transform = `translateX(-${currentSlide * 280}px)`;
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
});
