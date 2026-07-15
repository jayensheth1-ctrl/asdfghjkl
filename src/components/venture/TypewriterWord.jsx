import React, { useEffect, useState } from 'react';

const WORDS = ['hired.', 'discovered.', 'launched.', 'invested in.'];
const TYPE_MS = 65;
const DELETE_MS = 35;
const PAUSE_MS = 1700;

export default function TypewriterWord() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const current = WORDS[wordIndex];

    if (phase === 'typing') {
      if (text.length < current.length) {
        const t = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_MS);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('deleting'), PAUSE_MS);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (text.length > 0) {
        const t = setTimeout(() => setText(current.slice(0, text.length - 1)), DELETE_MS);
        return () => clearTimeout(t);
      }
      setWordIndex((i) => (i + 1) % WORDS.length);
      setPhase('typing');
    }
  }, [text, phase, wordIndex, prefersReduced]);

  const longest = WORDS.reduce((a, b) => (b.length > a.length ? b : a), '');

  if (prefersReduced) {
    return <span className="text-primary">invested in.</span>;
  }

  return (
    <span className="inline-block text-center sm:text-left align-bottom" style={{ minWidth: `min(${longest.length}ch, 60vw)` }}>
      <span className="text-primary" style={{ borderBottom: '1px solid rgba(15,169,104,0.4)' }}>
        {text}
      </span>
      <span
        className="inline-block w-[3px] -mb-0.5 ml-0.5 bg-primary animate-[typewriter-blink_1.06s_steps(1)_infinite]"
        style={{ height: '0.85em' }}
      />
    </span>
  );
}
