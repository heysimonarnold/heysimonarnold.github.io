import type { Text } from "hast";

/**
 * Type guard pour vérifier si un node est un Text.
 * @param {unknown} node - Le node à vérifier.
 * @returns {boolean} - true si le node est un Text, false sinon.
 */
export const isTextNode = (node: unknown): node is Text => {
  return (
    typeof node === "object" && node !== null && (node as Text).type === "text"
  );
};
