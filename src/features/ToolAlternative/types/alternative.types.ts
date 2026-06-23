export interface AlternativeTool {
  toolId: string;
  toolName?: string;
  brand?: string;
  customDescription: string;
  position: number;
}

export interface AlternativeFaq {
  question: string;
  answer: string;
}

export interface AlternativeSeo {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
}

export interface AlternativeFormData {
  _id?: string;

  toolId: string;

  title: string;
  slug: string;

  pageDescription: string;

  seo: AlternativeSeo;

  tools: AlternativeTool[];

  faq: AlternativeFaq[];

  content: string;

  status: "active" | "inactive";
}

export interface AlternativeFormErrors {
  title?: string;
  slug?: string;
  pageDescription?: string;
}

export interface ToolSearchResult {
  _id: string;
  name: string;
  slug: string;
  brand: string;
}