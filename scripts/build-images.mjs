#!/usr/bin/env node
// Pre-sizes the site's images at build time (the static export has no image optimizer).
//
//   node scripts/build-images.mjs        (also runs as `prebuild`)
//
// Sources live in images/ (not public/, so originals don't ship). For each one this writes
// WebP + JPEG at several widths to public/img/ and records the sizes in
// src/generated/images.json, which <Picture> reads. An image is only re-encoded when its
// source changes (sha1 recorded in the manifest), so repeated builds are cheap and the
// committed outputs stay byte-identical.

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';

const root = new URL('..', import.meta.url).pathname;
const SRC = join(root, 'images');
const OUT = join(root, 'public/img');
const MANIFEST = join(root, 'src/generated/images.json');

const MAX_WIDTH = 2000;
const STEPS = [480, 800, 1200, 1600, MAX_WIDTH];

mkdirSync(OUT, { recursive: true });
mkdirSync(join(root, 'src/generated'), { recursive: true });

const previous = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
const manifest = {};

for (const file of readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()) {
  const name = basename(file, extname(file)).toLowerCase();
  const input = readFileSync(join(SRC, file));
  const hash = createHash('sha1').update(input).digest('hex');

  // auto-orient, then measure the result
  const base = sharp(input).rotate();
  const { width, height } = await base.clone().toBuffer({ resolveWithObject: true }).then((r) => r.info);
  const top = Math.min(width, MAX_WIDTH);
  const widths = [...STEPS.filter((w) => w < top), top];
  const entry = { width: top, height: Math.round((height * top) / width), widths, hash };

  const fresh =
    previous[name]?.hash === hash &&
    widths.every((w) => ['webp', 'jpg'].every((ext) => existsSync(join(OUT, `${name}-${w}.${ext}`))));

  if (!fresh) {
    for (const old of readdirSync(OUT).filter((f) => f.startsWith(`${name}-`))) rmSync(join(OUT, old));
    for (const w of widths) {
      const resized = base.clone().resize({ width: w });
      // no withMetadata(): EXIF (GPS, camera) is always dropped
      await resized.clone().webp({ quality: 74, effort: 6 }).toFile(join(OUT, `${name}-${w}.webp`));
      await resized
        .clone()
        .flatten({ background: '#ffffff' })
        .jpeg({ quality: 78, progressive: true, mozjpeg: true })
        .toFile(join(OUT, `${name}-${w}.jpg`));
    }
    console.log(`${file}: ${widths.join(', ')} px`);
  }
  manifest[name] = entry;
}

writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
