# S58Q Personal Website

Personal website for amateur radio operator **S58Q** (ex S57AZJ, callsign changed October 2026) — **Aljaž Žugič Jehart**.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript 6
- Tailwind CSS 4 (CSS-first config in `src/app/globals.css`)
- Framer Motion
- Three.js + React Three Fiber 9 + Three Globe
- MDX articles for project popups
- ESLint 10 (flat config)

## Editing content

| What | Where |
| --- | --- |
| Callsign, name, locator, contest results | `src/lib/station.ts` |
| Page sections (about, school, setup, contact) | `src/app/page.tsx` |
| Projects list | `src/lib/projects.ts` |
| Project articles | `src/content/projects/*.mdx` |
| Colors and fonts | `@theme` block in `src/app/globals.css` |

Contest entries are sorted newest-first automatically. Your own callsign (current or former) is highlighted in operator lists.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run typecheck
npm run build
npm audit
```

## Production

```bash
npm run build
npm run start
```

The Docker image (`dockerfile`) builds a standalone Next.js server and runs it as the unprivileged `node` user on port 3000. GitHub Actions publishes it to `ghcr.io/aljaz2008/7azj-webpage:latest` on every push to `main`.

## Security notes

- Security headers (CSP, HSTS, `X-Frame-Options`, `nosniff`, Referrer/Permissions policy) are set in `next.config.mjs`.
- The CSP allows only same-origin resources: fonts are self-hosted by `next/font`, and the globe texture lives in `public/images/globe/`. If you add an external image, script or embed, you must allow it in the CSP.
- Remote image optimization is disabled (no `images.remotePatterns`), so `/_next/image` can't be abused as an open proxy.
