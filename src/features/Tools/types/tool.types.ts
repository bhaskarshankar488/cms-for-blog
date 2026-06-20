export interface SeoData {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
}

export interface ToolFormData {
  name: string;
  slug: string;
  globalDescription: string;

  pricingLabel: string;
  whatIsIt: string;

  brand: string;
  link: string;
  categoryId: string;

  seo: SeoData;

  ratingValue: number | "";
  ratingCount: number | "";
  reviewCount: number | "";

  tags: string[];
}

export interface ToolImage {
  url: string;
  public_id: string;
}

export interface ToolResponse
  extends ToolFormData {

  _id: string;

  images: {
    tool: ToolImage;
    hero: ToolImage;
    faq: ToolImage;
  };

  createdAt: string;
  updatedAt: string;
}