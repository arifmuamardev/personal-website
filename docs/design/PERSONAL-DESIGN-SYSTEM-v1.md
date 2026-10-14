# Personal Website — Design System Proposal v1

Status: **PROPOSED FOR VISUAL APPROVAL**, not yet applied across existing pages.
Date: 14 October 2026.
Reference: PPI Ishikawa 2026/27 **B — Solid Institutional** and its normative
`docs/brand/DESIGN-SYSTEM-GOVERNANCE.md`, `docs/brand/TYPOGRAPHY.md`,
`src/data/brand.ts`, and active hero/header implementation.

**Design objective:** credible academic presence + contemporary software-engineering
portfolio, recognizable as belonging to the same *design family* as PPI Ishikawa,
but clearly an independent personal identity. Do not copy the PPI logo,
periodic branding, Kanazawa station media, or Ishikawa-map contour graphic.

## 1. Visual DNA carried from PPI Ishikawa

- **Solid institutional header + homepage hero:** deep teal continuous surface,
  white display headline, a restrained highlight stripe, no awkward color seam.
- **Editorial content:** airy, quiet light surfaces, restrained panels and large
  type hierarchy, strong primary navigation, not dashboard-like UI.
- **Approved Balanced spacing:** section padding 52–68px, grid gap 14px,
  card padding 23px (allow carefully documented functional variants).
- **Balanced + Subtle geometry:** control radius 12px, card 16px, feature 24px,
  1px contextual borders.
- **Standard interaction:** 160ms colors/borders/shadows; -2px lift ONLY for
  fully clickable navigation cards; buttons do not shift; honor reduced motion.
- **Typography:** Fira Sans across roles; 400 body, 600 UI, 700 ordinary
  sections/cards, 800 page display, 900 only one home hero.
- **Iconography:** outline strokes ~1.8, 24px card icon, 20px guide icon,
  16px inline, tinted tile 44px; text labels always remain.
- **Media:** 16:9 wide, 4:3 editorial, 'contain' for diagrams,
  no default text overlay; provide caption/attribution and descriptive alt.

## 2. Personal brand identity: five canonical source colors

The five colors below are specific to this personal website. They are NOT
the same identity palette as the PPI organization.

| Semantic source | HEX | Role |
|---|---|---|
| `primary` | `#A53C3B` | signature terracotta, selected emphasis / CTA |
| `secondary` | `#18595B` | teal identity and family resemblance |
| `accent` | `#83C6B9` | soft mint signal-line detail and light accents |
| `surface` | `#F7FAF9` | warm-neutral page canvas |
| `ink` | `#1B2E31` | body and strong headings |

Additional derived roles (not independent brand source colors):
- `institutional` = `#103D40` in v1 mock; actual production token should
  be derived from secondary via `color-mix()`, like PPI Ishikawa.
- `action-on-dark` = light paper with dark text; in a deep teal hero a
  light CTA is deliberately easier to read than a terracotta one.
- `primary-on-light` = `#A53C3B`; `primary-on-dark` = `#F6A796`.
- `border` = ink mixed with surface ~12%, adapted for dark mode.
- Status semantics (error/success/warning) use independent meaningful colors,
  not brand red as a synonym for error.

Before full rollout define these **once** in `src/data/design.ts` and
consume them as `--site-*` tokens in shared CSS. No individual Astro component
may hardcode any canonical brand HEX value. The lab is a self-contained
prototype exception, not production code.

## 3. Type roles and scale

| Role | Mobile / Desktop | Weight | Notes |
|---|---|---|---|
| Hero | 48 / up to 84px | 900 | homepage only; 2–3 deliberate lines |
| Display | 36 / 48px | 800 | one H1 per interior page |
| Section | 24 / 30px | 700 | shared rhythm |
| Card heading | 18 / 20px | 700 | never hero-sized |
| Lead | 16 / 18px | 400 | line-height 1.65, max ~64 characters |
| Body | 16px | 400 | line-height ~1.7, content max ~72ch |
| Eyebrow | 12px | 700 | +.12em tracking, uppercase, nonredundant |
| UI | 14px | 600 | controls and nav, target >=44px |
| Meta | 12–13px | 500 | date/tech/status without visual dominance |

