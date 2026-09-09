export type ContentIntent = "affiliate" | "app" | "learn";

export interface PublicationPost {
  slug: string;
  title: string;
  category: string;
  tags?: string[];
  topics?: string[];
  intent?: ContentIntent;
}

export const publicationTopics = [
  { slug: "start-a-store", name: "Start a store", description: "Choose a platform, understand the costs, and get your first Shopify store ready to take orders.", intro: "Start with the decision your business actually needs to make. These guides cover platform fit, plans, product niches, and the first steps of running a store. Work through setup before adding a stack of apps.", intent: "affiliate" as const, picks: ["how-to-validate-product-demand-before-shopify-store", "shopify-vs-woocommerce-comparison", "shopify-vs-big-cartel", "shopify-pricing-2026-every-plan-real-cost", "shopify-free-trial-2026-complete-guide", "how-to-migrate-from-woocommerce-to-shopify", "shopify-digital-products-app-stack-first-store", "shopify-app-stack-first-physical-store"] },
  { slug: "shopify-apps", name: "Shopify apps", description: "Find the right apps, understand permissions and pricing, and keep your store's software manageable.", intro: "An app should solve a specific store problem. Start with the job, check what Shopify already provides, and compare the total cost and permissions before installing. This collection combines merchant buying guides with app operations and ecosystem coverage.", intent: "learn" as const, picks: ["shopify-app-free-to-install-vs-free-plan", "shopify-app-permissions-checklist-merchants", "shopify-built-in-features-vs-apps", "how-to-evaluate-shopify-app-reviews", "how-many-shopify-apps-too-many", "shopify-app-costs-audit-guide", "uninstall-shopify-apps-cleanup-guide"] },
  { slug: "running-a-store", name: "Running a store", description: "Operations, customer experience, profitability, and the practical decisions behind an ecommerce business.", intro: "Running a store means connecting your catalog, fulfillment, customer service, and margins. Use these guides to review a workflow, understand a tradeoff, or fix an operational gap. Start with the problem you can observe before adding software or changing a process.", intent: "learn" as const, picks: ["first-30-days-shopify-store-checklist", "shopify-product-csv-import-first-catalog", "shopify-test-order-before-launch-checklist", "shopify-url-redirect-map-store-migration", "connect-existing-domain-shopify-email-checklist", "shopify-app-costs-audit-guide"] },
  { slug: "ai-commerce", name: "AI in commerce", description: "Practical AI workflows, product discovery, shopping agents, and what changes for merchants.", intro: "Use AI where the workflow is clear and the output can be checked. These articles cover product content, store operations, AI shopping discovery, and platform changes with a direct consequence for ecommerce businesses.", intent: "learn" as const, picks: ["connect-claude-to-shopify-guide", "shopify-claude-ai-integration-automation", "agentic-checkout-optimization-shopify", "shopify-ai-visibility-complete-guide"] },
  { slug: "advertising", name: "Advertising & growth", description: "Paid acquisition, attribution, conversion, and the numbers behind a profitable ecommerce business.", intro: "Advertising decisions improve when revenue, margin, and attribution are kept separate. Work through the measurement guides and calculators before changing a campaign's budget. Platform-specific guidance sits alongside broader DTC economics.", intent: "learn" as const, picks: [ "reallocating-budget-between-meta-and-google", "first-vs-last-click-attribution-budget-impact", "shopify-apps-that-improve-roas"] },
  { slug: "development", name: "Shopify development", description: "Apps, APIs, catalogs, extensions, and the implementation details behind commerce workflows.", intro: "Start with the API or extension surface your workflow actually needs. This library connects catalog models, data synchronization, app development, and AI-assisted implementation. Check the documentation for your API version before using an example in production.", intent: "learn" as const, picks: ["shopify-product-catalog-api-guide", "shopify-admin-api-guide", "build-shopify-app-with-claude-code", "shopify-webhooks-reliability-guide"] },
];

export function getTopicSlugs(post: PublicationPost): string[] {
  if (post.topics?.length) return post.topics;
  const text = `${post.slug} ${post.title} ${(post.tags ?? []).join(" ")}`.toLowerCase();
  const topics = new Set<string>(publicationTopics.filter(topic => topic.picks.includes(post.slug)).map(topic => topic.slug));
  if (/shopify-for-|start.*store|free.trial|pricing|shopify.*vs|vs.*shopify|migration|beginner|first.30|sign.up|hidden.shopify.cost/.test(text)) topics.add("start-a-store");
  if (/\bapps?\b|app-store|app-cost|app-stack|app-review/.test(text)) topics.add("shopify-apps");
  if (/post.purchase|thank.you|order.status/.test(text)) topics.add("running-a-store");
  if (/\bai\b|claude|chatgpt|agentic|gemini|perplexity/.test(text)) topics.add("ai-commerce");
  if (/inventory|shipping|fulfillment|customer.service|retention|refund|returns|first.30|app.cost|profit/.test(text)) topics.add("running-a-store");
  if (/roas|\bads\b|advertis|attribution|\bcac\b|\baov\b|affiliate/.test(text) || post.category === "Paid Ads") topics.add("advertising");
  if (post.category === "Developers" || /\bapi\b|graphql|webhook|app.develop|app.bridge|polaris|theme.extension/.test(text)) topics.add("development");
  return [...topics];
}

export function getContentIntent(post: PublicationPost): ContentIntent {
  if (post.intent) return post.intent;
  const topics = getTopicSlugs(post);
  if (topics.includes("start-a-store")) return "affiliate";
  return "learn";
}
