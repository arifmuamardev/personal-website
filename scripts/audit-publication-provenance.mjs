import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { isProfileAuthor } from '../src/lib/publication-reference.ts';

// Offline provenance audit. A DOI or a publisher URL is a traceability
// pointer, NOT proof that authorship, dates and metadata were reverified.
const directory = 'src/content/publications';
const files = readdirSync(directory).filter(file => file.endsWith('.md')).sort();
const issues = [];
const records = [];
const seenTitles = new Map();
const seenDois = new Map();
const clean = text => (text ?? '').trim().replace(/^['"]|['"]$/g,'').trim();
const field = (source, key) => clean(source.match(new RegExp('^' + key + ':\\s*(.+)$','m'))?.[1]);

for (const file of files) {
  const source = readFileSync(join(directory,file),'utf8');
  const title = field(source,'title');
  const venue = field(source,'venue');
  const type = field(source,'type');
  const status = field(source,'status');
  const year = Number(field(source,'year'));
  const doi = field(source,'doi');
  const publisherUrl = field(source,'publisherUrl');
  const authors = (source.match(/^authors:\s*\n((?:[ \t]*-.*\n)+)/m)?.[1] ?? '')
    .trim().split('\n').map(line=>clean(line.replace(/^\s*-\s*/,''))).filter(Boolean);

  if (!title || !venue || !type || !status || !Number.isInteger(year) || !authors.length) {
    issues.push(file + ': missing core title/author/year/type/status/venue');
  }
  if (authors.length && !authors.some(isProfileAuthor)) issues.push(file + ': owner missing from author byline');
  if (year < 2010 || year > 2026) issues.push(file + ': implausible year ' + year);
  if (status !== 'Published') issues.push(file + ': unexpected published-index status ' + status);
  const key = title.normalize('NFKD').toLocaleLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  if (seenTitles.has(key)) issues.push(file + ': normalized title duplicates ' + seenTitles.get(key));
  seenTitles.set(key,file);
  if (doi) {
    if (!/^10[.]\d{4,9}\/.+/i.test(doi)) issues.push(file + ': invalid DOI syntax');
    if (seenDois.has(doi.toLowerCase())) issues.push(file + ': DOI duplicates ' + seenDois.get(doi.toLowerCase()));
    seenDois.set(doi.toLowerCase(),file);
  }
  if (publisherUrl) {
    try { const url = new URL(publisherUrl); if (!['http:','https:'].includes(url.protocol)) issues.push(file + ': non-web source link'); }
    catch { issues.push(file + ': invalid publisher URL'); }
  }
  const hasPublisherPage = publisherUrl.startsWith('https://') && !publisherUrl.includes('doi.org/');
  const traceability = hasPublisherPage ? 'Publisher page' : doi ? 'DOI only' : publisherUrl ? 'Other URL' : 'No recorded primary link';
  records.push({id:file.replace(/[.]md$/,''),title,year,type,authors:authors.length,doi:!!doi,hasPublisherPage,traceability});
}

// Known exceptions with directly checked publisher evidence.
// These checks do not silently change the citation year.
const sourceNotes = [
  'optimizing-higher-education-performance-through-data-integration-using-the-zachm.md',
  'peningkatan-kapasitas-digital-berkelanjutan-pada-pac-gp-ansor-kroya.md',
];
for (const file of sourceNotes) {
  const source = readFileSync(join(directory,file),'utf8');
  if (!/^publicationDateNote:/m.test(source)) issues.push(file+': online/issue-date clarification missing');
}
if (files.length < 43) issues.push('Publication collection unexpectedly shrank below its 43-record baseline');

const noDoi = records.filter(r=>!r.doi);
const noPublisherPage = records.filter(r=>!r.hasPublisherPage);
const withoutBoth = records.filter(r=>!r.doi && !r.hasPublisherPage);
console.log('Publication traceability review:',records.length,'records; DOI absent:',noDoi.length,
  '; direct publisher page absent:',noPublisherPage.length,
  '; neither DOI nor publisher page:',withoutBoth.length);
console.log('Needs primary-source follow-up (missing both DOI and publisher page):');
for (const r of withoutBoth) console.log('  •',r.id,'('+r.year+', '+r.type+')');
if (process.argv.includes('--ledger')) {
  console.log('\n| ID | Year | Type | Authors | DOI recorded | Publisher URL recorded |');
  console.log('| --- | ---: | --- | ---: | --- | --- |');
  for (const r of records) console.log(`| ${r.id} | ${r.year} | ${r.type} | ${r.authors} | ${r.doi ? 'Yes' : 'No'} | ${r.hasPublisherPage ? 'Yes' : 'No'} |`);
}
if (issues.length) {
  console.error('Publication provenance FAIL:\n'+issues.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Publication provenance PASS: structural consistency, traceability categories, 43-record baseline, and dated exceptions.');
}
