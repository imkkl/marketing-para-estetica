// Antes de divulgar, informe o WhatsApp comercial com código do país + DDD + número.
// Exemplo: const WHATSAPP_NUMBER = "5541999999999";
const WHATSAPP_NUMBER = "";

document.getElementById("year").textContent = new Date().getFullYear();

const slides = [...document.querySelectorAll(".hero-slide")];
const dots = [...document.querySelectorAll(".dots button")];
const slideNumber = document.querySelector(".slide-number");
let activeSlide = 0;
let timer;
function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("is-active", i === activeSlide));
  dots.forEach((dot, i) => dot.classList.toggle("is-active", i === activeSlide));
  slideNumber.innerHTML = `0${activeSlide + 1} <i>/</i> 03`;
}
function restartTimer() {
  clearInterval(timer);
  timer = setInterval(() => showSlide(activeSlide + 1), 6500);
}
document.querySelector(".hero-next").addEventListener("click", () => { showSlide(activeSlide + 1); restartTimer(); });
document.querySelector(".hero-prev").addEventListener("click", () => { showSlide(activeSlide - 1); restartTimer(); });
dots.forEach((dot, index) => dot.addEventListener("click", () => { showSlide(index); restartTimer(); }));
restartTimer();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}));

document.getElementById("lead-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    alert("Antes de receber contatos, configure o número comercial em script.js na variável WHATSAPP_NUMBER. Use apenas números, com código do país e DDD.");
    return;
  }
  const form = new FormData(event.currentTarget);
  const message = [
    "Olá! Gostaria de conversar sobre marketing para minha clínica.",
    `Nome: ${form.get("nome")}`,
    `WhatsApp: ${form.get("whatsapp")}`,
    `E-mail: ${form.get("email") || "Não informado"}`,
    `Mensagem: ${form.get("mensagem") || "Gostaria de conhecer as soluções."}`
  ].join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});
