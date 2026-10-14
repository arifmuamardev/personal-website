# Bibliography Citation Policy — IEEE-inspired Academic Minimal

**Status:** Active display standard for the personal website.
**Date:** 15 October 2026.
**Reference:** [IEEE Publication Operations Reference Guide (2025)](https://journals.ieeeauthorcenter.ieee.org/wp-content/uploads/sites/7/IEEE_Reference_Guide.pdf).

## Reason for the update

The curated bibliography contains 43 records imported from different sources over multiple years. Their `venue` field is not normalized: some records contain only a journal name; others include volume, issue, page range, a duplicated year, a chapter's publisher and ISBN, or shortened conference names copied from Google Scholar. Several author fields use full names whereas others use compact Google Scholar initials. Displaying these fields literally makes the bibliography look inconsistent.

This PR changes *rendering*, not bibliographic truth. It also corrects a few clear display anomalies (all-caps headings, visibly truncated venue, malformed search URL, and one already-known co-author).

## Presentation contract

- **Publications index:** type/status and topical keywords remain in the separate `PublicationMeta`. Each paper has a prominent linked title and a consistent **authors → italic venue → verified volume/issue/pages or article number → year → DOI** citation line. A full IEEE reference is **not repeated** within this card because its title is already the heading.
- **Publication detail:** the title, full authors and venue remain discoverable; a dedicated **Recommended IEEE-style citation** contains **authors → quoted title → italic journal/conference title → verified volume/issue/pages/article number → year → DOI**.
- **Book:** book title italic instead of quotation marks. Publisher, ISBN and year are included when available.
- **Book chapter:** chapter title in quotes; `in` and italic book title, plus available pages, publisher, ISBN and year.
- **Conference proceedings:** title in quotes; `in` followed by proceedings title and any recorded pages. Do not invent presentation locations, page ranges or publisher.
- Use **initial(s) + final recorded name token** for the IEEE-inspired byline. Already-abbreviated Scholar names like `AM Wahid` become `A. M. Wahid`, but we do not invent an unrecorded full first or last name. Single-word Indonesian personal names stay whole; Indonesian naming conventions do not always encode surnames.
- Style uses established Academic Minimal variables in light/dark; the content is typographic and flows on mobile.
- **Never fill missing fields from guesswork.** If metadata is incomplete, omit unavailable components. Only copy verified fields into source content.
- Site lists are newest-first, not **IEEE in-text citation order**. Thus this is consciously **IEEE-inspired bibliographic typography**, not a claim that the site as a whole is an IEEE-compliant manuscript reference list.

## Implementation

- `src/lib/publication-reference.ts`: source-preserving renderer for legacy venue patterns, author-initial normalization and format-specific punctuation. The parser only recognizes explicit field patterns; it does not scrape publishers or synthesize missing data.
- `src/components/PublicationReference.astro`: shared visible citation line for list/detail.
- `src/pages/publications.astro` and `src/pages/publications/[slug].astro`: use the same component; detailed page shows complete formatted reference.
- `scripts/check-ieee-bibliography.mjs`: controlled format samples, all-record audit and metadata gap counts. Report counts for later editorial verification rather than making a build fail just because information is absent.
- `scripts/check-site-quality.mjs`: verify rendered citation line exists on index/detail pages.

## Editorial anomalies reviewed

- Removed all-uppercase presentation from four records, preserving correct names and acronyms.
- Replaced a truncated ICITISEE conference name with the full conference name already recorded in other records.
- Replaced a malformed Google Books search string with the publisher and ISBN from the verified August 2026 CV.
- Restored a co-author on the social-media engagement paper from the profile owner's Google Scholar list.
- Preserved DOI, venue year, publication status, and links for all other records.

## Pending publisher metadata checks

**Automated audit baseline (43 records, 15 October 2026):**

| Audit indicator | Records | Interpretation |
| --- | ---: | --- |
| Publisher DOI not recorded | 15 | Not always an error: some published proceedings/books do not have DOIs; verify before adding |
| Parsed venue metadata needs review | 18 | Missing volume/page details or other incomplete journal/chapter venue information |
| Abbreviated author source records | 8 | Renderer consistently uses initials, but editorial source names may need verification |
| Legacy venue repeats publication year | 6 | Renderer suppresses an exactly matching trailing year; source remains retained |

Many older entries provide only the journal or conference name. A compact citation line is still rendered for these, without fictitious `vol.`, `no.` or `pp.` fields. For a full IEEE-compliant list, perform a separate evidence-based audit against Crossref/DOI and publisher articles. Check particularly:

- First-wave Google Scholar imports with short bylines and raw venue formats.
- Articles with only a journal name and DOI, missing issue/pages.
- Entries whose `year` does not obviously match the year embedded in DOI/issue metadata (online-first vs issue publication may differ).
- Book publisher versus full book title, editors and chapter pages.
- Conference articles whose proceedings or pagination are missing.

**Neither DOI nor current Google Scholar item count validates missing page ranges automatically.** Confirm details from the publisher before changing them.

## Non-goals and release boundaries

No source data changes beyond clearly listed editorial normalization; no live Scholar sync or citation count refresh. No modification to domain DNS/WordPress, finance/PPI apps, Neon, Supabase, or the PDF CV generator. Keep staging noindex and preserve existing URL slugs.
