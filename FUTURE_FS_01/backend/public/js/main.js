document.addEventListener('DOMContentLoaded', () => {
  // --- 0. LOADER ---
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease-out';
      setTimeout(() => loader.style.display = 'none', 500);
    }, 1200);
  }

  // --- 1. THEME TOGGLE & HEADER ---
  const header = document.getElementById('main-header');
  const themeToggle = document.getElementById('theme-toggle');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Load saved theme
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
  }

  // Scroll Spy for Header
  const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', handleScroll);


  // --- 2. HERO TYPING EFFECT ---
  const dynamicTxt = document.querySelector('.dynamic-txt');
  if (dynamicTxt) {
    const TAGLINES = [
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
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % TAGLINES.length;
        speed = 500;
      }

      dynamicTxt.textContent = currentFull.substring(0, charIndex);

      if (!isDeleting && charIndex < currentFull.length) {
        charIndex++;
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
      }

      setTimeout(type, speed);
    }
    setTimeout(type, 1000);
  }

  // --- 3. CONTACT FORM ---
  const contactForm = document.getElementById('contact-form');
  const toastContainer = document.getElementById('toast-container');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const message = document.getElementById('form-message').value;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Saving to Database...</span>';

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });
        
        const data = await res.json();
        if (res.ok) {
          showToast(data.message || 'Message securely saved!', 'success');
          contactForm.reset();
        } else {
          showToast(data.error || 'Failed to send message.', 'error');
        }
      } catch (err) {
        showToast('Server error. Please try again.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  function showToast(msg, type) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.style.marginTop = '1rem';
    toast.style.padding = '0.75rem 1rem';
    toast.style.borderRadius = '8px';
    toast.style.backgroundColor = type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)';
    toast.style.border = `1px solid ${type === 'success' ? '#10b981' : '#ef4444'}`;
    toast.style.color = type === 'success' ? '#10b981' : '#ef4444';
    toast.textContent = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  }

  // --- 4. CUSTOM CURSOR ---
  const dot = document.getElementById('custom-cursor');
  const ring = document.getElementById('cursor-ring');
  if (dot && ring) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    };
    animateRing();

    const hoverEls = document.querySelectorAll('a, button, input, textarea');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  }

  // --- 5. PARTICLE CANVAS ---
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
      let count = (canvas.width * canvas.height) / 11000;
      count = Math.min(120, Math.max(40, count));
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2.5 + 1;
        particlesArray.push(new Particle(
          Math.random() * (canvas.width - size * 4) + size * 2,
          Math.random() * (canvas.height - size * 4) + size * 2,
          Math.random() * 0.4 - 0.2,
          Math.random() * 0.4 - 0.2,
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
            const alpha = (1 - dist / 140) * 0.45;
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = alpha;
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

  // --- 6. SCROLL REVEAL ANIMATIONS ---
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optional: stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});
