import { z } from "zod";

const iconTextSchema = z.object({
  text: z.string(),
  icon: z.string(),
});

const iconTitleSchema = z.object({
  title: z.string(),
  icon: z.string(),
});

export const toolContentSchema = z.object({
  _id: z.string().optional(),
  alternativeTools: z.array(
    z.object({
      alternativeId: z.string(),
      position: z.number(),
      isSponsored: z.boolean(),
    })
  ),
  toolId: z.string().min(1, "Tool id is required"),
  hero: z.object({
    hero_badges: z.array(iconTextSchema),
  }),
  coreCapabilities: z.array(iconTitleSchema),
  prosCons: z.object({
    pros: z.array(z.string()),
    cons: z.array(z.string()),
  }),
  latestBlogs: z.array(
    z.object({
      title: z.string(),
      excerpt: z.string(),
      link: z.string(),
    })
  ),
  engineAndValue: z.array(
    z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
    })
  ),
  underTheHood: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
  features: z.array(z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
  })),
  bestFor: z.array(
    z.object({
      icon: z.string(),
      persona: z.string(),
      description: z.string(),
    })
  ),
  performanceSection: z.object({
    title: z.string(),
    description: z.string(),
    securityFeatures: z.array(z.string()),
    metrics: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        percentage: z.union([
          z.number(),
          z.literal(""),
        ]),
      })
    ),
  }),
  pricing: z.object({
    sectionTitle: z.string(),
    sectionSubtitle: z.string(),
    annualDiscount: z.string(),
    plans: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        price: z.string(),
        billingPeriod: z.string(),
        badge: z.string(),
        cta: z.string(),
        features: z.array(z.string()),
      })
    ),
  }),
  faqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
  ctaBanner: z.object({
    headline: z.string(),
    subtext: z.string(),
    primaryBtnText: z.string(),
    secondaryBtnText: z.string(),
    primaryLink: z.string(),
    secondaryLink: z.string(),
    bottomText: z.string(),
  }),
});
