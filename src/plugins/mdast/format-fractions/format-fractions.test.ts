import { describe, expect, test } from "vitest";
import { markdownToHtml } from "satteri";
import { formatFractions } from "../format-fractions/format-fractions";

describe("formatFractions", () => {
  test("formate les fractions dans le texte et préserve celles dans le code", async () => {
    const result = await markdownToHtml("1/2 + 3/4 = 5/4 et `1/2`", {
      mdastPlugins: [formatFractions],
    });

    expect(result.html).toContain("½ + ¾ = 5/4");
    expect(result.html).toContain("<code>1/2</code>");
  });

  test("ne modifie pas le texte sans fractions", async () => {
    const result = await markdownToHtml("Hello, world!", {
      mdastPlugins: [formatFractions],
    });

    expect(result.html).toContain("<p>Hello, world!</p>");
  });
});
