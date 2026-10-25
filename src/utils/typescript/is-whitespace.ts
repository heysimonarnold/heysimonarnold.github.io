/**
 * Function pour vérifier si un texte est un espace.
 * @param {string} value - La valeur à vérifier.
 * @returns {boolean} - true si la valeur est un espace, false sinon.
 */
export const isWhitespace = (value: string): boolean => {
  return value.trim().length === 0;
};
