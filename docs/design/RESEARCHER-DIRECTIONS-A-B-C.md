> **Historical design study — superseded.** Academic Minimal (A) was selected on 14 October 2026. The active design authority is [ADR-001](./ADR-001-ACADEMIC-MINIMAL.md) and the [Academic Minimal Guide](./ACADEMIC-MINIMAL-GUIDE.md). Do not treat the earlier PPI-inspired C proposal or the undecided A/B/C comparison as the active website design.\n\n# Researcher Website — Three Design Directions (A/B/C)

**Date:** 14 October 2026
**State:** design exploration, **not final production policy**.
**Decision pending:** user review of A/B/C in the interactive Design Lab.

## Scope and references

This exercise compares website *archetypes*, not exact replicas of a well-known researcher's site.

- [Andrej Karpathy](https://karpathy.ai/): direct access to biography, work, writing and code; inspiration for a simple professional index.
- [Sebastian Raschka](https://sebastianraschka.com/): blend of research, books, publications, software/code and technical writing.
- [Lilian Weng](https://lilianweng.github.io/): writing-first, readable long-form technical posts.
- [Geoffrey Hinton](https://www.cs.toronto.edu/~hinton/): work-led academic page and publication navigation.
- [PPI Ishikawa](https://ppi-ishikawa.org/): only as the *visual system* reference for C (Solid Institutional), not its organization-specific brand.

Avoid lifting individual images, CSS, text, logos or brand assets from reference websites.

## Interactive comparison

**URL (after the PR is merged and Pages deploys):**

`https://arifmuamardev.github.io/personal-website/design-lab/researcher-directions/`

Select A, B, or C using the top controls. The URL hash `#a`, `#b`, or `#c` selects a specific design; **B** is default. Use **390px phone** to narrow the comparison *even while visiting on desktop*, then switch light/dark. Press Alt+1/2/3 to change variants. The mock pages have real internal links back to current staging pages, but are not substitutes for the actual navigation/functionality of those pages.

### A — Academic Minimal

- **Core impression:** researcher first, code second.
- **Anatomy:** clean academic header → monogram portrait placeholder → affiliations and short bio → selected research/papers → compact software/writing directory.
- **Visual language:** white canvas, serif display, restrained blue-teal links, almost no cards; list-style content.
- **Best when:** bibliography, CV, teaching and research are the dominant information needs.
- **Risk:** can undersell engineering work and feel generic or dated without excellent content.

### B — Modern Researcher–Engineer **(working recommendation)**

- **Core impression:** scientist and software builder equally credible.
- **Anatomy:** low-contrast editorial header → articulate personal promise → narrow affiliation/focus rail → two compact Research/Engineering tracks → curated work rows → Writing & Contact.
- **Visual language:** warm-neutral paper, Fira Sans, disciplined forest-teal and muted copper accents; mostly typographic, few restrained content panels.
- **Best when:** the same professional profile must support PhD work, publications, developer portfolio and technical writing.
- **Risk:** weak writing or thin project evidence may make the homepage feel sparse; real case-study content is essential.

### C — Solid Editorial

- **Core impression:** bold institutional confidence, adapted for a person.
- **Anatomy:** continuous dark teal header + hero → vivid highlight and abstract signal motif → bridging summary → focus cards → featured software panel.
- **Visual language:** PPI Ishikawa's approved geometry/motion/spacing family, but personal color assets and motifs.
- **Best when:** strong visual identity is important; supporting many landing pages and campaigns.
- **Risk:** can resemble an institution or agency rather than a researcher. Larger hero competes with publications.

## Comparison matrix

| Criterion | A | B | C |
| --- | --- | --- | --- |
| Personal research credibility | Strong | Strong | Moderate/strong |
| Engineering portfolio discoverability | Medium | Strong | Strong |
| Long-form article friendliness | Excellent | Excellent | Good with a quieter article template |
| Visual differentiation | Subtle | Balanced | Strong |
| Ease of maintaining as solo researcher | Very easy | Easy | Moderate |
| Resemblance to PPI Ishikawa | Low | Some shared UI discipline | High |
| Recommended role | Alternative | **Primary candidate** | Existing baseline |

These assessments are design judgments, not research findings or measured UX results.

## Shared rules regardless of chosen look

- Never publish unverified scholarly numbers, publication status or a functional Pilketos demo claim.
- No fake portrait: the AMW illustration is explicitly a placeholder, not a photo.
- Keep private finance and voter data private. Mockups display no user records.
- Single-page hero includes research identity, educational affiliation and a clear route to software projects.
- Use a shared design system: colors, font roles, spacing, radius, motion, reusable components, dark mode and focus states from semantic tokens.
- Accessible links/controls >=44px where practical; keyboard focus, contrast and responsive behavior must be checked.
- No staging-indexing: standalone Design Lab carries `noindex` even during a future production cutover.
- Website source stays Astro static / GitHub Pages: no new Neon or Supabase dependency.

## Selection procedure and sign-off

1. Review **all three** on 390px mobile and 1280px desktop.
2. Toggle dark mode within each variant.
3. Evaluate first screen (hero/header), information hierarchy, how prominent research/software appear, and reading comfort.
4. Identify components worth borrowing from other variants even if B is selected.
5. Approve a direction explicitly. Write `Approved: A/B/C` and any exceptions in a future design ADR, **not** by silently editing the current proposal.
6. Only after approval should the shared layout/styles be migrated in small PRs (base tokens → header/hero → inner pages → accessible polish), with visual screenshots and CI checks.

**Not changed in this branch:** actual main homepage, production domain/DNS, finance app, Neon, Supabase, PPI Ishikawa code, GitHub Pages configurations. This is only a static, separate Design Lab page plus documentation.
