/** Public case studies; private apps should not be listed here by default. */
export const softwareProjects = [
  {
    id: 'pilketos',
    title: 'Pilketos',
    subtitle: 'School election management and polling-station workflow',
    summary: 'A web-based student-council election system covering election setup, candidates, voter administration, polling-station workflows and results.',
    category: 'Web application',
    status: 'Development / demonstration',
    technologies: ['React', 'Vite', 'Supabase', 'GitHub Pages'],
    // Simplified information architecture labels, not product screenshots.
    workflow: ['Election setup', 'TPS operations', 'Results review'],
    repository: 'https://github.com/arifmuamardev/pilketos',
    caseStudy: '/portfolio/pilketos/',
    // Production Supabase project is currently inactive; do not advertise a live voting demo.
    demoUrl: null,
    note: 'The public demo is not enabled while its backend is inactive. No real voter records are shown here.',
  },
] as const;
