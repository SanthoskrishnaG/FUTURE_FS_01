'use client';

import { useEffect, useState } from 'react';

const TAGLINES = [
  'Software Developer',
  'Problem Solver',
  'Team Leader',
  'Technology Explorer',
  'Future Security Engineer',
];

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const currentFull = TAGLINES[textIndex];
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentFull.length) {
      speed = 2000;
    } else if (isDeleting && charIndex === 0) {
      speed = 500;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentFull.length) {
        setDisplayText(currentFull.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (!isDeleting && charIndex === currentFull.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentFull.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % TAGLINES.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section id="hero">
      <div className="section-container hero-grid">
        <div className="hero-text-content">
          <div className="cyber-badge revealed">
            <span className="pulse-dot"></span>
            <span className="badge-text">SECURE PORTFOLIO ACTIVE</span>
          </div>

          <h1 className="hero-title revealed">
            Hi, <br /> I'm <span className="gradient-text">Santhoskrishna G</span>
          </h1>

          <div className="typing-container revealed">
            <span className="static-txt">I am a </span>
            <span className="dynamic-txt">{displayText}</span>
            <span className="cursor">&nbsp;</span>
          </div>

          <p className="hero-tagline revealed">
            "Building Secure Digital Solutions Through Code, Innovation, and Leadership."
          </p>

          <div className="hero-actions revealed">
            <a href="resume.html" target="_blank" className="btn primary-btn hover-glow">
              <span>Download Resume</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </a>
            <a href="#projects" className="btn secondary-btn">
              <span>View Projects</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
            <a href="#contact" className="btn text-btn">Contact Me</a>
          </div>
        </div>

        {/* Profile and Cyber Security Shield Graphics */}
        <div className="hero-graphics revealed">
          <div className="profile-container">
            <div className="glow-bg"></div>
            <div className="avatar-frame">
              <img
                src="/profile_avatar.png"
                alt="Santhoskrishna G Professional Avatar"
                className="profile-avatar"
              />
              <div className="tech-ring outer-ring"></div>
              <div className="tech-ring middle-ring"></div>
              <div className="tech-overlay lock-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div className="tech-overlay code-tag">
                <span>&lt;/&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
