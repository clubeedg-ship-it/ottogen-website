/* ============================================
   OOPUO — Main JavaScript
   Animations, nav, scroll effects
   ============================================ */

// ============================================
// NAV SCROLL
// ============================================
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('open');
    });
  }
  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      document.querySelector('.nav-links')?.classList.remove('open');
    });
  });
});

// ============================================
// REVEAL ON SCROLL
// ============================================
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: .15 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
});

// ============================================
// COUNT UP ANIMATION
// ============================================
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const isDecimal = target % 1 !== 0;
    let start = 0;
    const dur = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
    }, dur / steps);

    countObs.unobserve(el);
  });
}, { threshold: .5 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));
});

// ============================================
// PORTFOLIO FILTER TABS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.portfolio-card');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeTab .4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

// ============================================
// ASCII BACKGROUND ENGINE
// ============================================
function noise2D(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}
function smoothNoise(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const a = noise2D(ix, iy), b = noise2D(ix + 1, iy);
  const c = noise2D(ix, iy + 1), d = noise2D(ix + 1, iy + 1);
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}
function fbm(x, y, oct) {
  let v = 0, a = .5, f = 1;
  for (let i = 0; i < oct; i++) { v += a * smoothNoise(x * f, y * f); a *= .5; f *= 2; }
  return v;
}

function asciiAnimate(id, genFn) {
  const el = document.getElementById(id);
  if (!el) return;
  let t = 0, visible = false, lastFrame = 0;
  const FPS = 15;
  const interval = 1000 / FPS;

  const io = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
  }, { threshold: 0 });
  io.observe(el.parentElement);

  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible) return;
    if (now - lastFrame < interval) return;
    lastFrame = now;

    const w = el.parentElement.clientWidth || window.innerWidth;
    const h = el.parentElement.clientHeight || 600;
    const cols = Math.floor(w / 7.8);
    const rows = Math.floor(h / 14.3);
    if (cols < 5 || rows < 3) return;

    el.textContent = genFn(t, cols, rows);
    t += 0.03;
  }
  setTimeout(() => requestAnimationFrame(frame), 300);
}

// Hero waves
document.addEventListener('DOMContentLoaded', () => {
  asciiAnimate('ascii-hero', (t, cols, rows) => {
    let out = '';
    const chars = '~-=~._.-=~';
    for (let r = 0; r < rows; r++) {
      let line = '';
      for (let c = 0; c < cols; c++) {
        const x = c / cols, y = r / rows;
        const w1 = Math.sin(x * 8 + t * 1.5 + y * 4) * .5 + .5;
        const w2 = Math.sin(x * 5 - t + y * 6) * .3 + .5;
        const v = (w1 + w2) / 2;
        line += v > 0.45 ? chars[Math.floor(v * (chars.length - 1))] : ' ';
      }
      out += line + '\n';
    }
    return out;
  });

  // CTA converging particles
  asciiAnimate('ascii-cta', (t, cols, rows) => {
    if (!window._ctap) {
      window._ctap = [];
      for (let i = 0; i < 60; i++) {
        const a = Math.random() * Math.PI * 2;
        window._ctap.push({ a, d: .3 + Math.random() * .6, s: .003 + Math.random() * .005 });
      }
    }
    const grid = [];
    for (let r = 0; r < rows; r++) grid.push(new Array(cols).fill(' '));
    const cx = cols / 2, cy = rows / 2;
    window._ctap.forEach(p => {
      p.d -= p.s;
      if (p.d < .05) p.d = .6 + Math.random() * .3;
      const x = Math.floor(cx + Math.cos(p.a + t * .4) * p.d * cx);
      const y = Math.floor(cy + Math.sin(p.a + t * .4) * p.d * cy);
      if (x >= 0 && x < cols && y >= 0 && y < rows) grid[y][x] = '.+*'[Math.floor(Math.random() * 3)];
    });
    return grid.map(row => row.join('')).join('\n');
  });
});

// ============================================
// HUB VISUAL (Home page)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const hub = document.getElementById('hub-vis');
  if (!hub) return;
  const svg = document.getElementById('hub-lines');

  const inner = [
    { name: 'CRM', angle: 0 },
    { name: 'Email', angle: 90 },
    { name: 'Support', angle: 180 },
    { name: 'Billing', angle: 270 }
  ];
  const outer = [
    { name: 'AI Models', angle: 30 },
    { name: 'Analytics', angle: 90 },
    { name: 'Inventory', angle: 150 },
    { name: 'Website', angle: 210 },
    { name: 'Voice AI', angle: 270 },
    { name: 'Security', angle: 330 }
  ];

  const allNodes = [];

  function createOrbitNodes(tools, radiusPct, orbitClass) {
    tools.forEach(tool => {
      const node = document.createElement('div');
      node.className = 'hub-node';
      node.textContent = tool.name;
      node.dataset.orbit = orbitClass;
      node.dataset.angle = tool.angle;
      node.dataset.radius = radiusPct;
      hub.appendChild(node);
      allNodes.push(node);
    });
  }

  createOrbitNodes(inner, 24, 'inner');
  createOrbitNodes(outer, 40, 'outer');

  // SVG gradient
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  grad.setAttribute('id', 'hubGrad');
  const s1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  s1.setAttribute('offset', '0%'); s1.setAttribute('stop-color', '#0055ff');
  const s2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  s2.setAttribute('offset', '100%'); s2.setAttribute('stop-color', 'transparent');
  grad.appendChild(s1); grad.appendChild(s2);
  defs.appendChild(grad); svg.insertBefore(defs, svg.firstChild);

  let t = 0;
  function spinOrbit() {
    while (svg.childNodes.length > 1) svg.removeChild(svg.lastChild);
    allNodes.forEach(node => {
      const baseAngle = parseFloat(node.dataset.angle);
      const r = parseFloat(node.dataset.radius);
      const isInner = node.dataset.orbit === 'inner';
      const speed = isInner ? 0.15 : 0.08;
      const currentAngle = baseAngle + t * speed;
      const rad = (currentAngle - 90) * Math.PI / 180;
      const x = 50 + Math.cos(rad) * r;
      const y = 50 + Math.sin(rad) * r;
      node.style.cssText = `left:${x}%;top:${y}%;transform:translate(-50%,-50%)`;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '50%'); line.setAttribute('y1', '50%');
      line.setAttribute('x2', x + '%'); line.setAttribute('y2', y + '%');
      line.setAttribute('stroke', '#0055ff');
      line.setAttribute('stroke-width', '1');
      line.setAttribute('opacity', isInner ? '0.25' : '0.12');
      svg.appendChild(line);
    });
    t++;
    requestAnimationFrame(spinOrbit);
  }
  spinOrbit();
});

// ============================================
// CONTACT FORM (basic validation)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const entries = Object.fromEntries(data);
    
    // Show success state
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#22c55e';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
});

// ============================================
// SMOOTH SCROLL for anchor links
// ============================================
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const target = document.querySelector(link.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
