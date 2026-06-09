/**
 * hamburger.js — Menu hambúrguer responsivo
 * Paróquia Nossa Senhora do Carmo (v2.0)
 */

(function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');

  if (!hamburger || !navMenu) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !navMenu.classList.contains('active');
    hamburger.classList.toggle('open', isOpen);
    navMenu.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  // Abre/fecha ao clicar no hambúrguer
  hamburger.addEventListener('click', () => toggleMenu());

  // Fecha ao clicar num link do menu
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Fecha ao clicar fora do menu
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Fecha ao pressionar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleMenu(false);
      hamburger.focus();
    }
  });
})();
