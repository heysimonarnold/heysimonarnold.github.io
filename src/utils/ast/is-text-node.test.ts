import { describe, expect, test } from "vitest";
import { isTextNode } from "./is-text-node";

describe("isTextNode", () => {
  test("devrais retourner true pour un node de type Text", () => {
    const textNode = {
      type: "text",
      value: "Hello, world!",
    };

    expect(isTextNode(textNode)).toBe(true);
  });

  test("devrais retourner false pour un node de type non-Text", () => {
    const elementNode = {
      type: "element",
      tagName: "div",
      properties: {},
      children: [],
    };

    expect(isTextNode(elementNode)).toBe(false);
  });
});
