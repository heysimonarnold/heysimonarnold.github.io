// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// Remark plugins
import remarkDirective from "remark-directive";
import { remarkChecklist } from "./plugins/remark/remark-checklist.ts";
import { remarkFractions } from "./plugins/remark/remark-fractions.ts";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    smartypants: true,
    remarkPlugins: [remarkDirective, remarkChecklist, remarkFractions],
  },
  site: "https://heysimonarnold.github.io",
});
