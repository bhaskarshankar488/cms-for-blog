import { z } from "zod";

export const pageSchema = z.object({
  title: z.string().min(1, "Title is required"),

  slug: z.string().min(1, "Slug is required"),

  categoryId: z.string().min(
    1,
    "Category is required"
  ),

  pageDescription: z.string().min(
    1,
    "Page description is required"
  ),

  meta: z.object({
    title: z.string().min(
      1,
      "Meta title required"
    ),

    description: z.string().min(
      1,
      "Meta description required"
    ),
  }),
});