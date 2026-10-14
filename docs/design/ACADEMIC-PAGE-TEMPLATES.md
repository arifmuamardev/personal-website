# Academic Minimal — Page Template Contract

Status: **active implementation**, linked to [ADR-001](./ADR-001-ACADEMIC-MINIMAL.md) and [Academic Minimal Guide](./ACADEMIC-MINIMAL-GUIDE.md).

## Template architecture

The site shares **one** responsive header/footer and theme switch via
`src/layouts/Layout.astro`. Layout, canonical, SEO, skip link, navigation,
and footer behavior must never be copied into individual pages.

| Template | Routes / files | Shared component | Rules |
| --- | --- | --- | --- |
| Personal identity | `/` | `Layout` | portrait, name H1, verified affiliation, selected work lists |
| Overview | `/about/`, `/research/`, `/projects/`, `/publications/`, `/portfolio/`, `/blog/`, `/cv/`, `/contact/`, `/privacy/` | `PageIntro` in `section.academic-index` | left aligned H1, concise explanation, thin rule, optional action, editorial lists |
| Article detail | `/{blog-slug}/` | `PageBreadcrumb` | breadcrumb, left aligned serif H1, date/category, narrow long-form |
| Publication detail | `/publications/{slug}/` | `PageBreadcrumb` | breadcrumb, authors, venue, abstract and evidence links |
| Software case study | `/portfolio/pilketos/` | `PageBreadcrumb` | breadcrumb, factual implementation, evidence boundary and simple architecture illustration |
| Utility | `/404/` and legacy redirects/RSS | `Layout` where appropriate | noindex for 404/bridges, preserve legacy paths; no decorative hero |
| Design labs | `/design-lab/**` | standalone experimental HTML | noindex and separate from approved production page styles |

These templates are distinct **information** patterns, but their typography,
colors, spatial rhythm, headers and link conventions are shared.

## Canonical shared primitives

- `src/components/PageIntro.astro` — the only introductory H1 in every
  overview route, optional eyebrow/description/action slots. Avoid page-local
  `.page-title` and `.lead-text` overrides.
- `src/components/PageBreadcrumb.astro` — navigation back to the parent
  resource. No handwritten separators or duplicate breadcrumb CSS.
- `src/styles/global.css` — palette and dark-mode roles, global grids,
  `.academic-index` editorial cards/lists, responsive focus.
- `src/data/profile.ts` — verified public academic biographical data, no
  private phone numbers or membership IDs.
- `src/data/software-projects.ts` — public engineering project records
  with honest demo states.

## Portrait

- Source provided by owner in this conversation, optimized to `public/images/arif-profile.webp`;
  **240×300**, about **3.3 KB**, portrait ratio 4:5.
- Homepage display: ~174 px wide. About: ~138 px wide, 112 px on small screens.
- It is **provided artwork** and should not be described as an independently
  verified documentary photograph. Alt text describes it as a supplied profile portrait.
- Do not upload or expose the large original PNG, the comprehensive master CV,
  private phone numbers, WhatsApp, society membership IDs or unverified citation metrics.
- If a genuine profile photograph is supplied later, replace the file explicitly
  rather than changing layout/components.

## Content rules

- Preserve verified biography and existing scholarly records; do not add
  publication statuses or citations from assumptions.
- Professional memberships JSAI and IPSJ appear in the public CV **without**
  ID numbers, based on the supplied academic CV master.
- The public CV PDF remains a separate, existing privacy-reviewed deliverable.
  We have **not** automatically compiled or published the uploaded comprehensive
  master LaTeX file.
- Pilketos code/case study stays public; do not suggest the backend demo works.

## QA and maintainability

- Every overview gets exactly one `PageIntro` and one H1.
- Every detail type gets a shared `PageBreadcrumb`, one H1, and a normal main landmark.
- Never duplicate the navigation or dark theme functionality per page.
- `node scripts/check-page-templates.mjs` asserts source and generated HTML
  contract for all overview/detail routes and the portrait asset.
- Standard GitHub Actions must pass source audit, build, internal links,
  generated HTML/SEO check, preview robots and production dry-run.
- Visual review remains necessary: light/dark, keyboard and 360/390/768/1280px.
  CI alone cannot verify color perception, photo cropping or layout elegance.

## Release scope

This batch does **not** move `arifmuamar.com` or change WordPress, Cloudflare,
Neon, Supabase, the Finance Dashboard or PPI Ishikawa. Preview remains noindex.
