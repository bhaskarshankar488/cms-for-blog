// toolFormDefaults.ts

import type { ToolFormData} from "./tool.types";

export const DEFAULT_TOOL_FORM: ToolFormData = {
  name: "",
  slug: "",
  globalDescription: "",
  ProductDescription: "",

  pricingLabel: "",
  whatIsIt:"",

  brand: "",
  link: "",

  categoryId: "",

  seo: {
  metaTitle: "",
  metaDescription: "",
  metaKeywords: [],
},

  ratingValue: "",
  ratingCount: "",
  reviewCount: "",

  tags: [],
};