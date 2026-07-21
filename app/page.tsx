'use client';

import { useEffect } from 'react';
import Loader from '../components/Loader';
import Header from '../components/Header';
import CustomCursor from '../components/CustomCursor';
import ParticleCanvas from '../components/ParticleCanvas';
import ScrollManager from '../components/ScrollManager';
import VisualEffects from '../components/VisualEffects';
import Hero from '../components/Hero';
import About from '../components/About';
import Timeline from '../components/Timeline';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Leadership from '../components/Leadership';
import Achievements from '../components/Achievements';
import GithubGrid from '../components/GithubGrid';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home() {
  useEffect(() => {
    // Apply saved theme on mount
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <>
      <div id="scroll-progress" />
      <CustomCursor />
      <ParticleCanvas />
      <ScrollManager />
      <VisualEffects />
      <Loader />
      <Header />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Skills />
        <Projects />
        <Leadership />
        <Achievements />
        <GithubGrid />
        <ContactSection />
      </main>
      <Footer />
      <div id="toast-container" />
      <button
        id="back-to-top"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </button>
    </>
  );
}
