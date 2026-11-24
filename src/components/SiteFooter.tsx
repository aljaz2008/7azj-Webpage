import { CALLSIGN, EMAIL, FORMER_CALLSIGN, OWNER_NAME } from '@/lib/station';

export default function SiteFooter() {
  return (
    <footer className="px-6 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-border py-10 text-sm text-secondary">
        <p>
          © {new Date().getFullYear()} {OWNER_NAME},{' '}
          <a
            href={`mailto:${EMAIL}`}
            className="underline decoration-border underline-offset-4 transition hover:text-accent hover:decoration-accent"
          >
            {EMAIL}
          </a>
        </p>
        <p className="font-mono text-xs">
          {CALLSIGN} · ex {FORMER_CALLSIGN} · 73
        </p>
      </div>
    </footer>
  );
}
