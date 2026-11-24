#!/usr/bin/env node
// Turns the raw logs in data/logs/ into data/worked.json for the worked map.
//
//   node scripts/build-map-data.mjs
//
// Raw logs stay out of git (they hold other operators' callsigns). worked.json holds only
// aggregates: QSO counts per 4-character grid and per DXCC entity, plus the date range and
// station callsigns used for the map caption. Commit worked.json; the site builds from it.
//
// Supported inputs:
//   *.adi / *.adif  ADIF: GRIDSQUARE (or VUCC_GRIDS) and COUNTRY per record
//   *.log / *.cbr   Cabrillo: grid squares only (e.g. WW Digi exchanges). Cabrillo has no
//                   country field, so those QSOs add grids and count, not entities.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const LOG_DIR = join(root, 'data/logs');
const OUT = join(root, 'data/worked.json');

// QRZ's list view truncates COUNTRY to 20 characters; map those back to full DXCC names.
const ENTITY_ALIASES = {
  'Bosnia and Herzegovi': 'Bosnia-Herzegovina',
  'Bosnia and Herzegovina': 'Bosnia-Herzegovina',
  'North Macedonia (Rep': 'North Macedonia',
  'North Macedonia (Republic of)': 'North Macedonia',
  'British Virgin Islan': 'British Virgin Islands',
  'Andaman and Nicobar': 'Andaman & Nicobar Islands',
  'Andaman and Nicobar Is.': 'Andaman & Nicobar Islands',
  'Slovak Republic': 'Slovakia'
};

const GRID4 = /^[A-R]{2}[0-9]{2}$/;
// AA00 is what QRZ and several loggers fill in when the grid is unknown: treat it as missing.
const PLACEHOLDER_GRIDS = new Set(['AA00']);
const normGrid = (g) => {
  const four = String(g ?? '')
    .trim()
    .slice(0, 4)
    .toUpperCase();
  return GRID4.test(four) && !PLACEHOLDER_GRIDS.has(four) ? four : null;
};

/** Minimal ADIF parser: <NAME:len[:type]>value, records end at <EOR>, header at <EOH>. */
function parseAdif(text) {
  const eoh = text.search(/<eoh>/i);
  let i = eoh >= 0 ? eoh + 5 : 0;
  const records = [];
  let rec = {};
  const tag = /<([A-Za-z0-9_]+)(?::(\d+)(?::[A-Za-z])?)?>/g;
  tag.lastIndex = i;
  let m;
  while ((m = tag.exec(text))) {
    const name = m[1].toUpperCase();
    if (name === 'EOR') {
      records.push(rec);
      rec = {};
      continue;
    }
    const len = Number(m[2] ?? 0);
    const start = m.index + m[0].length;
    rec[name] = text.slice(start, start + len);
    tag.lastIndex = start + len;
  }
  return records.map((r) => ({
    date: r.QSO_DATE ?? null,
    grid: normGrid(r.GRIDSQUARE ?? r.VUCC_GRIDS?.split(',')[0]),
    entity: r.COUNTRY ? (ENTITY_ALIASES[r.COUNTRY.trim()] ?? r.COUNTRY.trim()) : null,
    station: r.STATION_CALLSIGN?.trim().toUpperCase() ?? r.OPERATOR?.trim().toUpperCase() ?? null
  }));
}

/** Cabrillo: one QSO: line per contact; the last grid-shaped token is the received grid. */
function parseCabrillo(text) {
  const station = text.match(/^CALLSIGN:\s*(\S+)/im)?.[1]?.toUpperCase() ?? null;
  return text
    .split(/\r?\n/)
    .filter((l) => /^QSO:/i.test(l))
    .map((line) => {
      const tokens = line.trim().split(/\s+/);
      const date = tokens[3]?.replace(/-/g, '') ?? null;
      const grids = tokens.map(normGrid).filter(Boolean);
      return { date, grid: grids.length > 1 ? grids.at(-1) : null, entity: null, station };
    });
}

const files = readdirSync(LOG_DIR).filter((f) =>
  ['.adi', '.adif', '.log', '.cbr'].includes(extname(f).toLowerCase())
);
if (files.length === 0) {
  console.error(`No logs in ${LOG_DIR}. worked.json left unchanged.`);
  process.exit(1);
}

const qsos = files.flatMap((f) => {
  const text = readFileSync(join(LOG_DIR, f), 'utf8');
  const ext = extname(f).toLowerCase();
  const rows = ext === '.adi' || ext === '.adif' ? parseAdif(text) : parseCabrillo(text);
  console.log(`${f}: ${rows.length} QSOs`);
  return rows;
});

const count = (keys) => {
  const out = {};
  for (const k of keys) if (k) out[k] = (out[k] ?? 0) + 1;
  return Object.fromEntries(Object.entries(out).sort((a, b) => b[1] - a[1]));
};

const dates = qsos
  .map((q) => q.date)
  .filter((d) => /^\d{8}$/.test(d ?? ''))
  .sort();
const iso = (d) => (d ? `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}` : null);

const worked = {
  qsos: qsos.length,
  from: iso(dates[0]),
  to: iso(dates.at(-1)),
  stations: Object.keys(count(qsos.map((q) => q.station))),
  grids: count(qsos.map((q) => q.grid)),
  entities: count(qsos.map((q) => q.entity))
};

writeFileSync(OUT, `${JSON.stringify(worked, null, 2)}\n`);
console.log(
  `→ data/worked.json: ${worked.qsos} QSOs, ${Object.keys(worked.grids).length} grids, ` +
    `${Object.keys(worked.entities).length} entities, ${worked.from} … ${worked.to}`
);
