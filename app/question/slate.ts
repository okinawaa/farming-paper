// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import type { Token, Tokens } from "marked";
import { lexer } from "marked";
import type { BaseEditor, Descendant } from "slate";
import type { HistoryEditor } from "slate-history";
import type { ReactEditor } from "slate-react";

export type ParagraphElement = { type: "paragraph"; children: CustomText[] };

export type BlankElement = { type: "blank"; children: CustomText[] };

export type CustomElement = ParagraphElement | BlankElement;

export type CustomText = { text: string; bold?: true };

declare module "slate" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export function convertMarkdownToText(token: Token): CustomText {
  switch (token.type) {
    case "text": {
      return { text: token.text };
    }

    case "strong": {
      const s = token as Tokens.Strong;
      const children = s.tokens.map(convertMarkdownToText);
      return { text: children.map((child) => child.text).join(""), bold: true };
    }

    default: {
      const s = token as Tokens.Generic;
      const children = s.tokens?.map(convertMarkdownToText);
      return { text: children?.map((child) => child.text).join("") ?? "" };
    }
  }
}

export function convertMarkdownToElement(
  token: Token
): CustomElement | CustomElement[] | null {
  switch (token.type) {
    case "space": {
      return null;
    }

    case "paragraph": {
      const p = token as Tokens.Paragraph;
      const children = p.tokens.map(convertMarkdownToText);
      return { type: "paragraph", children };
    }

    case "list": {
      const list = token as Tokens.List;
      const result = list.items.map((item): CustomElement => {
        const children = item.tokens.map(convertMarkdownToText);
        const flatten = children
          .flat()
          .filter((child): child is CustomText => child !== null);
        return { type: "paragraph", children: flatten };
      });

      return result;
    }
  }

  return null;
}

export function convertMarkdownToDescendants(markdown: string): Descendant[] {
  const tokensList = lexer(markdown);
  return tokensList
    .map((token) => convertMarkdownToElement(token))
    .flat()
    .filter((child): child is CustomElement => child !== null);
}
