import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildWorkedMapSvg } from '@/lib/worked-map';

// Rendered once at build time from data/worked.json; served as a static, cacheable file.
export const dynamic = 'force-static';

/** Colours come from the @theme tokens in globals.css, so the map follows the palette. */
function themeColor(css: string, name: string) {
  const value = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{3,8})`))?.[1];
  if (!value) throw new Error(`worked-map: --color-${name} not found in globals.css`);
  return value;
}

export function GET() {
  const css = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8');
  const svg = buildWorkedMapSvg({
    card: themeColor(css, 'card'),
    cardStrong: themeColor(css, 'card-strong'),
    border: themeColor(css, 'border'),
    secondary: themeColor(css, 'secondary'),
    accent: themeColor(css, 'accent'),
    primary: themeColor(css, 'primary')
  });
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
