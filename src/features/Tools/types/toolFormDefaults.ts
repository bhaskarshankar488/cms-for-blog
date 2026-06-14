// toolFormDefaults.ts

import type { ToolFormData} from "./tool.types";

export const DEFAULT_TOOL_FORM: ToolFormData = {
  title: "",
  slug: "",
  description: "",

  brand: "",
  link: "",

  categoryId: "",

  ratingValue: "",
  ratingCount: "",
  reviewCount: "",

  tags: [],
};