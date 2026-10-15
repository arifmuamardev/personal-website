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
  // Self-contained design labs are public noindex mockups, not deployable site templates.
  // Enforce their safe preview label but do not require production canonical/OG metadata.
  if (rel.startsWith(`design-lab${path.sep}`)) {
    if (!meta('robots')?.includes('noindex')) fail(rel, 'design lab must remain noindex');
    if (!/<title\b[^>]*>\s*[^<\s]/i.test(html)) fail(rel, 'design lab missing page title');
    if (!/<main\b[^>]*id=["']content["']/.test(html)) fail(rel, 'design lab missing main landmark');
    continue;
  }
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
  if (!/data-theme-toggle/.test(html)) fail(rel, 'missing shared light/dark switch');
  if (!/amw-color-theme/.test(html)) fail(rel, 'missing prepaint theme initialization');
  if (!/<meta\b[^>]*name=["']theme-color["']/.test(html)) fail(rel, 'missing theme-color metadata');
  if (!/<main\b[^>]*id=["']main-content["']/.test(html)) fail(rel, 'missing main landmark');
  if ((html.match(/<h1\b/gi) || []).length !== 1) fail(rel, 'expected exactly one h1');
  if (!/<title\b[^>]*>\s*[^<\s]/i.test(html)) fail(rel, 'missing page title');
  if (!meta('description')?.trim()) fail(rel, 'missing meta description');
  if (!tags.some(t => t.property === 'og:description')) fail(rel, 'missing Open Graph description');
  const shouldIndex = production && rel !== '404.html';
  if (shouldIndex ? meta('robots')?.includes('noindex') : !meta('robots')?.includes('noindex')) fail(rel, 'invalid robots policy for deployment mode');
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

for (const [route, marker] of [
  ...['about','research','projects','publications','blog','cv','contact','privacy'].map(route => [route, 'academic-page-intro']),
]) {
  const htmlPath = path.join(root, route, 'index.html');
  try {
    const page = await fs.readFile(htmlPath, 'utf8');
    if (!page.includes(marker)) fail(route, `missing shared rendered template marker: ${marker}`);
  } catch { fail(route, 'missing generated HTML page for template check'); }
}
// Publication metadata must keep type/status visually distinct from
// research area and per-paper keywords in the generated HTML.
for (const publicationPage of [
  'publications/index.html',
  'publications/dynamic-knowledge-intelligence-for-human-ai-collaborative-operational-decision-making/index.html',
]) {
  const page = await fs.readFile(path.join(root, publicationPage), 'utf8');
  const top = page.indexOf('class="publication-classification"');
  const topics = page.indexOf('class="publication-topics"');
  if (top < 0 || topics < top) fail(publicationPage, 'publication type/status must precede separate topics');
  if (!page.includes('publication-topic-label')) fail(publicationPage, 'research area/keywords labels are missing');
  if (!page.includes('publication-keyword-list')) fail(publicationPage, 'paper keywords not displayed as separate row');
}
// Ensure the publication pages expose a styled bibliography, not raw venue text.
for (const [route, marker] of [
  ['publications/index.html', 'ieee-reference'],
  ['publications/dynamic-knowledge-intelligence-for-human-ai-collaborative-operational-decision-making/index.html', 'Recommended IEEE-style citation'],
]) {
  const html = await fs.readFile(path.join(root, route), 'utf8');
  if (!html.includes(marker)) fail(route, `IEEE-inspired bibliography marker ${marker} is missing`);
}
// The website highlights only the owner's credit in authored bibliography.
// Test normal entries, the shortened publisher credit and an eight-author book.
for (const [route, authorText] of [
  ['publications/dynamic-knowledge-intelligence-for-human-ai-collaborative-operational-decision-making/index.html', 'A. M. Wahid'],
  ['publications/economic-decentralization-through-blockchain-opportunities-challenges-and-new-bu/index.html', 'A. Mu’amar'],
  ['publications/multimedia-interaktif/index.html', 'A. M. Wahid'],
]) {
  const html = await fs.readFile(path.join(root, route), 'utf8');
  const boldCredit = /<strong\b[^>]*class="profile-author"[^>]*>(.*?)<\/strong>/g;
  const matched = [...html.matchAll(boldCredit)].some(([, name]) => name === authorText);
  if (!matched) fail(route, 'profile owner byline should be bold: ' + authorText);
}
const mainHome = await fs.readFile(path.join(root, 'index.html'), 'utf8');
if (!/<strong\b[^>]*class="profile-author"[^>]*>[^<]*Wahid<\/strong>/.test(mainHome)) {
  fail('index.html', "featured publication author name should be bold");
}
for (const required of [
  'images/arif-profile.webp',
  'robots.txt', 'rss.xml', 'feed.xml', 'sitemap-index.xml', 'favicon.svg',
  'files/arif-muamar-cv.pdf',
  'category/blog/index.html', 'author/arifmuamar/index.html', 'feed/index.html',
]) {
  try { await fs.access(path.join(root, required)); } catch { fail('dist', `missing required artifact: ${required}`); }
}

// Paused software portfolio must not be published, even in static design labs.
for (const retired of ['portfolio/index.html', 'portfolio/pilketos/index.html']) {
  try { await fs.access(path.join(root, retired)); fail(retired, 'retired route generated'); }
  catch (error) { if (error?.code !== 'ENOENT') fail(retired, 'cannot check retired route'); }
}
for (const file of (await walk(root)).filter(f => f.endsWith('.html'))) {
  if (/pilketos/i.test(await fs.readFile(file, 'utf8'))) fail(path.relative(root, file), 'retired project name found in public HTML');
}
const publicationIndex = await fs.readFile(path.join(root, 'publications/index.html'), 'utf8');
if (!publicationIndex.includes('id="publication-search"') || !publicationIndex.includes('id="publication-year"') || !publicationIndex.includes('id="publication-reset"')) {
  fail('publications/index.html', 'discovery controls missing');
}
const noLinks = await fs.readFile(path.join(root, 'publications/village-administration-services-information-system/index.html'), 'utf8');
if (noLinks.includes('>Publication Links</h2>')) fail('village-administration-services-information-system', 'empty publication links rendered');
// Research page/link integration must survive builds in preview and production.
const researchHtml = await fs.readFile(path.join(root, 'research/index.html'), 'utf8');
const projectsHtml = await fs.readFile(path.join(root, 'projects/index.html'), 'utf8');
if (!mainHome.includes('Current doctoral research') || !mainHome.includes('Selected publications')) {
  fail('index.html', 'research-first homepage sections missing');
}
if (mainHome.indexOf('Current doctoral research') > mainHome.indexOf('Selected publications')) {
  fail('index.html', 'current research must precede selected publications');
}
for (const [paper, project] of [
  ['transformer-adaptation-for-plant-bioelectric-potential-classification-scoping-review', 'plant-bioelectric-transformer-classifier'],
  ['transformer-based-models-for-enhanced-plant-bioelectric-signal-classification', 'plant-bioelectric-transformer-classifier'],
  ['a-systematic-review-of-plant-bioelectrical-potential-acquisition-systems-for-edg', 'plant-bioelectrical-potential-edge-sensing'],
]) {
  const paperPath = path.join(root, 'publications', paper, 'index.html');
  const paperHtml = await fs.readFile(paperPath, 'utf8');
  if (!mainHome.includes(`/publications/${paper}/`)) fail('index.html', `selected paper missing: ${paper}`);
  if (!projectsHtml.includes(`id="${project}"`)) fail('projects/index.html', `project anchor missing: ${project}`);
  if (!projectsHtml.includes(`/publications/${paper}/`)) fail('projects/index.html', `related paper missing: ${paper}`);
  if (!researchHtml.includes(`/publications/${paper}/`)) fail('research/index.html', `selected research output missing: ${paper}`);
  if (!paperHtml.includes('Related research projects') || !paperHtml.includes(`/projects/#${project}`)) {
    fail(`publications/${paper}`, 'reverse project link missing');
  }
}
if (!projectsHtml.includes('Research question') || !projectsHtml.includes('Approach')) {
  fail('projects/index.html', 'evidence-oriented project details missing');
}
const conceptualDiagrams = [...projectsHtml.matchAll(/<figure\\b[^>]*data-visual-kind="conceptual"/g)];
if (conceptualDiagrams.length !== 4) {
  fail('projects/index.html', `expected four conceptual workflow figures, received ${conceptualDiagrams.length}`);
}
for (const title of [
  'Acquisition and signal quality',
  'Time-series classification',
  'Microscopy image analysis',
  'Geospatial modeling',
]) {
  if (!projectsHtml.includes(title)) fail('projects/index.html', `missing project workflow: ${title}`);
}
if ((projectsHtml.match(/Conceptual research workflow/g) || []).length !== 4) {
  fail('projects/index.html', 'each project workflow needs an explicit non-empirical caption');
}
if (!projectsHtml.includes('data-visual-kind="conceptual"')) fail('projects/index.html', 'research diagram identification missing');

const robots = await fs.readFile(path.join(root, 'robots.txt'), 'utf8');
if (production ? !robots.includes('Sitemap:') : !robots.includes(`Disallow: ${base}`)) fail('robots.txt', 'unexpected robots policy');
if (failures.length) {
  console.error(`Site quality FAIL (${failures.length} problems):\n${failures.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Site quality PASS: ${inspected} HTML files, ${bridges} migration bridges, ${production ? 'production' : 'preview'} crawl policy.`);
}
