'use client';

import { useState } from 'react';

type Skill = {
  name: string;
  percentage: string;
  category: 'languages' | 'tools' | 'concepts';
  color: 'purple-bar' | 'blue-bar' | 'teal-bar';
};

const SKILLS: Skill[] = [
  { name: 'Java', percentage: '90%', category: 'languages', color: 'purple-bar' },
  { name: 'C', percentage: '85%', category: 'languages', color: 'blue-bar' },
  { name: 'HTML', percentage: '95%', category: 'languages', color: 'teal-bar' },
  { name: 'CSS', percentage: '90%', category: 'languages', color: 'purple-bar' },
  { name: 'JavaScript', percentage: '80%', category: 'languages', color: 'blue-bar' },
  { name: 'SQL', percentage: '85%', category: 'languages', color: 'teal-bar' },
  { name: 'Git', percentage: '85%', category: 'tools', color: 'blue-bar' },
  { name: 'GitHub', percentage: '90%', category: 'tools', color: 'purple-bar' },
  { name: 'VS Code', percentage: '95%', category: 'tools', color: 'teal-bar' },
  { name: 'EMU8086', percentage: '75%', category: 'tools', color: 'blue-bar' },
  { name: 'Object Oriented Programming', percentage: '90%', category: 'concepts', color: 'purple-bar' },
  { name: 'Database Management', percentage: '85%', category: 'concepts', color: 'blue-bar' },
  { name: 'Web Development', percentage: '90%', category: 'concepts', color: 'teal-bar' },
  { name: 'Cyber Security Fundamentals', percentage: '80%', category: 'concepts', color: 'purple-bar' },
  { name: 'Problem Solving', percentage: '85%', category: 'concepts', color: 'blue-bar' },
  { name: 'Leadership', percentage: '90%', category: 'concepts', color: 'teal-bar' },
  { name: 'Event Coordination', percentage: '95%', category: 'concepts', color: 'purple-bar' },
  { name: 'Communication', percentage: '90%', category: 'concepts', color: 'blue-bar' },
  { name: 'Team Management', percentage: '90%', category: 'concepts', color: 'teal-bar' },
];

export default function Skills() {
  const [filter, setFilter] = useState<'all' | 'languages' | 'tools' | 'concepts'>('all');

  const filteredSkills = SKILLS.filter(s => filter === 'all' || s.category === filter);

  return (
    <section id="skills" className="section-padding scroll-reveal">
      <div className="section-container">
        <span className="section-sub">What I Code With</span>
        <h2 className="section-title">Technical Expertise</h2>

        {/* Skills Filters */}
        <div className="skills-filter-container">
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            All Skills
          </button>
          <button className={`filter-btn ${filter === 'languages' ? 'active' : ''}`} onClick={() => setFilter('languages')}>
            Programming Languages
          </button>
          <button className={`filter-btn ${filter === 'tools' ? 'active' : ''}`} onClick={() => setFilter('tools')}>
            Developer Tools
          </button>
          <button className={`filter-btn ${filter === 'concepts' ? 'active' : ''}`} onClick={() => setFilter('concepts')}>
            Core Concepts
          </button>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, idx) => (
            <div key={idx} className="skill-card glass-card" data-category={skill.category}>
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.percentage}</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className={`progress-bar ${skill.color}`}
                  style={{ width: skill.percentage }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
