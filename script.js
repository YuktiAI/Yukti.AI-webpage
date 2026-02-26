/* ============================================================
   YUKTI.AI — JAVASCRIPT INTERACTIONS
   ============================================================ */

// ─── Service Modal Data ───────────────────────────────────────
const modalData = {
  erp: {
    title: 'ERP System Development',
    desc: 'Our ERP systems streamline your entire business process, from inventory management to financial reporting. We build custom solutions that integrate seamlessly with your existing infrastructure, providing real-time insights and automation that reduces manual work by up to 70%. Features include multi-module support, role-based access, advanced reporting, and mobile-ready dashboards.'
  },
  crm: {
    title: 'CRM System Development',
    desc: 'Build intelligent systems to manage and analyze customer relationships at every touchpoint. Our CRM solutions feature lead scoring, automated follow-ups, pipeline management, and AI-driven insights to help your sales teams close more deals faster. Fully customizable to fit your business workflows and integrate with existing tools.'
  },
  billing: {
    title: 'Billing & Invoicing Systems',
    desc: 'Simplify transactions and automate your entire billing lifecycle — from quote generation to payment reconciliation. Our billing platforms support multi-currency, tax compliance, subscription billing, automated reminders, and real-time financial dashboards. Reduce billing errors and get paid faster.'
  },
  web: {
    title: 'Web Development',
    desc: 'We create high-performance, responsive, and SEO-optimized web solutions built with modern frameworks. From corporate websites to complex web applications, our team delivers fast, accessible, and beautiful digital experiences. Every site is built with performance, scalability, and user experience at the core.'
  },
  aiagent: {
    title: 'AI Agent Development',
    desc: 'Custom AI chatbots and intelligent automation agents for your business. Our AI agents handle customer support, internal workflows, lead qualification, and data processing — operating 24/7 without human intervention. Built on latest LLM technology with domain-specific fine-tuning for your industry.'
  },
  ecom: {
    title: 'E-Commerce System Development',
    desc: 'Scalable e-commerce platforms with advanced analytics, smart recommendations, and seamless payment integration. We build full-stack e-commerce solutions featuring product management, inventory tracking, multi-vendor support, AI-powered recommendations, and conversion-optimized checkout flows.'
  },
  dashboard: {
    title: 'Dashboard & Software Solutions',
    desc: 'Advanced dashboards with real-time analytics and actionable business intelligence. Our dashboard solutions connect to your data sources and transform raw data into visual insights — helping you monitor KPIs, track operations, and make data-driven decisions instantly. Built with interactive charts, drill-down reports, and alert systems.'
  },
  matrimony: {
    title: 'Wedding Matrimony Platforms',
    desc: 'Smart matchmaking systems with AI-powered recommendation algorithms and intelligent filtering. We build culturally-aware matrimony platforms with compatibility scoring, photo verification, privacy controls, and advanced search — delivering the most relevant matches to users while keeping their data safe and secure.'
  },
  recsys: {
    title: 'Recommendation Systems',
    desc: 'Personalized recommendation engines for digital platforms, retail, and content services. Our systems leverage collaborative filtering, content-based filtering, and deep learning to deliver highly relevant suggestions that boost engagement, retention, and revenue. Fully configurable and A/B test-ready for continuous improvement.'
  }
};

// ─── Sticky Navbar ────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── Active Nav Link ─────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', updateActiveLink);

// ─── Hamburger Menu ───────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close menu on link click
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ─── Service Modal ────────────────────────────────────────────
const modalOverlay = document.getElementById('modalOverlay');
const modalBox     = document.getElementById('modalBox');
const modalClose   = document.getElementById('modalClose');
const modalTitle   = document.getElementById('modalTitle');
const modalDesc    = document.getElementById('modalDesc');

function openModal(key) {
  const data = modalData[key];
  if (!data) return;
  modalTitle.textContent = data.title;
  modalDesc.textContent  = data.desc;
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Attach to service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') return;
    const key = card.getAttribute('data-modal');
    openModal(key);
  });
});

// Learn More buttons
document.querySelectorAll('.learn-more-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const key = btn.closest('.service-card').getAttribute('data-modal');
    openModal(key);
  });
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ─── Use Case Tabs ────────────────────────────────────────────
const tabBtns   = document.querySelectorAll('.tab-btn');
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

// ─── Scroll Reveal ────────────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-in-scroll');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// ─── Back to Top ─────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── Contact Form ─────────────────────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();

  const submitBtn   = document.getElementById('submitBtn');
  const btnText     = submitBtn.querySelector('.btn-text');
  const btnLoading  = submitBtn.querySelector('.btn-loading');
  const formSuccess = document.getElementById('formSuccess');

  // Loading state
  btnText.style.display    = 'none';
  btnLoading.style.display = 'inline';
  submitBtn.disabled       = true;

  // Simulate async send (replace with real API call)
  setTimeout(() => {
    btnText.style.display    = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled       = false;
    formSuccess.style.display = 'block';

    document.getElementById('contactForm').reset();

    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 5000);
  }, 1500);
}

// ─── Smooth Nav Scroll ────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 76;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Hero entrance stagger ───────────────────────────────────
window.addEventListener('load', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.animationDelay = '0.2s';
  }
});
