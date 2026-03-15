'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const links = [
  { label: 'ABOUT', target: 'about' },
  { label: 'SCHOOL', target: 'school' },
  { label: 'CONTESTS', target: 'contests' },
  { label: 'SETUP', target: 'setup' },
  { label: 'PROJECTS', target: 'projects' },
  { label: 'CONTACT', target: 'contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed left-1/2 top-3 z-50 w-[min(1100px,94vw)] -translate-x-1/2 rounded-full border border-border/90 bg-card/70 px-4 py-3 backdrop-blur-xl md:top-5 md:px-6 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <a href="#hero" className="font-heading text-xs font-semibold tracking-[0.22em] text-primary md:text-sm md:tracking-[0.25em]">
            S57AZJ
          </a>

          <nav className="hidden items-center gap-5 md:flex">
            {links.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                className="text-xs tracking-[0.2em] text-secondary transition hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="rounded border border-border px-3 py-1 text-[11px] tracking-[0.2em] text-secondary md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            MENU
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/75 p-4 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.nav
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              className="mx-auto mt-16 w-full max-w-sm rounded-2xl border border-border bg-card p-4"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="grid gap-2">
                {links.map((link) => (
                  <a
                    key={link.target}
                    href={`#${link.target}`}
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg border border-border px-3 py-3 text-xs tracking-[0.18em] text-secondary transition hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
