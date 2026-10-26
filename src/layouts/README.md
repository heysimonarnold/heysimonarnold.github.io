# Layouts

Les layouts définissent l'enveloppe HTML et les variantes de présentation des pages. Les composants partagés associés sont dans `components/`.

## Composition

```text
StandaloneLayout
  Document HTML, métadonnées, analytics et contenu fourni par la page.

SiteLayout
  StandaloneLayout + styles globaux, préchargement des polices,
  script du thème, navigation, en-tête de page et pied de page.

PageLayout
  SiteLayout + conteneur de contenu éditorial. Pour l'accueil et les pages
  d'index (blogue, recettes, explorations).

ArticleLayout
  SiteLayout + conteneur de contenu et lien « modifier sur GitHub ».
  Pour les recettes et autres contenus éditoriaux simples.

BlogPostLayout
  SiteLayout + contenu d'article, lien « modifier sur GitHub » et image
  d'en-tête optionnelle. Pour les billets du blogue.
```

## Choisir un layout

- Utiliser `PageLayout` pour une page de liste ou une page standard du site.
- Utiliser `ArticleLayout` pour un contenu éditorial sans traitement d'image
  d'en-tête spécifique.
- Utiliser `BlogPostLayout` pour un billet de blogue.
- Utiliser `StandaloneLayout` pour une expérience plein écran ou une page qui
  ne doit pas afficher la navigation, l'en-tête de page ou le pied de page du site.
- Modifier `SiteLayout` uniquement pour changer l'habillage commun des pages
  standard; les layouts qui l'utilisent héritent de ces changements.

Les layouts de page sont consommés depuis `src/pages/`. Ils ne définissent pas
les routes et ne doivent pas être placés dans `src/pages/`.
