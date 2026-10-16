# Batch 28 — Bibliography and academic-service evidence audit

**Date:** 16 October 2026  
**Scope:** all 43 current `src/content/publications/*.md` records, selected current appointment/service claims, historical source reconciliation.  
**Status:** automated structural audit completed; publisher-by-publisher factual verification is **not** complete for every record.

## What was actually checked

1. All 43 front-matter records were inspected for type, year, status, byline count, DOI presence, publisher-link presence, and usable citation venue. `npm run audit:publications` checks unique titles and DOI identifiers, plausible years, author identity, and the two known online/issue date exceptions. Use `npm run audit:publications -- --ledger` for the **full 43-record traceability inventory** in Markdown format.
2. Older provenance records were reused, especially `PUBLISHER-VERIFIED-BIBLIOGRAPHY-2026-10-15.md` (18 previously checked journal venues), `AUTHOR-IDENTITY-AND-SOURCE-CLEANUP-2026-10-15.md` (selected author corrections) and `GOOGLE-SCHOLAR-PAGE1-RECONCILIATION-2026-10-15.md` (20 owner-supplied Scholar entries, not the whole list).
3. Additional authoritative publisher pages were checked for the cases below. All have links to their source; this is **not** a claim that other untouched records were individually authenticated against their publishers.
4. Journal-editorial, peer-review, and journal-contact listings were checked against **current** official pages; older roles are qualified rather than presumed to continue unchanged.

## Publisher-verified decisions in this batch

| Record | Decision | Source |
| --- | --- | --- |
| Optimizing Higher Education Performance Through Data Integration Using the Zachman Framework | Corrected the bibliographic title capitalization and unwrapped a folded title. Retained **2025** because publisher dates online publication **11 January 2025** and recommends citing it as 2025; the issue itself is **Vol. 10 No. 3 (2024)**. Show the distinction on its detail page. | https://teknosi.fti.unand.ac.id/index.php/teknosi/article/view/2853 |
| Peningkatan Kapasitas Digital Berkelanjutan pada PAC GP Ansor Kroya | Kept issue classification **Vol. 4 No. 2 (2024), 197–208**, exact DOI `10.24090/sjp.v4i1.12671` (the DOI contains `v4i1` but the actual article and printed issue say **4(2)**). The publisher reports online publication **28 January 2025**. Detail page now explains this. | https://ejournal.uinsaizu.ac.id/index.php/sjp/article/view/12671 |
| Transformer Adaptation for Plant Bioelectric Potential Classification | Publisher identifies *Smart Agricultural Technology* **15 (December 2026)**, Article 102484 and 182 reviewed studies. Recorded as already available online in 2026; **not** a future unpublished study merely because of the issue month. No metadata changed in this batch. | https://www.sciencedirect.com/science/article/pii/S2772375526007094 |
| Pelatihan Pengelolaan Keuangan dan Pemasaran Digital bagiPengelola Warung Kopi Berbasis Masjid | Confirmed publisher's unusual joined title `bagiPengelola`, author list, Vol. 6 No. 1 (2026), pages 1–8 and DOI. Preserve exact publisher title for bibliographic fidelity rather than silently inserting a space. | https://ejournal.uinsaizu.ac.id/index.php/sjp/article/view/15749 |
| Dynamic Knowledge Intelligence for Human AI Collaborative Operational Decision Making | Confirmed Arif Mu'amar Wahid, Rizky Rahmatullah; `6(3), 382–401` and DOI `10.47738/ijaim.v6i3.129` (published August 2026). No correction needed. | https://ijaim.net/journal/index.php/ijaim/article/view/129 |
| Transnational Academic-Community Partnerships | Official journal issue lists six authors and pages 4986–4997 in Vol. 10 No. 4 (2026); no change. | https://journal.ummat.ac.id/index.php/jmm/issue/view/1141 |
| Optimalisasi Pembelajaran ... bagi Guru SMK Negeri 1 Pekalongan | Official DIMA page confirms publication **30 June 2026**, author list and 4(1), but **does not display a page range**. Do not invent pages/DOI. | https://jurnal.universitaslia.ac.id/index.php/dima/article/view/237 |

