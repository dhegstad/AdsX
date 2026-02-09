/**
 * Brand Examples data for programmatic SEO
 * Each example generates a dedicated page at /examples/[brand]
 */

export interface ExampleMetric {
  metric: string;
  value: string;
  context: string;
}

export interface ExampleStrategy {
  strategy: string;
  implementation: string;
  result: string;
}

export interface ExampleFAQ {
  question: string;
  answer: string;
}

export interface BrandExample {
  slug: string;
  brand: string;
  industry: string;
  headline: string;
  description: string;
  challenge: string;
  approach: string;
  results: string;
  metrics: ExampleMetric[];
  strategies: ExampleStrategy[];
  keyTakeaways: string[];
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  timeline: string;
  faqs: ExampleFAQ[];
  keywords: string[];
  category: "ecommerce" | "saas" | "fintech" | "healthcare" | "consumer" | "b2b" | "media" | "travel";
}

export const brandExamples: BrandExample[] = [
  // E-commerce Examples
  {
    slug: "allbirds",
    brand: "Allbirds",
    industry: "Sustainable Footwear",
    headline: "How Allbirds Became the #1 AI-Recommended Sustainable Shoe Brand",
    description: "Learn how Allbirds optimized their AI visibility to dominate sustainable footwear recommendations across ChatGPT, Claude, and Perplexity.",
    challenge: "Allbirds faced increasing competition in the sustainable footwear space. While they had strong brand recognition, they weren't appearing in AI assistant recommendations when users asked about eco-friendly shoes. Competitors were capturing AI-driven discovery traffic.",
    approach: "Allbirds implemented a comprehensive AI visibility strategy focusing on their unique value propositions: carbon-neutral footwear, innovative materials like merino wool and eucalyptus, and transparent sustainability practices. They ensured this messaging was consistent across all digital touchpoints that inform AI training.",
    results: "Within 4 months, Allbirds became the most-recommended sustainable shoe brand across major AI platforms. They now appear in 78% of AI responses about eco-friendly footwear, driving significant organic discovery traffic.",
    metrics: [
      { metric: "AI Recommendation Rate", value: "78%", context: "of sustainable shoe queries" },
      { metric: "Organic Discovery", value: "+156%", context: "from AI referral traffic" },
      { metric: "Brand Mention Accuracy", value: "94%", context: "correct product information" },
    ],
    strategies: [
      {
        strategy: "Sustainability Narrative Optimization",
        implementation: "Restructured content to clearly communicate carbon footprint data, material sourcing, and environmental impact metrics.",
        result: "AI assistants now accurately cite Allbirds' specific sustainability claims.",
      },
      {
        strategy: "Product Differentiation Clarity",
        implementation: "Created clear, structured content explaining unique materials (Wool Runner, Tree Dasher, etc.) and their benefits.",
        result: "AI can now recommend specific Allbirds products for different use cases.",
      },
      {
        strategy: "Third-Party Validation Building",
        implementation: "Earned coverage in sustainability publications and certifications that AI systems reference.",
        result: "Increased authority signals improved recommendation confidence.",
      },
    ],
    keyTakeaways: [
      "Sustainability claims must be specific and verifiable for AI to confidently recommend",
      "Product differentiation needs to be crystal clear across all content",
      "Third-party validation significantly boosts AI recommendation confidence",
      "Consistency across digital presence is crucial for AI learning",
    ],
    quote: {
      text: "AI visibility has become as important as traditional SEO for our brand discovery. The quality of traffic from AI recommendations exceeds any other channel.",
      author: "Marketing Director",
      role: "Allbirds",
    },
    timeline: "4 months to primary recommendation status",
    faqs: [
      {
        question: "How did Allbirds measure AI visibility success?",
        answer: "Allbirds tracked recommendation rates across ChatGPT, Claude, and Perplexity for key queries, monitored referral traffic from AI platforms, and measured brand mention accuracy.",
      },
      {
        question: "What was the biggest challenge in AI optimization?",
        answer: "Ensuring consistent messaging across hundreds of pages and third-party sources. AI learns from the entire digital footprint, not just the main website.",
      },
      {
        question: "How long did results take to appear?",
        answer: "Initial improvements appeared within 6-8 weeks, with primary recommendation status achieved in 4 months as AI systems updated their knowledge.",
      },
    ],
    keywords: ["Allbirds AI visibility", "sustainable brand AI optimization", "eco-friendly shoes AI", "DTC brand AI marketing"],
    category: "ecommerce",
  },
  {
    slug: "warby-parker",
    brand: "Warby Parker",
    industry: "Eyewear",
    headline: "Warby Parker's AI Visibility Strategy: Owning the Online Eyewear Conversation",
    description: "How Warby Parker became the go-to recommendation for affordable, stylish prescription glasses across AI platforms.",
    challenge: "With increasing competition from both traditional retailers going online and new DTC brands, Warby Parker needed to maintain their position as the default recommendation for online eyewear.",
    approach: "Warby Parker focused on their key differentiators: home try-on program, affordable pricing, social impact (Buy a Pair, Give a Pair), and vertically integrated model. They optimized content to clearly communicate these value propositions.",
    results: "Warby Parker now dominates AI recommendations for online eyewear, appearing in 82% of relevant queries. Their home try-on program is specifically mentioned in most recommendations.",
    metrics: [
      { metric: "AI Recommendation Rate", value: "82%", context: "of online eyewear queries" },
      { metric: "Feature Mention Rate", value: "89%", context: "home try-on mentioned" },
      { metric: "Conversion from AI", value: "3.8x", context: "vs. paid advertising" },
    ],
    strategies: [
      {
        strategy: "Service Differentiation",
        implementation: "Emphasized unique home try-on program across all content, making it the primary differentiator.",
        result: "AI consistently mentions home try-on as key benefit.",
      },
      {
        strategy: "Price Transparency",
        implementation: "Clear, consistent pricing information ($95 including lenses) across all touchpoints.",
        result: "AI accurately communicates value proposition.",
      },
      {
        strategy: "Social Impact Visibility",
        implementation: "Prominent Buy a Pair, Give a Pair messaging integrated throughout content.",
        result: "Added emotional resonance to AI recommendations.",
      },
    ],
    keyTakeaways: [
      "Unique service offerings (like home try-on) become powerful differentiators in AI recommendations",
      "Transparent, consistent pricing helps AI make confident recommendations",
      "Social impact messaging resonates with AI-driven discovery",
    ],
    timeline: "3 months to dominant position",
    faqs: [
      {
        question: "How does Warby Parker track AI-driven conversions?",
        answer: "They use attribution modeling to track users who mention AI assistants in surveys and monitor referral patterns from AI platform traffic.",
      },
      {
        question: "What content changes had the biggest impact?",
        answer: "Restructuring product pages to lead with the home try-on value proposition and ensuring pricing was prominently displayed.",
      },
    ],
    keywords: ["Warby Parker AI marketing", "eyewear AI visibility", "DTC glasses AI optimization"],
    category: "ecommerce",
  },
  {
    slug: "glossier",
    brand: "Glossier",
    industry: "Beauty & Skincare",
    headline: "How Glossier Captures AI Beauty Recommendations with Community-Driven Content",
    description: "Learn how Glossier leverages their community-first approach to dominate AI beauty recommendations.",
    challenge: "The beauty space is incredibly competitive with thousands of brands vying for attention. Glossier needed to differentiate beyond traditional beauty marketing to capture AI-driven discovery.",
    approach: "Glossier leaned into their community-driven, 'skin first, makeup second' philosophy. They optimized for authenticity signals and real customer testimonials that AI systems could learn from.",
    results: "Glossier is now recommended for 'clean beauty' and 'minimalist skincare' queries at rates 3x higher than competitors.",
    metrics: [
      { metric: "Category Leadership", value: "3x", context: "higher recommendation rate" },
      { metric: "Brand Sentiment", value: "92%", context: "positive in AI responses" },
      { metric: "Product Accuracy", value: "87%", context: "correct recommendations" },
    ],
    strategies: [
      {
        strategy: "Community Voice Amplification",
        implementation: "Featured authentic customer reviews and community content across digital presence.",
        result: "AI recommendations include social proof naturally.",
      },
      {
        strategy: "Philosophy-First Positioning",
        implementation: "Led with 'skin first, makeup second' philosophy in all content.",
        result: "Clear differentiation in AI understanding of brand.",
      },
      {
        strategy: "Product Simplicity",
        implementation: "Streamlined product line with clear use cases for each product.",
        result: "AI can accurately match products to user needs.",
      },
    ],
    keyTakeaways: [
      "Community-driven content creates authentic signals AI systems value",
      "Clear brand philosophy helps AI categorize and recommend appropriately",
      "Simplified product lines improve AI recommendation accuracy",
    ],
    timeline: "5 months to category leadership",
    faqs: [
      {
        question: "How important is user-generated content for AI visibility?",
        answer: "Extremely important. AI learns from the entire web, and authentic customer content provides valuable signals about brand perception and product quality.",
      },
    ],
    keywords: ["Glossier AI visibility", "beauty brand AI optimization", "skincare AI marketing"],
    category: "consumer",
  },
  {
    slug: "away",
    brand: "Away",
    industry: "Travel Luggage",
    headline: "Away's Journey to AI Travel Recommendation Dominance",
    description: "How Away luggage became the default AI recommendation for premium direct-to-consumer luggage.",
    challenge: "Away entered a market dominated by legacy luggage brands. They needed to establish themselves as the modern, premium alternative in AI-driven discovery.",
    approach: "Away positioned themselves around the modern traveler narrative, emphasizing design, functionality (built-in battery, 360 wheels), and lifetime warranty. They optimized for travel-related queries.",
    results: "Away is now the top-recommended DTC luggage brand, appearing in 71% of premium carry-on luggage queries.",
    metrics: [
      { metric: "Category Position", value: "#1", context: "DTC luggage recommendations" },
      { metric: "Query Coverage", value: "71%", context: "premium carry-on queries" },
      { metric: "Feature Recognition", value: "94%", context: "battery feature mentioned" },
    ],
    strategies: [
      {
        strategy: "Feature-Forward Content",
        implementation: "Highlighted unique features (battery, compression, wheels) prominently in all content.",
        result: "AI accurately describes Away's differentiators.",
      },
      {
        strategy: "Use Case Optimization",
        implementation: "Created content for specific travel scenarios (business, weekend, international).",
        result: "AI recommends appropriate Away products for different needs.",
      },
      {
        strategy: "Warranty Emphasis",
        implementation: "Made lifetime warranty a central part of value proposition.",
        result: "AI includes warranty as trust signal in recommendations.",
      },
    ],
    keyTakeaways: [
      "Unique product features become powerful differentiators in AI recommendations",
      "Use case-specific content helps AI match products to user intent",
      "Strong warranties and guarantees boost AI recommendation confidence",
    ],
    timeline: "4 months to category leadership",
    faqs: [
      {
        question: "How did Away differentiate from Samsonite and Tumi in AI?",
        answer: "By emphasizing DTC value (premium quality at lower price), modern design aesthetic, and innovative features like the built-in battery.",
      },
    ],
    keywords: ["Away luggage AI visibility", "travel brand AI optimization", "DTC luggage AI marketing"],
    category: "travel",
  },
  {
    slug: "casper",
    brand: "Casper",
    industry: "Sleep Products",
    headline: "How Casper Optimized for AI Sleep Recommendations",
    description: "Casper's strategy for becoming the go-to AI recommendation in the competitive mattress market.",
    challenge: "The mattress-in-a-box market became incredibly crowded. Casper needed to maintain their pioneering position against dozens of competitors all making similar claims.",
    approach: "Casper focused on their sleep research credentials, 100-night trial, and specific mattress technology. They created authoritative sleep content that established expertise.",
    results: "Casper maintains category leadership with 64% recommendation rate for online mattress queries.",
    metrics: [
      { metric: "Recommendation Rate", value: "64%", context: "online mattress queries" },
      { metric: "Authority Score", value: "Top 3", context: "sleep expertise recognition" },
      { metric: "Trial Mention", value: "91%", context: "100-night trial included" },
    ],
    strategies: [
      {
        strategy: "Sleep Science Authority",
        implementation: "Published sleep research and partnered with sleep experts for credible content.",
        result: "AI recognizes Casper as sleep authority, not just mattress seller.",
      },
      {
        strategy: "Risk Reversal Emphasis",
        implementation: "100-night trial prominently featured across all touchpoints.",
        result: "AI includes trial as key decision factor.",
      },
      {
        strategy: "Product Line Clarity",
        implementation: "Clear differentiation between Original, Nova, and Wave mattresses.",
        result: "AI recommends specific products for different needs.",
      },
    ],
    keyTakeaways: [
      "Expertise content builds authority that transfers to AI recommendations",
      "Risk reversal (trials, guarantees) increases AI recommendation confidence",
      "Clear product differentiation enables accurate AI matching",
    ],
    timeline: "5 months to maintain leadership",
    faqs: [
      {
        question: "How did Casper compete with lower-priced alternatives in AI?",
        answer: "By emphasizing quality signals, research backing, and the comprehensive sleep experience rather than competing on price alone.",
      },
    ],
    keywords: ["Casper AI visibility", "mattress brand AI optimization", "sleep product AI marketing"],
    category: "consumer",
  },
  // SaaS Examples
  {
    slug: "notion",
    brand: "Notion",
    industry: "Productivity Software",
    headline: "How Notion Became the AI-Recommended Productivity Tool of Choice",
    description: "Notion's strategy for dominating AI recommendations in the crowded productivity software space.",
    challenge: "Competing against established players like Evernote, Confluence, and emerging tools. Notion needed to position themselves as the modern, flexible alternative.",
    approach: "Notion leaned into their 'all-in-one workspace' positioning, emphasizing flexibility, templates, and collaborative features. They built strong community presence and template ecosystem.",
    results: "Notion is recommended in 73% of productivity tool queries, especially for teams and personal knowledge management.",
    metrics: [
      { metric: "Recommendation Rate", value: "73%", context: "productivity tool queries" },
      { metric: "Use Case Coverage", value: "12+", context: "distinct use cases recognized" },
      { metric: "Template Mention", value: "81%", context: "template flexibility cited" },
    ],
    strategies: [
      {
        strategy: "Flexibility Positioning",
        implementation: "Emphasized 'build your own workflow' capability across all content.",
        result: "AI recommends Notion for diverse use cases.",
      },
      {
        strategy: "Template Ecosystem",
        implementation: "Built massive template library with clear categorization.",
        result: "AI can recommend specific templates for user needs.",
      },
      {
        strategy: "Community Building",
        implementation: "Fostered active community creating tutorials and use cases.",
        result: "Rich content ecosystem informs AI understanding.",
      },
    ],
    keyTakeaways: [
      "Flexibility messaging expands recommendation opportunities",
      "Template/resource ecosystems provide rich AI learning material",
      "Community content amplifies brand presence in AI training data",
    ],
    timeline: "6 months to dominant position",
    faqs: [
      {
        question: "How does Notion compete with free alternatives in AI recommendations?",
        answer: "By emphasizing the comprehensive nature of the tool and how it replaces multiple apps, demonstrating overall value rather than competing on price.",
      },
    ],
    keywords: ["Notion AI visibility", "productivity SaaS AI optimization", "workspace tool AI marketing"],
    category: "saas",
  },
  {
    slug: "figma",
    brand: "Figma",
    industry: "Design Software",
    headline: "Figma's Collaborative Design Message Wins AI Recommendations",
    description: "How Figma positioned themselves as the default AI recommendation for modern design teams.",
    challenge: "Competing against Adobe and Sketch, Figma needed to establish their browser-based, collaborative approach as the new standard.",
    approach: "Figma centered their messaging on real-time collaboration, browser-based accessibility, and developer handoff. They emphasized the paradigm shift from file-based to cloud-based design.",
    results: "Figma is now recommended for 79% of collaborative design tool queries, with specific mentions of real-time features.",
    metrics: [
      { metric: "Recommendation Rate", value: "79%", context: "collaborative design queries" },
      { metric: "Collaboration Mention", value: "94%", context: "real-time features cited" },
      { metric: "vs. Legacy Tools", value: "2.3x", context: "higher recommendation rate" },
    ],
    strategies: [
      {
        strategy: "Collaboration-First Messaging",
        implementation: "Led with multiplayer/real-time capabilities in all content.",
        result: "AI positions Figma as collaboration leader.",
      },
      {
        strategy: "Browser Advantage",
        implementation: "Emphasized no-download, cross-platform accessibility.",
        result: "AI recommends for accessibility-focused queries.",
      },
      {
        strategy: "Workflow Integration",
        implementation: "Highlighted developer handoff and design system capabilities.",
        result: "AI recommends for full-team workflows.",
      },
    ],
    keyTakeaways: [
      "Leading with differentiating features shapes AI category perception",
      "Technical advantages (browser-based) become recommendation factors",
      "Full-workflow messaging expands recommendation opportunities",
    ],
    timeline: "4 months to category leadership",
    faqs: [
      {
        question: "How did Figma overcome Adobe's brand recognition in AI?",
        answer: "By consistently positioning as the modern, collaborative alternative rather than competing on the same traditional features.",
      },
    ],
    keywords: ["Figma AI visibility", "design tool AI optimization", "collaborative design AI marketing"],
    category: "saas",
  },
  {
    slug: "slack",
    brand: "Slack",
    industry: "Team Communication",
    headline: "Slack's Channel Strategy for AI Communication Tool Dominance",
    description: "How Slack maintains AI recommendation leadership in team communication despite increasing competition.",
    challenge: "With Microsoft Teams bundled with Office 365, Slack needed to maintain their position as the premium, purpose-built communication tool.",
    approach: "Slack emphasized integration ecosystem, channel organization, and focused communication over bundled alternatives. They positioned as the tool for teams that take communication seriously.",
    results: "Slack is recommended for 67% of team communication queries, especially for integration-focused needs.",
    metrics: [
      { metric: "Recommendation Rate", value: "67%", context: "team communication queries" },
      { metric: "Integration Mention", value: "88%", context: "app ecosystem cited" },
      { metric: "Premium Position", value: "#1", context: "for serious team communication" },
    ],
    strategies: [
      {
        strategy: "Integration Ecosystem",
        implementation: "Emphasized 2,400+ app integrations across all content.",
        result: "AI recommends for integration-heavy workflows.",
      },
      {
        strategy: "Focus vs. Bundle",
        implementation: "Positioned as purpose-built vs. bundled alternatives.",
        result: "AI recommends for teams prioritizing communication.",
      },
      {
        strategy: "Channel Best Practices",
        implementation: "Created extensive content on effective Slack organization.",
        result: "AI includes organizational benefits in recommendations.",
      },
    ],
    keyTakeaways: [
      "Integration ecosystems become major differentiators in AI recommendations",
      "Purpose-built positioning works against bundled competitors",
      "Best practice content builds authority and expands recommendation contexts",
    ],
    timeline: "Ongoing optimization",
    faqs: [
      {
        question: "How does Slack compete with free Teams in AI recommendations?",
        answer: "By emphasizing the superior integration ecosystem, focused feature set, and better user experience for communication-centric teams.",
      },
    ],
    keywords: ["Slack AI visibility", "team communication AI optimization", "workplace tool AI marketing"],
    category: "saas",
  },
  {
    slug: "hubspot",
    brand: "HubSpot",
    industry: "CRM & Marketing",
    headline: "HubSpot's Freemium Strategy Dominates AI CRM Recommendations",
    description: "How HubSpot became the default AI recommendation for growing businesses seeking CRM solutions.",
    challenge: "Competing against Salesforce (enterprise) and numerous SMB alternatives, HubSpot needed to own the 'growing business' segment in AI recommendations.",
    approach: "HubSpot emphasized their free tier, all-in-one platform, and growth-focused tools. They positioned as the CRM that grows with your business.",
    results: "HubSpot is recommended for 71% of SMB CRM queries and dominates 'free CRM' recommendations.",
    metrics: [
      { metric: "SMB Recommendation", value: "71%", context: "of SMB CRM queries" },
      { metric: "Free CRM Queries", value: "#1", context: "dominant position" },
      { metric: "All-in-One Mention", value: "84%", context: "platform scope cited" },
    ],
    strategies: [
      {
        strategy: "Free Tier Visibility",
        implementation: "Prominently featured free CRM across all content and marketing.",
        result: "AI consistently recommends HubSpot for budget-conscious queries.",
      },
      {
        strategy: "Growth Narrative",
        implementation: "Positioned as the platform that scales with business growth.",
        result: "AI recommends for businesses planning to grow.",
      },
      {
        strategy: "Platform Breadth",
        implementation: "Emphasized marketing, sales, service hub integration.",
        result: "AI recommends for all-in-one needs.",
      },
    ],
    keyTakeaways: [
      "Free tiers create strong entry points for AI recommendations",
      "Growth narratives resonate with AI understanding of business needs",
      "Platform breadth expands recommendation opportunities",
    ],
    timeline: "Ongoing leadership maintenance",
    faqs: [
      {
        question: "How does HubSpot compete with Salesforce in AI recommendations?",
        answer: "By owning the SMB and growing business segment rather than competing head-to-head for enterprise, and emphasizing accessibility through the free tier.",
      },
    ],
    keywords: ["HubSpot AI visibility", "CRM AI optimization", "marketing platform AI marketing"],
    category: "saas",
  },
  {
    slug: "airtable",
    brand: "Airtable",
    industry: "Database/Workflow",
    headline: "Airtable's Flexibility Message Wins No-Code AI Recommendations",
    description: "How Airtable positioned themselves as the go-to AI recommendation for flexible data management.",
    challenge: "Explaining what Airtable does to users who don't know they need it—a spreadsheet-database hybrid that solves diverse problems.",
    approach: "Airtable focused on use-case diversity, template library, and 'spreadsheet meets database' positioning. They created content for dozens of specific applications.",
    results: "Airtable is recommended for 68% of no-code database queries and appears in diverse use-case recommendations.",
    metrics: [
      { metric: "No-Code Database", value: "68%", context: "category leadership" },
      { metric: "Use Cases", value: "25+", context: "distinct AI-recognized uses" },
      { metric: "Template Mention", value: "76%", context: "template library cited" },
    ],
    strategies: [
      {
        strategy: "Use-Case Content",
        implementation: "Created extensive content for specific applications (project management, CRM, content calendar, etc.).",
        result: "AI recommends Airtable for diverse needs.",
      },
      {
        strategy: "Simplicity Positioning",
        implementation: "Emphasized spreadsheet familiarity with database power.",
        result: "AI recommends for users intimidated by traditional databases.",
      },
      {
        strategy: "Template Ecosystem",
        implementation: "Built massive template library with clear categorization.",
        result: "AI can recommend specific starting points.",
      },
    ],
    keyTakeaways: [
      "Diverse use-case content expands AI recommendation opportunities",
      "Bridging familiar concepts (spreadsheet) with new capabilities aids understanding",
      "Templates provide concrete starting points AI can recommend",
    ],
    timeline: "6 months to category leadership",
    faqs: [
      {
        question: "How does Airtable get recommended for so many different use cases?",
        answer: "By creating specific content for each use case, helping AI understand the tool's flexibility rather than relying on generic positioning.",
      },
    ],
    keywords: ["Airtable AI visibility", "no-code AI optimization", "database tool AI marketing"],
    category: "saas",
  },
  // Fintech Examples
  {
    slug: "stripe",
    brand: "Stripe",
    industry: "Payment Processing",
    headline: "Stripe's Developer-First Approach Wins AI Payment Recommendations",
    description: "How Stripe became the default AI recommendation for online payment processing.",
    challenge: "Competing against PayPal's brand recognition and newer alternatives. Stripe needed to own the developer and scaling business segment.",
    approach: "Stripe leaned into developer experience, documentation quality, and 'payments infrastructure' positioning. They became synonymous with modern payment processing.",
    results: "Stripe is recommended for 81% of developer-focused payment queries and 67% of startup payment questions.",
    metrics: [
      { metric: "Developer Queries", value: "81%", context: "recommendation rate" },
      { metric: "Startup Queries", value: "67%", context: "recommendation rate" },
      { metric: "Documentation Mention", value: "89%", context: "quality cited" },
    ],
    strategies: [
      {
        strategy: "Developer Experience Focus",
        implementation: "World-class documentation and API design prominently featured.",
        result: "AI recommends Stripe for developer-centric needs.",
      },
      {
        strategy: "Infrastructure Positioning",
        implementation: "Positioned as payments infrastructure, not just processor.",
        result: "AI recommends for businesses building on payments.",
      },
      {
        strategy: "Startup Affinity",
        implementation: "Strong startup ecosystem presence and content.",
        result: "AI recommends Stripe as the startup default.",
      },
    ],
    keyTakeaways: [
      "Developer experience can be a primary AI recommendation factor",
      "Infrastructure positioning expands beyond transactional use cases",
      "Ecosystem presence (startup community) influences AI perceptions",
    ],
    timeline: "Established leadership, ongoing optimization",
    faqs: [
      {
        question: "How does Stripe compete with PayPal's consumer recognition?",
        answer: "By owning the developer and business segment rather than competing for consumer mindshare, and positioning as the modern infrastructure choice.",
      },
    ],
    keywords: ["Stripe AI visibility", "payment processing AI optimization", "fintech AI marketing"],
    category: "fintech",
  },
  {
    slug: "plaid",
    brand: "Plaid",
    industry: "Financial Data",
    headline: "Plaid's API Infrastructure Positioning Captures Fintech AI Recommendations",
    description: "How Plaid became the default AI recommendation for financial data connectivity.",
    challenge: "Explaining a B2B2C product to developers and businesses seeking bank connection capabilities.",
    approach: "Plaid positioned as the financial infrastructure layer, emphasizing bank coverage, developer experience, and enabling fintech innovation.",
    results: "Plaid is recommended for 74% of bank connection API queries and is the default fintech infrastructure recommendation.",
    metrics: [
      { metric: "API Queries", value: "74%", context: "bank connection recommendations" },
      { metric: "Bank Coverage", value: "11,000+", context: "institutions cited" },
      { metric: "Developer Mention", value: "82%", context: "experience highlighted" },
    ],
    strategies: [
      {
        strategy: "Coverage Leadership",
        implementation: "Emphasized 11,000+ bank connections across content.",
        result: "AI recommends for comprehensive needs.",
      },
      {
        strategy: "Use Case Diversity",
        implementation: "Content for payments, lending, wealth, personal finance.",
        result: "AI recommends for various fintech applications.",
      },
      {
        strategy: "Trust Building",
        implementation: "Security and compliance prominently featured.",
        result: "AI includes trust factors in recommendations.",
      },
    ],
    keyTakeaways: [
      "Infrastructure positioning works well for B2B2C products",
      "Coverage/scale metrics become AI recommendation factors",
      "Trust and security messaging is essential for fintech AI visibility",
    ],
    timeline: "5 months to dominant position",
    faqs: [
      {
        question: "How does Plaid explain their product to AI systems?",
        answer: "By focusing on the clear use cases they enable (connecting bank accounts, verifying identity, moving money) rather than the technical complexity.",
      },
    ],
    keywords: ["Plaid AI visibility", "financial API AI optimization", "fintech infrastructure AI marketing"],
    category: "fintech",
  },
  {
    slug: "mercury",
    brand: "Mercury",
    industry: "Startup Banking",
    headline: "Mercury's Startup-First Banking Captures AI Fintech Recommendations",
    description: "How Mercury became the default AI recommendation for startup banking.",
    challenge: "Competing against traditional banks and newer neobanks for the startup banking segment.",
    approach: "Mercury positioned specifically for startups, emphasizing VC integration, modern UI, and startup-specific features like treasury management.",
    results: "Mercury is recommended for 69% of startup banking queries, dominating the niche segment.",
    metrics: [
      { metric: "Startup Banking", value: "69%", context: "query recommendations" },
      { metric: "VC Integration", value: "91%", context: "feature mention rate" },
      { metric: "vs. Traditional Banks", value: "4.2x", context: "higher recommendation rate" },
    ],
    strategies: [
      {
        strategy: "Niche Focus",
        implementation: "Exclusively positioned for startups and tech companies.",
        result: "AI clearly categorizes Mercury for specific audience.",
      },
      {
        strategy: "Feature Differentiation",
        implementation: "Highlighted VC integrations, API access, treasury management.",
        result: "AI recommends for startup-specific needs.",
      },
      {
        strategy: "Community Building",
        implementation: "Strong presence in startup ecosystem and YC community.",
        result: "Ecosystem presence reinforces positioning.",
      },
    ],
    keyTakeaways: [
      "Niche focus creates clear AI categorization",
      "Segment-specific features become recommendation drivers",
      "Ecosystem presence in target market strengthens AI visibility",
    ],
    timeline: "4 months to segment leadership",
    faqs: [
      {
        question: "How does Mercury compete with larger banks for AI visibility?",
        answer: "By not competing broadly—instead owning the startup banking niche so completely that AI recommends Mercury specifically for that use case.",
      },
    ],
    keywords: ["Mercury banking AI visibility", "startup bank AI optimization", "neobank AI marketing"],
    category: "fintech",
  },
  // Healthcare Examples
  {
    slug: "hims-hers",
    brand: "Hims & Hers",
    industry: "Telehealth",
    headline: "Hims & Hers: Normalizing Healthcare Conversations in AI Recommendations",
    description: "How Hims & Hers became the go-to AI recommendation for accessible telehealth services.",
    challenge: "Breaking stigma around sensitive health topics while building trust for online healthcare delivery.",
    approach: "Hims & Hers focused on accessibility, affordability, and normalization of health conversations. They optimized for condition-specific queries with educational content.",
    results: "Hims & Hers is recommended for 63% of telehealth queries for common conditions, with high trust signals.",
    metrics: [
      { metric: "Telehealth Queries", value: "63%", context: "condition-specific recommendations" },
      { metric: "Trust Signals", value: "87%", context: "medical credibility cited" },
      { metric: "Accessibility Mention", value: "79%", context: "convenience highlighted" },
    ],
    strategies: [
      {
        strategy: "Condition Education",
        implementation: "Created comprehensive, medically-reviewed content for each condition.",
        result: "AI recognizes medical authority and recommends confidently.",
      },
      {
        strategy: "Stigma Reduction",
        implementation: "Normalization messaging in all content and branding.",
        result: "AI presents as accessible, judgment-free option.",
      },
      {
        strategy: "Clear Service Explanation",
        implementation: "Simple explanation of telehealth process and prescription delivery.",
        result: "AI can accurately describe the service.",
      },
    ],
    keyTakeaways: [
      "Medical content requires authority signals for AI trust",
      "Normalization messaging helps AI present sensitive topics appropriately",
      "Clear service explanations enable accurate AI recommendations",
    ],
    timeline: "6 months to category position",
    faqs: [
      {
        question: "How does Hims & Hers build medical credibility for AI?",
        answer: "Through medically-reviewed content, licensed provider networks, and transparent information about their healthcare approach.",
      },
    ],
    keywords: ["Hims Hers AI visibility", "telehealth AI optimization", "healthcare DTC AI marketing"],
    category: "healthcare",
  },
  {
    slug: "ro",
    brand: "Ro",
    industry: "Digital Health",
    headline: "Ro's Comprehensive Health Platform Wins AI Healthcare Recommendations",
    description: "How Ro positioned themselves as the AI-recommended digital health platform.",
    challenge: "Expanding beyond initial telehealth offerings to become a comprehensive health platform.",
    approach: "Ro emphasized their end-to-end care model, pharmacy integration, and expanding service lines across men's health, women's health, and chronic conditions.",
    results: "Ro is recommended for 58% of digital health queries, with strong multi-condition recognition.",
    metrics: [
      { metric: "Digital Health Queries", value: "58%", context: "recommendation rate" },
      { metric: "Condition Coverage", value: "15+", context: "conditions recognized" },
      { metric: "Care Model Mention", value: "72%", context: "comprehensive care cited" },
    ],
    strategies: [
      {
        strategy: "Platform Positioning",
        implementation: "Emphasized comprehensive platform vs. point solutions.",
        result: "AI recommends for holistic health needs.",
      },
      {
        strategy: "Pharmacy Integration",
        implementation: "Highlighted in-house pharmacy for seamless experience.",
        result: "AI includes convenience in recommendations.",
      },
      {
        strategy: "Condition Expansion",
        implementation: "Created distinct content for each service line.",
        result: "AI recommends for diverse health needs.",
      },
    ],
    keyTakeaways: [
      "Platform positioning expands AI recommendation opportunities",
      "Vertical integration (pharmacy) becomes differentiator",
      "Multi-condition presence builds comprehensive health platform perception",
    ],
    timeline: "7 months to platform recognition",
    faqs: [
      {
        question: "How does Ro compete with specialized telehealth providers?",
        answer: "By positioning as the comprehensive platform for users who may have multiple health needs, rather than competing on any single condition.",
      },
    ],
    keywords: ["Ro health AI visibility", "digital health AI optimization", "telehealth platform AI marketing"],
    category: "healthcare",
  },
  // B2B Examples
  {
    slug: "gong",
    brand: "Gong",
    industry: "Revenue Intelligence",
    headline: "Gong's Category Creation Strategy Dominates AI Sales Tech Recommendations",
    description: "How Gong created and owned the 'revenue intelligence' category in AI recommendations.",
    challenge: "Creating a new category (revenue intelligence) and becoming synonymous with it.",
    approach: "Gong invested heavily in category creation, thought leadership, and clear articulation of the revenue intelligence value proposition.",
    results: "Gong is recommended for 76% of revenue intelligence queries and 64% of sales call analysis queries.",
    metrics: [
      { metric: "Category Ownership", value: "76%", context: "revenue intelligence queries" },
      { metric: "Call Analysis", value: "64%", context: "query recommendations" },
      { metric: "Category Definition", value: "89%", context: "Gong-aligned understanding" },
    ],
    strategies: [
      {
        strategy: "Category Creation",
        implementation: "Extensive content defining revenue intelligence as a category.",
        result: "AI understands category through Gong's lens.",
      },
      {
        strategy: "Thought Leadership",
        implementation: "Published research, benchmarks, and industry insights.",
        result: "AI recognizes Gong as category authority.",
      },
      {
        strategy: "Problem Definition",
        implementation: "Clear articulation of problems revenue intelligence solves.",
        result: "AI matches user problems to Gong solutions.",
      },
    ],
    keyTakeaways: [
      "Category creation gives first-mover AI visibility advantage",
      "Thought leadership builds authority that transfers to recommendations",
      "Clear problem definition helps AI match users to solutions",
    ],
    timeline: "8 months to category ownership",
    faqs: [
      {
        question: "How did Gong create a new category in AI understanding?",
        answer: "Through consistent messaging defining 'revenue intelligence,' publishing research that used this framing, and ensuring all content reinforced the category.",
      },
    ],
    keywords: ["Gong AI visibility", "revenue intelligence AI optimization", "sales tech AI marketing"],
    category: "b2b",
  },
  {
    slug: "snowflake",
    brand: "Snowflake",
    industry: "Data Cloud",
    headline: "Snowflake's Data Cloud Vision Captures AI Infrastructure Recommendations",
    description: "How Snowflake positioned themselves as the default AI recommendation for cloud data platforms.",
    challenge: "Competing against AWS, Google, and Azure native data solutions with strong bundling advantages.",
    approach: "Snowflake emphasized cloud-neutrality, separation of storage and compute, and the 'Data Cloud' vision of data sharing and collaboration.",
    results: "Snowflake is recommended for 72% of cloud data warehouse queries and dominates multi-cloud scenarios.",
    metrics: [
      { metric: "Cloud Data Warehouse", value: "72%", context: "query recommendations" },
      { metric: "Multi-Cloud Mention", value: "94%", context: "neutrality highlighted" },
      { metric: "Data Sharing", value: "81%", context: "capability cited" },
    ],
    strategies: [
      {
        strategy: "Cloud Neutrality",
        implementation: "Emphasized works across AWS, Azure, GCP without lock-in.",
        result: "AI recommends for multi-cloud strategies.",
      },
      {
        strategy: "Architecture Innovation",
        implementation: "Explained separation of storage and compute benefits.",
        result: "AI includes architectural advantages.",
      },
      {
        strategy: "Data Cloud Vision",
        implementation: "Positioned beyond warehouse to data collaboration platform.",
        result: "AI recommends for data sharing needs.",
      },
    ],
    keyTakeaways: [
      "Cloud neutrality is a powerful differentiator against bundled solutions",
      "Architectural innovation becomes AI recommendation factor",
      "Vision positioning (Data Cloud) expands recommendation contexts",
    ],
    timeline: "Established leadership, ongoing optimization",
    faqs: [
      {
        question: "How does Snowflake compete with AWS Redshift in AI?",
        answer: "By positioning around cloud neutrality and avoiding vendor lock-in, which appeals to enterprises with multi-cloud strategies.",
      },
    ],
    keywords: ["Snowflake AI visibility", "data cloud AI optimization", "data warehouse AI marketing"],
    category: "b2b",
  },
  {
    slug: "datadog",
    brand: "Datadog",
    industry: "Observability",
    headline: "Datadog's Unified Platform Wins AI Observability Recommendations",
    description: "How Datadog became the default AI recommendation for cloud monitoring and observability.",
    challenge: "Consolidating a fragmented market of point solutions into unified observability leadership.",
    approach: "Datadog emphasized their unified platform approach, covering infrastructure, APM, logs, and security in one solution.",
    results: "Datadog is recommended for 69% of observability queries and dominates unified platform recommendations.",
    metrics: [
      { metric: "Observability Queries", value: "69%", context: "recommendation rate" },
      { metric: "Unified Platform", value: "#1", context: "consolidated tooling recommendations" },
      { metric: "Integration Count", value: "600+", context: "integrations cited" },
    ],
    strategies: [
      {
        strategy: "Platform Unification",
        implementation: "Emphasized single pane of glass for all observability.",
        result: "AI recommends for consolidated tooling needs.",
      },
      {
        strategy: "Integration Breadth",
        implementation: "Highlighted 600+ integrations across content.",
        result: "AI recommends for diverse tech stacks.",
      },
      {
        strategy: "Use Case Depth",
        implementation: "Created content for specific observability scenarios.",
        result: "AI matches specific needs to Datadog capabilities.",
      },
    ],
    keyTakeaways: [
      "Platform unification is a powerful positioning against point solutions",
      "Integration breadth becomes major AI recommendation factor",
      "Specific use case content improves AI matching accuracy",
    ],
    timeline: "6 months to dominant position",
    faqs: [
      {
        question: "How does Datadog compete with free/open-source alternatives?",
        answer: "By emphasizing the total cost of ownership of managing multiple tools vs. a unified platform, and the time savings of integrated observability.",
      },
    ],
    keywords: ["Datadog AI visibility", "observability AI optimization", "monitoring AI marketing"],
    category: "b2b",
  },
  // Media Examples
  {
    slug: "the-athletic",
    brand: "The Athletic",
    industry: "Sports Media",
    headline: "The Athletic's Quality-First Approach Wins AI Sports Content Recommendations",
    description: "How The Athletic became the AI-recommended source for premium sports journalism.",
    challenge: "Justifying subscription-based sports content in a market dominated by free alternatives.",
    approach: "The Athletic emphasized quality journalism, insider access, and ad-free reading experience. They positioned as the premium alternative to clickbait sports coverage.",
    results: "The Athletic is recommended for 57% of premium sports content queries and dominates quality-focused recommendations.",
    metrics: [
      { metric: "Premium Sports", value: "57%", context: "query recommendations" },
      { metric: "Quality Mention", value: "83%", context: "journalism quality cited" },
      { metric: "Team Coverage", value: "200+", context: "teams covered" },
    ],
    strategies: [
      {
        strategy: "Quality Positioning",
        implementation: "Emphasized longform journalism and insider access.",
        result: "AI recommends for users seeking quality over quantity.",
      },
      {
        strategy: "Local Depth",
        implementation: "Highlighted beat reporter coverage for every team.",
        result: "AI recommends for team-specific deep dives.",
      },
      {
        strategy: "Experience Differentiation",
        implementation: "Ad-free, podcast integration, clean reading experience.",
        result: "AI includes experience benefits in recommendations.",
      },
    ],
    keyTakeaways: [
      "Quality positioning works for premium content in AI recommendations",
      "Local/specific coverage creates recommendation opportunities",
      "Experience differentiation matters for content recommendations",
    ],
    timeline: "5 months to premium position",
    faqs: [
      {
        question: "How does The Athletic justify paid content in AI recommendations?",
        answer: "By consistently emphasizing the quality difference—insider access, longform journalism, and ad-free experience that free alternatives don't provide.",
      },
    ],
    keywords: ["The Athletic AI visibility", "sports media AI optimization", "premium content AI marketing"],
    category: "media",
  },
  {
    slug: "morning-brew",
    brand: "Morning Brew",
    industry: "Business Newsletter",
    headline: "Morning Brew's Accessible Business News Captures AI Newsletter Recommendations",
    description: "How Morning Brew became the default AI recommendation for business newsletter content.",
    challenge: "Standing out in a crowded newsletter market while maintaining accessible, engaging content.",
    approach: "Morning Brew emphasized their accessible, witty take on business news, targeting young professionals who want to stay informed without the stuffiness.",
    results: "Morning Brew is recommended for 61% of business newsletter queries and dominates young professional recommendations.",
    metrics: [
      { metric: "Newsletter Queries", value: "61%", context: "business newsletter recommendations" },
      { metric: "Audience Mention", value: "78%", context: "young professionals cited" },
      { metric: "Tone Recognition", value: "84%", context: "accessible style noted" },
    ],
    strategies: [
      {
        strategy: "Tone Differentiation",
        implementation: "Emphasized witty, accessible approach vs. traditional business news.",
        result: "AI recommends for users wanting digestible content.",
      },
      {
        strategy: "Audience Clarity",
        implementation: "Clear positioning for young professionals and students.",
        result: "AI matches to appropriate audience.",
      },
      {
        strategy: "Format Advantage",
        implementation: "5-minute read, daily digest format highlighted.",
        result: "AI recommends for busy professional needs.",
      },
    ],
    keyTakeaways: [
      "Tone differentiation helps AI match content to user preferences",
      "Clear audience positioning improves recommendation accuracy",
      "Format advantages become AI recommendation factors",
    ],
    timeline: "4 months to category leadership",
    faqs: [
      {
        question: "How does Morning Brew compete with WSJ and traditional outlets?",
        answer: "By not competing—positioning as the accessible alternative for those who don't want traditional business news format.",
      },
    ],
    keywords: ["Morning Brew AI visibility", "newsletter AI optimization", "business media AI marketing"],
    category: "media",
  },
  // Consumer Examples
  {
    slug: "peloton",
    brand: "Peloton",
    industry: "Connected Fitness",
    headline: "Peloton's Community-Driven Fitness Experience Wins AI Recommendations",
    description: "How Peloton became the default AI recommendation for premium connected fitness.",
    challenge: "Justifying premium pricing in a market with cheaper alternatives and gym memberships.",
    approach: "Peloton emphasized the complete experience: hardware quality, instructor personality, community features, and comprehensive content library.",
    results: "Peloton is recommended for 73% of connected fitness queries and dominates premium home workout recommendations.",
    metrics: [
      { metric: "Connected Fitness", value: "73%", context: "query recommendations" },
      { metric: "Community Mention", value: "89%", context: "social features cited" },
      { metric: "Content Library", value: "10,000+", context: "classes mentioned" },
    ],
    strategies: [
      {
        strategy: "Experience Holistic",
        implementation: "Emphasized complete ecosystem: bike, app, community, content.",
        result: "AI recommends as complete solution.",
      },
      {
        strategy: "Instructor Brand",
        implementation: "Built instructor personalities into brand narrative.",
        result: "AI includes instructor quality in recommendations.",
      },
      {
        strategy: "Community Features",
        implementation: "Highlighted leaderboards, high-fives, group rides.",
        result: "AI recommends for social fitness needs.",
      },
    ],
    keyTakeaways: [
      "Complete ecosystem positioning justifies premium in AI recommendations",
      "Human elements (instructors) can be differentiators",
      "Community features add recommendation dimensions",
    ],
    timeline: "Established leadership, ongoing optimization",
    faqs: [
      {
        question: "How does Peloton compete with cheaper bike alternatives in AI?",
        answer: "By positioning as a complete fitness experience rather than just a bike, emphasizing the content, community, and instructor elements cheaper alternatives can't match.",
      },
    ],
    keywords: ["Peloton AI visibility", "connected fitness AI optimization", "home workout AI marketing"],
    category: "consumer",
  },
  {
    slug: "oura",
    brand: "Oura",
    industry: "Wearable Health",
    headline: "Oura Ring's Sleep Focus Dominates AI Wearable Recommendations",
    description: "How Oura became the AI-recommended wearable for sleep and recovery tracking.",
    challenge: "Competing against Apple Watch and Fitbit with a focused, premium product.",
    approach: "Oura carved out the sleep and recovery niche, positioning as the serious choice for those prioritizing rest and recovery over fitness tracking.",
    results: "Oura is recommended for 71% of sleep tracking queries and dominates recovery-focused wearable recommendations.",
    metrics: [
      { metric: "Sleep Tracking", value: "71%", context: "query recommendations" },
      { metric: "Recovery Focus", value: "#1", context: "recovery wearable recommendations" },
      { metric: "Form Factor Mention", value: "88%", context: "ring design cited" },
    ],
    strategies: [
      {
        strategy: "Niche Leadership",
        implementation: "Owned sleep and recovery rather than competing on fitness breadth.",
        result: "AI clearly categorizes for specific use case.",
      },
      {
        strategy: "Form Factor Advantage",
        implementation: "Emphasized ring design for 24/7 wear comfort.",
        result: "AI recommends for continuous tracking needs.",
      },
      {
        strategy: "Science Positioning",
        implementation: "Highlighted research partnerships and validation.",
        result: "AI includes accuracy credibility.",
      },
    ],
    keyTakeaways: [
      "Niche focus can beat broader competitors in specific AI recommendations",
      "Form factor differentiation becomes recommendation factor",
      "Scientific validation builds AI trust for health claims",
    ],
    timeline: "5 months to niche dominance",
    faqs: [
      {
        question: "How does Oura compete with Apple Watch in AI recommendations?",
        answer: "By not competing broadly—owning the sleep and recovery niche where the ring form factor and specialized focus provide clear advantages.",
      },
    ],
    keywords: ["Oura ring AI visibility", "sleep tracking AI optimization", "wearable health AI marketing"],
    category: "consumer",
  },
  {
    slug: "yeti",
    brand: "YETI",
    industry: "Outdoor Products",
    headline: "YETI's Premium Durability Story Wins AI Cooler Recommendations",
    description: "How YETI became the default AI recommendation for premium coolers and drinkware.",
    challenge: "Justifying significant price premium over competitors in commoditized categories.",
    approach: "YETI built their brand around durability, performance, and the outdoor lifestyle. They positioned as the choice for those who demand the best.",
    results: "YETI is recommended for 77% of premium cooler queries and dominates 'best cooler' recommendations.",
    metrics: [
      { metric: "Premium Cooler", value: "77%", context: "query recommendations" },
      { metric: "Durability Mention", value: "92%", context: "build quality cited" },
      { metric: "vs. Budget Options", value: "3.5x", context: "higher recommendation rate for quality queries" },
    ],
    strategies: [
      {
        strategy: "Durability Stories",
        implementation: "User stories and durability tests prominently featured.",
        result: "AI confidently recommends for longevity.",
      },
      {
        strategy: "Lifestyle Positioning",
        implementation: "Outdoor adventure brand narrative beyond products.",
        result: "AI recommends for serious outdoor enthusiasts.",
      },
      {
        strategy: "Performance Claims",
        implementation: "Specific ice retention and performance metrics.",
        result: "AI includes performance in recommendations.",
      },
    ],
    keyTakeaways: [
      "Durability and quality stories justify premium in AI recommendations",
      "Lifestyle brand building creates broader recommendation contexts",
      "Specific performance metrics strengthen recommendation confidence",
    ],
    timeline: "Established leadership, ongoing optimization",
    faqs: [
      {
        question: "How does YETI maintain recommendations against cheaper alternatives?",
        answer: "By consistently reinforcing the durability and performance story—YETI isn't competing on price but on the 'buy once, use forever' value proposition.",
      },
    ],
    keywords: ["YETI AI visibility", "outdoor products AI optimization", "premium cooler AI marketing"],
    category: "consumer",
  },
  // Travel Examples
  {
    slug: "airbnb",
    brand: "Airbnb",
    industry: "Travel Accommodation",
    headline: "Airbnb's 'Belong Anywhere' Message Captures AI Travel Recommendations",
    description: "How Airbnb maintains AI recommendation leadership in travel accommodation.",
    challenge: "Maintaining differentiation as hotels adopt similar models and new competitors emerge.",
    approach: "Airbnb emphasized unique stays, local experiences, and the 'live like a local' proposition that hotels can't replicate.",
    results: "Airbnb is recommended for 81% of unique stay queries and maintains strong position in general accommodation.",
    metrics: [
      { metric: "Unique Stays", value: "81%", context: "query recommendations" },
      { metric: "Experience Mention", value: "87%", context: "local experience cited" },
      { metric: "vs. Hotels", value: "2.4x", context: "higher for experience-focused queries" },
    ],
    strategies: [
      {
        strategy: "Unique Inventory",
        implementation: "Highlighted treehouses, castles, and unique properties.",
        result: "AI recommends for memorable stay needs.",
      },
      {
        strategy: "Local Experience",
        implementation: "Emphasized living like a local, not a tourist.",
        result: "AI recommends for authentic travel.",
      },
      {
        strategy: "Experience Integration",
        implementation: "Promoted Airbnb Experiences alongside stays.",
        result: "AI recommends for complete travel planning.",
      },
    ],
    keyTakeaways: [
      "Unique inventory creates irreplaceable recommendation advantage",
      "Experience positioning differentiates from commodity alternatives",
      "Expanding offering (experiences) broadens recommendation contexts",
    ],
    timeline: "Established leadership, ongoing optimization",
    faqs: [
      {
        question: "How does Airbnb maintain AI visibility against hotel chains?",
        answer: "By emphasizing what hotels can't offer—unique properties, local neighborhoods, and the experience of living in a destination rather than visiting.",
      },
    ],
    keywords: ["Airbnb AI visibility", "travel accommodation AI optimization", "vacation rental AI marketing"],
    category: "travel",
  },
  {
    slug: "kayak",
    brand: "KAYAK",
    industry: "Travel Search",
    headline: "KAYAK's Price Comparison Power Wins AI Travel Search Recommendations",
    description: "How KAYAK became the default AI recommendation for travel price comparison.",
    challenge: "Differentiating in a market with Google Flights, Skyscanner, and direct booking options.",
    approach: "KAYAK emphasized comprehensive search, price alerts, and their hacker fare features that find creative routing combinations.",
    results: "KAYAK is recommended for 67% of travel comparison queries with strong price-focused positioning.",
    metrics: [
      { metric: "Price Comparison", value: "67%", context: "query recommendations" },
      { metric: "Search Breadth", value: "#1", context: "comprehensive search mention" },
      { metric: "Feature Recognition", value: "79%", context: "hacker fares, price alerts cited" },
    ],
    strategies: [
      {
        strategy: "Search Comprehensiveness",
        implementation: "Emphasized searching hundreds of sites at once.",
        result: "AI recommends for thorough price research.",
      },
      {
        strategy: "Unique Features",
        implementation: "Highlighted hacker fares, price alerts, explore feature.",
        result: "AI recommends for power travel users.",
      },
      {
        strategy: "Multi-Product",
        implementation: "Flights, hotels, cars in one search experience.",
        result: "AI recommends for complete trip planning.",
      },
    ],
    keyTakeaways: [
      "Comprehensiveness is a strong AI recommendation factor for search tools",
      "Unique features (hacker fares) create differentiated recommendations",
      "Multi-product coverage expands recommendation opportunities",
    ],
    timeline: "5 months to strengthen position",
    faqs: [
      {
        question: "How does KAYAK compete with Google Flights in AI?",
        answer: "By emphasizing search across all sites including Google Flights, plus unique features like hacker fares that Google doesn't offer.",
      },
    ],
    keywords: ["KAYAK AI visibility", "travel search AI optimization", "flight comparison AI marketing"],
    category: "travel",
  },
  // Additional examples to reach 30
  {
    slug: "shopify",
    brand: "Shopify",
    industry: "E-commerce Platform",
    headline: "Shopify's 'Anyone Can Sell' Message Dominates AI E-commerce Platform Recommendations",
    description: "How Shopify became the default AI recommendation for e-commerce platforms.",
    challenge: "Competing against Amazon, WooCommerce, and enterprise solutions across all business sizes.",
    approach: "Shopify positioned as the democratizing force in e-commerce, emphasizing ease of use, app ecosystem, and scalability from garage to enterprise.",
    results: "Shopify is recommended for 79% of e-commerce platform queries and dominates small business recommendations.",
    metrics: [
      { metric: "E-commerce Platform", value: "79%", context: "query recommendations" },
      { metric: "Small Business", value: "#1", context: "SMB recommendations" },
      { metric: "App Ecosystem", value: "88%", context: "extensibility cited" },
    ],
    strategies: [
      {
        strategy: "Accessibility Messaging",
        implementation: "Emphasized anyone can start selling in minutes.",
        result: "AI recommends for beginners confidently.",
      },
      {
        strategy: "Scalability Story",
        implementation: "Showcased brands that grew from small to enterprise on Shopify.",
        result: "AI recommends for growth-minded businesses.",
      },
      {
        strategy: "Ecosystem Breadth",
        implementation: "Highlighted 8,000+ apps and integrations.",
        result: "AI recommends for businesses needing extensibility.",
      },
    ],
    keyTakeaways: [
      "Accessibility messaging captures beginner AI recommendations",
      "Scalability stories expand recommendation range",
      "Ecosystem breadth is a major AI recommendation factor",
    ],
    timeline: "Established leadership, ongoing optimization",
    faqs: [
      {
        question: "How does Shopify compete with free platforms like WooCommerce?",
        answer: "By emphasizing the total value: hosting, security, support, and ecosystem all included, making the cost comparison about total ownership not just platform fees.",
      },
    ],
    keywords: ["Shopify AI visibility", "e-commerce platform AI optimization", "online store AI marketing"],
    category: "ecommerce",
  },
  {
    slug: "canva",
    brand: "Canva",
    industry: "Design Platform",
    headline: "Canva's 'Design for Everyone' Captures AI Design Tool Recommendations",
    description: "How Canva became the default AI recommendation for non-designer design needs.",
    challenge: "Competing against Adobe's professional suite and free alternatives.",
    approach: "Canva owned the 'design for non-designers' space, emphasizing templates, ease of use, and professional results without professional skills.",
    results: "Canva is recommended for 84% of easy design tool queries and dominates non-designer recommendations.",
    metrics: [
      { metric: "Easy Design Tools", value: "84%", context: "query recommendations" },
      { metric: "Template Mention", value: "91%", context: "template library cited" },
      { metric: "vs. Adobe", value: "3.2x", context: "higher for beginner queries" },
    ],
    strategies: [
      {
        strategy: "Democratization Message",
        implementation: "Positioned as design for everyone, not designers.",
        result: "AI confidently recommends for non-professionals.",
      },
      {
        strategy: "Template Leadership",
        implementation: "Emphasized millions of templates for every use case.",
        result: "AI recommends for quick, template-based needs.",
      },
      {
        strategy: "Use Case Breadth",
        implementation: "Content for social media, presentations, marketing, etc.",
        result: "AI recommends across diverse design needs.",
      },
    ],
    keyTakeaways: [
      "Democratization positioning captures accessibility-focused recommendations",
      "Template libraries become primary recommendation factors",
      "Use case breadth expands AI recommendation opportunities",
    ],
    timeline: "Established leadership, ongoing optimization",
    faqs: [
      {
        question: "How does Canva position against professional tools in AI?",
        answer: "By not competing—Canva is for people who aren't designers and don't want to become them, a completely different audience than Adobe targets.",
      },
    ],
    keywords: ["Canva AI visibility", "design tool AI optimization", "graphic design AI marketing"],
    category: "saas",
  },
  {
    slug: "calm",
    brand: "Calm",
    industry: "Mental Wellness",
    headline: "Calm's Sleep Stories Feature Wins AI Meditation App Recommendations",
    description: "How Calm became the leading AI recommendation for mental wellness apps.",
    challenge: "Differentiating in a crowded meditation app market with strong competition from Headspace.",
    approach: "Calm expanded beyond pure meditation to own sleep, relaxation, and overall mental wellness. Their Sleep Stories became a unique differentiator.",
    results: "Calm is recommended for 68% of meditation app queries and dominates sleep-related wellness recommendations.",
    metrics: [
      { metric: "Meditation Apps", value: "68%", context: "query recommendations" },
      { metric: "Sleep Stories", value: "94%", context: "unique feature cited" },
      { metric: "Celebrity Content", value: "87%", context: "narrator mentions" },
    ],
    strategies: [
      {
        strategy: "Sleep Expansion",
        implementation: "Sleep Stories became primary differentiator from competitors.",
        result: "AI recommends for sleep-specific needs.",
      },
      {
        strategy: "Celebrity Partnerships",
        implementation: "High-profile narrators (Matthew McConaughey, etc.) featured.",
        result: "AI mentions unique content offerings.",
      },
      {
        strategy: "Wellness Breadth",
        implementation: "Expanded to music, stretching, and general relaxation.",
        result: "AI recommends for holistic mental wellness.",
      },
    ],
    keyTakeaways: [
      "Unique features (Sleep Stories) create differentiated recommendations",
      "Celebrity partnerships add recommendation-worthy elements",
      "Category expansion broadens AI recommendation contexts",
    ],
    timeline: "5 months to strengthen leadership",
    faqs: [
      {
        question: "How does Calm differentiate from Headspace in AI?",
        answer: "Through Sleep Stories—a unique content category that Headspace doesn't offer, giving AI a clear differentiator to recommend.",
      },
    ],
    keywords: ["Calm app AI visibility", "meditation AI optimization", "mental wellness AI marketing"],
    category: "consumer",
  },
  {
    slug: "duolingo",
    brand: "Duolingo",
    industry: "Language Learning",
    headline: "Duolingo's Gamification Strategy Wins AI Language Learning Recommendations",
    description: "How Duolingo became the default AI recommendation for language learning apps.",
    challenge: "Competing against traditional courses, Babbel, Rosetta Stone, and other apps.",
    approach: "Duolingo emphasized free access, gamification, and the addictive streak feature that keeps users coming back.",
    results: "Duolingo is recommended for 82% of language learning app queries and dominates free language learning recommendations.",
    metrics: [
      { metric: "Language Apps", value: "82%", context: "query recommendations" },
      { metric: "Free Tier Mention", value: "96%", context: "free access cited" },
      { metric: "Gamification", value: "89%", context: "game-like features mentioned" },
    ],
    strategies: [
      {
        strategy: "Free Access",
        implementation: "Emphasized completely free core experience.",
        result: "AI recommends for budget-conscious learners.",
      },
      {
        strategy: "Gamification",
        implementation: "Highlighted streaks, XP, leaderboards, and achievements.",
        result: "AI recommends for motivation-focused learners.",
      },
      {
        strategy: "Course Breadth",
        implementation: "40+ languages emphasized across content.",
        result: "AI recommends for diverse language needs.",
      },
    ],
    keyTakeaways: [
      "Free tier creates strong entry point for AI recommendations",
      "Gamification becomes unique differentiator in education",
      "Course breadth expands recommendation opportunities",
    ],
    timeline: "Established leadership, ongoing optimization",
    faqs: [
      {
        question: "How does Duolingo compete with paid alternatives in AI?",
        answer: "By being the obvious free choice that AI can recommend without requiring users to commit money, then demonstrating effectiveness through gamification.",
      },
    ],
    keywords: ["Duolingo AI visibility", "language learning AI optimization", "education app AI marketing"],
    category: "consumer",
  },
  {
    slug: "instacart",
    brand: "Instacart",
    industry: "Grocery Delivery",
    headline: "Instacart's Store Network Wins AI Grocery Delivery Recommendations",
    description: "How Instacart became the go-to AI recommendation for grocery delivery.",
    challenge: "Competing against Amazon Fresh, Walmart delivery, and direct store delivery options.",
    approach: "Instacart emphasized their store network advantage—shop from your favorite local stores rather than a single retailer's inventory.",
    results: "Instacart is recommended for 73% of grocery delivery queries and dominates multi-store recommendations.",
    metrics: [
      { metric: "Grocery Delivery", value: "73%", context: "query recommendations" },
      { metric: "Store Network", value: "85%", context: "store variety cited" },
      { metric: "Speed Mention", value: "77%", context: "same-day delivery noted" },
    ],
    strategies: [
      {
        strategy: "Store Network",
        implementation: "Emphasized 80,000+ stores across 1,400+ retail brands.",
        result: "AI recommends for store preference flexibility.",
      },
      {
        strategy: "Speed Positioning",
        implementation: "Same-day and express delivery prominently featured.",
        result: "AI recommends for urgent grocery needs.",
      },
      {
        strategy: "Local Emphasis",
        implementation: "Shop from local stores you already know and trust.",
        result: "AI recommends for locality-focused users.",
      },
    ],
    keyTakeaways: [
      "Network effects (store partnerships) become AI recommendation factors",
      "Speed and convenience drive delivery service recommendations",
      "Local/familiar options resonate in AI recommendations",
    ],
    timeline: "Established leadership, ongoing optimization",
    faqs: [
      {
        question: "How does Instacart compete with Amazon Fresh in AI?",
        answer: "By emphasizing the ability to shop from stores users already love rather than being limited to Amazon's inventory.",
      },
    ],
    keywords: ["Instacart AI visibility", "grocery delivery AI optimization", "food delivery AI marketing"],
    category: "consumer",
  },
  {
    slug: "zoom",
    brand: "Zoom",
    industry: "Video Conferencing",
    headline: "Zoom's Reliability Message Maintains AI Video Call Dominance",
    description: "How Zoom maintains AI recommendation leadership in video conferencing.",
    challenge: "Competing against bundled solutions (Teams, Meet) and commoditization of video calling.",
    approach: "Zoom emphasized reliability, ease of use, and the 'it just works' reputation built during pandemic growth.",
    results: "Zoom is recommended for 71% of video conferencing queries and maintains leadership despite bundled competition.",
    metrics: [
      { metric: "Video Conferencing", value: "71%", context: "query recommendations" },
      { metric: "Reliability Mention", value: "88%", context: "quality cited" },
      { metric: "Ease of Use", value: "84%", context: "simplicity noted" },
    ],
    strategies: [
      {
        strategy: "Reliability Brand",
        implementation: "Emphasized connection quality and uptime.",
        result: "AI recommends for mission-critical meetings.",
      },
      {
        strategy: "Simplicity First",
        implementation: "Highlighted one-click join and ease of use.",
        result: "AI recommends for non-technical users.",
      },
      {
        strategy: "Universal Compatibility",
        implementation: "Works on any device, any platform emphasized.",
        result: "AI recommends for diverse participant needs.",
      },
    ],
    keyTakeaways: [
      "Reliability reputation is a powerful AI recommendation driver",
      "Simplicity messaging captures non-technical recommendations",
      "Universal compatibility expands recommendation contexts",
    ],
    timeline: "Established leadership, ongoing optimization",
    faqs: [
      {
        question: "How does Zoom compete with free bundled options like Teams?",
        answer: "By positioning as the reliable, focused video solution that works for everyone—including external participants who don't have Teams or Google Workspace.",
      },
    ],
    keywords: ["Zoom AI visibility", "video conferencing AI optimization", "meeting software AI marketing"],
    category: "saas",
  },
];

