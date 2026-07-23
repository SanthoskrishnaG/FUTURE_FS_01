'use client';

import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  category: 'Full-Stack' | 'C' | 'Java' | 'Assembly' | 'Security';
  badge: string;
  description: string;
  tags: string[];
  githubUrl: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'portfolio',
    title: 'Full-Stack Portfolio System',
    category: 'Full-Stack',
    badge: 'Full-Stack',
    description: 'Modern Next.js 14 + React + Express API portfolio showcasing interactive glassmorphism UI, theme switcher, canvas animations, and automated email contact form.',
    tags: ['Next.js', 'React', 'TypeScript', 'Express.js', 'Nodemailer'],
    githubUrl: 'https://github.com/SanthoskrishnaG',
  },
  {
    id: 'sec-scanner',
    title: 'Web Vulnerability Scanner & Analyzer',
    category: 'Security',
    badge: 'Cyber Security',
    description: 'Python & CLI automated security inspection tool that scans headers, XSS vulnerabilities, SQL injection endpoints, and generates risk reports.',
    tags: ['Python', 'Cyber Security', 'OWASP Top 10', 'Networking'],
    githubUrl: 'https://github.com/SanthoskrishnaG',
  },
  {
    id: 'c-sys',
    title: 'High Performance File Management System',
    category: 'C',
    badge: 'C / C++',
    description: 'Custom C file system emulator utilizing low-level memory allocation, pointer arithmetic, binary tree file index, and thread-safe operations.',
    tags: ['C', 'System Programming', 'Data Structures', 'Pointers'],
    githubUrl: 'https://github.com/SanthoskrishnaG',
  },
  {
    id: 'java-bank',
    title: 'Secure Banking & Transaction Engine',
    category: 'Java',
    badge: 'Java (OOP)',
    description: 'Object-oriented Java application implementing multi-threaded banking transactions, AES encryption for user credentials, and ledger verification.',
    tags: ['Java', 'OOP', 'Multithreading', 'Encryption'],
    githubUrl: 'https://github.com/SanthoskrishnaG',
  },
  {
    id: 'asm-cpu',
    title: '8086 Assembly Processor Simulator',
    category: 'Assembly',
    badge: 'Assembly',
    description: 'x86 Assembly program demonstrating low-level hardware register control, interrupt handling, string operations, and stack frame optimization.',
    tags: ['Assembly', 'x86 Architecture', 'Registers', 'Hardware'],
    githubUrl: 'https://github.com/SanthoskrishnaG',
  },
  {
    id: 'net-monitor',
    title: 'Packet Sniffer & Network Protocol Monitor',
    category: 'Security',
    badge: 'Networking',
    description: 'Network traffic analyzer built with Python and Scapy to monitor TCP/UDP packets, detect port scans, and log unauthorized network activity.',
    tags: ['Python', 'Networking', 'Wireshark', 'Security'],
    githubUrl: 'https://github.com/SanthoskrishnaG',
  },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.tags.some((t) => t.toLowerCase().includes(q));

    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <span className="section-sub">FEATURED WORK</span>
        <h2 className="section-title">Projects &amp; Systems</h2>

        <div className="project-controls">
          <div className="search-box glass-card">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              id="project-search"
              placeholder="Search projects or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="project-filters">
            {['all', 'Full-Stack', 'C', 'Java', 'Assembly', 'Security'].map((cat) => (
              <button
                key={cat}
                className={`project-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat === 'all' ? 'All Projects' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card glass-card hover-glow-blue" data-tech={project.category}>
              <span className="project-badge">{project.badge}</span>
              <div className="project-card-header">
                <h3 className="project-title">{project.title}</h3>
              </div>
              <p className="project-desc">{project.description}</p>

              <div className="project-tech-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx}>{tag}</span>
                ))}
              </div>

              <div className="project-links">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-action-btn"
                >
                  <svg className="git-svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>Source Code &rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
