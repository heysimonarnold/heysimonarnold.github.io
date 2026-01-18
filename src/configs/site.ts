export interface Site {
  author: string;
  desc: string;
  favicon: string;
  lang: string;
  locale: string;
  ogImage: string;
  repo: string;
  title: string;
  website: string;
}

export const SITE: Site = {
  author: "Simon Arnold",
  desc: "Site perso de Simon Arnold - Développeur fullstack, formateur et créateur de contenu.",
  favicon: "/favicon.svg",
  lang: "fr",
  locale: "fr-CA",
  ogImage: "/og-image.png",
  repo: "https://github.com/heysimonarnold/heysimonarnold.github.io",
  title: "Simon Arnold",
  website: "https://heysimonarnold.github.io/",
};
