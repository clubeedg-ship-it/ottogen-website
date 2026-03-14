/* ============================================
   OOPUO — Particle Network Background
   Adapted from old oopuo.com floating net
   Supports both dark and light sections
   ============================================ */

(function() {
  const PARTICLE_COUNT = 50;
  const CONNECTION_DISTANCE = 140;
  const WAVE_SPEED = 0.002;
  const WAVE_AMPLITUDE = 18;

  class Particle {
    constructor(w, h) {
      this.x = Math.random() * w;
      this.baseY = Math.random() * h;
      this.y = this.baseY;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.size = Math.random() * 2.5 + 1.5;
      this.offset = Math.random() * 100;
      this.w = w;
      this.h = h;
    }
    update(time) {
      this.x += this.vx;
      if (this.x < 0) this.x = this.w;
      if (this.x > this.w) this.x = 0;
      this.y = this.baseY + Math.sin(time * WAVE_SPEED + this.x * 0.005 + this.offset) * WAVE_AMPLITUDE;
    }
  }

  function initCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    const section = canvas.parentElement;
    const isLight = section.classList.contains('section-light');

    // Colors based on theme
    const nodeColor = isLight ? '0, 85, 255' : '80, 140, 255';
    const lineColor = isLight ? '0, 85, 255' : '80, 140, 255';
    const nodeOpacity = isLight ? 0.5 : 0.4;
    const lineOpacity = isLight ? 0.2 : 0.15;
    const lineWidth = isLight ? 1.5 : 1;

    let w, h, particles = [];
    let visible = false;
    let lastFrame = 0;
    const FPS = 30;
    const interval = 1000 / FPS;

    function resize() {
      w = section.clientWidth;
      h = section.clientHeight;
      canvas.width = w;
      canvas.height = h;
      const count = w < 768 ? 30 : PARTICLE_COUNT;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(w, h));
      }
    }

    const io = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
    }, { threshold: 0 });
    io.observe(section);

    function animate(time) {
      requestAnimationFrame(animate);
      if (!visible) return;
      if (time - lastFrame < interval) return;
      lastFrame = time;

      ctx.clearRect(0, 0, w, h);

      particles.forEach(p => {
        p.update(time);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, ${nodeOpacity})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * lineOpacity;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            ctx.lineWidth = lineWidth;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(animate);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.particle-net').forEach(initCanvas);
  });
})();
