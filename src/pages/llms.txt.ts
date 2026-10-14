import { localPath } from '../lib/urls';

export function GET({ site }: { site: URL }) {
  const link = (path: string) => new URL(localPath(path), site).toString();
  const body = `# Arif Mu'amar Wahid\n\nResearcher and software developer.\n\n- About: ${link('/about/')}\n- Research: ${link('/research/')}\n- Publications: ${link('/publications/')}\n- Research Projects: ${link('/projects/')}\n- Software Portfolio: ${link('/portfolio/')}\n- Blog: ${link('/blog/')}\n- CV: ${link('/cv/')}\n- Contact: ${link('/contact/')}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
