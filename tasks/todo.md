# Todo - Confeti

## README GitHub open source et trouvabilite (2026-07-13)

- [x] Auditer les references GitHub, les capacites reelles, les assets et les workflows de Confeti.
- [x] Recomposer le README autour de la galerie de sites de fete, du flux sans code, d une illustration reelle, de la contribution de templates et de la confidentialite.
- [x] Corriger les references de workflow obsoletees, verifier liens et Markdown, puis mettre a jour le changelog avant commit et push de la branche documentaire. Preuves : 17 tests passes, lint sans erreur, build Astro/Vercel, liens locaux et diff-check valides.

## Terminé

### Migration Astro 5 → 6 (sécurité) (2026-06-26)

- [x] `astro@^6.4.8` + `@astrojs/vercel@^10.0.8` (corrige XSS define:vars/slot/spread, SSRF, x-astro-path)
- [x] `overrides` : `path-to-regexp@6.1.0` → `6.3.0` (corrige le backtracking via @vercel/routing-utils)
- [x] `audit-ci.jsonc` : allowlist vidée → 0 high/critical
- [x] Vérifié endpoint SSR `/api/generate` : `import.meta.env` lit toujours les secrets au runtime (test dev → 500 fetch failed, pas 503)
- [x] Build / lint (astro check 0.9.9) / 17 tests / format / audit-ci : tous verts ; version 2.3.0
- [x] Node requis : 22.12+ (déjà aligné CI + `.nvmrc`)

### CI/CD open-source (2026-06-26)

- [x] package.json : devDeps (Vitest, ESLint, Prettier, audit-ci, @astrojs/check) + scripts `test`/`coverage`/`lint`/`format`, version 2.2.0
- [x] Tests unitaires Vitest : `flattenAiJson`, `getTemplates`, invariants mascots/decors (17 tests, verts)
- [x] ESLint 9 (flat config + plugin Astro) + Prettier (+ plugin Astro), formatage de tout `src/`
- [x] Corrections typage TS dans les scripts client (create/galerie/Base) pour `astro check`
- [x] Workflows : ci, security (audit-ci + Gitleaks), codeql, lighthouse, deploy (Vercel CLI)
- [x] Dependabot (npm + actions), `.nvmrc` (Node 22), `audit-ci.jsonc`, `.gitleaks.toml`, `lighthouserc.json`
- [x] Montée Astro 5.18.2 + Vitest 4 (correctifs de sécurité), aligné CI sur Node 22 (runtime Vercel)
- [x] Vérifié en local : test / lint / format / build / audit-ci verts ; Lighthouse audite le build

### Renommage Confeti → confeti (2026-06-26)

- [x] package.json : `"name": "confeti"`
- [x] src/layouts/Base.astro : logo, footer, og:site_name, JSON-LD
- [x] src/pages/index.astro, create.astro, galerie.astro, create/[slug].astro : titres
- [x] src/pages/create/[slug].astro : préfixe téléchargement `confeti-*.html`

### Intégration IA (endpoint OpenAI-compatible) (2026-06-26)

- [x] Installer @astrojs/vercel@8.2.11 (compatible Astro 5)
- [x] astro.config.mjs : adapter vercel (Astro 5 n'a plus `output: 'hybrid'`)
- [x] src/pages/api/generate.ts (endpoint serveur, `prerender = false`)
- [x] src/pages/create.astro : formulaire fonctionnel (fetch + sessionStorage + redirect)
- [x] src/pages/create/[slug].astro : data-field + pré-remplissage depuis sessionStorage
- [x] .env.example : AI_API_BASE_URL, AI_API_KEY, AI_MODEL
- [x] .gitignore : ajout .env

### Responsive desktop - usage pleine largeur (2026-06-26)

- [x] src/pages/create/[slug].astro : éditeur quasi plein écran (`max-width:none`), aperçu en colonne fixe 340px, réglages en 3 colonnes effectives (`#fields` en `columns:2` + colonne visuels), sous-titres `column-span:all`
- [x] src/pages/create/[slug].astro : mobile (<900px) remplace l'aperçu embarqué par un bouton « Voir l'aperçu » (ouvre le site généré dans un onglet via `openBig`)
- [x] src/pages/create.astro : formulaire IA quasi plein écran (cohérence)
- [x] Vérifié via preview (styles calculés) : 2000px → ed-grid `340px 1549px`, `#fields` column-count 2 ; 375px → bouton visible, stage masqué, window.open(blob) OK

### Éditeur en stepper accordéon (2026-06-26)

- [x] src/pages/create/[slug].astro : réglages découpés en 4 étapes (1. Textes, 2. Photos, 3. Apparence, 4. Musique & partage) en accordéon vertical, navigation libre (clic sur l'en-tête) + bouton « Étape suivante »
- [x] `initStepper()` : une seule étape ouverte à la fois ; masque auto les étapes vides (pas de photos / pas de mascotte-décor selon la template)
- [x] Aperçu ramené à sa taille d'origine (248px), vignettes photos plus petites (`auto-fill minmax(72px)`), mascottes/décors `auto-fill minmax(84px)`
- [x] Vérifié via preview : 1920px → 4 étapes, étape 1 ouverte, docHeight 1154px (vs 1828px avant), stage 248px, photos 76×101px, navigation accordéon OK ; mobile → bouton aperçu + stepper OK ; build OK

### Ajustements stepper - retour utilisateur (2026-06-26)

- [x] Aperçu PC trop petit : layout desktop rééquilibré → `minmax(380px,1fr) minmax(0,1040px)` (aperçu ~765px, panneau 1040px) + `.stage.desktop max-width:1000px`
- [x] Textes : 4 cartes par ligne (`columns:4`, au lieu de `column-width:300px` qui donnait 5)
- [x] Couleurs de fond plus petites (`bg-sw` 46px fixe, `auto-fill`) pour dédier l'espace aux mascottes (22, multi-lignes)
- [x] Plus de décors d'arrière-plan : +7 (Bulles, Neige, Notes, Papillons, Ballons, Feuilles, Nuit) dans src/lib/decors.js + branchés dans la template (addGlyphs)
- [x] BUG corrigé : `.step-next` (bouton créé en JS) était `margin-top:0` car la règle scopée Astro ne s'applique pas aux éléments createElement → déplacée en `is:global` (.ed-grid .step-next, 24px)
- [x] Vérifié via preview : ed-grid `765px 1040px`, fields columns 4, stage desktop 765px (transition neutralisée pour lire la valeur), bg-sw 46px, 13 décors, step-next 24px, décor "music" propagé dans le doc généré ; build OK

## Backlog

- (Optionnel) Montée **Astro 7 + @astrojs/vercel 11** : permettrait de retirer l'`override`
  `path-to-regexp` (résolu nativement par routing-utils récent). Non urgent : 0 high actuel.
- Configurer côté GitHub les secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
  et décider de désactiver l'auto-deploy Git natif de Vercel (éviter les doublons).
- Ajouter d'autres templates
- Sélection automatique du template par l'IA (pour l'instant toujours `romantic-scroll`)
- Streaming de la réponse IA pour un meilleur feedback utilisateur
