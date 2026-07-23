'use client';

import Link from 'next/link';

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh', padding: '40px 20px', color: '#1F2937' }}>
      {/* Header bar (hidden when printing) */}
      <div className="no-print-header" style={{ maxWidth: '800px', margin: '0 auto 20px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link
          href="/"
          className="back-link"
          style={{ textDecoration: 'none', color: '#4B5563', fontSize: '0.95rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          &larr; Back to Portfolio
        </Link>
        <button
          onClick={handlePrint}
          className="btn-print"
          style={{ backgroundColor: '#3B82F6', color: 'white', border: 'none', padding: '10px 20px', fontSize: '0.95rem', fontWeight: 600, borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Print / Save PDF
        </button>
      </div>

      {/* Printable Resume Card */}
      <div
        className="resume-card"
        style={{
          backgroundColor: 'white',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '50px',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          border: '1px solid #E5E7EB',
        }}
      >
        {/* Resume Title Header */}
        <div style={{ borderBottom: '2px solid #3B82F6', paddingBottom: '20px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2.2rem', fontWeight: 700, color: '#1F2937', margin: 0, lineHeight: 1.1 }}>
              Santhoskrishna G
            </h1>
            <h2 style={{ fontSize: '1.1rem', color: '#3B82F6', fontWeight: 600, marginTop: '5px', margin: 0 }}>
              Software Developer &amp; Cyber Security Enthusiast
            </h2>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#4B5563' }}>
            <p style={{ margin: '0 0 3px 0' }}>Coimbatore, Tamil Nadu, India</p>
            <p style={{ margin: '0 0 3px 0' }}>
              Email:{' '}
              <a href="mailto:santhoskrishnag@gmail.com" style={{ color: '#3B82F6', textDecoration: 'none' }}>
                santhoskrishnag@gmail.com
              </a>
            </p>
            <p style={{ margin: '0 0 3px 0' }}>
              LinkedIn:{' '}
              <a href="https://linkedin.com/in/SanthoskrishnaG" target="_blank" rel="noreferrer" style={{ color: '#3B82F6', textDecoration: 'none' }}>
                linkedin.com/in/SanthoskrishnaG
              </a>
            </p>
            <p style={{ margin: 0 }}>
              GitHub:{' '}
              <a href="https://github.com/SanthoskrishnaG" target="_blank" rel="noreferrer" style={{ color: '#3B82F6', textDecoration: 'none' }}>
                github.com/SanthoskrishnaG
              </a>
            </p>
          </div>
        </div>

        {/* Executive Summary */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#1F2937', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', paddingBottom: '4px', borderBottom: '1px solid #E5E7EB' }}>
            Professional Summary
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#4B5563', textAlign: 'justify', margin: 0 }}>
            Detail-oriented <strong>M.Sc. Software Systems student</strong> at Coimbatore Institute of Technology with expertise in C, Java, Python, Web Development, and Cyber Security. Proven leadership capabilities as Class Representative and Association Secretary. Experienced in threat detection, vulnerability analysis, and building high-performance, secure software applications.
          </p>
        </div>

        {/* Education */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#1F2937', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', paddingBottom: '4px', borderBottom: '1px solid #E5E7EB' }}>
            Education
          </h3>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.95rem', color: '#1F2937' }}>
              <span>M.Sc. Integrated Software Systems (5-Year Program)</span>
              <span>2023 – 2028</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#3B82F6', fontWeight: 500, marginTop: '2px', marginBottom: '6px' }}>
              <span>Coimbatore Institute of Technology (CIT)</span>
              <span>CGPA: 8.0+ / 10</span>
            </div>
            <ul style={{ marginLeft: '18px', fontSize: '0.85rem', color: '#4B5563', margin: 0 }}>
              <li>Core Coursework: Data Structures &amp; Algorithms, Operating Systems, Computer Networks, DBMS, Object-Oriented Software Engineering, Cyber Security.</li>
            </ul>
          </div>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#1F2937', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', paddingBottom: '4px', borderBottom: '1px solid #E5E7EB' }}>
            Work &amp; Internship Experience
          </h3>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.95rem', color: '#1F2937' }}>
              <span>Cyber Security Intern</span>
              <span>2024 – Present</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#3B82F6', fontWeight: 500, marginTop: '2px', marginBottom: '6px' }}>
              <span>Future Interns</span>
              <span>Remote</span>
            </div>
            <ul style={{ marginLeft: '18px', fontSize: '0.85rem', color: '#4B5563', margin: 0 }}>
              <li>Conducted vulnerability assessments and web application security testing following OWASP guidelines.</li>
              <li>Analyzed network traffic logs using Wireshark to identify suspicious TCP/UDP traffic patterns.</li>
              <li>Documented threat mitigation models and contributed to secure coding guidelines.</li>
            </ul>
          </div>
        </div>

        {/* Technical Skills */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#1F2937', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', paddingBottom: '4px', borderBottom: '1px solid #E5E7EB' }}>
            Technical Skills
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', fontSize: '0.85rem' }}>
              <span style={{ fontWeight: 600, width: '160px', color: '#1F2937', flexShrink: 0 }}>Languages:</span>
              <span style={{ color: '#4B5563' }}>C, C++, Java, Python, x86 Assembly, JavaScript, TypeScript</span>
            </div>
            <div style={{ display: 'flex', fontSize: '0.85rem' }}>
              <span style={{ fontWeight: 600, width: '160px', color: '#1F2937', flexShrink: 0 }}>Security &amp; Tools:</span>
              <span style={{ color: '#4B5563' }}>Wireshark, OWASP Top 10, Nmap, Cryptography, Penetration Testing, Git/GitHub</span>
            </div>
            <div style={{ display: 'flex', fontSize: '0.85rem' }}>
              <span style={{ fontWeight: 600, width: '160px', color: '#1F2937', flexShrink: 0 }}>Web Development:</span>
              <span style={{ color: '#4B5563' }}>Next.js, React.js, HTML5, CSS3, Express.js REST API, JSON Storage</span>
            </div>
            <div style={{ display: 'flex', fontSize: '0.85rem' }}>
              <span style={{ fontWeight: 600, width: '160px', color: '#1F2937', flexShrink: 0 }}>Core Concepts:</span>
              <span style={{ color: '#4B5563' }}>Data Structures, Algorithms, Memory Management, Multithreading, OOP Design</span>
            </div>
          </div>
        </div>

        {/* Key Projects */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#1F2937', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', paddingBottom: '4px', borderBottom: '1px solid #E5E7EB' }}>
            Key Projects
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1F2937', margin: 0 }}>Full-Stack Portfolio App</h4>
              <p style={{ fontSize: '0.8rem', color: '#3B82F6', fontWeight: 500, margin: '2px 0 4px 0' }}>Next.js, Express, Nodemailer</p>
              <p style={{ fontSize: '0.8rem', color: '#4B5563', margin: 0 }}>Developed a full-stack portfolio with interactive glassmorphism UI and contact API.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1F2937', margin: 0 }}>Web Security Scanner</h4>
              <p style={{ fontSize: '0.8rem', color: '#3B82F6', fontWeight: 500, margin: '2px 0 4px 0' }}>Python, Security Headers, OWASP</p>
              <p style={{ fontSize: '0.8rem', color: '#4B5563', margin: 0 }}>Automated vulnerability scanning tool checking for XSS, SQLi, and misconfigurations.</p>
            </div>
          </div>
        </div>

        {/* Leadership & Roles */}
        <div>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#1F2937', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', paddingBottom: '4px', borderBottom: '1px solid #E5E7EB' }}>
            Leadership &amp; Responsibilities
          </h3>
          <ul style={{ marginLeft: '18px', fontSize: '0.85rem', color: '#4B5563', margin: 0 }}>
            <li style={{ marginBottom: '4px' }}>
              <strong>Class Representative (2023–Present)</strong>: Primary liaison between 60+ M.Sc. Software Systems students and faculty.
            </li>
            <li>
              <strong>Secretary, Software Systems Association (SSA), CIT</strong>: Organized technical symposiums, hackathons, and guest lectures.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
