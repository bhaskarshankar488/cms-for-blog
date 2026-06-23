import type { ToolContent } from "../types/toolContent.types";

export const EMPTY_TOOL_CONTENT: ToolContent = {
  toolId: "",

  alternativeTools: [],
  hero: {
    hero_badges: [],
  },
  coreCapabilities: [],
  prosCons: {
    pros: [],
    cons: [],
  },
  latestBlogs: [],
  engineAndValue: [],
  underTheHood: [],
  features: [],
  bestFor: [],
  performanceSection: {
    title: "",
    description: "",
    securityFeatures: [],
    metrics: [],
  },
  pricing: {
    sectionTitle: "",
    sectionSubtitle: "",
    annualDiscount: "",
    plans: [],
  },
  faqs: [],
  ctaBanner: {
    headline: "",
    subtext: "",
    primaryBtnText: "",
    secondaryBtnText: "",
    primaryLink: "",
    secondaryLink: "",
    bottomText: "",
  },
};

export const createEmptyToolContent = (
  toolId: string
): ToolContent => ({
  ...EMPTY_TOOL_CONTENT,
  toolId,
  hero: {
    hero_badges: [],
  },
  coreCapabilities: [],
  prosCons: {
    pros: [],
    cons: [],
  },
  latestBlogs: [],
  engineAndValue: [],
  underTheHood: [],
  features: [],
  bestFor: [],
  performanceSection: {
    title: "",
    description: "",
    securityFeatures: [],
    metrics: [],
  },
  pricing: {
    sectionTitle: "",
    sectionSubtitle: "",
    annualDiscount: "",
    plans: [],
  },
  faqs: [],
  ctaBanner: {
    headline: "",
    subtext: "",
    primaryBtnText: "",
    secondaryBtnText: "",
    primaryLink: "",
    secondaryLink: "",
    bottomText: "",
  },
});
