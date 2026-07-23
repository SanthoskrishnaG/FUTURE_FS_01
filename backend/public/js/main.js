document.addEventListener('DOMContentLoaded', () => {

  // ─── 0. LOADER ───────────────────────────────────────────────────────────────
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease-out';
      setTimeout(() => loader.style.display = 'none', 500);
    }, 1400);
  }

  // ─── 1. THEME TOGGLE & HEADER ────────────────────────────────────────────────
  const header = document.getElementById('main-header');
  const themeToggle = document.getElementById('theme-toggle');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);
      const event = new CustomEvent('themechanged', { detail: { theme: nextTheme } });
      window.dispatchEvent(event);
    });
  }

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // Header scroll shrink + active nav highlighting
  const scrollProgressBar = document.getElementById('scroll-progress');
  const handleScroll = () => {
    // Scroll progress
    if (scrollProgressBar) {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollTotal) * 100;
      scrollProgressBar.style.width = `${scrolled}%`;
    }

    // Header shadow on scroll
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 130;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });

    // Back to top visibility
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  // ─── 2. BACK TO TOP BUTTON ───────────────────────────────────────────────────
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── 3. HERO TYPING EFFECT ───────────────────────────────────────────────────
  const dynamicTxt = document.querySelector('.dynamic-txt');
  if (dynamicTxt) {
    const TAGLINES = [
      'M.Sc. Software Systems Student',
      'Cyber Security Intern',
      'Software Developer',
      'Problem Solver',
      'Team Leader',
      'Technology Explorer',
      'Future Security Engineer',
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentFull = TAGLINES[textIndex];
      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentFull.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % TAGLINES.length;
        speed = 500;
      }

      dynamicTxt.textContent = currentFull.substring(0, charIndex);

      if (!isDeleting && charIndex < currentFull.length) charIndex++;
      else if (isDeleting && charIndex > 0) charIndex--;

      setTimeout(type, speed);
    }
    setTimeout(type, 1000);
  }

  // ─── 4. ANIMATED STAT COUNTERS ───────────────────────────────────────────────
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  function animateCounters() {
    if (statsAnimated) return;
    const statsRow = document.querySelector('.stats-row');
    if (!statsRow) return;
    const rect = statsRow.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      statsAnimated = true;
      statNumbers.forEach(el => {
        const target = parseInt(el.textContent, 10);
        if (isNaN(target)) return;
        el.textContent = '0';
        let current = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(interval);
        }, 35);
      });
    }
  }
  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();

  // ─── 5. SKILLS FILTERING ─────────────────────────────────────────────────────
  const skillFilterBtns = document.querySelectorAll('.skills-filter-container .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const show = filter === 'all' || category === filter;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }
      });

      // Re-animate progress bars for visible cards
      setTimeout(animateProgressBars, 100);
    });
  });

  // ─── 6. ANIMATED PROGRESS BARS ───────────────────────────────────────────────
  function animateProgressBars() {
    document.querySelectorAll('.skill-card:not([style*="display: none"]) .progress-bar').forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0%';
      requestAnimationFrame(() => {
        bar.style.transition = 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        bar.style.width = width;
      });
    });
  }

  // Trigger on scroll into view
  const skillsSection = document.getElementById('skills');
  let barsAnimated = false;
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !barsAnimated) {
        barsAnimated = true;
        setTimeout(animateProgressBars, 300);
      }
    }, { threshold: 0.1 });
    skillsObserver.observe(skillsSection);
  }

  // ─── 7. PROJECT FILTERING & SEARCH ───────────────────────────────────────────
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectSearch = document.getElementById('project-search');
  let activeProjectFilter = 'all';

  function filterProjects() {
    const query = projectSearch ? projectSearch.value.toLowerCase().trim() : '';
    projectCards.forEach(card => {
      const tech = card.getAttribute('data-tech') || '';
      const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.project-desc')?.textContent.toLowerCase() || '';
      const tags = Array.from(card.querySelectorAll('.project-tech-tags span')).map(s => s.textContent.toLowerCase()).join(' ');

      const matchesFilter = activeProjectFilter === 'all' || tech === activeProjectFilter;
      const matchesSearch = !query || title.includes(query) || desc.includes(query) || tags.includes(query);

      if (matchesFilter && matchesSearch) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      } else {
        card.style.display = 'none';
      }
    });
  }

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeProjectFilter = btn.getAttribute('data-filter') || 'all';
      filterProjects();
    });
  });

  if (projectSearch) {
    projectSearch.addEventListener('input', filterProjects);
  }

  // ─── 8. CERTIFICATE MODAL ────────────────────────────────────────────────────
  const certModal = document.getElementById('cert-modal');
  const certModalClose = document.getElementById('cert-modal-close');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalIssuer = document.getElementById('cert-modal-issuer');
  const certModalDate = document.getElementById('cert-modal-date');
  const certModalDesc = document.getElementById('cert-modal-desc');
  const certModalIcon = document.getElementById('cert-modal-icon');

  function openCertModal(card) {
    if (!certModal) return;
    const title = card.getAttribute('data-cert-title') || 'Certificate';
    const issuer = card.getAttribute('data-cert-issuer') || '';
    const date = card.getAttribute('data-cert-date') || '';
    const desc = card.getAttribute('data-cert-desc') || '';

    if (certModalTitle) certModalTitle.textContent = title;
    if (certModalIssuer) certModalIssuer.textContent = issuer;
    if (certModalDate) certModalDate.textContent = date;
    if (certModalDesc) certModalDesc.textContent = desc;
    if (certModalIcon) {
      certModalIcon.innerHTML = card.querySelector('.cert-icon')?.innerHTML || '';
    }

    certModal.style.display = 'flex';
    certModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => certModal.style.opacity = '1', 10);
  }

  function closeCertModal() {
    if (!certModal) return;
    certModal.style.opacity = '0';
    setTimeout(() => {
      certModal.style.display = 'none';
      certModal.classList.remove('open');
      document.body.style.overflow = '';
    }, 300);
  }

  document.querySelectorAll('.cert-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.cert-card');
      if (card) openCertModal(card);
    });
  });

  if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('open')) closeCertModal();
  });

  // ─── 9. CONTACT FORM ─────────────────────────────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  const toastContainer = document.getElementById('toast-container');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all fields.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });
        const data = await res.json();
        if (res.ok) {
          showToast(data.message || 'Message sent successfully! 🎉', 'success');
          contactForm.reset();
        } else {
          showToast(data.error || 'Failed to send message.', 'error');
        }
      } catch (err) {
        showToast('Network error. Please try again later.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
      }
    });
  }

  function showToast(msg, type) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.style.cssText = `
      margin-top: 1rem;
      padding: 0.85rem 1.25rem;
      border-radius: 10px;
      background-color: ${type === 'success' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'};
      border: 1px solid ${type === 'success' ? '#10b981' : '#ef4444'};
      color: ${type === 'success' ? '#10b981' : '#ef4444'};
      font-family: var(--font-body, sans-serif);
      font-size: 0.9rem;
      font-weight: 500;
      backdrop-filter: blur(10px);
      animation: toast-slide-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `;
    toast.textContent = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  }

  // ─── 10. CUSTOM CURSOR ───────────────────────────────────────────────────────
  const dot = document.getElementById('custom-cursor');
  const ring = document.getElementById('cursor-ring');
  if (dot && ring) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.13;
      ringY += (mouseY - ringY) * 0.13;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    };
    animateRing();

    const hoverEls = document.querySelectorAll('a, button, input, textarea, .cert-card, .project-card');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  }

  // ─── 11. PARTICLE CANVAS ─────────────────────────────────────────────────────
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let mouse = { x: null, y: null, radius: 120 };
    let particleColor = 'rgba(59, 130, 246, 0.45)';
    let lineColor = 'rgba(59, 130, 246, 0.08)';

    function updateColorsByTheme(theme) {
      if (theme === 'light') {
        particleColor = 'rgba(20, 184, 166, 0.35)';
        lineColor = 'rgba(20, 184, 166, 0.05)';
      } else {
        particleColor = 'rgba(59, 130, 246, 0.4)';
        lineColor = 'rgba(59, 130, 246, 0.06)';
      }
    }
    updateColorsByTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    window.addEventListener('themechanged', (e) => updateColorsByTheme(e.detail.theme));

    class Particle {
      constructor(x, y, dx, dy, size) {
        this.x = x; this.y = y; this.dx = dx; this.dy = dy; this.size = size;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x, dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 3;
            this.y -= (dy / dist) * force * 3;
          }
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    function initParticles() {
      particlesArray = [];
      let count = Math.min(120, Math.max(40, (canvas.width * canvas.height) / 11000));
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2.5 + 1;
        particlesArray.push(new Particle(
          Math.random() * (canvas.width - size * 4) + size * 2,
          Math.random() * (canvas.height - size * 4) + size * 2,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          size
        ));
      }
    }

    function connect() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = (1 - dist / 140) * 0.45;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => p.update());
      connect();
      requestAnimationFrame(animate);
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });
    resize();
    animate();
  }

  // ─── 12. SCROLL REVEAL ───────────────────────────────────────────────────────
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { root: null, threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── 13. CLICK SHOCKWAVE ─────────────────────────────────────────────────────
  document.addEventListener('click', (e) => {
    const wave = document.createElement('div');
    wave.className = 'click-shockwave';
    wave.style.left = `${e.clientX}px`;
    wave.style.top = `${e.clientY}px`;
    document.body.appendChild(wave);
    setTimeout(() => wave.remove(), 600);
  });

  // ─── 14. 3D CARD TILT ────────────────────────────────────────────────────────
  document.querySelectorAll('.glass-card, .project-card, .cert-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = -((e.clientY - rect.top) / rect.height - 0.5) * 10;
      card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ─── 15. FOOTER YEAR ─────────────────────────────────────────────────────────
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
