> **Historical design study — superseded.** Academic Minimal (A) was selected on 14 October 2026. The active design authority is [ADR-001](./ADR-001-ACADEMIC-MINIMAL.md) and the [Academic Minimal Guide](./ACADEMIC-MINIMAL-GUIDE.md). Do not treat the earlier PPI-inspired C proposal or the undecided A/B/C comparison as the active website design.\n\n# Personal Website — Design Rollout & Review Contract

**Status: PROTOTYPE, awaiting visual approval.** Source reference is PPI Ishikawa
B/Solid Institutional as deployed in October 2026. This document governs
how to translate the approved visual direction into Astro source; it is not
authorization to switch the production domain.

## Review the prototype first

- Live Design Lab (once the lab PR is merged):
  `https://arifmuamardev.github.io/personal-website/design-lab/personal/`
- This is a *standalone mock homepage*, with theme toggle and responsive
  menu. It is not the current deployed homepage or a functional link directory.
- Test the prototype at widths: **360px, 390px, 768px, 1280px** and
  **1440px**. Review light and dark modes; capture both desktop and mobile.
- Review **header ↔ hero continuity**, typography scale, highlight style,
  transitions from the teal hero to light sections, and card density.
- Confirm whether the personal accent (terracotta) distinguishes AMW from
  PPI Ishikawa enough; PPI brand tokens/logo must not become personal assets.

## Architecture: single source of truth after approval

1. Create `src/data/design.ts`: define five canonical personal brand colors.
2. Adapt `src/styles/global.css` to use semantic roles and reusable
   `ui-*` classes; no page-specific copies of global colors.
3. Import **self-hosted** Fira Sans weights as used by PPI, update lockfile
   via npm in a controlled PR, and keep system fallbacks.
4. Centralize header, nav, mobile menu and theme handling in
   `src/layouts/Layout.astro`; one accessible `ThemeToggle` if necessary.
5. Create reusable `PageIntro`, `NavigationCard`, `ContentCard`,
   `SectionHeading`, and `DecorativeSignal` components only when
   at least two real pages can reuse each one; no abstraction by default.
6. The site and Design Lab should remain independent: lab markup must never
   become a second header inside production pages.

## Batches and affected routes (after approval)

| Batch | Routes / files | Primary design goal | Merge gate |
| --- | --- | --- | --- |
| D1 — Foundations | `Layout.astro`, `global.css`, `design.ts` | font, theme, header, nav, tokens | build, light/dark + 360/390/1280 screenshots |
| D2 — Homepage | `index.astro` | deep teal hero same as nav, proof-oriented cards, soft transition | visual approval of hero, fold, and first section |
| D3 — Overviews | `/research/`, `/projects/`, `/portfolio/`, `/blog/`, `/publications/` | consistent intros, reading widths, grids/card roles | mobile/desktop archetype comparisons |
| D4 — Details | blog post, publication detail, Pilketos case study, About, CV | clear breadcrumbs, references, long-form reading | accessible semantic headings, verified content |
| D5 — Accessibility & polish | all | keyboard, focus, dark, responsive, motion, motion reduction | full regression and production-mode dry-run |

## Preset / semantic token contract

- `--ui-section-space:` 52–68px; compact when content warrants it.
- `--ui-grid-gap:` 14px; `--ui-card-padding:` 23px.
- `--ui-radius-control:` 12px, `--ui-radius-card:` 16px,
  `--ui-radius-feature:` 24px.
- `--ui-border-width:` 1px, contextual colors.
- `--ui-motion-duration:` 160ms, nav card lift -2px only on hover,
  buttons stationary, reduced-motion disables motion.
- `--ui-icon-stroke:` 1.8, icon tile 44px, icons 24/20/16px by context.
- `--ui-media-ratio:` 16:9 for wide, 4:3 editorial, contain for diagrams.
- `--ui-container:` 1180px, prose width 72ch.

## Non-negotiable QA

- Existing source, link, quality, SEO and production dry-run checks stay green.
- The Design Lab is always `noindex`; production site remains
  `preview` / noindex until a separate cutover approval.
- Visual proof for changed route family at **390px and 1280px**; 360px and
  768px stress tests. Record screenshots/notes in the PR.
- Exactly one H1 on actual pages; no surprise popups or motion loops.
- Do not invent a photo of the site owner, app screenshot, sensor readout,
  experimental result, third-party endorsement, or portfolio demo status.
- Before every merge, compare old and new above-the-fold, nav, footer,
  mobile, dark mode and content completeness.
- No changes to Neon, Supabase, Finance, Pilketos database, PPI Ishikawa,
  current WordPress site, domain routing, Cloudflare DNS, or GitHub Pages
  production custom-domain settings.

## Explicit approval checkpoint

Only after reviewing the lab prototype should someone mark this direction
**Approved** in this document or a dedicated PR. Approval of the aesthetic
does not approve an unreviewed site-wide refactor or domain migration.
