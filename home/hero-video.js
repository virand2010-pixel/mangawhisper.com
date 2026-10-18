(() => {
  'use strict';
  const video = document.querySelector('.hero-video');
  const scene = video?.closest('.hero-scene');
  if (!video || !scene || !('IntersectionObserver' in window)) return;
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  let visible = false;
  let pageLoaded = document.readyState === 'complete';
  let failed = false;
  let playPending = false;
  const conserveData = () => connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType);
  const canPlay = () => pageLoaded && visible && !document.hidden &&
    root.dataset.motion === 'playing' && !reducedMotion.matches && !conserveData() && !failed;

  function sync() {
    if (!canPlay()) {
      video.pause();
      if (reducedMotion.matches || conserveData() || failed) video.classList.remove('is-ready');
      return;
    }
    if (!video.hasAttribute('src')) {
      // Native-resolution loop on every screen, including high-density phones.
      video.src = video.dataset.source;
      video.muted = true;
      video.load();
    }
    if (playPending || !video.paused) return;
    playPending = true;
    let interrupted = false;
    Promise.resolve(video.play()).then(() => {
      if (!canPlay()) video.pause();
    }).catch(error => {
      interrupted = error?.name === 'AbortError';
      // Autoplay can be blocked, including iOS Low Power Mode. Keep the artwork.
      if (video.currentTime === 0) video.classList.remove('is-ready');
    }).finally(() => {
      playPending = false;
      // A fast Pause/Play can abort the first request after the second sync.
      if (interrupted && canPlay()) sync();
    });
  }

  video.addEventListener('playing', () => {
    if (canPlay()) video.classList.add('is-ready');
    else video.pause();
  });
  video.addEventListener('error', () => { failed = true; sync(); });
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }, { threshold: 0 }).observe(scene);
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener?.('change', sync);
  connection?.addEventListener?.('change', sync);
  if (!pageLoaded) window.addEventListener('load', () => { pageLoaded = true; sync(); }, { once: true });
  sync();
})();
