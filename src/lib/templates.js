import fs from 'node:fs';
import path from 'node:path';

// Dossier "predefini" ou l'on depose les templates : public/templates/<slug>/
// Chaque template = un dossier contenant index.html (requis), meta.json et music.mp3 (optionnels).
const TPL_DIR = path.join(process.cwd(), 'public', 'templates');

export function getTemplates() {
  if (!fs.existsSync(TPL_DIR)) return [];
  return fs
    .readdirSync(TPL_DIR)
    .filter((slug) => fs.existsSync(path.join(TPL_DIR, slug, 'index.html')))
    .map((slug) => {
      const dir = path.join(TPL_DIR, slug);
      let meta = {};
      const metaPath = path.join(dir, 'meta.json');
      if (fs.existsSync(metaPath)) {
        try { meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8')); } catch { /* meta optionnel */ }
      }
      const title = meta.title || slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      return {
        slug,
        title,
        description: meta.description || '',
        author: meta.author || 'communauté',
        accent: meta.accent || '#9cc0ff',
        category: meta.category || 'Romantique',
        hasMusic: fs.existsSync(path.join(dir, 'music.mp3')),
        url: `/templates/${slug}/index.html`,
        editUrl: `/create/${slug}/`,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}
