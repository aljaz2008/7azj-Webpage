// Server component. The base map is a static SVG built at build time (/worked-map.svg,
// lazy-loaded); only the bearing ring is inline so its labels use the site's mono font.
import { LOCATOR } from '@/lib/station';
import { MAP_R, MAP_SIZE, workedCaption, workedStats } from '@/lib/worked-map';

const mid = MAP_SIZE / 2;
const point = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return [mid + r * Math.sin(a), mid - r * Math.cos(a)] as const;
};
const compass: Record<number, string> = { 0: 'N', 90: 'E', 180: 'S', 270: 'W' };
const bearings = Array.from({ length: 36 }, (_, i) => i * 10);

export default function WorkedMap() {
  return (
    <figure className="mx-auto max-w-2xl">
      <div className="relative aspect-square">
        {/* eslint-disable-next-line @next/next/no-img-element -- static build-time SVG, nothing to optimise */}
        <img
          src="/worked-map.svg"
          width={MAP_SIZE}
          height={MAP_SIZE}
          loading="lazy"
          decoding="async"
          alt={`Azimuthal equidistant map centred on ${LOCATOR}: ${workedStats.entities} DXCC entities and ${workedStats.grids} grid squares worked, most of them in Europe and North America.`}
          className="absolute inset-0 h-full w-full"
        />
        <svg
          viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}
          aria-hidden
          className="absolute inset-0 h-full w-full"
        >
          {bearings.map((deg) => {
            const major = deg % 30 === 0;
            const [x1, y1] = point(deg, MAP_R);
            const [x2, y2] = point(deg, MAP_R + (major ? 8 : 4));
            const [lx, ly] = point(deg, MAP_R + 20);
            return (
              <g key={deg}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className="stroke-secondary"
                  strokeWidth={major ? 1 : 0.5}
                />
                {major ? (
                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={`font-mono text-sm ${compass[deg] ? 'fill-primary' : 'fill-secondary max-sm:hidden'}`}
                  >
                    {compass[deg] ?? `${deg}°`}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>

      <figcaption className="mt-6 grid gap-4 text-sm text-secondary sm:grid-cols-[1fr_auto] sm:items-baseline">
        <p>
          {workedCaption}. Countries are shaded by DXCC entity; entities too small for this outline
          map show only as grid dots. Rings at 5,000 km steps, bearings from {LOCATOR}.
        </p>
        <dl className="flex gap-6 font-mono text-primary">
          <div>
            <dt className="label">Entities</dt>
            <dd>{workedStats.entities}</dd>
          </div>
          <div>
            <dt className="label">Grids</dt>
            <dd>{workedStats.grids}</dd>
          </div>
        </dl>
      </figcaption>
    </figure>
  );
}
