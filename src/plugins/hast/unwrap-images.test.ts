import { describe, expect, test } from "vitest";
import { unwrapImages } from "./unwrap-images";
import type { Root } from "hast";

describe("unwrapImages", () => {
  test("devrait enlever les <p> autour des images", () => {
    const tree: Root = {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "p",
          properties: {},
          children: [
            {
              type: "element",
              tagName: "img",
              properties: { src: "image.jpg" },
              children: [],
            },
          ],
        },
      ],
    };

    unwrapImages()(tree);

    expect(tree.children).toHaveLength(1);
    expect(tree.children[0]).toMatchObject({
      type: "element",
      tagName: "img",
    });
  });

  test("devrait ne pas modifier les <p> contenant autre chose qu'une image", () => {
    const tree: Root = {
      type: "root",
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

    unwrapImages()(tree);

    expect(tree.children).toHaveLength(1);
    expect(tree.children[0]).toMatchObject({
      type: "element",
      tagName: "p",
    });
  });
});
