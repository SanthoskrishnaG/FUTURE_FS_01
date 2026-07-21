'use client';

import { useEffect } from 'react';

export default function VisualEffects() {
  useEffect(() => {
    // 1. Click Ripple / Shockwave Effect
    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.className = 'click-shockwave';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    // 2. 3D Tilt Effect on Glass Cards
    const cards = document.querySelectorAll<HTMLElement>('.glass-card, .project-card, .info-card');

    const handleMouseMove = (e: MouseEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    };

    const handleMouseLeave = (card: HTMLElement) => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    };

    const cardListeners: { card: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }[] = [];

    cards.forEach((card) => {
      const move = (e: MouseEvent) => handleMouseMove(e, card);
      const leave = () => handleMouseLeave(card);

      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      cardListeners.push({ card, move, leave });
    });

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
      cardListeners.forEach(({ card, move, leave }) => {
        card.removeEventListener('mousemove', move);
        card.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return null;
}
