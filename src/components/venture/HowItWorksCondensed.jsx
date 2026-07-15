import React from 'react';
import { FileText, Megaphone, ClipboardCheck, ArrowRight } from 'lucide-react';

const steps = [
  { icon: FileText, title: 'Apply', desc: "Submit your team info and what you're building." },
  { icon: Megaphone, title: 'Pitch', desc: 'Deliver a 1–5 minute pitch to the judges.' },
  { icon: ClipboardCheck, title: 'Get Judged', desc: 'Scored 1–10 across six categories.' },
];

export default function HowItWorksCondensed() {
  const goToFull = () => {
    const el = document.getElementById('judging-rubric');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="mt-10 rounded-2xl bg-card border border-border p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="md:w-44 flex-shrink-0">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-1 text-primary">How to enter</p>
          <h3 className="font-heading font-bold text-foreground text-lg">Three steps to the stage</h3>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-primary" />
                    <span className="font-heading font-bold text-foreground text-sm">{s.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={goToFull}
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-primary bg-primary/10 border border-primary/25 hover:bg-primary/20 transition-colors"
        >
          Full breakdown &amp; rubric <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
