// Antes de publicar, informe o WhatsApp comercial com DDI e DDD, somente números.
// Exemplo de formato: 5541999999999
const WHATSAPP_NUMBER = "";

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("lead-form").addEventListener("submit", event => {
  event.preventDefault();
  if (!WHATSAPP_NUMBER) {
    alert("Antes de receber contatos, configure o número de WhatsApp no arquivo script.js.");
    return;
  }
  const data = new FormData(event.currentTarget);
  const message = [
    "Olá! Gostaria de conversar sobre marketing para minha clínica.",
    `Nome: ${data.get("nome")}`,
    `Clínica: ${data.get("clinica")}`,
    `Objetivo: ${data.get("objetivo")}`
  ].join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});