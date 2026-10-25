import { describe, expect, test } from "vitest";
import { hasOnlyImage } from "./has-only-image";
import type { Element } from "hast";

describe("hasOnlyImage", () => {
  test("devrait retourner true pour un node contenant uniquement une image", () => {
    const node: Element = {
      type: "element",
      tagName: "div",
      properties: {},
      children: [
        {
          type: "element",
          tagName: "img",
          properties: { src: "image.jpg" },
          children: [],
        },
      ],
    };

    expect(hasOnlyImage(node)).toBe(true);
  });

  test("devrait retourner false pour un node contenant autre chose qu'une image", () => {
    const node: Element = {
      type: "element",
      tagName: "div",
      properties: {},
      children: [
        {
          type: "element",
          tagName: "p",
          properties: {},
          children: [
            {
              type: "text",
              value: "Hello, world!",
            },
          ],
        },
      ],
    };

    expect(hasOnlyImage(node)).toBe(false);
  });
});
