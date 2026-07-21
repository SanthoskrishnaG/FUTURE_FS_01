'use client';

import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let particlesArray: Particle[] = [];
    let animationId: number;
    const mouse = { x: null as number | null, y: null as number | null, radius: 120 };

    let particleColor = 'rgba(59, 130, 246, 0.45)';
    let lineColor = 'rgba(59, 130, 246, 0.08)';

    function updateColorsByTheme(theme: string) {
      if (theme === 'light') {
        particleColor = 'rgba(20, 184, 166, 0.35)';
        lineColor = 'rgba(20, 184, 166, 0.05)';
      } else {
        particleColor = 'rgba(59, 130, 246, 0.4)';
        lineColor = 'rgba(59, 130, 246, 0.06)';
      }
    }

    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    updateColorsByTheme(savedTheme);

    class Particle {
      x: number; y: number;
      directionX: number; directionY: number;
      size: number;
      constructor(x: number, y: number, dx: number, dy: number, size: number) {
        this.x = x; this.y = y; this.directionX = dx; this.directionY = dy; this.size = size;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }
      update() {
        if (this.x > canvas!.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas!.height || this.y < 0) this.directionY = -this.directionY;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x, dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 3;
            this.y -= (dy / dist) * force * 3;
          }
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function initParticles() {
      particlesArray = [];
      let count = (canvas!.width * canvas!.height) / 11000;
      count = Math.min(120, Math.max(40, count));
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2.5 + 1;
        particlesArray.push(new Particle(
          Math.random() * (canvas!.width - size * 4) + size * 2,
          Math.random() * (canvas!.height - size * 4) + size * 2,
          Math.random() * 0.4 - 0.2,
          Math.random() * 0.4 - 0.2,
          size
        ));
      }
    }

    function connect() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.45;
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      particlesArray.forEach(p => p.update());
      connect();
      animationId = requestAnimationFrame(animate);
    }

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      initParticles();
    }

    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseOut = () => { mouse.x = null; mouse.y = null; };
    const onThemeChange = (e: Event) => updateColorsByTheme((e as CustomEvent).detail.theme);

    resize();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseOut);
    window.addEventListener('themechanged', onThemeChange);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('themechanged', onThemeChange);
    };
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef} />;
}
