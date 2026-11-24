import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import Waterfall from '@/components/Waterfall';
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

/** Staggered entrance, pure CSS (.hero-rise in globals.css) so it runs before hydration. */
const rise = (delay: number) => ({ '--rise-delay': `${delay}s` }) as CSSProperties;

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col px-6 md:px-10">
      <Waterfall />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center pb-16 pt-32">
        <p
          style={rise(0)}
          className="hero-rise flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-secondary"
        >
          Amateur radio · {LOCATION}
        </p>

        <h1
          style={rise(0.1)}
          className="hero-rise mt-8 font-heading text-[clamp(5rem,18vw,13rem)] font-extrabold leading-[0.85] tracking-tighter"
        >
          {CALLSIGN.slice(0, -1)}
          <span className="text-accent">{CALLSIGN.slice(-1)}</span>
        </h1>

        <p
          style={rise(0.25)}
          className="hero-rise mt-10 max-w-2xl text-xl leading-relaxed text-secondary md:text-2xl"
        >
          Contest operator and RF tinkerer building antennas, stations and the software that ties
          them together.{' '}
          <span className="text-primary">New callsign since {CALLSIGN_CHANGED}.</span>
        </p>

        <div
          style={rise(0.35)}
          className="hero-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
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
        </div>
      </div>

      <dl
        style={rise(0.5)}
        className="hero-rise relative mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-6 border-t border-border py-8 md:grid-cols-4"
      >
        {facts.map((fact) => (
          <div key={fact.label} className="pr-4">
            <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
              {fact.label}
            </dt>
            <dd className="mt-1.5 text-primary">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
