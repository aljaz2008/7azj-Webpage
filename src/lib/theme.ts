// Server-only: reads colour tokens from the @theme block in globals.css, for outputs that
// can't use CSS variables (the generated OG image and the static worked-map SVG).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const css = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8');

export function themeColor(name: string) {
  const value = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{3,8})`))?.[1];
  if (!value) throw new Error(`--color-${name} not found in globals.css`);
  return value;
}
