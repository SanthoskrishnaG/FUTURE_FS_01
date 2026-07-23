'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = (localStorage.getItem('portfolio-theme') as 'dark' | 'light') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const handleScroll = () => {
      // Scroll Progress Bar
      const scrollProgressBar = document.getElementById('scroll-progress');
      if (scrollProgressBar) {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
        scrollProgressBar.style.width = `${scrolled}%`;
      }

      setIsScrolled(window.scrollY > 50);

      // Active Section Spy
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 140;

      sections.forEach((section) => {
        const el = section as HTMLElement;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        const id = el.getAttribute('id') || '';

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);

    const event = new CustomEvent('themechanged', { detail: { theme: nextTheme } });
    window.dispatchEvent(event);
  };

  const navItems = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Journey', href: '#timeline', id: 'timeline' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Leadership', href: '#leadership', id: 'leadership' },
    { label: 'Certificates', href: '#certificates', id: 'certificates' },
    { label: 'Contact', href: '#contact', id: 'contact' },
    { label: 'Resume', href: '/resume', id: 'resume' },
  ];

  return (
    <header id="main-header" className={isScrolled ? 'scrolled' : ''}>
      <div className="header-container">
        <a href="#hero" className="logo" id="nav-logo">
          <span className="logo-sym">&lt;</span>GSK<span className="logo-sym">/&gt;</span>
        </a>

        <nav id="nav-menu" className={isMobileMenuOpen ? 'open' : ''}>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                {item.href.startsWith('/') ? (
                  <Link
                    href={item.href}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            id="theme-toggle"
            aria-label="Toggle light/dark theme"
            className="glass-btn"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg className="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <button
            id="mobile-menu-toggle"
            aria-label="Toggle Navigation Menu"
            className={`glass-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
