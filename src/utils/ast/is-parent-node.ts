import type { Parent } from "hast";

/**
 * Type guard pour vérifier si un node est un Parent.
 * @param {unknown} node - Le node à vérifier.
 * @returns {boolean} - true si le node est un Parent, false sinon.
 */
export const isParentNode = (node: unknown): node is Parent => {
  return (
    typeof node === "object" &&
    node !== null &&
    Array.isArray((node as Parent).children)
  );
};
