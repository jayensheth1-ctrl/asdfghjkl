import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Rocket, Heart } from 'lucide-react';
import DotGrid from './bg/DotGrid';
import ParallaxLayer from './bg/ParallaxLayer';
import SectionReveal from './SectionReveal';
import RadialParticleField from './bg/RadialParticleField';

const pillars = [
  { icon: Trophy, title: 'Competitions', description: 'Pitch competitions where bold ideas meet real judges. Compete on a global stage and prove your vision.', hover: { rotate: -10 } },
  { icon: Heart, title: 'Mentorship', description: 'Connect with industry leaders, serial entrepreneurs, and investors who guide you from idea to execution.', hover: { scale: [1, 1.2, 1] } },
  { icon: Rocket, title: 'Startup Opportunities', description: 'Access funding, accelerators, and launch resources that transform classroom projects into real ventures.', hover: { x: 3, y: -3 } },
  { icon: Users, title: 'Community', description: 'Join a global network of ambitious student founders who share your drive to build something extraordinary.', hover: { x: [0, -2, 2, 0] } },
];

function PillarCard({ pillar }) {
  const Icon = pillar.icon;
  return (
    <div className="rounded-2xl p-8 bg-card border border-border transition-all duration-200 hover:border-primary/40 hover:-translate-y-1">
      <motion.div
        whileHover={pillar.hover}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-primary/10"
      >
        <Icon size={20} className="text-primary" />
      </motion.div>
      <h3 className="font-heading font-bold text-xl text-foreground mb-3">{pillar.title}</h3>
      <p className="text-sm md:text-base leading-relaxed text-muted-foreground">{pillar.description}</p>
    </div>
  );
}

export default function PillarsSection() {
  return (
    <section id="pillars" className="relative py-20 md:py-28 bg-background/40 overflow-hidden">
      <ParallaxLayer speed={0.08} className="absolute inset-0">
        <DotGrid className="top-0 right-0 w-[420px] h-[420px]" />
      </ParallaxLayer>
      <RadialParticleField id="pillars-particles" desktopCount={150} mobileCount={50} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-primary">
            The Platform
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground tracking-tight">
            What is Venture Z?
          </h2>
        </div>

        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar) => (
              <PillarCard key={pillar.title} pillar={pillar} />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
