// Décors d'arrière-plan animés proposés dans le personnalisateur.
// Convention : la template marque sa racine avec [data-decor] (valeur par défaut
// "stars"). Le personnalisateur affiche cette galerie ; à la sélection, l'attribut
// data-decor de la racine est remplacé, et le script de la template génère le champ
// de particules correspondant (étoiles, cœurs, étincelles, fleurs, Confetis...).
export const DECORS = [
  { id: "stars", label: "Étoiles", glyph: "✦" },
  { id: "hearts", label: "Cœurs", glyph: "♥" },
  { id: "sparkles", label: "Étincelles", glyph: "✨" },
  { id: "flowers", label: "Fleurs", glyph: "🌸" },
  { id: "Confeti", label: "Confetis", glyph: "🎉" },
  { id: "none", label: "Aucun", glyph: "∅" },
];

export const DEFAULT_DECOR = "stars";
