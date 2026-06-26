# Todo - Confeti

## Terminé

### Renommage confetti → confeti (2026-06-26)
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

## Backlog
- Ajouter d'autres templates
- Sélection automatique du template par l'IA (pour l'instant toujours `romantic-scroll`)
- Streaming de la réponse IA pour un meilleur feedback utilisateur
