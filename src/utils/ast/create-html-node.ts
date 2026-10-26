import type { Html } from "mdast";

export const createHtmlNode = (value: string): Html => {
  return { type: "html", value };
};
