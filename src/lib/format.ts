const day = (iso: string) => new Date(`${iso}T00:00:00Z`);

const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  day(iso).toLocaleDateString('en-GB', { ...opts, timeZone: 'UTC' });

/** "24–25 Oct 2026", "30 Nov – 1 Dec 2024" or "19 Jul 2026" */
export function dateRange(start: string, end?: string) {
  if (!end) return fmt(start, { day: 'numeric', month: 'short', year: 'numeric' });
  const sameMonth = start.slice(0, 7) === end.slice(0, 7);
  return sameMonth
    ? `${fmt(start, { day: 'numeric' })}–${fmt(end, { day: 'numeric', month: 'short', year: 'numeric' })}`
    : `${fmt(start, { day: 'numeric', month: 'short' })} – ${fmt(end, { day: 'numeric', month: 'short', year: 'numeric' })}`;
}

export const thousands = (n: number) => n.toLocaleString('en-US');

/** 11682792 → "11.68M"; below a million keeps thousands separators */
export const compact = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(2)}M` : thousands(n);
