// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { satteri } from "@astrojs/markdown-satteri";
import path from "node:path";

// Markdown plugins
import { remarkChecklist } from "./plugins/remark/remark-checklist.ts";
import { remarkFractions } from "./plugins/remark/remark-fractions.ts";
import rehypeUnwrapImages from "./plugins/rehype/rehype-unwrap-images.ts";

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
  trailingSlash: "always",
  markdown: {
    processor: satteri({
      mdastPlugins: [remarkChecklist, remarkFractions],
      hastPlugins: [rehypeUnwrapImages],
      features: {
        directive: true,
        smartPunctuation: true,
        rawHtml: true,
      },
    }),
  },
  site: "https://heysimonarnold.github.io",
});
