import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Users, Zap, Calendar, DollarSign, Briefcase, ChevronDown } from 'lucide-react';
import PerksCarousel from './PerksCarousel';
import SharkWaveLogoCard from './SharkWaveLogoCard';
import SoftGlow from './bg/SoftGlow';
import ParallaxLayer from './bg/ParallaxLayer';
import RadialParticleField from './bg/RadialParticleField';
import HowItWorks from './HowItWorks';
import JudgingRubric from './JudgingRubric';

const TALLY_URL = 'https://tally.so/r/obp11V';

const highlights = [
  { icon: Trophy, text: "Judges from YC's Network", sub: "Founders and investors from Y Combinator's network — full list announced soon" },
  { icon: Users, text: 'All Student Teams', sub: 'High school & university — solo founders welcome too' },
  { icon: DollarSign, text: '$5,000+ in Prizes', sub: 'Cash, credits & more — and growing' },
  { icon: Calendar, text: 'Aug – Sep 2026 Launch', sub: 'Applications opening soon' },
  { icon: Briefcase, text: 'Guaranteed Internships', sub: 'At companies worth millions & top venture orgs' },
  { icon: Zap, text: 'Just a 1–5 Min Pitch', sub: 'Idea, passion project, MVP, startup, nonprofit or social impact project — anything goes' },
];

const sponsors = [
  {
    name: 'Locus',
    badge: 'YC F25',
    tagline: 'Autonomous AI business engine',
    perks: [
      { highlight: true, text: 'Direct Paid Commission — Growth Affiliate at a YC Company', sub: 'A real, direct paid commission-based pipeline open to ALL Venture Z participants. Earn revenue while you build your startup.' },
      { highlight: false, text: '1 Month Free — Locus Founder', sub: 'Every participant & team member gets full access to Locus Founder for 30 days.' },
      { highlight: false, text: '3 Months Free — Best Suited Team', sub: 'Judges award one winning team the complete Locus Founder platform for 3 months.' },
    ],
  },
  {
    name: 'Craze',
    badge: 'AI Research',
    tagline: 'Gen Z market intelligence',
    perks: [
      { highlight: true, text: '$1,000 in Research Credits', sub: 'Awarded to the best B2C company — validate your idea with real Gen Z consumers.' },
      { highlight: false, text: 'Verified Gen Z Feedback', sub: 'Get AI-moderated interviews with campus-verified respondents on your pitch.' },
      { highlight: false, text: 'Same-Day Insights', sub: 'Read consumer signal while your launch decision is still alive and changeable.' },
    ],
  },
  {
    name: 'Ishan Jain & YRI',
    badge: 'Angel · ISEF Finalist',
    tagline: 'Research funding & mentorship',
    perks: [
      { highlight: true, text: '$400 Cash Prize', sub: 'Direct angel investment from Ishan Jain, Founder of YRI & published researcher (10+ papers).' },
      { highlight: true, text: 'Fully Funded Research Scholarship', sub: 'One standout team member wins a $3,000 YRI Fellowship — for the best researched or proven pitch.' },
      { highlight: true, text: 'Guaranteed Growth Intern Roles', sub: 'YRI is offering guaranteed internships as Growth Interns, with program sponsorships worth $1,500+.' },
      { highlight: false, text: 'Published Scientist Pathway', sub: "Access to YRI's network to help you become a published researcher." },
    ],
  },
  {
    name: 'FinalDose',
    badge: 'YC P26',
    tagline: 'Judging partner',
    perks: [
      { highlight: true, text: 'Judging', sub: 'FinalDose will judge SharkWave pitches directly.' },
      { highlight: false, text: 'Potential internship pathway', sub: "Teams that stand out to FinalDose's judges may be offered internship roles for FinalDose's next batch, starting September." },
    ],
  },
  {
    name: 'OpenTrade',
    badge: 'YC S26',
    tagline: 'Judging partner',
    perks: [
      { highlight: true, text: 'Judging', sub: 'OpenTrade will judge SharkWave pitches directly.' },
      { highlight: false, text: 'Mini-competition tool', sub: 'OpenTrade is giving SharkWave access to their "Tinder for investing" tool, which will be used to run a mini-competition alongside the main pitch event.' },
    ],
  },
  {
    name: '996 Ventures',
    badge: 'Venture Studio',
    tagline: 'Founder network · VC access · Real opportunities',
    featured: true,
    perks: [
      { highlight: true, text: 'Guaranteed Internship Slots', sub: 'Limited-time internship positions ranging from Graphic Design and Venture Scouting to Venture Analyst roles — inside a real VC-connected studio.' },
      { highlight: true, text: 'Judges from Their Founder Network', sub: '996 Ventures founders and select VCs will personally judge top teams at SharkWave.' },
      { highlight: true, text: 'Elite Finalist Pitch Opportunity', sub: 'The best of the best finalists pitch directly to the 996 Ventures team — they personally evaluate your idea/demo and, if impressed, activate their 100+ founder & VC network to connect and set you up.' },
      { highlight: false, text: '100+ Founders & VCs on Deck', sub: 'Their combined network opens doors — warm intros, real capital conversations, and connections that are hard to reach on your own.' },
    ],
  },
];

