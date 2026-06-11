import type { FAQ } from "./faq.types";
import type { PageTool } from "./tool.types";
import type { MetaData } from "./meta.types";

export interface PageFormData {

  title: string;

  slug: string;

  pageDescription: string;

  categoryId: string;

  categoryDescription: string;

  catImage: {
    url: string;
    public_id: string;
  };

  meta: MetaData;

  tools: PageTool[];

  faq: FAQ[];
}