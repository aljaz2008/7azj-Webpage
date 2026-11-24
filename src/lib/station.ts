// Single source of truth for station identity. Change it here and the whole site follows.
export const CALLSIGN = 'S58Q';
export const FORMER_CALLSIGN = 'S57AZJ';
export const CALLSIGN_CHANGED = 'October 2026';
export const OWNER_NAME = 'Aljaž Žugič Jehart';
export const LOCATOR = 'JN76GB';
export const LOCATION = 'Ljubljana, Slovenia';
/** Contact address. The domain stays s57azj.eu after the callsign change. */
export const EMAIL = 's57azj@s57azj.eu';
export const SITE_URL = 'https://s57azj.eu';
export const QRZ_URL = `https://www.qrz.com/db/${CALLSIGN}`;
export const LINKEDIN_URL = 'https://linkedin.com/in/aljaž-žugič-jehart-9a5a66239';

export type StationGroup = { title: string; items: { text: string; status?: string }[] };

export const homeStation: StationGroup[] = [
  { title: 'HF', items: [{ text: 'Yaesu FTDX10' }, { text: 'QRP Labs QMX+' }] },
  { title: 'VHF/UHF', items: [{ text: 'Yaesu FTM-300D' }] },
  {
    title: 'Antenna',
    items: [
      {
        text: 'Multiband fan vertical for 40/20/15/10 m on a Spiderbeam 10 m mast',
        status: 'in progress'
      }
    ]
  }
];

/** S51A, the Slovenia Contest Club station (not mine; I operate there with the team). */
export const contestStation: StationGroup[] = [
  { title: 'Transceiver', items: [{ text: 'Kenwood TS-590SG' }] },
  { title: 'Amplifiers', items: [{ text: 'OM Power OM2000+' }, { text: 'OM Power OM2000A+' }] },
  { title: 'Towers', items: [{ text: '22 m main tower' }, { text: '22 m secondary tower' }] },
  {
    title: 'Antennas',
    items: [
      { text: '2× Optibeam 16/3' },
      { text: '7 MHz Moxon' },
      { text: 'Rotary dipole' },
      { text: '80 m dipole' },
      { text: '160 m dipole' },
      { text: 'K9AY receive antenna' }
    ]
  }
];

export type ContestMode = 'SSB' | 'RTTY' | 'FT8/FT4' | 'Mixed';

export type ContestEntry = {
  name: string;
  /** ISO date of the first contest day, used for sorting and filtering */
  start: string;
  /** ISO date of the last contest day, when the contest spans two days */
  end?: string;
  callsign: string;
  /** Sponsor's category name; null while results are pending */
  category: string | null;
  mode: ContestMode;
  /** null = not published yet (rendered as a dash marked "pending") */
  qsos: number | null;
  score: number | null;
  /** 'final' = sponsor's log-checked result; 'claimed' = pre-log-check (3830 or own claim) */
  scoreType: 'final' | 'claimed';
  /** Only where the sponsor published a placing */
  place?: string;
  /** Where the result was checked */
  source?: { label: string; url: string };
  club?: string;
  ops: string[];
  note?: string;
  badge?: 'First contest' | 'First solo';
};

const SCC = 'Slovenia Contest Club';
const VEZIST = 'Radioklub Vezist S50VZZ';

const SRC = {
  cqwwSsb: { label: 'cqww.com', url: 'https://www.cqww.com/results/' },
  cqwwRtty: { label: 'cqwwrtty.com', url: 'https://www.cqwwrtty.com/' },
  cqwpxSsb: { label: 'cqwpx.com', url: 'https://cqwpx.com/results/' },
  cqwpxRtty: { label: 'cqwpxrtty.com', url: 'https://www.cqwpxrtty.com/' },
  wwDigi: { label: 'ww-digi.com', url: 'https://ww-digi.com/' },
  yota: { label: 'contest.ham-yota.com', url: 'https://contest.ham-yota.com/results' },
  bartg: { label: 'bartg.rsgbcc.org', url: 'https://bartg.rsgbcc.org/' },
  wae: {
    label: 'darc.de (WAE)',
    url: 'https://www.darc.de/der-club/referate/conteste/wae-dx-contest/'
  },
  fieldDay: {
    label: 'darc.de (Field Day)',
    url: 'https://www.darc.de/der-club/referate/conteste/iaru-region-1-fieldday/'
  },
  claimed: { label: '3830scores.com', url: 'https://www.3830scores.com/' }
} as const;

