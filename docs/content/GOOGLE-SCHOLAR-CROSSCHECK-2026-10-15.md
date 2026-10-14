# Google Scholar cross-check — 15 October 2026

## Why this audit

The site owner supplied their Google Scholar profile:
https://scholar.google.com/citations?user=A6fWmZ8AAAAJ&hl=en

Direct automated access returned **HTTP 429**. As a result, this update must NOT be described as a complete live Google Scholar synchronization. The profile link stays available on the homepage and is now highlighted on `/publications/`.

## What was verifiable

SINTA author **6967121** contains a cached Google Scholar mirror:
https://sinta.kemdiktisaintek.go.id/authors/profile/6967121/?view=googlescholar

The SINTA snapshot observed during the audit reports 38 Google Scholar records, 162 citations, h-index 8 and i10-index 8. Its crawl is approximately two months old and it may not reflect Google Scholar today; **no numbers are imported into the public website**. Google Scholar and SINTA may count and group works differently, so their totals should not be equated with the website's bibliographic item count.

The following previously absent publications were independently verified at the original publisher and Garuda:

1. **Dynamic Knowledge Intelligence for Human AI Collaborative Operational Decision Making Across Distributed Enterprise Data Environments** — Arif Mu'amar Wahid, Rizky Rahmatullah. International Journal for Applied Information Management **6(3), 382–401** (2026), DOI **10.47738/ijaim.v6i3.129**. Official publication: https://ijaim.net/journal/index.php/ijaim/article/view/129
2. **Transnational Academic-Community Partnerships: Facilitating Financial Capability and Remote Higher Education for Indonesian Overseas Workers in Japan** — Dhanar Intan Surya Saputra, Imam Tahyudin, Arif Mu'amar Wahid, Achmad Gazali, Miqdad Al Muflih, Rujianto Eko Saputro. JMM (Jurnal Masyarakat Mandiri) **10(4), 4986–4997** (2026), DOI **10.31764/jmm.v10i4.40479**. Official issue: https://journal.ummat.ac.id/index.php/jmm/issue/view/1141 ; Garuda: https://garuda.kemdiktisaintek.go.id/documents/detail/6627875

Neither of these had an existing article record by title/slug in the main Astro collection. These records increase the **website's own bibliographic index from 39 to 41**, without implying Google Scholar has 41 items.

## Rules for future reconciliation

- **Publisher DOI and official records** establish publication details; Google Scholar is a discovery and citation service, not an authoritative editorial source.
- Never transfer Google Scholar citations, h-index, i10-index, or citation-by-year figures from a historical SINTA mirror into a dynamically titled "current" metric.
- Match literature by normalized title + DOI + authors, not by file slug alone; avoid duplicates and false title matches.
- Publications on the website are curated, not necessarily identical to Google's profile or SINTA counts.
- Each confirmed `Published` record is included in the generated public CV PDF during GitHub Actions, but individual citation counts are excluded.
- This commit does not add unverified manuscripts or submit private credentials to scrape Google Scholar.
- Complete Scholar reconciliation awaits a current Google Scholar export or user-provided complete screenshot/CSV/BibTeX list. Bibliographic metadata and citation totals should be reviewed separately.
