import React, { useEffect, useState } from 'react';

const TARGET_DATE = new Date('2026-08-01T00:00:00');

function getRemaining() {
  const diff = Math.max(0, TARGET_DATE.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes };
}

export default function CountdownBadge() {
  const [remaining, setRemaining] = useState(getRemaining());

  useEffect(() => {
    const timer = setInterval(() => setRemaining(getRemaining()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary text-primary-foreground shadow-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
      </span>
      <span className="text-sm font-semibold">
        SharkWave applications open in{' '}
        <span className="font-semibold">{remaining.days}d {remaining.hours}h {remaining.minutes}m</span>
      </span>
    </div>
  );
}
