import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const optionalText = z.preprocess(
  (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
  z.string().optional(),
);

const optionalUrl = z.preprocess(
  (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
  z.string().url().optional(),
);

const optionalDoi = z.preprocess(
  (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
  z.string().regex(/^10\.\d{4,9}\/.+$/i, 'DOI must use the canonical 10.xxxx/... form').optional(),
);

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: optionalText,
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Arif Muamar"),
    category: optionalText,
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    image: optionalText,
    canonicalURL: optionalUrl,
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    year: z.coerce.number().int().min(1900).max(2100),
    venue: z.string(),
    type: z.enum(['Journal Article', 'Conference Paper', 'Book', 'Book Chapter', 'Preprint', 'Technical Report']),
    status: z.enum(['Published', 'Accepted', 'In Press', 'Under Review', 'Preprint']),
    doi: optionalDoi,
    publisherUrl: optionalUrl,
    scholarUrl: optionalUrl,
    pdf: optionalUrl,
    code: optionalUrl,
    dataset: optionalUrl,
    abstract: optionalText,
    featured: z.boolean().default(false),
    featuredOrder: z.coerce.number().int().positive().optional(),
    researchArea: optionalText,
    tags: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    question: optionalText,
    approach: optionalText,
    status: z.enum(['Active', 'Completed', 'Paused', 'Archived']),
    startDate: optionalText,
    endDate: optionalText,
    role: optionalText,
    collaborators: z.array(z.string()).default([]),
    institution: optionalText,
    technologies: z.array(z.string()).default([]),
    repository: optionalUrl,
    website: optionalUrl,
    publications: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    image: optionalText,
  }),
});

export const collections = { blog, publications, projects };
