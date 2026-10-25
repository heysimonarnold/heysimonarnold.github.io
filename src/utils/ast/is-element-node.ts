import type { Element } from "hast";

/**
 * Type guard pour vérifier si un node est un Element.
 * @param {unknown} node - Le node à vérifier.
 * @returns {boolean} - true si le node est un Element, false sinon.
 */
export const isElementNode = (node: unknown): node is Element => {
  return (
    typeof node === "object" &&
    node !== null &&
    (node as Element).type === "element"
  );
};
