import React from 'react';
import { ArrowRight } from 'lucide-react';
import InteractiveGlobe3D from './InteractiveGlobe3D';
import TypewriterWord from './TypewriterWord';
import FunnelSteps from './FunnelSteps';
import CountdownBadge from './CountdownBadge';
import CountUp from './CountUp';
import RadialParticleField from './bg/RadialParticleField';
import HeroGrid from './bg/HeroGrid';

const TALLY_URL = 'https://tally.so/r/obp11V';

export default function HeroSection() {
  const handleExplore = () => {
    const el = document.querySelector('#pillars');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(15,169,104,0.05) 0%, rgba(250,249,244,0.3) 60%)' }}
    >
      <HeroGrid />
      <RadialParticleField id="hero-particles" desktopCount={27} mobileCount={12} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 w-full pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="grid lg:grid-cols-12 gap-y-16">

          <div className="lg:col-span-8 lg:max-w-[660px] relative z-20 text-center lg:text-left">
            <div className="mb-6 flex justify-center lg:justify-start">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
                For Student Founders
              </span>
            </div>

            <h1
              className="font-heading font-medium tracking-tight leading-[1.12] mb-7 text-foreground lg:pr-4"
              style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}
            >
              Pitch your startup idea. Get funded, mentored, and{' '}
              <span style={{ color: '#0FA968' }}>
                <TypewriterWord />
              </span>
            </h1>

            <div className="flex flex-row items-stretch justify-between gap-1 sm:gap-0 mb-10 max-w-[600px] mx-auto lg:mx-0">
              {[
                { v: '90+', l: 'Countries Represented' },
                { v: '12+', l: 'YC-Backed Founders' },
                { v: '$5,000+', l: 'Funding & Prizes' },
                { v: '5,000+', l: 'Students Reached' },
              ].map((s, i) => (
                <div key={s.l} className={`flex-1 text-center px-0.5 sm:px-6 ${i !== 0 ? 'border-l border-border/70' : ''}`}>
                  <CountUp value={s.v} className="font-heading font-bold text-base sm:text-3xl md:text-4xl text-foreground block" />
                  <div className="text-[9px] sm:text-[11px] md:text-xs mt-1 text-muted-foreground tracking-wide leading-tight">{s.l}</div>
                </div>
              ))}
            </div>

            <p className="text-base md:text-lg leading-[1.7] max-w-[600px] mx-auto lg:mx-0 mb-8 text-foreground/70">
              Compete in our flagship pitchathon for over $5,000 in funding and prizes, connect with
              leading investors, and unlock internship opportunities through sponsors like YRI.
              Every application is evaluated by 12+ YC-backed founders from startups including
              Locus (YC F25) and FinalDose (YC P26), alongside venture capitalists and angel
              investors. Join ambitious student founders from more than 90 countries building the
              next generation of impactful startups.
            </p>

            <div className="flex justify-center lg:justify-start mb-7">
              <CountdownBadge />
            </div>

            <div className="flex flex-col items-center gap-5 lg:items-start">
              <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <button
                  onClick={() => window.open(TALLY_URL, '_blank')}
                  className="group flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl font-body font-semibold text-base text-primary-foreground bg-primary hover:bg-primary/90 shadow-sm transition-all duration-300 ease-out motion-safe:hover:scale-[1.02] hover:shadow-[0_10px_30px_-12px_rgba(15,169,104,0.45)]"
                >
                  Apply for SharkWave Waitlist
                  <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
                <button
                  onClick={handleExplore}
                  className="group flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-body font-semibold text-base text-primary border border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 ease-out motion-safe:hover:scale-[1.02]"
                >
                  Explore Venture Z
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </div>

              <FunnelSteps />
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end relative">
            <div className="relative lg:translate-x-8">
              <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[520px] lg:h-[520px] xl:w-[600px] xl:h-[600px] lg:-mt-4 lg:-ml-2 xl:-mr-10">
                <InteractiveGlobe3D />

                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <line x1="23" y1="77" x2="20" y2="88" stroke="rgba(15,169,104,0.5)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="3 3" />
                </svg>
                <div className="hidden md:flex absolute left-[6%] bottom-[6%] z-10 items-center gap-2 px-3.5 py-2 rounded-full bg-card border border-primary/30">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/50 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                  </span>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    <span className="font-semibold text-foreground">Live Now</span> · 90+ countries
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
