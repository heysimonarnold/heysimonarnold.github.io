import CodepenIcon from "@/icons/codepen.svg";
import GithubIcon from "@/icons/github.svg";
import LinkedInIcon from "@/icons/linkedin.svg";
import StackoverflowIcon from "@/icons/stackoverflow.svg";
import MailIcon from "@/icons/mail.svg";

import { SITE } from "@/configs/site";

export enum SocialNetworksEnum {
  Codepen = "codepen",
  Github = "github",
  Linkedin = "linkedin",
  Mail = "mail",
  Stackoverflow = "stackoverflow",
}

export interface SocialNetwork {
  active: boolean;
  href: string;
  icon: any;
  id: SocialNetworksEnum;
  label: string;
  linkTitle: string;
}

export const SOCIAL_NETWORKS: SocialNetwork[] = [
  {
    active: true,
    href: "https://codepen.io/heysimonarnold",
    icon: CodepenIcon,
    id: SocialNetworksEnum.Codepen,
    label: "CodePen",
    linkTitle: `${SITE.title} sur CodePen`,
  },
  {
    active: true,
    href: "https://github.com/heysimonarnold",
    icon: GithubIcon,
    id: SocialNetworksEnum.Github,
    label: "GitHub",
    linkTitle: ` ${SITE.title} sur Github`,
  },
  {
    active: true,
    href: "https://stackoverflow.com/users/886539/simon-arnold",
    icon: StackoverflowIcon,
    id: SocialNetworksEnum.Stackoverflow,
    label: "StackOverflow",
    linkTitle: `${SITE.title} sur StackOverflow`,
  },
  {
    active: true,
    href: "https://www.linkedin.com/in/heysimonarnold/",
    icon: LinkedInIcon,
    id: SocialNetworksEnum.Linkedin,
    label: "LinkedIn",
    linkTitle: `${SITE.title} sur LinkedIn`,
  },
  {
    active: false,
    href: "mailto:heysimonarnold@gmail.com",
    icon: MailIcon,
    id: SocialNetworksEnum.Mail,
    label: "Mail",
    linkTitle: `Envoyez un courriel à ${SITE.author}`,
  },
];
