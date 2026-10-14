# Prelaunch Experience Checklist — Personal Website

This checklist is for reviewing staging at https://arifmuamardev.github.io/personal-website/ before **any** production domain or DNS change.

## Site positioning
- Keep **research/academia** and **software engineering** distinct but equally discoverable.
- Research activities, verified publications, and research projects belong under Research.
- Engineering case studies, code links, and truthful demo status belong under Software Portfolio.
- Do not publish private finance data, personal apps by default, or real voter data.

## Review checklist

### Navigation and responsive UX
- [ ] Header navigation is understandable on desktop, tablet, and phone.
- [ ] Mobile menu opens/closes by tapping; Escape closes it and returns keyboard focus.
- [ ] All tap targets and links are keyboard-accessible with visible focus outlines.
- [ ] No horizontal overflow at 320, 375, 768, 1024, and 1440 px.
- [ ] Light and dark system themes are legible; honor reduced-motion preferences.

### Content and trust
- [ ] Replace hero initials with a permitted professional portrait **only if desired**.
- [ ] Verify affiliation, education, awards, research summaries, profile links, and CV.
- [ ] Review citation metadata for published publications; do not silently assume all records are verified.
- [ ] Add authentic screenshots and a concise problem/solution/stack/role/outcome case study for Pilketos.
- [ ] If using a live demo, confirm the backend is operational and only synthetic voting data are available.
- [ ] Provide a clear way for collaborators or employers to contact the site owner.

### Performance, SEO, and launch readiness
- [ ] CI build, source audit, and generated link checks pass.
- [ ] Test keyboard navigation and mobile menu manually on the deployed site.
- [ ] Verify all external links and CV download.
- [ ] Compare WordPress old URLs and migration redirects.
- [ ] Keep staging **noindex**; remember noindex is not authentication.
- [ ] Confirm GitHub Pages custom domain, canonical URLs, sitemap, RSS, HTTPS, and rollback plan before changing DNS.
- [ ] Do not change any settings for the separate Financial Dashboard, Pilketos backend, or PPI Ishikawa during personal-site polishing.

## Proposed sequence
1. **Batch A — Structure and UX:** simplified navigation, clearer dual-track homepage, mobile keyboard behavior.
2. **Batch B — Content and visual language:** choose typography/palette, portrait strategy, publication audit, richer portfolio with screenshots.
3. **Batch C — Quality and release gate:** responsive screenshot review, contrast, keyboard accessibility, redirects, SEO, final production-domain dry-run.

Batch A is being prepared as a PR; subsequent batches should be separate and independently reviewed before merging.
