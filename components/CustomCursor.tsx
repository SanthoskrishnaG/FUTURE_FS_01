'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById('custom-cursor');
    const ring = document.getElementById('cursor-ring');

    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      animationFrameId = requestAnimationFrame(animateRing);
    };

    animateRing();

    const addHover = () => document.body.classList.add('hovering');
    const removeHover = () => document.body.classList.remove('hovering');

    const updateHoverListeners = () => {
      const hoverEls = document.querySelectorAll(
        'a, button, input, textarea, .cert-card, .project-card, .glass-card, .filter-btn, .project-filter-btn'
      );
      hoverEls.forEach((el) => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    };

    updateHoverListeners();

    // Re-bind hover listeners periodically in case of dynamic renders
    const interval = setInterval(updateHoverListeners, 1500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div id="scroll-progress"></div>
      <div id="custom-cursor"></div>
      <div id="cursor-ring"></div>
    </>
  );
}
