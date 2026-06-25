# AGENT.md — guide pour les agents IA

Ce dépôt est un **site d'anniversaire en un seul fichier** (`index.html`), sans build
ni dépendance. Ce document explique à un agent IA (Claude, ChatGPT, etc.) **comment
personnaliser le contenu sans casser le code**, et comment vérifier le résultat.

## Mission typique
« Personnalise ce site pour l'anniversaire de **<prénom>** » :
1. remplacer le prénom,
2. réécrire les messages,
3. (optionnel) insérer les photos fournies,
4. (optionnel) brancher une musique,
5. vérifier que rien n'est cassé.

Tout se fait dans **`index.html`** uniquement.

---

## Architecture (à comprendre avant d'éditer)

```
<body>
 └─ <div data-bday-root>
     ├─ 2 calques de fond (position:fixed) ......... dégradés
     ├─ <div data-stars> ........................... étoiles (générées en JS)
     ├─ <div> stage (position:fixed; inset:0) ...... contient les 10 scènes
     │    ├─ scène 0 : OUVERTURE (panda + titres + prénom + indice "défile")
     │    ├─ scènes 1..8 : [data-scene] photo + message
     │    └─ scène 9 : FINALE (panda + cœurs + "Je t'aime")
     ├─ <div data-dots> ............................ points de navigation (JS)
     ├─ <button data-music> ........................ bouton ♪
     ├─ <audio data-audio loop>
     └─ <div data-spacer> .......................... crée la hauteur de scroll
 └─ <script> ... génère étoiles/cœurs/points, gère le scroll et la musique
```

Le `<script>` lit `scrollY` et anime chaque `[data-scene]`. **Le nombre de scènes
est automatique** (`scenes.length`) : ajouter/retirer une scène met à jour la hauteur
de défilement et les points de nav sans autre changement.

---

## Carte du contenu (où est chaque texte)

| Repère | Quoi | Valeur d'exemple |
|--------|------|------------------|
| `<title>` + scène d'ouverture | **Prénom** | `Julia` |
| Ouverture | sur-titre | `Aujourd'hui, c'est ton jour` |
| Ouverture | titre | `Joyeux anniversaire` |
| Ouverture | indice de scroll | `Défile pour ouvrir` |
| Scène 1 (`class="kicker"`) | étiquette / message | `Le tout début` |
| Scène 2 | étiquette / message | `Mon petit panda` |
| Scène 3 | étiquette / message | `Adorable` |
| Scène 4 | étiquette / message | `Ton rire` |
| Scène 5 | étiquette / message | `Bleu ciel` |
| Scène 6 | étiquette / message | `Toi` |
| Scène 7 | étiquette / message | `Matin & soir` |
| Scène 8 | étiquette / message | `Aujourd'hui` |
| Finale | sur-titre | `Pour toi, aujourd'hui et toujours` |
| Finale | titre | `Je t'aime` |
| Finale | sous-titre | `avec tout mon cœur` |

**Pour éditer un message** : repère l'étiquette dans la table (ex. `Ton rire`), puis
modifie le bloc `<div class="line">…</div>` immédiatement adjacent dans la même scène.
**Pour le prénom** : remplace toutes les occurrences de `Julia`.

### Règles de rédaction (pour ne pas casser la mise en page)
- Garde les **étiquettes courtes** (1–3 mots) et les **messages** à ~1 phrase
  (idéalement < 90 caractères) : les tailles de police sont en `clamp(...)` et un texte
  trop long déborde sur petit écran.
- Conserve les **accents** corrects (é, è, à, ç, œ…).
- N'introduis pas de balises HTML non fermées dans les textes ; échappe `&` en `&amp;`.
- Tu peux changer la langue de tout le contenu sans rien casser d'autre.

---

## Insérer des photos

Le template contient **8 cadres** `<div class="photo-ph" style="width:…;height:…;">Ta photo ici</div>`.
Remplace un cadre par une image **en gardant exactement les mêmes `width`/`height`** :

```html
<img src="<chemin-ou-data-url>" alt="" style="width:clamp(240px,30vw,360px);height:clamp(300px,38vw,450px);object-fit:cover;border-radius:3px;">
```

- Scènes 1,2,4,5,7,8 → taille `width:clamp(240px,30vw,360px);height:clamp(300px,38vw,450px);`
- Scènes 3 et 6 (centrées) → taille `width:clamp(260px,32vw,400px);height:clamp(300px,36vw,460px);`
- `object-fit:cover` recadre proprement n'importe quelle photo.
- Pour un **fichier unique partageable**, utilise une **data URL base64**
  (`src="data:image/jpeg;base64,…"`). Sinon, référence un fichier local (`photos/1.jpg`).

---

## Brancher la musique

- Le code lit `MUSIC_SRC` (par défaut `'music.mp3'`) en haut du `<script>`.
- La lecture démarre **à la première interaction** de l'utilisateur (tap / début de
  scroll / touche) — contrainte iOS : pas de son sans geste. Le bouton ♪ coupe/remet.
- Ne committe pas de musique sous copyright dans le dépôt public (`*.mp3` est ignoré).

---

## Réglages exposés (haut du `<script>`)
`STAR_COUNT` (densité d'étoiles), `PARALLAX` (intensité parallaxe), `PALETTE`
(couleurs d'étoiles), `MUSIC_SRC`. Couleurs de fond : les 2 `<div>` à dégradé en haut
du `<body>`. Polices : `<link>` Google Fonts dans le `<head>`.

---

## ⛔ À NE PAS toucher (sinon le scroll casse, surtout sur iPhone)
- `body { overflow-x:clip }` — **ne pas** remettre `hidden` : sur iOS Safari, `hidden`
  fait du `<body>` un conteneur de défilement, `window.scrollY` reste à 0 et les scènes
  ne bougent plus.
- La logique `VH` / `layout()` / `update()` / le `data-spacer` : la géométrie est
  pilotée par une **unité de hauteur figée** pour rester stable malgré la barre d'URL
  iOS. Ne pas la remplacer par `100vh`/`window.innerHeight` lus en continu.
- `<meta name="viewport" … viewport-fit=cover>` et les `env(safe-area-inset-*)`
  (encoche / Dynamic Island).
- `-webkit-backdrop-filter` (avant `backdrop-filter`) sur le bouton musique.
- Le bloc `@media (prefers-reduced-motion: reduce)`.

Si tu changes l'architecture, **teste le scroll sur un vrai navigateur** (idéalement
Safari iOS), pas seulement sur desktop.

---

## ✅ Vérifier après modification
1. Ouvre `index.html` dans un navigateur ; **aucune erreur** dans la console.
2. Le défilement fait apparaître/disparaître les scènes une à une ; les points de nav
   à droite s'allument sur la scène active et permettent d'y sauter.
3. Sur petit écran (ou DevTools en mode mobile ~390×850), les textes ne débordent pas
   et les photos restent dans leur cadre.
4. Si tu as ajouté une musique : un tap lance le son ; le bouton ♪ le coupe/remet.
5. Idéalement, teste réellement sur un iPhone (Safari) : le scroll doit être fluide.
