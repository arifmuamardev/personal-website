/**
 * IEEE-inspired bibliography presentation for the curated personal website.
 *
 * The legacy 'venue' field is heterogeneous: journal name only, journal with
 * volume/issue/pages, book/chapter publisher/ISBN, or conference proceedings.
 * Only parse metadata when the pattern is unambiguous. Never infer missing
 * volume, issue, pages, DOI, date or publication status.
 *
 * This is for display; preserve canonical original publication metadata.
 */
export interface PublicationLike {
  title: string;
  authors: readonly string[];
  type: string;
  status: string;
  venue: string;
  year: number;
  doi?: string;
}

export interface ReferenceParts {
  authorText: string;
  title: string;
  container: string;
  prefix: string;
  detailText: string;
  year: number;
  doi?: string;
  needsMetadataReview: boolean;
  formattedPlain: string;
}

const cleanup = (value: string) => value.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();

export function ieeeAuthor(name: string): string {
  const tokens = cleanup(name).split(' ').filter(Boolean);
  if (tokens.length < 2) return cleanup(name);
  const last = tokens.at(-1)!;
  const first = tokens.slice(0, -1).flatMap(token => {
    const bare = token.replace(/\./g, '');
    // The source sometimes contains compact "AM" / "CRA" Scholar initials.
    // Expand only all-uppercase initials, never guess complete given names.
    if (/^[A-Z]{2,5}$/.test(bare)) return [...bare].map(c => c + '.');
    if (/^[A-Za-z]$/.test(bare)) return [bare.toUpperCase() + '.'];
    return [token[0].toUpperCase() + '.'];
  });
  return [...first, last].join(' ');
}

/** Canonical author identity, shared by bibliographies and the homepage.
 * Avoid generic "Arif" matching: other real authors can share that name.
 */
