import { defineMdastPlugin } from "satteri";
import type { Text } from "mdast";

const FRACTIONS: Record<string, string> = {
  "1/2": "½",
  "1/3": "⅓",
  "2/3": "⅔",
  "1/4": "¼",
  "3/4": "¾",
  "1/5": "⅕",
  "2/5": "⅖",
  "3/5": "⅗",
  "4/5": "⅘",
  "1/6": "⅙",
  "5/6": "⅚",
  "1/8": "⅛",
  "3/8": "⅜",
  "5/8": "⅝",
  "7/8": "⅞",
};

const SKIP_PARENTS = new Set(["code", "inlineCode"]);

export const remarkFractions = defineMdastPlugin({
  name: "remark-fractions",
  text(node, context) {
    const parent = context.parent(node);
    if (!parent) return;

    if ("type" in parent && SKIP_PARENTS.has(parent.type)) {
      return;
    }

    let value = node.value;

    for (const [ascii, unicode] of Object.entries(FRACTIONS)) {
      const regex = new RegExp(`\\b${ascii}\\b`, "g");
      value = value.replace(regex, unicode);
    }

    if (value !== node.value) {
      return {
        ...node,
        value,
      } as Text;
    }
  },
});

export default remarkFractions;
