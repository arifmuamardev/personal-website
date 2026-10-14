import { localPath } from '../lib/urls';

export function GET() {
  const body = {
    name: "Arif Mu'amar Wahid",
    short_name: 'Arif Muamar',
    description: 'Research and software engineering portfolio',
    start_url: localPath('/'),
    scope: localPath('/'),
    display: 'standalone',
    background_color: '#0d1117',
    theme_color: '#075b62',
    icons: [{ src: localPath('/favicon.svg'), sizes: 'any', type: 'image/svg+xml' }],
  };
  return new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/manifest+json' } });
}
