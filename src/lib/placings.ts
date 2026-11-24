import type { ContestEntry, Placing } from '@/lib/station';

/** 1 → "1st", 2 → "2nd", 11 → "11th", 22 → "22nd", 112 → "112th" */
export function ordinal(n: number) {
  const tens = n % 100;
  if (tens >= 11 && tens <= 13) return `${n}th`;
  return `${n}${{ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] ?? 'th'}`;
}

const SHORT_SCOPE: Record<Placing['scope'], string> = {
  Europe: 'EU',
  Category: 'cat.',
  World: 'World',
  Slovenia: 'S5',
  Overall: 'overall'
};

const LONG_SCOPE: Record<Placing['scope'], string> = {
  Europe: 'in Europe',
  Category: 'in category',
  World: 'in the world',
  Slovenia: 'in Slovenia',
  Overall: 'overall'
};

/** Table cell text: "3rd EU", "5th cat.", "1st S5" */
export const shortPlacing = (p: Placing) => `${ordinal(p.place)} ${SHORT_SCOPE[p.scope]}`;

/** Readable text: "3rd in Europe of 27" */
export const longPlacing = (p: Placing) => `${ordinal(p.place)} ${LONG_SCOPE[p.scope]} of ${p.of}`;

/** The single placing shown in the table: Europe, otherwise Category, otherwise World. */
export function primaryPlacing(entry: ContestEntry): Placing | undefined {
  const by = (scope: Placing['scope']) => entry.placings?.find((p) => p.scope === scope);
  return by('Europe') ?? by('Category') ?? by('World') ?? entry.placings?.[0];
}

/**
 * Worth an amber marker: top three at World, Europe or Category level in a field of at
 * least three. Slovenia-only and one/two-entrant categories ("1/1", "1/2") are true but
 * not impressive, so they stay in the tooltip only.
 */
export const isPodium = (p: Placing) =>
  (p.scope === 'World' || p.scope === 'Europe' || p.scope === 'Category') &&
  p.place <= 3 &&
  p.of >= 3;

export const hasPodium = (entry: ContestEntry) => entry.placings?.some(isPodium) ?? false;

const SHORT_CATEGORY: Record<string, string> = {
  'Multi-Single Low': 'M/S Low',
  'Multi-Single High': 'M/S High',
  'Multi-Two': 'M/2',
  'Multi-Multi': 'M/M',
  'Single-Op High': 'SO High',
  'Single-Op Low': 'SO Low'
};
export const shortCategory = (c: string) => SHORT_CATEGORY[c] ?? c;

/**
 * Best World/Europe placing across all entries (fields of 3+): lowest place wins; on a tie
 * World beats Europe, then the bigger field wins.
 */
export function bestPlacing(entries: ContestEntry[]) {
  let best: { entry: ContestEntry; placing: Placing } | null = null;
  for (const entry of entries) {
    for (const p of entry.placings ?? []) {
      if ((p.scope !== 'World' && p.scope !== 'Europe') || p.of < 3) continue;
      const b = best?.placing;
      const better =
        !b ||
        p.place < b.place ||
        (p.place === b.place && p.scope === 'World' && b.scope === 'Europe') ||
        (p.place === b.place && p.scope === b.scope && p.of > b.of);
      if (better) best = { entry, placing: p };
    }
  }
  return best;
}
