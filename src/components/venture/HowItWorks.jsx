import React from 'react';
import { FileText, Megaphone, Users, ClipboardCheck, Trophy, ArrowDown } from 'lucide-react';

const steps = [
  { icon: FileText, title: 'Apply & Share Your Basics', desc: "Submit your application with your team info (solo or group), what stage you're at, and a short description of what you're building." },
  { icon: Megaphone, title: 'Prepare Your Pitch', desc: 'Prepare a 1–5 minute pitch and make sure you can explain it clearly within the time given.', note: 'Just a 1–5 minute pitch. Idea, passion project, MVP, startup, nonprofit or social impact project — anything goes.' },
  { icon: Users, title: 'Present to the Judges', desc: 'Deliver your pitch live to a panel of investors, founders, and operators.' },
  { icon: ClipboardCheck, title: 'Get Judged & Scored', desc: 'Judges score every pitch across six categories — each on a 1–10 scale.', rubricLink: true },
  { icon: Trophy, title: 'Advance & Win', desc: 'Top-scoring teams are selected by the judges and compete for the prize pool, mentorship, internships, credits, and more.' },
];

export default function HowItWorks() {
  const scrollToRubric = () => {
    const el = document.getElementById('judging-rubric');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="mt-4 mb-20">
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-primary">
          How It Works
        </p>
        <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground tracking-tight">
          From Application to the Stage
        </h3>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
        <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px bg-border" aria-hidden="true" />

        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-lg">
                {i + 1}
              </div>
              <div className="mt-4 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon size={18} className="text-primary" />
              </div>
              <h4 className="font-heading font-bold text-foreground mt-3 mb-1.5 text-sm md:text-base">
                {s.title}
              </h4>
              <p className="text-xs md:text-sm leading-relaxed text-muted-foreground max-w-[220px]">
                {s.desc}
              </p>

              {s.note && (
                <p className="mt-2 text-[11px] italic text-muted-foreground max-w-[220px]">
                  {s.note}
                </p>
              )}

              {s.rubricLink && (
                <button
                  onClick={scrollToRubric}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary transition-colors"
                >
                  See the full judging rubric <ArrowDown size={12} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
