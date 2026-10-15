# Production cutover — arifmuamar.com (prepared 15 October 2026)

> **Status: PREPARED, NOT EXECUTED.** This document is a recovery-oriented
> checklist, not permission to change live DNS or WordPress. Never flip domain
> records before the owner confirms WordPress backup, GitHub custom domain
> registration, and production publishing are in place.

## Goal

Make the new Astro personal academic site at
`https://arifmuamardev.github.io/personal-website/` the canonical,
indexable primary site at `https://arifmuamar.com/`. Use
`https://www.arifmuamar.com/` as a redirect to the apex. **No** changes
to separate GitHub `arifmuamardev.github.io` (including its finance
project), PPI Ishikawa, or subdomain applications.

## Read-only inventory captured from connected Cloudflare (15 October 2026)

Zone: `arifmuamar.com`, Cloudflare zone **active**; authoritative NS
`buck.ns.cloudflare.com` / `dawn.ns.cloudflare.com`.

| Record/service | Existing state | Production action |
| --- | --- | --- |
| Apex `A arifmuamar.com` | `202.10.43.46`, proxied | **Replace only at confirmed cutover** with the four GitHub Pages A records; temporarily DNS-only for certificate validation |
| `www` CNAME | `arifmuamar.com`, DNS-only | **Change** to `arifmuamardev.github.io` (no repository path), DNS-only initially |
| `conference.arifmuamar.com` | A `202.10.43.46`, proxied | **Preserve** |
| `iot-bep.arifmuamar.com` | A `202.10.43.46`, DNS-only | **Preserve** |
| Apex MX | `lucy.mxrouting.net` (10), `lucy-relay.mxrouting.net` (20) | **Preserve** |
| Apex TXT | SPF, Google verification, DMARC-related | **Preserve all** |
| `_dmarc` TXT and `x._domainkey` TXT | Existing mail authentication | **Preserve all** |
| Cloudflare SSL mode | `strict` | Preserve; only use Cloudflare proxy after GitHub certificate is valid |
| Always use HTTPS | On | Preserve |
| Cloudflare Page Rules | Two security rules for `/masuk` | Preserve unless separately audited |

Old WordPress public front page is live on the apex (five existing blog
posts). The Astro repo already contains the corresponding five blog
articles, as well as legacy archive/author/feed bridges. The static
site does **not** provide WordPress login, comments, database or plugin
features; back them up instead of assuming full parity.

## Pre-cutover (NO live DNS modification)

1. **Owner action:** Create/download a **full verified WordPress backup**
   (database, uploads, theme/plugin settings) from the old host.
   Retain hosting access and original DNS target `202.10.43.46`.
   Back up WordPress comments if you need them later.
2. **Owner action in GitHub:** Open
   https://github.com/arifmuamardev/personal-website/settings/pages
   and set **Custom domain = `arifmuamar.com`**. Save even if it initially
   reports DNS not configured. Source remains **GitHub Actions**.
   This is a repository administration action not exposed through the
   connected GitHub file/PR tools. Do not put `www` or
   `/personal-website` in that field.
3. **Production release PR (15 October 2026):**
   `.github/workflows/deploy.yml` now sets `PUBLIC_SITE_MODE=production`
   automatically for `push` runs on `main`, while pull-request builds
   remain in safe `preview` mode. This removes the need to change a
   repository Actions variable. **Wait until the main production run has
   successfully built and deployed the root-based, indexable artifact**
   before switching the live DNS. To roll back deployment mode, revert
   the release workflow commit in a new PR and redeploy `main`.
4. Ensure GitHub Pages custom domain shows `arifmuamar.com`.
   GitHub's HTTPS certificate may not become available until DNS is
   pointed to GitHub Pages. Do not force DNS cutover if deployment fails.
   A `CNAME` file is not sufficient or necessary when deployment
   uses a custom GitHub Actions workflow.
5. Check the migrated five legacy WordPress posts and the public CV PDF,
   scholarship affiliation, publications, browser light/dark theme,
   canonical URLs, RSS, sitemap, analytics/Search Console ownership,
   and old links. Static pages will not support WP comments/forms.

