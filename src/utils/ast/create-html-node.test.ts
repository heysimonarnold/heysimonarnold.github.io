import { describe, expect, test } from "vitest";
import { createHtmlNode } from "./create-html-node";

describe("createHtmlNode", () => {
  test("devrait créer un node HTML avec le texte spécifié", () => {
    const result = createHtmlNode("Hello, world!");

    expect(result).toEqual({
      type: "html",
      value: "Hello, world!",
    });
  });
});
