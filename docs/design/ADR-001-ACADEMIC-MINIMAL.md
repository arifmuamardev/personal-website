# ADR-001 — Academic Minimal selected

**Decision:** APPROVED · 14 October 2026
**Owner decision:** option **A — Academic Minimal** from the A/B/C Researcher Design Lab.
**Applies to:** personal website only (`arifmuamardev/personal-website`).

## Context and rationale

The personal website represents a researcher, university lecturer and software developer. The user has selected the calmer academic-first direction after comparing three independent alternatives. Unlike option C, the personal site should NOT resemble an institutional promotional landing page. Unlike option B, engineering is an important but secondary category in the homepage hierarchy.

The selector prototype remains available as an archival design reference:
`/design-lab/researcher-directions/#a`.

## Decision (normative)

**Visual identity**
- White / very light neutral background with dark ink and one restrained teal-blue link color.
- Serif (Georgia with system fallback) for name, high-level editorial headings; system sans-serif for prose, metadata and UI. No remotely fetched production fonts.
- Personal name is the main homepage H1; short factual affiliations and a concise research bio follow.
- A small **AMW initials portrait placeholder**, clearly not a real photograph. No invented portrait, speculative lab photo or pseudodata.
- Links, whitespace and well-organized lists take priority over hero artwork, decorative gradients and large card grids.
- Dark mode follows OS preference, with equivalent hierarchy and AA contrast targets.
- Avoid all-uppercase oversized sales copy, moving CTA buttons, broad drop shadows and auto-playing visuals.

**Homepage order**
1. Name, affiliations, concise bio, direct links to research, publications, CV, software and academic profiles.
2. Selected research/publications with years, authors, venues and DOI where present.
3. Current research themes with short explanations (no unverified performance results).
4. Software projects in concise, inspectable rows, including accurate demo limitations.
5. Recent writing.
6. Institutional/academic profile links and contact.

**Interior page taxonomy**
- Research and publications: bibliography/index layouts with clear hierarchy and year grouping.
- About/CV: biography and chronology; simple editorial headings.
- Projects/portfolio: concise project summaries and case studies; screenshots only if authentic and rights-cleared.
- Blog/articles: 65–72ch reading width and comfortable line height.
- Utility pages: contact, privacy, 404 and legacy redirect pages share the same neutral framework.

**Tokens and components**
- Global CSS semantic tokens in `src/styles/global.css`; no brand-specific hardcoded colors scattered in pages.
- Main container 960–1040px where lists need it; prose usually <=72ch.
- Section rhythm ~48–64px, lists separated by fine rules, tags subdued.
- Controls >=44px on mobile, 2–3px keyboard focus outline.
- Navigation no more prominent than the main name; dropdown accessible at small widths.
- Motion: color/border change ~160ms only, **no movement on buttons or ordinary cards**. Follow `prefers-reduced-motion`.

## Transition plan and governance

- **A1 Foundation + homepage:** implement in one small PR with stable Astro collections, neutral site styling and truthful academic-first contents. Verify generated internal links, noindex and build both preview/production dry-run.
- **A2 Interior pages:** align Research, Publications, Blog, Portfolio, About and CV with quiet lists/headers and common components, without changing any factual records or URLs.
- **A3 Review and polish:** desktop/mobile and light/dark screenshots, typography, accessibility, genuine photo optional, SEO and publication metadata (separate editorial audit).

Status must be reported as **approved direction**, **implemented files**, and **verified deployment** independently. Passing CI does not prove visual perfection.

## Superseded proposals

`PERSONAL-DESIGN-SYSTEM-v1.md` and `ROLLOUT-AND-REVIEW.md` describe a historical PPI-inspired C proposal. They remain retained for design history but **are not the active authority** after this ADR. The A/B/C benchmark remains a comparison, not a production spec.

## Non-goals and safety

No edits to `arifmuamar.com` DNS/WordPress, `PERSONAL_SITE_MODE`, GitHub Pages custom-domain routing, user-site finance application, PPI Ishikawa, Pilketos backend, Neon, or Supabase. Staging remains `noindex`. No publication status or scholarly metrics are changed by design rollout.
