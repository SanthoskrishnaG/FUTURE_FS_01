'use client';

export default function LeadershipSection() {
  return (
    <section id="leadership" className="section-padding">
      <div className="section-container">
        <span className="section-sub">RESPONSIBILITY &amp; IMPACT</span>
        <h2 className="section-title">Leadership &amp; Achievements</h2>

        <div className="leadership-grid" style={{ marginBottom: '60px' }}>
          {/* Card 1 */}
          <div className="leadership-card glass-card hover-glow-blue">
            <div className="leadership-header">
              <span className="leadership-badge blue-badge">STUDENT LEADERSHIP</span>
              <h3 className="leadership-org">Class Representative</h3>
              <p className="leadership-loc">M.Sc Software Systems (Batch 2023 - 2028)</p>
            </div>
            <ul className="leadership-list">
              <li>Elected representative serving as official liaison between 60+ students and department faculty.</li>
              <li>Coordinated academic schedules, semester projects, and laboratory sessions.</li>
              <li>Fostered team collaboration and student feedback loops for continuous curriculum improvement.</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="leadership-card glass-card hover-glow-teal">
            <div className="leadership-header">
              <span className="leadership-badge teal-badge">DEPARTMENT ASSOCIATION</span>
              <h3 className="leadership-org">Executive Secretary</h3>
              <p className="leadership-loc">Software Systems Association (SSA), CIT</p>
            </div>
            <ul className="leadership-list">
              <li>Organized national-level technical symposiums, hackathons, and coding competitions.</li>
              <li>Managed event logistics, guest speaker invitations, and workshop sessions.</li>
              <li>Spearheaded peer mentoring programs for junior students in programming fundamentals.</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="leadership-card glass-card hover-glow-purple">
            <div className="leadership-header">
              <span className="leadership-badge purple-badge">CYBER SECURITY</span>
              <h3 className="leadership-org">Security Lead Intern</h3>
              <p className="leadership-loc">Future Interns Virtual Labs</p>
            </div>
            <ul className="leadership-list">
              <li>Led team vulnerability review sessions on OWASP Web Security risks.</li>
              <li>Authored comprehensive documentation on threat mitigation and secure code review standards.</li>
              <li>Received commendation for proactive vulnerability reporting and prompt execution.</li>
            </ul>
          </div>
        </div>

        {/* Achievements & Why Hire Me Grid */}
        <div className="why-achieve-grid">
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '24px' }}>
              Key Accomplishments
            </h3>
            <div className="achievements-timeline">
              <div className="achievement-item">
                <div className="achievement-marker"></div>
                <h4>High Academic Ranking (CGPA 8.0+)</h4>
                <p>Consistently maintained top academic performance in M.Sc. Software Systems curriculum.</p>
              </div>

              <div className="achievement-item">
                <div className="achievement-marker"></div>
                <h4>Cyber Security Internship Certification</h4>
                <p>Successfully completed rigorous internship tasks at Future Interns with distinction.</p>
              </div>

              <div className="achievement-item">
                <div className="achievement-marker"></div>
                <h4>Symposium Hackathon Finalist</h4>
                <p>Recognized for innovative real-time web application security project at CIT tech fest.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '24px' }}>
              Why Hire Me?
            </h3>
            <div className="why-grid">
              <div className="why-card glass-card hover-glow-blue">
                <h4>🔐 Security Mindset</h4>
                <p>Designs software with proactive threat defense and OWASP security standards.</p>
              </div>
              <div className="why-card glass-card hover-glow-teal">
                <h4>⚡ Solid CS Core</h4>
                <p>Deep foundation in Data Structures, Algorithms, OS, Networking, and OOP.</p>
              </div>
              <div className="why-card glass-card hover-glow-purple">
                <h4>🚀 Leadership &amp; Comms</h4>
                <p>Proven track record as Class Representative and Association Secretary.</p>
              </div>
              <div className="why-card glass-card hover-glow-blue">
                <h4>💡 Fast Learner</h4>
                <p>Quickly adopts new frameworks, cloud services, and security tools.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
