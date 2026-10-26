// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { satteri } from "@astrojs/markdown-satteri";
import path from "node:path";

// Markdown plugins
import { formatChecklist } from "@/plugins/mdast/format-checklist/format-checklist.ts";
import { formatFractions } from "@/plugins/mdast/format-fractions/format-fractions.ts";
import { unwrapImages } from "@/plugins/hast/unwrap-images.ts";

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
  integrations: [mdx()],
  trailingSlash: "ignore",
  markdown: {
    processor: satteri({
      mdastPlugins: [formatChecklist, formatFractions],
      hastPlugins: [unwrapImages],
      features: {
        directive: true,
        smartPunctuation: true,
        rawHtml: true,
      },
    }),
  },
  site: "https://heysimonarnold.github.io",
});
