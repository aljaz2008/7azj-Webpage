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
    title: 'Setup for the WWDIGI and FIELD DAY contests & contest report',
    summary:
      'A quick rundown of the setup used for the WWDIGI and FIELD DAY contests, including a detailed report of the contest performance and analysis of the station setup and its future improvements.',
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
