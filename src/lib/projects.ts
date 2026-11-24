import type { ComponentType } from 'react';
import type { ImageName } from '@/components/Picture';
import CanSatArticle from '@/content/projects/cansat.mdx';
import ContestLogAnalyzerArticle from '@/content/projects/contest-log-analyzer.mdx';
import Esp32PttMatrixArticle from '@/content/projects/esp32-ptt-matrix.mdx';
import FanVerticalArticle from '@/content/projects/fan-vertical.mdx';
import HfAntennaSwitchArticle from '@/content/projects/hf-antenna-switch.mdx';
import PcbQslDummyLoadArticle from '@/content/projects/pcb-qsl-dummy-load.mdx';
import ShackCalendarArticle from '@/content/projects/shack-reservation-calendar.mdx';
import FieldContestsArticle from '@/content/projects/ww-digi-field-day-2026.mdx';

export type ProjectImage = {
  /** Source file in images/ (pre-sized by scripts/build-images.mjs) */
  name: ImageName;
  alt: string;
  /** 'screenshot' images get a dark window frame instead of a photo crop */
  kind?: 'photo' | 'screenshot';
};

export type ProjectItem = {
  /** URL segment: /projects/[slug]/ */
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  /** Optional: projects without a photo are listed compactly */
  image?: ProjectImage;
  /** Shown large on the home page (at most 3) */
  featured?: boolean;
  /** e.g. 'in progress', 'concept' */
  status?: string;
  /** false while the MDX is still a stub marked TODO: write-up */
  writtenUp: boolean;
  Article: ComponentType;
};

export const projects: ProjectItem[] = [
  {
    slug: 'ww-digi-field-day-2026',
    title: 'WW Digi and Field Day 2026 with the Slovenian Army',
    summary:
      "Two contests, one field setup: S59TIM and S510ARMY with Radioklub Vezist and the Slovenian Army signals community. What worked, what didn't, and what we change next year.",
    tags: ['Field operation', 'Station setup', 'Contest'],
    image: {
      name: 'vojska',
      alt: 'The field station: an army truck, antenna masts and a tent in a meadow',
      kind: 'photo'
    },
    featured: true,
    writtenUp: true,
    Article: FieldContestsArticle
  },
  {
    slug: 'contest-log-analyzer',
    title: 'Contest log analyzer',
    summary:
      'A Python tool that parses contest logs into an HTML report: QSOs per hour, activity graphs and the general contest summary, without reading the log by hand.',
    tags: ['Python', 'Contest', 'Automation'],
    image: {
      name: 'contest-analyzer',
      alt: 'Contest Log Analyzer report: an hourly table of QSOs, cumulative QSOs, operators and bands',
      kind: 'screenshot'
    },
    featured: true,
    writtenUp: true,
    Article: ContestLogAnalyzerArticle
  },
  {
    slug: 'esp32-ptt-matrix',
    title: 'ESP32-S3 Ethernet PTT matrix',
    summary:
      '8 PTT inputs mapped to 8 amplifier and radio keying outputs, configured from a web page. Runs on 13.8 V; outputs only short to ground.',
    tags: ['ESP32-S3', 'Ethernet', 'Station automation'],
    writtenUp: false,
    Article: Esp32PttMatrixArticle
  },
  {
    slug: 'hf-antenna-switch',
    title: '100 W HF antenna switch',
    summary: 'One radio to 3–4 antennas plus a receive antenna, with its own ESP32 controller.',
    tags: ['RF', 'ESP32', 'Switching'],
    writtenUp: false,
    Article: HfAntennaSwitchArticle
  },
  {
    slug: 'fan-vertical',
    title: 'Multiband fan vertical',
    summary: '40/20/15/10 m fan vertical on a Spiderbeam 10 m mast for the home station.',
    tags: ['Antenna', 'HF'],
    status: 'in progress',
    writtenUp: false,
    Article: FanVerticalArticle
  },
  {
    slug: 'cansat',
    title: 'CanSat',
    summary: '433 MHz LoRa telemetry and an 868 MHz GFSK image downlink.',
    tags: ['LoRa', '433 MHz', '868 MHz'],
    writtenUp: false,
    Article: CanSatArticle
  },
  {
    slug: 'pcb-qsl-dummy-load',
    title: 'PCB QSL card and dummy load',
    summary: 'A KiCad concept for QRP-SOLUTIONS.',
    tags: ['KiCad', 'PCB', 'QRP-SOLUTIONS'],
    status: 'concept',
    writtenUp: false,
    Article: PcbQslDummyLoadArticle
  },
  {
    slug: 'shack-reservation-calendar',
    title: 'Contest shack reservation calendar',
    summary: 'Booking calendar for the S51A contest station team.',
    tags: ['Web app', 'S51A'],
    writtenUp: false,
    Article: ShackCalendarArticle
  }
];

export const featuredProjects = projects.filter((p) => p.featured && p.image).slice(0, 3);
export const otherProjects = projects.filter((p) => !featuredProjects.includes(p));
/** Trailing slash matches trailingSlash: true, so static hosts serve it without a redirect */
export const projectPath = (slug: string) => `/projects/${slug}/`;
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
