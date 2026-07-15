import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Bell } from 'lucide-react';

export default function SharkWaveModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="pointer-events-auto w-full max-w-md"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="relative rounded-2xl p-8 bg-card border border-border shadow-2xl">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                >
                  <X size={16} />
                </button>

                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-primary/10 border border-primary/25">
                  <Calendar size={26} className="text-primary" />
                </div>

                <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
                  SharkWave is Coming
                </h3>
                <p className="font-heading font-semibold text-sm mb-4 text-primary">
                  Launching August – September 2026
                </p>
                <p className="text-sm leading-relaxed mb-6 text-muted-foreground">
                  We're putting the final touches on the world's most ambitious student pitch competition.
                  Applications will open near August – September 2026 — stay close, because spots will be limited.
                </p>

                <div className="rounded-xl p-4 mb-6 bg-muted border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell size={13} className="text-primary" />
                    <span className="text-xs font-semibold text-foreground">What to expect</span>
                  </div>
                  <ul className="text-xs space-y-1.5 text-muted-foreground">
                    <li>· Judges from dozens of YC founders, VCs, angels & AI startup founders</li>
                    <li>· $5,000+ in prizes, credits and scholarships — and growing</li>
                    <li>· Solo founders or teams — both completely welcome</li>
                    <li>· Just a 1–5 minute pitch: idea, passion project, MVP, or real startup</li>
                    <li>· The opportunity to pitch to 996 Ventures' network</li>
                    <li>· <span className="font-semibold text-foreground">Direct paid commission</span> — Growth Affiliate pipeline at Locus (YC F25)</li>
                    <li>· Applications open August – September 2026</li>
                  </ul>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl font-body font-semibold text-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-200"
                >
                  Got it — I'll be ready
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
