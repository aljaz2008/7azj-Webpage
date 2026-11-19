'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CALLSIGN } from '@/lib/station';

const links = [
  { label: 'About', target: 'about' },
  { label: 'School', target: 'school' },
  { label: 'Contests', target: 'contests' },
  { label: 'Station', target: 'setup' },
  { label: 'Projects', target: 'projects' }
];

export default function Navbar() {
  const [active, setActive] = useState<string>('hero');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Highlight the section currently in the middle of the viewport
    const sections = ['hero', ...links.map((l) => l.target), 'contact']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-border bg-background/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="px-6 md:px-10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-2.5 font-heading text-lg font-bold tracking-wide text-primary"
          onClick={() => setOpen(false)}
        >
          <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
          {CALLSIGN}
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              aria-current={active === link.target ? 'true' : undefined}
              className={`relative text-sm transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-accent after:transition-all ${
                active === link.target
                  ? 'text-primary after:w-full'
                  : 'text-secondary after:w-0 hover:text-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-accent/60 px-4 py-1.5 text-sm text-accent transition hover:bg-accent hover:text-background"
          >
            Contact
          </a>
        </nav>

        <button
          type="button"
          className="-mr-1.5 p-1.5 text-secondary md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border px-6 pb-6 pt-2 md:hidden">
          {[...links, { label: 'Contact', target: 'contact' }].map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={() => setOpen(false)}
              className={`block border-b border-border py-3.5 font-heading text-xl ${
                active === link.target ? 'text-accent' : 'text-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
