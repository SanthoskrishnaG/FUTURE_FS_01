'use client';

import { useState } from 'react';

interface Skill {
  name: string;
  percentage: number;
  category: 'languages' | 'security' | 'web' | 'core';
  barColor: 'blue-bar' | 'teal-bar' | 'purple-bar';
}

const SKILLS_DATA: Skill[] = [
  // Languages
  { name: 'C / C++', percentage: 90, category: 'languages', barColor: 'blue-bar' },
  { name: 'Java (OOP)', percentage: 88, category: 'languages', barColor: 'teal-bar' },
  { name: 'Python', percentage: 85, category: 'languages', barColor: 'purple-bar' },
  { name: 'Assembly (x86)', percentage: 75, category: 'languages', barColor: 'blue-bar' },
  { name: 'JavaScript / TypeScript', percentage: 88, category: 'languages', barColor: 'teal-bar' },

  // Security
  { name: 'Cyber Security & Penetration Testing', percentage: 85, category: 'security', barColor: 'teal-bar' },
  { name: 'Network Security & Wireshark', percentage: 82, category: 'security', barColor: 'purple-bar' },
  { name: 'Cryptography & Hash Functions', percentage: 80, category: 'security', barColor: 'blue-bar' },
  { name: 'Web Vulnerability Assessment (OWASP)', percentage: 85, category: 'security', barColor: 'teal-bar' },

  // Web & Tools
  { name: 'React.js / Next.js', percentage: 88, category: 'web', barColor: 'blue-bar' },
  { name: 'HTML5 / CSS3 / Glassmorphism', percentage: 92, category: 'web', barColor: 'teal-bar' },
  { name: 'Node.js & Express API', percentage: 86, category: 'web', barColor: 'purple-bar' },
  { name: 'Git & GitHub Version Control', percentage: 90, category: 'web', barColor: 'blue-bar' },

  // Core CS
  { name: 'Data Structures & Algorithms', percentage: 88, category: 'core', barColor: 'purple-bar' },
  { name: 'Operating Systems & Linux', percentage: 84, category: 'core', barColor: 'blue-bar' },
  { name: 'Database Management (SQL & JSON)', percentage: 85, category: 'core', barColor: 'teal-bar' },
  { name: 'Object-Oriented Design (OOD)', percentage: 90, category: 'core', barColor: 'purple-bar' },
];

export default function SkillsSection() {
  const [filter, setFilter] = useState<'all' | 'languages' | 'security' | 'web' | 'core'>('all');

  const filteredSkills = SKILLS_DATA.filter((skill) => filter === 'all' || skill.category === filter);

  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        <span className="section-sub">TECHNICAL PROFICIENCY</span>
        <h2 className="section-title">Skills &amp; Expertise</h2>

        <div className="skills-filter-container">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Skills
          </button>
          <button
            className={`filter-btn ${filter === 'languages' ? 'active' : ''}`}
            onClick={() => setFilter('languages')}
          >
            Languages
          </button>
          <button
            className={`filter-btn ${filter === 'security' ? 'active' : ''}`}
            onClick={() => setFilter('security')}
          >
            Cyber Security
          </button>
          <button
            className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
            onClick={() => setFilter('web')}
          >
            Web &amp; Tools
          </button>
          <button
            className={`filter-btn ${filter === 'core' ? 'active' : ''}`}
            onClick={() => setFilter('core')}
          >
            Core CS
          </button>
        </div>

        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="skill-card glass-card hover-glow-blue">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.percentage}%</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className={`progress-bar ${skill.barColor}`}
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
