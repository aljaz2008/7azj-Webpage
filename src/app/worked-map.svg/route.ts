import { themeColor } from '@/lib/theme';
import { buildWorkedMapSvg } from '@/lib/worked-map';

// Rendered once at build time from data/worked.json; served as a static, cacheable file.
export const dynamic = 'force-static';

// Colours come from the @theme tokens in globals.css, so the map follows the palette.
export function GET() {
  const svg = buildWorkedMapSvg({
    card: themeColor('card'),
    cardStrong: themeColor('card-strong'),
    border: themeColor('border'),
    secondary: themeColor('secondary'),
    accent: themeColor('accent'),
    primary: themeColor('primary')
  });
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
