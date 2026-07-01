export interface AlternativeTool {
  alternativeId: string;
  position: number;
  isSponsored: boolean;
}
export interface HeroBadge {
  text: string;
  icon: string;
}

export interface Hero {
  hero_badges: HeroBadge[];
}

export interface CoreCapability {
  title: string;
  icon: string;
}

export interface ProsCons {
  pros: string[];
  cons: string[];
}

export interface Blog {
  title: string;
  excerpt: string;
  link: string;
}

export interface EngineAndValue {
  icon: string;
  title: string;
  description: string;
}

export interface UnderTheHood {
  title: string;
  description: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface BestFor {
  icon: string;
  persona: string;
  description: string;
}

export interface PerformanceMetric {
  label: string;
  value: string;
  percentage: number | "";
}

export interface PerformanceSection {
  title: string;
  description: string;
  securityFeatures: string[];
  metrics: PerformanceMetric[];
}

export interface PricingPlan {
  name: string;
  description: string;
  price: string;
  billingPeriod: string;
  badge: string;
  cta: string;
  features: string[];
}

export interface Pricing {
  sectionTitle: string;
  sectionSubtitle: string;
  annualDiscount: string;
  plans: PricingPlan[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CTABanner {
  headline: string;
  subtext: string;
  primaryBtnText: string;
  secondaryBtnText: string;
  primaryLink: string;
  secondaryLink: string;
  bottomText: string;
}
export interface ToolOption {
  id: string;
  name: string;
  slug: string;
  brand: string;
  image: string;
}

export interface ToolContent {
  _id?: string;

  toolId: string;

  alternativeTools: AlternativeTool[];

  alternativeToolsData?: ToolOption[];

  hero: Hero;

  coreCapabilities: CoreCapability[];

  prosCons: ProsCons;

  latestBlogs: Blog[];

  engineAndValue: EngineAndValue[];

  underTheHood: UnderTheHood[];

  features: Feature[];

  bestFor: BestFor[];

  performanceSection: PerformanceSection;

  pricing: Pricing;

  faqs: FAQ[];

  ctaBanner: CTABanner;
}


