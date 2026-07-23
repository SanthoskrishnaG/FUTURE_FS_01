'use client';

import { useState } from 'react';

interface Certificate {
  id: string;
  badge: string;
  badgeClass: string;
  iconBgClass: string;
  title: string;
  issuer: string;
  date: string;
  desc: string;
}

const CERTIFICATES: Certificate[] = [
  {
    id: 'cyber-sec',
    badge: 'INTERNSHIP',
    badgeClass: 'education-tag',
    iconBgClass: 'cert-icon-teal',
    title: 'Cyber Security Internship',
    issuer: 'Future Interns',
    date: '2024',
    desc: 'Hands-on practical training in vulnerability assessment, penetration testing techniques, network traffic analysis using Wireshark, web application security auditing, and threat mitigation strategies.',
  },
  {
    id: 'c-java',
    badge: 'CERTIFICATION',
    badgeClass: 'education-tag',
    iconBgClass: 'cert-icon-blue',
    title: 'C, C++ & Java MasterclassName',
    issuer: 'Coimbatore Institute of Technology',
    date: '2023',
    desc: 'Comprehensive academic certification covering low-level memory allocation in C, Object-Oriented Software Design in Java, multithreading, exception handling, data structures, and algorithmic complexity.',
  },
  {
    id: 'fullstack-web',
    badge: 'PROFESSIONAL',
    badgeClass: 'experience-tag',
    iconBgClass: 'cert-icon-purple',
    title: 'Full-Stack Web Development',
    issuer: 'Online Learning Platform / Self-Paced',
    date: '2024',
    desc: 'In-depth mastery of HTML5, CSS3 Glassmorphism UI design, JavaScript ES6+, React.js, Next.js App Router, Express REST APIs, and modern web application deployment.',
  },
];

export default function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="section-padding">
      <div className="section-container">
        <span className="section-sub">VERIFIED CREDENTIALS</span>
        <h2 className="section-title">Certifications</h2>

        <div className="certificates-grid">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              className="cert-card glass-card hover-glow-blue"
              onClick={() => setSelectedCert(cert)}
            >
              <span className={`cert-badge ${cert.badgeClass}`}>{cert.badge}</span>
              <div className={`cert-icon ${cert.iconBgClass}`}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 15l-2 5l9-9l-9-9l2 5l-8 4l8 4z"></path>
                  <circle cx="12" cy="12" r="9"></circle>
                </svg>
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <span className="cert-date">{cert.date}</span>

              <button className="cert-view-btn" onClick={() => setSelectedCert(cert)}>
                <span>View Details &rarr;</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="cert-modal-overlay open" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-box glass-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="cert-modal-close"
              aria-label="Close modal"
              onClick={() => setSelectedCert(null)}
            >
              &times;
            </button>

            <div className={`cert-modal-icon ${selectedCert.iconBgClass}`}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v4l3 3"></path>
              </svg>
            </div>

            <h3 className="cert-modal-title">{selectedCert.title}</h3>
            <p className="cert-modal-issuer">{selectedCert.issuer}</p>
            <p className="cert-modal-date">Issued: {selectedCert.date}</p>
            <p className="cert-modal-desc">{selectedCert.desc}</p>
          </div>
        </div>
      )}
    </section>
  );
}
