# OOPUO Website

Static marketing website for [oopuo.com](https://oopuo.com) — an outsourced digital & AI team service for small businesses (2–20 people) in Europe.

## Tech Stack

- **HTML5** — 6 static pages, no build step
- **CSS** — Single stylesheet (`css/main.css`), custom properties, dark/light alternating sections
- **JavaScript** — Vanilla JS modules (no frameworks, no bundler)
- **Fonts** — Google Fonts (Inter, Space Grotesk, JetBrains Mono)
- **i18n** — Client-side, 6 languages (EN, NL, PT, DE, FR, ES)
- **Analytics** — Google Analytics 4 (via cookie consent gate) + HubSpot tracking
- **Assets** — SVG favicon, portfolio JPG images

## File Structure

```
oopuo-website/
├── index.html              # Homepage — hero, problem/solution, pricing preview, stats
├── plans.html              # Pricing page — Essentials (€300), Growth (€500), Enterprise
├── portfolio.html          # Case studies — ZenithCred, InteractiveMove, Solyx, etc.
├── about.html              # About page — founder story, company values
├── contact.html            # Contact form + booking CTA
├── enterprise.html         # Vision / enterprise page
├── css/
│   └── main.css            # All styles (518 lines)
├── js/
│   ├── main.js             # Nav, scroll effects, animations, form handler, hub visual
│   ├── particle-net.js     # Canvas particle network backgrounds
│   ├── i18n.js             # Internationalization system (6 languages, 2200+ lines)
│   ├── chat-widget.js      # FAQ-based AI chat widget (client-side pattern matching)
│   ├── analytics.js        # GA4 integration (loads after cookie consent)
│   └── cookie-consent.js   # GDPR cookie consent banner
├── assets/
│   ├── favicon.svg         # SVG favicon (node/constellation logo)
│   └── portfolio/          # Portfolio case study images
│       ├── abura.jpg
│       ├── cuttingedge.jpg
│       ├── interactivemove.jpg
│       └── solyx.jpg
└── docs/
    ├── ARCHITECTURE.md     # How the site works
    ├── DEPLOYMENT.md       # Hosting & deployment guide
    └── TODO.md             # Known issues before production
```

## Run Locally

No dependencies. Any static file server works:

```bash
# Option 1: npx serve
npx serve -l 8090

# Option 2: Python
python3 -m http.server 8090

# Option 3: PHP
php -S localhost:8090
```

Then open `http://localhost:8090`.

## Deploy

Currently served via `npx serve` on port 8090, proxied through Cloudflare on a zenithcred.com subdomain (staging).

Production target: **oopuo.com** on Hostinger. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for details.

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — Pages, CSS structure, JS modules, i18n
- [Deployment](docs/DEPLOYMENT.md) — Current hosting, production deployment steps
- [TODO](docs/TODO.md) — Known issues to fix before production launch
