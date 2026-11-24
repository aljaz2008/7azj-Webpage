import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { DiscordIcon, LinkedinIcon } from '@/components/BrandIcons';
import ContestTable from '@/components/ContestTable';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import ProjectsList from '@/components/ProjectsList';
import Reveal from '@/components/Reveal';
import Section from '@/components/Section';
import SiteFooter from '@/components/SiteFooter';
import WorkedMap from '@/components/WorkedMap';
import {
  CALLSIGN,
  CALLSIGN_CHANGED,
  EMAIL,
  FORMER_CALLSIGN,
  LOCATION,
  LOCATOR,
  QRZ_URL,
  contestData,
  contestStats,
  contestStation,
  homeStation,
  type StationGroup
} from '@/lib/station';
import { compact, thousands } from '@/lib/format';

/** The three study areas, each tied to something I've built (or am building). */
const studies = [
  {
    area: 'Engineering',
    projects: [
      { slug: 'hf-antenna-switch', label: '100 W HF antenna switch' },
      { slug: 'fan-vertical', label: 'Multiband fan vertical' }
    ]
  },
  {
    area: 'Embedded systems',
    projects: [{ slug: 'esp32-ptt-matrix', label: 'ESP32-S3 Ethernet PTT matrix' }]
  },
  {
    area: 'Telecommunications',
    projects: [{ slug: 'cansat', label: 'CanSat: 433 MHz LoRa and 868 MHz GFSK links' }]
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
    label: best
      ? `Best final score, ${best.name} ${best.start.slice(0, 4)}, ${best.category}`
      : 'Best final score'
  }
];

const eyebrow = 'font-mono text-[11px] uppercase tracking-[0.2em] text-secondary';

