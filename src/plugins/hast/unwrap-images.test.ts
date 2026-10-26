// @vitest-environment node
import { describe, expect, test } from "vitest";
import { unwrapImages } from "./unwrap-images";
import { markdownToHtml } from "satteri";

describe("unwrapImages", () => {
  test("devrait enlever les <p> autour des images", async () => {
    const result = await markdownToHtml(`![Alt text](image.jpg)`, {
      hastPlugins: [unwrapImages],
    });

    expect(result.html).toContain('<img src="image.jpg" alt="Alt text">');
    expect(result.html).not.toContain("<p>");
  });

  test("ne modifie pas les <p> contenant du texte", async () => {
    const result = await markdownToHtml("Hello, world!", {
      hastPlugins: [unwrapImages],
    });

    expect(result.html).toContain("<p>Hello, world!</p>");
  });
});
