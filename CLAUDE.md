# CLAUDE.md - repères pour Claude Code

Projet en deux parties : une **galerie Astro** (`src/`) et des **modeles autonomes
"un seul fichier"** dans `public/templates/<slug>/index.html`. Le guide complet est
dans **[`AGENT.md`](AGENT.md)** - lis-le en premier. Ici, les points utiles a Claude Code.

## Structure & commandes
- `public/templates/<slug>/` : les modeles (HTML autonome + `meta.json` + `music.mp3` optionnels).
- Pages : `index.astro` (Accueil), `galerie.astro` (Galerie), `create.astro` (Créer par IA, stub),
  `create/[slug].astro` (Éditeur/personnalisateur, JS client), `deploy.astro`.
- Thème **Festif & Coloré** (marque Joyeux) : tokens CSS dans `src/layouts/Base.astro`
  (coral `#ef5d57`, crème `#fdf7ee`, encre `#2b2435`). Composant carte : `src/components/Card.astro`.
- `src/lib/templates.js` : scan du dossier templates au build (`fs`).
- Commandes : `npm install`, `npm run dev` (port 4321), `npm run build` (sortie `dist/`).
- Réponds et commente **en français**.

## Personnaliser un modele
Tout est dans `public/templates/<slug>/index.html`. Textes marques `data-edit="cle"`,
photos marquees `data-slot="N"`. Edite par chaines exactes (Edit). Si le fichier
contient des photos base64 volumineuses, passe par un script (Python) plutot que par
le contexte. Carte du contenu : `AGENT.md`.

## Règles a respecter (ne pas casser le scroll iOS)
- Ne remets jamais `overflow-x:hidden` sur `body` (garder `overflow-x:clip`).
- Ne touche pas a `VH` / `layout()` / `update()` / `data-spacer`, ni a
  `viewport-fit=cover`, `env(safe-area-inset-*)`, `-webkit-backdrop-filter`,
  `@media (prefers-reduced-motion: reduce)`.
- Messages courts (~1 phrase, < ~90 caracteres) pour ne pas deborder en mobile (`clamp`).

## Vérifier
- `npm run dev` + ouvrir la galerie (config `Claude_Preview`, port 4321).
- ⚠️ Le navigateur de preview headless **ne peint pas** : captures qui expirent,
  `requestAnimationFrame` qui ne se declenche pas. Verifie par inspection DOM / styles
  calcules / re-parsing du HTML genere plutot que par capture.
- Pour le personnalisateur, un input file se teste via `DataTransfer` (set `input.files`
  puis dispatch `change`), et la sortie via re-parsing du `srcdoc` de l'apercu.

## Contribution
`main` n'accepte **aucun merge**. Variantes dans des branches `template/...`
(voir `CONTRIBUTING.md`).