## Confirmed DNS cutover (Cloudflare)

Only after owner authorizes switching the apex *from WordPress to Astro*:

- Replace the existing **single** apex A (`202.10.43.46`, proxied)
  with these **four** GitHub Pages A records (set all **DNS-only** during
  validation; no need to add AAAA initially):

  ```text
  @  A  185.199.108.153
  @  A  185.199.109.153
  @  A  185.199.110.153
  @  A  185.199.111.153
  ```

- Update **only** `www.arifmuamar.com` CNAME to
  `arifmuamardev.github.io`, DNS-only. **Never** include
  `/personal-website` in DNS CNAME targets.
- **Do not touch** MX/TXT/email, `conference`, `iot-bep`, or other
  records and rules.
- In repository Settings → Pages, wait for custom-domain/DNS and
  certificate checks, then select **Enforce HTTPS** when offered.
- Confirm the HTTPS apex serves the new homepage and the `www` host
  redirects cleanly to it. If GitHub certificate issuance is pending,
  allow propagation time and avoid creating a broken Cloudflare SSL proxy
  chain. GitHub advises that full propagation/HTTPS may take up to 24h.
- If later re-enabling Cloudflare orange-cloud proxy, separately test
  Full (strict) SSL, HTTPS, canonical/redirect loops, and GitHub
  certificate. Avoid switching it on automatically as part of DNS cutover.

## Post-release validation (human + CI)

- `https://arifmuamar.com/`: correct new site, valid TLS.
- `https://www.arifmuamar.com/`: redirects to apex without loop.
- Internal assets/navigation resolve at root (no `/personal-website/`
  in production page URLs).
- `/about/`, `/research/`, `/publications/`, `/portfolio/`,
  `/blog/`, `/cv/`, PDF CV all work.
- WordPress legacy post permalinks remain available where migrated:
  `/small-changes/`, `/when-ai-learns-to-see-malaria/`,
  `/home-for-the-holidays/`, `/anticipating-a-new-chapter/`,
  `/starting-over/`.
- Production homepage has `index, follow`, canonical is apex, robots
  permits crawling and sitemap uses apex.
- Google Search Console and Google Scholar homepage URL can be updated
  *after* the site is reliably live; do not automatically change third
  party profile settings.
- Validate email delivery separately (MX/DMARC/DKIM unchanged) and
  the `conference` / `iot-bep` subdomains.
- Leave WordPress hosting recoverable for a stabilization period.

## Emergency rollback

If the new domain errors (TLS, wrong site, assets, WordPress links,
unexpected email impact), restore **only** the original Cloudflare
website records:

- Remove the four newly added apex GitHub A records.
- Restore **one** apex A `202.10.43.46` with Cloudflare proxy **on**.
- Restore `www` CNAME `arifmuamar.com`, DNS-only.
- Leave all email and subdomain records unchanged.
- Revert the production activation in
  `.github/workflows/deploy.yml` so `main` uses `PUBLIC_SITE_MODE=preview`,
  redeploy `main`, and remove the custom domain from Pages as appropriate
  after domain is back on WordPress. No repository variable is required.
- Verify WordPress response, HTTPS and redirects. Because DNS propagation
  is not instantaneous, rollback may take time to take effect globally.

## Limitations and guardrails

- The connected Cloudflare tool can read/write DNS; the connected
  GitHub plugin handles repository files, branches, CI and PRs but
  **does not expose repository Settings → Pages**. The owner has confirmed
  saving the custom domain. Production mode is activated by a versioned
  workflow release rather than an Actions repository variable.
- No live DNS was modified when writing this checklist.
- No full WordPress/database backup was accessible through these tools.
  Owner confirmation is required before traffic moves away from WordPress.
- Keep the WordPress origin IP available for rollback; do not cancel
  old hosting on cutover day.
- Source: [GitHub Pages custom domain configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) and [GitHub Pages custom workflow configuration](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
