# Prelaunch quality audit — 2026-10-14

Scope: `arifmuamardev/personal-website` staging; production DNS **must not change** as part of this audit.

## Verified from GitHub Actions and source
- Batch B GitHub Pages deployment succeeded (run #38538716111).
- The site is built statically with Astro; this repository contains no live database backend.
- Preview mode uses the project subpath `/personal-website/` and must remain **noindex**.
- Migration bridge pages exist for `/category/blog/`, `/author/arifmuamar/`, and `/feed/`; these are HTML refresh bridges, **not** true HTTP 301 redirects.
- The five original WordPress blog post slugs are represented as static Astro blog routes.
- CSS text/accent contrast ratios against their respective page backgrounds were estimated from the HSL tokens; key text tokens exceed WCAG AA for normal text. Contrast alone does not prove overall accessibility.

## CV and scholarly metadata
- The checked public CV source is three A4 PDF pages. The pages render legibly in local PDF inspection.
- Text inspection did not find typical phone-number/WhatsApp strings; the PDF intentionally includes professional email addresses and public scholarly profile links.
- Publication source collection has 38 entries marked `Published`, of which 14 have no DOI and 34 have no publisher URL recorded. **Missing DOI is not automatically an error** (some material does not receive one).
- Citation attribution, venue, year, and publication status require manual source-by-source verification before the production domain switch. The status label in source is not independent evidence of publication.

## New CI gate
`npm run test:quality` checks generated HTML for:
- exactly one h1 and a main landmark on normal pages;
- language, viewport, title, description, canonical URL and Open Graph description;
- image alt attributes, duplicate IDs, and `target=_blank` links without `rel=noopener`;
- staging/production robots policy and 404 noindex;
- required deployment artifacts and WordPress bridge pages.

This complements source audit and generated internal-link validation already in CI. It does **not** replace browser/device inspection, full axe accessibility testing, external link checks, or security assessment.

## Still open before domain cutover
1. **Manual visual review** at 320/375/768/1024/1440 px, with light and dark preferences, because a live graphical browser inspection of the deployed site is not yet recorded.
2. **WordPress export and reliable rollback copy** (DB/uploads/content), then test exact legacy URLs.
3. **Decide on Cloudflare HTTP 301 rules** for legacy category, author and feed routes. Do not add broad wildcard redirects.
4. **Verify bibliography** against publishers and DOI pages; reconcile public CV and source.
5. **Inspect profile links, CV PDF download, keyboard tab sequence and focus, overflow, color contrast in context**.
6. **Confirm no personal finance app or PPI routes** depend on changes to the domain or user GitHub Pages custom domain.
7. **Obtain explicit approval** before enabling production mode, changing custom-domain settings or editing DNS.

Current decision: **NO PRODUCTION CUTOVER**; staging improvement can continue independently.
