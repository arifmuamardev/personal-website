# Academic Minimal — Design System v1.0

**Status: APPROVED design direction (ADR-001), implementation in progress.**
**Authority:** [ADR-001-ACADEMIC-MINIMAL.md](./ADR-001-ACADEMIC-MINIMAL.md).
This replaces the *proposed* PPI-inspired `PERSONAL-DESIGN-SYSTEM-v1.md`
as the governing visual language for the personal website.

## Goals

1. **Work first:** prospective research collaborators can find research, papers, CV and contact in seconds.
2. **Credibility:** factual affiliation and verifiable work, not slogans, decorative science graphics or speculative statistics.
3. **Dual competence:** engineering has its own discoverable destination, but does not displace the research profile.
4. **Low maintenance:** reusable design primitives, no unnecessary JavaScript, limited card ornamentation.

## Visual language and CSS source of truth

Implementation: `src/styles/global.css`.

| Token | Light | Dark | Purpose |
|---|---|---|---|
| `--bg-primary` | `#ffffff` | `#141c20` | page, header, editorial reading |
| `--bg-secondary` | `#f7f9f8` | `#1b282d` | secondary surfaces |
| `--bg-tertiary` | `#edf2f1` | `#25363b` | subtle chips/code |
| `--text-primary` | `#192e35` | `#f0f7f5` | headings and strong labels |
| `--text-secondary` | `#334c53` | `#cad9d6` | paragraphs and summaries |
| `--text-muted` | `#52686c` | `#aabbba` | dates and secondary metadata |
| `--accent-color` | `#195d68` | `#91d9d3` | meaningful links/actions |
| `--accent-hover` | `#124750` | `#b9ebe3` | hover only |
| `--accent-light` | `#e7f2f0` | `#253f42` | portrait placeholder, tint |
| `--border-color` | `#dce5e4` | `#3b4d50` | thin separators |

Brand colors should remain centralized in the CSS variables, not duplicated
in individual page component styles. The legacy `--glass-*` compatibility
variables may remain until all pages are migrated.

## Typography

- **Serif:** Georgia / Times New Roman, for the person's name and editorial h1–h3.
- **Sans:** system stack, for body, metadata, UI, card labels and publication rows.
- No external font dependency in the production site.
- Home name H1: responsive 2.3–3.6rem, regular serif bold; not a gradient.
- Page H1: approx 2–2.75rem, serif; section H2: approx 1.5–2rem.
- Bibliography/item titles: 1.0–1.1rem sans, 600–700; avoid huge cards.
- Body: 16px, line height 1.6–1.8, reading width ~72ch.
- Labels: 12–14px where appropriate, no ultra-faint text.

## Component anatomy

| Pattern | Purpose | Rule |
|---|---|---|
| Identity intro | One homepage H1 + real role/affiliation/bio | small initials placeholder optional |
| Link cluster | CV/research/portfolio/contact | ordinary underlined text, visible focus |
| Editorial row | publication, writing, project | metadata left where helpful, content and links right |
| Section heading | name and full-index link | one concise heading, one secondary action |
| Research interests | three short topics | thin top rules, no large emoji icon cards |
| Research project | title + short summary | may link to existing /projects/ index |
| Software project | case study + truthful status + source | never advertise inactive demo |
| Article | readable narrow measure | no decorative hero mandated |
| Navigation | active link and keyboard support | existing menu controls retained |
| Footer | copyright, affiliations, academic links | no giant newsletter/signup pitch |

## Spacing and geometry

- Layout width: **980px** global container; homepage identity and lists use that same grid.
- Reading measure: generally <=72ch.
- Page sections: **48–64px** vertical; strong vertical white space between groups.
- Dividers: thin 1px neutral separators, especially for bibliographies.
- Global cards: default 1px border, **no shadow and no lift**. Reserve panels only when they clarify a distinct content role.
- Button radius: ~9px, neutral outline for secondary actions.
- Motion: only color/background/border transitions **160ms**; honor reduced-motion. No translation on buttons.
- Mobile breakpoint for home: 700px; thumbnail reduces to small square and rows stack with natural reading order.

## Homepage content contract

1. Portrait placeholder or authentic portrait with permission (optional), name, real affiliations, short factual bio and useful links.
2. Selected publications (from the existing Astro publications collection; year, authors, venue, DOI only when present).
3. Research interests and selected research projects.
4. Software projects with direct case studies, source, technology and honest availability.
5. Recent writing and footer.

No invented citation counts, download counts, performance numbers, awards or screenshots. Do not automatically label an item peer-reviewed without metadata/source verification.

## Accessibility / SEO / review

- Exactly one H1 per real page.
- Main landmark, skip link, page language, readable contrast in both themes.
- Links use text labels; keyboard focus remains conspicuous and >=44px targets where practical.
- No horizontal overflow at 360px, 390px, 768px, 1280px.
- Capture real browser screenshots for before/after on representative routes.
- CI: `npm run check:source`, Astro build, `npm run test:links`, `npm run test:quality`, preview `noindex`, and production-mode **dry-run only**.
- Stage-first on GitHub Pages; production WordPress/domain cutover requires separate authorization.

## Governance / future edits

For every design PR:
1. Name the user task and route family (identity/index/detail).
2. Reuse the global variables, editorial rows and source data rather than creating new unique visual styles.
3. Record affected files and unchanged content/URLs.
4. Show desktop/mobile and light/dark comparison, note anything not visually verified.
5. Validate source, link, quality and production dry-run CI; only merge to staging if checks pass.
6. Update this guide and ADR for any intentional exception.

## Avoid

- Deep-teal full-bleed hero used by institutional websites.
- Gradient headlines, decorative signal wave, mock metrics and complex icon grids.
- A full-width project image for each publication.
- Generic decorative card treatment for every list item.
- Displaying a fake photo or claiming live Pilketos voting.
- Moving `arifmuamar.com`, touching PPI Ishikawa, Finance, Neon or Supabase as part of visual work.
