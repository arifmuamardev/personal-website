# Bibliography author identity, source cleanup and bold profile name

**Date:** 15 October 2026  
**Collection:** 43 records in `src/content/publications`  
**Scope:** source-backed author names, repeated-year venue cleanup, reliable DOI enrichment, user-friendly highlighting.

## Owner-name emphasis

The profile author's byline is now **bold** in:

- the Home selected publications list (`PublicationAuthors.astro`);
- the Publications index, IEEE-inspired citation lines (`PublicationReference.astro`);
- the publication detail page's full author list and the complete citation.

Both components call the same `isProfileAuthor` matcher in
`src/lib/publication-reference.ts`. Supported source aliases include
`Arif Mu'amar Wahid`, `Arif Mu’amar Wahid`, `AM Wahid`, `A. M. Wahid`,
`Arif Mu’amar`, and `A Mu’amar`.

The matcher **never** highlights someone merely because their name contains
`Arif` or `Wahid`. This prevents accidentally emphasizing unrelated
coauthors. The same function handles owner credits recorded in original
publisher forms.

IEEE references usually abbreviate a long author list with *et al.*
under certain conditions. This **personal website** intentionally displays
**all source-listed authors**, even when there are more than six, so that
the owner's actual authorship position (for example, seventh author on a
collaborative book) is preserved and can be emphasized. Thus the display is
**IEEE-inspired**, not a promise of literal IEEE manuscript-reference compliance.

## Verified author normalization

| Publication | Verified author identity and venue/DOI | Source |
| --- | --- | --- |
| Analisis Komparatif ... Prediksi Banjir | Ika Maulita; Chyntia Raras Ajeng Widiawati; Arif Mu'amar Wahid. DOI 10.52436/1.jpti.599 | https://jpti.journals.id/index.php/jpti/article/view/599 |
| Comparative Analysis of ML Models for Predicting Pest/Disease in Rice | Abdul Azis; Arif Mu'amar Wahid; Dyah Ayu Widyaningsih; Khanivia Yuniska Putri. DOI 10.1109/ICITISEE68184.2025.11355103 | https://www.researchgate.net/publication/400200198_Comparative_Analysis_of_Machine_Learning_Models_for_Predicting_Pest_and_Disease_Outbreaks_in_Rice_Crops_Based_on_Weather_Conditions |
| Economic Decentralization through Blockchain | **Berlilana** and **Arif Mu’amar**, not a solo-authored paper. DOI 10.47738/jcrb.v1i2.14 | https://jcrb.net/index.php/Journal/article/download/14/15/79 |
| Exploring the Impact of Discount Strategies on Consumer Ratings | Berlilana; Arif Mu’amar Wahid; Dewi Fortuna; Alfin Nur Aziz Saputra; Galih Bagaskoro | https://www.bright-journal.org/Journal/index.php/JADS/article/view/163 |
| Pelatihan Intel SFI Framework | Akto Hariawan; Arif Mu'amar Wahid; Teppei Jordy L'ga Tama; Sultan Ananda Haikal; Prayoga Pribadi | https://garuda.kemdiktisaintek.go.id/documents/detail/5768323 |
| Peningkatan Kapasitas Digital Berkelanjutan pada PAC GP Ansor Kroya | Andi Dwi Riyanto; Arif Mu'amar Wahid; Aniec Anafisah Pratiwi. DOI 10.24090/sjp.v4i1.12671 | https://ejournal.uinsaizu.ac.id/index.php/sjp/article/view/12671 |
| Peningkatan Kompetensi Literasi Digital Siswa SMK Mitra | Agung Prasetyo; Arif Mu'amar Wahid; Desta Olivia | https://garuda.kemdiktisaintek.go.id/documents/detail/5768325 |
| Predicting Post-Earthquake Building Damage | Ika Maulita and Arif Mu'amar Wahid | https://conf.unnes.ac.id/index.php/snik/snik2023/paper/download/717/551 |
| Pemrosesan Bahasa Alami (book) | Chyntia Raras Ajeng Widiawati and Arif Mu'amar Wahid | https://books.google.com/books/about/PEMROSESAN_BAHASA_ALAMI_Konsep_Algoritma.html?id=bKlOEQAAQBAJ |
| Optimasi Logistic Regression dan Random Forest untuk Deteksi Berita Hoax | Arif Mu'amar Wahid; Turino; Khabib Adi Nugroho; Titi Safitri Maharani; Darmono; Fandy Setyo Utomo. DOI 10.52436/1.jpti.602, **pp. 381–392** | https://jpti.journals.id/index.php/jpti/article/view/602 |

The source files previously contained shortened or incomplete author credit on
the listed records; all changes above have explicit independent source support.
Two sources with issue-year 2024 but online dates in 2025 retain the
website's **2024 issue-year classification** (JPTI hoax/bank flood and Solidaritas
digital capacity). The online dates are not represented as the 2024 online
release date.

## Venue normalizations

The six imported fields that ended in a redundant publication year are now
normalized to the same pattern as other journal records, with no loss of
verified issue/pagination:

1. Analisis Komparatif Linear Regression... — JPTI **4(8), 369–379**
2. Economic Decentralization... — Journal of Current Research in Blockchain **1(2), 112–123**
3. Optimasi Logistic Regression... — JPTI **4(8), 381–392** (corrected, not the earlier incorrect 1–12)
4. Pelatihan Intel SFI... — Community Impact and Society Empowerment Journal **1(2), 36–41**
5. Peningkatan Kapasitas Digital... — Solidaritas **4(2), 197–208**
6. Peningkatan Kompetensi Literasi Digital... — Community Impact and Society Empowerment Journal **1(2), 50–58**

The corresponding IEEE renderer still omits fields not established in the
source and maintains the original 43 publication routes.

## Outstanding editorial work

- Not every author across all 43 records is fully verified. Some prior records
  (e.g., multi-author books) still contain abbreviated contributor names.
  Verify against books' title pages, preferably not metadata resold by stores.
- Citation source availability varies; DOI absence may be legitimate for
  books or proceedings and must not be treated as proof of an error.
- One DIMA journal article still has no verified page range; do not invent one.
- The `Multimedia Interaktif` bibliographic source lists a 2024 publisher
  while an external bookstore catalog shows a 2025 date and different
  imprint. Preserve the previously recorded source until an ISBN/title-page
  check resolves whether these are different editions.
- Keep Google Scholar statistics as their dated user-provided snapshot;
  do not modify metrics in this editorial batch.

## Release quality

- Every owner-alias match (including shortened names) and non-owner false
  positive is regression tested.
- IEEE-initial bylines never hide the user behind `et al.` due to author count.
- Generated site HTML checks bold credit in a normal paper, shortened-name
  publisher case, long-author collaborative book and the homepage.
- All Astro links, preview robots/SEO, PDF CV build, privacy and production
  dry-run tests must remain green. No domain/DNS/WordPress/backend changes.
