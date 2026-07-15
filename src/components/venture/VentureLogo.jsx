import React from 'react';

// Venture Z logo — VZ monogram + wordmark, green/off-white brand mark (dark)
export default function VentureLogo({ size = 'sm', onClick }) {
  const isLg = size === 'lg';
  const iconSize = isLg ? 52 : 28;
  const textSize = isLg ? '1.9rem' : '1rem';

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 group select-none"
      style={{ background: 'none', border: 'none', padding: 0, cursor: onClick ? 'pointer' : 'default' }}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="4,8 26,42 48,8" stroke="#111827" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="24" y1="18" x2="44" y2="18" stroke="#0FA968" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="46" cy="13" r="3.5" fill="#0FA968" />
        <line x1="44" y1="18" x2="26" y2="38" stroke="#0FA968" strokeWidth="4" strokeLinecap="round" />
        <line x1="24" y1="38" x2="44" y2="38" stroke="#0FA968" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <div className="flex items-baseline gap-1.5">
        <span
          className="font-body font-bold tracking-[0.06em] leading-none uppercase"
          style={{ fontSize: textSize, color: '#111827', letterSpacing: '0.06em' }}
        >
          VENTURE
        </span>
        <span
          className="font-heading italic font-bold leading-none"
          style={{ fontSize: textSize, color: '#0FA968', letterSpacing: '0.02em' }}
        >
          Z
        </span>
      </div>
    </button>
  );
}
