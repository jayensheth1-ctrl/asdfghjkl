import React from 'react';

// Extremely subtle full-page grain texture so flat dark areas don't feel sterile.
export default function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        opacity: 0.05,
        mixBlendMode: 'overlay',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
