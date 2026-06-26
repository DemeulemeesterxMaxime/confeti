import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://confeti.fun',
  adapter: vercel(),
  build: { format: 'directory' },
  integrations: [sitemap()],
});
