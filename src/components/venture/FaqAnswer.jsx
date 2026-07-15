import React from 'react';
import { CheckCircle2, Mail } from 'lucide-react';

export default function FaqAnswer({ result, fallback }) {
  if (fallback) {
    return (
      <div className="rounded-2xl p-6 bg-card border border-border">
        <div className="flex items-start gap-3">
          <Mail size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            We don't have an exact answer for that yet — email us at{' '}
            <a
              href="mailto:zventure2026@gmail.com"
              className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80 transition-colors"
            >
              zventure2026@gmail.com
            </a>{' '}
            and we'll help directly.
          </p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="rounded-2xl p-6 bg-card border border-primary/25">
      <div className="flex items-start gap-3">
        <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-heading font-bold text-foreground text-base md:text-lg mb-2">
            {result.question}
          </h4>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            {result.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
