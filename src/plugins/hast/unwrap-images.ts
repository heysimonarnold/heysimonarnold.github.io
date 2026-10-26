import { defineHastPlugin } from "satteri";
import { isElementNode } from "../../utils/ast/is-element-node";
import { hasOnlyImage } from "../../utils/ast/has-only-image";

/**
 * Function pour enlever les <p> ajoutés autour des images en mdx
 * @returns un plugin HAST Sätteri.
 */
export const unwrapImages = defineHastPlugin({
  name: "unwrap-images",
  element: {
    filter: ["p"],
    visit(node, context) {
      if (isElementNode(node) && hasOnlyImage(node)) {
        context.replaceNode(node, node.children);
      }
    },
  },
});
