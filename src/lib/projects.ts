import type { ComponentType } from 'react';
import ContestLogAnalyzerArticle from '@/content/projects/contest-log-analyzer.mdx';
import FieldContestsArticle from '@/content/projects/ww-digi-field-day-2026.mdx';

export type ProjectImage = {
  src: string;
  alt: string;
  /** 'screenshot' images get a dark window frame instead of a photo crop */
  kind?: 'photo' | 'screenshot';
};

export type ProjectItem = {
  /** URL segment: /projects/[slug] */
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
      src: '/images/vojska.jpeg',
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
      src: '/images/Contest-analyzer.png',
      alt: 'Contest Log Analyzer report: an hourly table of QSOs, cumulative QSOs, operators and bands',
      kind: 'screenshot'
    },
    featured: true,
    writtenUp: true,
    Article: ContestLogAnalyzerArticle
  }
];

export const featuredProjects = projects.filter((p) => p.featured && p.image).slice(0, 3);
export const otherProjects = projects.filter((p) => !featuredProjects.includes(p));
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
