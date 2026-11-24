/* =========================================================
   Tweet 官网 - 通用交互
   移动端菜单、滚动动画、当前页高亮
   ========================================================= */

(function () {
  'use strict';

  // 移动端菜单切换
  function bindMobileMenu() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('.nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      nav.classList.toggle('nav-mobile-open');
    });

    // 点击菜单项后自动关闭
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav-mobile-open');
      });
    });
  }

  // 当前页导航高亮
  function highlightCurrentNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // 滚动渐入
  function bindScrollReveal() {
    const items = document.querySelectorAll('.fade-in');
    if (!items.length || !('IntersectionObserver' in window)) {
      items.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    items.forEach(function (el) {
      io.observe(el);
    });
  }

  // 截图轮播：支持拖拽 + 滚轮横向滚动
  function bindScreenshotTrack() {
    const track = document.querySelector('.screenshot-track');
    if (!track) return;

    track.addEventListener(
      'wheel',
      function (e) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          track.scrollLeft += e.deltaY;
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }

  function init() {
    bindMobileMenu();
    highlightCurrentNav();
    bindScrollReveal();
    bindScreenshotTrack();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
