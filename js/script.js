const images = document.querySelectorAll(
  ".product-item img, .portfolio-item img",
);

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");

const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let current = 0;

// открыть фото
function openImage(index) {
  current = index;

  modal.classList.add("active");
  modalImg.src = images[current].src;
}

// следующее фото
function nextImage() {
  current++;

  if (current >= images.length) current = 0;

  modalImg.src = images[current].src;
}

// предыдущее фото
function prevImage() {
  current--;

  if (current < 0) current = images.length - 1;

  modalImg.src = images[current].src;
}

// клик по картинке
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    openImage(index);
  });
});

// кнопки
nextBtn.addEventListener("click", nextImage);

prevBtn.addEventListener("click", prevImage);

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

// закрытие по фону
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

// клавиатура
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("active")) return;

  if (e.key === "ArrowRight") nextImage();

  if (e.key === "ArrowLeft") prevImage();

  if (e.key === "Escape") modal.classList.remove("active");
});

// свайпы на телефоне
let startX = 0;

modal.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

modal.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) nextImage();

  if (endX - startX > 50) prevImage();
});

VanillaTilt.init(document.querySelectorAll(".product-item, .portfolio-item"), {
  max: 22,
  speed: 500,
  perspective: 1600,
  scale: 1.08,
  glare: true,
  "max-glare": 0.35,
  gyroscope: true,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
});
