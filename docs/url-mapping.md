# URL Mapping: arifmuamar.com

| Existing WordPress URL | New Static URL | Status | Action |
|---|---|---|---|
| https://arifmuamar.com/ | / | Preserve | Landing Page |
| https://arifmuamar.com/starting-over/ | /starting-over/ | Preserve | Static Route with trailing slash |
| https://arifmuamar.com/anticipating-a-new-chapter/ | /anticipating-a-new-chapter/ | Preserve | Static Route with trailing slash |
| https://arifmuamar.com/home-for-the-holidays/ | /home-for-the-holidays/ | Preserve | Static Route with trailing slash |
| https://arifmuamar.com/small-changes/ | /small-changes/ | Preserve | Static Route with trailing slash |
| https://arifmuamar.com/when-ai-learns-to-see-malaria/ | /when-ai-learns-to-see-malaria/ | Preserve | Static Route with trailing slash |
| https://arifmuamar.com/category/blog/ | /blog/ | Bridge implemented | Static HTML redirect bridge (not HTTP 301) |
| https://arifmuamar.com/author/arifmuamar/ | /about/ | Bridge implemented | Static HTML redirect bridge (not HTTP 301) |
| https://arifmuamar.com/feed/ | /rss.xml | Bridge implemented | Static HTML redirect bridge (not HTTP 301) |
| https://arifmuamar.com/feed.xml | /rss.xml | Alias implemented | RSS at `/feed.xml` and `/rss.xml` |
> GitHub Pages does not provide a server-side 301 redirect for old WordPress paths.
> The bridge pages in this source give users a destination, but an actual HTTP 301
> must be configured in a separate edge service such as Cloudflare Redirect Rules
> after the production domain migration. Never configure a Redirect Rule at the
> root domain that redirects every path.
