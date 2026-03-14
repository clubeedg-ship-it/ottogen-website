# Architecture

## Pages

| File | Title | Purpose |
|------|-------|---------|
| `index.html` | Homepage | Hero, problem/solution narrative, service cards, pricing preview (2 plans), hub visual, stats, target audience section, CTA |
| `plans.html` | Plans | Full pricing breakdown — Essentials (€300/mo), Growth (€500/mo), Enterprise/Custom |
| `portfolio.html` | Our Work | Case studies with images — ZenithCred, InteractiveMove, Solyx Energy, CuttingEdge, Abura Cosmetics, SentinAgro |
| `about.html` | About | Founder story (Otto), company values, Netherlands-based positioning |
| `contact.html` | Contact | Contact form (name, email, company, plan interest, message) + booking CTA |
| `enterprise.html` | Vision | Enterprise/vision page — bigger picture, future direction |

All pages share identical nav (with language dropdown) and footer. Nav includes links to Plans, Our Work, About, Contact, plus a "Get Started" CTA button.

## CSS (`css/main.css`)

- **518 lines**, single file, no preprocessor
- **Custom properties** for theming: `--bg`, `--bg2`, `--text`, `--text2`, `--blue`, etc.
- **Dark/light alternating sections**: dark sections use `var(--bg)` background, light sections use `.section-light` class
- **Responsive**: mobile menu toggle (hamburger), media queries for layout breakpoints
- **Key components**: `.pricing-card`, `.service-card`, `.path-card`, `.hero`, `.tool-marquee`, `.hub-grid`, `.stats-grid`, `.trust-grid`
- **Animations**: `.reveal` class with intersection observer for scroll-triggered fade-in, staggered delays via `.reveal-delay-1/2/3`
- **Tool marquee**: infinite CSS scroll animation for partner tool logos

## JavaScript Modules

All loaded at bottom of `<body>` in this order:

### `particle-net.js` (109 lines)
Canvas-based particle network animation. Renders floating dots connected by lines on `<canvas class="particle-net">` elements. Supports both dark and light sections (detects `.section-light` parent). Used on homepage problem/solution and "what you get" sections.

### `main.js` (317 lines)
Core functionality:
- **Nav scroll effect** — adds `.scrolled` class on scroll > 50px
- **Mobile menu** — hamburger toggle for `.nav-links`
- **Scroll reveal** — IntersectionObserver triggers `.revealed` class on `.reveal` elements
- **ASCII art** — generates terminal-style ASCII backgrounds for hero and CTA sections
- **Stat counters** — animates numbers counting up on scroll (e.g., "6+ Businesses Served")
- **Hub visual** — SVG constellation visualization with orbiting nodes (homepage "how it works")
- **Contact form handler** — `preventDefault`, shows "Message Sent ✓" but **does not actually send data anywhere** (client-side only)
- **Smooth scroll** — for `#anchor` links

### `i18n.js` (2207 lines)
Client-side internationalization:
- **6 languages**: English, Nederlands, Português, Deutsch, Français, Español
- **`data-i18n` attributes** on HTML elements map to translation keys
- **Browser language detection** with `navigator.language` fallback
- **Language persisted** in `localStorage` (`oopuo-lang`)
- **Dropdown toggle** in nav for language switching
- **Translations cover**: all page content, nav, footer, form labels, chat widget responses, cookie banner

### `chat-widget.js` (176 lines)
FAQ-based chat widget (bottom-right floating button):
- Pattern-matching against FAQ database (not API-connected)
- Language-aware responses (matches current i18n language)
- Covers: services, pricing, enterprise, getting started, differentiation, AI capabilities, location, contact
- Structured for future API integration (has `SYSTEM_PROMPT` constant)

### `analytics.js` (115 lines)
Google Analytics 4 integration:
- **Only loads after cookie consent** (called by `cookie-consent.js`)
- Placeholder measurement ID: `G-XXXXXXXXXX`
- Tracks: page views, CTA clicks, form submissions, scroll depth, language changes, chat interactions, time on page
- GDPR-compliant: `anonymize_ip: true`

### `cookie-consent.js` (101 lines)
GDPR cookie consent banner:
- Fixed bottom banner with Accept/Reject buttons
- Persists choice in `localStorage` (`oopuo_cookies_accepted`)
- On accept: calls `window.enableAnalytics()` from analytics.js
- Styled inline (not dependent on main.css)

## External Integrations

- **Google Fonts** — Inter (body), Space Grotesk (headings), JetBrains Mono (code/accents)
- **HubSpot Tracking** — Script loader at bottom of each page (`//js.hs-scripts.com/147967707.js`)
- **Google Analytics 4** — Loaded conditionally via cookie consent (placeholder ID)

## Assets

- **`assets/favicon.svg`** — SVG constellation/node logo matching the nav logo
- **`assets/portfolio/`** — JPG images for portfolio case studies (abura, cuttingedge, interactivemove, solyx)

## Footer Links

- Email: hello@oopuo.com
- LinkedIn: linkedin.com/company/oopuo
- X (Twitter): x.com/oopuo
- YouTube: youtube.com/@oopuo
