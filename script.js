// ===== Utilidades =====
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// ===== Ano automático no footer =====
(function setYear(){
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// ===== Header: sombra ao rolar =====
(function headerShadowOnScroll(){
  const header = $('.site-header');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ===== Menu mobile =====
(function mobileNav(){
  const toggle = $('.nav-toggle');
  const nav = $('#primary-nav');
  if (!toggle || !nav) return;

  const open = () => {
    toggle.setAttribute('aria-expanded', 'true');
    nav.classList.add('active', 'open');
  };
  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('active', 'open');
  };
  const toggleNav = () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    expanded ? close() : open();
  };

  toggle.addEventListener('click', toggleNav);

  // Fecha ao clicar num link
  $$('#primary-nav a').forEach(a => a.addEventListener('click', close));

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      close();
    }
  });
})();

// ===== Banner rotativo (CSS) — pausa no hover =====
(function bannerPauseOnHover(){
  const slidesTrack = $('.banner .slides');
  if (!slidesTrack) return;

  const pause = () => slidesTrack.style.animationPlayState = 'paused';
  const play  = () => slidesTrack.style.animationPlayState = 'running';

  slidesTrack.addEventListener('pointerenter', pause);
  slidesTrack.addEventListener('pointerleave', play);

  // Respeita preferências do usuário (reduzir movimento)
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const applyReducedMotion = () => {
    if (mq.matches) {
      slidesTrack.style.animation = 'none';
    } else {
      slidesTrack.style.animation = slidesTrack.dataset.anim || getComputedStyle(slidesTrack).animation;
      // guarda a animação original na 1ª vez
      if (!slidesTrack.dataset.anim) slidesTrack.dataset.anim = getComputedStyle(slidesTrack).animation;
    }
  };
  mq.addEventListener?.('change', applyReducedMotion);
  applyReducedMotion();
})();