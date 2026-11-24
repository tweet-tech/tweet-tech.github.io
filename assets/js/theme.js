/* =========================================================
   推文（Tweet轻记）官网 - 主题切换
   白天 / 深夜两种外观；默认跟随系统，手动选择后记忆
   ========================================================= */

(function () {
  'use strict';

  var STORAGE_KEY = 'tweet-theme';
  var THEMES = ['light', 'dark'];
  var DEFAULT_THEME = 'dark';

  function getInitialTheme() {
    // 优先级：localStorage > 系统偏好 > 默认深夜
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && THEMES.indexOf(stored) !== -1) return stored;
    } catch (e) {
      /* localStorage 不可用 */
    }

    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      return 'light';
    }
    return DEFAULT_THEME;
  }

  function applyTheme(theme, persist) {
    if (THEMES.indexOf(theme) === -1) theme = DEFAULT_THEME;
    document.documentElement.setAttribute('data-theme', theme);

    // 同步浏览器地址栏 / 状态栏颜色
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#ffffff' : '#000000');

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (e) {
        /* ignore */
      }
    }

    document.dispatchEvent(
      new CustomEvent('themechange', { detail: { theme: theme } })
    );
  }

  function bindToggle() {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next =
        document.documentElement.getAttribute('data-theme') === 'light'
          ? 'dark'
          : 'light';
      applyTheme(next, true);
    });
  }

  // 立即应用（本脚本在 <head> 中同步加载，避免主题闪屏）；初始偏好不落盘
  applyTheme(getInitialTheme(), false);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindToggle);
  } else {
    bindToggle();
  }
})();
