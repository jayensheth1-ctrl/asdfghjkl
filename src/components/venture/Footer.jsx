import React, { useState } from 'react';
import VentureLogo from './VentureLogo';
import LegalModal from './LegalModal';
import { TERMS_OF_SERVICE, PRIVACY_POLICY } from '@/data/legalContent';

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { label: 'SharkWave', href: '#sharkwave' },
      { label: 'Opportunities', href: '#ecosystem' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#vision' },
      { label: 'Sponsors', href: '#sponsors' },
    ],
  },
];

const legalLinks = [
  { label: 'Terms of Service', key: 'terms' },
  { label: 'Privacy Policy', key: 'privacy' },
];

export default function Footer() {
  const [modal, setModal] = useState(null);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="pt-16 pb-8 bg-background/60 relative">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(15,169,104,0.4), transparent)' }} />
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2">
            <div className="mb-5">
              <VentureLogo onClick={() => scrollTo('#hero')} />
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-4 text-muted-foreground">
              Empowering the next generation of student founders with competitions and a
              global ecosystem built for builders.
            </p>
            <a href="mailto:zventure2026@gmail.com" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-150">
              zventure2026@gmail.com
            </a>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 text-muted-foreground">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="group relative text-sm font-medium tracking-[0.01em] text-muted-foreground hover:text-primary transition-colors duration-150 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                    >
                      {link.label}
                      <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200 ease-out" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 text-muted-foreground">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => setModal(link.key)}
                    className="group relative text-sm font-medium tracking-[0.01em] text-muted-foreground hover:text-primary transition-colors duration-150 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                  >
                    {link.label}
                    <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-200 ease-out" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Venture Z. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Building the future, one founder at a time.
          </p>
        </div>
      </div>

      {modal && (
        <LegalModal
          title={modal === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
          content={modal === 'terms' ? TERMS_OF_SERVICE : PRIVACY_POLICY}
          onClose={() => setModal(null)}
        />
      )}
    </footer>
  );
}
