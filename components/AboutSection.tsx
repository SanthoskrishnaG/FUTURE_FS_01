'use client';

export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <span className="section-sub">GET TO KNOW ME</span>
        <h2 className="section-title">About Me</h2>

        <div className="about-grid">
          <div className="about-text-card glass-card hover-glow-blue">
            <p className="about-paragraph">
              I am a passionate <strong>M.Sc. Software Systems student</strong> at <strong>Coimbatore Institute of Technology (CIT)</strong> with a strong foundation in computer science core subjects, software development, and cybersecurity principles.
            </p>
            <p className="about-paragraph">
              With hands-on experience in <strong>Cyber Security internship at Future Interns</strong>, I specialize in threat detection, vulnerability analysis, and building secure digital infrastructure.
            </p>
            <blockquote className="highlight-quote">
              &ldquo;Engineering software with high performance, clean architecture, and bulletproof security.&rdquo;
            </blockquote>
          </div>

          <div className="about-info-grid">
            <div className="info-card glass-card hover-glow-blue">
              <span className="info-card-status">CURRENT</span>
              <div className="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <h3 className="info-card-title">M.Sc. Software Systems</h3>
              <p className="info-card-desc">Coimbatore Institute of Technology (2023 – 2028)</p>
            </div>

            <div className="info-card glass-card hover-glow-teal">
              <span className="info-card-status">INTERN</span>
              <div className="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 className="info-card-title">Cyber Security Intern</h3>
              <p className="info-card-desc">Future Interns (Remote / Virtual)</p>
            </div>

            <div className="info-card glass-card hover-glow-purple">
              <span className="info-card-status">LEADER</span>
              <div className="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="info-card-title">Class Representative &amp; Secretary</h3>
              <p className="info-card-desc">Software Systems Association (SSA), CIT</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
