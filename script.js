// 💖 Add your photo paths here
const photos = [
  "images/photo1.jpg",
  "images/photo2.jpg",
  "images/photo3.jpg",
  "images/photo4.jpg",
  "images/photo5.jpg",
  "images/photo6.jpg",
  "images/photo7.jpg"
];

let currentIndex = 0;
let slideshowInterval;

const slideImage = document.getElementById("slideImage");
const romanticSong = document.getElementById("romanticSong");
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseBox = document.getElementById("surpriseBox");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dots");

// -----------------------------
// ✨ 1) Typewriter Message
// -----------------------------
const typewriterText = `Maa & Baba 💕  
36 years of love, laughter, and togetherness 🌸✨  
Thank you for being the most beautiful couple and the best parents 💖  
You are my forever inspiration 💑`;

const typewriterEl = document.getElementById("typewriter");
let typeIndex = 0;

function typeWriterEffect() {
  if (typeIndex < typewriterText.length) {
    typewriterEl.innerHTML += typewriterText.charAt(typeIndex) === "\n"
      ? "<br>"
      : typewriterText.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeWriterEffect, 35);
  }
}
typeWriterEffect();

// -----------------------------
// ✨ 2) Love Counter (36 years)
// -----------------------------
// Set your parents' anniversary start date here (EDIT THIS!)
const loveStartDate = new Date("1989-01-01T00:00:00"); 
// Example: "1989-08-20T00:00:00" (YYYY-MM-DD)

function updateLoveCounter() {
  const now = new Date();
  const diff = now - loveStartDate;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}

setInterval(updateLoveCounter, 1000);
updateLoveCounter();

// -----------------------------
// ✨ 3) Slideshow + Dots
// -----------------------------
function showPhoto(index) {
  currentIndex = index;
  slideImage.src = photos[currentIndex];
  updateDots();
}

function nextPhoto() {
  currentIndex = (currentIndex + 1) % photos.length;
  showPhoto(currentIndex);
}

function prevPhoto() {
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  showPhoto(currentIndex);
}

function startSlideshow() {
  slideshowInterval = setInterval(nextPhoto, 3000);
}

function stopSlideshow() {
  clearInterval(slideshowInterval);
}

function createDots() {
  dotsContainer.innerHTML = "";
  photos.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      showPhoto(index);
    });
    dotsContainer.appendChild(dot);
  });
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[currentIndex]) dots[currentIndex].classList.add("active");
}

createDots();
startSlideshow();

// Buttons
nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  stopSlideshow();
  nextPhoto();
  startSlideshow();
});

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  stopSlideshow();
  prevPhoto();
  startSlideshow();
});

// -----------------------------
// ✨ 4) Music Start (browser safe)
// -----------------------------
let userInteracted = false;

function startMusicOnce() {
  if (!userInteracted) {
    userInteracted = true;
    romanticSong.play().catch(() => {
      // Some browsers block autoplay until user clicks
    });
  }
}

document.addEventListener("click", startMusicOnce, { once: true });

// Tap photo = play/pause
slideImage.addEventListener("click", () => {
  if (romanticSong.paused) {
    romanticSong.play();
  } else {
    romanticSong.pause();
  }
});

// -----------------------------
// ✨ 5) Surprise Button + Heart Confetti
// -----------------------------
surpriseBtn.addEventListener("click", () => {
  if (surpriseBox.style.display === "block") {
    surpriseBox.style.display = "none";
  } else {
    surpriseBox.style.display = "block";
    popHeartConfetti();
  }
});

function popHeartConfetti() {
  const confettiContainer = document.getElementById("confetti-container");
  const hearts = ["💖", "💘", "💝", "💕", "💗", "💞", "💓"];

  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.classList.add("confetti-heart");
    heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-10px";
    heart.style.fontSize = Math.floor(Math.random() * 15 + 18) + "px";

    confettiContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 2500);
  }
}
// ✨ Sparkle trail
document.addEventListener("mousemove", (e) => {
  const sparkleContainer = document.getElementById("sparkle-container");
  const sparkle = document.createElement("div");

  const sparkles = ["✨", "💖", "🌸", "💫", "💕"];
  sparkle.innerText = sparkles[Math.floor(Math.random() * sparkles.length)];

  sparkle.classList.add("sparkle");
  sparkle.style.left = e.pageX + "px";
  sparkle.style.top = e.pageY + "px";

  sparkleContainer.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 800);
});


// 💌 Love letter popup
const loveLetterBtn = document.getElementById("loveLetterBtn");
const letterPopup = document.getElementById("letterPopup");
const closeLetter = document.getElementById("closeLetter");

loveLetterBtn.addEventListener("click", () => {
  letterPopup.style.display = "flex";
});

closeLetter.addEventListener("click", () => {
  letterPopup.style.display = "none";
});

// close popup when clicking outside card
letterPopup.addEventListener("click", (e) => {
  if (e.target === letterPopup) {
    letterPopup.style.display = "none";
  }
});
