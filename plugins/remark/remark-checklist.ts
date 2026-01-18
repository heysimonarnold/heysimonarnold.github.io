// plugins/remark/remark-checklist.ts
import type { Plugin } from "unified";
import type { Root, List, Paragraph } from "mdast";
import { visit } from "unist-util-visit";

export const remarkChecklist: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, "containerDirective", (node: any) => {
      if (node.name !== "checklist") return;

      visit(node, "list", (listNode: List) => {
        // Add class to the list
        listNode.data = {
          ...(listNode.data || {}),
          hProperties: {
            ...(listNode.data?.hProperties || {}),
            className: "checklist",
          },
        };

        listNode.children.forEach((item) => {
          const paragraph = item.children[0] as Paragraph | undefined;
          if (!paragraph || paragraph.type !== "paragraph") return;

          // Replace paragraph children with HTML label + checkbox
          paragraph.children = [
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
          ];
        });
      });
    });
  };
};

export default remarkChecklist;
