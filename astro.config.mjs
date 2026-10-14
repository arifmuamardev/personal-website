// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Fail closed: PREVIEW is the default. GitHub Pages will only generate
// production canonical links/indexing when explicitly opted in.
const isProduction = process.env.PUBLIC_SITE_MODE === 'production';

export default defineConfig({
  site: isProduction ? 'https://arifmuamar.com' : 'https://arifmuamardev.github.io',
  base: isProduction ? '/' : '/personal-website/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
