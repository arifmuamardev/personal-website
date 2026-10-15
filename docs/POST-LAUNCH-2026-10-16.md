# Post-launch verification — 16 October 2026

## Verified configuration
- The user confirmed `https://arifmuamar.com` works with HTTPS.
- GitHub Actions production deployment on 15 October succeeded (run 38726202404).
- Cloudflare apex: four GitHub Pages A records, DNS-only; `www` CNAME: `arifmuamardev.github.io`, DNS-only.
- Mail, `conference`, and `iot-bep` DNS records were preserved.
- WordPress backup was confirmed before cutover.

## This development batch
- Remove Pilketos and the empty software portfolio from the generated site, navigation, public design labs and discovery links; retain Git history for future reactivation.
- Add lightweight publication text search and year filtering in combination with type filters. Accessible feedback, no-results messaging and reset are included. All content is rendered without JS.
- Omit empty external-link sections on publication detail pages.
- Extend CI assertions for retired public routes and the new discovery controls.

## Outstanding checks — not completed by source inspection
1. Browser-level responsive review at 320, 375, 768, 1024 and 1440 px in light/dark modes; keyboard navigation and full axe accessibility.
2. Actual HTTP status and legacy WordPress redirects, especially `/category/blog/`, `/author/arifmuamar/`, `/feed/`. Current HTML refresh pages are **not HTTP 301** redirects.
3. Search Console indexing, sitemap submission and canonical coverage.
4. External academic profile/publisher link health; verify the old CV route and PDF return 404 after the suspension, and check reindexing.
5. Lighthouse Core Web Vitals and privacy-sensitive analytics decision.
6. Deliverability tests for email and uptime checks for other subdomains (only DNS was inspected).

## Academic profile restructuring (16 October 2026)

- The academic biography is now an entry point to five independently indexable, topic-specific pages (education, experience, teaching, academic service and recognition).
- The previously public CV page and its downloadable PDF were removed from generated output, menu, homepage CTAs, and automated PDF generation. The internal curated content data remains.
- Do not serve an old copy of the CV from a separate static file, design lab, or cache. Verify `/cv/` and `/files/arif-muamar-cv.pdf` in a live browser and monitor their deindexing.
- No change to research or publication routes, DNS or WordPress backups.

## Redirect safety
Cloudflare Redirect Rules run on **proxied** traffic, while production apex and `www` are DNS-only today. Do not switch orange-cloud proxy just to add redirects without separately verifying GitHub certificates, Cloudflare Full (strict) SSL and potential redirect loops. Never introduce a wildcard catch-all that breaks existing routes.

## Rollback
Revert this PR to restore the previous public portfolio and publication index. Domain/WordPress rollback is a separate operation documented in `docs/production-arifmuamar-cutover-2026-10.md`.
