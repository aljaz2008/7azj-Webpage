import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

import { DiscordIcon, LinkedinIcon } from '@/components/BrandIcons';
import ContestTable from '@/components/ContestTable';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import ProjectsList from '@/components/ProjectsList';
import Reveal from '@/components/Reveal';
import Section from '@/components/Section';
import WorkedMap from '@/components/WorkedMap';
import {
  CALLSIGN,
  CALLSIGN_CHANGED,
  EMAIL,
  FORMER_CALLSIGN,
  LOCATION,
  LOCATOR,
  OWNER_NAME,
  contestData,
  contestStats
} from '@/lib/station';
import { compact, thousands } from '@/lib/format';

const interests = [
  'Contest operating',
  'RF experimentation',
  'Antenna design',
  'Electronics projects',
  'Radio software'
];

const studies = [
  {
    title: 'Engineering',
    text: 'The fundamentals behind everything else: circuits, measurement and building things that work.'
  },
  {
    title: 'Embedded systems',
    text: 'Microcontrollers and firmware for station automation, switching and test fixtures.'
  },
  {
    title: 'Telecommunications',
    text: 'Signal processing, modulation and propagation: the theory behind every QSO.'
  }
];

const station = [
  { title: 'Transceiver', items: ['Kenwood TS-590SG'] },
  { title: 'Amplifiers', items: ['OM Power OM2000+', 'OM Power OM2000A+'] },
  { title: 'Towers', items: ['22 m main tower', '22 m secondary tower'] },
  {
    title: 'Antennas',
    items: [
      '2× Optibeam 16/3',
      '7 MHz Moxon',
      'Rotary dipole',
      '80 m dipole',
      '160 m dipole',
      'K9AY receive antenna'
    ]
  }
];

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/aljaž-žugič-jehart-9a5a66239',
    icon: <LinkedinIcon size={16} />
  },
  {
    label: 'Discord',
    href: 'https://discord.com/users/770928106101145621',
    icon: <DiscordIcon size={16} />
  }
];

const best = contestStats.bestFinal;

const stats = [
  { value: String(contestStats.contests), label: 'Contest entries' },
  {
    value: `${thousands(contestStats.qsos)}${contestStats.qsosPartial ? '+' : ''}`,
    label: 'QSOs across these entries'
  },
  {
    value: best?.score ? compact(best.score) : '–',
    label: best ? `Best final score, ${best.name} ${best.start.slice(0, 4)}, ${best.category}` : 'Best final score'
  }
];

