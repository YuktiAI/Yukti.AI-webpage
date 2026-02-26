/* ============================================================
   YUKTI.AI — ENHANCED INTERACTIONS
   ============================================================ */

// ── Modal Data ──
const modalData = {
  erp: { title: 'ERP System Development', desc: 'Our ERP systems streamline your entire business process, from inventory management to financial reporting. We build custom solutions that integrate seamlessly with your existing infrastructure, providing real-time insights and automation that reduces manual work by up to 70%.' },
  crm: { title: 'CRM System Development', desc: 'Build intelligent systems to manage and analyze customer relationships at every touchpoint. Our CRM solutions feature lead scoring, automated follow-ups, pipeline management, and AI-driven insights to help your sales teams close more deals faster.' },
  billing: { title: 'Billing & Invoicing Systems', desc: 'Simplify transactions and automate your entire billing lifecycle — from quote generation to payment reconciliation. Our billing platforms support multi-currency, tax compliance, subscription billing, and real-time financial dashboards.' },
  web: { title: 'Web Development', desc: 'We create high-performance, responsive, and SEO-optimized web solutions built with modern frameworks. From corporate websites to complex web applications, our team delivers fast, accessible, and beautiful digital experiences.' },
  aiagent: { title: 'AI Agent Development', desc: 'Custom AI chatbots and intelligent automation agents for your business. Our AI agents handle customer support, internal workflows, lead qualification, and data processing — operating 24/7. Built on latest LLM technology with domain-specific fine-tuning.' },
  ecom: { title: 'E-Commerce System Development', desc: 'Scalable e-commerce platforms with advanced analytics, smart recommendations, and seamless payment integration. We build full-stack solutions featuring product management, inventory tracking, multi-vendor support, and conversion-optimized checkout flows.' },
  dashboard: { title: 'Dashboard & Software Solutions', desc: 'Advanced dashboards with real-time analytics and actionable business intelligence. Our solutions connect to your data sources and transform raw data into visual insights — helping you monitor KPIs, track operations, and make data-driven decisions instantly.' },
  matrimony: { title: 'Wedding Matrimony Platforms', desc: 'Smart matchmaking systems with AI-powered recommendation algorithms and intelligent filtering. We build culturally-aware matrimony platforms with compatibility scoring, photo verification, privacy controls, and advanced search.' },
  recsys: { title: 'Recommendation Systems', desc: 'Personalized recommendation engines for digital platforms, retail, and content services. Our systems leverage collaborative filtering, content-based filtering, and deep learning to deliver highly relevant suggestions that boost engagement and revenue.' }
};

// ── Sticky Navbar ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Active Nav Link ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(s => {
    const id = s.getAttribute('id');
    if (scrollY >= s.offsetTop && scrollY < s.offsetTop + s.offsetHeight) {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
      });
    }
  });
}
window.addEventListener('scroll', updateActiveLink);

// ── Hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open');
});
navLinksEl.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
  navLinksEl.classList.remove('open');
  hamburger.classList.remove('open');
}));

// ── Modal ──
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
function openModal(key) {
  const d = modalData[key];
  if (!d) return;
  modalTitle.textContent = d.title;
  modalDesc.textContent = d.desc;
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.tagName === 'A') return;
    openModal(card.getAttribute('data-modal'));
  });
});
document.querySelectorAll('.learn-more-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    openModal(btn.closest('.service-card').getAttribute('data-modal'));
  });
});
document.getElementById('modalClose').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Use Case Tabs ──
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.usecase-panel');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('tab-' + tab);
    if (panel) panel.classList.add('active');
  });
});

// ── Scroll Reveal (blur-to-clear) ──
const fadeEls = document.querySelectorAll('.fade-in-scroll');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
fadeEls.forEach(el => observer.observe(el));

// ── Back to Top ──
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Contact Form (sends email to yuktiaisolutions@gmail.com) ──
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent('Free Consultation Request from ' + name);
  const body = encodeURIComponent(
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n' +
    'Phone: ' + phone + '\n\n' +
    'Message:\n' + message
  );

  // Open email client
  window.location.href = 'mailto:yuktiaisolutions@gmail.com?subject=' + subject + '&body=' + body;

  // Show success message
  const ok = document.getElementById('formSuccess');
  ok.style.display = 'block';
  document.getElementById('contactForm').reset();
  setTimeout(() => { ok.style.display = 'none'; }, 5000);
}

// ── Smooth Scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 76, behavior: 'smooth' }); }
  });
});

// ── RIPPLE CLICK EFFECT ──
document.querySelectorAll('.ripple-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const circle = document.createElement('span');
    circle.classList.add('ripple-circle');
    const d = Math.max(this.clientWidth, this.clientHeight);
    circle.style.width = circle.style.height = d + 'px';
    const rect = this.getBoundingClientRect();
    circle.style.left = (e.clientX - rect.left - d / 2) + 'px';
    circle.style.top = (e.clientY - rect.top - d / 2) + 'px';
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});

// ── MAGNETIC TILT on Service Cards ──
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ── FLOATING PARTICLES on Hero ──
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.r = Math.random() * 2 + 0.5;
      this.dx = (Math.random() - 0.5) * 0.4;
      this.dy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.3 + 0.05;
    }
    update() {
      this.x += this.dx; this.y += this.dy;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79, 123, 189, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 50; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(79, 123, 189, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
})();
