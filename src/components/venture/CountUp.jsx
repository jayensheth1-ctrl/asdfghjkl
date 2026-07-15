import React, { useEffect, useRef, useState } from 'react';

export default function CountUp({ value, duration = 1300, className = '', style }) {
  const ref = useRef(null);
  const startedRef = useRef(false);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const match = value.match(/[\d,]+/);
    if (!match || reducedMotion) {
      setDisplay(value);
      return;
    }

    const numeric = parseInt(match[0].replace(/,/g, ''), 10);
    const prefix = value.slice(0, match.index);
    const suffix = value.slice(match.index + match[0].length);
    setDisplay(prefix + '0' + suffix);

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const animate = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const current = Math.floor(eased * numeric);
            if (t < 1) {
              setDisplay(prefix + current.toLocaleString() + suffix);
              requestAnimationFrame(animate);
            } else {
              setDisplay(value);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
