export interface ToolFormData {
  name: string;
  slug: string;
  globalDescription: string;

  pricingLabel: string;
  whatIsIt: string;

  brand: string;
  link: string;
  categoryId: string;

  ratingValue: number | "";
  ratingCount: number | "";
  reviewCount: number | "";

  tags: string[];
}
