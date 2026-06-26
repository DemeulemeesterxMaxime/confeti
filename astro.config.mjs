import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site statique (sortie 'static' par défaut). Les templates sont servis tels quels
// depuis public/templates/<slug>/ et lus au build via fs dans les pages.
export default defineConfig({
  site: 'https://confeti.fun',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
