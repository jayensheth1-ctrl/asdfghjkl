import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, BarChart3, Wrench, Users, Mic, Globe, ChevronDown } from 'lucide-react';

const categories = [
  {
    icon: Lightbulb,
    name: 'Problem & Idea',
    desc: 'Is there a real problem, and does the idea address it clearly? This applies the same way to a first-day idea and a running startup — what matters is clarity of thinking, not how far along it is.',
    tip: "Don't just say what your idea is — say what problem it solves and why that matters, in one or two sentences before describing the solution. This works the same whether you're pitching a concept or a company.",
    tiers: [
      { range: '1–4', label: 'Needs work', desc: 'No clear problem identified, or a vague/generic problem not clearly connected to the idea.' },
      { range: '5–6', label: 'Solid', desc: "A real, specific problem is identified and addressed, though the \"why now\" isn't fully developed." },
      { range: '7–8', label: 'Strong', desc: 'The problem is specific and credible, and the idea is a well-reasoned response to it.' },
      { range: '9–10', label: 'Exceptional', desc: 'Sharply defined, non-obvious problem solved in a genuinely fresh way.' },
    ],
  },
  {
    icon: BarChart3,
    name: 'Market & Opportunity',
    desc: 'How well does the contestant understand who this is for and why it matters to them? Evidence can come from research, direct conversations, or firsthand lived experience with the problem — not just formal data or paying customers.',
    tip: "If you've talked to even 5 people who deal with this problem, or you've lived it yourself, say so clearly — real, specific insight outweighs a big but vague market claim, no matter how you got it.",
    tiers: [
      { range: '1–4', label: 'Needs work', desc: "No sense of who this is for or why they'd want it." },
      { range: '5–6', label: 'Solid', desc: 'A clear target audience is described, with at least a basic sense of why they need this.' },
      { range: '7–8', label: 'Strong', desc: 'Real understanding of the audience — grounded in research, direct conversations, or genuine firsthand insight into the problem.' },
      { range: '9–10', label: 'Exceptional', desc: 'Sharp, specific insight into the audience that goes beyond assumption — whichever way that insight was gathered.' },
    ],
  },
  {
    icon: Wrench,
    name: 'Feasibility & Depth of Work',
    desc: "How much real thought, testing, or work has gone into this — evaluated fairly whether it's an idea, a passion project, an MVP, or a running startup. This category rewards depth and rigor appropriate to the format, not the format itself.",
    tip: "You don't need revenue or users to score well here — you need to show real thinking and effort behind your specific format. Both an unusually well-researched idea and a startup with strong traction can score a perfect 10.",
    tiers: [
      { range: '1–4', label: 'Needs work', desc: 'Little to no thought given to how this would actually work in practice — no research, testing, reasoning, or effort shown, regardless of format.' },
      { range: '5–6', label: 'Solid', desc: "Some real thinking or work behind it — whether that's early conversations, a rough prototype, a thoughtful plan, or initial traction, appropriate to the format chosen." },
      { range: '7–8', label: 'Strong', desc: 'Clear, well-validated depth of work for the format — a passion project with real testing and iteration, an idea backed by strong research and validation, or a startup with real traction — all scored the same way.' },
      { range: '9–10', label: 'Exceptional', desc: 'Exceptional depth and rigor for the format chosen — the contestant has pushed further than expected at their stage. A 9–10 idea and a 9–10 startup should be equally achievable.' },
    ],
  },
  {
    icon: Users,
    name: 'Team',
    desc: 'Does the team (or solo founder) have the ability and commitment to execute this? Scored on genuine fit and credibility — not resume length, professional titles, or years of experience.',
    tip: "Solo founders are fully welcome, and formal credentials aren't required — explain clearly why you (or your team) genuinely understand and care about this problem.",
    tiers: [
      { range: '1–4', label: 'Needs work', desc: "No information given about who's involved or why they're suited to this." },
      { range: '5–6', label: 'Solid', desc: 'Clear, relevant reason why this team/founder is positioned to build this — including personal connection to the problem, not just professional background.' },
      { range: '7–8', label: 'Strong', desc: "Demonstrated relevant skills, experience, or lived understanding of the problem, directly applicable to executing this idea." },
      { range: '9–10', label: 'Exceptional', desc: 'Unusually strong founder-problem fit — whatever form that takes, whether professional expertise, deep personal experience with the problem, or both.' },
    ],
  },
  {
    icon: Mic,
    name: 'Pitch Clarity & Delivery',
    desc: 'Was the pitch clear, well-structured, and effectively delivered within the time limit? This is about communication, not production value — a simple, clear pitch scores the same as a polished one if the structure and delivery are equally strong.',
    tip: "Structure beats polish every time. A clear problem → solution → why-it-matters flow, delivered simply, consistently scores higher than a stylistically impressive pitch that's hard to follow — you don't need fancy slides or a rehearsed delivery style to score well here.",
    tiers: [
      { range: '1–4', label: 'Needs work', desc: 'Disorganized or unclear, or significantly over/under the time limit.' },
      { range: '5–6', label: 'Solid', desc: 'Clear structure (problem → solution → why it matters), understandable, delivered on time.' },
      { range: '7–8', label: 'Strong', desc: 'Confident, well-paced delivery with a clear narrative arc and a memorable takeaway.' },
      { range: '9–10', label: 'Exceptional', desc: 'Exceptionally clear and compelling — a judge could repeat it back accurately.' },
    ],
  },
  {
    icon: Globe,
    name: 'Potential Impact',
    desc: "If this succeeds, how meaningful is the outcome — relative to what it's actually trying to do? A project with a modest, well-defined scope that clearly delivers on its own goal scores just as well as an ambitious idea aiming at massive scale.",
    tip: "Be specific about the outcome, and match your ambition to your actual goal — \"this could help 200 students at my school do X\" can score just as well as a claim of massive scale, if it's specific and genuinely meaningful for that audience.",
    tiers: [
      { range: '1–4', label: 'Needs work', desc: 'Success would have minimal or unclear benefit to anyone.' },
      { range: '5–6', label: 'Solid', desc: "A clear, meaningful benefit to a defined group, appropriate to the project's own goals." },
      { range: '7–8', label: 'Strong', desc: 'A genuinely meaningful outcome for its intended audience or purpose, clearly articulated.' },
      { range: '9–10', label: 'Exceptional', desc: "An outcome that would be genuinely significant relative to what the project set out to do — whether that's meaningfully helping a small, specific community or reaching a very large scale." },
    ],
  },
];

