/**
 * Integration data for programmatic SEO
 * Each integration generates a dedicated landing page at /integrations/[platform]
 */

export interface IntegrationUseCase {
  title: string;
  description: string;
  benefit: string;
}

export interface OptimizationTip {
  tip: string;
  explanation: string;
}

export interface IntegrationFAQ {
  question: string;
  answer: string;
}

export interface Integration {
  slug: string;
  name: string;
  category: "ecommerce" | "crm" | "marketing" | "analytics" | "cms";
  headline: string;
  description: string;
  platformContext: string;
  whyAIMatters: string;
  useCases: IntegrationUseCase[];
  optimizationTips: OptimizationTip[];
  commonQueries: string[];
  relevantIndustry: string;
  faqs: IntegrationFAQ[];
  keywords: string[];
}

export const integrations: Integration[] = [
  {
    slug: "shopify",
    name: "Shopify",
    category: "ecommerce",
    headline: "AI Search Visibility for Shopify Stores",
    description:
      "Get your Shopify store recommended by ChatGPT, Claude, and Perplexity. We help Shopify merchants ensure their products appear when AI assistants recommend products in your category.",
    platformContext:
      "Shopify powers millions of online stores worldwide, from small independent retailers to major brands. The platform's ease of use has democratized e-commerce, but it's also created intense competition. With millions of Shopify stores selling similar products, standing out in any channel is increasingly difficult. Traditional SEO and paid advertising for Shopify stores are highly competitive and expensive. AI search represents a new discovery channel where strategic optimization can create significant advantages. Consumers are increasingly asking AI assistants for product recommendations before making purchases—'What's the best [product] for [use case]?'—and Shopify merchants need to ensure their products appear in these conversations.",
    whyAIMatters:
      "AI assistants are becoming a primary product discovery channel, especially for considered purchases. When consumers ask AI for product recommendations, the AI synthesizes information from across the web—reviews, product descriptions, comparison articles—to make suggestions. Shopify stores that optimize their presence for AI can capture high-intent traffic from users who are actively ready to buy. Unlike paid ads where you pay per click, AI visibility drives traffic from users who already trust the recommendation, resulting in higher conversion rates and lower customer acquisition costs.",
    useCases: [
      {
        title: "Product Recommendations",
        description:
          "Ensure your products appear when users ask AI 'What's the best [product] for [need]?'",
        benefit:
          "Capture high-intent traffic from users actively looking for products like yours",
      },
      {
        title: "Gift Guide Visibility",
        description:
          "Get recommended when AI helps users find gifts for specific occasions or recipients",
        benefit:
          "Tap into high-converting gift-buying traffic, especially during peak seasons",
      },
      {
        title: "Comparison Shopping",
        description:
          "Appear favorably when users ask AI to compare products in your category",
        benefit:
          "Win consideration when users are evaluating options before purchase",
      },
      {
        title: "Problem-Solution Matching",
        description:
          "Be recommended when users describe problems your products solve",
        benefit:
          "Reach users who may not know exactly what product they need",
      },
      {
        title: "Category Authority",
        description:
          "Establish your store as the go-to source in your product category",
        benefit:
          "Build sustainable AI visibility that compounds over time",
      },
    ],
    optimizationTips: [
      {
        tip: "Optimize product descriptions for AI comprehension",
        explanation:
          "Structure product information so AI can accurately understand and describe your products to users.",
      },
      {
        tip: "Build a robust review presence",
        explanation:
          "AI heavily weighs reviews when making recommendations. Encouraging quality reviews improves AI visibility.",
      },
      {
        tip: "Create problem-focused content",
        explanation:
          "Content that connects products to specific problems helps AI recommend your products for relevant queries.",
      },
      {
        tip: "Maintain accurate product data",
        explanation:
          "Ensure your Shopify product data is accurate and comprehensive—AI uses this information for recommendations.",
      },
    ],
    commonQueries: [
      "Best [product category] for [use case]",
      "What [product] should I buy for [need]",
      "[Product category] recommendations for [demographic]",
      "Best affordable [product]",
      "[Product] for beginners",
    ],
    relevantIndustry: "ecommerce",
    faqs: [
      {
        question: "How does AI visibility help my Shopify store specifically?",
        answer:
          "We optimize your Shopify store's digital presence—product descriptions, content, reviews—so AI assistants accurately understand and recommend your products for relevant searches.",
      },
      {
        question: "Does this work with any Shopify theme?",
        answer:
          "Yes. AI visibility optimization works regardless of your Shopify theme. We focus on content and presence optimization, not theme modifications.",
      },
      {
        question: "How is this different from Shopify SEO apps?",
        answer:
          "SEO apps optimize for Google rankings. AI visibility optimizes for how AI models understand and recommend products—different algorithms, different tactics.",
      },
      {
        question: "Can you help with Shopify Plus stores?",
        answer:
          "Absolutely. We work with Shopify stores of all sizes, including Shopify Plus enterprise stores with complex catalogs.",
      },
      {
        question: "How long until I see results?",
        answer:
          "Most Shopify merchants see measurable improvements in AI recommendations within 6-8 weeks, with continued growth as optimization compounds.",
      },
    ],
    keywords: [
      "Shopify AI visibility",
      "Shopify ChatGPT optimization",
      "Shopify AI search",
      "Shopify product AI recommendations",
    ],
  },
  {
    slug: "hubspot",
    name: "HubSpot",
    category: "crm",
    headline: "AI Search Visibility for HubSpot Users",
    description:
      "Get your business recommended by AI when prospects research solutions. We help HubSpot users extend their marketing visibility to ChatGPT, Claude, and Perplexity.",
    platformContext:
      "HubSpot is the leading CRM and marketing platform for growing businesses, powering marketing, sales, and customer service for over 200,000 companies. HubSpot users typically have sophisticated marketing operations with content strategies, SEO investments, and lead nurturing workflows already in place. However, most HubSpot users haven't extended their visibility strategy to AI search—missing a critical new channel for capturing prospects. As B2B and B2C buyers increasingly use AI for research and vendor discovery, HubSpot users need to ensure their brands appear in these AI conversations alongside their existing marketing efforts.",
    whyAIMatters:
      "HubSpot users invest heavily in content and inbound marketing, but AI is changing how that content gets discovered. When prospects ask AI assistants about solutions in your category, AI synthesizes information from many sources—not just your website. Your HubSpot-powered content marketing might be excellent, but if AI doesn't understand and cite it correctly, you're missing a growing channel. AI visibility ensures your marketing investments work in AI contexts too, extending the reach of your existing HubSpot content strategy.",
    useCases: [
      {
        title: "Vendor Research Visibility",
        description:
          "Appear when prospects ask AI for vendor recommendations in your category",
        benefit:
          "Get into consideration sets earlier in the buyer journey",
      },
      {
        title: "Competitive Comparisons",
        description:
          "Ensure accurate representation when prospects ask AI to compare you with competitors",
        benefit:
          "Win competitive evaluations happening in AI conversations",
      },
      {
        title: "Content Amplification",
        description:
          "Make your HubSpot content work harder by optimizing for AI citation",
        benefit:
          "Extend reach of existing content investments to AI channels",
      },
      {
        title: "Lead Quality Improvement",
        description:
          "AI-referred leads arrive with more research and context",
        benefit:
          "Higher quality leads that convert faster through your HubSpot funnel",
      },
      {
        title: "Sales Enablement",
        description:
          "When prospects ask AI about your company, ensure accurate information",
        benefit:
          "Support sales conversations with consistent AI messaging",
      },
    ],
    optimizationTips: [
      {
        tip: "Leverage HubSpot content for AI visibility",
        explanation:
          "Your blog posts, guides, and resources can be optimized for AI citation, extending their reach.",
      },
      {
        tip: "Align AI messaging with HubSpot personas",
        explanation:
          "Ensure AI represents your brand consistently with your HubSpot persona messaging.",
      },
      {
        tip: "Integrate AI attribution into HubSpot",
        explanation:
          "Track AI-referred leads in HubSpot to measure this channel's contribution to pipeline.",
      },
      {
        tip: "Coordinate content strategy",
        explanation:
          "Align AI visibility optimization with your HubSpot content calendar for maximum impact.",
      },
    ],
    commonQueries: [
      "Best [software category] for [business type]",
      "[Solution type] vendors comparison",
      "What [tool] should a [company type] use",
      "Alternatives to [competitor]",
      "[Category] software for [industry]",
    ],
    relevantIndustry: "saas",
    faqs: [
      {
        question: "How does AI visibility work with HubSpot?",
        answer:
          "We optimize your overall digital presence for AI while leveraging your HubSpot content. We can also integrate AI attribution into HubSpot for unified tracking.",
      },
      {
        question: "Does this replace our HubSpot SEO efforts?",
        answer:
          "No. AI visibility is complementary to SEO. Strong SEO helps, but AI optimization requires additional tactics specific to how AI models work.",
      },
      {
        question: "Can you track AI leads in HubSpot?",
        answer:
          "Yes. We help you set up AI attribution in HubSpot so you can track, score, and nurture AI-referred leads alongside other sources.",
      },
      {
        question: "How do you coordinate with our HubSpot agency?",
        answer:
          "We're experienced working alongside HubSpot agencies. We handle AI visibility while they focus on HubSpot-specific optimization.",
      },
      {
        question: "What HubSpot tier is required?",
        answer:
          "AI visibility works with any HubSpot tier. Advanced attribution features may benefit from Marketing Hub Pro or higher.",
      },
    ],
    keywords: [
      "HubSpot AI visibility",
      "HubSpot AI marketing",
      "HubSpot ChatGPT optimization",
      "HubSpot AI search",
    ],
  },
  {
    slug: "salesforce",
    name: "Salesforce",
    category: "crm",
    headline: "AI Search Visibility for Salesforce Users",
    description:
      "Ensure your business appears when prospects use AI for vendor research. We help Salesforce users capture pipeline from ChatGPT, Claude, and Perplexity conversations.",
    platformContext:
      "Salesforce is the world's leading CRM, powering sales and marketing operations for enterprises and growing businesses alike. Salesforce users typically have sophisticated go-to-market operations with complex sales cycles and multiple stakeholder buying committees. In enterprise sales, buyers now routinely use AI for vendor research, competitive analysis, and market landscape mapping before ever engaging with sales teams. This means AI visibility directly impacts pipeline generation and deal velocity. For Salesforce users, AI visibility isn't just marketing—it's a sales enablement imperative.",
    whyAIMatters:
      "Enterprise buyers are using AI to build shortlists before engaging vendors. When a procurement team asks AI 'What are the top vendors for [category]?' or a stakeholder asks 'Compare [your company] vs [competitor],' you need to appear favorably. These AI-influenced decisions happen before leads enter your Salesforce pipeline. AI visibility ensures you're in consideration from the earliest stages of the buying process, improving both lead volume and quality.",
    useCases: [
      {
        title: "Enterprise Shortlists",
        description:
          "Appear when enterprise buyers ask AI to build vendor shortlists",
        benefit:
          "Get into RFPs and evaluations earlier in the process",
      },
      {
        title: "Competitive Intelligence Defense",
        description:
          "Ensure accurate representation when buyers compare you with competitors",
        benefit:
          "Protect deals from competitive displacement during research",
      },
      {
        title: "Account-Based Visibility",
        description:
          "Optimize visibility for queries likely from target accounts",
        benefit:
          "Support ABM strategies with AI visibility targeting",
      },
      {
        title: "Sales Conversation Support",
        description:
          "When prospects verify claims via AI, ensure alignment",
        benefit:
          "Build trust by having AI confirm what sales says",
      },
      {
        title: "Deal Acceleration",
        description:
          "AI-educated buyers move through pipelines faster",
        benefit:
          "Shorten sales cycles with better-informed prospects",
      },
    ],
    optimizationTips: [
      {
        tip: "Align AI messaging with sales playbooks",
        explanation:
          "Ensure AI representations match what your sales team tells prospects for consistency.",
      },
      {
        tip: "Optimize for enterprise buying queries",
        explanation:
          "Focus on the specific questions enterprise procurement and stakeholders ask AI.",
      },
      {
        tip: "Integrate AI insights into Salesforce",
        explanation:
          "Track AI visibility data alongside pipeline data to correlate AI presence with deal outcomes.",
      },
      {
        tip: "Support competitive positioning",
        explanation:
          "Proactively optimize for competitive comparison queries to defend deals.",
      },
    ],
    commonQueries: [
      "Top enterprise [solution] vendors",
      "[Your company] vs [competitor] comparison",
      "Best [category] for enterprise",
      "[Industry] software vendors",
      "[Solution type] market leaders",
    ],
    relevantIndustry: "saas",
    faqs: [
      {
        question: "How does AI visibility impact Salesforce pipeline?",
        answer:
          "AI visibility influences buyers before they enter your pipeline, improving lead quality and deal velocity for leads that do engage.",
      },
      {
        question: "Can you integrate AI data into Salesforce?",
        answer:
          "Yes. We can set up AI visibility tracking that flows into Salesforce, giving your team visibility into this channel's pipeline contribution.",
      },
      {
        question: "How do you coordinate with our Salesforce partner?",
        answer:
          "We focus specifically on AI visibility and complement your Salesforce partner's work on CRM and marketing automation.",
      },
      {
        question: "Is this relevant for enterprise sales cycles?",
        answer:
          "Especially relevant. Enterprise buyers use AI extensively for research, making AI visibility crucial for complex B2B sales.",
      },
      {
        question: "How do you measure ROI?",
        answer:
          "We track AI visibility metrics and help correlate with Salesforce pipeline data to show this channel's contribution.",
      },
    ],
    keywords: [
      "Salesforce AI visibility",
      "Salesforce AI marketing",
      "Salesforce ChatGPT optimization",
      "enterprise AI visibility",
    ],
  },
  {
    slug: "wordpress",
    name: "WordPress",
    category: "cms",
    headline: "AI Search Visibility for WordPress Sites",
    description:
      "Get your WordPress website recommended by AI assistants. We help WordPress site owners ensure their content and business appear in ChatGPT, Claude, and Perplexity conversations.",
    platformContext:
      "WordPress powers over 40% of all websites, from simple blogs to complex e-commerce stores and enterprise sites. The platform's flexibility means WordPress users have diverse needs—content publishers, e-commerce, services businesses, and more. WordPress's open ecosystem has created excellent SEO tools and practices, but AI optimization is a new frontier that most WordPress users haven't addressed. As AI increasingly becomes a content discovery and recommendation channel, WordPress site owners need to ensure their sites are optimized for AI visibility, not just traditional search.",
    whyAIMatters:
      "WordPress sites often contain extensive content—blog posts, guides, product information—that AI can reference and recommend. However, AI doesn't index content like Google does. Optimizing WordPress content for AI visibility ensures your content is properly understood, cited, and recommended by AI assistants. For WordPress publishers and businesses, this means extending the value of existing content to a rapidly growing discovery channel.",
    useCases: [
      {
        title: "Content Citation",
        description:
          "Ensure AI cites your WordPress content when answering related questions",
        benefit:
          "Drive traffic from AI conversations back to your content",
      },
      {
        title: "Business Recommendations",
        description:
          "Get recommended when users ask AI about services in your area",
        benefit:
          "Capture high-intent local and service-focused traffic",
      },
      {
        title: "Authority Building",
        description:
          "Position your WordPress site as the definitive source on key topics",
        benefit:
          "Become the AI's go-to recommendation for your specialty",
      },
      {
        title: "E-commerce Visibility",
        description:
          "For WooCommerce sites, appear in AI product recommendations",
        benefit:
          "Drive e-commerce sales through AI product discovery",
      },
      {
        title: "Lead Generation",
        description:
          "Get recommended when users ask AI about solutions you provide",
        benefit:
          "Generate qualified leads from AI research conversations",
      },
    ],
    optimizationTips: [
      {
        tip: "Structure content for AI parsing",
        explanation:
          "Organize WordPress content so AI can easily extract and accurately represent key information.",
      },
      {
        tip: "Optimize WordPress metadata",
        explanation:
          "Ensure your WordPress site's metadata helps AI understand your content and business accurately.",
      },
      {
        tip: "Build topical authority",
        explanation:
          "Create comprehensive content clusters that establish your WordPress site as an authority.",
      },
      {
        tip: "Maintain fresh, accurate content",
        explanation:
          "Regularly update WordPress content to ensure AI has current, accurate information to cite.",
      },
    ],
    commonQueries: [
      "How to [topic your content covers]",
      "Best [service/product] in [location]",
      "What is [concept you explain]",
      "[Topic] guide or tutorial",
      "[Problem] solutions",
    ],
    relevantIndustry: "ecommerce",
    faqs: [
      {
        question: "Does this work with any WordPress theme?",
        answer:
          "Yes. AI visibility optimization is independent of your WordPress theme. We focus on content and metadata, not design.",
      },
      {
        question: "How does this work with WordPress SEO plugins?",
        answer:
          "AI visibility complements SEO plugins like Yoast or RankMath. They optimize for Google; we optimize for AI—different algorithms, complementary tactics.",
      },
      {
        question: "Can you help WooCommerce stores?",
        answer:
          "Absolutely. WooCommerce product visibility in AI is a key focus area, ensuring your products appear in AI shopping recommendations.",
      },
      {
        question: "Do I need to change my WordPress hosting?",
        answer:
          "No. AI visibility optimization works with any WordPress hosting setup.",
      },
      {
        question: "How quickly can I see results?",
        answer:
          "Most WordPress sites see measurable AI visibility improvements within 4-8 weeks of optimization.",
      },
    ],
    keywords: [
      "WordPress AI visibility",
      "WordPress ChatGPT optimization",
      "WordPress AI search",
      "WordPress content AI",
    ],
  },
  {
    slug: "webflow",
    name: "Webflow",
    category: "cms",
    headline: "AI Search Visibility for Webflow Sites",
    description:
      "Get your Webflow website recommended by AI assistants. We help Webflow users ensure their beautifully designed sites are visible in ChatGPT, Claude, and Perplexity conversations.",
    platformContext:
      "Webflow has become the platform of choice for design-forward brands and businesses that want both visual excellence and functionality. Webflow users typically invest significantly in creating distinctive, high-quality web experiences. However, that investment in design quality doesn't automatically translate to AI visibility. AI assistants recommend brands and content based on how well they understand your business and offerings—not based on how beautiful your site looks. For Webflow users, AI visibility optimization ensures their brand investment extends to this new discovery channel.",
    whyAIMatters:
      "Webflow sites often represent brands with strong identities and clear value propositions. When users ask AI assistants about your category, you want those brand qualities represented accurately. AI visibility optimization ensures your brand messaging, expertise, and offerings are properly understood and communicated by AI. For design agencies and freelancers using Webflow, AI visibility also means being found when potential clients ask AI for recommendations.",
    useCases: [
      {
        title: "Brand Representation",
        description:
          "Ensure AI accurately describes your brand and value proposition",
        benefit:
          "Consistent brand messaging across AI conversations",
      },
      {
        title: "Service Discovery",
        description:
          "Get recommended when users ask AI about services you provide",
        benefit:
          "Generate leads from AI-assisted service research",
      },
      {
        title: "Portfolio Visibility",
        description:
          "For agencies, appear when AI recommends design or development services",
        benefit:
          "New client acquisition through AI recommendations",
      },
      {
        title: "Local Business Visibility",
        description:
          "For local businesses, appear in AI local recommendations",
        benefit:
          "Capture local search queries happening in AI",
      },
      {
        title: "Content Authority",
        description:
          "Position your Webflow blog content as an AI-cited source",
        benefit:
          "Drive traffic from AI content recommendations",
      },
    ],
    optimizationTips: [
      {
        tip: "Optimize Webflow CMS for AI",
        explanation:
          "Structure your Webflow CMS collections so AI can accurately parse and understand your content.",
      },
      {
        tip: "Ensure semantic structure",
        explanation:
          "Webflow's design flexibility requires attention to semantic HTML that AI can properly interpret.",
      },
      {
        tip: "Build comprehensive content",
        explanation:
          "Create content that helps AI understand your full range of services and expertise.",
      },
      {
        tip: "Maintain business information accuracy",
        explanation:
          "Ensure your Webflow site reflects accurate, current business information for AI to cite.",
      },
    ],
    commonQueries: [
      "Best [service type] agency/company",
      "[Industry] [service] providers",
      "[Location] [service] recommendations",
      "Design agencies for [project type]",
      "[Category] experts near me",
    ],
    relevantIndustry: "saas",
    faqs: [
      {
        question: "Does AI optimization affect my Webflow design?",
        answer:
          "No. AI visibility optimization works with your existing design. We focus on content and metadata, not visual design changes.",
      },
      {
        question: "How does this work with Webflow SEO settings?",
        answer:
          "AI optimization complements Webflow's SEO tools. We optimize for AI specifically, which requires different tactics than traditional SEO.",
      },
      {
        question: "Can you help Webflow agencies get found?",
        answer:
          "Absolutely. We help Webflow agencies and freelancers appear in AI recommendations when potential clients research design services.",
      },
      {
        question: "Does this work with Webflow E-commerce?",
        answer:
          "Yes. We optimize Webflow E-commerce stores for AI product recommendations and discovery.",
      },
      {
        question: "How do you handle Webflow CMS content?",
        answer:
          "We optimize your Webflow CMS structure and content to ensure AI can accurately understand and cite your dynamic content.",
      },
    ],
    keywords: [
      "Webflow AI visibility",
      "Webflow ChatGPT optimization",
      "Webflow AI search",
      "Webflow site AI",
    ],
  },
  {
    slug: "bigcommerce",
    name: "BigCommerce",
    category: "ecommerce",
    headline: "AI Search Visibility for BigCommerce Stores",
    description:
      "Get your BigCommerce store recommended by AI assistants. We help BigCommerce merchants ensure their products appear when AI recommends products in your category.",
    platformContext:
      "BigCommerce is a leading e-commerce platform known for robust B2B capabilities and enterprise features. BigCommerce merchants often have complex product catalogs, wholesale operations, and sophisticated selling needs. The platform's strength in B2B commerce means many BigCommerce stores serve buyers who extensively research before purchasing—exactly the behavior AI assistants now facilitate. For BigCommerce merchants, AI visibility is particularly important because their buyers are often making considered decisions where AI recommendations carry significant weight.",
    whyAIMatters:
      "BigCommerce stores often serve B2B buyers and consumers making considered purchases. These buyers increasingly use AI for research—comparing products, understanding specifications, finding vendors. AI visibility ensures your BigCommerce store appears in these research conversations. For B2B BigCommerce merchants, being visible when buyers ask AI about vendors in your category can directly impact wholesale inquiries and orders.",
    useCases: [
      {
        title: "B2B Vendor Discovery",
        description:
          "Appear when buyers ask AI for vendor recommendations in your category",
        benefit:
          "Generate wholesale leads and B2B inquiries from AI research",
      },
      {
        title: "Product Comparisons",
        description:
          "Ensure accurate representation in AI product comparison responses",
        benefit:
          "Win competitive evaluations happening in AI conversations",
      },
      {
        title: "Category Authority",
        description:
          "Position your BigCommerce store as a category leader in AI",
        benefit:
          "Build sustainable visibility that compounds over time",
      },
      {
        title: "Complex Product Discovery",
        description:
          "Get recommended for complex products requiring research",
        benefit:
          "Reach buyers during their consideration phase",
      },
      {
        title: "Multi-Channel Visibility",
        description:
          "Extend AI visibility to your BigCommerce multi-channel setup",
        benefit:
          "Consistent visibility across your selling channels",
      },
    ],
    optimizationTips: [
      {
        tip: "Optimize product data for AI",
        explanation:
          "Ensure your BigCommerce product information is structured for AI comprehension and recommendation.",
      },
      {
        tip: "Build B2B content authority",
        explanation:
          "Create content that establishes your expertise for B2B buyer research queries.",
      },
      {
        tip: "Leverage customer reviews",
        explanation:
          "AI weighs reviews heavily—encourage and optimize your BigCommerce review presence.",
      },
      {
        tip: "Maintain accurate specifications",
        explanation:
          "For technical products, ensure specifications are accurate for AI to cite correctly.",
      },
    ],
    commonQueries: [
      "Best [product] suppliers",
      "Wholesale [product category]",
      "[Product] for [B2B application]",
      "Compare [product] options",
      "[Industry] [product] vendors",
    ],
    relevantIndustry: "ecommerce",
    faqs: [
      {
        question: "How does AI visibility help B2B BigCommerce stores?",
        answer:
          "B2B buyers extensively research vendors using AI. Strong AI visibility puts your store in consideration for wholesale inquiries and B2B orders.",
      },
      {
        question: "Does this work with BigCommerce B2B Edition?",
        answer:
          "Yes. We optimize for both standard BigCommerce and B2B Edition, addressing the specific needs of wholesale and B2B commerce.",
      },
      {
        question: "How do you handle large product catalogs?",
        answer:
          "We prioritize optimization based on margin, volume, and strategic importance, systematically expanding coverage across your catalog.",
      },
      {
        question: "Can you integrate with our BigCommerce analytics?",
        answer:
          "Yes. We help you track AI-attributed traffic and conversions within your BigCommerce analytics setup.",
      },
      {
        question: "How does this work with multi-storefront BigCommerce?",
        answer:
          "We can optimize AI visibility across your BigCommerce multi-storefront setup for consistent presence.",
      },
    ],
    keywords: [
      "BigCommerce AI visibility",
      "BigCommerce ChatGPT optimization",
      "BigCommerce AI search",
      "BigCommerce B2B AI",
    ],
  },
  {
    slug: "woocommerce",
    name: "WooCommerce",
    category: "ecommerce",
    headline: "AI Search Visibility for WooCommerce Stores",
    description:
      "Get your WooCommerce store recommended by AI assistants. We help WooCommerce merchants ensure their products appear when AI recommends products in your category.",
    platformContext:
      "WooCommerce is the world's most popular e-commerce platform, powering over 5 million online stores through WordPress. WooCommerce's flexibility and WordPress integration make it a favorite for businesses that want full control over their e-commerce experience. However, this flexibility means WooCommerce optimization can be complex, with many plugins and configurations affecting how your store appears to AI. For WooCommerce merchants, AI visibility optimization requires understanding both WordPress content optimization and e-commerce-specific AI considerations.",
    whyAIMatters:
      "WooCommerce stores benefit from WordPress's content capabilities, but AI product recommendations require specific optimization. When consumers ask AI for product recommendations, AI evaluates product information, reviews, and content across your WooCommerce store. Proper optimization ensures AI accurately understands your products and recommends them for relevant queries. WooCommerce's integration with WordPress also means your blog content can support product AI visibility—when optimized correctly.",
    useCases: [
      {
        title: "Product Recommendations",
        description:
          "Ensure your WooCommerce products appear in AI shopping recommendations",
        benefit:
          "Capture high-intent traffic from AI product queries",
      },
      {
        title: "Content-Driven Discovery",
        description:
          "Use WordPress blog content to drive AI product recommendations",
        benefit:
          "Leverage content marketing for AI commerce visibility",
      },
      {
        title: "Niche Expertise",
        description:
          "Position your WooCommerce store as the expert in your niche",
        benefit:
          "Become the AI's go-to recommendation for specialty products",
      },
      {
        title: "Local Commerce",
        description:
          "Appear in local product and service recommendations via AI",
        benefit:
          "Capture local customers researching via AI",
      },
      {
        title: "Plugin Ecosystem Optimization",
        description:
          "Ensure WooCommerce plugins support AI visibility",
        benefit:
          "Avoid plugin configurations that hinder AI visibility",
      },
    ],
    optimizationTips: [
      {
        tip: "Integrate WordPress content with WooCommerce",
        explanation:
          "Create content that supports product visibility, helping AI connect your expertise to your products.",
      },
      {
        tip: "Optimize WooCommerce product data",
        explanation:
          "Ensure product descriptions, attributes, and specifications are structured for AI understanding.",
      },
      {
        tip: "Audit plugin impact",
        explanation:
          "Some WooCommerce plugins can affect how AI sees your store—we ensure optimal configuration.",
      },
      {
        tip: "Build review presence",
        explanation:
          "WooCommerce review extensions should be leveraged to build the review presence AI values.",
      },
    ],
    commonQueries: [
      "Best [product] for [use case]",
      "Where to buy [product]",
      "[Product] recommendations",
      "[Niche] products online",
      "Affordable [product category]",
    ],
    relevantIndustry: "ecommerce",
    faqs: [
      {
        question: "How does WooCommerce AI optimization differ from Shopify?",
        answer:
          "WooCommerce's WordPress integration offers unique content opportunities but also requires attention to plugin configurations. We handle both platform-specific optimization.",
      },
      {
        question: "Do you work with specific WooCommerce plugins?",
        answer:
          "We're familiar with the WooCommerce ecosystem and ensure your plugins support rather than hinder AI visibility.",
      },
      {
        question: "Can you optimize my WordPress content for WooCommerce products?",
        answer:
          "Absolutely. Connecting WordPress content strategy with WooCommerce products is a key part of our optimization approach.",
      },
      {
        question: "How do you handle WooCommerce variable products?",
        answer:
          "We ensure variable products are structured so AI can accurately recommend specific variations for user queries.",
      },
      {
        question: "Does this work with WooCommerce Subscriptions?",
        answer:
          "Yes. We optimize subscription product visibility to appear when users ask AI about subscription-based products.",
      },
    ],
    keywords: [
      "WooCommerce AI visibility",
      "WooCommerce ChatGPT optimization",
      "WooCommerce AI search",
      "WooCommerce WordPress AI",
    ],
  },
  {
    slug: "squarespace",
    name: "Squarespace",
    category: "cms",
    headline: "AI Search Visibility for Squarespace Sites",
    description:
      "Get your Squarespace website recommended by AI assistants. We help Squarespace users ensure their sites are visible in ChatGPT, Claude, and Perplexity conversations.",
    platformContext:
      "Squarespace is a popular website builder known for beautiful templates and ease of use. Squarespace powers millions of websites for small businesses, creatives, and entrepreneurs who want professional sites without technical complexity. While Squarespace makes it easy to create attractive websites, AI visibility requires optimization beyond template design. For Squarespace users, ensuring their site is visible when AI assistants make recommendations means optimizing content and presence specifically for AI—something the platform doesn't handle automatically.",
    whyAIMatters:
      "Squarespace users often invest significant effort in creating their sites and building their brands. When potential customers ask AI about services or products in their category, Squarespace site owners want to appear in those recommendations. AI visibility optimization ensures your Squarespace site's content and business information are properly understood and cited by AI assistants, extending your brand presence to this new discovery channel.",
    useCases: [
      {
        title: "Service Business Visibility",
        description:
          "Appear when AI recommends service providers in your category",
        benefit:
          "Generate leads from AI-assisted service research",
      },
      {
        title: "Creative Portfolio Discovery",
        description:
          "Get recommended when users ask AI for creatives in your specialty",
        benefit:
          "New client acquisition through AI recommendations",
      },
      {
        title: "Local Business Presence",
        description:
          "Appear in AI local business recommendations",
        benefit:
          "Capture local search queries happening in AI",
      },
      {
        title: "E-commerce via Squarespace",
        description:
          "For Squarespace Commerce users, appear in product recommendations",
        benefit:
          "Drive sales through AI product discovery",
      },
      {
        title: "Brand Authority",
        description:
          "Establish your Squarespace site as an authority in your niche",
        benefit:
          "Build sustainable AI visibility over time",
      },
    ],
    optimizationTips: [
      {
        tip: "Maximize Squarespace content potential",
        explanation:
          "Use Squarespace blogging and content features to build AI-visible expertise and authority.",
      },
      {
        tip: "Optimize Squarespace SEO settings for AI",
        explanation:
          "Configure Squarespace SEO settings to support AI visibility, not just traditional search.",
      },
      {
        tip: "Ensure business info accuracy",
        explanation:
          "Keep business information current so AI can accurately recommend your services.",
      },
      {
        tip: "Build external presence",
        explanation:
          "AI draws from multiple sources—ensure consistent information across your web presence.",
      },
    ],
    commonQueries: [
      "Best [service] near me",
      "[Profession] in [location]",
      "[Creative specialty] portfolio",
      "Recommended [business type]",
      "[Service] for [specific need]",
    ],
    relevantIndustry: "ecommerce",
    faqs: [
      {
        question: "Does AI optimization work with any Squarespace template?",
        answer:
          "Yes. AI visibility optimization works regardless of your Squarespace template. We focus on content and metadata optimization.",
      },
      {
        question: "How does this work with Squarespace SEO tools?",
        answer:
          "We build on Squarespace's built-in SEO tools while adding AI-specific optimization that the platform doesn't provide.",
      },
      {
        question: "Can you help Squarespace Commerce stores?",
        answer:
          "Absolutely. We optimize Squarespace Commerce for AI product recommendations and shopping queries.",
      },
      {
        question: "I'm not technical—is this service for me?",
        answer:
          "Yes. We handle all technical aspects. You just need to provide access and basic business information.",
      },
      {
        question: "How long until I see results?",
        answer:
          "Most Squarespace sites see measurable AI visibility improvements within 6-8 weeks of optimization.",
      },
    ],
    keywords: [
      "Squarespace AI visibility",
      "Squarespace ChatGPT optimization",
      "Squarespace AI search",
      "Squarespace site AI",
    ],
  },
  {
    slug: "klaviyo",
    name: "Klaviyo",
    category: "marketing",
    headline: "AI Search Visibility for Klaviyo Users",
    description:
      "Extend your Klaviyo-powered marketing to AI search. We help e-commerce brands using Klaviyo ensure customers find them through ChatGPT, Claude, and Perplexity.",
    platformContext:
      "Klaviyo is the leading marketing automation platform for e-commerce, powering sophisticated email and SMS marketing for online brands. Klaviyo users typically have strong marketing operations with customer data, segmentation, and automated flows already in place. However, Klaviyo's strength is in owned channels—email and SMS—while AI search represents a new discovery channel. For Klaviyo users, AI visibility optimization extends their marketing reach to capture new customers who are researching via AI, then nurturing them through existing Klaviyo flows.",
    whyAIMatters:
      "Klaviyo helps you convert and retain customers, but first you need to reach them. AI is increasingly where customers discover new products and brands—before they're on your email list. AI visibility brings new potential customers into your funnel, where Klaviyo's powerful marketing automation can take over. For e-commerce brands using Klaviyo, AI visibility is the top-of-funnel complement to Klaviyo's mid and bottom-of-funnel strength.",
    useCases: [
      {
        title: "Customer Acquisition",
        description:
          "Get discovered by new customers through AI product recommendations",
        benefit:
          "Grow your email list with AI-acquired customers",
      },
      {
        title: "Product Discovery",
        description:
          "Ensure products appear when AI recommends items in your category",
        benefit:
          "Drive first purchases from AI-referred traffic",
      },
      {
        title: "Brand Visibility",
        description:
          "Build brand awareness through AI recommendations",
        benefit:
          "Reach customers before competitors capture their attention",
      },
      {
        title: "Klaviyo Flow Integration",
        description:
          "Connect AI-acquired customers to relevant Klaviyo flows",
        benefit:
          "Nurture AI-referred customers with automated marketing",
      },
      {
        title: "Full-Funnel Optimization",
        description:
          "Combine AI visibility with Klaviyo for complete customer journey",
        benefit:
          "Unified acquisition through retention strategy",
      },
    ],
    optimizationTips: [
      {
        tip: "Align AI messaging with Klaviyo campaigns",
        explanation:
          "Ensure consistent messaging between AI visibility and your Klaviyo marketing for cohesive experience.",
      },
      {
        tip: "Track AI-acquired customers in Klaviyo",
        explanation:
          "Set up tracking to identify and segment AI-referred customers for tailored nurturing.",
      },
      {
        tip: "Leverage Klaviyo data for AI optimization",
        explanation:
          "Use customer insights from Klaviyo to inform AI visibility targeting and messaging.",
      },
      {
        tip: "Connect discovery to conversion",
        explanation:
          "Design flows that specifically nurture AI-acquired customers based on their discovery context.",
      },
    ],
    commonQueries: [
      "Best [product category]",
      "[Product] for [specific need]",
      "Where to buy [product]",
      "[Brand] alternatives",
      "Recommended [product type]",
    ],
    relevantIndustry: "ecommerce",
    faqs: [
      {
        question: "How does AI visibility work with Klaviyo?",
        answer:
          "AI visibility brings new customers to your store; Klaviyo nurtures them. We help connect the two for cohesive full-funnel marketing.",
      },
      {
        question: "Can you track AI customers in Klaviyo?",
        answer:
          "Yes. We help you set up tracking so AI-referred customers are identified in Klaviyo for segmented nurturing.",
      },
      {
        question: "How do you coordinate with our Klaviyo agency?",
        answer:
          "We focus on AI visibility while your Klaviyo agency handles email/SMS. We coordinate to ensure consistent strategy.",
      },
      {
        question: "Does this help with Klaviyo list growth?",
        answer:
          "Absolutely. AI visibility drives new traffic and customers who can then join your Klaviyo list.",
      },
      {
        question: "What e-commerce platforms do you support alongside Klaviyo?",
        answer:
          "We work with Shopify, BigCommerce, WooCommerce, and other platforms that integrate with Klaviyo.",
      },
    ],
    keywords: [
      "Klaviyo AI visibility",
      "Klaviyo AI marketing",
      "Klaviyo ChatGPT optimization",
      "e-commerce AI visibility",
    ],
  },
  {
    slug: "mailchimp",
    name: "Mailchimp",
    category: "marketing",
    headline: "AI Search Visibility for Mailchimp Users",
    description:
      "Extend your Mailchimp marketing to AI search. We help businesses using Mailchimp get discovered through ChatGPT, Claude, and Perplexity.",
    platformContext:
      "Mailchimp is one of the world's most popular marketing platforms, serving millions of businesses with email marketing, automation, and basic CRM functionality. Mailchimp users range from small businesses to mid-market companies, often managing marketing with small teams or as sole proprietors. While Mailchimp excels at nurturing existing contacts, AI visibility addresses a gap: reaching new customers who are researching via AI. For Mailchimp users, AI visibility optimization extends their marketing reach to capture new prospects before competitors do.",
    whyAIMatters:
      "Mailchimp helps you market to contacts you already have, but AI is where new customers increasingly start their journey. When someone asks an AI assistant for recommendations in your category, you want to be in that conversation. AI visibility brings new prospects into your funnel, where Mailchimp can nurture them into customers. For small businesses using Mailchimp, this creates a complete marketing stack: AI for discovery, Mailchimp for conversion.",
    useCases: [
      {
        title: "New Customer Discovery",
        description:
          "Get discovered by prospects researching via AI",
        benefit:
          "Grow your audience beyond existing contacts",
      },
      {
        title: "Lead Generation",
        description:
          "Capture leads from AI-referred traffic",
        benefit:
          "Build your Mailchimp list with qualified prospects",
      },
      {
        title: "Service Visibility",
        description:
          "Appear when AI recommends services in your category",
        benefit:
          "Win clients who research service providers via AI",
      },
      {
        title: "Local Business Discovery",
        description:
          "Get recommended in AI local business queries",
        benefit:
          "Capture local customers researching via AI",
      },
      {
        title: "Mailchimp Integration",
        description:
          "Connect AI-acquired leads to Mailchimp automation",
        benefit:
          "Nurture AI leads with automated email sequences",
      },
    ],
    optimizationTips: [
      {
        tip: "Align AI messaging with Mailchimp campaigns",
        explanation:
          "Ensure consistent messaging between AI visibility and your Mailchimp marketing.",
      },
      {
        tip: "Track AI leads in Mailchimp",
        explanation:
          "Tag AI-referred contacts in Mailchimp for segmented nurturing campaigns.",
      },
      {
        tip: "Use Mailchimp landing pages for AI traffic",
        explanation:
          "Create landing pages optimized for AI-referred visitors to maximize conversion.",
      },
      {
        tip: "Build email capture from AI traffic",
        explanation:
          "Convert AI-driven website visitors into Mailchimp subscribers with strategic capture.",
      },
    ],
    commonQueries: [
      "Best [service] near me",
      "[Service type] for small business",
      "Recommended [business type]",
      "[Product/service] reviews",
      "Affordable [service]",
    ],
    relevantIndustry: "saas",
    faqs: [
      {
        question: "How does AI visibility complement Mailchimp?",
        answer:
          "AI visibility drives discovery of new prospects; Mailchimp nurtures them. Together, they create a complete marketing funnel.",
      },
      {
        question: "I'm a small business—is this affordable?",
        answer:
          "Yes. We have packages designed for small businesses using Mailchimp, with pricing that fits smaller marketing budgets.",
      },
      {
        question: "Can you help me grow my Mailchimp list?",
        answer:
          "Absolutely. AI visibility drives new traffic to your site, which we help convert into Mailchimp subscribers.",
      },
      {
        question: "Do you integrate with Mailchimp?",
        answer:
          "We help you set up tracking so you can identify and segment AI-referred contacts in Mailchimp.",
      },
      {
        question: "What types of businesses do you help?",
        answer:
          "We help any business using Mailchimp—service providers, e-commerce, local businesses, consultants, and more.",
      },
    ],
    keywords: [
      "Mailchimp AI visibility",
      "Mailchimp AI marketing",
      "Mailchimp ChatGPT optimization",
      "small business AI visibility",
    ],
  },
];

/**
 * Get all integrations for static generation
 */
export function getAllIntegrations(): Integration[] {
  return integrations;
}

/**
 * Get a specific integration by slug
 */
export function getIntegrationBySlug(slug: string): Integration | undefined {
  return integrations.find((i) => i.slug === slug);
}

/**
 * Get all integration slugs for generateStaticParams
 */
export function getAllIntegrationSlugs(): string[] {
  return integrations.map((i) => i.slug);
}

/**
 * Get integrations by category
 */
export function getIntegrationsByCategory(
  category: Integration["category"]
): Integration[] {
  return integrations.filter((i) => i.category === category);
}
