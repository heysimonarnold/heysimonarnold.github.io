import type { Root, Parent } from "hast";
import { isElementNode } from "../../utils/ast/is-element-node";
import { isParentNode } from "../../utils/ast/is-parent-node";
import { hasOnlyImage } from "../../utils/ast/has-only-image";

/**
 * Function pour enlever les <p> ajoutés autour des images en mdx
 * @returns un arbre HAST modifié sans les <p> autour des images.
 */
export const unwrapImages = () => {
  return function transform(tree: Root): void {
    unwrapImagesRecursively(tree);
  };
};

const unwrapImagesRecursively = (node: Parent): void => {
  if (!node.children) return;

  // Boucle sur tous les noeuds du parent (node)
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];

    if (isElementNode(child) && child.tagName === "p" && hasOnlyImage(child)) {
      node.children.splice(i, 1, ...child.children);
      i += child.children.length - 1;
      continue;
    }

    if (isParentNode(child)) unwrapImagesRecursively(child);
  }
};
