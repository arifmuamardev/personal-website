import { readFileSync, existsSync } from 'node:fs';

const overviews = [
  'src/pages/about.astro',
  'src/pages/research.astro',
  'src/pages/projects.astro',
  'src/pages/publications.astro',
  'src/pages/blog.astro',
  'src/pages/education.astro',
  'src/pages/experience.astro',
  'src/pages/teaching.astro',
  'src/pages/academic-service.astro',
  'src/pages/recognition.astro',
  'src/pages/contact.astro',
  'src/pages/privacy.astro',
];
const details = [
  'src/pages/[slug].astro',
  'src/pages/publications/[slug].astro',
];
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };

for (const file of overviews) {
  const code = readFileSync(file, 'utf8');
  check(code.includes("import PageIntro from '"), file + ' does not use shared PageIntro');
  check((code.match(/<PageIntro\b/g) || []).length === 1, file + ' must have exactly one PageIntro');
  check(code.includes('class="section academic-index'), file + ' missing shared overview class');
  check(!/<h1\b/.test(code), file + ' has hand-written H1 rather than PageIntro');
}
for (const file of details) {
  const code = readFileSync(file, 'utf8');
  check(code.includes("import PageBreadcrumb from '"), file + ' does not use shared PageBreadcrumb');
  check((code.match(/<PageBreadcrumb\b/g) || []).length === 1, file + ' needs exactly one PageBreadcrumb');
  check((code.match(/<h1\b/g) || []).length === 1, file + ' needs one H1');
}
// Both bibliography and detail routes must share classification/topic hierarchy.
const publicationList = readFileSync('src/pages/publications.astro', 'utf8');
const publicationDetail = readFileSync('src/pages/publications/[slug].astro', 'utf8');
const publicationMeta = readFileSync('src/components/PublicationMeta.astro', 'utf8');
for (const [label, source] of [['Publications list', publicationList], ['Publication detail', publicationDetail]]) {
  check(source.includes("import PublicationMeta from '"), label + ' must import shared publication metadata component');
  check((source.match(/<PublicationMeta\b/g) || []).length === 1, label + ' should render shared metadata exactly once');
  check(/researchArea=\{(?:pub\.data|data)\.researchArea\}/.test(source), label + ' omits research area');
  check(/tags=\{(?:pub\.data|data)\.tags\}/.test(source), label + ' omits keywords');
}
check(publicationMeta.includes('class="publication-classification"'), 'publication type/status row missing');
check(publicationMeta.includes('class="publication-topics"'), 'secondary metadata row missing');
check(publicationMeta.includes('Research area') && publicationMeta.includes('Keywords'), 'secondary metadata requires accurate labels');
check(publicationMeta.indexOf('class="publication-classification"') < publicationMeta.indexOf('class="publication-topics"'),
  'publication topics must appear below type/status, not on the same row');
check(publicationMeta.includes("tags.map(tag => tag.trim())"), 'keywords should be normalized for duplicate avoidance');
const homepage = readFileSync('src/pages/index.astro', 'utf8');
const about = readFileSync('src/pages/about.astro', 'utf8');
for (const [name, source] of [['homepage', homepage], ['about', about]]) {
  check(source.includes("localPath('/images/arif-profile.webp')"), name + ' not showing optimized owner-provided portrait');
  check(source.includes('profile-photo'), name + ' missing shared circular portrait class');
  check(/alt="Profile portrait supplied for this personal website"/.test(source), name + ' lacks appropriate portrait alt text');
}
const photo = 'public/images/arif-profile.webp';
check(existsSync(photo), 'optimized profile image missing');
if (existsSync(photo)) {
  const img = readFileSync(photo);
  check(img.length < 25_000, 'portrait asset too large');
  check(img.toString('ascii', 0, 4) === 'RIFF' && img.toString('ascii', 8, 12) === 'WEBP', 'portrait is not a valid WebP container');
}
const css = readFileSync('src/styles/global.css', 'utf8');
check(css.includes('.academic-index .card'), 'overview cards lack centralized design rule');
check(/\.profile-photo\s*\{[^}]*aspect-ratio:\s*1\s*\/\s*1\s*;[^}]*border-radius:\s*50%\s*;/s.test(css), 'profile-photo is not cropped to a circle in shared CSS');
const guide = readFileSync('docs/design/ACADEMIC-PAGE-TEMPLATES.md', 'utf8');
check(guide.includes('PageIntro') && guide.includes('PageBreadcrumb'), 'page template contract is incomplete');

if (errors.length) {
  console.error('Page template audit FAILED:\n' + errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Page template audit PASS: ' + overviews.length + ' overview pages, ' + details.length + ' detail routes, approved portrait asset, shared styling.');
}
