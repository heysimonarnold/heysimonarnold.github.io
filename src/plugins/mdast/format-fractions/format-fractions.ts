import { defineMdastPlugin } from "satteri";
import type { Text } from "mdast";
import { FRACTION_PATTERN, FRACTIONS } from "./constants";

function replaceFractions(value: string): string {
  return value.replace(
    FRACTION_PATTERN,
    (_, prefix: string, fraction: string) => prefix + FRACTIONS[fraction],
  );
}

export const formatFractions = defineMdastPlugin({
  name: "format-fractions",

  text(node) {
    const value = replaceFractions(node.value);

    if (value === node.value) return;

    return {
      ...node,
      value,
    } as Text;
  },
});

export default formatFractions;
