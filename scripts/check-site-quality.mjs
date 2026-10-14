import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const production = process.env.PUBLIC_SITE_MODE === 'production';
const base = production ? '/' : '/personal-website/';
const origin = production ? 'https://arifmuamar.com' : 'https://arifmuamardev.github.io';
const failures = [];
let inspected = 0;
let bridges = 0;

async function walk(directory) {
  const out = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    out.push(...(entry.isDirectory() ? await walk(target) : [target]));
  }
  return out;
}

function attributes(tag) {
  const attrs = {};
  for (const [, key, value] of tag.matchAll(/([:\w-]+)\s*=\s*["']([^"']*)["']/g)) attrs[key.toLowerCase()] = value;
  return attrs;
}
function fail(file, issue) { failures.push(`${file}: ${issue}`); }
function metas(html) { return [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => attributes(match[0])); }

for (const file of (await walk(root)).filter(f => f.endsWith('.html'))) {
  const rel = path.relative(root, file);
  const html = await fs.readFile(file, 'utf8');
  const tags = metas(html);
  const meta = (name) => tags.find(t => t.name === name)?.content;
  const canonical = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => attributes(m[0])).find(a => a.rel === 'canonical')?.href;
  const bridge = /<meta\b[^>]*http-equiv=["']refresh["']/i.test(html);
  inspected++;
  if (!/<html\b[^>]*\blang=["']en["']/i.test(html)) fail(rel, 'missing HTML language');
  if (!canonical?.startsWith(`${origin}${base}`)) fail(rel, `canonical does not use ${origin}${base}`);
  if (!/<meta\b[^>]*name=["']viewport["']/i.test(html)) fail(rel, 'missing responsive viewport');
  if (!meta('robots')) fail(rel, 'missing robots meta');
  if (bridge) {
    bridges++;
    if (!meta('robots')?.includes('noindex')) fail(rel, 'migration bridge must be noindex');
    if (!/<a\b[^>]+href=/.test(html)) fail(rel, 'migration bridge lacks fallback link');
    continue;
  }
  if (!/<a\b[^>]+href=["']#main-content["']/.test(html)) fail(rel, 'missing skip link');
  if (!/<main\b[^>]*id=["']main-content["']/.test(html)) fail(rel, 'missing main landmark');
  if ((html.match(/<h1\b/gi) || []).length !== 1) fail(rel, 'expected exactly one h1');
  if (!/<title\b[^>]*>\s*[^<\s]/i.test(html)) fail(rel, 'missing page title');
  if (!meta('description')?.trim()) fail(rel, 'missing meta description');
  if (!tags.some(t => t.property === 'og:description')) fail(rel, 'missing Open Graph description');
  if (production ? meta('robots')?.includes('noindex') : !meta('robots')?.includes('noindex')) fail(rel, 'invalid robots policy for deployment mode');
  for (const tag of html.match(/<img\b[^>]*>/gi) || []) {
    if (!Object.hasOwn(attributes(tag), 'alt')) fail(rel, 'image missing alt attribute');
  }
  for (const tag of html.match(/<a\b[^>]*>/gi) || []) {
    const a = attributes(tag);
    if (a.target === '_blank' && !/\bnoopener\b/.test(a.rel || '')) fail(rel, 'target=_blank without rel=noopener');
  }
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) fail(rel, `duplicate HTML ids: ${[...new Set(duplicates)].join(', ')}`);
}

for (const required of [
  'robots.txt', 'rss.xml', 'feed.xml', 'sitemap-index.xml', 'favicon.svg',
  'files/arif-muamar-cv.pdf', 'portfolio/index.html', 'portfolio/pilketos/index.html',
  'category/blog/index.html', 'author/arifmuamar/index.html', 'feed/index.html',
]) {
  try { await fs.access(path.join(root, required)); } catch { fail('dist', `missing required artifact: ${required}`); }
}

const robots = await fs.readFile(path.join(root, 'robots.txt'), 'utf8');
if (production ? !robots.includes('Sitemap:') : !robots.includes(`Disallow: ${base}`)) fail('robots.txt', 'unexpected robots policy');
if (failures.length) {
  console.error(`Site quality FAIL (${failures.length} problems):\n${failures.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Site quality PASS: ${inspected} HTML files, ${bridges} migration bridges, ${production ? 'production' : 'preview'} crawl policy.`);
}
