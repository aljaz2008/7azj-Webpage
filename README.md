# S58Q personal website

Personal website of amateur radio operator **S58Q** (ex S57AZJ, callsign changed October 2026), **Aljaž Žugič Jehart**. Live at **https://s58q.eu**.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript 6, exported as a **static site** (`output: 'export'`)
- Tailwind CSS 4 (tokens in the `@theme` block of `src/app/globals.css`)
- Self-hosted fonts via `next/font/local` (`src/fonts/`, OFL)
- MDX project write-ups, one page each at `/projects/<slug>/`
- d3-geo + Natural Earth outlines for the worked map (rendered to SVG at build time)
- sharp for build-time image sizing

No Node server runs in production: the build is plain files in `out/`.

## Editing content

| What | Where |
| --- | --- |
| Callsign, name, locator, email, site URL, stations, contest results | `src/lib/station.ts` |
| Page sections | `src/app/page.tsx` |
| Projects (title, summary, tags, image, featured) | `src/lib/projects.ts` |
| Project write-ups | `src/content/projects/<slug>.mdx` |
| Photos and screenshots (sources) | `images/` |
| Colours and fonts | `@theme` block in `src/app/globals.css` |

Contest entries sort newest first. `scoreType` is `'final'` (sponsor's log-checked result) or `'claimed'`; `null` QSOs or score render as a dash marked "pending".

### Images

Put the original in `images/` (JPEG or PNG) and reference it by file name without extension, e.g. `image: { name: 'shack', ... }`. `npm run build` runs `scripts/build-images.mjs` first (also `npm run images`), which writes WebP + JPEG at 480–2000 px to `public/img/` and updates `src/generated/images.json`. Metadata (GPS, camera) is always stripped. Commit the generated files too: CI typechecks before it builds.

### Worked map

Drop ADIF (`.adi`/`.adif`) or Cabrillo (`.log`/`.cbr`) files into `data/logs/` and run `npm run map:data`. That writes `data/worked.json` (QSO counts per grid square and DXCC entity, no other callsigns); commit only that file. Raw logs are gitignored. The map caption is derived from the data.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Checks

```bash
npm run lint
npm run typecheck
npm run build      # static site in out/
npm run preview    # serve out/ like the host does, http://localhost:4173
```

`npm run preview` serves directories, trailing-slash redirects and `404.html` the same way as the host, but doesn't apply `.htaccess` (headers, HTTPS/www redirects).

## Hosting and deploy

- **Host:** NEOSERV shared hosting (LiteSpeed + cPanel). The FTP account's root is `public_html`.
- **Server config:** `public/.htaccess`, copied into `out/` by the build. It handles:
  - HTTP → HTTPS and `www.s58q.eu` → `s58q.eu` (301), leaving `/.well-known/` reachable for AutoSSL
  - Security headers: CSP (same-origin only), HSTS, `nosniff`, `X-Frame-Options`, Referrer-Policy, Permissions-Policy, COOP
  - Caching: `/_next/static/*` immutable for a year, HTML 5 minutes, images one day
  - `ErrorDocument 404 /404.html`
- **Deploy:** `.github/workflows/deploy.yml` runs on every push to `main` (or manually from the Actions tab):
  `npm ci` → lint → typecheck → build → upload `out/` over **FTPS** (explicit TLS, port 21) with `SamKirkland/FTP-Deploy-Action`.
  - Secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (Settings → Secrets and variables → Actions).
  - Uploads are incremental: the action records what it uploaded in `.ftp-deploy-sync-state.json` on the server and only ever replaces or deletes those files. `.well-known/` and `cgi-bin/` are excluded, and `dangerous-clean-slate` is never used.
  - One deploy at a time: a newer push waits for the running upload to finish.
  - FTPS runs with strict certificate checking, so `FTP_SERVER` must be a hostname the server's certificate covers.

**Pushing to `main` deploys to the live site.** Work on a branch and merge when it's ready.

### After deploying, check

```bash
curl -I http://s58q.eu/            # 301 -> https://s58q.eu/
curl -I https://www.s58q.eu/       # 301 -> https://s58q.eu/
curl -I https://s58q.eu/           # 200 + Content-Security-Policy, Strict-Transport-Security, ...
curl -I https://s58q.eu/nope/      # 404 (custom page)
```

## Migrating from s57azj.eu

The site used to run as a Docker container (GHCR + Watchtower behind nginx) on **s57azj.eu**. That setup is retired: the Dockerfile, compose file and container workflow are gone.

- The canonical domain is now **s58q.eu**, and the contact address is **s58q@s58q.eu**.
- To keep old links and search rankings, make s57azj.eu answer with a permanent redirect to the same path on s58q.eu, e.g. in the old vhost:
  `return 301 https://s58q.eu$request_uri;` (nginx), or a cPanel "Redirects" entry if the old domain is added to this account.
- Keep s57azj@s57azj.eu forwarding to the new address for a while, since it's printed on older QSL cards and contest logs.
- Once the redirect is live, stop the old container and Watchtower.

## Security notes

- Every resource is same-origin (fonts, images, map, social cards), so the CSP allows no external hosts. If you add an external image, script or embed, update the CSP in `public/.htaccess`.
- Raw logs (`data/logs/`) are never committed; the repository is public.