Fira Sans should be self-hosted using the production `@fontsource` method
already proven in PPI Ishikawa, with system fallback if font loading fails.
The isolated Design Lab may fetch a webfont for comparison only.

## 4. Layout and components

- Main container `max-width: 1180px` + mobile horizontal gutter 20px,
  32px desktop; text body max width 72ch.
- Header sticky, deep teal. Hero directly continues the same background.
- Home first screen: branded typography, role, **research** and
  **software** entry points; right-side abstract signal/data visual—not
  a fabricated headshot or claim about actual sensor traces.
- The next section must use a **soft paper bridge** and a clear white/soft
  canvas, not a hard jump to another unrelated saturated block.
- Primary nav: Home via wordmark, About, Research, Publications, Portfolio,
  Blog, CV, Contact. On narrower widths reduce to an accessible menu.
- Navigation card: full card is one link, with single destination.
- Content card: article with independent actions; card hover affects borders,
  not position. Avoid multiple equal-strength CTAs within one module.
- Case study: breadcrumb, concise intro, evidence/role/stack, grounded
  diagrams or authentic screenshots, constraints, next action.
- Blog/publication details: narrow reading width, minimal card decoration.
- Icons cannot replace visible labels.

## 5. Motion, dark mode and accessibility

- Standard motion `160ms`. Only navigation cards may shift -2px on
  `hover` for fine pointers. Buttons and ordinary content cards never shift.
- Visible focus ring 3px accent, offset 3px; semantic buttons and links.
- Contrast >= 4.5:1 for normal body text and >= 3:1 for large text / controls.
  Validate both light and dark states in the final production CSS.
- Dark mode changes backgrounds, text, borders, and card contrast; hero and
  header remain the same institutional character (not inverted to white).
- Reduced-motion preference removes CSS motion.
- Mobile nav should have Escape/outside click close, visible aria-expanded,
  and 44px targets; no side overflow.

## 6. Homepage information hierarchy

1. Institutional-style hero: name, real affiliation, one credible promise,
   CTA Research (primary) and Portfolio (secondary).
2. Paper-toned transition with two concise professional tracks.
3. Research focus & selected publications (facts from verified data).
4. Software portfolio (Pilketos with honest demo status; source link).
5. Writing / blog.
6. Contact CTA and footer.

Use no unverified counts or fabricated endorsements. Private Finance is not
a public portfolio item without explicit approval.

## 7. Governance for AI agents and contributors

Before editing a page or component, a PR must state:
1. **User task** and template type.
2. **Reuse-first** decisions: which shared components and tokens are used.
3. **Before/after screenshots** at 390 and 1280px; stress-test 360/768px.
4. Light and dark contrast checks, keyboard navigation, mobile overflow.
5. Existing Astro source, link, HTML-quality and production dry-run checks.
6. Changed files, exceptions (ADR), risks, and rollback.

Templates for this personal site:
- **Home:** special hero + curated overview, not a generic listing.
- **A / Overview:** Research, Portfolio, Blog, Publications lists.
- **B / Detail:** Software Case Study, Research Project, Article,
  Publication Detail, About, CV (use breadcrumbs on children only).
- **C / Explorer:** reserve for future filter/search lists; do not create
  search UI merely for aesthetic consistency.
- **Utility:** Contact, Privacy, 404, RSS, redirect bridges.

Definition of Done for design rollout: PPI-inspired lab approved, tokens and
base layout migrated once, template components migrated in small PRs,
screenshots reviewed, all CI passing. Design Lab is **not** evidence that the
live site has the same layout.

## 8. Non-goals in this phase

- No changes to `arifmuamar.com` DNS, GitHub Pages custom domain, or
  `PERSONAL_SITE_MODE`.
- No changes to PPI Ishikawa repo, logo or branding.
- No Neon, Supabase, Finance, or Pilketos backend changes.
- No blind duplication of PPI's organization-specific content or geography.
- No wholesale page migration until the new visual direction is approved.
