// Platform identifiers
export type Platform = "openai" | "anthropic" | "perplexity" | "gemini";

// Sentiment analysis result
export type Sentiment = "positive" | "neutral" | "negative";

// Audit form input
export interface AuditFormData {
  brandName: string;
  brandUrl: string;
  category: string;
  competitors: string[];
}

// Free audit form input (includes lead capture)
export interface FreeAuditFormData extends AuditFormData {
  firstName: string;
  lastName: string;
  email: string;
}

// Individual brand analysis from a single platform
export interface BrandAnalysis {
  name: string;
  mentioned: boolean;
  position: number | null;
  sentiment: Sentiment | null;
  context: string | null;
}

// Result from a single platform
export interface PlatformResult {
  platform: Platform;
  displayName: string;
  brandAnalysis: BrandAnalysis;
  competitorAnalysis: BrandAnalysis[];
  rawResponse: string;
  error?: string;
}

// Complete audit response
export interface AuditResponse {
  success: boolean;
  results: PlatformResult[];
  summary: {
    visibilityScore: number; // 0-100
    platformsMentioned: number;
    totalPlatforms: number;
    avgPosition: number | null;
    bestPlatform: string | null;
  };
  timestamp: string;
}

// Category options for the audit form
export const CATEGORIES = [
  "CRM Software",
  "Email Marketing",
  "Project Management",
  "Accounting Software",
  "HR Software",
  "Marketing Automation",
  "E-commerce Platform",
  "Customer Support",
  "Analytics & BI",
  "Cloud Hosting",
  "Cybersecurity",
  "Video Conferencing",
  "Design Tools",
  "Payment Processing",
  "Social Media Management",
  "SEO Tools",
  "Content Management",
  "Supply Chain Management",
  "ERP Software",
  "Other",
] as const;

export const PLATFORM_DISPLAY_NAMES: Record<Platform, string> = {
  openai: "ChatGPT",
  anthropic: "Claude",
  perplexity: "Perplexity",
  gemini: "Gemini",
};
