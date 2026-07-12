/* ══════════════════════════════════════════════
   Y. SIVA GANESH PORTFOLIO — main.js
   Fly-in animations, canvas particles, typing,
   mobile menu, navbar scroll, form handler
   ══════════════════════════════════════════════ */

'use strict';

/* ─── 1. DOM Ready ─── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initHeroAnimations();
  initScrollReveal();
  initTypingEffect();
  initParticleCanvas();
  initCursorGlow();
  initContactForm();
  initActiveNavHighlight();
});

/* ══════════════════════════════════
   NAVBAR SCROLL EFFECT
══════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ══════════════════════════════════
   MOBILE MENU
══════════════════════════════════ */
function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const icon = hamburger.querySelector('.material-symbols-outlined');
    icon.textContent = mobileMenu.classList.contains('open') ? 'close' : 'menu';
  });

  // Close on link click
  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.querySelector('.material-symbols-outlined').textContent = 'menu';
    });
  });
}

/* ══════════════════════════════════
   HERO FLY-IN  (immediate on load)
══════════════════════════════════ */
function initHeroAnimations() {
  // Hero elements are fly-in but NOT .reveal — trigger them immediately
  const heroEls = document.querySelectorAll('.hero-section .fly-in');
  heroEls.forEach(el => {
    const delay = parseInt(el.dataset.delay || 0, 10);
    setTimeout(() => el.classList.add('is-visible'), delay);
  });
}

/* ══════════════════════════════════
   SCROLL REVEAL (Intersection Observer)
══════════════════════════════════ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || 0, 10);
      setTimeout(() => el.classList.add('is-visible'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════
   TYPING EFFECT
══════════════════════════════════ */
function initTypingEffect() {
  const el    = document.getElementById('typed-text');
  if (!el) return;

  const words = [
    'Digital Experiences',
    'AI Solutions',
    'Data Pipelines',
    'Web Applications',
  ];

  let wi = 0, ci = 0, deleting = false;
  const SPEED_TYPE = 80;
  const SPEED_DEL  = 40;
  const PAUSE_END  = 1800;
  const PAUSE_DEL  = 400;

  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
        setTimeout(tick, PAUSE_DEL);
        return;
      }
    }
    setTimeout(tick, deleting ? SPEED_DEL : SPEED_TYPE);
  }
  setTimeout(tick, 1200);
}

/* ══════════════════════════════════
   PARTICLE CANVAS BACKGROUND
══════════════════════════════════ */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* Particle class */
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.6 + 0.2;
      // Cycle between cyan, indigo, purple
      const palettes = ['0,240,255', '99,102,241', '168,85,247'];
      this.color = palettes[Math.floor(Math.random() * palettes.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  // Create particles
  const COUNT = Math.min(120, Math.floor((W * H) / 12000));
  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  /* Connection lines between nearby particles */
  function drawConnections() {
    const MAX_DIST = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.12;
          ctx.strokeStyle = `rgba(0,219,233,${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  /* Render loop */
  let raf;
  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    raf = requestAnimationFrame(loop);
  }
  loop();

  // Pause when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else loop();
  });
}

/* ══════════════════════════════════
   CURSOR GLOW
══════════════════════════════════ */
function initCursorGlow() {
  // Only on non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
}

/* ══════════════════════════════════
   ACTIVE NAV HIGHLIGHT ON SCROLL
══════════════════════════════════ */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ══════════════════════════════════
   CONTACT FORM
══════════════════════════════════ */
function initContactForm() {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const btn    = document.getElementById('form-submit');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name    = document.getElementById('form-name').value.trim();
    const email   = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      status.textContent = '⚠ Please fill in all fields.';
      status.style.color = '#ffb4ab';
      return;
    }

    btn.disabled = true;
    const btnText = btn.querySelector('.btn-text');
    btnText.textContent = 'Sending…';

    // Simulate send (replace with real FormSubmit / EmailJS in production)
    await new Promise(r => setTimeout(r, 1500));

    status.textContent = '✓ Message sent! I will get back to you soon.';
    status.style.color = '#00dbe9';
    form.reset();
    btn.disabled = false;
    btnText.textContent = 'Send Message';
  });
}
