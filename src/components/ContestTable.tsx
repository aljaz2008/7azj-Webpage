import { ArrowUpRight } from 'lucide-react';
import { dateRange, thousands } from '@/lib/format';
import ContestFilters from '@/components/ContestFilters';
import { isOwnCall, type ContestEntry } from '@/lib/station';

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

function ContestRow({ entry }: { entry: ContestEntry }) {
  return (
    <li
      data-mode={entry.mode}
      data-year={entry.start.slice(0, 4)}
      className="grid grid-cols-2 gap-x-6 gap-y-3 border-b border-border py-6 md:grid-cols-[var(--contest-cols)] md:items-baseline"
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
        {entry.scoreType === 'claimed' ? (
          <span
            title="Claimed score, before the sponsor's log check"
            className="ml-2 rounded border border-border px-1.5 py-px font-sans text-xs text-secondary"
          >
            claimed
          </span>
        ) : null}
        {entry.place ? (
          <p className="mt-1 font-sans text-sm text-accent md:mt-2">{entry.place}</p>
        ) : null}
      </div>
    </li>
  );
}

export default function ContestTable({ entries }: { entries: ContestEntry[] }) {
  return (
    <div>
      <ContestFilters
        listId="contest-rows"
        rows={entries.map((e) => ({ mode: e.mode, year: e.start.slice(0, 4) }))}
      />
      <div
        aria-hidden
        className="label hidden gap-6 border-b border-border pb-3 md:grid md:grid-cols-[var(--contest-cols)]"
      >
        <span>Date</span>
        <span>Contest</span>
        <span>Call</span>
        <span className="text-right">QSOs</span>
        <span className="text-right">Score</span>
      </div>
      <ol id="contest-rows">
        {entries.map((entry) => (
          <ContestRow key={`${entry.name}-${entry.start}`} entry={entry} />
        ))}
      </ol>
    </div>
  );
}
