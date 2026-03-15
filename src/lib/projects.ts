import AntennaSwitchArticle from '@/content/projects/antenna-switch.mdx';

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
    id: 'esp32-antenna-switch',
    title: 'ESP32 Antenna Switch',
    summary:
      'A remote-controlled antenna switch with web dashboard, RF-safe relays and telemetry logging.',
    tags: ['ESP32', 'RF', 'Automation'],
    image: '/images/antenna-switch.svg',
    Article: AntennaSwitchArticle
  }
];
