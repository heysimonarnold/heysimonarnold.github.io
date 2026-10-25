import { isElementNode } from "./is-element-node";
import { isTextNode } from "./is-text-node";
import { isWhitespace } from "../typescript/is-whitespace";
import type { Element } from "hast";

/**
 * Function pour vérifier si un élément ne contient qu'une seule image.
 * @param {Element} p - L'élément à vérifier.
 * @returns {boolean} - true si l'élément ne contient qu'une seule image, false sinon.
 */
export const hasOnlyImage = (p: Element): boolean => {
  let foundImage = false;

  for (const child of p.children) {
    // Si le child est un texte et qu'il est vide ou ne contient que des espaces, on l'ignore.
    if (isTextNode(child) && isWhitespace(child.value)) {
      continue;
    }

    // Si le children est une img et qu'auccune autre n'a été trouvée, on continue.
    if (isElementNode(child) && child.tagName === "img") {
      if (foundImage) return false;
      foundImage = true;
      continue;
    }

    return false;
  }

  return foundImage;
};
