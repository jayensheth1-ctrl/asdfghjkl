import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function PerksCarousel({ perks }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % perks.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [perks.length]);

  const perk = perks[index];

  return (
    <div className="relative rounded-2xl px-6 py-8 md:px-10 md:py-10 bg-card border border-border">
      <div className="relative min-h-[92px] flex items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="max-w-xl"
          >
            <div className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-2 text-primary">
              {perk.sponsor}
            </div>
            <div className="font-heading font-bold text-foreground text-base md:text-lg mb-1.5">{perk.text}</div>
            <div className="text-xs md:text-sm leading-relaxed text-muted-foreground">{perk.sub}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative flex items-center justify-center gap-2 mt-8">
        {perks.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to perk ${i + 1}`}
            className="rounded-full transition-all duration-[250ms] ease-out hover:scale-125 hover:opacity-80"
            style={{
              width: i === index ? 20 : 6,
              height: 6,
              background: i === index ? '#22D67F' : 'rgba(34,214,127,0.2)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
