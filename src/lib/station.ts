// Single source of truth for station identity. Change it here and the whole site follows.
export const CALLSIGN = 'S58Q';
export const FORMER_CALLSIGN = 'S57AZJ';
export const CALLSIGN_CHANGED = 'October 2026';
export const OWNER_NAME = 'Aljaž Žugič Jehart';
export const LOCATOR = 'JN76GB';
export const LOCATION = 'Ljubljana, Slovenia';
/** Contact address. The domain stays s57azj.eu after the callsign change. */
export const EMAIL = 's57azj@s57azj.eu';

export type ContestEntry = {
  name: string;
  /** ISO date of the first contest day, used for sorting */
  start: string;
  date: string;
  callsign: string;
  category: string;
  qsos: string;
  score: string;
  club: string;
  ops: string[];
};

const contests: ContestEntry[] = [
  {
    name: 'R1 Field Day',
    start: '2026-09-05',
    date: '5.9–6.9.2026',
    callsign: 'S510ARMY/P',
    category: 'M/S LP',
    qsos: '301',
    score: '?',
    club: 'Vezist',
    ops: ['S50V', 'S559NV', 'S56WKZ', 'S57AZJ', 'S57DD', 'S57GG']
  },
  {
    name: 'WW Digi',
    start: '2026-08-29',
    date: '29.8–30.8.2026',
    callsign: 'S59TIM',
    category: 'M/S LP',
    qsos: '?',
    score: '90,158',
    club: 'Vezist',
    ops: ['S50NI', 'S50V', 'S559NV', 'S56WKZ', 'S57AZJ', 'S57DD', 'S57GG']
  },
  {
    name: 'CQ WW RTTY WPX',
    start: '2026-02-14',
    date: '14.2–15.2.2026',
    callsign: 'S51A',
    category: 'M/S LP',
    qsos: '1900',
    score: '4,829,244',
    club: 'Slovenia Contest Club',
    ops: ['S55O', 'S51MG', 'S55BG', 'S50NB', 'S57AZJ', 'S50V']
  },
  {
    name: 'BARTG RTTY Sprint',
    start: '2026-01-24',
    date: '24.1–25.1.2026',
    callsign: 'S51A',
    category: 'M/M HP',
    qsos: '756',
    score: '223,020',
    club: 'Slovenia Contest Club',
    ops: ['S50NB', 'S57AZJ', 'S51MG']
  },
  {
    name: 'WAEDC RTTY',
    start: '2025-11-08',
    date: '8.11–9.11.2025',
    callsign: 'S51A',
    category: 'SOHP',
    qsos: '919',
    score: '1,242,919',
    club: 'Slovenia Contest Club',
    ops: ['S57AZJ']
  }
];

/** Newest first */
export const contestData = [...contests].sort((a, b) => b.start.localeCompare(a.start));

export const isOwnCall = (call: string) => call === CALLSIGN || call === FORMER_CALLSIGN;

const toNumber = (value: string) => {
  const n = Number(value.replace(/,/g, ''));
  return Number.isFinite(n) ? n : null;
};

const knownQsos = contestData.map((c) => toNumber(c.qsos)).filter((n): n is number => n !== null);
const knownScores = contestData.map((c) => toNumber(c.score)).filter((n): n is number => n !== null);

export const contestStats = {
  contests: contestData.length,
  qsos: knownQsos.reduce((sum, n) => sum + n, 0),
  /** true when some entries have no QSO count yet, so the total is a lower bound */
  qsosPartial: knownQsos.length < contestData.length,
  bestScore: Math.max(...knownScores)
};
