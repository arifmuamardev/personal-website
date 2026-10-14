/**
 * Export the exact public profile/CV objects used by Astro for a PDF generator.
 * Temporary JSON remains outside the repository and is not committed.
 * Node 24 (GitHub Actions) supports TypeScript type stripping for these
 * data-only modules. No parsing of private LaTeX CV files takes place.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { profile } from '../src/data/profile.ts';
import { publicCv } from '../src/data/public-cv.ts';

const filename = process.argv[2];
if (!filename) throw new Error('Usage: node scripts/export-public-cv-data.mjs /tmp/public-cv-data.json');
mkdirSync(dirname(filename), { recursive: true });
writeFileSync(filename, JSON.stringify({ profile, publicCv }, null, 2) + '\n', { mode: 0o600 });
console.log('Exported curated public CV data for PDF build.');
