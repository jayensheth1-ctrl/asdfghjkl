import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import DotGrid from './bg/DotGrid';
import ParallaxLayer from './bg/ParallaxLayer';

const founders = [
  {
    name: 'Tejas J.',
    role: 'Founder & CEO',
    badges: ['Founder & CEO • EconFlow', 'Head of Partnerships • YRI'],
    bio: "Tejas founded Venture Z with the vision of creating a global startup ecosystem where ambitious student founders can access mentorship, funding, internships, and opportunities regardless of where they come from. As Founder & CEO, he leads the organization's strategy, partnerships, long-term vision, and overall growth, building relationships with founders, investors, sponsors, universities, and startup organizations around the world. Outside of Venture Z, he is the Founder & CEO of EconFlow, a gamified financial literacy organization, and serves as Head of Partnerships at YRI, where he develops collaborations across entrepreneurship, education, and research.",
    photo: 'https://media.base44.com/images/public/6a4c1d5604daac962012d54d/9ed291df7_1000012442.png',
    linkedin: '',
  },
  {
    name: 'Mukund N.',
    role: 'Co-Founder & Head of Growth',
    badges: ['Head of Research • CAIVO', 'TSA National Qualifier'],
    bio: "Mukund leads Venture Z's growth, marketing, outreach, and community expansion. He develops strategies to grow Venture Z's global reach, strengthen its brand, and build an engaged network of ambitious student founders across the world. Outside of Venture Z, he serves as Head of Research at CAIVO, an AI-focused organization, and is both a TSA National Qualifier and competitive chess player. His background in research, strategy, and analytical thinking helps drive Venture Z's long-term growth.",
    photo: 'https://media.base44.com/images/public/6a4c1d5604daac962012d54d/509480ddf_1000012440.jpg',
    linkedin: '',
  },
  {
    name: 'Jayen S.',
    role: 'Founding Head of Technology',
    badges: ['Co-Founder & CTO • EconFlow'],
    bio: "Jayen leads all technology and product development at Venture Z. He is responsible for designing, building, and maintaining the platform while creating a seamless experience for student founders as the organization continues to scale. Outside of Venture Z, he serves as Co-Founder & CTO of EconFlow, where he leads engineering and product development. His experience building scalable technology helps power Venture Z's growing global ecosystem.",
    photo: 'https://media.base44.com/images/public/6a4c1d5604daac962012d54d/07122bb9a_1000012439.png',
    linkedin: '',
  },
];

function FounderCard({ founder, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.08 }}
      className="group flex flex-col items-center text-center rounded-2xl bg-card border border-border p-7 md:p-8 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200"
    >
      <img
        src={founder.photo}
        alt={founder.name}
        className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border border-border shadow-sm"
      />
      <h3 className="mt-5 font-heading font-bold text-foreground text-lg md:text-xl">{founder.name}</h3>
      <p className="mt-1 text-base md:text-lg font-semibold text-primary">{founder.role}</p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
        {founder.badges.map((b) => (
          <span
            key={b}
            className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border"
          >
            {b}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{founder.bio}</p>
      {founder.linkedin && (
        <a
          href={founder.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 text-muted-foreground hover:text-primary transition-colors"
          aria-label={`${founder.name} on LinkedIn`}
        >
          <Linkedin size={17} />
        </a>
      )}
    </motion.div>
  );
}

export default function FoundingTeamSection() {
  return (
    <section id="founding-team" className="relative py-20 md:py-28 overflow-hidden">
      <ParallaxLayer speed={0.08} className="absolute inset-0">
        <DotGrid className="bottom-0 right-0 w-[420px] h-[420px]" />
      </ParallaxLayer>
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-primary">Leadership</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground tracking-tight">
            Founding Team
          </h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed text-muted-foreground">
            {"Venture Z is led by student founders actively building companies, leading initiatives, and creating opportunities across entrepreneurship, technology, finance, and artificial intelligence. Together, we're building a global ecosystem that gives the next generation of founders access to mentorship, funding, and the network they need to turn ambitious ideas into reality."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {founders.map((f, i) => (
            <FounderCard key={f.name} founder={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
