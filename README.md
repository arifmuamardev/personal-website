# arifmuamar.com — Static Academic Website

Astro-based personal academic website for Arif Mu'amar Wahid. The site is designed as an academic identity hub centered on doctoral research in plant bioelectric signals and machine learning while retaining selected personal/research writing.

## Stack

- Astro 6
- TypeScript
- Markdown content collections
- Static HTML output
- GitHub Pages staging/deployment
- No CMS, PHP, database, or client-side framework

## Development

```bash
npm ci
npm run check
npm run build
npm run test:links
npm run dev
```

`npm run test:links` expects a completed `dist/` build.

## Content model

- `src/content/blog/` — blog posts; `draft: true` entries are not routed or indexed
- `src/content/publications/` — verified public publication records
- `src/content/projects/` — selected research projects linked to publication IDs
- `src/data/software-projects.ts` — public software portfolio (private apps omitted)
- `src/pages/portfolio/` — software portfolio index and case studies
- `src/data/profile.ts` — authoritative website profile, education, experience, contact, and academic-profile data

Do not duplicate personal/education data in individual pages. Update `src/data/profile.ts` first.

## Adding a publication

Create a Markdown file under `src/content/publications/`. Required fields include explicit `authors`, `year`, `venue`, `type`, and `status`. DOI values must use canonical `10.xxxx/...` form. Do not default an unverified item to Published.

Author names are arrays and preserve publication order:

```yaml
authors:
  - "First Author"
  - "Arif Mu'amar Wahid"
```

Use separate fields for `doi`, `publisherUrl`, `scholarUrl`, `pdf`, `code`, and `dataset`.

## Publication quarantine

Ambiguous or misattributed Scholar records are excluded from the public site and repository; review the original private source archive before adding any record.

## CV privacy

`public/files/arif-muamar-cv.pdf` is the public CV. Phone/WhatsApp numbers were redacted during the August 2026 repair. Keep private CV variants outside this repository.

## Separate staging and production modes

The default and safe behavior is **staging for the new `personal-website` GitHub repository**:

- `PUBLIC_SITE_MODE=preview` (default) → `https://arifmuamardev.github.io/personal-website/`, base-aware links, noindex.
- `PUBLIC_SITE_MODE=production` → `https://arifmuamar.com/`, root links, indexable; **do not enable until production cutover is approved**.
- GitHub Actions reads repository variable `PERSONAL_SITE_MODE`, default `preview`.

Use `npm run check:source` for the offline source invariant checks. The deployment
workflow performs a real build and generated-link audit on GitHub Actions.

**The staging URL is public.** `noindex` is an indexing request, not access control.

GitHub Pages staging intentionally uses:

- `<meta name="robots" content="noindex, nofollow">`
- `robots.txt` with `Disallow: /personal-website/`

Before production migration, use the explicit `PERSONAL_SITE_MODE=production` environment switch and follow `docs/production-migration-checklist.md`.

## Production migration

Do not connect `arifmuamar.com` until the staging site has been reviewed, old WordPress routes have been checked, and a rollback backup exists.

## Safe new-repository setup

1. Create a public repository named `personal-website` under `arifmuamardev`.
2. Commit the contents of this ZIP at the repository root on `main`.
3. Repository Settings → Pages → Build and deployment: **GitHub Actions**.
4. Keep `PERSONAL_SITE_MODE` unset (safe `preview`) and ensure the Actions build passes.
5. Open `https://arifmuamardev.github.io/personal-website/` and review.

**Do not upload this ZIP over the existing `arifmuamardev.github.io` repo:**
it currently contains the Financial Dashboard at `/finance/`.
`pilketos`, its Supabase backend, and the `ppi-ishikawa` repo are not modified.

## Limitations

The build is configured to be verified on GitHub Actions (Node 24). In an offline
environment where npm registry is unreachable, dependency installation and a
complete Astro build cannot be verified locally; this does not imply build success.
