'use client';

export default function TimelineSection() {
  return (
    <section id="timeline" className="section-padding">
      <div className="section-container">
        <span className="section-sub">EDUCATION &amp; EXPERIENCE</span>
        <h2 className="section-title">My Journey</h2>

        <div className="timeline-grid">
          {/* Summary Cards */}
          <div className="timeline-summary-cards">
            {/* Education Card */}
            <div className="timeline-summary-card glass-card hover-glow-blue">
              <div className="card-timeline-header">
                <span className="card-timeline-date">2023 – 2028</span>
                <span className="card-timeline-tag education-tag">EDUCATION</span>
              </div>
              <h3 className="card-timeline-title">M.Sc. Integrated Software Systems</h3>
              <p className="card-timeline-org">Coimbatore Institute of Technology (CIT)</p>
              <p className="card-timeline-body">
                5-Year Integrated Master&apos;s Degree focusing on Core Computer Science, Data Structures &amp; Algorithms, Object-Oriented Programming (Java/C++), Operating Systems, Computer Networks, Database Management, and Cyber Security.
              </p>
            </div>

            {/* Experience Card */}
            <div className="timeline-summary-card glass-card hover-glow-teal">
              <div className="card-timeline-header">
                <span className="card-timeline-date">2024 – PRESENT</span>
                <span className="card-timeline-tag experience-tag">EXPERIENCE</span>
              </div>
              <h3 className="card-timeline-title">Cyber Security Intern</h3>
              <p className="card-timeline-org">Future Interns</p>
              <ul className="timeline-responsibilities">
                <li>Analyzed network security vulnerabilities &amp; web application security risks.</li>
                <li>Implemented encryption, authentication protocols, and secure coding practices.</li>
                <li>Worked on hands-on penetration testing labs &amp; threat mitigation models.</li>
              </ul>
            </div>
          </div>

          {/* Academic Roadmap */}
          <div className="journey-roadmap glass-card hover-glow-purple">
            <h3 className="journey-title">Academic Roadmap</h3>
            <div className="roadmap-wrapper">
              <div className="roadmap-line"></div>

              <div className="roadmap-step active">
                <div className="roadmap-dot"></div>
                <div className="roadmap-content">
                  <h4>Integrated Master&apos;s Admission (2023)</h4>
                  <p>Enrolled in M.Sc. Software Systems at CIT, building foundations in Programming &amp; Logic.</p>
                </div>
              </div>

              <div className="roadmap-step active">
                <div className="roadmap-dot"></div>
                <div className="roadmap-content">
                  <h4>Core CS &amp; Data Structures (2023 - 2024)</h4>
                  <p>Mastered C, Java, Assembly, Algorithms, Data Structures, and Memory Management.</p>
                </div>
              </div>

              <div className="roadmap-step active">
                <div className="roadmap-dot"></div>
                <div className="roadmap-content">
                  <h4>Cyber Security Specialization (2024)</h4>
                  <p>Joined Future Interns as Cyber Security Intern; completed key security projects.</p>
                </div>
              </div>

              <div className="roadmap-step">
                <div className="roadmap-dot"></div>
                <div className="roadmap-content">
                  <h4>Full-Stack &amp; Systems Engineering (Present)</h4>
                  <p>Developing full-stack applications with React, Next.js, Express, and cloud databases.</p>
                </div>
              </div>

              <div className="roadmap-step">
                <div className="roadmap-dot"></div>
                <div className="roadmap-content">
                  <h4>Future Master&apos;s Graduation (2028)</h4>
                  <p>Targeting graduation with High Distinction as a Senior Software &amp; Security Engineer.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
