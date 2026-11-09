import { describe, expect, test } from "vitest";
import { isPublished } from "./is-published";

describe("isPublished", () => {
  test("exclut les entrées en brouillon", () => {
    expect(isPublished({ data: { draft: true } })).toBe(false);
  });

  test("inclut les entrées publiées", () => {
    expect(isPublished({ data: { draft: false } })).toBe(true);
  });
});
