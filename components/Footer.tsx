'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-content">
        <p className="designer-text">
          Designed &amp; Developed with <span className="heart-pulse">♥</span> by Santhoskrishna G
        </p>
        <p className="copyright-text">
          &copy; <span id="current-year">{currentYear}</span> Santhoskrishna G. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
