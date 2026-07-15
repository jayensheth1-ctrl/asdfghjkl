import React, { useEffect, useRef } from 'react';

// Small curved arc of light that trails the cursor. Rotates to follow the
// direction of movement, lerps position for a smooth "pulling" feel. Fixed,
// pointer-events-none, sits behind all page content.
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let angle = 0;
    let raf = 0;

    const onMove = (e) => {
      const dx = e.clientX - mx;
      const dy = e.clientY - my;
      if (dx * dx + dy * dy > 4) {
        angle = Math.atan2(dy, dx);
      }
      mx = e.clientX;
      my = e.clientY;
    };
    const loop = () => {
      cx += (mx - cx) * 0.14;
      cy += (my - cy) * 0.14;
      // offset the streak ~28px behind the cursor along its movement direction
      const ox = cx - Math.cos(angle) * 28;
      const oy = cy - Math.sin(angle) * 28;
      el.style.transform = `translate3d(${ox}px, ${oy}px, 0) rotate(${angle}rad)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  // A thin curved crescent: a rounded box with a heavy horizontal Gaussian
  // blur, clipped into an arc via border-radius + gradient fade on the ends.
  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0" style={{ zIndex: 0 }}>
      <div
        ref={ref}
        className="will-change-transform"
        style={{
          width: '110px',
          height: '32px',
          marginLeft: '-55px',
          marginTop: '-16px',
          // offset the arc behind the cursor along its own x axis
          // (set via transform in JS; here just the brush shape)
          borderRadius: '9999px',
          background:
            'linear-gradient(90deg, rgba(66,133,244,0) 0%, rgba(66,133,244,0.16) 20%, rgba(15,169,104,0.16) 55%, rgba(255,255,255,0.12) 80%, rgba(255,255,255,0) 100%)',
          filter: 'blur(16px)',
          // push the streak slightly behind the cursor so it trails
          transformOrigin: 'center',
        }}
      />
    </div>
  );
}
