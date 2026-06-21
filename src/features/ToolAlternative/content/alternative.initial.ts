import type { AlternativeFormData } from "../types/alternative.types";

export const initialAlternative: AlternativeFormData =
{
  title: "",
  slug: "",
  pageDescription: "",

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