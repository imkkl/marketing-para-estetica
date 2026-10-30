// Configure o WhatsApp comercial antes de divulgar o site.
// Use código do país + DDD + número, somente dígitos. Ex.: 5541999999999
const WHATSAPP_NUMBER = "";

document.getElementById("year").textContent = new Date().getFullYear();

const slides = [...document.querySelectorAll(".slide")];
const dots = [...document.querySelectorAll(".slide-dots button")];
const count = document.querySelector(".slide-count");
let current = 0;
let carouselTimer;

function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
  dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
  count.innerHTML = `0${current + 1} <i>/</i> 03`;
}
function startCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => showSlide(current + 1), 6500);
}
document.querySelector(".next").addEventListener("click", () => { showSlide(current + 1); startCarousel(); });
document.querySelector(".prev").addEventListener("click", () => { showSlide(current - 1); startCarousel(); });
dots.forEach((dot, i) => dot.addEventListener("click", () => { showSlide(i); startCarousel(); }));
startCarousel();

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("lead-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!WHATSAPP_NUMBER) {
    alert("O site está publicado, mas o WhatsApp ainda precisa ser configurado. Abra script.js e preencha WHATSAPP_NUMBER.");
    return;
  }
  const data = new FormData(event.currentTarget);
  const message = [
    "Olá! Gostaria de conversar sobre marketing para minha clínica.",
    `Nome: ${data.get("nome")}`,
    `Clínica: ${data.get("clinica")}`,
    `Cidade: ${data.get("cidade") || "Não informada"}`,
    `Instagram: ${data.get("instagram") || "Não informado"}`,
    `Objetivo: ${data.get("objetivo")}`
  ].join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});