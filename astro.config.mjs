import { defineConfig } from 'astro/config';

// Site statique (sortie 'static' par défaut). Les templates sont servis tels quels
// depuis public/templates/<slug>/ et lus au build via fs dans les pages.
export default defineConfig({
  build: { format: 'directory' },
});
