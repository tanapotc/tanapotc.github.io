# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

This is `tanapotc.github.io`, a static personal/portfolio website served via GitHub Pages. There is no application server, build step, bundler, or framework — pages are plain HTML/CSS with a couple of `<script>` tags pulling in a CDN library (`typed.js`) and a third-party chat-widget snippet.

There is no dev server or build command to run. To preview changes, open the HTML files directly in a browser or serve the directory with any static file server (e.g. `npx serve .`).

## Structure

- `index.html`, `fullstream.html`, `contact.html` — the site's pages. `index.html` and `fullstream.html` share the same header/nav/footer markup and both load `typed.js` for the animated "Hi, I'm Tong" heading; `contact.html` is currently unused/blank in the `<body>`.
- `style.css` — single global stylesheet shared by all pages (no CSS modules/preprocessor).
- `image/` — static assets (favicons under `image/icon/`, product photos under `image/order/`).
- `app.js` — a standalone Node/`http` "Hello World" server. It is not wired into any page or npm script and is not part of the site's runtime; treat it as a leftover sample rather than live infrastructure.
- `package.json` — lists dependencies (`express`, `mongodb`, `mysql`, `ejs`, `typed.js`, etc.) but defines no `scripts`. Most of these packages are unused by any file in the repo; don't assume a backend stack exists just because they're listed.
- `.github/workflows/node.js.yml` — boilerplate GitHub Actions CI (`npm ci && npm run build --if-present && npm test`) from the default Node.js template. **`npm test` currently fails because no `test` script is defined** — be aware CI is red by default, not a signal that a change broke something.

## Conventions to follow

- Keep changes as plain, dependency-free HTML/CSS/JS consistent with the existing pages — don't introduce a build step, framework, or bundler unless explicitly asked.
- `index.html` and `fullstream.html` duplicate the same header/nav/footer block; when editing shared chrome (nav links, footer text, the chat-widget snippet loader), update it in both files to keep them in sync.
- The chat-widget loader script (the `DOMContentLoaded` listener that reads `auth_token`/`userId`/`modelId` query params and injects a `<script>` tag pointing at a `*fusionchatbots*` snippet URL) appears in `index.html` and `fullstream.html` with several alternate endpoint URLs commented out. When changing the active endpoint, follow the existing pattern of commenting out alternatives rather than deleting them.
- Several `<script src>` tags and CSS `background: url(...)` values point at external hosts (jsdelivr CDN, Azure-hosted chat snippet endpoints, Unsplash). Verify any new external URLs are intentional before committing.
