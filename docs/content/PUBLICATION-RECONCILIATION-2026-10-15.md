# Publication Reconciliation and Public CV PDF Refresh — 15 October 2026

## Baseline and source of truth

- The Astro repository contained **38** individual `src/content/publications/*.md` records before this update.
- Compared these against the peer-reviewed publications, community-engagement
  papers, and books/chapters listed in the comprehensive master CV dated
  **14 August 2026**.
- Preserve previously indexed records that are absent from the master CV:
  absence alone does not demonstrate that a publication is invalid.
- Preserve the Astro publication collection as the canonical set of website
  bibliography records, with actual statuses and links on each item.

## Confirmed addition (38 → 39)

**Optimalisasi Pembelajaran melalui Workshop Pemanfaatan Kecerdasan Artifisial
bagi Guru SMK Negeri 1 Pekalongan**

- Authors: Arif Mu'amar Wahid, Ika Maulita, Gilang Dely Mukti,
  Firman Zamzami Aziz
- Venue: *DIMA: Jurnal Pengabdian Masyarakat* **4(1)** (2026)
- **Published 30 June 2026** (journal website)
- Official record:
  https://jurnal.universitaslia.ac.id/index.php/dima/article/view/237
- DOI: **not asserted** because not supplied in the publisher record.
- Website type: Journal Article / Published / community engagement.
- Identified as missing when comparing publication collection slugs with
  the master CV; added as a new content file, without altering other articles.

## Reconciled groups

The existing collection already has records corresponding to the CV's
ICCRAIDS and ICITISEE plant-BEP papers; 2026 landslide, re-enrollment
and e-commerce articles; 2025 applied-ML publications; 2024 journal,
IEEE conference, disaster, education and analytics articles; 2018
village administration paper; community-engagement articles; and 2024–25
books and chapters.

**Important:** some bibliographic entries use alternate transliterated
Indonesian/English titles or shortened author names; matching uses the
underlying work rather than insisting on exact spelling. A record that
differs in details needs evidence-based correction, not a blind overwrite.

## Not promoted to Published

- EECSI 2026 systematic review of BEP analysis
- ICTIIA 2026 IoT/plant traceability work
- Submitted scoping review/analogical transfer article
- Low-vision multimedia article under review

Their August status and presentation dates may be stale relative to
October; no source confirming final publisher bibliographic records
was integrated in this PR. Verify official DOI/proceedings before
adding or changing the site's `status` metadata.

## PDF source pipeline

Rather than maintaining another manually rewritten CV copy, every
GitHub Pages build runs:

1. `scripts/export-public-cv-data.mjs` (Node 24) exports the same
   `profile.ts` and `public-cv.ts` objects that render Home/About/CV.
2. `scripts/generate-public-cv-pdf.py` (ReportLab/PyYAML) reads those
   objects and all published `src/content/publications/*.md` records.
   Books/chapters are listed in their own section and not repeated in the
   journal/conference bibliography; unverified statuses are omitted.
3. `scripts/check-generated-public-cv.py` confirms the generated PDF
   is searchable, has the expected CV/bibliography sections and the
   newly verified DIMA paper, and does not contain known private fields.
4. The same output path `public/files/arif-muamar-cv.pdf` is then
   included in the Astro Pages artifact, so the website's existing
   download button retains its URL.

The **tracked PDF file** may remain the previous cached edition when
viewed directly in GitHub source: the version deployed on Pages is
generated during CI from the authoritative data. To refresh the cached
source file too, run the documented generation locally and commit the
verified binary separately. Do not use the unredacted LaTeX master.

## Privacy and accuracy policy

- No private phone/WhatsApp, membership number, organizational
  identifiers, union/religious/political affiliation details, precise
  funding amounts, stale Scholar metric counts, or unverified
  manuscript statuses.
- Grant experience does not imply the user was the principal
  investigator.
- Service appointments reflect the CV as of August 2026; do not claim
  current appointment without confirmation.
- The public PDF includes hyperlinks to academic profiles and DOIs.
- Maintain the Academic Minimal typography and accessibility.

## Follow-up editorial review

Confirm all bibliographic metadata—author order, abbreviated venues,
page ranges and DOI—for items previously imported from Google Scholar
rather than official publisher records. This is a gradual quality audit;
do not replace a correct venue with a guessed one.
