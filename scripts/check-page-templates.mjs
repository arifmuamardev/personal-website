import { readFileSync, existsSync } from 'node:fs';

const overviews = [
  'src/pages/about.astro',
  'src/pages/research.astro',
  'src/pages/projects.astro',
  'src/pages/publications.astro',
  'src/pages/portfolio/index.astro',
  'src/pages/blog.astro',
  'src/pages/cv.astro',
  'src/pages/contact.astro',
  'src/pages/privacy.astro',
];
const details = [
  'src/pages/[slug].astro',
  'src/pages/publications/[slug].astro',
  'src/pages/portfolio/pilketos/index.astro',
];
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };

for (const file of overviews) {
  const code = readFileSync(file, 'utf8');
  check(code.includes("import PageIntro from '"), file + ' does not use shared PageIntro');
  check((code.match(/<PageIntro\b/g) || []).length === 1, file + ' must have exactly one PageIntro');
  check(code.includes('class="section academic-index"'), file + ' missing shared overview class');
  check(!/<h1\b/.test(code), file + ' has hand-written H1 rather than PageIntro');
}
for (const file of details) {
  const code = readFileSync(file, 'utf8');
  check(code.includes("import PageBreadcrumb from '"), file + ' does not use shared PageBreadcrumb');
  check((code.match(/<PageBreadcrumb\b/g) || []).length === 1, file + ' needs exactly one PageBreadcrumb');
  check((code.match(/<h1\b/g) || []).length === 1, file + ' needs one H1');
}
const homepage = readFileSync('src/pages/index.astro', 'utf8');
const about = readFileSync('src/pages/about.astro', 'utf8');
for (const [name, source] of [['homepage', homepage], ['about', about]]) {
  check(source.includes("localPath('/images/arif-profile.webp')"), name + ' not showing optimized owner-provided portrait');
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
const guide = readFileSync('docs/design/ACADEMIC-PAGE-TEMPLATES.md', 'utf8');
check(guide.includes('PageIntro') && guide.includes('PageBreadcrumb'), 'page template contract is incomplete');

if (errors.length) {
  console.error('Page template audit FAILED:\n' + errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Page template audit PASS: ' + overviews.length + ' overview pages, ' + details.length + ' detail routes, approved portrait asset, shared styling.');
}
