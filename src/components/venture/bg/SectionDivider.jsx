import React from 'react';

// Soft curved divider that blends into the next section's background tone,
// replacing a hard flat-line seam between color changes.
export default function SectionDivider({ color = '#FFFFFF', flip = false }) {
  return (
    <div className="relative h-10 md:h-14 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute left-0 w-full h-full"
        style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
      >
        <path
          d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