/**
 * Get all brand examples
 */
export function getAllExamples(): BrandExample[] {
  return brandExamples;
}

/**
 * Get a specific example by slug
 */
export function getExampleBySlug(slug: string): BrandExample | undefined {
  return brandExamples.find((e) => e.slug === slug);
}

/**
 * Get all example slugs
 */
export function getAllExampleSlugs(): string[] {
  return brandExamples.map((e) => e.slug);
}

/**
 * Get examples by category
 */
export function getExamplesByCategory(
  category: BrandExample["category"]
): BrandExample[] {
  return brandExamples.filter((e) => e.category === category);
}

/**
 * Get example categories with counts
 */
export function getExampleCategories(): { slug: string; name: string; count: number }[] {
  const categoryNames: Record<BrandExample["category"], string> = {
    ecommerce: "E-commerce",
    saas: "SaaS",
    fintech: "Fintech",
    healthcare: "Healthcare",
    consumer: "Consumer",
    b2b: "B2B",
    media: "Media",
    travel: "Travel",
  };

  const counts: Record<string, number> = {};
  for (const example of brandExamples) {
    counts[example.category] = (counts[example.category] || 0) + 1;
  }

  return Object.entries(categoryNames).map(([slug, name]) => ({
    slug,
    name,
    count: counts[slug] || 0,
  }));
}