// Verified November 2026 against the sponsors' results databases (3830 claimed scores where
// no official result exists yet). S58Q results from 2002–2020 belong to the callsign's
// previous holder and must never be listed here.
const contests: ContestEntry[] = [
  {
    name: 'WAE DX Contest RTTY',
    start: '2026-11-14',
    end: '2026-11-15',
    callsign: 'S51A',
    category: null,
    mode: 'RTTY',
    qsos: null,
    score: null,
    scoreType: 'claimed',
    club: SCC,
    ops: ['S58Q'],
    note: 'Log submitted; results and full operator list pending.'
  },
  {
    name: 'CQ WW DX Contest SSB',
    start: '2026-10-24',
    end: '2026-10-25',
    callsign: 'S51A',
    category: 'Multi-op single-TX, high power',
    mode: 'SSB',
    qsos: 2557,
    score: 2991972,
    scoreType: 'claimed',
    source: SRC.claimed,
    club: SCC,
    ops: ['S50NB', 'S50V', 'S54VV', 'S55O', 'S58Q', 'S59Z'],
    note: 'My first contest as S58Q.'
  },
  {
    name: 'IARU Region 1 Field Day SSB',
    start: '2026-09-05',
    end: '2026-09-06',
    callsign: 'S510ARMY/P',
    category: 'Portable multi-op, low power, assisted',
    mode: 'SSB',
    qsos: 293,
    score: 67665,
    scoreType: 'final',
    place: '9th',
    source: SRC.fieldDay,
    club: VEZIST,
    ops: ['S59NV', 'S50V', 'S57AZJ', 'S57GG', 'S57DD', 'S51BW', 'S56WKZ']
  },
  {
    name: 'WW Digi DX Contest',
    start: '2026-08-29',
    end: '2026-08-30',
    callsign: 'S59TIM',
    category: 'Multi-op single-TX, low power',
    mode: 'FT8/FT4',
    qsos: 400,
    score: 70840,
    scoreType: 'final',
    source: SRC.wwDigi,
    club: VEZIST,
    ops: ['S50NI', 'S50V', 'S56WKZ', 'S57AZJ', 'S57DD', 'S57GG', 'S59NV'],
    note: 'Claimed 429 QSOs / 90,158. The first ~2.5 h ran as S510ARMY and went in as a check log.'
  },
  {
    name: 'YOTA Contest, round 2',
    start: '2026-07-19',
    callsign: 'S51A',
    category: 'Multi-op single-TX, YOTA',
    mode: 'Mixed',
    qsos: 688,
    score: 336288,
    scoreType: 'final',
    place: '5th',
    source: SRC.yota,
    club: SCC,
    ops: ['S50NI', 'S57AZJ', 'S53DX']
  },
  {
    name: 'CQ WPX SSB',
    start: '2026-03-28',
    end: '2026-03-29',
    callsign: 'S51A',
    category: 'Multi-op single-TX, high power',
    mode: 'SSB',
    qsos: 1697,
    score: 2904352,
    scoreType: 'final',
    source: SRC.cqwpxSsb,
    club: SCC,
    ops: ['S50NB', 'S50V', 'S54VV', 'S55O', 'S57AZJ', 'S57L']
  },
  {
    name: 'CQ WPX RTTY',
    start: '2026-02-14',
    end: '2026-02-15',
    callsign: 'S51A',
    category: 'Multi-op single-TX, low power',
    mode: 'RTTY',
    qsos: 1767,
    score: 3905316,
    scoreType: 'final',
    source: SRC.cqwpxRtty,
    club: SCC,
    ops: ['S50NB', 'S50V', 'S51MG', 'S55BG', 'S55O', 'S57AZJ'],
    note: 'Claimed 1,900 QSOs / 4,841,685.'
  },
  {
    name: 'BARTG RTTY Sprint',
    start: '2026-01-24',
    end: '2026-01-25',
    callsign: 'S51A',
    category: 'Multi-op (M/M HP)',
    mode: 'RTTY',
    qsos: 756,
    score: 223020,
    scoreType: 'final',
    place: '1st, multi-op',
    source: SRC.bartg,
    club: SCC,
    ops: ['S51MG', 'S57AZJ', 'S50NB'],
    note: 'Claimed 806 QSOs / 294,996.'
  },
  {
    name: 'YOTA Contest, round 3',
    start: '2025-12-29',
    callsign: 'S51A',
    category: 'Single-op all-band, YOTA',
    mode: 'Mixed',
    qsos: 422,
    score: 267148,
    scoreType: 'final',
    place: '3rd',
    source: SRC.yota,
    club: SCC,
    ops: ['S57AZJ']
  },
  {
    name: 'WAE DX Contest RTTY',
    start: '2025-11-08',
    end: '2025-11-09',
    callsign: 'S51A',
    category: 'Single-op high power, Europe',
    mode: 'RTTY',
    qsos: 919,
    score: 1242919,
    scoreType: 'final',
    place: '14th Europe SO HP',
    source: SRC.wae,
    club: SCC,
    ops: ['S57AZJ'],
    note: '643 multipliers, 1,014 QTCs.'
  },
  {
    name: 'CQ WW DX Contest SSB',
    start: '2025-10-25',
    end: '2025-10-26',
    callsign: 'S59TIM',
    category: 'Multi-op single-TX, low power',
    mode: 'SSB',
    qsos: 298,
    score: 60030,
    scoreType: 'final',
    source: SRC.cqwwSsb,
    club: VEZIST,
    ops: ['S59NV', 'S57AZJ', 'S5/HA2LY']
  },
  {
    name: 'CQ WW RTTY',
    start: '2025-09-27',
    end: '2025-09-28',
    callsign: 'S51A',
    category: 'Multi-op single-TX, low power',
    mode: 'RTTY',
    qsos: 2070,
    score: 3664458,
    scoreType: 'final',
    source: SRC.cqwwRtty,
    club: SCC,
    ops: ['S50NB', 'S51MG', 'S54KM', 'S54VV', 'S55BG', 'S55O', 'S57AZJ']
  },
  {
    name: 'WW Digi DX Contest',
    start: '2025-08-30',
    end: '2025-08-31',
    callsign: 'S59TIM',
    category: 'Multi-op single-TX, low power',
    mode: 'FT8/FT4',
    qsos: 326,
    score: 34008,
    scoreType: 'final',
    source: SRC.wwDigi,
    club: VEZIST,
    ops: ['S57DD', 'S57GG', 'S57NIK', 'S57AZJ', 'S50V']
  },
  {
    name: 'YOTA Contest, round 2',
    start: '2025-07-19',
    callsign: 'S51A',
    category: 'Multi-op single-TX, YOTA',
    mode: 'Mixed',
    qsos: 651,
    score: 464370,
    scoreType: 'final',
    place: '5th',
    source: SRC.yota,
    club: SCC,
    ops: ['S57AZJ', 'HA2LY']
  },
  {
    name: 'CQ WPX SSB',
    start: '2025-03-29',
    end: '2025-03-30',
    callsign: 'S51A',
    category: 'Multi-two',
    mode: 'SSB',
    qsos: 4193,
    score: 11682792,
    scoreType: 'final',
    source: SRC.cqwpxSsb,
    club: SCC,
    ops: [
      'S50NB',
      'S50V',
      'S51MG',
      'S54VV',
      'S55BG',
      'S55O',
      'S56B',
      'S56C',
      'S57AZJ',
      'S57FJ',
      'S57L'
    ],
    note: "First full contest after S51A's antennas were rebuilt following the October 2023 storm."
  },
  {
    name: 'YOTA Contest, round 1',
    start: '2025-03-09',
    callsign: 'S57AZJ',
    category: 'Single-op all-band, YOTA, low power',
    mode: 'Mixed',
    qsos: 739,
    score: 505020,
    scoreType: 'final',
    place: '6th',
    source: SRC.yota,
    ops: ['S57AZJ'],
    note: '228 multipliers.'
  },
  {
    name: 'CQ WPX RTTY',
    start: '2025-02-08',
    end: '2025-02-09',
    callsign: 'S51A',
    category: 'Multi-op single-TX, low power',
    mode: 'RTTY',
    qsos: 1777,
    score: 4073700,
    scoreType: 'final',
    source: SRC.cqwpxRtty,
    club: SCC,
    ops: ['S50NB', 'S51MG', 'S55O', 'S57AZJ'],
    note: 'Claimed 5,014,229, which would have been a new S5 M/S LP record.'
  },
  {
    name: 'YOTA Contest, round 3',
    start: '2024-12-30',
    callsign: 'S59TIM',
    category: 'Multi-op single-TX, YOTA',
    mode: 'Mixed',
    qsos: 257,
    score: 114835,
    scoreType: 'final',
    place: '22nd',
    source: SRC.yota,
    club: VEZIST,
    ops: ['S57AZJ', 'S59NV'],
    note: '965 points, 119 multipliers.'
  },
  {
    name: 'WAE DX Contest RTTY',
    start: '2024-11-09',
    end: '2024-11-10',
    callsign: 'S57AZJ',
    category: 'Single-op low power, Europe',
    mode: 'RTTY',
    qsos: 738,
    score: 538938,
    scoreType: 'final',
    place: '39th Europe SO LP',
    source: SRC.wae,
    ops: ['S57AZJ'],
    note: '474 multipliers, 399 QTCs. My first contest under my own callsign.',
    badge: 'First solo'
  },
  {
    name: 'CQ WW DX Contest SSB',
    start: '2024-10-26',
    end: '2024-10-27',
    callsign: 'S51A',
    category: 'Multi-op single-TX, low power',
    mode: 'SSB',
    qsos: 1694,
    score: 1709362,
    scoreType: 'final',
    source: SRC.cqwwSsb,
    club: SCC,
    ops: ['S50NB', 'S51MG', 'S54VV', 'S57AZJ', 'S57FJ']
  },
  {
    name: 'CQ WW RTTY',
    start: '2024-09-28',
    end: '2024-09-29',
    callsign: 'S51A',
    category: 'Multi-op single-TX, high power',
    mode: 'RTTY',
    qsos: 2497,
    score: 4180195,
    scoreType: 'final',
    source: SRC.cqwwRtty,
    club: SCC,
    ops: ['S50NB', 'S50V', 'S51MG', 'S54A', 'S54L', 'S55BG', 'S55O', 'S56B', 'S57AZJ'],
    note: "S51A's first big contest after the storm rebuild. Claimed 5,023,108."
  },
  {
    name: 'YOTA Contest, round 2',
    start: '2024-07-20',
    callsign: 'S53AJK',
    category: 'Multi-op single-TX, YOTA',
    mode: 'Mixed',
    qsos: 68,
    score: 9799,
    scoreType: 'final',
    place: '17th',
    source: SRC.yota,
    ops: ['S57AZJ', 'S54UWU'],
    note: '239 points, 41 multipliers. Five months after getting licensed.',
    badge: 'First contest'
  }
];

/** Newest first */
export const contestData = [...contests].sort((a, b) => b.start.localeCompare(a.start));

export const isOwnCall = (call: string) => call === CALLSIGN || call === FORMER_CALLSIGN;

const knownQsos = contestData.map((c) => c.qsos).filter((n): n is number => n !== null);
const bestFinal = contestData
  .filter((c) => c.scoreType === 'final' && c.score !== null)
  .reduce<ContestEntry | null>((best, c) => (!best || c.score! > best.score! ? c : best), null);

export const contestStats = {
  contests: contestData.length,
  qsos: knownQsos.reduce((sum, n) => sum + n, 0),
  /** true when some entries have no QSO count yet, so the total is a lower bound */
  qsosPartial: knownQsos.length < contestData.length,
  bestFinal
};
