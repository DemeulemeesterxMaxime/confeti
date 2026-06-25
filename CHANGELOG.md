# Changelog

Format inspire de [Keep a Changelog](https://keepachangelog.com/fr/).
Versionnage [SemVer](https://semver.org/lang/fr/).

## [2.1.0] - 2026-06-25
### Ajoute / Modifie
- Identite de marque **Confetti** (wordmark + point coral signature) sur toute l'app.
- Refonte visuelle **Festif & Colore** : Accueil (landing), Galerie (filtres + recherche),
  Editeur (personnalisateur), Deployer - fond creme, primaire coral, Nunito 800.
- Nouvelle page **Creer par IA** (composeur ; generation a venir / stub).
- Textes orientes **toutes occasions** (anniversaire, fete des meres/peres, etc.).
- Pages : `/` Accueil, `/galerie`, `/create` (IA), `/create/<slug>` (editeur), `/deploy`.

## [2.0.0] - 2026-06-25
### Ajoute
- **Galerie web (Astro)** a la racine : parcourir les modeles avec apercu en direct.
- **Personnalisateur dans le navigateur** : editer photos, textes, prenom et musique,
  puis **telecharger un fichier HTML unique** (assets integres en base64).
- **Structure extensible** : deposer un dossier dans `public/templates/<slug>/`
  (lu automatiquement au build) suffit a ajouter un modele.
- Convention `data-slot` (photos) / `data-edit` (textes) pour rendre n'importe quel
  modele personnalisable automatiquement.
- Page **/deploy** : guide d'hebergement (Netlify Drop, Vercel) + bouton Deploy.

### Modifie
- Le modele d'origine devient `public/templates/romantic-scroll/index.html`, annote
  des marqueurs `data-slot` / `data-edit` (logique et corrections iOS inchangees).
- Documentation reecrite (README, AGENT.md, CLAUDE.md, CONTRIBUTING.md).

## [1.0.0] - 2026-06-25
### Ajoute
- Modele initial : site d'anniversaire narratif au scroll, un seul fichier, sans build.
- Compatibilite **iPhone (Safari iOS)** : unite de hauteur figee, `overflow-x:clip`,
  `viewport-fit=cover` + safe-areas, `-webkit-backdrop-filter`, `prefers-reduced-motion`.
- Musique de fond optionnelle (demarrage a la premiere interaction).
- Documentation et licence MIT.
