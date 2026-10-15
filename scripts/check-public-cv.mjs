import { readFileSync, existsSync } from 'node:fs';

const data = readFileSync('src/data/public-cv.ts', 'utf8');
const profile = readFileSync('src/data/profile.ts', 'utf8');
const about = readFileSync('src/pages/about.astro', 'utf8');
const research = readFileSync('src/pages/research.astro', 'utf8');
const home = readFileSync('src/pages/index.astro', 'utf8');
const nav = readFileSync('src/components/AcademicProfileNav.astro', 'utf8');
const pages = new Map(
  ['education', 'experience', 'teaching', 'academic-service', 'recognition'].map(name =>
    [name, readFileSync(`src/pages/${name}.astro`, 'utf8')]
  )
);
const issues = [];
const check = (ok, message) => { if (!ok) issues.push(message); };

for (const section of ['scholarlyService','academicLeadership','presentations','fundedResearch','intellectualProperty','books','memberships','technicalCompetencies','teachingAreas']) {
  check(data.includes(section + ':'), 'Missing centrally curated CV data: ' + section);
}
for (const [name, source] of pages.entries()) {
  check(source.includes("import PageIntro from '"), name + ': shared page heading missing');
  check(source.includes('AcademicProfileNav'), name + ': section navigation missing');
  check(source.includes(`current="/${name}/"`), name + ': active-navigation marker missing');
}
for (const [name, groups] of [
  ['experience', ['fundedResearch']],
  ['teaching', ['teachingAreas', 'technicalCompetencies']],
  ['academic-service', ['scholarlyService', 'academicLeadership', 'presentations', 'memberships']],
  ['recognition', ['intellectualProperty']],
]) {
  for (const group of groups) check(pages.get(name).includes('publicCv.' + group), name + ': missing CV data section ' + group);
}
check(pages.get('education').includes('profile.education'), 'Education chronology missing');
check(pages.get('experience').includes('profile.experience'), 'Experience chronology missing');
check(pages.get('recognition').includes('profile.awards'), 'Awards and scholarships missing');
check(pages.get('education').includes('completedDegrees') && pages.get('education').includes('doctoralStudy'), 'Education must distinguish completed degrees and active doctoral study');
check(pages.get('experience').includes('rolesListedAsCurrent') && pages.get('experience').includes('earlierRoles'), 'Experience should separate recorded current and historical roles');
check(pages.get('academic-service').includes('serviceGroups') && pages.get('academic-service').includes('item.serviceType === group.type'), 'Scholarly service must show accurate functional groups');
for (const kind of ['Editorial', 'Peer review', 'Journal operations', 'Conference service']) {
  check(data.includes("serviceType: '" + kind + "'"), 'Unclassified scholarly service: ' + kind);
}
check(pages.get('academic-service').includes('publicationByTitle') && pages.get('academic-service').includes('Related publication'), 'Conference presentations should link to matching published research');
check(pages.get('recognition').includes('scholarships') && pages.get('recognition').includes('awards'), 'Scholarships and distinctions must be distinct');
check(pages.get('teaching').includes('current-semester') && pages.get('teaching').includes('certifications'), 'Teaching source and competency caveats missing');
check(about.includes('AcademicProfileNav'), 'About must link to the section directory');
check(!research.includes('publicCv.fundedResearch') && research.includes("localPath('/experience/')"), 'Funded research must be presented once on Experience, not repeated on Research');
check(home.includes('MEXT Scholarship recipient'), 'Home missing brief recognition');
check(data.includes("sourceAsOf: '2026-08-14'"), 'Source snapshot date missing');
check(profile.includes('researchFocus:') && home.includes('profile.researchFocus') && about.includes('profile.researchFocus') && research.includes('profile.researchFocus'), 'Current research focus must be shared rather than manually inconsistent');
check(profile.includes("school: 'Graduate School of Natural Science and Technology'") && profile.includes("division: 'Division of Electrical, Information and Communication Engineering'"), 'Canonical doctoral program identification missing');
check(pages.get('education').includes('researchLabel') && pages.get('education').includes('research'), 'Education should separate thesis/research topic from qualification');
check(!/(GPA|4[.]00|3[.]44)/i.test(profile), 'Academic grades must not appear in public profile data');
check(pages.get('academic-service').includes('14 August 2026'), 'Editorial-service snapshot disclaimer missing');
check(pages.get('experience').includes('14 August 2026'), 'Funded research snapshot disclaimer missing');

for (const route of ['/education/','/experience/','/teaching/','/academic-service/','/recognition/']) {
  check(nav.includes(route), 'Academic directory missing: ' + route);
}
check(!existsSync('src/pages/cv.astro'), 'Combined CV route should be paused');
check(!existsSync('public/files/arif-muamar-cv.pdf'), 'Downloadable public CV must not be deployed');

const sources = [['publicCv', data], ['profile', profile], ['About', about], ['Research', research], ['Home', home], ['Academic directory', nav],
  ...[...pages.entries()].map(([name, source]) => [name, source])];
for (const [name, source] of sources) {
  check(!/localPath\('\/cv\/'\)|href=["']\/cv\/|arif-muamar-cv\.pdf/i.test(source), name + ': hidden CV route/file referenced');
  check(!/(?:WhatsApp|telephone|phone|membership(?: number| no\.?| id)?)\s*[:=#]\s*\+?\d{5,}/i.test(source), name + ': personal identifier exposed');
  check(!/\b(?:serikat pekerja kampus|lakpesdam|pcinu)\b/i.test(source), name + ': unrelated sensitive affiliation exposed');
  check(!/\b(?:223 citations|h-index\s*9|i10-index\s*9)\b/i.test(source), name + ': stale citation snapshot');
}
check(!data.includes('IDR 50,000,000'), 'Private grant sums were copied into public data');
if (issues.length) {
  console.error('Academic profile audit FAIL:\n' + issues.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Academic profile audit PASS: five topic pages, shared data, snapshot notices and hidden PDF/CV routes.');
}
