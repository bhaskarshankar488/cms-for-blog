import type { AlternativeFormData } from "../types/alternative.types";

export const initialAlternative: AlternativeFormData =
{

   toolId: "",
  title: "",
  slug: "",
  pageDescription: "",

  mainToolName: "",
  mainToolBrand: "",

  seo: {
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
  },

  tools: [],

  faq: [],

  content: "",

  status: "active",
};