import React, { useEffect, useRef } from 'react';

// Ultra-subtle technical grid behind the hero, with a slow mouse-parallax drift.
// Only transform is animated (GPU-friendly); disabled for reduced-motion users.
export default function HeroGrid() {
  const ref = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      target.current.x = ((e.clientX - cx) / cx) * 12;
      target.current.y = ((e.clientY - cy) / cy) * 12;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * 0.04;
      current.current.y += (target.current.y - current.current.y) * 0.04;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px, 0)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        ref={ref}
        className="absolute -inset-[48px]"
        style={{
          willChange: 'transform',
          backgroundImage:
            'linear-gradient(to right, rgba(23,32,28,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,32,28,0.045) 1px, transparent 1px)',
          backgroundSize: '58px 58px',
          maskImage: 'radial-gradient(ellipse 75% 70% at 50% 45%, black 35%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 50% 45%, black 35%, transparent 100%)',
        }}
      />
    </div>
  );
}
