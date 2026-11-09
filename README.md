# Blogue de Simon Arnold

Site personnel construit avec Astro. Les pages sont générées statiquement et publiées sur GitHub Pages.

## Prérequis

- Node.js 22.23.3, indiqué dans `.nvmrc`
- npm

Depuis la racine du dépôt :

```sh
nvm use
npm ci
```

## Commandes

| Commande            | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Démarre le serveur local sur `http://localhost:4321` |
| `npm run check`     | Vérifie les composants Astro et les types TypeScript |
| `npm test -- --run` | Exécute les tests Vitest une fois                    |
| `npm run build`     | Génère le site dans `dist/`                          |
| `npm run preview`   | Sert localement le dernier build                     |

## Contenu

Les collections se trouvent dans `src/content/` : `blogue/`, `recettes/` et `autres/`. Leurs schémas et champs requis sont définis dans `src/content.config.ts`. Les billets de blogue doivent notamment fournir `dateCreated`.

Les entrées avec `draft: true` sont exclues des listes et des routes publiques. Les images et autres fichiers publics se trouvent dans `public/`; les médias associés aux billets sont organisés sous `public/blogue/`.

Le traitement Markdown/MDX est configuré dans `astro.config.mjs`, avec des plugins pour les fractions, les listes de contrôle et les images.

## Publication

Un push sur `main` déclenche `.github/workflows/deploy.yml`. Le workflow lance `npm run check` et les tests, construit le site, puis le publie sur GitHub Pages. Il peut aussi être lancé manuellement depuis l’onglet Actions de GitHub.
