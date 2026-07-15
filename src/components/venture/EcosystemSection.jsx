import React from 'react';
import { Zap, Users, Rocket, Globe, Award, Heart, ArrowRight } from 'lucide-react';
import DotGrid from './bg/DotGrid';
import ParallaxLayer from './bg/ParallaxLayer';
import RadialParticleField from './bg/RadialParticleField';
import HowItWorksCondensed from './HowItWorksCondensed';

const pillars = [
  { icon: Zap, label: 'SharkWave', tag: 'Flagship', desc: 'Our global pitch competition. One pitch, real judges, real stakes.', detail: "Judges: Founders & investors from YC's network" },
  { icon: Heart, label: 'Mentorship', tag: 'Guided', desc: '1-on-1 with investors, operators and serial founders who have been there.', detail: 'Matched weekly · Industry veterans' },
  { icon: Rocket, label: 'Startup Resources', tag: 'Launch', desc: 'Grants, accelerator access, toolkits and a YC-backed launch pipeline.', detail: 'Funding · YC pipeline · Tools' },
  { icon: Globe, label: 'Global Network', tag: 'Scale', desc: 'A partner network spanning 90+ countries and 5,000+ students.', detail: 'Partner universities · Events · Alumni' },
  { icon: Award, label: 'Sponsors', tag: 'Partners', desc: 'YC-backed companies, angel investors and research fellowships backing our teams.', detail: 'Locus YC F25 · Craze AI · Ishan Jain & YRI' },
  { icon: Users, label: 'Community', tag: 'Together', desc: 'Builders, dreamers and doers — a living, growing ecosystem of ambition.', detail: 'Slack · Founder matching · Events' },
];

function PillarCard({ p, colSpan }) {
  const Icon = p.icon;
  return (
    <div className={`group relative overflow-hidden rounded-2xl p-7 h-full bg-card border border-border hover:border-primary/40 hover:-translate-y-1 transition-all duration-200 ${colSpan || ''}`}>
      <span className="absolute left-0 top-0 w-[3px] h-full bg-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-200" />
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/10">
          <Icon size={17} className="text-primary" />
        </div>
        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">
          {p.tag}
        </span>
      </div>

      <h3 className="font-heading font-bold text-foreground text-lg mb-2">{p.label}</h3>
      <p className="text-sm leading-relaxed mb-4 text-muted-foreground">{p.desc}</p>

      <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
        <span className="inline-block w-3 h-px bg-border" />
        {p.detail}
      </div>
    </div>
  );
}

const TALLY_URL = 'https://tally.so/r/obp11V';

export default function EcosystemSection() {
  return (
    <section id="ecosystem" className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'rgba(240,241,234,0.5)' }}>
      <ParallaxLayer speed={0.08} className="absolute inset-0">
        <DotGrid className="bottom-0 left-0 w-[380px] h-[380px]" />
      </ParallaxLayer>
      <RadialParticleField id="ecosystem-particles" desktopCount={220} mobileCount={70} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-primary">
              Everything you need
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground tracking-tight leading-[1.1]">
              The Venture Z Ecosystem
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-relaxed md:text-right text-muted-foreground">
            Six interconnected pillars — compete, learn, launch, connect, grow, and belong.
          </p>
        </div>

        <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-2"><PillarCard p={pillars[0]} /></div>
          <div className="md:col-span-1"><PillarCard p={pillars[1]} /></div>
          <div className="md:col-span-1"><PillarCard p={pillars[2]} /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1"><PillarCard p={pillars[4]} /></div>
          <div className="md:col-span-1"><PillarCard p={pillars[5]} /></div>
          <div className="md:col-span-2"><PillarCard p={pillars[3]} /></div>
        </div>
        </div>

        <HowItWorksCondensed />

        <div className="mt-8 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border">
          <div>
            <p className="font-heading font-semibold text-foreground text-sm">Ready to be part of the ecosystem?</p>
            <p className="text-xs mt-0.5 text-muted-foreground">
              Applications for SharkWave open August 2026.
            </p>
          </div>
          <button
            onClick={() => window.open(TALLY_URL, '_blank')}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold font-body whitespace-nowrap text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-200"
          >
            Apply for SharkWave Waitlist <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-150" />
          </button>
        </div>
      </div>
    </section>
  );
}
