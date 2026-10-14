import { promises as fs } from 'node:fs';
import path from 'node:path';

const source = path.resolve('src');
async function walk(root) {
  const entries = await fs.readdir(root, { withFileTypes: true });
  return (await Promise.all(entries.map(async e => e.isDirectory() ? walk(path.join(root, e.name)) : [path.join(root, e.name)]))).flat();
}
const errors = [];
const files = (await walk(source)).filter(f => f.endsWith('.astro'));
for (const file of files) {
  const content = await fs.readFile(file, 'utf8');
  for (const m of content.matchAll(/(?:href|src)=(?:"(\/(?!\/)[^"\n]+)"|\{`(\/(?!\/)[^`]+)`\})/g)) {
    errors.push(`${path.relative(source, file)}: root-only link ${m[0]}`);
  }
}
for (const required of ['src/pages/portfolio/index.astro','src/pages/portfolio/pilketos/index.astro','src/pages/robots.txt.ts','src/pages/rss.xml.js','src/pages/feed.xml.js','src/pages/site.webmanifest.ts']) {
  try { await fs.access(required); } catch { errors.push(`${required}: missing`); }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Source audit PASS (${files.length} Astro templates; no unprefixed root links).`);
}
