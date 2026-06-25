# CLAUDE.md - repères pour Claude Code

Projet : **site d'anniversaire en un seul fichier** (`index.html`), sans build ni
dépendance. Le guide complet (carte du contenu, photos, musique, règles) est dans
**[`AGENT.md`](AGENT.md)** - lis-le en premier. Ce fichier ajoute les points utiles
spécifiquement à Claude Code.

## L'essentiel
- **Tout est dans `index.html`.** Pas de framework, pas de `npm install`.
- Pour personnaliser : change le prénom (`Julia`), réécris les `class="line"`, insère
  les photos dans les 8 cadres `class="photo-ph"`, ajoute `music.mp3`. Détails et
  carte du contenu : `AGENT.md`.
- Réponds et commente **en français**, le contenu du site est en français.

## Règles à respecter (ne pas casser le scroll iOS)
- Ne remets jamais `overflow-x:hidden` sur `body` (garder `overflow-x:clip`).
- Ne touche pas à `VH` / `layout()` / `update()` / `data-spacer`, ni au
  `viewport-fit=cover`, ni aux `env(safe-area-inset-*)`, ni à
  `-webkit-backdrop-filter`, ni au bloc `prefers-reduced-motion`.
- Garde les messages courts (~1 phrase, < ~90 caractères) pour ne pas déborder en
  mobile (tailles en `clamp`).

## Modifier le texte - méthode
Utilise **Edit** avec des chaînes exactes (repère l'étiquette `class="kicker"` puis le
`class="line"` adjacent). Le fichier peut être lourd s'il contient des photos base64 :
édite par chaînes ciblées, **n'essaie pas de tout réécrire**. Pour insérer/convertir
des images base64 volumineuses, passe par un petit script (ex. Python) plutôt que par
le contexte.

## Vérifier
- Lance un serveur statique simple et ouvre la page (ex. config `Claude_Preview` avec
  `python -m http.server`).
- ⚠️ Certains navigateurs « headless » de preview **ne peignent pas** : les captures
  d'écran peuvent expirer et `requestAnimationFrame` ne se déclenche pas (donc les
  transitions de scroll ne s'observent pas, et `update()` ne se relance pas au scroll).
  Dans ce cas, **vérifie par inspection DOM / styles calculés** (nombre de scènes,
  géométrie via `getBoundingClientRect`, images chargées) au lieu de conclure à un bug.
- Pour de vrai, le rendu et le scroll se valident dans un navigateur réel (idéalement
  Safari iOS).

## Contribution
`main` n'accepte **aucun merge**. Les variantes se font dans des **branches**
(voir `CONTRIBUTING.md`). Ne crée pas de PR vers `main`.
