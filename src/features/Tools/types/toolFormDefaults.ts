// toolFormDefaults.ts

import type { ToolFormData} from "./tool.types";

export const DEFAULT_TOOL_FORM: ToolFormData = {
  name: "",
  slug: "",
  globalDescription: "",

  pricingLabel: "",
  whatIsIt:"",

  brand: "",
  link: "",

  categoryId: "",

  ratingValue: "",
  ratingCount: "",
  reviewCount: "",

  tags: [],
};