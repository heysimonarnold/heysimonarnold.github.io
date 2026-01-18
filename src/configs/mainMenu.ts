interface MenuItem {
  title: string;
  href: string;
}

export const MAIN_MENU: MenuItem[] = [
  {
    title: "Accueil",
    href: "/",
  },
  {
    title: "Blogue",
    href: "/blogue",
  },
  {
    title: "Explorations",
    href: "/explorations",
  },
  {
    title: "Recettes",
    href: "/recettes",
  },
];
