import { describe, expect, test } from "vitest";
import { isParentNode } from "./is-parent-node";

describe("isParentNode", () => {
  test("devrais retourner true pour un node de type Parent", () => {
    const parentNode = {
      type: "root",
      children: [],
    };

    expect(isParentNode(parentNode)).toBe(true);
  });

  test("devrais retourner false pour un node de type non-Parent", () => {
    const textNode = {
      type: "text",
      value: "Hello, world!",
    };

    expect(isParentNode(textNode)).toBe(false);
  });
});
