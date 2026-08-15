/**
 * hamburger.js — Menu hambúrguer responsivo
 * Paróquia Nossa Senhora do Carmo (v2.0)
 */

(function () {
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.querySelector('.main-nav');
  const navMenu = document.getElementById('nav-menu');

  if (!hamburger || !mainNav || !navMenu) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !mainNav.classList.contains('active');
    hamburger.classList.toggle('open', isOpen);
    mainNav.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleMenu());

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('active') &&
        !mainNav.contains(e.target) &&
        !hamburger.contains(e.target)) {
      toggleMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      toggleMenu(false);
      hamburger.focus();
    }
  });
})();
