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
  { slug: "whop", name: "Whop business guides", description: "Practical Whop guides for ecommerce stores, AI, services, coaching, courses, paid communities, payments, advertising, and platforms.", intro: "Build a business you can deliver well. Explore Whop’s ecommerce launch, plan a service or course, create a paid community, and understand payments. Start with the reading path that matches what you sell or the advertising task you need to complete.", intent: "learn" as const, picks: ["whop-ecommerce-guide", "whop-vs-shopify", "how-to-sell-physical-products-on-whop", "whop-fees-ecommerce", "whop-checkout-links-guide"] },
  { slug: "start-a-store", name: "Start a store", description: "Choose a platform, understand the costs, and get your first Shopify store ready to take orders.", intro: "Start with the decision your business actually needs to make. These guides cover platform fit, plans, product niches, and the first steps of running a store. Work through setup before adding a stack of apps.", intent: "affiliate" as const, picks: ["shopify-payment-methods-customer-markets", "shopify-first-store-product-assortment", "shopify-without-inventory-business-models", "shopify-vs-ecwid-first-store", "shopify-free-vs-paid-theme-first-store", "how-to-validate-product-demand-before-shopify-store", "shopify-vs-woocommerce-comparison", "shopify-vs-big-cartel", "shopify-pricing-2026-every-plan-real-cost", "shopify-free-trial-2026-complete-guide", "how-to-migrate-from-woocommerce-to-shopify", "shopify-digital-products-app-stack-first-store", "shopify-app-stack-first-physical-store"] },
  { slug: "shopify-apps", name: "Shopify apps", description: "Find the right apps, understand permissions and pricing, and keep your store's software manageable.", intro: "An app should solve a specific store problem. Start with the job, check what Shopify already provides, and compare the total cost and permissions before installing. This collection combines merchant buying guides with app operations and ecosystem coverage.", intent: "learn" as const, picks: ["shopify-subscription-app-customer-portal-checklist", "shopify-apps-ai-visibility", "shopify-app-usage-charges-spending-limits", "shopify-review-app-selection-checklist", "shopify-app-free-to-install-vs-free-plan", "shopify-app-permissions-checklist-merchants", "shopify-built-in-features-vs-apps", "how-to-evaluate-shopify-app-reviews", "how-many-shopify-apps-too-many", "shopify-app-costs-audit-guide", "uninstall-shopify-apps-cleanup-guide"] },
  { slug: "running-a-store", name: "Running a store", description: "Operations, customer experience, profitability, and the practical decisions behind an ecommerce business.", intro: "Running a store means connecting your catalog, fulfillment, customer service, and margins. Use these guides to review a workflow, understand a tradeoff, or fix an operational gap. Start with the problem you can observe before adding software or changing a process.", intent: "learn" as const, picks: ["shopify-free-shipping-threshold-margin", "shopify-manual-payments-bank-transfer-cod", "first-30-days-shopify-store-checklist", "shopify-product-csv-import-first-catalog", "shopify-test-order-before-launch-checklist", "shopify-url-redirect-map-store-migration", "connect-existing-domain-shopify-email-checklist", "shopify-app-costs-audit-guide"] },
  { slug: "ai-commerce", name: "AI in commerce", description: "Practical AI workflows, product discovery, shopping agents, and what changes for merchants.", intro: "Use AI where the workflow is clear and the output can be checked. These articles cover product content, store operations, AI shopping discovery, and platform changes with a direct consequence for ecommerce businesses.", intent: "learn" as const, picks: ["ai-product-comparison-table-checklist", "whop-ai-automation-service-packages", "whop-ai-ad-campaign-preparation", "shopify-apps-ai-visibility", "shopify-magic-sidekick-ai-features-2026", "ai-product-faq-review-checklist", "connect-claude-to-shopify-guide", "shopify-claude-ai-integration-automation", "agentic-checkout-optimization-shopify", "shopify-ai-visibility-complete-guide"] },
  { slug: "advertising", name: "Advertising & growth", description: "Paid acquisition, attribution, conversion, and the numbers behind a profitable ecommerce business.", intro: "Advertising decisions improve when revenue, margin, and attribution are kept separate. Work through the measurement guides and calculators before changing a campaign's budget. Platform-specific guidance sits alongside broader DTC economics.", intent: "learn" as const, picks: [ "whop-ads-guide", "whop-ads-shopify-stores", "whop-ads-budget-break-even-cpa", "reallocating-budget-between-meta-and-google", "first-vs-last-click-attribution-budget-impact", "shopify-apps-that-improve-roas"] },
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

