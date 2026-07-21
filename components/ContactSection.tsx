'use client';

import { useState } from 'react';

type DBMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [toastMessage, setToastMessage] = useState('');

  // Full-Stack DB Proof State
  const [dbMessages, setDbMessages] = useState<DBMessage[]>([]);
  const [showDb, setShowDb] = useState(false);
  const [loadingDb, setLoadingDb] = useState(false);

  const fetchDbMessages = async () => {
    setLoadingDb(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (res.ok) {
        setDbMessages(data.messages || []);
      }
    } catch (err) {
      console.error('Failed to fetch DB messages', err);
    } finally {
      setLoadingDb(false);
    }
  };

  const toggleDbView = () => {
    if (!showDb) {
      fetchDbMessages();
    }
    setShowDb(!showDb);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setToastMessage(data.message || 'Message securely saved to SQLite database!');
        setName('');
        setEmail('');
        setMessage('');

        // Refresh DB list if open
        if (showDb) {
          fetchDbMessages();
        }
      } else {
        setStatus('error');
        setToastMessage(data.error || 'Failed to send message.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setToastMessage('Server error. Please try again.');
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setToastMessage('');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="section-padding scroll-reveal">
      <div className="section-container">
        <span className="section-sub">Get In Touch</span>
        <h2 className="section-title">Contact Me</h2>

        {/* Full-Stack Live Architecture Proof Banner */}
        <div
          className="glass-card"
          style={{
            marginBottom: '2.5rem',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            borderColor: 'rgba(59, 130, 246, 0.4)',
            background: 'rgba(59, 130, 246, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 10px #10b981',
              }}
            />
            <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>
              Full-Stack Application Powered by Next.js 14 API Routes &amp; SQLite DB (Prisma ORM)
            </span>
          </div>

          <button
            type="button"
            className="btn glass-btn"
            style={{
              padding: '8px 16px',
              fontSize: '0.85rem',
              width: 'auto',
              height: 'auto',
              borderRadius: '6px',
              color: '#3B82F6',
              borderColor: 'rgba(59, 130, 246, 0.4)',
            }}
            onClick={toggleDbView}
          >
            {showDb ? 'Close Live DB Logs' : '⚡ View Live SQLite Database Records'}
          </button>
        </div>

        {/* Live DB Drawer / Viewer */}
        {showDb && (
          <div
            className="glass-card"
            style={{
              marginBottom: '2.5rem',
              padding: '1.5rem',
              borderColor: 'rgba(20, 184, 166, 0.4)',
              background: 'rgba(16, 16, 21, 0.9)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ color: '#14B8A6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
                Live SQLite Database Transmissions (`GET /api/contact`)
              </h4>
              <button
                onClick={fetchDbMessages}
                disabled={loadingDb}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-secondary)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                }}
              >
                {loadingDb ? 'Refreshing...' : '🔄 Refresh DB'}
              </button>
            </div>

            {loadingDb ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Querying SQLite database via Prisma Client...</p>
            ) : dbMessages.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No messages stored yet. Send a message using the form below to test real-time DB persistence!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto' }}>
                {dbMessages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      fontSize: '0.85rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8B5CF6', marginBottom: '4px', fontWeight: 600 }}>
                      <span>{msg.name} ({msg.email})</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-primary)', margin: 0 }}>{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="contact-grid">
          {/* Contact Details */}
          <div className="contact-info glass-card">
            <h3>Let's Collaborate</h3>
            <p>
              I am actively looking for software developer roles, cybersecurity internships, and collaboration
              opportunities. Reach out using any of the channels below.
            </p>

            <div className="contact-detail-items">
              <div className="detail-item">
                <div className="detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:santhoskrishnag37@gmail.com">santhoskrishnag37@gmail.com</a>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4>Location</h4>
                  <span>Coimbatore, Tamil Nadu, India</span>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M22 19a2 2 0 0 1-2 2Q3 21 3 4a2 2 0 0 1 2-2h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 11l5 2z" />
                  </svg>
                </div>
                <div>
                  <h4>Phone</h4>
                  <span>Available upon request</span>
                </div>
              </div>
            </div>

            <div className="social-links-wrapper">
              <h4>Connect Socially</h4>
              <div className="social-icons">
                <a
                  href="https://www.linkedin.com/in/santhoskrishna-gopinath-8aa739321?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="social-icon-btn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="social-svg">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://github.com/SanthoskrishnaG"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="social-icon-btn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="social-svg">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
                <a
                  href="mailto:santhoskrishnag37@gmail.com"
                  aria-label="Send Email"
                  className="social-icon-btn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="social-svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container glass-card">
            <form id="contact-form" onSubmit={handleSubmit}>
              <div className={`form-group ${name ? 'valid' : ''}`}>
                <input
                  type="text"
                  id="form-name"
                  required
                  placeholder=" "
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <label htmlFor="form-name" className="floating-label">Your Name</label>
                <span className="focus-border"></span>
              </div>

              <div className={`form-group ${email ? 'valid' : ''}`}>
                <input
                  type="email"
                  id="form-email"
                  required
                  placeholder=" "
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="form-email" className="floating-label">Email Address</label>
                <span className="focus-border"></span>
              </div>

              <div className={`form-group ${message ? 'valid' : ''}`}>
                <textarea
                  id="form-message"
                  required
                  placeholder=" "
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
                <label htmlFor="form-message" className="floating-label">Message Content</label>
                <span className="focus-border"></span>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn primary-btn hover-glow w-100"
                >
                  <span>{status === 'submitting' ? 'Saving to Database...' : 'Send Message (Saves to DB)'}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>

              {toastMessage && (
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: status === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    border: `1px solid ${status === 'success' ? '#10b981' : '#ef4444'}`,
                    color: status === 'success' ? '#10b981' : '#ef4444',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                  }}
                >
                  {toastMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