### Important definitions

- **Structurally checked:** bibliography fields are populated and syntax/invariant checks pass. This does *not* establish authoritative author ordering, DOI resolution, or publisher page correctness.
- **DOI recorded:** a plausible DOI string exists in the repository. This does not mean the DOI resolved during CI. Missing DOIs for books, older conference papers and community-engagement journals may be legitimate.
- **Publisher verified:** the individual official source was consulted and supports the specific field(s) listed. Earlier October 15 publisher verifications are documented in their separate dated ledger; no inflated global verification percentage is claimed.

## Academic role reconciliation

| Role | Public source observation | Treatment |
| --- | --- | --- |
| TIERS Information Technology Journal | Arif Mu'amar Wahid appears on the official national editorial board. https://journal.undiknas.ac.id/index.php/tiers/about/editorialTeam | Keep editorial role; link its current official listing. |
| Jurnal Pendidikan dan Teknologi Indonesia (JPTI) | Official reviewer roster includes Arif Mu'amar Wahid. https://jpti.journals.id/index.php/jpti/reviewers | Keep reviewer role; link the roster, but roster appearance does not establish a particular number of reviews. |
| International Journal for Applied Information Management (IJAIM) | August 2026 CV listed **Executive Manager / Principal Contact**. Current journal contact page lists the user under **Support Contact**; an older indexed version of that same page listed the older title. https://ijaim.net/journal/index.php/ijaim/contact | Preserve exact old title as a **dated historical CV record** and add a visible status note; do not claim it is still the current principal-contact role. |
| Universitas Amikom Purwokerto quality-assurance/staff role | University's online staff directory lists **LP3M, Staf LP3M**, while the August profile lists a **quality-assurance/development unit** and a 2017–present period. https://staff2.amikompurwokerto.ac.id/ | Do **not** substitute organizational unit or change dates without confirming how the unit evolved and the user's current study-leave appointment. |
| Lecturer at Amikom | Lecturer appointment appears in the curated August 2026 CV; latest personnel status while on MEXT doctoral study leave is not established by an authoritative current staff record in this pass. | Keep an August-CV dated caveat; do not invent a precise new HR status. |
| Artificial Intelligence in Learning, Support Contact | From curated August 2026 CV; current official page not independently verified here. | Preserve as a dated record rather than upgrading to verified current role. |

## Further priorities for source review

1. **Books and chapters:** check ISBN, year, co-author order and title page for `Multimedia Interaktif`, `Pemrosesan Bahasa Alami`, and 2024 book chapters. The prior ledger documents a possible edition/imprint discrepancy for `Multimedia Interaktif`.
2. **Older conference papers:** resolve archival proceedings for `Village Administration Services Information System` (2018) and `Predicting Post-Earthquake Building Damage` (2024); do not fabricate DOIs.
3. **Community engagement articles without a DOI:** verify original publisher PDFs and canonical landing pages for the Intel SFI and SMK digital literacy records.
4. **All residual abbreviated bylines:** check exact author order against official title-page or publisher HTML, with long collaborative books prioritized.
5. **Journal citation-year policy:** decide whether index grouping should follow issue year or publisher-recommended citation year when they diverge. Keep transparent detail notes in the meantime.
6. **Scholar reconciliation:** page 1 covered only 20 records; additional Scholar pages are needed before claiming complete profile parity.
7. **ICTIIA 2026 program-book entry:** previous evidence supports the conference listing but not a publisher proceedings DOI; do not add as published until officially verified.

## Release boundaries

This batch does not change GPA/privacy policy, hidden CV/PDF, hidden Pilketos, DNS, hosting, user email services, or other repositories. The academic page continues to distinguish doctoral **study in progress** from awarded degrees. No roles or paper results were invented.
