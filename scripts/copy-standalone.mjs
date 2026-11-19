// Copies static assets next to the standalone server so `npm start` works locally.
// (The Docker image copies these itself.)
import { cpSync, existsSync } from 'node:fs';

if (existsSync('.next/standalone')) {
  cpSync('.next/static', '.next/standalone/.next/static', { recursive: true });
  cpSync('public', '.next/standalone/public', { recursive: true });
}
