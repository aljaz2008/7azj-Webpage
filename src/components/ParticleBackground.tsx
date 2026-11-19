'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const LINK_DISTANCE = 130;

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particles: Particle[] = [];
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      // scale particle count with screen area, so phones don't do needless work
      const count = Math.round(Math.min(90, (canvas.width * canvas.height) / 16000));
      particles.length = 0;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35
        });
      }
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        if (!reduceMotion) {
          if (mouseRef.current.active) {
            const dx = mouseRef.current.x - p.x;
            const dy = mouseRef.current.y - p.y;
            const dist = Math.max(0.001, Math.hypot(dx, dy));
            if (dist < 240) {
              p.vx += (dx / dist) * 0.003;
              p.vy += (dy / dist) * 0.003;
            }
          }

          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.995;
          p.vy *= 0.995;

          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        context.beginPath();
        context.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255,178,63,0.55)';
        context.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < LINK_DISTANCE) {
            context.strokeStyle = `rgba(255,214,150,${0.1 - dist / (LINK_DISTANCE * 10)})`;
            context.lineWidth = 0.7;
            context.beginPath();
            context.moveTo(p.x, p.y);
            context.lineTo(q.x, q.y);
            context.stroke();
          }
        }
      }
    };

    const animate = () => {
      draw();
      raf = requestAnimationFrame(animate);
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // only animate while the hero is on screen and the tab is visible
    let onScreen = true;
    const sync = () => {
      cancelAnimationFrame(raf);
      if (onScreen && !document.hidden && !reduceMotion) animate();
    };
    const onVisibility = sync;
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    visibility.observe(canvas);

    const onResize = () => {
      resize();
      if (reduceMotion) draw();
    };

    resize();
    if (reduceMotion) draw();
    else animate();

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      visibility.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgb(255_178_63/0.10),transparent_55%)]" />
      <div className="bg-grid absolute inset-0" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
      />
    </div>
  );
}
