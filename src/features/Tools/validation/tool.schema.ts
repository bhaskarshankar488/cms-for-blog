import { z } from "zod";

export const toolSchema = z.object({
  name: z.string().min(1, "Title is required"),

  globalDescription: z
    .string()
    .min(1, "Global Description is required"),

  brand: z.string().min(1, "Brand is required"),

  link: z
    .string()
    .url("Invalid website URL"),

  categoryId: z
    .string()
    .min(1, "Category is required"),

  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.array(z.string()).optional(),
  }).optional(),

  tags: z
    .array(z.string())
    .min(1, "Please select at least one tag")
    .max(3, "Maximum 3 tags allowed"),

  ratingValue: z
    .union([
      z.string(),
      z.number(),
    ])
    .optional(),
});