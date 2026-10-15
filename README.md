# arifmuamar.com — Academic Website

Static Astro 6 / TypeScript academic site for Arif Mu'amar Wahid, hosted by GitHub Pages at https://arifmuamar.com/.

## Production and previews

- The `main` GitHub Actions workflow sets `PUBLIC_SITE_MODE=production` for push builds. The site is rooted at `/`, uses the production domain for canonical links and the sitemap, and permits indexing.
- Pull-request builds use `PUBLIC_SITE_MODE=preview`, with base `/personal-website/` and `noindex`. Local builds default to preview unless `PUBLIC_SITE_MODE` is specified.
- The deprecated `PERSONAL_SITE_MODE` repository variable is **not used**.
- Cloudflare DNS routes the apex via GitHub Pages A records and `www` via CNAME; they currently use DNS-only. Do not touch unrelated email, conference or IoT subdomains.
- Keep the WordPress backup and old host address documented in `docs/production-arifmuamar-cutover-2026-10.md` for rollback.
- The separate `arifmuamardev.github.io` repository (including `/finance/`), `ppi-ishikawa` and other applications are outside this repo.

## Development and validation

```bash
npm ci
npm run check
npm run build
npm run test:links
npm run test:quality
```

`npm run test:links` and `npm run test:quality` require a built `dist/` directory. For a local production check, run `PUBLIC_SITE_MODE=production npm run build` before the tests. CI additionally verifies the bibliography formatter, theme behavior, CV privacy and generated PDF, site templates and the design labs.

## Content

- `src/data/profile.ts` is the authoritative identity/education/affiliation record.
- `src/data/public-cv.ts` covers selected verified academic experience.
- `src/content/publications/` contains curated publication records; bibliographic metadata and status must be source-backed. Missing DOIs are not automatically errors.
- `src/content/projects/` contains research projects linked to publication IDs.
- `src/content/blog/` contains migrated articles; `draft: true` prevents routing.
- The public CV PDF is regenerated and checked in GitHub Actions before site deployment. Keep private CVs outside this repository.

The publications index supports client-side search across title, author, venue, research area and keywords, plus year and type filters. All entries remain visible if JavaScript is disabled.

## Software showcase paused

At the owner's request on 16 October 2026, the public Pilketos route and the empty software portfolio index were removed from deployment, navigation, and public design labs. The source and previous case-study work remain recoverable in Git history, not in generated public pages. Software-related professional experience can still be described in the biography; do not restore Pilketos publicly without a new request.

## Outstanding post-launch verification

See `docs/POST-LAUNCH-2026-10-16.md`. GitHub build success is not equivalent to Search Console indexing, verified HTTP 301 redirects, screenshot-based mobile testing, Lighthouse results, keyboard/axe accessibility, or healthy external links.
