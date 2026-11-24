import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { CALLSIGN, FORMER_CALLSIGN, LOCATION, LOCATOR, OWNER_NAME } from '@/lib/station';
import { themeColor } from '@/lib/theme';

export const alt = `${CALLSIGN}: amateur radio station of ${OWNER_NAME}, ${LOCATION}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
// Static export: rendered once at build into out/
export const dynamic = 'force-static';

// Same typography as the hero. ImageResponse needs TTF/OTF, so these are static
// instances of the self-hosted variable fonts (see src/fonts).
const fonts = join(process.cwd(), 'src/fonts');
const display = readFile(join(fonts, 'BricolageGrotesque-ExtraBold-og.ttf'));
const mono = readFile(join(fonts, 'JetBrainsMono-Regular-og.ttf'));

export default async function Image() {
  const [bg, fg, muted, accent, border] = [
    'background',
    'primary',
    'secondary',
    'accent',
    'border'
  ].map(themeColor);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: bg,
        color: fg
      }}
    >
      <div style={{ display: 'flex', fontFamily: 'JetBrains Mono', fontSize: 28, color: muted }}>
        Amateur radio, {LOCATION}
      </div>
      <div
        style={{
          display: 'flex',
          fontFamily: 'Bricolage Grotesque',
          fontSize: 300,
          lineHeight: 0.85,
          letterSpacing: '-0.04em'
        }}
      >
        {CALLSIGN.slice(0, -1)}
        <span style={{ color: accent }}>{CALLSIGN.slice(-1)}</span>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 56,
          paddingTop: 28,
          borderTop: `2px solid ${border}`,
          fontFamily: 'JetBrains Mono',
          fontSize: 28,
          color: muted
        }}
      >
        <span style={{ color: fg }}>{OWNER_NAME}</span>
        <span>{LOCATOR}</span>
        <span>ex {FORMER_CALLSIGN}</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Bricolage Grotesque', data: await display, weight: 800, style: 'normal' },
        { name: 'JetBrains Mono', data: await mono, weight: 400, style: 'normal' }
      ]
    }
  );
}
