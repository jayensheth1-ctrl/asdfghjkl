import React from 'react';

// Soft, low-opacity radial glow blob — position via className for per-section asymmetry.
export default function SoftGlow({ className = '', size = 420, color = 'rgba(34,197,94,0.16)' }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
        filter: 'blur(10px)',
      }}
    />
  );
}
