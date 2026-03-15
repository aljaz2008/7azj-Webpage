import AntennaSwitchArticle from '@/content/projects/contest-analyzer.mdx';

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
    id: 'Contest analysis tool',
    title: 'contest analysis tool',
    summary:
      'A tool written in python that parses contest logs and generates detailed analysis of the station performance, including QSO breakdowns, score calculations, and performance metrics.',
    tags: ['Python', 'Contest', 'Automation'],
    image: '/images/Contest-analyzer.png',
    Article: AntennaSwitchArticle
  }
];
