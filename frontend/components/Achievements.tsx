'use client';

export default function Achievements() {
  return (
    <section id="why-hire-and-achievements" className="section-padding scroll-reveal">
      <div className="section-container why-achieve-grid">
        {/* Achievements */}
        <div className="achievements-column">
          <span className="section-sub">Milestones</span>
          <h2 className="section-title">Key Achievements</h2>
          <div className="achievements-timeline">
            <div className="achievement-item glass-card">
              <div className="achievement-marker"></div>
              <h4>Leadership Experience</h4>
              <p>Successfully coordinating college events & active participation in multiple clubs.</p>
            </div>
            <div className="achievement-item glass-card">
              <div className="achievement-marker"></div>
              <h4>Cyber Security Internship</h4>
              <p>Secured practical experience early during academic years, mapping vulnerabilities at Blue Desk.</p>
            </div>
            <div className="achievement-item glass-card">
              <div className="achievement-marker"></div>
              <h4>Completed Multiple Academic Projects</h4>
              <p>Successfully built console compilers, system assemblers, web managers, and database models.</p>
            </div>
            <div className="achievement-item glass-card">
              <div className="achievement-marker"></div>
              <h4>Continuous Learner</h4>
              <p>Self-taught programming methodologies, application architectures, and safety standards.</p>
            </div>
          </div>
        </div>

        {/* Why Hire Me */}
        <div className="why-hire-column">
          <span className="section-sub">Traits</span>
          <h2 className="section-title">Why Hire Me?</h2>
          <div className="why-grid">
            <div className="why-card glass-card hover-glow-blue">
              <h4>Strong problem-solving mindset</h4>
              <p>Ability to trace algorithm states and design optimized database queries.</p>
            </div>
            <div className="why-card glass-card hover-glow-teal">
              <h4>Leadership experience</h4>
              <p>Proven track record leading college committees and planning events.</p>
            </div>
            <div className="why-card glass-card hover-glow-purple">
              <h4>Quick learner</h4>
              <p>Rapidly adaptive to frameworks from ASM to PHP, JS, and security models.</p>
            </div>
            <div className="why-card glass-card hover-glow-blue">
              <h4>Excellent teamwork</h4>
              <p>Clear communication learned from organizing student councils and joint clubs.</p>
            </div>
            <div className="why-card glass-card hover-glow-teal">
              <h4>Cyber Security enthusiast</h4>
              <p>Approaching software cycles with safety protocols in mind from day one.</p>
            </div>
            <div className="why-card glass-card hover-glow-purple">
              <h4>Software development experience</h4>
              <p>Solid hands-on foundation in multiple languages (Java, C, SQL).</p>
            </div>
            <div className="why-card glass-card hover-glow-blue">
              <h4>Adaptable</h4>
              <p>Flexible in shifting contexts, managing workloads, and adopting feedback.</p>
            </div>
            <div className="why-card glass-card hover-glow-teal">
              <h4>Positive attitude</h4>
              <p>Dedicated to personal growth, supportive dynamics, and work ethics.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