function StationList({ groups }: { groups: StationGroup[] }) {
  return (
    <dl className="mt-6">
      {groups.map((group) => (
        <div
          key={group.title}
          className="grid grid-cols-[5.5rem_1fr] gap-4 border-b sm:grid-cols-[7.5rem_1fr] sm:gap-6 border-border py-5 first:border-t"
        >
          <dt className="label pt-1">{group.title}</dt>
          <dd className="space-y-1 text-primary">
            {group.items.map((item) => (
              <p key={item.text}>
                {item.text}
                {item.status ? (
                  <span className="ml-2 rounded border border-border px-1.5 py-px text-xs text-secondary">
                    {item.status}
                  </span>
                ) : null}
              </p>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Section id="about" index={1} label="About" title="Hello, I'm Aljaž.">
          <div className="grid gap-14 xl:grid-cols-[1fr_17.5rem]">
            <Reveal className="max-w-2xl space-y-6 text-lg leading-relaxed text-secondary">
              <p className="text-2xl leading-snug text-primary md:text-3xl">
                I&apos;m a radio amateur and a student at Vegova Ljubljana, on the air as{' '}
                <span className="text-accent">{CALLSIGN}</span>.
              </p>
              <p>
                I got my licence in February 2024 as {FORMER_CALLSIGN}. Five months later I made my
                first contest QSOs, in the YOTA Contest from S53AJK with S54UWU. Since then
                I&apos;ve been on {contestStats.contests} contest entries, most of them from S51A
                with the Slovenia Contest Club, and some in the field with Radioklub Vezist and the
                Slovenian Army. In {CALLSIGN_CHANGED} I changed my callsign to {CALLSIGN}.
              </p>
              <p>
                What I like most is where the disciplines meet: building the hardware, writing the
                software that drives it, and then using both over a contest weekend.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <figure className="border-l-2 border-accent pl-6">
                <figcaption className="label">Current focus</figcaption>
                <blockquote className="mt-4 font-heading text-xl leading-snug text-primary">
                  Getting the 40/20/15/10 m fan vertical up at home.
                </blockquote>
              </figure>
            </Reveal>
          </div>

          <Reveal className="mt-20">
            <h3 className="font-heading text-2xl font-semibold text-primary">
              Studying at Vegova Ljubljana
            </h3>
            <p className="mt-3 max-w-2xl text-secondary">
              Three subjects I study, and what I&apos;ve built or am building with each.
            </p>
            <dl className="mt-8 border-t border-border">
              {studies.map((item) => (
                <div
                  key={item.area}
                  className="grid gap-2 border-b border-border py-5 sm:grid-cols-[12rem_1fr] sm:gap-6"
                >
                  <dt className="font-heading text-lg font-semibold text-primary">{item.area}</dt>
                  <dd className="flex flex-wrap gap-x-6 gap-y-1">
                    {item.projects.map((project) => (
                      <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        className="text-secondary underline decoration-border underline-offset-4 transition hover:text-accent hover:decoration-accent"
                      >
                        {project.label}
                      </Link>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Section>

        <Section
          id="contests"
          index={2}
          label="Contests"
          title="On the air, against the clock."
          intro={
            <>
              Recent contest entries, newest first. Results before {CALLSIGN_CHANGED} list me under
              my previous callsign,{' '}
              <span className="font-mono text-primary">{FORMER_CALLSIGN}</span>.
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
            <h3 className="font-heading text-2xl font-semibold text-primary">
              Where the signals went
            </h3>
            <p className="mt-3 max-w-2xl text-secondary">
              The countries and grid squares in my log, plotted the way a beam heading sees the
              world: great-circle distance and bearing from {LOCATOR}.
            </p>
            <div className="mt-10">
              <WorkedMap />
            </div>
          </div>
        </Section>

        <Section
          id="setup"
          index={3}
          label="Station"
          title="Two stations."
          intro={
            <>
              I operate {CALLSIGN} from home in {LOCATION.split(',')[0]}, and contest as part of the
              team at S51A, the Slovenia Contest Club station.
            </>
          }
        >
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <Reveal>
              <h3 className="font-heading text-2xl font-semibold text-primary">
                Home station ({CALLSIGN})
              </h3>
              <StationList groups={homeStation} />
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="font-heading text-2xl font-semibold text-primary">
                Contest station (S51A)
              </h3>
              <StationList groups={contestStation} />
            </Reveal>
          </div>
          <Reveal className="mt-16">
            <figure>
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                <Image
                  src="/images/shack.jpg"
                  alt="The S51A operating room: radios, keyboards and a row of monitors"
                  fill
                  sizes="(min-width: 1280px) 890px, (min-width: 1024px) 70vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10" />
              </div>
              <figcaption className="label mt-4">S51A contest station</figcaption>
            </figure>
          </Reveal>
        </Section>

        <Section
          id="projects"
          index={4}
          label="Projects"
          title="Selected projects."
          intro="Write-ups from the field and the workbench: what I built, what worked, and what I would change next time."
        >
          <ProjectsList />
        </Section>

        <Section id="contact" index={5} label="Contact" title="Let's make a QSO.">
          <Reveal>
            <div id="qsl" className="scroll-mt-28">
              <h3 className="font-heading text-2xl font-semibold text-primary">QSL</h3>
              <dl className="mt-6 border-t border-border">
                <div className="grid gap-2 border-b border-border py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="label pt-1">Logbook</dt>
                  <dd>
                    <a
                      href={QRZ_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary underline decoration-border underline-offset-4 transition hover:text-accent hover:decoration-accent"
                    >
                      QRZ.com logbook ({CALLSIGN})
                      <ArrowUpRight size={14} aria-hidden />
                    </a>
                  </dd>
                </div>
                <div className="grid gap-2 border-b border-border py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="label pt-1">Paper cards</dt>
                  <dd className="text-primary">Direct QSL: address on QRZ.com</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal className="mt-20 space-y-12">
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
                  <ArrowUpRight
                    size={14}
                    className="text-secondary transition group-hover:text-accent"
                  />
                </a>
              ))}
              <p className="text-secondary">
                {LOCATION} · {LOCATOR}
              </p>
            </div>
          </Reveal>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
