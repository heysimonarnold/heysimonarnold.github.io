import type { Root, Element, Parent, Text } from "hast";

export default function rehypeUnwrapImages() {
  return function transform(tree: Root): void {
    unwrap(tree);
  };
}

function unwrap(node: Parent): void {
  if (!node.children) return;

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];

    if (isElement(child) && child.tagName === "p" && containsOnlyImage(child)) {
      node.children.splice(i, 1, ...child.children);
      i += child.children.length - 1;
      continue;
    }

    if (isParent(child)) {
      unwrap(child);
    }
  }
}

function containsOnlyImage(p: Element): boolean {
  let foundImage = false;

  for (const child of p.children) {
    if (isText(child) && isWhitespace(child.value)) {
      continue;
    }

    if (isElement(child) && child.tagName === "img") {
      if (foundImage) return false;
      foundImage = true;
      continue;
    }

    return false;
  }

  return foundImage;
}

/* -------------------------------------------------------------------------- */
/* Type guards                                                                 */
/* -------------------------------------------------------------------------- */

function isElement(node: unknown): node is Element {
  return (
    typeof node === "object" &&
    node !== null &&
    (node as Element).type === "element"
  );
}

function isText(node: unknown): node is Text {
  return (
    typeof node === "object" && node !== null && (node as Text).type === "text"
  );
}

function isParent(node: unknown): node is Parent {
  return (
    typeof node === "object" &&
    node !== null &&
    Array.isArray((node as Parent).children)
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function isWhitespace(value: string): boolean {
  return value.trim().length === 0;
}