const eyebrow = 'font-mono text-[11px] uppercase tracking-[0.2em] text-secondary';

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Section id="about" index={1} label="About" title="Hello, I'm Aljaž.">
          <div className="grid gap-14 xl:grid-cols-[1fr_280px]">
            <Reveal className="max-w-2xl space-y-6 text-lg leading-relaxed text-secondary">
              <p className="text-2xl leading-snug text-primary md:text-3xl">
                A young amateur radio operator from Ljubljana, on the air as{' '}
                <span className="text-accent">{CALLSIGN}</span>.
              </p>
              <p>
                I received my licence in February 2024 as {FORMER_CALLSIGN} and have spent every spare
                moment since exploring radio technology, antennas, RF engineering and contesting. In{' '}
                {CALLSIGN_CHANGED} I changed my callsign to {CALLSIGN}.
              </p>
              <p>
                What I enjoy most is where the disciplines meet: building the antenna, writing the
                software that drives the station, and then putting both to the test over a contest
                weekend.
              </p>
              <p className="flex flex-wrap gap-x-3 gap-y-1 pt-2 text-base text-primary">
                {interests.map((item, i) => (
                  <span key={item} className="flex items-center gap-3">
                    {i > 0 ? <span aria-hidden className="text-accent">/</span> : null}
                    {item}
                  </span>
                ))}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <figure className="border-l-2 border-accent pl-6">
                <figcaption className={eyebrow}>Current focus</figcaption>
                <blockquote className="mt-4 font-heading text-xl leading-snug text-primary">
                  Building efficient HF contest workflows and software-defined tooling for station
                  automation.
                </blockquote>
              </figure>
            </Reveal>
          </div>
        </Section>

        <Section
          id="school"
          index={2}
          label="School"
          title="Studying the theory behind the hobby."
          intro="I am focused on technical studies, and school projects often feed directly into my amateur radio experiments, from signal processing prototypes to hardware test fixtures."
        >
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {studies.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="border-t border-border pt-6">
                <p className="font-mono text-xs text-accent">0{i + 1}</p>
                <h3 className="mt-3 font-heading text-xl font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          id="contests"
          index={3}
          label="Contests"
          title="On the air, against the clock."
          intro={
            <>
              Recent contest entries, newest first. Results before {CALLSIGN_CHANGED} list me under
              my previous callsign, <span className="font-mono text-primary">{FORMER_CALLSIGN}</span>.
            </>
          }
        >
          <Reveal>
            <dl className="grid gap-x-6 gap-y-6 border-y border-border py-8 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-2 max-w-[24ch] text-sm text-secondary">{stat.label}</dt>
                  <dd className="font-heading text-4xl font-bold tracking-tight text-primary tabular-nums lg:text-5xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="mt-12">
            <ContestTable entries={contestData} />
          </div>

          <div className="mt-20 border-t border-border pt-16">
            <h3 className="font-heading text-2xl font-semibold text-primary">Where the signals went</h3>
            <p className="mt-3 max-w-2xl text-secondary">
              The countries and grid squares in my log, plotted the way a beam heading sees
              the world: great-circle distance and bearing from {LOCATOR}.
            </p>
            <div className="mt-10">
              <WorkedMap />
            </div>
          </div>
        </Section>

        <Section id="setup" index={4} label="Station" title="The station.">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <dl>
                {station.map((group) => (
                  <div
                    key={group.title}
                    className="grid grid-cols-[120px_1fr] gap-6 border-b border-border py-5 first:border-t"
                  >
                    <dt className={`${eyebrow} pt-1`}>{group.title}</dt>
                    <dd className="space-y-1 text-primary">
                      {group.items.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.1}>
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src="/images/shack.jpg"
                    alt={`The ${CALLSIGN} radio shack with transceivers, amplifiers and monitors`}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10" />
                </div>
                <figcaption className="mt-4 flex justify-between font-mono text-xs text-secondary">
                  <span>The shack</span>
                  <span>
                    {CALLSIGN} · {LOCATOR}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Section>

        <Section
          id="projects"
          index={5}
          label="Projects"
          title="Selected projects."
          intro="Write-ups from the field and the workbench: what I built, what worked, and what I would change next time."
        >
          <ProjectsList />
        </Section>

        <Section id="contact" index={6} label="Contact" title="Let's make a QSO.">
          <Reveal className="space-y-12">
            <div>
              <p className="max-w-2xl text-lg leading-relaxed text-secondary">
                Always open to technical collaboration, contest team discussions and radio-software
                experiments. The quickest way to reach me is email.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="group mt-8 inline-flex items-center gap-3 break-all font-heading text-3xl font-bold tracking-tight text-primary transition hover:text-accent md:text-5xl"
              >
                {EMAIL}
                <ArrowUpRight className="h-8 w-8 shrink-0 text-accent transition group-hover:-translate-y-1 group-hover:translate-x-1 md:h-10 md:w-10" />
              </a>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-6 border-t border-border pt-8">
              {socials.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-primary transition hover:text-accent"
                >
                  {link.icon}
                  {link.label}
                  <ArrowUpRight size={14} className="text-secondary transition group-hover:text-accent" />
                </a>
              ))}
              <p className="text-secondary">
                {LOCATION} · {LOCATOR}
              </p>
            </div>
          </Reveal>
        </Section>
      </main>

      <footer className="px-6 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-border py-10 text-sm text-secondary">
          <p>
            © {new Date().getFullYear()} {OWNER_NAME}
          </p>
          <p className="font-mono text-xs">
            {CALLSIGN} · ex {FORMER_CALLSIGN} · 73
          </p>
        </div>
      </footer>
    </>
  );
}
