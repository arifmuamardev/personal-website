# Publisher-Verified Bibliography Metadata — 15 October 2026

**Project:** `arifmuamardev/personal-website`  
**Prior audit:** `docs/content/IEEE-INSPIRED-BIBLIOGRAPHY-STYLE.md`  
**Scope:** 43 curated records, journal metadata completion; NO unverified DOI generation or conference proceedings inference.

## Evidence and changes

The initial IEEE formatter audit flagged **18 records for insufficient venue metadata**. During this batch, **18 named journal records** were checked against publisher article pages or journal-issued PDFs and updated with verified bibliographic fields. The same work fixed a provable three-author omission and one issue-year discrepancy. Other records remain unchanged unless separately documented. The follow-up CI log is the authoritative measurement of how many formatter warnings remain after this batch.

| Short title | Verified journal metadata | Publisher evidence |
| --- | --- | --- |
| Analysis of Factors Determining Student Satisfaction | *Jurnal Teknik Informatika (Jutif)* **5(4)**, **187–196** (2024) | https://jutif.if.unsoed.ac.id/index.php/jurnal/article/view/2188 |
| Analyzing Customer Spending | *International Journal for Applied Information Management* **5(2)**, **111–124** (2025) | https://ijaim.net/journal/index.php/ijaim/article/view/103 |
| Empirical Analysis of Social Media Interaction Metrics | *International Journal of Informatics and Information Systems* **8(3)**, **161–174** (2025) | https://ijiis.org/index.php/IJIIS/issue/view/26 |
| Implementasi Pelatihan Kesiapsiagaan Bencana Gempa Bumi (SFDRR) | *JURPIKAT* **6(4)**, **2121–2130** (2025) | https://jurnal.politeknik-kebumen.ac.id/jurpikat/article/view/2641 |
| Enhancing Collaboration Data Management | *Jurnal Teknik Informatika (Jutif)* **5(6)**, **1517–1527** (2024) | https://jutif.if.unsoed.ac.id/index.php/jurnal/article/view/1747 |
| Impact of Discount Strategies | *Journal of Applied Data Sciences* **5(1)**, **158–172** (2024) | https://www.bright-journal.org/Journal/index.php/JADS/article/view/163 |
| AI in Marketing and Technology Readiness | *ASEAN Journal of Scientific and Technological Reports* **29(1)**, **e258998** (issue 2026) | https://ph02.tci-thaijo.org/index.php/tsujournal/article/view/258998 |
| Fraudulent Transaction Detection | *Journal of Cyber Law* **1(1)**, **88–115** (2025) | https://jcl.mbicore.com/index.php/jcl/article/view/16 |
| From Prediction to Targeting | *Sinkron* **10(1)**, **755–770** (2026) | https://jurnal.polgan.ac.id/index.php/sinkron/article/download/15703/3837/28032 |
| GAN-Enhanced RBFN Landslide Susceptibility | *Journal of Applied Data Sciences* **7(1)**, **554–566** (2026) | https://www.bright-journal.org/Journal/index.php/JADS/article/view/1035 |
| Mining Public Sentiment and Trends | *Journal of Digital Society* **1(2)**, **138–151** (2025) | https://doi.org/10.63913/jds.v1i2.18 |
| Optimization of Recommender Systems | *Journal of Applied Data Sciences* **6(2)**, **952–968** (2025) | https://www.bright-journal.org/Journal/index.php/JADS/article/view/671 |
| Optimizing Higher Education Performance | *Jurnal Nasional Teknologi dan Sistem Informasi* **10(3)**, **201–215** (issue 2024) | https://doi.org/10.25077/TEKNOSI.v10i3.2024.201-215 |
| Pemanfaatan Teknologi Pembelajaran Inklusif | *JURPIKAT* **6(4)**, **2084–2092** (2025) | https://www.jurnal.politeknik-kebumen.ac.id/jurpikat/article/view/2629 |
| Penguatan Keterampilan Menulis Ilmiah | *Jurnal Abdi Masyarakat Indonesia* **5(5)**, **2053–2062** (2025) | https://jamsi.jurnal-id.com/index.php/jamsi/article/view/2082 |
| Prediksi Magnitudo Gempa | *Jurnal Pendidikan dan Teknologi Indonesia* **4(5)**, **221–232** (2024) | https://jpti.journals.id/index.php/jpti/article/view/470 |
| Time Series Analysis of Bitcoin Prices | *Journal of Digital Market and Digital Currency* **1(1)**, **84–102** (2024) | https://jdmdc.com/index.php/JDMDC/article/view/1 |
| Transformasi Media Pembelajaran | *JURPIKAT* **6(3)**, **1666–1675** (2025) | https://jurnal.politeknik-kebumen.ac.id/jurpikat/article/view/2531 |

For the 16-page *Sinkron* PDF, the printed pagination runs **755 through 770**; these endpoints were verified in the publisher PDF rather than extrapolated solely from the file length.

## Important source disagreements and provenance

1. **AI in Marketing and Technology Readiness:** the publisher's page says first published online December **2025**, but issue classification is **vol. 29, no. 1 (2026)**. The site `year` now follows the definitive issue year **2026**, consistent with the user-supplied Google Scholar page-1 list. This is an issue-year choice, not a claim the work first went online in 2026.
2. **Optimizing Higher Education Performance:** the journal issue is **10(3) (2024)**, but the final paper was published online **January 2025**. The site retains `year: 2025` as already recorded; do not silently infer that the online publication date was in 2024 from the journal issue/DOI alone.
3. **Optimization of Recommender Systems:** the publisher lists **Arif Mu'amar Wahid, Taqwa Hariguna, Giat Karyono**. The old site frontmatter had only Arif. Added the other two in authoritative publisher order, matching previously known 2024 related work; not a guess from Scholar initials.
4. **ASEAN journal:** `e258998` is an **article number**, not a page range. The display formatter was extended to render `vol. 29, no. 1, Art. no. e258998`.
5. Bibliographic venue fields were updated only where publication source records directly support them. Missing conference pagination, inaccessible pages, unknown DOI, or ambiguous short-form author names are **not invented**.

## Display QA and audit improvements

- `src/lib/publication-reference.ts` understands journal electronic article numbers and flags volume-only journal records as still incomplete.
- `scripts/check-ieee-bibliography.mjs` asserts the verified metadata on all 18 entries, requires publisher URLs, tests electronic article ID output, and reports remaining problems.
- The actual GitHub Pages PDF CV generator still reads the same source collection and will incorporate the corrected venues when the PR is deployed.
- Existing citations use IEEE-inspired presentation, not a literal IEEE manuscript reference-list ordering.

## Remaining tasks

- The revised audit remains strict about page numbers and article IDs. One outstanding item is **“Optimalisasi Pembelajaran melalui Workshop Pemanfaatan Kecerdasan Artifisial bagi Guru SMK Negeri 1 Pekalongan”** in *DIMA* **4(1)**. The publisher article page and official issue page supply the article/issue information but do **not** provide a definite page range. Leave this venue as **DIMA 4(1)** instead of inventing a page range; resolve only when the publisher PDF or catalog provides reliable printed pagination.
- Record updated actual CI counts after the final branch passes.
- Verify older Scholar imports' abbreviated author names and any remaining venue-year duplicates in a separate, source-backed cleanup.
- Check other publications for incomplete **page ranges** even if their earlier `venue` fields passed the coarse initial parser.
- Manual desktop/mobile/light/dark visual review remains outstanding. CI verifies structural output, not pixel accuracy.

No DNS, WordPress, PPI Ishikawa, Finance Dashboard, Neon, or Supabase changes are part of this PR.
