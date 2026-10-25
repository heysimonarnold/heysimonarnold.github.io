import { describe, expect, test } from "vitest";
import { isWhitespace } from "./is-whitespace";

describe("isWhitespace", () => {
  test("devrait retourner true pour une chaîne vide", () => {
    expect(isWhitespace("")).toBe(true);
  });

  test("devrait retourner true pour une chaîne contenant uniquement des espaces", () => {
    expect(isWhitespace("   ")).toBe(true);
  });

  test("devrait retourner false pour une chaîne contenant des caractères non-espaces", () => {
    expect(isWhitespace("Hello")).toBe(false);
    expect(isWhitespace(" Hello ")).toBe(false);
  });
});
