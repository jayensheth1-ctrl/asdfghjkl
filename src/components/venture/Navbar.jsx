import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import VentureLogo from './VentureLogo';
import SharkWaveModal from './SharkWaveModal';

const TALLY_URL = 'https://tally.so/r/obp11V';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'SharkWave', href: '#sharkwave', featured: true },
  { label: 'Opportunities', href: '#ecosystem' },
  { label: 'Mentorship', href: '#pillars' },
  { label: 'Networks', href: '#globe' },
  { label: 'About', href: '#vision' },
  { label: 'Contact', href: '#footer' },
];

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function NavLink({ link, active, onClick, mobile }) {
  if (mobile) {
    return (
      <button
        onClick={onClick}
        className={`text-left py-2.5 px-3 rounded-lg text-sm tracking-wide transition-colors duration-150 ${focusRing} ${
          active ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground font-medium hover:bg-primary/10 hover:text-primary'
        }`}
      >
        {link.label}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`group relative px-0 py-2 text-sm tracking-[0.03em] transition-colors duration-150 whitespace-nowrap ${focusRing} ${
        active
          ? 'text-foreground font-medium'
          : 'text-foreground font-normal hover:text-primary'
      }`}
    >
      {link.label}
      <span
        className={`absolute left-0 right-0 -bottom-0.5 h-px bg-primary origin-left transition-transform duration-200 ease-out ${
          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = navLinks.find((l) => `#${entry.target.id}` === l.href);
            if (match) setActiveHref(match.href);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${scrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-background'}`}
      style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center gap-8 h-[72px]">
        <div className="flex-shrink-0">
          <VentureLogo onClick={() => scrollTo('#hero')} />
        </div>

        <div className="hidden xl:flex items-center gap-8 flex-shrink min-w-0">
          {navLinks.map((link) => (
            <NavLink key={link.label} link={link} active={activeHref === link.href} onClick={() => scrollTo(link.href)} />
          ))}
        </div>

        <div className="hidden xl:flex items-center gap-2 flex-shrink-0 ml-auto">
          <button
            onClick={() => setModalOpen(true)}
            className={`text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-150 whitespace-nowrap ${focusRing}`}
          >
            Join Community
          </button>
          <button
            onClick={() => window.open(TALLY_URL, '_blank')}
            className={`group flex items-center gap-1.5 px-5 py-2 text-sm font-semibold rounded-lg text-primary-foreground bg-primary hover:bg-primary/90 active:translate-y-px transition-all duration-150 whitespace-nowrap ${focusRing}`}
            style={{ boxShadow: '0 2px 0 0 rgba(0,0,0,0.35)' }}
          >
            Apply for SharkWave
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-150" />
          </button>
        </div>

        <button
          className={`xl:hidden flex flex-col gap-1.5 p-2 flex-shrink-0 rounded-lg ${focusRing}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`w-5 h-0.5 bg-foreground/80 transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-0.5 bg-foreground/80 transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-foreground/80 transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="xl:hidden px-6 pb-6 bg-background" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex flex-col gap-1 pt-4">
            {navLinks.map((link) => (
              <NavLink key={link.label} link={link} active={activeHref === link.href} onClick={() => scrollTo(link.href)} mobile />
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <button
                onClick={() => { setMobileOpen(false); window.open(TALLY_URL, '_blank'); }}
                className={`w-full py-2.5 text-sm font-semibold rounded-lg text-primary-foreground bg-primary hover:bg-primary/90 whitespace-nowrap ${focusRing}`}
                style={{ boxShadow: '0 2px 0 0 rgba(0,0,0,0.35)' }}
              >
                Apply for SharkWave
              </button>
              <button
                onClick={() => { setMobileOpen(false); setModalOpen(true); }}
                className={`w-full py-2.5 text-sm font-medium rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-150 ${focusRing}`}
              >
                Join Community
              </button>
            </div>
          </div>
        </div>
      )}
      <SharkWaveModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </nav>
  );
}
