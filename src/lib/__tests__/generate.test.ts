import { describe, it, expect } from 'vitest';
import { flattenAiJson } from '../../pages/api/generate';

describe('flattenAiJson', () => {
  it('aplatit les objets imbriqués en clés à points', () => {
    const out = flattenAiJson({ s1: { kicker: 'a', line: 'b' } });
    expect(out).toEqual({ 's1.kicker': 'a', 's1.line': 'b' });
  });

  it('conserve les clés simples', () => {
    expect(flattenAiJson({ name: 'Axelle' })).toEqual({ name: 'Axelle' });
  });

  it('convertit null et undefined en chaîne vide', () => {
    expect(flattenAiJson({ a: null, b: undefined })).toEqual({ a: '', b: '' });
  });

  it('laisse les tableaux tels quels (stringifiés)', () => {
    const out = flattenAiJson({ tags: ['x', 'y'] });
    expect(out.tags).toBe(String(['x', 'y']));
  });

  it('convertit les nombres et booléens en chaînes', () => {
    expect(flattenAiJson({ n: 42, ok: true })).toEqual({ n: '42', ok: 'true' });
  });

  it('gère plusieurs niveaux d’imbrication', () => {
    const out = flattenAiJson({ a: { b: { c: 'd' } } });
    expect(out).toEqual({ 'a.b.c': 'd' });
  });
});
