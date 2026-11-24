# Tweet 官网

Tweet 的官方网站 —— 静态 HTML + CSS 站点，5 个页面，中英双语。

## 目录结构

```
.
├── index.html              首页
├── features.html           功能介绍
├── privacy.html            隐私政策
├── terms.html              服务条款
├── contact.html            联系我们
└── assets/
    ├── css/style.css       主样式
    ├── js/i18n.js          中英文切换
    ├── js/theme.js         白天/深夜主题切换
    ├── js/main.js          通用交互（移动菜单、滚动动画、当前页高亮）
    └── images/
        └── icon.png        App 图标
```

App 真机截图（index.html / features.html）通过 CDN URL 加载（`cdn.tweetcaht.com`），不在本地存储。

## 本地预览

```bash
python3 -m http.server 8000
# 访问 http://localhost:8000
```

或任意静态服务器（Nginx、Apache、Cloudflare Pages、Vercel、Netlify 等）均可。

## 部署说明

- 纯静态站点，无需后端、无构建步骤
- 入口：根目录 `index.html`
- 所有页面通过相对路径互相链接
- 资源（CSS/JS/图片）走相对路径，可部署到任意子路径
- 语言状态保存在 `localStorage`（key: `tweet-lang`）
- 支持 `?lang=en` / `?lang=zh` 强制指定语言
- 主题支持白天/深夜两种模式，默认跟随系统偏好，手动切换后保存在 `localStorage`（key: `tweet-theme`），由 `js/theme.js` 在 `<head>` 同步加载以避免闪屏

## 浏览器兼容

- iOS Safari 14+
- Chrome / Edge / Firefox 最新两个大版本
- 支持 `backdrop-filter` 的浏览器体验最佳

## 设计令牌

| 维度 | 值 |
|---|---|
| 主题模式 | 深夜（默认）/ 白天，跟随系统，可手动切换 |
| 主背景 | `#000000`（深夜）/ `#ffffff`（白天） |
| 卡片背景 | `#141414`（深夜）/ `#fafafa`（白天） |
| 强调色 | 黑白灰：深夜用白/浅灰，白天用黑/深灰 |
| 字体 | Inter（EN）/ PingFang SC / HarmonyOS Sans（CN）|
| 容器宽度 | 1200px（桌面）/ 单列堆叠（移动）|
| 圆角 | 8 / 12 / 16 / 24 / 999px |
