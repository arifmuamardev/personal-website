> **16 October 2026 update:** The owner has paused the combined public CV page and downloadable PDF, replacing them with five topic pages accessible from About: Education, Experience, Teaching, Academic Service, and Recognition. The generated public CV PDF is no longer deployed or rebuilt. This document is retained as a **historical audit** of the October 14–15 CV integration. See the current README for live URLs and release policy.

> **15 October 2026 update:** The public PDF is now rebuilt by CI from the same site data and indexed publications; the earlier note saying the public PDF is unchanged describes only the 14 October integration. See [the reconciliation and PDF build report](./PUBLICATION-RECONCILIATION-2026-10-15.md).

# Public CV integration audit — 14 October 2026

## Source and scope

The user requested that content from the comprehensive LaTeX CV
`arif_muamar_wahid_cv_2026_complete_v4.tex`, last updated **14 Aug 2026**,
be integrated into the personal website. This is a **private working source**
and is **not committed** to the public repository.

Source data is curated in `src/data/profile.ts` (academic identity, education,
experience and recognition) and `src/data/public-cv.ts` (public CV details).
Website components render those data without maintaining separate conflicting
copies of the same details.

## What is included

| CV category | Website destination | Treatment |
| --- | --- | --- |
| Professional bio & research emphasis | Home, About, Research | Updated and consolidated |
| Current academic roles and schools | Home, About, CV | Affiliation retained; master's/BSc periods and teaching roles corrected |
| Education, master's/undergraduate theses and GPA | About, CV | Full dates and results, as recorded in Aug 2026 CV |
| Experience, including teaching/research assistant | About, CV | 2023–24 assistant position added |
| Award, honors, scholarship | Home selected; About and CV full list | 2024 Indoneris Data Mining 2nd place added |
| Professional memberships | CV | JSAI/IPSJ only, no membership numbers |
| Teaching and technical competencies | About, CV | Descriptive, no invented proficiency claims |
| Selected academic leadership | About, CV | Historical academic governance roles |
| Journal editorial / reviewing / conference service | About, CV | Explicitly dated to August 2026 CV; not verified as live appointments |
| Conference and poster presentations | CV | Recorded past presentations only |
| Funded projects | Research and CV | Five 2024 projects; no invented PI role or grant-holder claims |
| Books and book chapters | CV | Titles and ISBNs from master; bibliography still on Publications |
| HKI / intellectual property | CV | Recorded co-created works without exposing registration IDs |

## Deliberately withheld from the public website

- Personal phone numbers and WhatsApp.
- Membership IDs, union affiliation and union membership identifiers.
- Sensitive religious/political/organizational affiliation histories not
  needed for the professional profile.
- Precise funding amounts, not needed to describe research participation.
- Google Scholar citation/h-index snapshot numbers that may be out of date.
- Full master LaTeX source, private metadata, and original personal attachments.
- Submitted, accepted, or prospective 2026 work whose **current** status is
  unknown. CV dates from August, and "forthcoming" is not a fact about October.
- Public CV PDF is **unchanged**: its previous short edition may have fewer
  records than the updated CV web page. Keep that distinction explicit.

## Publications reconciliation (not an auto-publish operation)

The existing site has a separate Astro content collection of papers, books,
chapters and community work. The CV was NOT used to blindly overwrite its
`status: Published` fields or duplicate records with alternate titles.

The August 2026 master contains an additional community engagement item:
`Optimalisasi Pembelajaran melalui Workshop Pemanfaatan Kecerdasan Artifisial
bagi Guru SMK Negeri 1 Pekalongan` in `DIMA` 4(1) (2026), which does not
currently have a matching page slug in the site's publications collection.
Verify the exact publisher record and bibliographic details before adding it.

For `EECSI 2026`, `ICTIIA 2026`, the scoping review submission and
the low-vision multimedia manuscript, keep the August statuses as historical
CV notes only, not new October publication assertions, until the official
acceptance/publisher links are confirmed.

## Next editorial review

- Confirm whether each dated service role remains current after Aug 2026.
- Check presentation and publication metadata against conference proceedings.
- Check that all five books/chapters already indexed have matching title/ISBN.
- Update the downloadable **public** CV PDF separately when ready; never
  compile/release the unredacted master.
- Review whether additional public leadership roles should be displayed.
- Preserve Academic Minimal template, shared light/dark switch, and mobile
  presentation throughout.

## Build and privacy release gates

`node scripts/check-public-cv.mjs` checks the curated public data and Astro
pages for expected references and accidental sensitive-field indicators.
Normal Actions checks continue to verify source, Astro build, generated
links and assets, template contract, SEO/noindex and production dry-run.
No domain or backend migration is part of this change.
