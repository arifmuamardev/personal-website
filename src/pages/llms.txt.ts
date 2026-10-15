import { localPath } from '../lib/urls';

export function GET({ site }: { site: URL }) {
  const link = (path: string) => new URL(localPath(path), site).toString();
  const body = `# Arif Mu'amar Wahid\n\nPhD student at Kanazawa University and lecturer at Universitas Amikom Purwokerto. Research focus: plant bioelectric potentials, signal processing, and time-series machine learning.\n\n- About: ${link('/about/')}\n- Research: ${link('/research/')}\n- Publications: ${link('/publications/')}\n- Research Projects: ${link('/projects/')}\n- Writing: ${link('/blog/')}\n- Education: ${link('/education/')}\n- Experience: ${link('/experience/')}\n- Teaching: ${link('/teaching/')}\n- Academic Service: ${link('/academic-service/')}\n- Recognition: ${link('/recognition/')}\n- Contact: ${link('/contact/')}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
