import React, { useEffect, useRef } from 'react';

// Persistent, sitewide ambient layer — very subtle green/mint blooms on the tinted-white base.
const blobs = [
  { anim: 'animate-aurora-1', size: '46vw', color: 'rgba(15,169,104,0.06)', top: '2%', left: '-4%' },
  { anim: 'animate-aurora-2', size: '42vw', color: 'rgba(15,169,104,0.05)', top: '10%', left: '55%' },
  { anim: 'animate-aurora-3', size: '38vw', color: 'rgba(239,246,241,0.6)', top: '42%', left: '8%' },
  { anim: 'animate-aurora-4', size: '40vw', color: 'rgba(15,169,104,0.04)', top: '58%', left: '48%' },
  { anim: 'animate-aurora-5', size: '36vw', color: 'rgba(134,239,172,0.06)', top: '85%', left: '20%' },
];

export default function AuroraBackground() {
  const blobRefs = useRef([]);

  useEffect(() => {
    const handleVisibility = () => {
      const playState = document.hidden ? 'paused' : 'running';
      blobRefs.current.forEach((el) => {
        if (el) el.style.animationPlayState = playState;
      });
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {blobs.map((b, i) => (
        <div
          key={i}
          ref={(el) => (blobRefs.current[i] = el)}
          className={reducedMotion ? '' : b.anim}
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            minWidth: 320,
            minHeight: 320,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${b.color} 0%, ${b.color} 42%, rgba(0,0,0,0) 78%)`,
            filter: 'blur(80px)',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
