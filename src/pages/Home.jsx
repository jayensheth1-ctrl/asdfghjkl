import React from 'react';
import Navbar from '@/components/venture/Navbar';
import HeroSection from '@/components/venture/HeroSection';
import PillarsSection from '@/components/venture/PillarsSection';
import GlobeSection from '@/components/venture/GlobeSection';
import EcosystemSection from '@/components/venture/EcosystemSection';
import SharkWaveSection from '@/components/venture/SharkWaveSection';
import TimelineSection from '@/components/venture/TimelineSection';
import CTASection from '@/components/venture/CTASection';
import Footer from '@/components/venture/Footer';
import FaqSection from '@/components/venture/FaqSection';
import FoundingTeamSection from '@/components/venture/FoundingTeamSection';
import SectionReveal from '@/components/venture/SectionReveal';
import GrainOverlay from '@/components/venture/bg/GrainOverlay';
import AuroraBackground from '@/components/venture/bg/AuroraBackground';
import SectionDivider from '@/components/venture/bg/SectionDivider';
import CursorGlow from '@/components/venture/CursorGlow';

// Surface tones used for the section background rhythm — semi-transparent so the
// ambient aurora layer stays visible through every section.
const SURFACE = {
  white: 'rgba(18,24,21,0.35)',
  greenTint: 'rgba(15,40,28,0.35)',
  grayWash: 'rgba(13,18,16,0.35)',
  greenDeep: 'rgba(12,36,24,0.4)',
};

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <GrainOverlay />
      <CursorGlow />
      <div className="relative z-10">
      <Navbar />

      <HeroSection />

      <SectionReveal>
        <PillarsSection />
      </SectionReveal>

      <SectionDivider color={SURFACE.greenTint} />

      <SectionReveal>
        <GlobeSection />
      </SectionReveal>

      <SectionDivider color={SURFACE.grayWash} flip />

      <SectionReveal>
        <EcosystemSection />
      </SectionReveal>

      <SectionDivider color={SURFACE.white} />

      <SectionReveal>
        <SharkWaveSection />
      </SectionReveal>

      <SectionDivider color={SURFACE.grayWash} />

      <SectionReveal>
        <FaqSection />
      </SectionReveal>

      <SectionDivider color={SURFACE.greenTint} flip />

      <SectionReveal>
        <FoundingTeamSection />
      </SectionReveal>

      <SectionDivider color={SURFACE.grayWash} />

      <SectionReveal>
        <TimelineSection />
      </SectionReveal>

      <SectionDivider color={SURFACE.greenDeep} />

      <SectionReveal>
        <CTASection />
      </SectionReveal>

      <Footer />
      </div>
    </div>
  );
}
