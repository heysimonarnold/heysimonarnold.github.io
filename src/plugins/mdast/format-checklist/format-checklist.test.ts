// @vitest-environment node
import { describe, expect, test } from "vitest";
import { markdownToHtml } from "satteri";
import { formatChecklist } from "./format-checklist";

describe("formatChecklist", () => {
  test("formate les éléments de checklist dans le texte et préserve ceux dans le code", async () => {
    const result = await markdownToHtml(
      `:::checklist

1. Tâche 1
2. Tâche 2
\`3. Tâche 3\`
   :::`,
      {
        mdastPlugins: [formatChecklist],
        features: { directive: true, rawHtml: true },
      },
    );

    expect(result.html).toContain('<ol class="checklist">');
    expect(result.html.match(/class="checklist__label"/g)).toHaveLength(2);
    expect(result.html).toContain("Tâche 1");
    expect(result.html).toContain("Tâche 2");
    expect(result.html).toContain("<code>3. Tâche 3</code>");
  });

  test("formate les éléments de checklist d'une liste non-ordonnée", async () => {
    const result = await markdownToHtml(
      `:::checklist

- Tâche 1
- Tâche 2
\`- Tâche 3\`
   :::`,
      {
        mdastPlugins: [formatChecklist],
        features: { directive: true, rawHtml: true },
      },
    );

    expect(result.html).toContain('<ul class="checklist">');
    expect(result.html.match(/class="checklist__label"/g)).toHaveLength(2);
    expect(result.html).toContain("Tâche 1");
    expect(result.html).toContain("Tâche 2");
    expect(result.html).toContain("<code>- Tâche 3</code>");
  });
});
