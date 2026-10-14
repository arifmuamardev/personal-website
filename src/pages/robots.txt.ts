import { localPath } from '../lib/urls';

export function GET({ site }: { site: URL }) {
  const live = import.meta.env.PUBLIC_SITE_MODE === 'production';
  const sitemap = new URL(localPath('/sitemap-index.xml'), site).toString();
  const body = live
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`
    : `User-agent: *\nDisallow: ${localPath('/')}\n\n# Preview build; pages also include noindex meta.\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
