import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import Providers from '@/components/Providers';
import { CALLSIGN, FORMER_CALLSIGN, OWNER_NAME } from '@/lib/station';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-bricolage'
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans'
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-jetbrains-mono'
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
