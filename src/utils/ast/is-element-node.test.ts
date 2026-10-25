import { describe, expect, test } from "vitest";
import { isElementNode } from "./is-element-node";

describe("isElementNode", () => {
  test("devrais retourner true pour un node de type Element", () => {
    const elementNode = {
      type: "element",
      tagName: "div",
      properties: {},
      children: [],
    };

    expect(isElementNode(elementNode)).toBe(true);
  });

  test("devrais retourner false pour un node de type non-Element", () => {
    const textNode = {
      type: "text",
      value: "Hello, world!",
    };

    expect(isElementNode(textNode)).toBe(false);
  });
});