export function isProfileAuthor(name: string): boolean {
  const normalized = cleanup(name).toLowerCase()
    .replace(/[’‘`']/g, '')
    .replace(/\\./g, ' ')
    .replace(/\\s+/g, ' ')
    .trim();
  return new Set([
    'arif muamar wahid', 'arif muamar', 'a muamar',
    'a m wahid', 'am wahid',
  ]).has(normalized);
}

export interface AuthorSegment {
  text: string;
  isSelf: boolean;
  separator: string;
}

export function ieeeAuthorSegments(authors: readonly string[]): AuthorSegment[] {
  // An academic owner's name can occur anywhere in a long author list.
  // Do not shorten 7+ author lists to "et al." on the personal website.
  return authors.map((name, index) => ({
    text: ieeeAuthor(name),
    isSelf: isProfileAuthor(name),
    separator: index === authors.length - 1
      ? ''
      : index === authors.length - 2
        ? (authors.length === 2 ? ' and ' : ', and ')
        : ', ',
  }));
}

export function ieeeAuthors(authors: readonly string[]): string {
  return ieeeAuthorSegments(authors).map(segment => segment.text + segment.separator).join('');
}

interface VenueParts {
  container: string;
  volume?: string;
  issue?: string;
  pages?: string;
  articleNumber?: string;
  publisher?: string;
  isbn?: string;
  month?: string;
}

function parseVenue(input: PublicationLike): VenueParts {
  let venue = cleanup(input.venue || '');
  const base: VenueParts = { container: venue };
  if (!venue) return base;

  // Scholar imports sometimes append a second copy of the publication year.
  const yearSuffix = venue.match(/,\s*((?:19|20)\d{2})$/);
  if (yearSuffix && Number(yearSuffix[1]) === input.year) {
    venue = venue.slice(0, yearSuffix.index).trim();
  }

  if (input.type === 'Book' || input.type === 'Book Chapter') {
    const isbn = venue.match(/(?:^|[.\s])ISBN:\s*([\dXx-]+)/i);
    if (isbn) {
      base.isbn = isbn[1];
      venue = venue.slice(0, isbn.index).replace(/[\s.]+$/, '');
    }
    if (input.type === 'Book Chapter') {
      const match = venue.match(/^(.+?),\s*pp?\.\s*(\d+\s*[-–]\s*\d+)\.\s*(.+)$/i);
      if (match) return { ...base, container: match[1].trim(), pages: match[2].replace(/\s+/g, ''), publisher: match[3].trim() };
    }
    // Never output malformed imported search URLs as though they were a publisher.
    const cleaned = venue.replace(/\.\s*https?:\/\/books\.\s*google\.\s*co\.\s*id\/books.*/i, '').trim();
    return { ...base, container: cleaned || venue };
  }

  if (input.type === 'Conference Paper') {
    const pageMatch = venue.match(/^(.*?),\s*pp?\.\s*(\d+\s*[-–]\s*\d+)$/i);
    if (pageMatch) return { container: pageMatch[1].trim(), pages: pageMatch[2].replace(/\s+/g, '') };
    return { container: venue };
  }

  // A confirmed article number: "Smart Agricultural Technology, 15
  // (December 2026), Article 102484".
  const article = venue.match(/^(.*?),\s*(\d{1,3})\s*\(([^)]*\b(?:19|20)\d{2})\)\s*,\s*Article\s+([A-Za-z0-9-]+)$/i);
  if (article) {
    const month = article[3].trim().replace(/\s+(?:19|20)\d{2}$/, '').replace(/^December$/i, 'Dec.');
    return { container: article[1].trim(), volume: article[2], articleNumber: article[4], month };
  }

  // Publisher-supplied electronic article identifier rather than a page range.
  // Example: "ASEAN Journal ..., 29(1), Article e258998".
  const eArticle = venue.match(/^(.*?),\s*(\d{1,3})\s*\(\s*(\d{1,3})\s*\),\s*(?:Article|Art\.\s*no\.)\s+([A-Za-z]?\d{3,})$/i);
  if (eArticle) {
    return {
      container: eArticle[1].trim(),
      volume: eArticle[2], issue: eArticle[3], articleNumber: eArticle[4],
    };
  }

  // Only recognize explicit journal volume(issue) groups. "4(1)" without
  // page numbers is valid incomplete bibliographic data, not guessed pages.
  const journal = venue.match(/^(.*?)\s*,?\s+(\d{1,3})\s*\(\s*(\d{1,3})\s*\)(?:,\s*(?:pp?\.\s*)?(\d+\s*[-–]\s*\d+))?$/);
  if (journal && journal[1]) {
    return { container: journal[1].replace(/,\s*$/, '').trim(),
      volume: journal[2], issue: journal[3], pages: journal[4]?.replace(/\s+/g, '') };
  }
  return { container: venue };
}

function citationDetails(parts: VenueParts, type: string): string {
  const out: string[] = [];
  if (parts.volume) out.push('vol. ' + parts.volume);
  if (parts.issue) out.push('no. ' + parts.issue);
  if (parts.pages) out.push('pp. ' + parts.pages.replace('-', '–'));
  if (parts.articleNumber) out.push('Art. no. ' + parts.articleNumber);
  if (type === 'Book Chapter' && parts.publisher) out.push(parts.publisher);
  if ((type === 'Book' || type === 'Book Chapter') && parts.isbn) out.push('ISBN ' + parts.isbn);
  if (parts.month) out.push(parts.month);
  return out.join(', ');
}

export function ieeeReference(item: PublicationLike): ReferenceParts {
  const authors = ieeeAuthors(item.authors);
  const venue = parseVenue(item);
  const isBook = item.type === 'Book';
  const container = venue.container;
  const prefix = item.type === 'Conference Paper' || item.type === 'Book Chapter' ? 'in ' : '';
  const detailText = citationDetails(venue, item.type);
  const needsMetadataReview = !container || /\u2026|(?:\.\.\.)/.test(container)
    || (item.type === 'Journal Article' && (!venue.volume || (!venue.pages && !venue.articleNumber)))
    || (item.type === 'Book Chapter' && !venue.pages);
  const titlePart = isBook ? item.title : '“' + item.title + ',”';
  const parts = [
    authors ? authors + ',' : '',
    titlePart,
    prefix + container + (container ? ',' : ''),
    detailText ? detailText + ',' : '',
    String(item.year) + (item.doi ? ', doi: ' + item.doi : '.'),
  ].filter(Boolean);
  const formattedPlain = parts.join(' ').replace(/\s+,/g, ',').replace(/,\s*,/g, ',');
  return {
    authorText: authors,
    title: item.title,
    container, prefix, detailText, year: item.year, doi: item.doi,
    needsMetadataReview, formattedPlain,
  };
}