// Reading paths keep the growing Whop library organized by the reader’s job.
export const whopReadingPaths = [
{
  "id": "home-services",
  "name": "Home services and trades",
  "description": "Package local work, confirm the scope, and connect payments to completed visits.",
  "slugs": [
    "whop-for-hvac-businesses",
    "whop-for-auto-detailing",
    "whop-for-house-cleaning",
    "whop-for-pressure-washing",
    "whop-for-lawn-care",
    "whop-for-plumbers",
    "whop-for-electricians",
    "whop-for-handyman-businesses",
    "whop-for-painting-contractors"
  ]
},
{
  "id": "beauty-services",
  "name": "Beauty and appointment businesses",
  "description": "Make consultation, service selection, booking time, and the remaining balance clear.",
  "slugs": [
    "whop-for-nail-technicians",
    "whop-for-hair-stylists",
    "whop-for-estheticians",
    "whop-for-brow-artists",
    "whop-for-lash-artists"
  ]
},
{
  "id": "local-teaching-care",
  "name": "Teaching, fitness, and pet care",
  "description": "Define sessions, recurring plans, attendance, and realistic delivery capacity.",
  "slugs": [
    "whop-for-pet-groomers",
    "whop-for-dog-walkers-pet-sitters",
    "whop-for-personal-trainers",
    "whop-for-tutors",
    "whop-for-music-teachers"
  ]
},
{
  "id": "freelance-services",
  "name": "Freelancers and independent professionals",
  "description": "Scope projects, manage revisions, and price continuing work with visible limits.",
  "slugs": [
    "whop-for-photographers",
    "whop-for-videographers",
    "whop-for-web-designers",
    "whop-for-virtual-assistants",
    "whop-for-professional-organizers"
  ]
},
{
  "id": "advertising",
  "name": "Advertising and measurement",
  "description": "Choose a campaign workflow, connect Shopify tracking, plan a budget, and interpret the results.",
  "slugs": [
    "whop-ads-guide",
    "whop-facebook-instagram-ads",
    "whop-ads-shopify-stores",
    "install-whop-pixel-shopify",
    "whop-ads-budget-break-even-cpa",
    "whop-ads-vs-meta-ads-manager",
    "whop-ads-purchase-tracking-roas",
    "whop-ai-ad-campaign-preparation"
  ]
},
  {
    "id": "ecommerce-ai",
    "name": "Ecommerce and AI",
    "description": "Understand the new store launch, plan a catalog, and evaluate AI recommendations.",
    "slugs": [
      "whop-ecommerce-guide",
      "whop-vs-shopify",
      "whop-ecommerce-launch-2026",
      "whop-website-migration-checklist",
      "whop-product-variants-inventory",
      "whop-multi-product-checkout",
      "whop-economic-intelligence-guide",
      "how-to-sell-physical-products-on-whop"
    ]
  },
  {
    "id": "services",
    "name": "Service businesses",
    "description": "Turn a defined offer into a workable payment, booking, and client-delivery process.",
    "slugs": [
      "whop-for-service-businesses",
      "whop-agency-client-portal",
      "whop-ai-automation-service-packages",
      "whop-consulting-retainers",
      "whop-invoices-guide",
      "whop-calendar-bookings-guide",
      "whop-checkout-links-guide"
    ]
  },
  {
    "id": "coaching-courses",
    "name": "Coaching and courses",
    "description": "Price your time, design useful learning, and make access rules clear.",
    "slugs": [
      "whop-vs-thinkific",
      "whop-coaching-business-setup",
      "whop-coaching-packages-pricing",
      "whop-create-online-course",
      "whop-course-curriculum-guide",
      "whop-course-community-bundle"
    ]
  },
  {
    "id": "communities",
    "name": "Paid communities",
    "description": "Choose your community format, configure access, and help members get started.",
    "slugs": [
      "whop-paid-community-guide",
      "whop-discord-paid-access",
      "whop-telegram-paid-group",
      "whop-membership-tiers",
      "whop-member-onboarding"
    ]
  },
  {
    "id": "payments-operations",
    "name": "Payments and platforms",
    "description": "Deliver files, choose billing, handle exceptions, and measure commercial results.",
    "slugs": [
      "whop-fees-ecommerce",
      "whop-digital-downloads-guide",
      "whop-subscriptions-vs-installments",
      "whop-refunds-cancellations",
      "whop-tracking-links-analytics",
      "whop-for-platforms-marketplaces"
    ]
  }
];
