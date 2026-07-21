'use client';

export default function About() {
  return (
    <section id="about" className="section-padding scroll-reveal">
      <div className="section-container">
        <span className="section-sub">Who I Am</span>
        <h2 className="section-title">About Me</h2>

        <div className="about-grid">
          <div className="about-text-card glass-card">
            <p className="about-paragraph">
              I am <strong>Santhoskrishna G</strong>, currently pursuing an integrated M.Sc Software Systems
              degree at Coimbatore Institute of Technology. Passionate about software development and cyber
              security, I enjoy solving real-world problems through innovative technology solutions.
            </p>
            <p className="about-paragraph">
              Alongside academics, I actively participate in extracurricular activities, contributing to
              technical, leadership, and cultural initiatives. My experience in event management and club
              leadership has strengthened my communication, teamwork, and organizational skills.
            </p>
            <p className="about-paragraph">
              Currently, I am expanding my practical knowledge through a <strong>Cyber Security internship at
              Blue Desk</strong>, where I continue to learn about securing modern applications and networks.
            </p>
            <p className="about-paragraph highlight-quote">
              "I strongly believe in continuous learning, discipline, teamwork, and creating technology that
              positively impacts people."
            </p>
          </div>

          <div className="about-info-grid">
            <div className="info-card glass-card hover-glow-blue">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                </svg>
              </div>
              <h3 className="info-card-title">Education</h3>
              <p className="info-card-desc">M.Sc Software Systems (CIT)</p>
              <span className="info-card-status">Pursuing</span>
            </div>

            <div className="info-card glass-card hover-glow-teal">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 className="info-card-title">Internship</h3>
              <p className="info-card-desc">Cyber Security at Blue Desk</p>
              <span className="info-card-status">Active</span>
            </div>

            <div className="info-card glass-card hover-glow-purple">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="info-card-title">Leadership</h3>
              <p className="info-card-desc">Joint Secretary of Yoga Club</p>
              <span className="info-card-status">CIT Club</span>
            </div>
          </div>
        </div>

        {/* Stats Counters */}
        <div className="stats-row scroll-reveal">
          <div className="stat-item glass-card">
            <span className="stat-number">4</span>
            <span className="stat-label">Academic Projects</span>
          </div>
          <div className="stat-item glass-card">
            <span className="stat-number">15</span>
            <span className="stat-label">Skills Mastered</span>
          </div>
          <div className="stat-item glass-card">
            <span className="stat-number">3</span>
            <span className="stat-label">Clubs Active</span>
          </div>
          <div className="stat-item glass-card">
            <span className="stat-number">1</span>
            <span className="stat-label">Professional Internships</span>
          </div>
        </div>
      </div>
    </section>
  );
}