function RubricCard({ category }) {
  const [open, setOpen] = useState(false);
  const Icon = category.icon;
  return (
    <div className="rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon size={18} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-heading font-bold text-foreground text-sm md:text-base">{category.name}</div>
          <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{category.desc}</div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
          <span className="text-[10px] font-medium text-muted-foreground">1</span>
          <div className="w-14 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-full rounded-full" style={{ background: '#0FA968' }} />
          </div>
          <span className="text-[10px] font-medium text-muted-foreground">10</span>
        </div>
        <ChevronDown size={16} className={`flex-shrink-0 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5">
          <div className="space-y-0 border-t border-border">
            {category.tiers.map((t) => (
              <div key={t.range} className="flex gap-3 items-start py-2.5 border-b border-border last:border-b-0">
                <span className="text-[11px] font-bold text-primary w-10 flex-shrink-0 pt-px">{t.range}</span>
                <div>
                  <span className="text-xs font-semibold text-foreground">{t.label}.</span>{' '}
                  <span className="text-xs text-muted-foreground">{t.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-primary/10 border border-primary/25 p-3">
            <div className="text-[11px] font-semibold text-primary mb-1 tracking-wide">TIP FOR CONTESTANTS</div>
            <div className="text-xs text-muted-foreground leading-relaxed">{category.tip}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function JudgingRubric() {
  return (
    <div id="judging-rubric" className="mb-20 scroll-mt-24">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-primary">
          How You&apos;re Scored
        </p>
        <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground tracking-tight mb-3">
          The Judging Rubric
        </h3>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Every pitch is scored 1–10 across six categories. Here&apos;s exactly what judges are looking for — and how to prepare for each one.
        </p>
      </div>

      <div className="grid gap-4">
        {categories.map((c) => (
          <RubricCard key={c.name} category={c} />
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-primary/10 border border-primary/25 p-5">
        <p className="text-xs font-semibold tracking-wide text-primary mb-2">NOTES FOR JUDGES</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Score fairly across formats and scope. An idea, a passion project, an MVP, a running startup, or a nonprofit or social impact project should all be able to reach a perfect score in every category if they demonstrate genuine depth, clarity, and thoughtfulness for their own format and goals. Do not default to rewarding &quot;further along,&quot; &quot;bigger,&quot; or &quot;more professional-sounding&quot; as inherently better — score what&apos;s actually in front of you.
        </p>
      </div>
    </div>
  );
}
