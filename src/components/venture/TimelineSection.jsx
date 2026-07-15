import React, { useEffect, useRef, useState } from 'react';
import RadialParticleField from './bg/RadialParticleField';

const milestones = [
  { date: 'June 2026', title: 'Venture Z Founded', desc: 'Born from a simple belief — every ambitious student deserves a launchpad. Venture Z was founded to close the gap between talent and opportunity.' },
  { date: 'June 2026', title: 'SharkWave Created', desc: 'Our flagship pitch competition concept was developed — a stage for student founders to present to real investors and compete for real funding.' },
  { date: 'August 2026', title: 'SharkWave Launch', desc: 'The first SharkWave competition goes live. Applications open. YC-backed sponsors, angel investors, and student teams from across our network compete on a global stage.', upcoming: true },
  { date: '2027', title: 'Global Ecosystem', desc: 'Expanding our partner network into 90+ countries, building university chapters, and connecting the next generation of founders with funding and opportunities.' },
];

export default function TimelineSection() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const dotRefs = useRef([]);
  const rafRef = useRef(null);
  const reachedRef = useRef(0);
  const [reachedCount, setReachedCount] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const line = lineRef.current;

    if (reducedMotion) {
      if (line) line.style.height = '100%';
      setReachedCount(milestones.length);
      return;
    }

    const getProgress = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh * 0.5;
      const scrolled = vh * 0.75 - rect.top;
      return Math.min(Math.max(scrolled / Math.max(total, 1), 0), 1);
    };

    const loop = () => {
      const progress = getProgress();
      if (line) line.style.height = `${progress * 100}%`;

      const lineBottom = line.getBoundingClientRect().bottom;
      let newReached = 0;
      dotRefs.current.forEach((dotEl) => {
        if (dotEl && dotEl.getBoundingClientRect().top <= lineBottom) newReached += 1;
      });

      if (newReached !== reachedRef.current) {
        reachedRef.current = newReached;
        setReachedCount(newReached);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !rafRef.current) {
          rafRef.current = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      },
      { threshold: 0 }
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id="vision" ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'rgba(239,246,241,0.5)' }}>
      <RadialParticleField id="story-particles" desktopCount={130} mobileCount={45} />
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-primary">
            Our Journey
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground tracking-tight">
            The Venture Z Story
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-[7px] top-1 bottom-1 w-px" style={{ background: 'rgba(0,0,0,0.08)' }} />
          <div
            ref={lineRef}
            className="absolute left-[7px] top-1 w-px bg-primary"
            style={{ height: 0 }}
          />

          {milestones.map((m, i) => {
            const reached = i < reachedCount;
            return (
              <div key={i} className="relative flex gap-8 mb-10 last:mb-0">
                <div className="relative flex-shrink-0 pt-1.5" style={{ width: 16 }}>
                  <div
                    ref={(el) => (dotRefs.current[i] = el)}
                    className="w-3.5 h-3.5 rounded-full transition-colors duration-300"
                    style={{
                      background: reached ? '#0FA968' : '#FFFFFF',
                      border: reached ? '2px solid #FAF9F4' : '2px solid rgba(15,169,104,0.3)',
                      boxShadow: reached ? '0 0 0 2px rgba(15,169,104,0.3)' : '0 0 0 2px rgba(0,0,0,0.05)',
                    }}
                  />
                </div>

                <div
                  className="flex-1 pb-2 transition-all duration-500 ease-out"
                  style={{
                    opacity: reached ? 1 : 0.45,
                    transform: reached ? 'translateY(0)' : 'translateY(6px)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <span className="text-xs font-semibold tracking-wider text-primary">{m.date}</span>
                    {m.upcoming && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium bg-primary/10 text-primary border border-primary/25 ${
                          reached ? 'animate-pulse-slow' : ''
                        }`}
                      >
                        UPCOMING
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-lg md:text-xl text-foreground mb-2">{m.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
