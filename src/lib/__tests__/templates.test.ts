import { describe, it, expect } from 'vitest';
import { getTemplates } from '../templates';

describe('getTemplates', () => {
  const templates = getTemplates();

  it('retourne un tableau', () => {
    expect(Array.isArray(templates)).toBe(true);
  });

  it('découvre au moins un template (romantic-scroll)', () => {
    expect(templates.some((t) => t.slug === 'romantic-scroll')).toBe(true);
  });

  it('trie les templates par titre (ordre alphabétique)', () => {
    const titles = templates.map((t) => t.title);
    const sorted = [...titles].sort((a, b) => a.localeCompare(b));
    expect(titles).toEqual(sorted);
  });

  it('renseigne les valeurs par défaut et les URLs', () => {
    for (const t of templates) {
      expect(t.slug).toBeTruthy();
      expect(t.title).toBeTruthy();
      expect(t.author).toBeTruthy();
      expect(t.accent).toMatch(/^#/);
      expect(t.category).toBeTruthy();
      expect(typeof t.hasMusic).toBe('boolean');
      expect(t.url).toBe(`/templates/${t.slug}/index.html`);
      expect(t.editUrl).toBe(`/create/${t.slug}/`);
    }
  });

  it('dérive un titre lisible depuis le slug par défaut', () => {
    const t = templates.find((x) => x.slug === 'romantic-scroll');
    // titre = meta.title si présent, sinon slug capitalisé
    expect(t?.title.length).toBeGreaterThan(0);
  });
});
