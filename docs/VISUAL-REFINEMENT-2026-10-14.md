# Batch B — Visual & portfolio refinement

Date: 2026-10-14
Target: staging at `https://arifmuamardev.github.io/personal-website/`

## Intent
Present the site as one coherent professional identity with **research**, **education** and **software engineering**, without manufacturing app screenshots or overstating product readiness.

## Decisions
- Retain the existing system-font stack and teal academic palette. No third-party fonts or analytics were added.
- Use a typographic personal monogram in the home hero until a verified, permitted profile portrait is supplied.
- Increase responsive page width while retaining tighter reading widths for editorial content.
- Put the Pilketos software case study in a structured card with an **illustrative** UI-free flow map.
- Keep demonstration unavailable. The map is **not** a screenshot and uses no real voter records.
- Explain source-backed capabilities separately from unverified security, performance or production claims.
- Keep the personal website static. No Neon/Supabase connection is added to this site.
- Keep production DNS and unrelated GitHub repositories unchanged.

## Review / release gates
- [ ] PR workflow passes source audit, Astro build, generated link checks, and staging noindex assertions.
- [ ] Visually review home, portfolio, case study in light and dark system themes.
- [ ] Test widths 320, 375, 768, 1024 and 1440 px; no overflow or clipped diagram labels.
- [ ] Verify keyboard focus, 44px mobile menu targets, and reduced-motion behavior.
- [ ] Check link to Pilketos case study and source repository.
- [ ] Collect **genuine** screenshots from a safe demo environment before introducing images.
- [ ] Independently verify scholarly affiliations, CV, and publication metadata before domain cutover.

## Still not included
- No production-domain migration.
- No production voting demo.
- No photo/avatar upload.
- No bibliography or CV claim changes.
- No server side data, browser analytics, trackers or application credentials.
