'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <button
        id="back-to-top"
        aria-label="Back to Top"
        className={showBackToTop ? 'visible' : ''}
        onClick={scrollToTop}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      <footer>
        <div className="section-container footer-content">
          <p className="designer-text">
            Designed &amp; Built with <span className="heart-pulse">&hearts;</span> by{' '}
            <strong style={{ color: 'var(--text-primary)' }}>Santhoskrishna G</strong>
          </p>
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} All Rights Reserved. M.Sc Software Systems — CIT
          </p>
        </div>
      </footer>
    </>
  );
}
