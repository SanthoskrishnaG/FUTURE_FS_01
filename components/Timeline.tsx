'use client';

export default function Timeline() {
  const steps = [
    { title: 'Learned C Programming', desc: 'Gained strong procedural constructs and logic.' },
    { title: 'Developed Train Ticket Reservation System', desc: 'Coded seat grids and structural ticket operations in C.' },
    { title: 'Learned Web Technologies', desc: 'Integrated frontend designs with database logic structures.' },
    { title: 'Developed Parcel Delivery Service', desc: 'Formulated real-time shipping tracking dashboards in HTML/CSS/PHP.' },
    { title: 'Learned Assembly Language', desc: 'Understood processor flags, interrupt vectors, and low-level code compilation.' },
    { title: 'Built ATM Simulator', desc: 'Programmed ATM logic routines using assembly loops and registers via EMU8086.' },
    { title: 'Learned Java', desc: 'Focused on object models, runtime configurations, interfaces, and packages.' },
    { title: 'Developed Bank Management System', desc: 'Engineered safe client account ledgers using Java swing/console features.' },
    { title: 'Joined Multiple Clubs', desc: 'Broadened peer cooperation across Dramatix, Quiz, and Yoga structures.' },
    { title: 'Became Joint Secretary of Yoga Club', desc: 'Steered administrative decisions, planning schedules and leading large assemblies.' },
    { title: 'Started Cyber Security Internship at Blue Desk', desc: 'Engaged in practical vulnerability sweeps and application security guidelines.' },
  ];

  return (
    <section id="timeline" className="section-padding scroll-reveal">
      <div className="section-container">
        <span className="section-sub">My Path</span>
        <h2 className="section-title">Experience & Education</h2>

        <div className="timeline-grid">
          {/* Academic & Work Cards (Left) */}
          <div className="timeline-summary-cards">
            <div className="timeline-summary-card glass-card hover-glow-blue scroll-reveal">
              <div className="card-timeline-header">
                <span className="card-timeline-date">2024 - Present (3rd Year)</span>
                <span className="card-timeline-tag education-tag">Education</span>
              </div>
              <h3 className="card-timeline-title">M.Sc Software Systems (Integrated)</h3>
              <h4 className="card-timeline-org">Coimbatore Institute of Technology</h4>
              <p className="card-timeline-body">
                Enrolled in a prestigious 5-year integrated post-graduate program covering core computer
                science subjects, secure web practices, and advanced programming constructs.
              </p>
            </div>

            <div className="timeline-summary-card glass-card hover-glow-teal scroll-reveal">
              <div className="card-timeline-header">
                <span className="card-timeline-date">Current</span>
                <span className="card-timeline-tag experience-tag">Experience</span>
              </div>
              <h3 className="card-timeline-title">Cyber Security Intern</h3>
              <h4 className="card-timeline-org">Blue Desk</h4>
              <ul className="timeline-responsibilities">
                <li>Learning cybersecurity principles</li>
                <li>Understanding network security</li>
                <li>Security assessment</li>
                <li>Web application security basics</li>
                <li>Threat analysis</li>
                <li>Working with security tools</li>
                <li>Collaborating with experienced professionals</li>
              </ul>
            </div>
          </div>

          {/* Academic Journey Roadmap (Right) */}
          <div className="journey-roadmap glass-card scroll-reveal">
            <h3 className="journey-title">Academic Journey & Milestones</h3>
            <div className="roadmap-wrapper">
              <div className="roadmap-line"></div>
              {steps.map((step, idx) => (
                <div key={idx} className="roadmap-step revealed active" data-step={idx + 1}>
                  <div className="roadmap-dot"></div>
                  <div className="roadmap-content">
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
