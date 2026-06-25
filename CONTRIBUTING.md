# Contribuer 🌱

Merci de l'interet ! Ce projet a un modele de contribution un peu particulier.

## `main` est figee

La branche **`main` est la version de reference**. **Aucune contribution n'y est
mergee** - n'ouvre pas de Pull Request vers `main` (elle ne sera pas acceptee). `main`
reste volontairement stable pour que tout le monde parte de la meme base.

## Partage ton modele / ta variante dans une branche

Un nouveau modele, un theme, une autre langue, une saison (Noel, Saint-Valentin...) ?
**Partage-le dans une branche dediee.**

```bash
git checkout -b template/<nom-court>
# ... tes modifications ...
git commit -m "Template : <description>"
git push origin template/<nom-court>
```

## Ajouter un modele

Cree un dossier dans **`public/templates/<slug>/`** :

```
public/templates/<slug>/
├─ index.html     # site autonome, un seul fichier (requis)
├─ meta.json      # { "title", "description", "author", "accent" }  (optionnel)
└─ music.mp3      # musique de fond (optionnel ; *.mp3 git-ignore par defaut)
```

La galerie lit le dossier automatiquement au build (rien d'autre a declarer).

### Pour qu'il soit personnalisable dans la galerie
- Marque chaque cadre photo : `data-slot="1"`, `data-slot="2"`, ...
- Marque chaque texte editable : `data-edit="cle"` (`name`, `opening.title`,
  `s1.kicker`, `s1.line`, `finale.title`, ...).
- Le personnalisateur detecte ces attributs et genere automatiquement le formulaire
  + le telechargement. Details : [`AGENT.md`](AGENT.md).

### Bonnes pratiques
- Garde le principe **un seul fichier** `index.html` (sans build cote modele).
- **Pas de contenu perso ni de fichiers sous copyright** committes (photos privees,
  musiques protegees). Utilise des placeholders ou des assets libres de droits.
- Conserve les garde-fous iOS (voir `AGENT.md` -> « A NE PAS toucher »).
- Teste sur mobile (Safari iOS) avant de pousser.

## Suite envisagee
Si beaucoup de modeles arrivent : une galerie enrichie agregant les branches, et un
**createur de page propulse par IA**. Idees et retours bienvenus via les *Issues*.

## Bugs sur la base commune
Ouvre une *Issue* (decris l'appareil/navigateur). Les correctifs de fond sont geres par
le mainteneur.
