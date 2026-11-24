import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import { CALLSIGN } from '@/lib/station';

// Exported as out/404.html; .htaccess serves it via ErrorDocument 404.
export const metadata: Metadata = {
  title: `Page not found | ${CALLSIGN}`,
  robots: { index: false }
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70svh] items-center px-6 pt-24 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <p className="label">404</p>
          <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-primary md:text-7xl">
            No signal on this frequency.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-secondary">
            This page doesn&apos;t exist. If you followed a link from the old s57azj.eu site, the
            content may have moved.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm">
            <Link
              href="/"
              className="rounded-full bg-accent px-6 py-3 font-semibold text-background transition hover:brightness-110"
            >
              Go to the home page
            </Link>
            <Link
              href="/#contests"
              className="self-center text-primary underline decoration-border underline-offset-8 transition hover:decoration-accent"
            >
              Contest results
            </Link>
            <Link
              href="/#qsl"
              className="self-center text-primary underline decoration-border underline-offset-8 transition hover:decoration-accent"
            >
              QSL info
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
