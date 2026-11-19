'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';
import {
  CALLSIGN,
  CALLSIGN_CHANGED,
  FORMER_CALLSIGN,
  LOCATION,
  LOCATOR,
  OWNER_NAME
} from '@/lib/station';

const facts = [
  { label: 'Operator', value: OWNER_NAME },
  { label: 'Grid', value: LOCATOR },
  { label: 'CQ / ITU', value: '15 / 28' },
  { label: 'Formerly', value: FORMER_CALLSIGN }
];

const ease = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease }
});

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col px-6 md:px-10">
      <ParticleBackground />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center pb-16 pt-32">
        <motion.p
          {...rise(0)}
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-secondary"
        >
          <span className="animate-blink h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_var(--color-signal)]" />
          Amateur radio · {LOCATION}
        </motion.p>

        <motion.h1
          {...rise(0.1, 40)}
          className="mt-8 font-heading text-[clamp(5rem,18vw,13rem)] font-extrabold leading-[0.85] tracking-tighter"
        >
          {CALLSIGN.slice(0, -1)}
          <span className="text-accent">{CALLSIGN.slice(-1)}</span>
        </motion.h1>

        <motion.p
          {...rise(0.25)}
          className="mt-10 max-w-2xl text-xl leading-relaxed text-secondary md:text-2xl"
        >
          Contest operator and RF tinkerer building antennas, stations and the software that ties
          them together. <span className="text-primary">New callsign since {CALLSIGN_CHANGED}.</span>
        </motion.p>

        <motion.div {...rise(0.35)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="#contests"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition hover:brightness-110"
          >
            See contest results
            <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="text-sm text-primary underline decoration-border underline-offset-8 transition hover:decoration-accent"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.dl
        {...rise(0.5)}
        className="relative mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-6 border-t border-border py-8 md:grid-cols-4"
      >
        {facts.map((fact) => (
          <div key={fact.label} className="pr-4">
            <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">{fact.label}</dt>
            <dd className="mt-1.5 text-primary">{fact.value}</dd>
          </div>
        ))}
      </motion.dl>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-10 right-6 hidden text-secondary transition hover:text-accent md:right-10 md:block"
      >
        <ArrowDown size={18} className="motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
