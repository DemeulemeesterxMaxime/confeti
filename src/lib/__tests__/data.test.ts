import { describe, it, expect } from 'vitest';
import { MASCOTS } from '../mascots';
import { DECORS, DEFAULT_DECOR } from '../decors';

describe('MASCOTS', () => {
  it('a des ids uniques', () => {
    const ids = MASCOTS.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('contient le panda signature avec un glyphe null', () => {
    const panda = MASCOTS.find((m) => m.id === 'panda');
    expect(panda).toBeDefined();
    expect(panda?.glyph).toBeNull();
  });

  it('chaque mascotte a un id et un label', () => {
    for (const m of MASCOTS) {
      expect(m.id).toBeTruthy();
      expect(m.label).toBeTruthy();
    }
  });
});

describe('DECORS', () => {
  it('a des ids uniques', () => {
    const ids = DECORS.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('le décor par défaut existe dans la liste', () => {
    expect(DECORS.some((d) => d.id === DEFAULT_DECOR)).toBe(true);
  });

  it('chaque décor a id, label et glyph', () => {
    for (const d of DECORS) {
      expect(d.id).toBeTruthy();
      expect(d.label).toBeTruthy();
      expect(d.glyph).toBeTruthy();
    }
  });
});
