'use client';

import { useEffect } from 'react';

export default function Loader() {
  useEffect(() => {
    const loader = document.getElementById('loader');
    if (!loader) return;

    const hideLoader = () => {
      setTimeout(() => loader.classList.add('fade-out'), 1200);
    };

    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
    }

    // Fallback
    const fallback = setTimeout(() => {
      if (!loader.classList.contains('fade-out')) loader.classList.add('fade-out');
    }, 3000);

    return () => {
      window.removeEventListener('load', hideLoader);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div id="loader">
      <div className="loader-content">
        <div className="loader-logo">
          <span className="logo-sym">&lt;</span>GSK<span className="logo-sym">/&gt;</span>
        </div>
        <div className="loader-bar-bg">
          <div className="loader-bar" />
        </div>
        <div className="loader-text">Initializing Secure Workspace...</div>
      </div>
    </div>
  );
}