function PerkRow({ perk }) {
  return (
    <div className="flex gap-3">
      <div className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 ${perk.highlight ? 'bg-primary' : 'bg-primary/30'}`} />
      <div>
        <div className={`text-xs font-semibold leading-snug ${perk.highlight ? 'text-foreground' : 'text-muted-foreground'}`}>{perk.text}</div>
        <div className="text-[11px] mt-0.5 leading-relaxed text-muted-foreground">{perk.sub}</div>
      </div>
    </div>
  );
}

function SponsorCard({ sponsor }) {
  const [expanded, setExpanded] = useState(false);
  const visiblePerks = sponsor.featured ? sponsor.perks : sponsor.perks.slice(0, 2);
  const restPerks = sponsor.featured ? [] : sponsor.perks.slice(2);

  return (
    <div
      className={`group rounded-2xl overflow-hidden bg-card border hover:-translate-y-1 transition-all duration-200 ${sponsor.featured ? 'md:col-span-2 border-primary/40' : 'border-border hover:border-primary/40'}`}
    >
      <div className="p-5 pb-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-2 mb-1">
          {sponsor.featured && <Briefcase size={14} className="text-primary" />}
          <span className="font-heading font-bold text-foreground text-base">{sponsor.name}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-primary/10 text-primary border border-primary/25">
            {sponsor.badge}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{sponsor.tagline}</p>
      </div>
      <div className={`p-5 ${sponsor.featured ? 'grid sm:grid-cols-2 gap-4' : 'space-y-4'}`}>
        {visiblePerks.map((perk, pi) => (
          <PerkRow key={pi} perk={perk} />
        ))}
      </div>

      {restPerks.length > 0 && (
        <>
          <motion.div
            initial={false}
            animate={{ height: expanded ? 'auto' : 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4">
              {restPerks.map((perk, pi) => (
                <PerkRow key={pi} perk={perk} />
              ))}
            </div>
          </motion.div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors duration-150"
            style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
          >
            {expanded ? 'Show less' : 'See full offer'}
            <ChevronDown size={13} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </>
      )}
    </div>
  );
}

export default function SharkWaveSection() {
  return (
    <section id="sharkwave" className="relative py-20 md:py-28 bg-background/40 overflow-hidden">
      <ParallaxLayer speed={0.1} className="absolute inset-0">
        <SoftGlow className="top-10 right-[6%]" size={360} color="rgba(15,169,104,0.08)" />
      </ParallaxLayer>
      <RadialParticleField id="sharkwave-particles" desktopCount={170} mobileCount={55} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-primary">
              Flagship Competition
            </p>
            <h2 className="font-heading font-bold text-4xl md:text-6xl text-foreground tracking-tight">
              SharkWave
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed md:text-right text-muted-foreground">
            A new pitch competition for ambitious student founders. $5,000+ in prizes and growing — launching August–September 2026.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="lg:col-span-3 flex flex-col justify-center">
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-5 leading-tight">
              Where Bold Ideas Meet <span className="text-primary">Real Capital</span>
            </h3>
            <p className="text-base leading-relaxed mb-8 text-muted-foreground">
              SharkWave comes down to one high-stakes moment: a focused 1–5 minute pitch - your idea,
              passion project, MVP, or startup or nonprofit - presented directly to a panel of YC
              founders, VCs, and angels. Judges score on problem clarity, real progress, and
              founder insight - not polish or production value. Alongside the competition, optional
              mentorship sessions connect you directly with YC founders, angel investors, and VCs
              to sharpen your pitch and your thinking before you compete. Solo founders and teams
              are equally welcome. Applications open September 2026.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <motion.div
                    key={h.text}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.3, ease: 'easeOut', delay: i * 0.06 }}
                    className="group flex items-start gap-3 rounded-xl p-4 bg-muted border border-border hover:bg-primary/10 hover:border-primary/25 transition-colors duration-150"
                  >
                    <Icon size={16} className="text-muted-foreground group-hover:text-primary flex-shrink-0 mt-0.5 transition-colors duration-150" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{h.text}</div>
                      <div className="text-xs mt-0.5 text-muted-foreground">{h.sub}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <p className="text-xs mb-6 text-muted-foreground">
              All it requires is a 1–5 minute pitch — an idea, passion project, MVP, startup, nonprofit or social impact project. Anything goes.
            </p>

            <button
              className="group flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl font-body font-semibold text-base text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-200 mx-auto lg:mx-0"
              onClick={() => window.open(TALLY_URL, '_blank')}
            >
              Apply for SharkWave Waitlist
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>

          <div className="lg:col-span-2 flex items-center justify-center">
            <SharkWaveLogoCard />
          </div>
        </div>

        <HowItWorks />
        <JudgingRubric />

        <div id="sponsors" className="scroll-mt-24">
          <div className="flex items-center gap-6 mb-10">
            <div className="h-px flex-1 bg-border" />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Competition Sponsors & Prize Partners
            </p>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2 grid md:grid-cols-3 gap-6">
              {sponsors.slice(0, 5).map((sponsor) => (
                <SponsorCard key={sponsor.name} sponsor={sponsor} />
              ))}
            </div>
            {sponsors.slice(5).map((sponsor) => (
              <SponsorCard key={sponsor.name} sponsor={sponsor} />
            ))}
          </div>

          <div className="mt-8">
            <PerksCarousel
              perks={sponsors.flatMap((s) => s.perks.map((p) => ({ ...p, sponsor: s.name })))}
            />
          </div>

          <div className="mt-8 rounded-2xl px-8 py-5 text-center bg-muted border border-border">
            <p className="text-sm text-muted-foreground">
              We are in active talks with multiple investors to judge and potentially invest in top competing teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
