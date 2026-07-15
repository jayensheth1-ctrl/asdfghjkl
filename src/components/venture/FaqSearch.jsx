import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { Search, X } from 'lucide-react';
import { faqData } from '@/data/faqData';
import FaqAnswer from './FaqAnswer';

// Lower score = better match. Anything above this threshold is treated as "no good match".
const SCORE_THRESHOLD = 0.5;
const GOOGLE_G = 'https://media.base44.com/images/public/6a4c1d5604daac962012d54d/259a9d7da_image.png';

function normalize(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function mergeIndices(indices) {
  if (!indices || !indices.length) return [];
  const sorted = [...indices].sort((a, b) => a[0] - b[0]);
  const merged = [sorted[0].slice()];
  for (const [s, e] of sorted.slice(1)) {
    const last = merged[merged.length - 1];
    if (s <= last[1] + 1) last[1] = Math.max(last[1], e);
    else merged.push([s, e]);
  }
  return merged;
}

function Highlight({ text, indices }) {
  const merged = mergeIndices(indices);
  if (!merged.length) return <>{text}</>;
  const nodes = [];
  let prev = 0;
  merged.forEach(([s, e], i) => {
    if (s > prev) nodes.push(text.slice(prev, s));
    nodes.push(
      <mark key={i} className="bg-primary/15 text-foreground font-semibold rounded-sm px-0.5">
        {text.slice(s, e + 1)}
      </mark>
    );
    prev = e + 1;
  });
  if (prev < text.length) nodes.push(text.slice(prev));
  return <>{nodes}</>;
}

export default function FaqSearch({ examples = [] }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [fallback, setFallback] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const fuse = useMemo(
    () =>
      new Fuse(faqData, {
        keys: [
          { name: 'question', weight: 0.7 },
          { name: 'answer', weight: 0.3 },
        ],
        threshold: SCORE_THRESHOLD,
        ignoreLocation: true,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
      }),
    []
  );

  const runSearch = (raw) => {
    const norm = normalize(raw);
    if (norm.length < 2) return [];
    return fuse.search(norm).slice(0, 6);
  };

  useEffect(() => {
    function onDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setFallback(false);
    const results = runSearch(val);
    setSuggestions(results);
    setActiveIndex(-1);
    setOpen(results.length > 0);
  };

  const pick = (item) => {
    setSelected(item);
    setQuery(item.question);
    setSuggestions([]);
    setActiveIndex(-1);
    setOpen(false);
    setFallback(false);
  };

  const submitQuery = (raw) => {
    const results = runSearch(raw);
    if (results.length > 0) {
      setSelected(results[0].item);
      setFallback(false);
    } else {
      setSelected(null);
      setFallback(true);
    }
    setSuggestions([]);
    setOpen(false);
    setActiveIndex(-1);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      pick(suggestions[activeIndex].item);
    } else {
      submitQuery(query);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!suggestions.length) return;
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
      setOpen(true);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const clear = () => {
    setQuery('');
    setSuggestions([]);
    setSelected(null);
    setFallback(false);
    setActiveIndex(-1);
    setOpen(false);
  };

  const qMatch = (s) => (s.matches ? s.matches.find((m) => m.key === 'question') : null);

  return (
    <div ref={containerRef} className="relative w-full max-w-[680px] mx-auto">
      <form onSubmit={onSubmit}>
        <div
          className="group flex items-center w-full h-14 pl-3 pr-4 rounded-full bg-card border border-[#dfe1e5] shadow-[0_1px_6px_rgba(32,33,36,0.12)] transition-all duration-200 hover:border-transparent hover:shadow-[0_4px_12px_rgba(32,33,36,0.18)] focus-within:border-transparent focus-within:shadow-[0_4px_12px_rgba(32,33,36,0.18)] focus-within:ring-2 focus-within:ring-[#4285f4]/30"
        >
          <img
            src={GOOGLE_G}
            alt=""
            aria-hidden="true"
            className="w-[26px] h-[26px] flex-shrink-0 select-none object-contain"
          />
          <input
            value={query}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            placeholder="Search our FAQ..."
            autoComplete="off"
            aria-label="Search frequently asked questions"
            className="flex-1 ml-4 bg-transparent outline-none text-[16px] font-medium text-foreground placeholder:text-[#80868b] placeholder:font-normal"
          />
          {query && (
            <button
              type="button"
              onClick={clear}
              aria-label="Clear search"
              className="ml-1 p-2 text-[#9aa0a6] hover:text-foreground transition-colors duration-150"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 right-0 mt-2 rounded-3xl bg-card border border-[#dfe1e5] shadow-[0_6px_20px_rgba(32,33,36,0.18)] overflow-hidden z-30"
          >
            <ul className="max-h-[340px] overflow-y-auto py-2">
              {suggestions.map((s, i) => {
                const match = qMatch(s);
                const isActive = i === activeIndex;
                return (
                  <li key={s.item.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => pick(s.item)}
                      className={`w-full text-left px-5 py-3 text-[15px] font-body text-foreground transition-colors duration-150 flex items-start gap-3 ${
                        isActive ? 'bg-[#f5f5f5]' : 'hover:bg-[#f5f5f5]'
                      }`}
                    >
                      <Search className="w-4 h-4 mt-0.5 text-[#9aa0a6] flex-shrink-0" />
                      <span className="leading-snug">
                        <Highlight text={s.item.question} indices={match ? match.indices : []} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {examples.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2 items-center justify-center">
          <span className="text-xs text-muted-foreground mr-1">Try:</span>
          {examples.map((ex) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => pick(ex)}
              className="px-3 py-2 sm:py-1.5 rounded-full text-xs font-medium text-foreground bg-muted border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-150"
            >
              {ex.question}
            </button>
          ))}
        </div>
      )}

      <div className="mt-7">
        {(selected || fallback) && <FaqAnswer result={selected} fallback={fallback} />}
      </div>
    </div>
  );
}
