# Contribuer 🌱

Merci de l'intérêt ! Ce projet a un modèle de contribution un peu particulier.

## `main` est figée

La branche **`main` est la version de référence** du template. **Aucune contribution
n'y est mergée** - n'ouvre pas de Pull Request vers `main` (elle ne sera pas acceptée).
`main` reste volontairement simple et stable pour que tout le monde parte de la même base.

## Partage ta variante dans une branche

Tu as fait un joli thème, une autre mise en page, une version dans une autre langue,
des couleurs différentes, une saison (Noël, Saint-Valentin…) ? **Partage-la dans une
branche dédiée.**

```bash
# fork ou accès en écriture, puis :
git checkout -b template/<nom-court-de-ton-theme>
# … tes modifications dans index.html …
git commit -m "Template : <description>"
git push origin template/<nom-court-de-ton-theme>
```

### Conventions pour une branche de template
- **Préfixe** la branche par `template/` (ex. `template/noel`, `template/minimal-rose`,
  `template/english`).
- Garde le principe **un seul fichier** `index.html` (sans build).
- Mets à jour le `<title>` et un court descriptif en haut de ton `index.html` (commentaire).
- **Pas de contenu perso ni de fichiers sous copyright** committés (photos privées,
  musiques protégées). Utilise des placeholders, des assets libres de droits, ou des
  data URLs que tu assumes de publier. `*.mp3` est ignoré par `.gitignore`.
- Conserve les garde-fous iOS (voir [`AGENT.md`](AGENT.md) → section « À NE PAS toucher »).

## Et après ?

Si beaucoup de branches de templates apparaissent, l'idée est de construire :
- une **galerie** pour parcourir et prévisualiser les templates des différentes branches ;
- éventuellement un **créateur de page unique propulsé par IA**, pour générer son propre
  site comme celui-ci à partir de quelques infos (prénom, messages, photos, ambiance).

Les retours et idées sont les bienvenus via les *Issues*.

## Bugs / améliorations de la base

Pour un **bug réel** sur la base commune (un truc cassé, surtout sur iOS), ouvre une
*Issue* décrivant le problème et l'appareil/navigateur. Les correctifs de fond sont
gérés par le mainteneur.
