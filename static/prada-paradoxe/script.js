/* Native browser APIs, no libraries or Figma runtime required. */
(() => {
  'use strict';
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const control = document.querySelector('.motion-control');
  const progress = document.querySelector('.scroll-progress');
  const reveals = [...document.querySelectorAll('.reveal')];
  const counters = [...document.querySelectorAll('[data-count]')];
  const animatedCounters = new WeakSet();
  const frames = new Set();
  let motionEnabled = !reducedMotion.matches;
  let observer;
  let scrollFrame = 0;
  let selectedIngredient = null;
  let hoverIngredient = null;
  let focusedIngredient = null;
  const ingredientControls = [...document.querySelectorAll('[data-ingredient]')];

  function animateCounter(node) {
    if (animatedCounters.has(node) || !motionEnabled) return;
    animatedCounters.add(node);
    const target = Number(node.dataset.count);
    const start = performance.now();
    const duration = 1100;
    function tick(now) {
      const fraction = Math.min((now - start) / duration, 1);
      node.textContent = Math.round(target * (1 - Math.pow(1 - fraction, 3)));
      if (fraction < 1 && motionEnabled) {
        const frame = requestAnimationFrame(time => { frames.delete(frame); tick(time); });
        frames.add(frame);
      } else node.textContent = String(target);
    }
    tick(start);
  }

  function updateProgress() {
    const max = root.scrollHeight - window.innerHeight;
    const fraction = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progress.style.transform = `scaleX(${fraction})`;
    scrollFrame = 0;
  }
  function requestProgress() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
  }

  function setMotion(enabled) {
    motionEnabled = enabled;
    root.classList.toggle('motion-off', !enabled);
    root.classList.toggle('motion-ready', enabled);
    control.setAttribute('aria-pressed', String(enabled));
    control.setAttribute('aria-label', enabled ? 'Wyłącz animacje' : 'Włącz animacje');
    control.querySelector('path').setAttribute('d', enabled ? 'M8 6v12M16 6v12' : 'M8 5l11 7-11 7V5Z');
    if (observer) observer.disconnect();
    if (!enabled || !('IntersectionObserver' in window)) {
      reveals.forEach(node => node.classList.add('is-visible'));
      frames.forEach(cancelAnimationFrame);
      frames.clear();
      counters.forEach(node => { node.textContent = node.dataset.count; });
      return;
    }
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    reveals.forEach(node => {
      if (node.getBoundingClientRect().top <= window.innerHeight * .94) {
        node.classList.add('is-visible');
      } else if (!node.classList.contains('is-visible')) observer.observe(node);
    });
  }

  function syncIngredients() {
    const active = hoverIngredient || focusedIngredient || selectedIngredient;
    ingredientControls.forEach(node => {
      node.classList.toggle('is-active', node.dataset.ingredient === active);
      node.setAttribute('aria-pressed', String(node.dataset.ingredient === selectedIngredient));
    });
  }

  ingredientControls.forEach(node => {
    node.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') { hoverIngredient = node.dataset.ingredient; syncIngredients(); }
    });
    node.addEventListener('pointerleave', () => { hoverIngredient = null; syncIngredients(); });
    node.addEventListener('focus', () => {
      if (node.matches(':focus-visible')) { focusedIngredient = node.dataset.ingredient; syncIngredients(); }
    });
    node.addEventListener('blur', () => { focusedIngredient = null; syncIngredients(); });
    node.addEventListener('click', () => {
      selectedIngredient = selectedIngredient === node.dataset.ingredient ? null : node.dataset.ingredient;
      syncIngredients();
      const card = document.querySelector(`.ingredient-card[data-ingredient="${node.dataset.ingredient}"]`);
      if (node.classList.contains('ingredient-point') && window.matchMedia('(max-width: 700px)').matches && selectedIngredient) {
        card.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'instant', block: 'center' });
      }
    });
  });
  document.querySelector('.ingredients').addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      selectedIngredient = hoverIngredient = focusedIngredient = null;
      syncIngredients();
    }
  });

  control.addEventListener('click', () => setMotion(!motionEnabled));
  reducedMotion.addEventListener('change', event => setMotion(!event.matches));
  window.addEventListener('scroll', requestProgress, { passive: true });
  window.addEventListener('resize', requestProgress, { passive: true });
  window.addEventListener('load', requestProgress, { once: true });
  setMotion(motionEnabled);
  updateProgress();
})();
