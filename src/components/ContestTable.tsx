import { ArrowUpRight, Medal } from 'lucide-react';
import { dateRange, thousands } from '@/lib/format';
import ContestFilters from '@/components/ContestFilters';
import { hasPodium, longPlacing, ordinal, primaryPlacing, shortPlacing } from '@/lib/placings';
import { isOwnCall, type ContestEntry, type Placing } from '@/lib/station';

/** Unknown values: an en dash that says "pending" to hover and to screen readers. */
function Pending() {
  return (
    <span title="Pending: not published yet" className="text-secondary">
      <span aria-hidden>–</span>
      <span className="sr-only">pending</span>
    </span>
  );
}

const num = (n: number | null) => (n === null ? <Pending /> : thousands(n));

const cellLabel = 'label mr-2 md:hidden';

const SCOPE_NAME: Record<Placing['scope'], string> = {
  World: 'World',
  Europe: 'Europe',
  Slovenia: 'Slovenia',
  Category: 'Category',
  Overall: 'Overall'
};

/** "World 5/45 · Europe 3/27 · Slovenia 1/2 (Multi-Single Low)" */
function placingsTooltip(placings: Placing[]) {
  const shared = placings.every((p) => p.category === placings[0].category);
  const parts = placings.map(
    (p) => `${SCOPE_NAME[p.scope]} ${p.place}/${p.of}${shared ? '' : ` (${p.category})`}`
  );
  return `${parts.join(' · ')}${shared ? ` (${placings[0].category})` : ''}`;
}

function PlaceCell({ entry }: { entry: ContestEntry }) {
  const primary = primaryPlacing(entry);

  if (entry.placingsStatus === 'pending' || !primary || !entry.placings) {
    return (
      <div className="col-span-2 text-sm text-secondary md:col-span-1 md:text-right">
        <span className={cellLabel}>Place</span>
        Results pending
      </div>
    );
  }

  const podium = hasPodium(entry);
  const shared = entry.placings.every((p) => p.category === entry.placings![0].category);
  return (
    <div className="col-span-2 md:col-span-1 md:text-right">
      <span className={cellLabel}>Place</span>
      <span
        title={placingsTooltip(entry.placings)}
        className="inline-flex items-center gap-1.5 font-mono text-sm text-primary"
      >
        {podium ? <Medal size={14} className="shrink-0 text-accent" aria-hidden /> : null}
        <span aria-hidden>{shortPlacing(primary)}</span>
      </span>
      <span className="sr-only">
        {podium ? 'Podium: ' : ''}
        {[primary, ...entry.placings.filter((p) => p !== primary)]
          .map((p) => `${longPlacing(p)} (${p.category})`)
          .join('; ')}
      </span>
      {/* full breakdown on the mobile card (desktop shows it in the tooltip) */}
      <ul aria-hidden className="mt-2 space-y-0.5 text-sm text-secondary md:hidden">
        {entry.placings.map((p) => (
          <li key={p.scope}>
            {SCOPE_NAME[p.scope]}: {ordinal(p.place)} of {p.of}
            {shared ? null : <> · {p.category}</>}
          </li>
        ))}
        {shared ? <li>{entry.placings[0].category}</li> : null}
      </ul>
    </div>
  );
}

function ContestRow({ entry }: { entry: ContestEntry }) {
  return (
    <li
      data-mode={entry.mode}
      data-year={entry.start.slice(0, 4)}
      data-podium={hasPodium(entry) ? '' : undefined}
      className="grid grid-cols-2 gap-x-6 gap-y-3 border-b border-border py-6 md:grid-cols-[var(--contest-cols)] md:items-baseline md:gap-x-4"
    >
      <p className="col-span-2 font-mono text-sm text-secondary md:col-span-1">
        {dateRange(entry.start, entry.end)}
      </p>

      <div className="col-span-2 md:col-span-1">
        <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-heading text-xl font-semibold text-primary">
          {entry.name}
          {entry.badge ? (
            <span className="rounded-full border border-accent/50 px-2 py-0.5 font-sans text-xs font-medium text-accent">
              {entry.badge}
            </span>
          ) : null}
        </h3>
        <p className="mt-1 text-sm text-secondary">
          {entry.category ?? (
            <>
              Category <Pending />
            </>
          )}
          {entry.club ? <> · {entry.club}</> : null}
        </p>
        <p className="mt-3 font-mono text-xs leading-relaxed text-secondary">
          {entry.ops.map((op, i) => (
            <span key={op}>
              {i > 0 ? ', ' : ''}
              <span className={isOwnCall(op) ? 'text-accent' : undefined}>{op}</span>
            </span>
          ))}
        </p>
        {entry.note ? <p className="mt-2 text-sm text-secondary">{entry.note}</p> : null}
        {entry.source ? (
          <a
            href={entry.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm text-secondary underline decoration-border underline-offset-4 transition hover:text-accent hover:decoration-accent"
          >
            {entry.scoreType === 'final' ? 'Official results' : 'Claimed score'}:{' '}
            {entry.source.label}
            <ArrowUpRight size={14} aria-hidden />
          </a>
        ) : null}
      </div>

      <p className="font-mono text-sm text-primary">
        <span className={cellLabel}>Call</span>
        {entry.callsign}
      </p>
      <p className="font-mono text-sm text-primary md:text-right">
        <span className={cellLabel}>QSOs</span>
        {num(entry.qsos)}
      </p>
      <div className="col-span-2 font-mono text-sm text-primary md:col-span-1 md:text-right">
        <span className={cellLabel}>Score</span>
        {num(entry.score)}
        {entry.scoreType === 'claimed' && entry.score !== null ? (
          <span
            title="Claimed score, before the sponsor's log check"
            className="ml-2 rounded border border-border px-1.5 py-px font-sans text-xs text-secondary"
          >
            claimed
          </span>
        ) : null}
      </div>
      <PlaceCell entry={entry} />
    </li>
  );
}

export default function ContestTable({ entries }: { entries: ContestEntry[] }) {
  return (
    <div className="contest-table">
      <ContestFilters
        listId="contest-rows"
        podiumToggleId="podium-only"
        rows={entries.map((e) => ({
          mode: e.mode,
          year: e.start.slice(0, 4),
          podium: hasPodium(e)
        }))}
      >
        {/* Plain checkbox + CSS :has() (globals.css), so it works with JavaScript off */}
        <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-secondary transition hover:border-secondary hover:text-primary has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-primary">
          <input id="podium-only" type="checkbox" autoComplete="off" className="accent-accent" />
          <Medal size={14} className="text-accent" aria-hidden />
          Podiums only
        </label>
      </ContestFilters>
      <div
        aria-hidden
        className="label hidden gap-x-4 border-b border-border pb-3 md:grid md:grid-cols-[var(--contest-cols)]"
      >
        <span>Date</span>
        <span>Contest</span>
        <span>Call</span>
        <span className="text-right">QSOs</span>
        <span className="text-right">Score</span>
        <span className="text-right">Place</span>
      </div>
      <ol id="contest-rows">
        {entries.map((entry) => (
          <ContestRow key={`${entry.name}-${entry.start}`} entry={entry} />
        ))}
      </ol>
    </div>
  );
}
