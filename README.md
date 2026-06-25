# 🎂 Confetti - galerie + personnalisateur de sites de fete (toutes occasions)

> Marque **Confetti** (point coral en signature). Anniversaire, fete des meres/peres,
> felicitations... un site qui se raconte au scroll, a personnaliser et offrir.

> **EN - TL;DR**: An open-source gallery of single-file, scroll-driven birthday
> websites. Browse a template, add your photos / texts / music right in the browser,
> download one ready-to-host HTML file, and put it online in 2 minutes. Works great on
> iPhone (Safari iOS) and desktop. AI-friendly: see [`AGENT.md`](AGENT.md).

**Birthday Website Template** est un projet open source en deux parties :

1. une **galerie web** (faite avec Astro) pour parcourir des modeles de sites
   d'anniversaire, les **personnaliser dans le navigateur** (photos, textes, prenom,
   musique) et **telecharger un fichier HTML unique** pret a offrir ;
2. les **modeles** eux-memes, qui restent des **sites autonomes "un seul fichier"**
   (scroll narratif, etoiles, panda, coeurs, musique), compatibles iPhone et ordinateur.

**Demo : https://birthday-website-template-jet.vercel.app/**

---

## 💝 Pour offrir un site (sans coder)

1. Ouvre la galerie, choisis un modele, clique **Personnaliser**.
2. Change le **prenom** et les **messages**, ajoute tes **photos** (une par cadre) et,
   si tu veux, une **musique** (mp3).
3. Clique **Telecharger le site** : tu obtiens un seul fichier `.html`.
4. Mets-le en ligne (voir la page **Deployer** du site, ou la section ci-dessous).

> Les photos et la musique sont integrees dans le fichier telecharge : il fonctionne
> tout seul, meme hors-ligne, et se partage facilement.

---

## 🚀 Mettre en ligne (gratuit)

- **Le plus simple** : glisse ton fichier sur [Netlify Drop](https://app.netlify.com/drop) -> URL immediate.
- **Vercel** (URL stable, auto-deploy) : mets ton fichier dans un depot GitHub, importe-le
  sur [vercel.com/new](https://vercel.com/new) (Framework = Other), **Deploy**.

Details et bouton "Deploy to Vercel" sur la page **/deploy** du site.

---

## 🧩 Ajouter un modele a la galerie

Depose un dossier dans **`public/templates/<ton-modele>/`** :

```
public/templates/mon-modele/
├─ index.html     # ton site autonome (requis)
├─ meta.json      # { "title", "description", "author", "accent" }  (optionnel)
└─ music.mp3      # musique de fond (optionnel, git-ignore par defaut)
```

La galerie lit automatiquement le dossier au build (rien a declarer ailleurs). Pour que
ton modele soit **personnalisable** dans la galerie, marque :
- chaque cadre photo avec `data-slot="1"`, `data-slot="2"`, ...
- chaque texte editable avec `data-edit="cle"` (`name`, `opening.title`, `s1.kicker`,
  `s1.line`, `finale.title`, ...).

Voir [`AGENT.md`](AGENT.md) (convention complete) et [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## 🛠️ Developpement local

Pre-requis : Node 18+.

```bash
npm install
npm run dev      # http://localhost:4321  (galerie + personnalisateur)
npm run build    # genere dist/ (site statique)
npm run preview  # sert le build
```

Structure :

```
public/templates/<slug>/   # les modeles (servis tels quels + lus au build)
src/pages/index.astro      # galerie
src/pages/create/[slug].astro  # personnalisateur (JS client)
src/pages/deploy.astro     # guide d'hebergement
src/lib/templates.js       # scan du dossier templates (build-time, fs)
```

Deploiement : Astro est detecte automatiquement par Vercel (build `astro build`,
sortie `dist/`). Aucun `vercel.json` necessaire.

---

## 🤖 Aide par IA

- [`AGENT.md`](AGENT.md) - guide generique (carte du contenu d'un modele, ou modifier
  textes/photos/musique, convention `data-slot`/`data-edit`, regles iOS, verification).
- [`CLAUDE.md`](CLAUDE.md) - repères pour Claude Code (structure Astro, commandes).

---

## 🌱 Contribuer

`main` reste **figee** (aucun merge). Les modeles et variantes se partagent dans des
**branches** `template/...`. Voir [`CONTRIBUTING.md`](CONTRIBUTING.md).

> Suite envisagee : enrichir la galerie avec les templates des branches, et un
> **createur de page propulse par IA**.

---

## 📄 Licence

[MIT](LICENSE). Un credit fait plaisir, mais n'est pas obligatoire. ✨
