import { defineMdastPlugin } from "satteri";
import type { List, ListItem, Paragraph } from "mdast";
import { CHECKLIST_ITEM_CLOSE, CHECKLIST_ITEM_OPEN } from "./constants";
import { createHtmlNode } from "../../../utils/ast/create-html-node.ts";

function transformChecklistItem(item: ListItem): ListItem {
  const firstChild = item.children[0];

  if (firstChild?.type !== "paragraph") return item;

  const paragraph: Paragraph = {
    ...firstChild,
    children: [
      createHtmlNode(CHECKLIST_ITEM_OPEN),
      ...firstChild.children,
      createHtmlNode(CHECKLIST_ITEM_CLOSE),
    ],
  };

  return {
    ...item,
    children: [paragraph],
  };
}

function addChecklistClass(list: List): List {
  return {
    ...list,
    data: {
      ...list.data,
      hProperties: {
        ...(
          list.data as List["data"] & { hProperties?: Record<string, unknown> }
        )?.hProperties,
        className: "checklist",
      },
    },
    children: list.children.map(transformChecklistItem),
  };
}

export const formatChecklist = defineMdastPlugin({
  name: "checklist",

  containerDirective(node, context) {
    if (node.name !== "checklist") return;

    const list = node.children.find(
      (child): child is List => child.type === "list",
    );

    if (!list) return;

    context.replaceNode(node, [
      addChecklistClass(list),
      ...node.children.filter((child) => child !== list),
    ]);
  },
});

export default formatChecklist;
