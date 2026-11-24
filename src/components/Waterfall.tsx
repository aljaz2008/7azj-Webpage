'use client';

import { useEffect, useRef } from 'react';

/**
 * A dim panadapter waterfall behind the hero: noise floor plus a handful of SSB, RTTY,
 * CW and FT8-style traces drifting down. Purely decorative (aria-hidden).
 *
 * - Low internal resolution (one cell ≈ CELL css px), upscaled smoothly by the browser
 * - Colour comes from the --color-accent token, read at runtime
 * - Pauses when the hero is offscreen or the tab is hidden
 * - prefers-reduced-motion: a single pre-rendered still frame, no timer
 */

const CELL = 6; // css px per waterfall cell
const ROW_MS = 120; // one new row every 120 ms
const PEAK = 0.3; // alpha of the strongest signal
const NOISE = 0.1; // alpha ceiling of the noise floor

type Kind = 'ssb' | 'rtty' | 'cw' | 'ft8';
type Signal = { x: number; kind: Kind; on: boolean; left: number; level: number };

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

function nextDuration(kind: Kind, on: boolean) {
  switch (kind) {
    case 'ssb':
      return on ? rand(15, 70) : rand(8, 50);
    case 'rtty':
      return on ? rand(30, 120) : rand(20, 80);
    case 'cw':
      return on ? rand(1, 3) : rand(1, 4);
    case 'ft8':
      return 13; // 15 s slots: ~13 rows on, ~13 off
  }
}

function makeSignals(cols: number): Signal[] {
  const count = Math.max(4, Math.round(cols / 14));
  return Array.from({ length: count }, () => {
    const kind = pick<Kind>(['ssb', 'ssb', 'ssb', 'rtty', 'cw', 'ft8']);
    const on = Math.random() < 0.5;
    return {
      x: Math.floor(rand(2, cols - 6)),
      kind,
      on,
      left: nextDuration(kind, on),
      level: rand(0.45, 1)
    };
  });
}

/** One row of intensities in 0..1 */
function nextRow(cols: number, signals: Signal[]) {
  // noise floor: low, smoothed across neighbouring bins so it reads as grain, not sand
  const raw = Float32Array.from({ length: cols }, () => Math.random() ** 2);
  const row = new Float32Array(cols);
  for (let i = 0; i < cols; i += 1) {
    const n = (raw[i - 1] ?? raw[i]) * 0.25 + raw[i] * 0.5 + (raw[i + 1] ?? raw[i]) * 0.25;
    row[i] = n * (NOISE / PEAK);
  }

  for (const s of signals) {
    s.left -= 1;
    if (s.left <= 0) {
      s.on = !s.on;
      s.left = nextDuration(s.kind, s.on);
    }
    if (!s.on) continue;
    const add = (dx: number, v: number) => {
      const i = s.x + dx;
      if (i >= 0 && i < cols) row[i] = Math.max(row[i], v * s.level);
    };
    switch (s.kind) {
      case 'ssb': // ~2.7 kHz of speech: uneven energy across 4 cells
        for (let dx = 0; dx < 4; dx += 1) add(dx, rand(0.35, 1) * (dx === 0 ? 1 : 0.8));
        break;
      case 'rtty': // mark and space, 170 Hz apart
        add(0, rand(0.8, 1));
        add(2, rand(0.8, 1));
        break;
      case 'cw':
        add(0, 1);
        break;
      case 'ft8': // a few stations stacked in one slot
        for (let dx = 0; dx < 5; dx += 2) add(dx, rand(0.5, 0.9));
        break;
    }
  }
  return row;
}

function accentRGB(el: HTMLElement): [number, number, number] {
  const m = getComputedStyle(el).color.match(/\d+(\.\d+)?/g);
  return m ? [Number(m[0]), Number(m[1]), Number(m[2])] : [255, 255, 255];
}

export default function Waterfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const [r, g, b] = accentRGB(canvas);

    let cols = 0;
    let rows = 0;
    let image: ImageData;
    let signals: Signal[] = [];

    const pushRow = () => {
      const data = image.data;
      const stride = cols * 4;
      data.copyWithin(stride, 0, data.length - stride); // scroll everything down one row
      const row = nextRow(cols, signals);
      for (let i = 0; i < cols; i += 1) {
        const o = i * 4;
        data[o] = r;
        data[o + 1] = g;
        data[o + 2] = b;
        data[o + 3] = Math.round(row[i] * PEAK * 255);
      }
    };

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      cols = Math.max(1, Math.ceil(rect.width / CELL));
      rows = Math.max(1, Math.ceil(rect.height / CELL));
      canvas.width = cols;
      canvas.height = rows;
      image = ctx.createImageData(cols, rows);
      signals = makeSignals(cols);
      for (let i = 0; i < rows; i += 1) pushRow(); // start with a full screen of history
      ctx.putImageData(image, 0, 0);
    };

    let timer = 0;
    let visible = true;
    const tick = () => {
      pushRow();
      ctx.putImageData(image, 0, 0);
    };
    const sync = () => {
      const run = visible && !document.hidden && !reduceMotion.matches;
      if (run && !timer) timer = window.setInterval(tick, ROW_MS);
      if (!run && timer) {
        window.clearInterval(timer);
        timer = 0;
      }
    };

    setup();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 200);
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', sync);
    reduceMotion.addEventListener('change', sync);
    sync();

    return () => {
      io.disconnect();
      window.clearInterval(timer);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', sync);
      reduceMotion.removeEventListener('change', sync);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="waterfall text-accent max-md:opacity-50" />;
}
