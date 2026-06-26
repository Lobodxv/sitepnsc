(function () {
  const STORAGE_KEY = 'pnsc-theme';
  const LIGHT_THEME_COLOR = '#f4ede4';
  const DARK_THEME_COLOR = '#201109';
  const root = document.documentElement;

  function readTheme() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'light' ? 'light' : 'dark';
    } catch (error) {
      return 'dark';
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      // Ignore storage failures.
    }
  }

  function getThemeColorMeta() {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    return meta;
  }

  function applyTheme(theme) {
    const isLight = theme === 'light';
    root.classList.toggle('theme-light', isLight);
    root.dataset.theme = theme;
    root.dataset.layout = document.querySelector('header') ? 'site' : 'simple';

    getThemeColorMeta().content = isLight ? LIGHT_THEME_COLOR : DARK_THEME_COLOR;

    const button = document.querySelector('.theme-toggle');
    if (button) {
      button.setAttribute('aria-pressed', String(isLight));
      button.setAttribute('aria-label', isLight ? 'Alternar para modo escuro' : 'Alternar para modo claro');
      button.innerHTML = isLight
        ? '<i class="bi bi-moon-stars-fill"></i><span class="theme-toggle-label">Modo escuro</span>'
        : '<i class="bi bi-sun-fill"></i><span class="theme-toggle-label">Modo claro</span>';
    }
  }

  function toggleTheme() {
    const nextTheme = root.classList.contains('theme-light') ? 'dark' : 'light';
    saveTheme(nextTheme);
    applyTheme(nextTheme);
  }

  function createButton() {
    if (document.querySelector('.theme-toggle')) {
      return;
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.addEventListener('click', toggleTheme);
    document.body.appendChild(button);

    applyTheme(readTheme());
  }

  applyTheme(readTheme());

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createButton);
  } else {
    createButton();
  }

  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      applyTheme(event.newValue === 'light' ? 'light' : 'dark');
    }
  });
})();
