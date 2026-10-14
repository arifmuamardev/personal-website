# Google Scholar page-1 reconciliation — 15 October 2026

## Scope and evidence

The profile owner supplied a copy of the first **20** items shown on the Google Scholar profile `user=A6fWmZ8AAAAJ` and the Scholar sidebar citation metrics. It is **not** a full-profile export; there may be more records after "Articles 1–20".

The following metrics were directly **supplied by the owner** (not independently fetched from Scholar's API):
- As-of: **15 October 2026**.
- All time: **248 citations**, h-index **10**, i10-index **10**.
- Since 2021: **247 citations**, h-index **10**, i10-index **10**.

These are stored in `src/data/profile.ts` as `scholarSnapshot`. The Publications overview explicitly labels the snapshot and includes a link to the Scholar profile. **Do not call the numbers live.** The earlier cached SINTA counts are superseded as an owner-provided *snapshot*, but should not be rewritten or confused with the current Scholar profile.

## Match result for the first 20 records

| Outcome | Count | Treatment |
| --- | ---: | --- |
| Already indexed | 17 | Preserve article records |
| Not yet indexed | 3 | Verify official status |
| Page-1 Scholar items | 20 | Not the entire bibliography |

**Missing title A — publisher-verified and newly indexed**

*Transformer Adaptation for Plant Bioelectric Potential Classification: A Scoping Review and Analogical Transfer Framework*.

Arif Mu'amar Wahid, Wiga Maulana Baihaqi, Hidetaka Nambo. *Smart Agricultural Technology* 15 (December 2026), article **102484**, DOI **10.1016/j.atech.2026.102484**. Although the issue carries a December label, the paper is available online in 2026. Official ScienceDirect page: https://www.sciencedirect.com/science/article/pii/S2772375526007094

**Missing title B — publisher-verified and newly indexed**

*Pelatihan Pengelolaan Keuangan dan Pemasaran Digital bagiPengelola Warung Kopi Berbasis Masjid*.

Abdul Jahir, Amin Nasyith, Arif Mu'amar Wahid. *Solidaritas: Jurnal Pengabdian* 6(1), 1–8 (published 1 September 2026), DOI **10.24090/0f5e3258**. Publisher record: https://ejournal.uinsaizu.ac.id/index.php/sjp/article/view/15749 . The title's unusual joined word `bagiPengelola` is retained from the journal metadata for exact citation matching.

**Missing title C — conference program confirmed; publication NOT established**

*An Integrated IoT and Cloud-Based Contextual Traceability Platform for Controlled Plant Bioelectric Potential Experiments*.

Arif Mu'amar Wahid and Hidetaka Nambo. Included in the 3rd ICTIIA 2026 program, paper **#57**, September 18 2026. https://fliphtml5.com/mrfmf/ICTIIA-2026-Program-Book/32/ . The program shows acceptance/scheduling and presentation context, but does **not** provide a verifiable publisher proceedings record or IEEE DOI. Google Scholar's conference-listing entry is not alone proof that the full proceedings paper is officially published. **Do not mark Published or add it to the generated public CV PDF as a published paper until proceedings metadata can be independently confirmed.**

## Updated count and generated PDF

Prior to this reconciliation the website bibliography had **41** entries. We add only the two confirmed journal articles, bringing the site's curated bibliographic index to **43**. The program-book-only ICTIIA title is a reconciliation item, not yet a `Published` entry. The generated public CV PDF is automatically rebuilt by CI from the published collection (no duplicate books/chapters).

Website item counts, Scholar profile item counts, citation totals, and SINTA snapshot counts describe different datasets/metrics. Do **not** equate them.

## Next

1. Collect Scholar pages 21+, or a complete BibTeX export, to reconcile the full author profile.
2. Verify the ICTIIA 2026 proceedings and DOI; publish as a separate paper only after confirmation.
3. Re-check the journal official pages before editing author order, issue and DOI; preserve the DOI keys.
4. Update manually dated Google Scholar numbers only from a new user-supplied snapshot; do not pretend to sync them automatically.
5. Do not automatically import suggested co-author relationships; they are suggested UI items and not independently verified academic co-authorship claims.

## Safety

No DNS, WordPress, financial dashboard, PPI Ishikawa, database, Scholar account settings, or production-domain migration is changed in this work.
