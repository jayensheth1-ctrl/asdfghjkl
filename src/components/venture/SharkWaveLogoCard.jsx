import React from 'react';

const LOGO_SRC = 'https://media.base44.com/images/public/6a4c1d5604daac962012d54d/56ec1222d_image.png';

export default function SharkWaveLogoCard() {
  return (
    <div className="relative w-full aspect-square max-w-sm rounded-3xl bg-primary/10 border border-primary/25 p-7 md:p-9 flex flex-col items-center justify-center overflow-hidden">
      {/* ambient conic sweep */}
      <div
        className="absolute w-[140%] h-[140%] rounded-full animate-spin-slow pointer-events-none"
        style={{ background: 'conic-gradient(from 0deg, rgba(15,169,104,0.10), rgba(15,169,104,0.05), rgba(15,169,104,0.10))' }}
      />

      {/* logo — multiply removes the white background, blending into the green card */}
      <div className="relative z-10 flex flex-col items-center mb-6">
        <img
          src={LOGO_SRC}
          alt="SharkWave logo"
          draggable={false}
          className="w-[82%] max-w-[280px] h-auto mix-blend-multiply select-none"
        />
        <div className="text-[11px] tracking-[0.2em] uppercase mt-4 text-primary font-semibold">
          SharkWave 2026
        </div>
      </div>

      <div className="relative z-10 w-full h-px mb-5 bg-primary/25" />

      <div className="relative z-10 grid grid-cols-3 gap-5 w-full px-4 text-center">
        {[['Aug–Sep', '2026'], ['$5K+', 'Prizes']].map(([v, l]) => (
          <div key={l}>
            <div className="font-heading font-medium text-[21px] leading-tight text-foreground">{v}</div>
            <div className="text-[11px] mt-1.5 text-muted-foreground/80">{l}</div>
          </div>
        ))}
        <div>
          <div className="font-heading font-medium text-[21px] leading-tight text-foreground animate-pulse-slow">∞</div>
          <div className="text-[11px] mt-1.5 text-muted-foreground/80">Potential</div>
        </div>
      </div>
    </div>
  );
}
