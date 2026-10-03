// plugins/remark/remark-checklist.ts
import { defineMdastPlugin } from "satteri";
import type { List, Paragraph } from "mdast";

export const remarkChecklist = defineMdastPlugin({
  name: "remark-checklist",
  containerDirective(node, context) {
    if (node.name !== "checklist") return;

    const listNode = node.children.find(
      (child: any) => child.type === "list",
    ) as List | undefined;
    if (!listNode) return;

    const transformedItems = listNode.children.map((item: any) => {
      const paragraph = item.children?.[0] as Paragraph | undefined;
      if (!paragraph || paragraph.type !== "paragraph") return item;

      return {
        ...item,
        children: [
          {
            ...paragraph,
            children: [
              {
                type: "html",
                value: `
<label class="checklist__item">
  <input type="checkbox" class="sr-only" />
  <span class="checklist__icon">
    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
    </svg>
  </span>
  <span class="checklist__label">`,
              },
              ...paragraph.children,
              {
                type: "html",
                value: `</span></label>`,
              },
            ],
          },
        ],
      };
    });

    const transformedListNode: List = {
      ...listNode,
      data: {
        ...(listNode.data || {}),
        hProperties: {
          ...(listNode.data?.hProperties || {}),
          className: "checklist",
        },
      },
      children: transformedItems,
    };

    context.replaceNode(node, transformedListNode);
  },
});

export default remarkChecklist;
