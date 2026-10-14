import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { ieeeAuthor, ieeeAuthors, ieeeReference } from '../src/lib/publication-reference.ts';

assert.equal(ieeeAuthor("Arif Mu'amar Wahid"), "A. M. Wahid");
assert.equal(ieeeAuthor('AM Wahid'), 'A. M. Wahid');
assert.equal(ieeeAuthor('CRA Widiawati'), 'C. R. A. Widiawati');
assert.equal(ieeeAuthors(['Arif Mu\'amar Wahid', 'Rizky Rahmatullah']), 'A. M. Wahid and R. Rahmatullah');
assert.equal(ieeeAuthors(['Arif Mu\'amar Wahid']), 'A. M. Wahid');
assert.equal(ieeeAuthors(['A One','B Two','C Three','D Four','E Five','F Six','G Seven']), 'A. One et al.');

function fixture(venue, type='Journal Article', year=2026) {
  return ieeeReference({title:'Test Title', authors:["Arif Mu'amar Wahid",'Rizky Rahmatullah'], type, status:'Published',year,venue,doi:'10.1234/example'});
}
let r=fixture('International Journal for Applied Information Management, 6(3), 382–401');
assert.equal(r.container,'International Journal for Applied Information Management');
assert.equal(r.detailText,'vol. 6, no. 3, pp. 382–401');
assert.match(r.formattedPlain,/A\. M\. Wahid and R\. Rahmatullah/);
assert.match(r.formattedPlain,/2026, doi: 10\.1234\/example/);
r=fixture('Jurnal Pendidikan Dan Teknologi Indonesia 4 (8), 369-379, 2024','Journal Article',2024);
assert.equal(r.detailText,'vol. 4, no. 8, pp. 369–379');
assert.doesNotMatch(r.container, /2024/);
r=fixture('Smart Agricultural Technology, 15 (December 2026), Article 102484');
assert.equal(r.container,'Smart Agricultural Technology');
assert.equal(r.detailText,'vol. 15, Art. no. 102484, Dec.');
assert.equal((r.formattedPlain.match(/2026/g)||[]).length,1,'publication year duplicated');
r=fixture('DIMA: Jurnal Pengabdian Masyarakat, 4(1)');
assert.equal(r.detailText,'vol. 4, no. 1');
r=fixture('Journal of Applied Data Sciences');
assert.equal(r.container,'Journal of Applied Data Sciences');
assert.equal(r.needsMetadataReview,true);
assert.doesNotMatch(r.formattedPlain,/vol\.|no\.|pp\./,'must not fabricate metadata');
r=fixture('2025 9th International Conference on Information Technology, Information Systems and Electrical Engineering (ICITISEE)','Conference Paper',2025);
assert.match(r.formattedPlain,/in 2025 9th International Conference/);
r=fixture('Dasar Pemrograman Python, pp. 146–160. Yayasan Tri Edukasi Ilmiah. ISBN: 978-623-10-2543-2','Book Chapter',2024);
assert.equal(r.container,'Dasar Pemrograman Python');
assert.match(r.detailText,/pp\. 146–160/);
r=fixture('Zahira Media Publisher. ISBN: 9786238481958','Book',2025);
assert.equal(r.container,'Zahira Media Publisher');
assert.match(r.formattedPlain,/ISBN 9786238481958/);
assert.doesNotMatch(r.formattedPlain,/books\.google/);

const index = readFileSync('src/pages/publications.astro','utf8');
const detail = readFileSync('src/pages/publications/[slug].astro','utf8');
for (const [name,src] of [['index',index],['detail',detail]]) {
  assert.match(src,/import PublicationReference from /,name+' missing shared IEEE formatter');
  assert.match(src,/<PublicationReference publication=\{/);
  assert.doesNotMatch(src,/<p class="pub-venue">|<p class="pub-authors">/,name+' still uses raw venue or abbreviated author paragraphs');
}
assert.match(detail,/includeTitle=\{true\}/, 'detail needs full IEEE-style reference');

const folder='src/content/publications';
const files=readdirSync(folder).filter(p=>p.endsWith('.md'));
let noDoi=0, abbreviated=0, noExpandedVenue=0, entriesWithRawYear=0;
const titles=[];
for(const f of files){
  const raw=readFileSync(path.join(folder,f),'utf8');
  const titleMatch=raw.match(/^title:\s*(.*)$/m);
  const typeMatch=raw.match(/^type:\s*(.*)$/m);
  const yearMatch=raw.match(/^year:\s*(\d{4})$/m);
  const venueMatch=raw.match(/^venue:\s*(.*)$/m);
  const authorsMatch=raw.match(/^authors:\s*\n((?:[ \t]*-[^\n]*\n)+)/m);
  const doiMatch=raw.match(/^doi:\s*(.+)$/m);
  assert(titleMatch&&typeMatch&&yearMatch&&venueMatch&&authorsMatch, 'missing bibliographic basics in '+f);
  const clean=x=>x.replace(/^['"]|['"]$/g,'').trim();
  const title=clean(titleMatch[1]);
  titles.push(title.toLowerCase());
  const item={title,authors:authorsMatch[1].trim().split('\n').map(l=>l.replace(/^\s*-\s*/,'').trim()),type:clean(typeMatch[1]),status:'Published',year:Number(yearMatch[1]),venue:clean(venueMatch[1])};
  const ref=ieeeReference(item);
  assert(ref.authorText&&ref.container&&ref.formattedPlain, 'invalid reference '+f);
  if(!doiMatch)noDoi++;
  if(/\b[A-Z]{2,4} [A-Z][a-z]/.test(authorsMatch[1]))abbreviated++;
  if(ref.needsMetadataReview)noExpandedVenue++;
  if(/,\s*\d{4}\s*$/.test(item.venue))entriesWithRawYear++;
}
assert.equal(new Set(titles).size,files.length,'duplicate exact publication title');
console.log('IEEE-inspired bibliography PASS:', files.length,
'entries; records without DOI:',noDoi,
'; records needing expanded venue metadata:',noExpandedVenue,
'; records using abbreviated names:',abbreviated,
'; legacy venues repeating year:',entriesWithRawYear);
