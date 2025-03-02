// Анимация появления при прокрутке
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// Кнопка прокрутки вверх
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Анимация частиц
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particlesArray = [];
const numberOfParticles = 100;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  constructor(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
    if(this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
  }
  draw(){
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles(){
  particlesArray = [];
  for(let i = 0; i < numberOfParticles; i++){
    particlesArray.push(new Particle());
  }
}

function handleParticles(){
  particlesArray.forEach(particle => {
    particle.update();
    particle.draw();
  });
}

function animateParticles(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Эффект печатающейся строки (typewriter)
const typewriterElement = document.getElementById('typewriter');
const phrases = ["Разработчик, Мечтатель, Долбаеб.", "Сделаю вам бота для тимы."];
let typewriterIndex = 0;
let charIndex = 0;
let currentPhrase = "";
let isDeleting = false;

function type(){
  if(typewriterIndex >= phrases.length){
    typewriterIndex = 0;
  }
  currentPhrase = phrases[typewriterIndex];
  if(isDeleting){
    typewriterElement.textContent = currentPhrase.substring(0, charIndex--);
    if(charIndex < 0){
      isDeleting = false;
      typewriterIndex++;
      setTimeout(type, 500);
    } else {
      setTimeout(type, 50);
    }
  } else {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex++);
    if(charIndex > currentPhrase.length){
      isDeleting = true;
      setTimeout(type, 1000);
    } else {
      setTimeout(type, 150);
    }
  }
}
type();

// Анимация счётчиков достижений
const counters = document.querySelectorAll('.number');
const speed = 200;
function animateCounters(){
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;
      if(count < target){
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

// Запуск анимации счётчиков, когда секция "Достижения" видна
const achievementsSection = document.getElementById('achievements');
const achievementsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      animateCounters();
      achievementsObserver.unobserve(achievementsSection);
    }
  });
}, { threshold: 0.5 });
achievementsObserver.observe(achievementsSection);

// Слайдер отзывов
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
function showTestimonial(index){
  testimonials.forEach((t, i) => {
    t.classList.remove('active');
    if(i === index){
      t.classList.add('active');
    }
  });
}
function nextTestimonial(){
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
}
setInterval(nextTestimonial, 4000);

// Модальное окно для подробного отзыва
const modal = document.getElementById("testimonialModal");
const modalText = document.getElementById("modalText");
const closeModal = document.querySelector(".modal-content .close");
document.querySelectorAll(".more-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const testimonial = e.target.closest(".testimonial");
    const fullText = testimonial.getAttribute("data-fulltext");
    modalText.innerHTML = "<p>" + fullText + "</p>";
    modal.style.display = "block";
  });
});
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if(e.target == modal){
    modal.style.display = "none";
  }
});