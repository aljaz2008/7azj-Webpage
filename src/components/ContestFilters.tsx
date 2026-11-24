'use client';

import { useEffect, useState } from 'react';

const MODE_FILTERS: { label: string; modes: string[] | null }[] = [
  { label: 'All modes', modes: null },
  { label: 'SSB', modes: ['SSB'] },
  { label: 'RTTY', modes: ['RTTY'] },
  { label: 'Digital', modes: ['FT8/FT4'] },
  { label: 'Mixed', modes: ['Mixed'] }
];
const ALL_YEARS = 'All years';

function FilterGroup({
  name,
  options,
  value,
  onChange
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="group" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          onClick={() => onChange(option)}
          className="rounded-full border border-border px-3 py-1.5 text-sm text-secondary transition hover:border-secondary hover:text-primary aria-pressed:border-accent aria-pressed:bg-accent-soft aria-pressed:text-primary"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

/**
 * Filters the server-rendered rows in #{listId} by their data-mode / data-year attributes,
 * so the rows themselves never need hydrating. Hidden when scripting is off (.js-only),
 * in which case every row simply stays visible.
 */
export default function ContestFilters({
  listId,
  rows
}: {
  listId: string;
  /** mode and year of each row, in list order */
  rows: { mode: string; year: string }[];
}) {
  const [mode, setMode] = useState(MODE_FILTERS[0].label);
  const [year, setYear] = useState(ALL_YEARS);

  const years = Array.from(new Set(rows.map((r) => r.year)));
  const modes = MODE_FILTERS.find((f) => f.label === mode)?.modes ?? null;
  const matches = rows.map(
    (r) => (!modes || modes.includes(r.mode)) && (year === ALL_YEARS || r.year === year)
  );
  const total = rows.length;
  const visible = matches.filter(Boolean).length;

  // Sync the server-rendered rows with the current filter
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(`#${listId} > li`).forEach((row, i) => {
      row.hidden = !matches[i];
    });
  }, [listId, matches]);

  return (
    <div className="js-only mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-3">
        <FilterGroup
          name="Filter by mode"
          options={MODE_FILTERS.map((f) => f.label)}
          value={mode}
          onChange={setMode}
        />
        <FilterGroup
          name="Filter by year"
          options={[ALL_YEARS, ...years]}
          value={year}
          onChange={setYear}
        />
      </div>
      <p aria-live="polite" className="label">
        {visible === 0
          ? 'No entries match. Pick another mode or year.'
          : `${visible} of ${total} entries`}
      </p>
    </div>
  );
}
