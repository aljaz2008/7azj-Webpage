#!/usr/bin/env node
// Preview the static export the way the host serves it: out/<path>/index.html for
// directories, a trailing-slash redirect, and out/404.html for anything missing.
// No dependencies. Headers/redirects from .htaccess are NOT applied here.
//
//   npm run build && npm run preview      ->  http://localhost:4173

import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const ROOT = new URL('../out/', import.meta.url).pathname;
const PORT = Number(process.env.PORT ?? 4173);
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

if (!existsSync(ROOT)) {
  console.error('out/ not found: run `npm run build` first.');
  process.exit(1);
}

createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  let file = join(ROOT, path);

  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!url.pathname.endsWith('/')) {
      res.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end();
      return;
    }
    file = join(file, 'index.html');
  }

  const found = existsSync(file) && statSync(file).isFile() && file.startsWith(ROOT);
  const target = found ? file : join(ROOT, '404.html');
  // extension-less social cards are PNGs (.htaccess does the same with ForceType)
  const type = /(opengraph|twitter)-image$/.test(target)
    ? 'image/png'
    : (TYPES[extname(target)] ?? 'application/octet-stream');
  res.writeHead(found ? 200 : 404, { 'Content-Type': type });
  createReadStream(target).pipe(res);
}).listen(PORT, () => console.log(`Serving out/ on http://localhost:${PORT}`));
