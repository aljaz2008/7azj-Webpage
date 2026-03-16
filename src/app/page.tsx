export const dynamic = 'force-dynamic'

import Image from 'next/image'
import dynamicImport from 'next/dynamic'

import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import ParticleBackground from '@/components/ParticleBackground'
import ProjectsGrid from '@/components/ProjectsGrid'
import Section from '@/components/Section'
import { Mail, Linkedin, MessageCircle } from "lucide-react"

const Globe = dynamicImport(() => import('@/components/Globe'), {
  ssr: false
})

const contestData = [
  { name: 'WAEDC RTTY', qsos: '919', score: '1,242,919', club: 'Slovenia Contest Club', date: '8.11-9.11.2025', category: "SOHP", callsign:"S51A", ops: "S57AZJ" },
  { name: 'BARTG RTTY SPRINT', qsos: '756', score: '223,020', club: 'Slovenia Contest Club', date:"24.1-25.1.2026", category: "M/M HP", callsign:"S51A", ops: "S50NB, S57AZJ, S51MG" },
  { name: 'CQ WW RTTY WPX', qsos: '1900', score: '4,829,244', club: 'Slovenia Contest Club', date: "14.2-15.2.2026", category: "M/S LP", callsign:"S51A", ops:"S55O, S51MG, S55BG, S50NB, S57AZJ, S50V" }
]

export default function HomePage() {
  return (
    <>
      <ParticleBackground />
      <Navbar />

      <main>
        <Hero />

        <Section id="about" title="About">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
            <div className="space-y-5 text-secondary">
              <h2 className="font-heading text-4xl text-primary">About Me</h2>

              <p>Hello! My name is Aljaž Žugič Jehart, callsign S57AZJ.</p>

              <p>
                I am a young amateur radio operator from Ljubljana, Slovenia. I received my amateur
                radio license in February 2024 and since then I have been exploring radio technology,
                antennas, RF engineering and contesting.
              </p>

              <p>My interests include:</p>

              <ul className="grid gap-2 text-sm md:grid-cols-2">
                <li>• Contest operating</li>
                <li>• RF experimentation</li>
                <li>• Antenna design</li>
                <li>• Electronics projects</li>
                <li>• Radio software</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="font-heading text-xl">Current Focus</p>

              <p className="mt-4 text-sm text-secondary">
                Building efficient HF contest workflows and software-defined tooling for station
                automation.
              </p>
            </div>
          </div>
        </Section>

        <Section id="school" title="School">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-heading text-4xl text-primary">School</h2>

            <p className="text-secondary">
              I am focused on technical studies with strong interests in engineering, electronics,
              embedded systems and telecommunications. School projects often feed directly into my
              amateur radio experiments, from signal processing prototypes to hardware test fixtures.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              {['Engineering', 'Embedded Systems', 'Telecommunications'].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-border bg-card px-4 py-5 text-sm text-secondary"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="contests" title="Contests">
          <div className="w-full space-y-8">
            <div>
              <h2 className="font-heading text-4xl text-primary">Contests</h2>
              <p className="mt-3 text-secondary">
                Recent contest activity and selected QSO highlights.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {contestData.map((entry) => (
                <article
                  key={entry.name}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <h3 className="font-heading text-2xl text-primary">{entry.name}</h3>
                  <p className="mt-3 text-sm text-secondary">QSOs: {entry.qsos}</p>
                  <p className="text-sm text-secondary">callsign: {entry.callsign}</p>
                  <p className="text-sm text-secondary">category: {entry.category}</p>
                  <p className="text-sm text-secondary">Score: {entry.score}</p>
                  <p className="text-sm text-secondary">Club: {entry.club}</p>
                  <p className="text-sm text-secondary">Date: {entry.date}</p>
                  <p className="text-sm text-secondary">Operator(s): {entry.ops}</p>
                </article>
              ))}
            </div>

            <Globe />
          </div>
        </Section>

        <Section id="setup" title="Setup">
          <div className="grid w-full gap-8 md:grid-cols-[1.2fr_1fr]">
            <div className="space-y-6">
              <h2 className="font-heading text-4xl text-primary">Station Setup</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="font-heading text-xl">Transceivers</h3>
                  <p className="mt-2 text-sm text-secondary">Kenwood TS-590SG</p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="font-heading text-xl">Amplifiers</h3>
                  <p className="mt-2 text-sm text-secondary">OM Power OM2000+</p>
                  <p className="text-sm text-secondary">OM Power OM2000A+</p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="font-heading text-xl">Towers</h3>
                  <p className="mt-2 text-sm text-secondary">22m tower</p>
                  <p className="text-sm text-secondary">22m secondary tower</p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="font-heading text-xl">Antennas</h3>
                  <ul className="mt-2 space-y-1 text-sm text-secondary">
                    <li>Optibeam 16/3</li>
                    <li>7 MHz Moxon</li>
                    <li>Rotary dipole</li>
                    <li>80m dipole</li>
                    <li>160m dipole</li>
                    <li>K9AY receive antenna</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/shack.jpg"
                alt="Station setup"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="w-full space-y-6">
            <h2 className="font-heading text-4xl text-primary">Projects</h2>

            <p className="max-w-2xl text-secondary">
              Click any project card to open a detailed MDX article with images, code snippets and
              technical notes.
            </p>

            <ProjectsGrid />
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="max-w-3xl space-y-4">

            <h2 className="font-heading text-4xl text-primary">Contact</h2>

            <p className="text-secondary">Callsign: S57AZJ</p>
            <p className="text-secondary">Locator: JN76GB</p>
            <p className="text-secondary">Location: Ljubljana, Slovenia</p>

            <div className="flex flex-wrap gap-6 pt-6">

              <a
                href="mailto:s57azj@s57azj.eu"
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 hover:bg-card/70 transition"
              >
                <Mail size={18}/>
                Email
              </a>

              <a
                href="https://linkedin.com/in/aljaž-žugič-jehart-9a5a66239"
                target="_blank"
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 hover:bg-card/70 transition"
              >
                <Linkedin size={18}/>
                LinkedIn
              </a>

              <a
                href="https://discord.com/users/770928106101145621"
                target="_blank"
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 hover:bg-card/70 transition"
              >
                <MessageCircle size={18}/>
                Discord
              </a>

            </div>

            <p className="pt-4 text-sm text-secondary">
              Always open to technical collaboration, contest team discussions and
              radio-software experiments.
            </p>

          </div>
        </Section>
      </main>
    </>
  )
}