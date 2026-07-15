import React from 'react';
import { ArrowRight } from 'lucide-react';

const STEPS = ['Apply', 'Pitch', 'Judge', 'Win'];

export default function FunnelSteps() {
  return (
    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm select-none">
      {STEPS.map((step, i) => (
        <React.Fragment key={step}>
          <span
            className={`font-body font-semibold tracking-wide ${
              i === 0 ? 'text-primary' : 'text-muted-foreground/80'
            }`}
          >
            {step}
          </span>
          {i < STEPS.length - 1 && (
            <ArrowRight size={13} className="text-muted-foreground/40 flex-shrink-0" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
