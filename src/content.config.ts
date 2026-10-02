import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

import { SITE } from "@/configs/site";

const basicProps = {
  author: z.string().default(SITE.author),
  desc: z.string().default(SITE.desc),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  title: z.string(),
};

const autres = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/autres",
  }),
  schema: z.object(basicProps),
});

const blogue = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blogue",
  }),
  schema: z.object({
    ...basicProps,
    type: z.string().default("BlogPost"),
    dateCreated: z.date(),
    dateModified: z.date().optional(),
    ogImage: z.string().optional(),
    hideHeaderImage: z.boolean().default(false),
  }),
});

const recettes = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/recettes",
  }),
  schema: z.object({
    ...basicProps,
    type: z.string().default("Recipe"),
    cookTime: z.number().optional(),
    prepTime: z.number().optional(),
    recipeYield: z.number().optional(),
  }),
});

export const collections = {
  autres,
  blogue,
  recettes,
};
