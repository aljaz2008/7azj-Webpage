// Geometry and data for the worked map. Server-only: imported by the static
// /worked-map.svg route and by the WorkedMap server component, never by client code.
import { geoAzimuthalEquidistant, geoCircle, geoGraticule, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { FeatureCollection, Geometry } from 'geojson';
import type { GeometryCollection, Topology } from 'topojson-specification';
import countries110m from 'world-atlas/countries-110m.json';
import worked from '../../data/worked.json';
import { thousands } from '@/lib/format';
import { LOCATOR } from '@/lib/station';

/**
 * DXCC entity (as logged) → Natural Earth 110m country it sits in. Only entities that are
 * that country or part of it are mapped; small separate entities (Andaman & Nicobar, BVI,
 * Gibraltar, Monaco, Liechtenstein…) have no polygon at this scale and show as grid dots.
 */
const ENTITY_TO_COUNTRY: Record<string, string> = {
  England: 'United Kingdom',
  Scotland: 'United Kingdom',
  Wales: 'United Kingdom',
  'Northern Ireland': 'United Kingdom',
  'United States': 'United States of America',
  Alaska: 'United States of America',
  'Czech Republic': 'Czechia',
  'Bosnia-Herzegovina': 'Bosnia and Herz.',
  'North Macedonia': 'Macedonia',
  'Dominican Republic': 'Dominican Rep.',
  Sardinia: 'Italy',
  Crete: 'Greece',
  'Canary Islands': 'Spain'
};

export const MAP_SIZE = 640;
/** Map disc radius, leaving room for the bearing ring */
export const MAP_R = MAP_SIZE / 2 - 34;

/** Centre of a Maidenhead locator (2, 4 or 6 characters) as [lon, lat]. */
export function gridCenter(grid: string): [number, number] {
  const g = grid.toUpperCase();
  let lon = (g.charCodeAt(0) - 65) * 20 - 180;
  let lat = (g.charCodeAt(1) - 65) * 10 - 90;
  let w = 20;
  let h = 10;
  if (g.length >= 4) {
    lon += Number(g[2]) * 2;
    lat += Number(g[3]);
    w = 2;
    h = 1;
  }
  if (g.length >= 6) {
    lon += ((g.charCodeAt(4) - 65) * 5) / 60;
    lat += ((g.charCodeAt(5) - 65) * 2.5) / 60;
    w = 5 / 60;
    h = 2.5 / 60;
  }
  return [lon + w / 2, lat + h / 2];
}

const monthYear = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  });

/** "Mar–Nov 2025" or "Nov 2024 – Mar 2025" */
function span(from: string | null, to: string | null) {
  if (!from || !to) return '';
  const [a, b] = [monthYear(from), monthYear(to)];
  if (a === b) return a;
  return from.slice(0, 4) === to.slice(0, 4) ? `${a.split(' ')[0]}–${b}` : `${a} – ${b}`;
}

/** Derived from worked.json, so it stays accurate when logs are added. */
export const workedCaption = `Worked from the ${worked.stations.join(' / ')} log, ${span(worked.from, worked.to)} (${thousands(worked.qsos)} QSOs)`;

export const workedStats = {
  entities: Object.keys(worked.entities).length,
  grids: Object.keys(worked.grids).length,
  qsos: worked.qsos
};

type Colors = {
  card: string;
  cardStrong: string;
  border: string;
  secondary: string;
  accent: string;
  primary: string;
};

/** The base map (land, worked countries, rings, grid dots) as a standalone SVG document. */
export function buildWorkedMapSvg(c: Colors) {
  const home = gridCenter(LOCATOR);
  const projection = geoAzimuthalEquidistant()
    .rotate([-home[0], -home[1]])
    .clipAngle(179.9)
    .scale(MAP_R / Math.PI)
    .translate([MAP_SIZE / 2, MAP_SIZE / 2])
    .precision(2);
  const path = geoPath(projection).digits(0);

  const topo = countries110m as unknown as Topology<{
    countries: GeometryCollection<{ name: string }>;
  }>;
  const land = feature(topo, topo.objects.countries) as FeatureCollection<
    Geometry,
    { name: string }
  >;
  const workedCountries = new Set(
    Object.keys(worked.entities).map((e) => ENTITY_TO_COUNTRY[e] ?? e)
  );
  const pick = (yes: boolean) => ({
    type: 'FeatureCollection' as const,
    features: land.features.filter((f) => workedCountries.has(f.properties.name) === yes)
  });

  const rings = [5000, 10000, 15000]
    .map((km) =>
      path(
        geoCircle()
          .center(home)
          .radius(km / 111.195)()
      )
    )
    .join('');

  const dots = Object.entries(worked.grids as Record<string, number>)
    .map(([grid, n]) => {
      const p = projection(gridCenter(grid));
      return p
        ? `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${n >= 10 ? 2.6 : 1.8}"/>`
        : '';
    })
    .join('');

  const mid = MAP_SIZE / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MAP_SIZE} ${MAP_SIZE}" width="${MAP_SIZE}" height="${MAP_SIZE}">
<circle cx="${mid}" cy="${mid}" r="${MAP_R}" fill="${c.card}"/>
<path d="${path(geoGraticule().step([30, 30])())}" fill="none" stroke="${c.border}" stroke-opacity="0.6" stroke-width="0.5"/>
<path d="${path(pick(false))}" fill="${c.cardStrong}" stroke="${c.border}" stroke-width="0.5"/>
<path d="${path(pick(true))}" fill="${c.accent}" fill-opacity="0.2" stroke="${c.accent}" stroke-opacity="0.5" stroke-width="0.5"/>
<path d="${rings}" fill="none" stroke="${c.secondary}" stroke-opacity="0.3" stroke-dasharray="2 4" stroke-width="0.75"/>
<g fill="${c.accent}">${dots}</g>
<circle cx="${mid}" cy="${mid}" r="4" fill="${c.primary}"/>
<circle cx="${mid}" cy="${mid}" r="${MAP_R}" fill="none" stroke="${c.border}"/>
</svg>`;
}
