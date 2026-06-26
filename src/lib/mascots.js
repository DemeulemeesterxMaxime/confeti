// Bibliothèque de mascottes proposées dans le personnalisateur.
// Convention : la template marque sa mascotte avec [data-mascot] (+ data-mascot-size
// en px). Le personnalisateur affiche cette galerie ; à la sélection, le contenu de
// chaque [data-mascot] est remplacé par le glyphe choisi (sauf 'panda', conservé tel quel).
//
// 'panda' est l'option signature : son glyphe est null car on garde le dessin CSS
// d'origine présent dans la template. Les autres sont des emoji (large éventail festif).
export const MASCOTS = [
  { id: 'panda', label: 'Panda', glyph: null },
  { id: 'ange', label: 'Ange', glyph: '👼' },
  { id: 'coeur', label: 'Cœur', glyph: '💖' },
  { id: 'etoile', label: 'Étoile', glyph: '⭐' },
  { id: 'lapin', label: 'Lapin', glyph: '🐰' },
  { id: 'ourson', label: 'Ourson', glyph: '🧸' },
  { id: 'chat', label: 'Chat', glyph: '🐱' },
  { id: 'chien', label: 'Chien', glyph: '🐶' },
  { id: 'renard', label: 'Renard', glyph: '🦊' },
  { id: 'licorne', label: 'Licorne', glyph: '🦄' },
  { id: 'papillon', label: 'Papillon', glyph: '🦋' },
  { id: 'fleur', label: 'Fleur', glyph: '🌸' },
  { id: 'soleil', label: 'Soleil', glyph: '☀️' },
  { id: 'lune', label: 'Lune', glyph: '🌙' },
  { id: 'arcenciel', label: 'Arc-en-ciel', glyph: '🌈' },
  { id: 'gateau', label: 'Gâteau', glyph: '🎂' },
  { id: 'ballon', label: 'Ballon', glyph: '🎈' },
  { id: 'cadeau', label: 'Cadeau', glyph: '🎁' },
  { id: 'Confetis', label: 'Confetis', glyph: '🎉' },
  { id: 'couronne', label: 'Couronne', glyph: '👑' },
  { id: 'colombe', label: 'Colombe', glyph: '🕊️' },
  { id: 'trefle', label: 'Trèfle', glyph: '🍀' },
];

export const DEFAULT_MASCOT = 'panda';
