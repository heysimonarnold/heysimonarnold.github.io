import type { PageListingItem } from "./pageListing";

export function getExplorations(): PageListingItem[] {
  // Absolute path glob — never inside pages folder
  const modules = import.meta.glob("/src/pages/explorations/*/index.astro", {
    eager: true,
  });

  return Object.entries(modules)
    .map(([path, mod]: any) => {
      const parts = path.split("/");
      const slug = parts[parts.length - 2]; // folder name
      const title = mod.frontmatter?.title ?? slug;

      return {
        slug,
        title,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}
