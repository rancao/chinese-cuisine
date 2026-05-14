/* ============================================
   The Middle Kingdom Table — Site behaviors
   ============================================ */

(function () {
  'use strict';

  // ---------- Language toggle ----------
  const LANG_KEY = 'mkt_lang';
  const root = document.documentElement;
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === 'zh' || stored === 'en') {
    root.setAttribute('lang', stored);
  } else {
    root.setAttribute('lang', 'en');
  }

  function syncToggleLabels() {
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      const en = btn.querySelector('[data-lang-label="en"]');
      const zh = btn.querySelector('[data-lang-label="zh"]');
      const cur = root.getAttribute('lang');
      if (en) en.classList.toggle('lang-active', cur === 'en');
      if (zh) zh.classList.toggle('lang-active', cur === 'zh');
    });
  }
  syncToggleLabels();

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-toggle');
    if (!btn) return;
    const next = root.getAttribute('lang') === 'en' ? 'zh' : 'en';
    root.setAttribute('lang', next);
    localStorage.setItem(LANG_KEY, next);
    syncToggleLabels();
  });

  // ---------- Mobile nav ----------
  document.addEventListener('click', (e) => {
    const t = e.target.closest('.nav-toggle');
    if (!t) return;
    const nav = t.closest('.nav');
    if (nav) nav.classList.toggle('open');
  });

  // ---------- FAQ accordion ----------
  document.addEventListener('click', (e) => {
    const h = e.target.closest('.faq-item h4');
    if (!h) return;
    h.parentElement.classList.toggle('open');
  });

  // ---------- Reveal on scroll ----------
  const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }) : null;
  document.querySelectorAll('.reveal').forEach(el => io && io.observe(el));

  // ---------- Active nav highlight (best-effort by URL) ----------
  const path = location.pathname.replace(/\/index\.html?$/, '/');
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (!href || href === '#') return;
    // Match the first path segment
    const target = href.replace(/^\.\.?\//, '').split('/')[0];
    const here = path.split('/').filter(Boolean)[0] || '';
    if (target && here && target === here) a.classList.add('active');
    if (!here && (href.endsWith('index.html') || href === '/' || href === './')) a.classList.add('active');
  });
})();
