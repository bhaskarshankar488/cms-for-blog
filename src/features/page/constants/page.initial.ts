// page.initial.ts

import type { PageFormData } from "../types/page.types";

export const initialPageForm: PageFormData = {
  title: "",
  slug: "",
  pageDescription: "",
  categoryId: "",
  categoryDescription: "",
  catImage: {
    url: "",
    public_id: "",
  },
  meta: {
    title: "",
    description: "",
    keywords: [],
  },
  tools: [],
  faq: [],
};