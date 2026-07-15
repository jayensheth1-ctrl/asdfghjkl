import React from 'react';
import SoftGlow from './bg/SoftGlow';
import ParallaxLayer from './bg/ParallaxLayer';
import RadialParticleField from './bg/RadialParticleField';
import CountUp from './CountUp';
import SectionReveal from './SectionReveal';

const stats = [
  { value: '90+', label: 'Partner Countries', sub: 'Reach via partner universities & orgs' },
  { value: '5,000+', label: 'Network Students', sub: 'Across our partner network' },
  { value: '$5,000+', label: 'In Prizes', sub: 'Across prizes & scholarships — and growing' },
  { value: '2026', label: 'Founded', sub: 'Pre-launch — building now' },
];

export default function GlobeSection() {
  return (
    <section id="globe" className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'rgba(239,246,241,0.5)' }}>
      <ParallaxLayer speed={0.1} className="absolute inset-0">
        <SoftGlow className="-bottom-24 left-[8%]" size={380} />
      </ParallaxLayer>
      <RadialParticleField id="globe-particles" desktopCount={160} mobileCount={55} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-primary">
              Global Impact
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground tracking-tight">
              Why Venture Z Exists
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed md:text-right text-muted-foreground">
            Opportunity doesn't recognize borders. We're connecting ambitious student founders across every continent through an always-on ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="group p-6 md:p-7 rounded-2xl bg-card border border-border cursor-default">
              <CountUp value={stat.value} className="font-heading font-bold text-3xl md:text-4xl mb-1 text-primary block" />
              <div className="font-heading font-semibold text-foreground text-sm md:text-base mb-1.5">{stat.label}</div>
              <div className="text-xs text-muted-foreground group-hover:text-foreground group-hover:font-medium transition-all duration-150">{stat.sub}</div>
            </div>
          ))}
        </div>

        <SectionReveal>
          <div className="mt-14 text-center max-w-3xl mx-auto">
            <p className="font-heading text-xl md:text-2xl font-medium leading-relaxed text-foreground">
              "We believe the next billion-dollar company will be built by a student
              who just needed the right <span className="text-primary">network, stage, and belief.</span>"
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
