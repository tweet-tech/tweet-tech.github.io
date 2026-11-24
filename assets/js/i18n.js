/* =========================================================
   Tweet 官网 - 语言切换
   默认中文，URL 上加 ?lang=en 切到英文，本地存储优先
   ========================================================= */

(function () {
  'use strict';

  const STORAGE_KEY = 'tweet-lang';
  const SUPPORTED = ['zh', 'en'];
  const DEFAULT_LANG = 'zh';

  function getInitialLang() {
    // 优先级：URL 参数 > localStorage > 浏览器语言 > 默认
    const url = new URL(window.location.href);
    const fromUrl = url.searchParams.get('lang');
    if (fromUrl && SUPPORTED.includes(fromUrl)) return fromUrl;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.includes(stored)) return stored;
    } catch (e) {
      /* localStorage 不可用 */
    }

    const browser = (navigator.language || '').toLowerCase();
    if (browser.startsWith('en')) return 'en';

    return DEFAULT_LANG;
  }

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    document.body.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');

    // 同步浏览器标签页标题（各页面在 <body> 上声明 data-title-zh / data-title-en）
    const titleZh = document.body.getAttribute('data-title-zh');
    const titleEn = document.body.getAttribute('data-title-en');
    if (titleZh && titleEn) {
      document.title = lang === 'en' ? titleEn : titleZh;
    }

    // 更新所有语言按钮的 active 状态
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === lang);
    });

    // 持久化
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignore */
    }

    // 触发自定义事件，方便页面级 JS 监听
    document.dispatchEvent(
      new CustomEvent('langchange', { detail: { lang: lang } })
    );
  }

  function bindButtons() {
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const next = btn.getAttribute('data-lang-btn');
        applyLang(next);
      });
    });
  }

  // 初始化
  function init() {
    applyLang(getInitialLang());
    bindButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
