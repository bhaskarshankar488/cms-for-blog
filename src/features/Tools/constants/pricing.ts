// src/shared/constants/pricing.ts

export const PRICING_OPTIONS = [
  "Free",
  "Freemium",
  "Paid",
  "Premium",
  "Limited Access",
] as const;

export type PricingLabel =
  (typeof PRICING_OPTIONS)[number];