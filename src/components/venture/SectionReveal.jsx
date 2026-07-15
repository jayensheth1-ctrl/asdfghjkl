import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Simple, natural fade-in as a section enters the viewport.
 * No parallax, no blur, no scroll-jacking — just a subtle entrance.
 */
export default function SectionReveal({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
