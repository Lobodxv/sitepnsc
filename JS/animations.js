/**
 * animations.js — Animações de entrada via IntersectionObserver
 * Paróquia Nossa Senhora do Carmo (v2.0)
 */

(function () {
  // Respeita a preferência do usuário por movimento reduzido
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Anima apenas uma vez
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  // Observa todos os elementos com a classe .fade-in
  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
})();
