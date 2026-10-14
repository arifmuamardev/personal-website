import { readFileSync } from 'node:fs';

const data = readFileSync('src/data/public-cv.ts', 'utf8');
const profile = readFileSync('src/data/profile.ts', 'utf8');
const cv = readFileSync('src/pages/cv.astro', 'utf8');
const about = readFileSync('src/pages/about.astro', 'utf8');
const research = readFileSync('src/pages/research.astro', 'utf8');
const home = readFileSync('src/pages/index.astro', 'utf8');
const issues = [];
function requireThat(ok, message) { if (!ok) issues.push(message); }

for (const section of ['scholarlyService','academicLeadership','presentations','fundedResearch','intellectualProperty','books','memberships','technicalCompetencies','teachingAreas']) {
  requireThat(data.includes(section + ':'), 'Missing structured public CV section: ' + section);
}
for (const [label, code, sections] of [
  ['CV', cv, ['memberships','presentations','fundedResearch','books','intellectualProperty','technicalCompetencies','scholarlyService']],
  ['About', about, ['academicLeadership','scholarlyService','teachingAreas']],
  ['Research', research, ['fundedResearch']],
]) {
  requireThat(code.includes("from '../data/public-cv'"), label + ' lacks central CV source');
  for (const section of sections) requireThat(code.includes('publicCv.' + section), label + ' omits data group ' + section);
}
requireThat(profile.includes('Indoneris Data Mining'), '2024 Data Mining award was not added');
requireThat(profile.includes('2023–2024') && profile.includes('2023–2025'), 'Academic experience or education chronology incomplete');
requireThat(home.includes('MEXT Scholarship recipient'), 'Home is missing brief CV recognition');
requireThat(cv.includes('14 August 2026'), 'The CV snapshot date must be disclosed');
requireThat(cv.includes("localPath('/files/arif-muamar-cv.pdf')"), 'The privacy-reviewed public PDF was removed');

const publicSources = [['publicCv', data], ['profile', profile], ['CV page', cv], ['About page', about], ['Research page', research], ['Home page', home]];
for (const [label, code] of publicSources) {
  requireThat(!/(?:WhatsApp|telephone|phone|membership(?: number| no\.?| id)?)\s*[:=#]\s*\+?\d{5,}/i.test(code), label + ': personal identifiers/contacts must not be published');
  requireThat(!/\b(?:serikat pekerja kampus|lakpesdam|pcinu)\b/i.test(code), label + ': unrelated sensitive affiliation found');
  requireThat(!/\b(?:223 citations|h-index\s*9|i10-index\s*9)\b/i.test(code), label + ': unverified citation snapshot');
}
requireThat(!data.includes('IDR 50,000,000'), 'Grant amounts were copied into public CV');
if (issues.length) {
  console.error('Public CV audit FAIL:\n' + issues.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Public CV audit PASS: centralized data, page coverage, snapshot policy, and privacy exclusions.');
}
