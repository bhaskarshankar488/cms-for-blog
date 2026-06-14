export interface ToolFormData {
  title: string;
  slug: string;
  description: string;
  brand: string;
  link: string;
  categoryId: string;

  ratingValue: number | "";
  ratingCount: number | "";
  reviewCount: number | "";

  tags: string[];
}
