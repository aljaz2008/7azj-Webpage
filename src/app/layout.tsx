import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import {
  CALLSIGN,
  EMAIL,
  FORMER_CALLSIGN,
  LINKEDIN_URL,
  LOCATION,
  LOCATOR,
  OWNER_NAME,
  QRZ_URL,
  SITE_URL
} from '@/lib/station';
import { themeColor } from '@/lib/theme';
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

const description = `${OWNER_NAME}, ${CALLSIGN} (ex ${FORMER_CALLSIGN}): contest operator and RF/electronics maker in ${LOCATION}. Contest results, station, QSL info and projects.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${CALLSIGN} | ${OWNER_NAME}, amateur radio`,
  description,
  keywords: [
    CALLSIGN,
    FORMER_CALLSIGN,
    LOCATOR,
    'amateur radio',
    'ham radio',
    'contesting',
    'Slovenia'
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    siteName: CALLSIGN,
    title: `${CALLSIGN} | ${OWNER_NAME}`,
    description,
    url: '/',
    locale: 'en_GB'
  },
  twitter: { card: 'summary_large_image', title: `${CALLSIGN} | ${OWNER_NAME}`, description }
};

export const viewport: Viewport = {
  themeColor: themeColor('background')
};

// schema.org Person, so search engines connect the name, both callsigns and the profiles.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: OWNER_NAME,
  alternateName: [CALLSIGN, FORMER_CALLSIGN],
  url: SITE_URL,
  email: `mailto:${EMAIL}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Ljubljana', addressCountry: 'SI' },
  affiliation: { '@type': 'EducationalOrganization', name: 'Vegova Ljubljana' },
  knowsAbout: ['Amateur radio', 'Radio contesting', 'RF engineering', 'Embedded systems'],
  sameAs: [QRZ_URL, LINKEDIN_URL]
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
        <script
          type="application/ld+json"
          // JSON.stringify output only; '<' escaped so the payload can't close the tag
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c')
          }}
        />
        {children}
      </body>
    </html>
  );
}
