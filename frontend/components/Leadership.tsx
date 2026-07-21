'use client';

export default function Leadership() {
  return (
    <section id="leadership" className="section-padding scroll-reveal">
      <div className="section-container">
        <span className="section-sub">Roles Beyond Academics</span>
        <h2 className="section-title">Leadership & Engagement</h2>

        <div className="leadership-grid">
          {/* Joint Secretary Yoga Club */}
          <div className="leadership-card glass-card hover-glow-blue">
            <div className="leadership-header">
              <div className="leadership-badge blue-badge">Joint Secretary</div>
              <h3 className="leadership-org">Yoga Club</h3>
              <p className="leadership-loc">Coimbatore Institute of Technology</p>
            </div>
            <ul className="leadership-list">
              <li>Organizing yoga sessions</li>
              <li>Planning wellness events</li>
              <li>Leading volunteers</li>
              <li>Event coordination</li>
              <li>Club management</li>
            </ul>
          </div>

          {/* Dramatix Club Member */}
          <div className="leadership-card glass-card hover-glow-teal">
            <div className="leadership-header">
              <div className="leadership-badge teal-badge">Active Member</div>
              <h3 className="leadership-org">Dramatix Club</h3>
              <p className="leadership-loc">Coimbatore Institute of Technology</p>
            </div>
            <ul className="leadership-list">
              <li>Participated in cultural events</li>
              <li>Creative collaboration</li>
              <li>Stage coordination</li>
            </ul>
          </div>

          {/* Quiz Club Member */}
          <div className="leadership-card glass-card hover-glow-purple">
            <div className="leadership-header">
              <div className="leadership-badge purple-badge">Active Member</div>
              <h3 className="leadership-org">Quiz Club</h3>
              <p className="leadership-loc">Coimbatore Institute of Technology</p>
            </div>
            <ul className="leadership-list">
              <li>Participated in technical quizzes</li>
              <li>Knowledge sharing</li>
              <li>Competitive events</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
