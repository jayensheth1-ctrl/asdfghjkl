import React, { useEffect, useRef } from 'react';

const GREENS = ['#15803d', '#22c55e', '#86efac'];

export default function RadialParticleField({ id, desktopCount = 180, mobileCount = 60, className = '' }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const count = reducedMotion ? 40 : isMobile ? mobileCount : desktopCount;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    particlesRef.current = Array.from({ length: count }, () => ({
      angle: Math.random() * Math.PI * 2,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.2 + Math.random() * 0.3,
      radiusFactor: 0.5 + Math.random() * 0.5,
      size: 2 + Math.random() * 2,
      baseOpacity: 0.2 + Math.random() * 0.4,
      color: GREENS[Math.floor(Math.random() * GREENS.length)],
    }));

    let t = 0;

    const getProgress = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh - rect.top) / (vh + rect.height);
      return Math.min(Math.max(raw, 0), 1);
    };

    const draw = (bell, radiusScale) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = Math.max(width, height) * 0.55;
      const pts = particlesRef.current.map((p) => {
        const r = maxRadius * radiusScale * p.radiusFactor;
        const wob = Math.sin(t * p.wobbleSpeed + p.wobble) * 12;
        const x = cx + Math.cos(p.angle) * (r + wob);
        const y = cy + Math.sin(p.angle) * (r + wob) * 0.7;
        return { x, y, p };
      });

      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.strokeStyle = `rgba(74, 222, 128, ${0.15 * bell * (1 - dist / 90)})`;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      pts.forEach(({ x, y, p }) => {
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseOpacity * bell;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    if (reducedMotion) {
      draw(0.4, 0.6);
      return () => window.removeEventListener('resize', resize);
    }

    const loop = () => {
      t += 0.016;
      const progress = getProgress();
      const bell = Math.max(0, 1 - Math.abs(progress - 0.5) * 2.2);
      const radiusScale = 0.15 + Math.min(progress, 0.6) / 0.6 * 0.85;
      draw(bell, radiusScale);
      rafRef.current = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !rafRef.current) {
          rafRef.current = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
          ctx.clearRect(0, 0, width, height);
        }
      },
      { threshold: 0, rootMargin: '20% 0px 20% 0px' }
    );
    observer.observe(container);

    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [desktopCount, mobileCount]);

  return (
    <div ref={containerRef} className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  );
}
