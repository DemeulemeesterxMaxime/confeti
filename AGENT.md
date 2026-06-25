# AGENT.md - guide pour les agents IA

Projet en deux parties :
- une **galerie Astro** (`src/`) pour parcourir et personnaliser des modeles ;
- des **modeles autonomes "un seul fichier"** dans `public/templates/<slug>/index.html`.

Ce guide explique comment **personnaliser un modele** et **en ajouter un** sans casser
le code (notamment le scroll iOS).

## Personnaliser un modele (mission typique)
« Personnalise ce site pour l'anniversaire de **<prenom>** » -> tout se passe dans
**`public/templates/<slug>/index.html`** :
1. remplacer le prenom, 2. reecrire les messages, 3. inserer les photos,
4. (option) brancher une musique, 5. verifier.

### Carte du contenu (modele `romantic-scroll`)
Chaque texte editable porte un attribut `data-edit`, chaque cadre photo un `data-slot`.

| data-edit | Role | Exemple |
|-----------|------|---------|
| `name` | Prenom (ouverture + titre de page) | `Julia` |
| `opening.eyebrow` | Ouverture : sur-titre | `Aujourd'hui, c'est ton jour` |
| `opening.title` | Ouverture : titre | `Joyeux anniversaire` |
| `s1.kicker` / `s1.line` | Scene 1 : etiquette / message | `Le tout debut` / ... |
| ... | Scenes 2 a 8 (`sN.kicker`, `sN.line`) | ... |
| `finale.eyebrow` / `finale.title` / `finale.sub` | Finale | `Je t'aime` / ... |

Cadres photo : `data-slot="1"` a `data-slot="8"` (chacun un `<div class="photo-ph">`).

### Comment editer
- **Texte** : trouve l'element par son `data-edit` et change son contenu. Garde les
  messages courts (~1 phrase, < ~90 caracteres) : les tailles sont en `clamp(...)`.
- **Prenom** : change `data-edit="name"` (et le `<title>` si tu veux).
- **Photo** : remplace le `<div class="photo-ph" data-slot="N" ...>Ta photo ici</div>`
  par une image **en gardant la meme taille** :
  ```html
  <img src="<chemin-ou-data-url>" alt="" style="width:clamp(240px,30vw,360px);height:clamp(300px,38vw,450px);object-fit:cover;border-radius:3px;">
  ```
  (Scenes 3 et 6, centrees : `width:clamp(260px,32vw,400px);height:clamp(300px,36vw,460px)`.)
  Pour un fichier unique partageable, utilise une data URL base64.
- **Musique** : place `music.mp3` dans le dossier du modele (ou data URL base64 sur
  l'`<audio data-audio>`). Demarre a la premiere interaction (contrainte iOS).

Le **personnalisateur de la galerie** (`src/pages/create/[slug].astro`) detecte
generiquement les `data-slot` / `data-edit` : tout modele respectant cette convention
devient personnalisable + telechargeable automatiquement.

## Ajouter un modele
Cree `public/templates/<slug>/` avec `index.html` (requis), `meta.json` et `music.mp3`
(optionnels). La galerie lit le dossier au build (`src/lib/templates.js`, via `fs`).
Marque les `data-slot` / `data-edit` pour le rendre personnalisable.

## ⛔ A NE PAS toucher dans un modele (sinon le scroll casse, surtout iPhone)
- `body { overflow-x:clip }` (ne JAMAIS remettre `hidden` : sur iOS Safari ca fige `window.scrollY`).
- La logique `VH` / `layout()` / `update()` / `data-spacer` (geometrie pilotee par une
  unite de hauteur figee, stable malgre la barre d'URL iOS).
- `viewport-fit=cover` + `env(safe-area-inset-*)`, `-webkit-backdrop-filter`,
  le bloc `@media (prefers-reduced-motion: reduce)`.

## ✅ Verifier
1. `npm run dev` puis ouvrir la galerie / un modele : aucune erreur console.
2. Le scroll fait apparaitre/disparaitre les scenes ; les points de nav s'allument.
3. Sur petit ecran (~390x850) : les textes ne debordent pas, les photos restent cadrees.
4. Personnalisateur : ajouter une image + editer un texte -> l'apercu se met a jour ;
   le fichier telecharge contient bien les modifications.
5. Idealement, tester le modele sur un vrai iPhone (Safari).
