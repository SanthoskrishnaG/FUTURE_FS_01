'use client';

import { useEffect, useState } from 'react';

export default function GithubGrid() {
  const [cells, setCells] = useState<{ level: number; dateStr: string; commits: string }[]>([]);

  useEffect(() => {
    const totalCells = 365;
    const levels = [0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 4];
    const items = [];

    for (let i = 0; i < totalCells; i++) {
      const level = levels[Math.floor(Math.random() * levels.length)];
      const date = new Date();
      date.setDate(date.getDate() - (totalCells - i));
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const commits = level === 0 ? 'No' : `${level * 2 + Math.floor(Math.random() * 2)}`;
      items.push({ level, dateStr, commits });
    }
    setCells(items);
  }, []);

  return (
    <section id="github-activity" className="section-padding scroll-reveal">
      <div className="section-container">
        <span className="section-sub">Development Pulse</span>
        <h2 className="section-title">GitHub Contribution History</h2>

        <div className="github-board-card glass-card">
          <div className="github-header">
            <div className="github-profile">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" className="github-logo-svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <div className="github-profile-info">
                <h4>santhoskrishna-g</h4>
                <p>248 contributions in the last year</p>
              </div>
            </div>
            <div className="github-meta">
              <span className="active-badge">Online Activity</span>
            </div>
          </div>

          <div className="github-grid-container">
            <div className="github-months">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
            <div className="github-grid-wrapper">
              <div className="github-days">
                <span>Mon</span><span>Wed</span><span>Fri</span>
              </div>
              <div id="github-grid" className="github-grid">
                {cells.map((c, i) => (
                  <div
                    key={i}
                    className={`github-cell lvl-${c.level}`}
                    title={`${c.commits} contributions on ${c.dateStr}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="github-footer">
            <span>Learn how we count contributions</span>
            <div className="github-legend">
              <span>Less</span>
              <span className="legend-box lvl-0"></span>
              <span className="legend-box lvl-1"></span>
              <span className="legend-box lvl-2"></span>
              <span className="legend-box lvl-3"></span>
              <span className="legend-box lvl-4"></span>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
