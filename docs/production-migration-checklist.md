# Production cutover checklist — STOP until manually approved

> **Current domain-specific cutover runbook:** [arifmuamar.com — 15 October 2026](./production-arifmuamar-cutover-2026-10.md).
> Cloudflare DNS has been audited. Apex still serves WordPress. The owner
> must confirm old-site backup, configure GitHub Pages custom domain, and
> authorize live DNS changes before the final switch.

The repository builds in `preview` mode by default. Never change DNS as part of
staging publication. The old `arifmuamardev.github.io` repo and its `/finance/`
app are deliberately NOT modified by this project.

1. Export WordPress content, SQL/database backup, uploads, and a full inventory of
   old permalinks. Verify backup and rollback availability.
2. Validate GitHub Pages staging at `https://arifmuamardev.github.io/personal-website/`;
   review all content, accessibility, 404s, PDF CV, and external profiles.
3. Complete publication/source audit before claiming all bibliography metadata is verified.
4. Evaluate preserving old WordPress routes; static bridge pages exist but proper HTTP
   301s require Cloudflare Redirect Rules or other edge redirects.
5. Set the GitHub Pages **custom domain on the new personal-website repository**
   to `arifmuamar.com` before touching DNS (GitHub Settings > Pages).
6. Set GitHub Actions repository variable `PERSONAL_SITE_MODE` to `production`
   and redeploy `main` (after final review). Confirm canonical, sitemap, RSS,
   robots, and all site links use `https://arifmuamar.com` with no subpath.
7. Change **only the apex A/AAAA or ALIAS/ANAME records and www as needed** in
   Cloudflare. Keep MX, TXT, email records, conference, iot-bep, and other
   unrelated DNS entries untouched. Follow current GitHub Pages IP documentation.
8. Ensure HTTPS is provisioned and redirects for apex/www are correct.
9. Re-run link check and check Search Console, 404 routes and structured data.
10. Keep old WordPress server recoverable until the new site is stable.

Because this site is hosted from a separate project repository, GitHub Pages for
`ppi-ishikawa` stays independent on its own custom domain. The current user-site
repo `arifmuamardev.github.io` remains unchanged, including Financial Dashboard.

Security: preview is PUBLICLY ACCESSIBLE (robots noindex is not authentication).
Never publish drafts, real voter records, private finance data or database secrets.
