import AntennaSwitchArticle from '@/content/projects/contest-analyzer.mdx';
import ArmyInTheFieldArticle from '@/content/projects/fielddayinwwdigizvojsko.mdx';

export type ProjectItem = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  image: string;
  Article: React.ComponentType;
};

export const projects: ProjectItem[] = [
  {
    id: 'Setup for the WWDIGI and FIELD DAY contests',
    title: 'WW Digi & IARU Region 1 Field Day 2026 with the Slovenian Army',
    summary:
      'Two contests, one field setup: operating S59TIM and S510ARMY together with the Slovenian Army signals community — what worked, what didn\'t, and what we change next year.',
    tags: ['Equipement', 'Station setup', 'Contest'],
    image: '/images/vojska.jpeg',
    Article: ArmyInTheFieldArticle
  },
  {
    id: 'Contest analysis tool',
    title: 'contest analysis tool',
    summary:
      'A tool written in python that parses contest logs and generates detailed analysis of the station performance, including QSO breakdowns, score calculations, and performance metrics.',
    tags: ['Python', 'Contest', 'Automation'],
    image: '/images/Contest-analyzer.png',
    Article: AntennaSwitchArticle
  }
];
