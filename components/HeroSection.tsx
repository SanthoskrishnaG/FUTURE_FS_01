'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const TAGLINES = [
  'M.Sc. Software Systems Student',
  'Cyber Security Intern',
  'Software Developer',
  'Problem Solver',
  'Team Leader',
  'Technology Explorer',
  'Future Security Engineer',
];

export default function HeroSection() {
  const [taglineText, setTaglineText] = useState('');
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [counters, setCounters] = useState({ projects: 0, certs: 0, cgpa: 0, leadership: 0 });

  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

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

      setTaglineText(currentFull.substring(0, charIndex));

      if (!isDeleting && charIndex < currentFull.length) charIndex++;
      else if (isDeleting && charIndex > 0) charIndex--;

      timer = setTimeout(type, speed);
    }

    timer = setTimeout(type, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (statsAnimated) return;
      const statsRow = document.querySelector('.stats-row');
      if (!statsRow) return;

      const rect = statsRow.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        setStatsAnimated(true);
        // Animate counter targets: Projects: 6, Certs: 3, CGPA: 8, Leadership: 2
        let p = 0, c = 0, g = 0, l = 0;
        const interval = setInterval(() => {
          if (p < 6) p += 1;
          if (c < 3) c += 1;
          if (g < 8) g += 1;
          if (l < 2) l += 1;

          setCounters({ projects: p, certs: c, cgpa: g, leadership: l });

          if (p >= 6 && c >= 3 && g >= 8 && l >= 2) {
            clearInterval(interval);
          }
        }, 80);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  return (
    <section id="hero" className="section-padding">
      <div className="section-container">
        <div className="hero-grid">
          <div className="hero-text-content">
            <div className="cyber-badge">
              <span className="pulse-dot"></span>
              <span className="badge-text">CYBER SECURITY &amp; SOFTWARE DEVELOPER</span>
            </div>

            <h1 className="hero-title">
              Hi, I&apos;m <br />
              <span className="gradient-text">Santhoskrishna G</span>
            </h1>

            <div className="typing-container">
              <span>Building Secure Solutions as a </span>
              <span className="dynamic-txt">{taglineText}</span>
              <span className="cursor">&nbsp;</span>
            </div>

            <p className="hero-tagline">
              M.Sc. Software Systems student at Coimbatore Institute of Technology. Experienced in C, Java, Python, Web Development, and Cyber Security analysis.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn primary-btn">
                <span>View Projects</span>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>

              <a href="/resume" className="btn secondary-btn">
                <span>View Resume</span>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </a>

              <a href="#contact" className="btn text-btn">
                <span>Contact Me &rarr;</span>
              </a>
            </div>
          </div>

          <div className="hero-graphics">
            <div className="profile-container">
              <div className="glow-bg"></div>
              <div className="tech-ring outer-ring"></div>
              <div className="tech-ring middle-ring"></div>
              <div className="avatar-frame">
                <Image
                  src="/profile_avatar.png"
                  alt="Santhoskrishna G"
                  className="profile-avatar"
                  width={320}
                  height={320}
                  priority
                />
              </div>
              <div className="tech-overlay lock-icon" title="Cyber Security Focus">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div className="tech-overlay code-tag" title="Software Engineer">
                &lt;/&gt;
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-item glass-card hover-glow-blue">
            <div className="stat-number">{counters.projects}+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-item glass-card hover-glow-teal">
            <div className="stat-number">{counters.certs}</div>
            <div className="stat-label">Certifications</div>
          </div>
          <div className="stat-item glass-card hover-glow-purple">
            <div className="stat-number">8.0+</div>
            <div className="stat-label">CGPA (M.Sc)</div>
          </div>
          <div className="stat-item glass-card hover-glow-blue">
            <div className="stat-number">{counters.leadership}+</div>
            <div className="stat-label">Leadership Roles</div>
          </div>
        </div>
      </div>
    </section>
  );
}
