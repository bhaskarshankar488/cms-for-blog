import { z } from "zod";

export const alternativeSchema =
  z.object({
    title: z
      .string()
      .min(1, "Title is required"),

    slug: z
      .string()
      .min(1, "Slug is required"),

    pageDescription:
      z.string(),

    seo: z.object({
      metaTitle:
        z.string(),

      metaDescription:
        z.string(),

      metaKeywords:
        z.array(z.string()),
    }),

    tools: z.array(
      z.object({
        toolId:
          z.string(),

        customDescription:
          z.string(),

        position:
          z.number(),
      })
    ),

    faq: z.array(
      z.object({
        question:
          z.string(),

        answer:
          z.string(),
      })
    ),

    content:
      z.string(),

    status:
      z.enum([
        "active",
        "inactive",
      ]),
  });