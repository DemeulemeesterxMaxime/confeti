# 🎂 Birthday Website Template - site d'anniversaire romantique au scroll

> **EN - TL;DR**: A single-file, no-build, scroll-driven birthday website you can
> offer to someone you love. Copy `index.html`, change the name and the messages,
> drop in your photos and a song, open it (or deploy it free on Vercel). Works great
> on iPhone (Safari iOS) and desktop. AI-friendly: see [`AGENT.md`](AGENT.md).

**Birthday Scroll** est un mini-site romantique **en un seul fichier** (`index.html`),
**sans build, sans dépendance**. On le fait défiler et l'histoire se déroule scène
par scène : une ouverture, une série de photos accompagnées de petits mots, puis une
finale. Étoiles animées, panda en CSS, cœurs qui montent, musique de fond, et tout
ça **compatible iPhone (Safari iOS) et ordinateur**.

C'est fait pour être **copié et personnalisé en quelques minutes** pour offrir à ta
copine / ton copain / qui tu veux. 💖

---

## ✨ Démarrage rapide (5 minutes)

1. **Récupère le projet**
   ```bash
   git clone https://github.com/DemeulemeesterxMaxime/birthday-website-template.git
   cd birthday-website-template
   ```
   (ou télécharge juste `index.html`, c'est le seul fichier indispensable.)

2. **Change le prénom et les messages** - voir [« Personnaliser le texte »](#-personnaliser-le-texte).
   Une IA (Claude, ChatGPT…) peut le faire pour toi : donne-lui [`AGENT.md`](AGENT.md).

3. **Ajoute tes photos** - voir [« Ajouter tes photos »](#-ajouter-tes-photos).

4. **Ajoute une musique** (optionnel) - voir [« Ajouter une musique »](#-ajouter-une-musique).

5. **Ouvre `index.html`** dans ton navigateur pour prévisualiser, puis
   [**déploie-le en ligne**](#-mettre-en-ligne-gratuit-vercel) pour avoir une URL à partager.

---

## 📝 Personnaliser le texte

Tout le texte est écrit **directement dans `index.html`** (cherche-le, remplace-le).
Il y a **10 scènes** :

| Scène | Étiquette (kicker) | Message |
|------:|--------------------|---------|
| Ouverture | `Aujourd'hui, c'est ton jour` / `Joyeux anniversaire` | **Prénom : `Julia`** |
| 1 | `Le tout début` | Le jour où je t'ai rencontrée… |
| 2 | `Mon petit panda` | Tu es mon petit panda… |
| 3 | `Adorable` | Même quand tu te cognes un peu partout… |
| 4 | `Ton rire` | Ton rire est, de loin, ma chanson préférée. |
| 5 | `Bleu ciel` | Avec toi, même les jours gris… |
| 6 | `Toi` | J'aime chaque petite chose qui fait que tu es toi. |
| 7 | `Matin & soir` | Tu es ma première pensée du matin… |
| 8 | `Aujourd'hui` | Aujourd'hui, on te fête toi… |
| Finale | `Pour toi, aujourd'hui et toujours` | **`Je t'aime`** / `avec tout mon cœur` |

- **Changer le prénom** : remplace toutes les occurrences de `Julia` (titre de page,
  scène d'ouverture).
- **Changer un message** : trouve l'étiquette (ex. `Mon petit panda`) puis modifie la
  phrase juste à côté (les blocs `class="line"`).
- **Ajouter / retirer des scènes** : la hauteur de défilement s'adapte automatiquement
  au nombre de scènes (calculée en JS à partir de `scenes.length`).

➡️ Détails complets et règles pour ne rien casser : [`AGENT.md`](AGENT.md).

---

## 🖼️ Ajouter tes photos

Le template contient **8 cadres vides** marqués `Ta photo ici`
(`<div class="photo-ph" …>`). Deux méthodes :

**Méthode A - fichiers à côté (simple)**
1. Mets tes images dans le dossier (ex. `photos/1.jpg`, `photos/2.jpg`…).
2. Remplace chaque placeholder par une image, **en gardant la même taille** :
   ```html
   <!-- avant -->
   <div class="photo-ph" style="width:clamp(240px,30vw,360px);height:clamp(300px,38vw,450px);…">Ta photo ici</div>
   <!-- après -->
   <img src="photos/1.jpg" alt="" style="width:clamp(240px,30vw,360px);height:clamp(300px,38vw,450px);object-fit:cover;border-radius:3px;">
   ```

**Méthode B - tout-en-un (fichier unique partageable)**
Encode l'image en base64 et mets-la dans `src="data:image/jpeg;base64,…"`. Le site
reste alors **un seul fichier** que tu peux envoyer tel quel. (Une IA peut faire la
conversion pour toi.)

> Le cadrage est géré par `object-fit:cover` : n'importe quel format/orientation
> s'affiche proprement dans le cadre.

---

## 🎵 Ajouter une musique

1. Place un fichier **`music.mp3`** à côté de `index.html` (mp3 recommandé ; m4a/aac
   marchent aussi sur iPhone). Garde-le raisonnable (~< 8-10 Mo).
2. C'est tout : le bouton ♪ en bas à droite l'utilise automatiquement.

**Comment ça démarre** : iOS interdit de lancer du son sans geste de l'utilisateur.
La musique se lance donc **à la première interaction** (premier tap / début de scroll),
et le bouton ♪ permet de **couper / remettre**. Elle tourne en boucle.

> ⚠️ **iPhone** : si tu n'entends rien, vérifie que le téléphone **n'est pas en mode
> silencieux** (interrupteur latéral) et que le volume est monté.
>
> 🔒 **Dépôt public** : ne committe pas de musique sous copyright. `*.mp3` est ignoré
> par `.gitignore` - ajoute ton `music.mp3` en local seulement.

Pour changer le nom du fichier attendu, modifie `MUSIC_SRC` en haut du `<script>`.

---

## 🎨 Réglages rapides (en haut du `<script>`)

```js
var STAR_COUNT = COARSE ? 28 : 46;  // nombre d'étoiles (mobile / desktop)
var PARALLAX   = 1;                 // intensité de la parallaxe des photos
var PALETTE    = ['#ffffff', '#ffffff', '#dbe7ff', '#f2dcb0']; // couleurs des étoiles
var MUSIC_SRC  = 'music.mp3';       // fichier audio
```

Couleurs de fond : les deux `<div>` en `position:fixed` tout en haut du `<body>`
(dégradés radials bleu nuit). Polices : le `<link>` Google Fonts dans le `<head>`
(Cormorant Garamond + Nunito).

---

## 🚀 Mettre en ligne (gratuit, Vercel)

1. Pousse ton projet sur **GitHub** (un dépôt, même privé).
2. Va sur **https://vercel.com/new**, connecte-toi avec GitHub.
3. **Importe** ton dépôt. Framework Preset = **Other**, aucune commande de build.
4. **Deploy** → tu obtiens une URL `…vercel.app` à partager. 🎉

À chaque `git push`, Vercel redéploie automatiquement. (Netlify Drop fonctionne aussi :
glisse le dossier sur https://app.netlify.com/drop.)

---

## 🤖 Aide par IA

- [`AGENT.md`](AGENT.md) - guide générique pour n'importe quel agent IA (carte du
  contenu, où modifier le texte/les photos/la musique, règles pour ne pas casser le
  défilement iOS, comment vérifier).
- [`CLAUDE.md`](CLAUDE.md) - repères spécifiques à Claude Code.

---

## 🌱 Contribuer / partager ton template

`main` est la **version de référence** et **n'accepte aucun merge**. Pour partager ta
propre variante (thème, couleurs, langue, mise en page…), **crée une branche**. Voir
[`CONTRIBUTING.md`](CONTRIBUTING.md).

> Idée pour la suite : une galerie pour parcourir les templates des branches, et
> peut-être un **créateur de page unique propulsé par IA**.

---

## 🛠️ Comment ça marche (technique, en bref)

- Tout le contenu visible est en `position:fixed` ; un **spacer** invisible crée la
  hauteur de défilement.
- Au scroll, un `update()` (throttlé via `requestAnimationFrame`) calcule
  opacité / translation / échelle / flou de chaque scène en fonction de `scrollY`.
- **iOS** : la géométrie est pilotée par une **unité de hauteur figée** (`VH`) pour ne
  pas dériver quand la barre d'URL Safari apparaît/disparaît, et `overflow-x:clip`
  (et non `hidden`) garde la **fenêtre** comme zone de défilement.

---

## 📄 Licence

[MIT](LICENSE) - fais-en ce que tu veux. Un crédit fait toujours plaisir, mais n'est
pas obligatoire. ✨
