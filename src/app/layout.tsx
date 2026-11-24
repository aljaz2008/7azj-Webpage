import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Providers from '@/components/Providers';
import { CALLSIGN, FORMER_CALLSIGN, OWNER_NAME } from '@/lib/station';
import './globals.css';

// Self-hosted (OFL) so builds work offline and the CSP never has to allow a font host.
// Subset to Latin + Latin Extended; Bricolage is pinned at opsz 96 / wdth 100,
// which is what the Google Fonts build of it served before.
const bricolage = localFont({
  src: '../fonts/BricolageGrotesque-Variable.woff2',
  weight: '200 800',
  variable: '--font-bricolage',
  display: 'swap'
});

const plexSans = localFont({
  src: '../fonts/IBMPlexSans-Variable.woff2',
  weight: '400 600',
  variable: '--font-plex-sans',
  display: 'swap'
});

const jetBrainsMono = localFont({
  src: '../fonts/JetBrainsMono-Variable.woff2',
  weight: '100 800',
  variable: '--font-jetbrains-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  title: `${CALLSIGN} | Amateur Radio Operator`,
  description: `Personal website of ${OWNER_NAME} (${CALLSIGN}, ex ${FORMER_CALLSIGN}), featuring RF experiments, contesting and station projects.`,
  keywords: [CALLSIGN, FORMER_CALLSIGN, 'amateur radio', 'ham radio', 'contesting', 'Slovenia'],
  icons: {
    icon: '/images/favicon.png'
  }
};

export const viewport: Viewport = {
  themeColor: '#0a0c0f'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${plexSans.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
