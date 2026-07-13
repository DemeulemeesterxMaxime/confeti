# Changelog

Format inspire de [Keep a Changelog](https://keepachangelog.com/fr/).
Versionnage [SemVer](https://semver.org/lang/fr/).

## [Unreleased]

### Modifie

- Refonte le README GitHub avec une promesse produit claire, une illustration versionnee,
  un parcours sans code, les capacites reelles, les garanties de confidentialite et les
  regles de contribution open source.
- Retire du README la reference obsolete au workflow de deploiement Vercel supprime et
  aligne la description de la CI sur les workflows actuellement versionnes.

## [2.5.0] - 2026-06-26

### Ajoute

- **Version anglaise du site (i18n)** : pages vitrine (Accueil, Galerie, Créer,
  Déployer + FAQ) disponibles en anglais sous `/en/`, en plus du français par défaut.
  - Config Astro `i18n` (`defaultLocale: fr`, `locales: [fr, en]`, sans préfixe pour FR).
  - Dictionnaire central `src/i18n/ui.ts` (contenu FR/EN) + helpers
    `getLangFromUrl` / `localizePath`.
  - Pages factorisées en composants bilingues `src/components/pages/`
    (Home, Gallery, Create, Deploy) pour éviter toute duplication de markup/CSS ;
    les routes FR (racine) et EN (`src/pages/en/`) sont de simples wrappers.
  - `Base.astro` : `html lang`, `og:locale` et JSON-LD `inLanguage` dynamiques,
    balises `hreflang` (fr / en / x-default) réciproques, et **bouton FR/EN** dans la
    barre de navigation.
  - Sitemap enrichi des alternates `hreflang` (option `i18n` de `@astrojs/sitemap`).
  - L'éditeur `/create/<slug>` reste en français (hors périmètre de cette étape).
- **Favicons PNG multi-tailles** générés depuis `public/icon.svg`
  (`favicon-32`, `apple-touch-icon` 180, `icon-192`, `icon-512`), référencés dans
  `Base.astro` et `site.webmanifest`.
- **`public/llms-full.txt`** : documentation complète du site en un seul fichier pour
  les LLM (présentation, fonctionnement, pages, FAQ, conventions de contribution).

## [2.4.0] - 2026-06-26

### Ajoute

- **Optimisation SEO et indexation IA** :
  - `public/llms.txt` (convention llms.txt) : resume du site et liens des pages cles
    pour les moteurs de recherche IA et assistants (ChatGPT, Perplexity, Google AI
    Overviews, Claude).
  - JSON-LD enrichi et extensible par page dans `Base.astro` : `@graph` avec
    `Organization` + `WebApplication` (relies par `@id`) et prop `jsonLd` pour les
    graphes propres a chaque page.
  - Donnees structurees par page : `FAQPage` (accueil), `CollectionPage` + `ItemList`
    (galerie), `BreadcrumbList` (galerie et personnalisateur).
  - **Section FAQ visible** sur l'accueil (5 questions/reponses), source unique
    alimentant aussi le JSON-LD.
  - `public/robots.txt` : autorisation explicite des principaux robots IA (GPTBot,
    OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Bingbot...).
  - `public/site.webmanifest` + `public/icon.svg` (PWA), `meta theme-color` et
    `meta author` dans `Base.astro`.
  - `package.json` : `description`, `keywords`, `homepage`, `repository`, `license`,
    `author`.

### Modifie

- README : URL du site corrigee vers `https://confeti.fun` (au lieu de l'ancienne
  URL de demo Vercel) + reference a `llms.txt`.

## [2.3.0] - 2026-06-26

### Securite

- **Migration Astro 5 -> 6.4.8** (+ `@astrojs/vercel` 10.0.8) : corrige les
  vulnerabilites XSS d'Astro (`define:vars`, slot name, spread props), la SSRF de la
  page d'erreur prerender et l'override `x-astro-path` du `@vercel`.
- `path-to-regexp` force en **6.3.0** via `overrides` (corrige le backtracking, dep
  build-time de `@vercel/routing-utils`).
- **Allowlist `audit-ci.jsonc` videe** : plus aucune exception, `npm audit` ne remonte
  plus aucun `high`/`critical`.

### Modifie

- Pre-requis Node : **22.12+** (exige par Astro 6).
- `import.meta.env` cote serveur conserve (verifie : les secrets restent lus au runtime
  par l'endpoint SSR `/api/generate` sous Astro 6).

## [2.2.0] - 2026-06-26

### Ajoute

- **Chaine CI/CD complete (GitHub Actions)** : `ci.yml` (ESLint + `astro check`,
  Prettier, tests Vitest + couverture, build), `security.yml` (audit-ci + Gitleaks),
  `codeql.yml` (SAST), `lighthouse.yml` (audit perf/SEO/a11y), `deploy.yml`
  (deploiement Vercel preview/prod via la CLI).
- **Tests unitaires (Vitest)** : `flattenAiJson`, `getTemplates`, invariants
  `mascots`/`decors` (17 tests).
- **Outillage qualite** : ESLint 9 (flat config + plugin Astro), Prettier
  (+ plugin Astro), scripts `test`, `coverage`, `lint`, `format`.
- **Dependabot** (npm + github-actions, hebdomadaire) et `.nvmrc` (Node 22).

### Modifie

- Montee de version **Astro 5.18.2** et **@astrojs/vercel** (correctifs de securite),
  **Vitest 4** (correctif critique).
- Corrections de typage TypeScript dans les scripts client (`create.astro`,
  `galerie.astro`, `Base.astro`) et formatage Prettier de l'ensemble du code source.

### Securite

- Vulnerabilites XSS d'Astro corrigees a partir d'Astro 6 (migration majeure) :
  exceptions tracees dans `audit-ci.jsonc`, a lever lors du passage a Astro 7
  (cf. `tasks/todo.md`).

## [2.1.0] - 2026-06-25

### Ajoute / Modifie

- Identite de marque **Confeti** (wordmark + point coral signature) sur toute l'app.
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
