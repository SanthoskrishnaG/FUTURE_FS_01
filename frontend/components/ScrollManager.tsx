'use client';

import { useEffect } from 'react';

export default function ScrollManager() {
  useEffect(() => {
    const handleScroll = () => {
      // 1. Scroll progress bar
      const progress = document.getElementById('scroll-progress');
      if (progress) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = (window.scrollY / totalHeight) * 100;
        progress.style.width = `${Math.min(100, Math.max(0, currentProgress))}%`;
      }

      // 2. Back to top button visibility
      const backToTop = document.getElementById('back-to-top');
      if (backToTop) {
        if (window.scrollY > 300) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }
    };

    // 3. Intersection observer for scroll animations
    const revealElements = document.querySelectorAll('.scroll-reveal, .reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return null;
}
