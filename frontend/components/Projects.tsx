'use client';

import { useState } from 'react';

type Project = {
  badge: string;
  techCategory: 'C' | 'Web' | 'Assembly' | 'Java';
  title: string;
  desc: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    badge: 'C Language',
    techCategory: 'C',
    title: 'Train Ticket Reservation System',
    desc: 'A console-based reservation system implementing booking, cancellation, passenger management, and ticket availability using structured programming concepts.',
    tags: ['C', 'Structured Programming', 'File Storage'],
  },
  {
    badge: 'Web Tech',
    techCategory: 'Web',
    title: 'Parcel Delivery Service',
    desc: 'A responsive web application that enables parcel booking, shipment tracking, customer management, and delivery status updates.',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP (Backend)', 'MySQL'],
  },
  {
    badge: 'Assembly',
    techCategory: 'Assembly',
    title: 'ATM Simulator',
    desc: 'An assembly language simulation of ATM operations including authentication, withdrawal, deposit, balance inquiry, and transaction management.',
    tags: ['Assembly Language', 'EMU8086', 'x86 Architecture'],
  },
  {
    badge: 'Java',
    techCategory: 'Java',
    title: 'Bank Management System',
    desc: 'A Java application implementing customer account management, deposits, withdrawals, transaction history, and account operations using object-oriented programming principles.',
    tags: ['Java', 'OOPs', 'Console Menu'],
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = PROJECTS.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.techCategory === activeFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.desc.toLowerCase().includes(q) ||
      project.tags.some(t => t.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="section-padding scroll-reveal">
      <div className="section-container">
        <span className="section-sub">My Work</span>
        <h2 className="section-title">Academic Projects</h2>

        {/* Project Filters and Search Bar */}
        <div className="project-controls">
          <div className="search-box glass-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              id="project-search"
              placeholder="Search projects by title or tech..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="project-filters">
            {['all', 'C', 'Web', 'Assembly', 'Java'].map(cat => (
              <button
                key={cat}
                className={`project-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat === 'all' ? 'All' : cat === 'Web' ? 'Web Dev' : cat === 'C' ? 'C Language' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <div key={idx} className="project-card glass-card" data-tech={project.techCategory}>
              <div className="project-badge">{project.badge}</div>
              <div className="project-card-header">
                <h3 className="project-title">{project.title}</h3>
              </div>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tech-tags">
                {project.tags.map((t, i) => (
                  <span key={i}>{t}</span>
                ))}
              </div>
              <div className="project-links">
                <a
                  href="https://github.com/SanthoskrishnaG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-action-btn github-link"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="git-svg">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  Repository Link
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
