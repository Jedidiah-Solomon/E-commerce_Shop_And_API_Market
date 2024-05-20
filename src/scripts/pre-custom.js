//Mobile  hamburgar menu
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navbar = document.getElementById("navbar");

  hamburger.addEventListener("click", function () {
    navbar.classList.toggle("show");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero .slide");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  let currentSlideIndex = 0;
  let interval;

  console.log(slides); //The three slides nodelist

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      console.log(`Index is: ${index} and I is: ${i}`); //Just for checking purpose
      slide.classList.toggle("visible", i === index);
      slide.classList.toggle("hidden", i !== index);
    });
  };

  // 2 % 3 = 0 with a remainder of 2. Hence 2 mod 3 = 2 unlike 3 mod 2 on the other hand  which is equal to 1.
  const nextSlide = () => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
  };

  const prevSlide = () => {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
  };

  interval = setInterval(nextSlide, 5000);

  leftArrow.addEventListener("click", () => {
    clearInterval(interval);
    prevSlide();
    interval = setInterval(nextSlide, 5000);
  });

  rightArrow.addEventListener("click", () => {
    clearInterval(interval);
    nextSlide();
    interval = setInterval(nextSlide, 5000);
  });

  // Initialize the first slide
  showSlide(currentSlideIndex);
});

//----------------Copy Year Date-------------//
const copyYear = document.getElementById("copy-year");

date = new Date();
date = date.getFullYear();
copyYear.textContent = date;

console.log(date);
console.log(copyYear);
