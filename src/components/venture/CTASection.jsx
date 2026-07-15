import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import SharkWaveModal from './SharkWaveModal';
import SoftGlow from './bg/SoftGlow';
import ParallaxLayer from './bg/ParallaxLayer';
import RadialParticleField from './bg/RadialParticleField';

const TALLY_URL = 'https://tally.so/r/obp11V';

export default function CTASection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'rgba(239,246,241,0.5)' }}>
      <ParallaxLayer speed={0.1} className="absolute inset-0">
        <SoftGlow className="-top-16 left-[30%]" size={440} color="rgba(15,169,104,0.10)" />
      </ParallaxLayer>
      <RadialParticleField id="cta-particles" desktopCount={180} mobileCount={60} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-primary">
          Your Future Starts Here
        </p>

        <h2 className="font-heading font-bold tracking-tight text-foreground mb-6" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.15 }}>
          Ready to Build What's Next?
        </h2>

        <p className="text-base md:text-lg max-w-xl mx-auto mb-10 text-muted-foreground">
          Join thousands of student founders who are turning bold ideas into real companies.
        </p>

        <div className="relative inline-block">
          <div className="absolute -inset-8 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(15,169,104,0.10) 0%, rgba(15,169,104,0) 70%)' }} />
          <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
            <button
              onClick={() => window.open(TALLY_URL, '_blank')}
              className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-body font-semibold text-base text-primary-foreground bg-primary hover:bg-primary/90 active:translate-y-px transition-all duration-150"
              style={{ boxShadow: '0 2px 0 0 rgba(0,0,0,0.35)' }}
            >
              Apply for SharkWave Waitlist
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-150" />
            </button>

            <button
              onClick={() => setModalOpen(true)}
              className="group flex items-center gap-1.5 font-body font-semibold text-base text-muted-foreground hover:text-primary transition-colors duration-150"
            >
              Join Community
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-150" />
            </button>
          </div>
        </div>
      </div>

      <SharkWaveModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
