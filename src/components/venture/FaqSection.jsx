import React from 'react';
import FaqSearch from './FaqSearch';
import { faqData } from '@/data/faqData';

const EXAMPLE_IDS = [5, 48, 11]; // fee, ownership, solo

export default function FaqSection() {
  const examples = EXAMPLE_IDS.map((id) => faqData.find((q) => q.id === id)).filter(Boolean);

  return (
    <section id="faq" className="relative py-20 md:py-28 bg-background/40">
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8">
        <div className="text-center mb-10">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-foreground tracking-tight mb-4">
            Ask Anything
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Type your question below — we'll instantly match it to an answer from our FAQ.
          </p>
        </div>
        <FaqSearch examples={examples} />
      </div>
    </section>
  );
}
