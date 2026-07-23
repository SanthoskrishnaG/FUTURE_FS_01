'use client';

import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    const mouse: { x: number | null; y: number | null; radius: number } = {
      x: null,
      y: null,
      radius: 120,
    };

    let particleColor = 'rgba(59, 130, 246, 0.45)';
    let lineColor = 'rgba(59, 130, 246, 0.08)';

    const updateColorsByTheme = (theme: string) => {
      if (theme === 'light') {
        particleColor = 'rgba(20, 184, 166, 0.35)';
        lineColor = 'rgba(20, 184, 166, 0.05)';
      } else {
        particleColor = 'rgba(59, 130, 246, 0.4)';
        lineColor = 'rgba(59, 130, 246, 0.06)';
      }
    };

    const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateColorsByTheme(initialTheme);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.theme) {
        updateColorsByTheme(customEvent.detail.theme);
      }
    };

    window.addEventListener('themechanged', handleThemeChange);

    class Particle {
      x: number;
      y: number;
      dx: number;
      dy: number;
      size: number;

      constructor(x: number, y: number, dx: number, dy: number, size: number) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }

      update() {
        if (!canvas) return;
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 3;
            this.y -= (dy / dist) * force * 3;
          }
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    const initParticles = () => {
      particlesArray = [];
      const count = Math.min(120, Math.max(40, (canvas.width * canvas.height) / 11000));
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2.5 + 1;
        particlesArray.push(
          new Particle(
            Math.random() * (canvas.width - size * 4) + size * 2,
            Math.random() * (canvas.height - size * 4) + size * 2,
            (Math.random() - 0.5) * 0.4,
            (Math.random() - 0.5) * 0.4,
            size
          )
        );
      }
    };

    const connect = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = (1 - dist / 140) * 0.45;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((p) => p.update());
      connect();
      animationId = requestAnimationFrame(animate);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('themechanged', handleThemeChange);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}
