(() => {
  'use strict';

  const config = window.WHISPER_CONFIG || {};
  const root = document.documentElement;
  const formatPrice = key => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format((config.editionPricesCents?.[key] || 0) / 100);
  document.querySelectorAll('[data-edition-price]').forEach(element => {
    const key = element.dataset.editionPrice;
    if (Number.isInteger(config.editionPricesCents?.[key])) element.textContent = formatPrice(key);
  });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const storageKey = 'whisper-motion-v1';

  function publicHttps(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const url = new URL(value.trim());
      return url.protocol === 'https:' && url.hostname && !url.username && !url.password
        ? url.href : '';
    } catch {
      return '';
    }
  }

  function setDestination(anchor, value) {
    if (!anchor) return false;
    const href = publicHttps(value);
    if (href) {
      anchor.href = href;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.removeAttribute('aria-disabled');
      anchor.removeAttribute('disabled');
      anchor.removeAttribute('tabindex');
    } else {
      anchor.removeAttribute('href');
      anchor.removeAttribute('target');
      anchor.removeAttribute('rel');
      anchor.setAttribute('aria-disabled', 'true');
      anchor.setAttribute('tabindex', '-1');
    }
    return Boolean(href);
  }

  document.querySelectorAll('a[data-reading]').forEach(anchor => {
    const destination = config.reading?.[anchor.dataset.reading];
    const ready = setDestination(anchor, destination?.url);
    const status = anchor.querySelector('small');
    if (status) status.textContent = ready ? destination.label || 'Read online' : 'Not available yet';
  });
  const heroReadLabel = document.getElementById('hero-read-label');
  if (heroReadLabel) heroReadLabel.textContent = Object.values(config.reading || {}).some(item => publicHttps(item.url)) ? 'Continue the story' : 'Explore the manga';
  document.querySelectorAll('a[data-social]').forEach(anchor => {
    setDestination(anchor, config.social?.[anchor.dataset.social]);
  });
  document.querySelectorAll('a[data-shop]').forEach(anchor => {
    setDestination(anchor, config.shop?.[anchor.dataset.shop]);
  });
  document.querySelectorAll('a[data-privacy]').forEach(anchor => {
    setDestination(anchor, config.privacyUrl);
  });
  const newsletterReady = setDestination(
    document.getElementById('newsletter-link'), config.newsletterUrl
  );
  const newsletterNote = document.getElementById('newsletter-note');
  if (newsletterNote) newsletterNote.textContent = newsletterReady
    ? 'Opens Virand’s official email sign-up page. Registration is completed there.'
    : 'Email sign-up is not available yet. Follow Virand on Instagram or Facebook.';
  const newsletterLabel = document.getElementById('newsletter-label');
  if (newsletterLabel) newsletterLabel.textContent = newsletterReady ? 'Join the Reader’s Guild' : 'Email sign-up opens soon';
  const privacy = document.querySelector('a[data-privacy]');
  if (privacy?.hasAttribute('href')) privacy.textContent = 'Privacy notice';

  const menuToggle = document.getElementById('menu-toggle');
  const navigation = document.getElementById('primary-nav');
  function setMenu(open) {
    if (!menuToggle || !navigation) return;
    navigation.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  }
  menuToggle?.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  navigation?.addEventListener('click', event => {
    if (event.target.closest('a[href]')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuToggle.focus();
    }
  });

  let motionChoice = null;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'paused' || stored === 'playing') motionChoice = stored;
  } catch { /* Motion controls also work when browser storage is unavailable. */ }

  const motionToggle = document.getElementById('motion-toggle');
  // Native animated images need a static source to stop, unlike CSS animation.
  // The original pixel art stays decorative and loads only when it is visible.
  const companions = [...document.querySelectorAll('img[data-animated][data-still]')];
  const visibleCompanions = new Set();
  function syncCompanions() {
    const play = root.dataset.motion === 'playing' && !document.hidden;
    companions.forEach(image => {
      const source = play && visibleCompanions.has(image)
        ? image.dataset.animated : image.dataset.still;
      if (image.getAttribute('src') !== source) image.src = source;
    });
  }
  function applyMotion() {
    const paused = reducedMotion.matches || motionChoice === 'paused';
    root.dataset.motion = paused ? 'paused' : 'playing';
    syncCompanions();
    if (motionToggle) {
      motionToggle.disabled = reducedMotion.matches;
      motionToggle.title = reducedMotion.matches ? 'Motion is reduced by your device setting.' : '';
      motionToggle.setAttribute('aria-pressed', String(paused));
      const label = motionToggle.querySelector('.motion-label');
      if (label) label.textContent = reducedMotion.matches ? 'Motion reduced' : paused ? 'Play motion' : 'Pause motion';
      if (label) motionToggle.setAttribute('aria-label', label.textContent);
      motionToggle.querySelector('path')?.setAttribute('d', paused ? 'M7 4l8 6-8 6z' : 'M7 5v10M13 5v10');
    }
  }
  motionToggle?.addEventListener('click', () => {
    motionChoice = root.dataset.motion === 'paused' ? 'playing' : 'paused';
    try { localStorage.setItem(storageKey, motionChoice); } catch { /* Optional preference. */ }
    applyMotion();
  });
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', applyMotion);
  else reducedMotion.addListener?.(applyMotion);
  applyMotion();
  if ('IntersectionObserver' in window) {
    const companionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visibleCompanions.add(entry.target);
        else visibleCompanions.delete(entry.target);
      });
      syncCompanions();
    }, { threshold: 0 });
    companions.forEach(image => companionObserver.observe(image));
  }
  function syncPageVisibility() {
    root.dataset.pageHidden = String(document.hidden);
    syncCompanions();
  }
  syncPageVisibility();
  document.addEventListener('visibilitychange', syncPageVisibility);
  if ('IntersectionObserver' in window) {
    const runeObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.dataset.runesVisible = String(entry.isIntersecting);
    }));
    document.querySelectorAll('.rune-field').forEach(field => runeObserver.observe(field));
  }

  const hero = document.getElementById('hero');
  const header = document.getElementById('site-header');
  if (hero && header && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      header.classList.toggle('scrolled', !entries[0].isIntersecting);
    }).observe(hero);
  }

  if (navigation) {
    const links = [...navigation.querySelectorAll('a[href^="#"]')];
    const sections = links.map(link => document.querySelector(link.hash)).filter(Boolean);
    let locationPending = false;
    function updateLocation() {
      locationPending = false;
      const active = sections.filter(section => {
        const bounds = section.getBoundingClientRect();
        return bounds.top < innerHeight * 0.45 && bounds.bottom > 90;
      }).pop();
      links.forEach(link => {
        if (active && link.hash === '#' + active.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    function scheduleLocation() {
      if (locationPending) return;
      locationPending = true;
      requestAnimationFrame(updateLocation);
    }
    window.addEventListener('scroll', scheduleLocation, { passive: true });
    window.addEventListener('resize', scheduleLocation, { passive: true });
    updateLocation();
  }

  const openers = new WeakMap();
  function openDialog(dialog, opener) {
    if (!dialog) return;
    openers.set(dialog, opener);
    if (dialog.open) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }
  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else {
      dialog.removeAttribute('open');
      openers.get(dialog)?.focus();
    }
  }
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => {
      const opener = openers.get(dialog);
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right ||
          event.clientY < box.top || event.clientY > box.bottom) closeDialog(dialog);
    });
  });
  document.querySelectorAll('[data-close-dialog]').forEach(button => {
    button.addEventListener('click', () => closeDialog(button.closest('dialog')));
  });

  const editions = {
    standard: {
      title: 'Whisper — Volume 1',
      description: 'Start the adventure in print with the standard edition of Whisper Volume 1.',
      image: 'assets/regular-cover-source.webp',
      alt: 'Whisper Volume 1 regular cover from the creator’s promotional artwork.',
      disclaimer: 'Italian edition. Check MangaSenpai for current ordering terms, release dates and availability.'
    },
    variant1: {
      title: 'Variant Cover 01',
      description: 'The cast of Whisper comes together on this special cover. Listed as Variant Edition 2 on MangaSenpai.',
      image: 'assets/variant-one-source.webp',
      alt: 'Whisper Variant 1 cover from the creator’s promotional artwork.',
      disclaimer: 'Italian edition. Check the publisher’s current listing for release dates, availability and any bonus offer.'
    },
    variant2: {
      title: 'Lucca Variant',
      description: 'The Lucca special cover edition. Another way to bring the world of Whisper to your shelf.',
      image: 'assets/lucca-cover-source.webp',
      alt: 'Whisper Lucca variant cover with Hake in profile.',
      disclaimer: 'Italian edition. Check the publisher’s current listing for release dates, availability and any bonus offer.'
    }
  };
  const editionDialog = document.getElementById('edition-dialog');
  document.querySelectorAll('button[data-edition]').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.edition;
      const edition = editions[key];
      if (!edition || !editionDialog) return;
      const title = document.getElementById('edition-title');
      const description = document.getElementById('edition-description');
      const image = document.getElementById('edition-image');
      const disclaimer = document.getElementById('edition-disclaimer');
      const shop = document.getElementById('edition-shop');
      if (title) title.textContent = edition.title;
      if (description) description.textContent = edition.description;
      const price = document.getElementById('edition-price');
      if (price) price.textContent = Number.isInteger(config.editionPricesCents?.[key]) ? formatPrice(key) : '';
      if (image) {
        image.src = edition.image;
        image.alt = edition.alt;
      }
      const cover = editionDialog.querySelector('.dialog-art');
      if (cover) { cover.classList.add('is-source'); cover.dataset.cover = key; }
      if (disclaimer) disclaimer.textContent = edition.disclaimer;
      if (shop) {
        shop.dataset.shop = key;
        const ready = setDestination(shop, config.shop?.[key]);
        const pending = editionDialog.querySelector('.shop-pending');
        if (pending) pending.textContent = ready ? 'Opens the official shop in a new tab.' : 'Shop link coming soon.';
      }
      openDialog(editionDialog, button);
    });
  });

  const artDialog = document.getElementById('art-dialog');
  const artworks = [...document.querySelectorAll('button[data-art]')];
  let activeArtwork = 0;
  function showArtwork(index) {
      activeArtwork = (index + artworks.length) % artworks.length;
      const button = artworks[activeArtwork];
      const source = button.dataset.art;
      if (!source || !artDialog) return;
      const title = button.dataset.artTitle || 'Whisper artwork';
      const image = document.getElementById('art-image');
      const heading = document.getElementById('art-title');
      if (heading) heading.textContent = title;
      if (image) {
        image.src = source;
        image.alt = button.dataset.artAlt || button.querySelector('img')?.alt || title;
      }
      const position = document.getElementById('art-position');
      if (position) position.textContent = `Artwork ${activeArtwork + 1} of ${artworks.length}`;
  }
  artworks.forEach((button, index) => {
    button.addEventListener('click', () => {
      showArtwork(index);
      openDialog(artDialog, button);
    });
  });
  document.querySelectorAll('[data-art-step]').forEach(button => {
    button.addEventListener('click', () => showArtwork(activeArtwork + Number(button.dataset.artStep)));
  });
  artDialog?.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    showArtwork(activeArtwork + (event.key === 'ArrowLeft' ? -1 : 1));
  });

  const editionTrack = document.getElementById('edition-track');
  const galleryButtons = [...document.querySelectorAll('button[data-gallery-step]')];
  if (editionTrack) {
    const cards = [...editionTrack.querySelectorAll('.edition-card')];
    function updateGallery() {
      const maximum = Math.max(0, editionTrack.scrollWidth - editionTrack.clientWidth);
      const overflowing = maximum > 2;
      document.querySelector('.gallery-controls').hidden = !overflowing;
      document.querySelector('.gallery-progress').hidden = !overflowing;
      editionTrack.tabIndex = overflowing ? 0 : -1;
      const position = Math.min(cards.length - 1, Math.round(editionTrack.scrollLeft / Math.max(1, (cards[1]?.offsetLeft || 0) - cards[0].offsetLeft)));
      document.getElementById('gallery-position').textContent = `Edition ${position + 1} of ${cards.length}`;
      document.querySelectorAll('.gallery-segments span').forEach((segment, index) => segment.classList.toggle('is-current', index === position));
      galleryButtons.forEach(button => {
        const previous = Number(button.dataset.galleryStep) < 0;
        button.disabled = previous ? editionTrack.scrollLeft <= 2 : editionTrack.scrollLeft >= maximum - 2;
      });
    }
    galleryButtons.forEach(button => {
      button.addEventListener('click', () => {
        const step = Number(button.dataset.galleryStep) < 0 ? -1 : 1;
        editionTrack.scrollBy({
          left: ((cards[1]?.offsetLeft || 0) - cards[0].offsetLeft || editionTrack.clientWidth) * step,
          behavior: reducedMotion.matches || root.dataset.motion === 'paused' ? 'auto' : 'smooth'
        });
      });
    });
    editionTrack.addEventListener('keydown', event => {
      if (event.target !== editionTrack || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const button = galleryButtons.find(item => Number(item.dataset.galleryStep) === (event.key === 'ArrowLeft' ? -1 : 1));
      if (button && !button.disabled) button.click();
    });
    editionTrack.addEventListener('scroll', updateGallery, { passive: true });
    window.addEventListener('resize', updateGallery, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(updateGallery).observe(editionTrack);
    editionTrack.querySelectorAll('img').forEach(image => image.addEventListener('load', updateGallery));
    updateGallery();
  }

  const tablist = document.getElementById('lore-tabs');
  if (tablist) {
    const tabs = [...tablist.querySelectorAll('[role="tab"]')].filter(tab =>
      document.getElementById(tab.getAttribute('aria-controls'))
    );
    function activateTab(active, focus = false) {
      tabs.forEach(tab => {
        const selected = tab === active;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
      });
      if (focus) active.focus();
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        activateTab(tabs[next], true);
      });
    });
    if (tabs.length) activateTab(tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0]);
  }
})();
