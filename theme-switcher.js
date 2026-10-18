/* Palettes only: no reload, storage, tracking or changes to page interactions. */
(() => {
  'use strict';
  const themes = { blue: '#263f88', dark: '#111b27', light: '#fff7df' };
  const root = document.documentElement;
  function fromUrl() {
    const requested = new URL(location.href).searchParams.get('theme');
    return Object.hasOwn(themes, requested) ? requested : 'blue';
  }
  function apply(theme) {
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themes[theme]);
    document.querySelectorAll('[data-theme-choice]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme));
    });
  }
  apply(fromUrl());
  document.addEventListener('DOMContentLoaded', () => {
    const picker = document.getElementById('theme-picker');
    if (!picker) return;
    apply(fromUrl());
    picker.hidden = false;
    picker.addEventListener('click', event => {
      const button = event.target.closest('[data-theme-choice]');
      if (!button) return;
      const theme = button.dataset.themeChoice;
      if (!Object.hasOwn(themes, theme)) return;
      apply(theme);
      const url = new URL(location.href);
      if (theme === 'blue') url.searchParams.delete('theme');
      else url.searchParams.set('theme', theme);
      history.replaceState(history.state, '', url);
    });
    document.addEventListener('click', event => {
      if (picker.open && !picker.contains(event.target)) picker.open = false;
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && picker.open) {
        picker.open = false;
        picker.querySelector('summary').focus({ preventScroll: true });
      }
    });
    window.addEventListener('popstate', () => apply(fromUrl()));
  });
})();
