import React from 'react';

// Faint dot-grid texture — position/size via className, kept extremely low opacity.
export default function DotGrid({ className = '' }) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(22,163,74,0.35) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
        opacity: 0.12,
        maskImage: 'radial-gradient(ellipse 60% 60% at center, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at center, black 40%, transparent 100%)',
      }}
    />
  );
}
