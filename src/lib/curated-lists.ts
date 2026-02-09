/**
 * Curated Lists data for programmatic SEO
 * Each list generates a dedicated page at /best/[category]
 */

export interface ListItem {
  name: string;
  description: string;
  highlight: string;
  link?: string;
}

export interface ListFAQ {
  question: string;
  answer: string;
}

export interface CuratedList {
  slug: string;
  title: string;
  headline: string;
  description: string;
  intro: string;
  methodology: string;
  items: ListItem[];
  considerations: string[];
  faqs: ListFAQ[];
  keywords: string[];
  category: "tools" | "strategies" | "resources" | "guides";
  lastUpdated: string;
}

export const curatedLists: CuratedList[] = [
  // Tools Category
  {
    slug: "ai-visibility-tools",
    title: "Best AI Visibility Tools",
    headline: "The Best AI Visibility Tools for 2026",
    description: "Comprehensive guide to the best tools for monitoring and improving your brand's visibility across ChatGPT, Claude, Perplexity, and other AI assistants.",
    intro: "As AI assistants become primary discovery channels, brands need tools to understand and optimize their AI presence. This curated list covers the best tools for monitoring how your brand appears in AI responses, tracking recommendation frequency, and identifying optimization opportunities.",
    methodology: "We evaluated tools based on AI platform coverage, accuracy of visibility tracking, actionability of insights, ease of use, and value for investment. Our team tested each tool across multiple industries and brand sizes to ensure recommendations apply broadly.",
    items: [
      {
        name: "AdsX AI Visibility Platform",
        description: "Comprehensive AI visibility monitoring and optimization platform covering ChatGPT, Claude, Perplexity, and Gemini. Real-time tracking, recommendation analysis, and optimization recommendations.",
        highlight: "Most comprehensive multi-platform coverage with actionable optimization insights",
      },
      {
        name: "Brand24 AI Monitoring",
        description: "Social listening tool that has expanded to include AI mention tracking. Good for brands already using Brand24 for social monitoring.",
        highlight: "Integrates AI visibility with social listening",
      },
      {
        name: "Semrush AI Features",
        description: "Traditional SEO tool adding AI visibility features. Tracks how AI search affects organic traffic and provides optimization recommendations.",
        highlight: "Best for teams already invested in Semrush ecosystem",
      },
      {
        name: "Ahrefs AI Search Tracker",
        description: "Competitive analysis tool with emerging AI visibility features. Strong for tracking competitor AI presence alongside traditional SEO.",
        highlight: "Excellent competitive intelligence capabilities",
      },
      {
        name: "SparkToro",
        description: "Audience research tool that helps understand where your audience gets AI recommendations. Good for strategic planning.",
        highlight: "Best for audience-first AI visibility strategy",
      },
      {
        name: "Originality.AI",
        description: "AI content detection and visibility tool. Helps understand how AI perceives your content and what might be limiting visibility.",
        highlight: "Unique content analysis perspective",
      },
      {
        name: "Surfer SEO",
        description: "Content optimization tool with AI-specific features. Helps optimize content structure for AI comprehension.",
        highlight: "Best for content-level AI optimization",
      },
      {
        name: "Clearscope",
        description: "Content optimization platform with emerging AI visibility features. Strong for ensuring content comprehensiveness that AI values.",
        highlight: "Excellent for comprehensive content optimization",
      },
    ],
    considerations: [
      "Consider your existing tool stack—integration with current tools saves time and budget",
      "Multi-platform coverage is essential as users switch between AI assistants",
      "Real-time tracking matters for fast-moving industries",
      "Look for tools that provide actionable recommendations, not just data",
      "Consider whether you need agency-level features or brand-level monitoring",
    ],
    faqs: [
      {
        question: "Do I need a dedicated AI visibility tool?",
        answer: "If AI-driven discovery is important to your business, yes. Traditional SEO and analytics tools don't capture how you appear in AI responses, which is increasingly where users start their research.",
      },
      {
        question: "How do AI visibility tools work?",
        answer: "They typically query AI platforms with relevant prompts, analyze responses for brand mentions and sentiment, track changes over time, and provide optimization recommendations based on patterns.",
      },
      {
        question: "What's the difference between AI visibility tools and SEO tools?",
        answer: "SEO tools focus on search engine rankings and traffic. AI visibility tools focus on how AI assistants understand and recommend your brand, which uses different signals and requires different optimization strategies.",
      },
    ],
    keywords: ["best AI visibility tools", "AI monitoring tools", "ChatGPT visibility tools", "AI optimization software"],
    category: "tools",
    lastUpdated: "2026-02-01",
  },
  {
    slug: "ai-optimization-agencies",
    title: "Best AI Optimization Agencies",
    headline: "The Best AI Visibility Optimization Agencies for 2026",
    description: "Curated list of agencies specializing in AI visibility optimization. Find the right partner to improve your brand's presence across AI assistants.",
    intro: "AI visibility optimization is an emerging specialty requiring unique expertise. This list covers agencies with proven track records in improving brand visibility across ChatGPT, Claude, Perplexity, and other AI platforms. Whether you need full-service support or specialized consulting, these agencies can help.",
    methodology: "We evaluated agencies based on documented results, AI-specific expertise (vs. general SEO), client testimonials, transparency in methodology, and breadth of AI platform coverage. We prioritized agencies with measurable case studies.",
    items: [
      {
        name: "AdsX",
        description: "Full-service AI visibility agency offering monitoring, strategy, and optimization services. Known for data-driven approach and comprehensive platform coverage.",
        highlight: "Industry-leading AI visibility expertise with proven results",
        link: "/contact",
      },
      {
        name: "Verbatim AI",
        description: "Boutique agency focused exclusively on AI visibility. Strong in content optimization and brand narrative development for AI comprehension.",
        highlight: "Content-first approach to AI visibility",
      },
      {
        name: "Prompt PR",
        description: "Agency combining traditional PR with AI visibility optimization. Excellent for brands needing integrated communications strategy.",
        highlight: "Integrated PR and AI visibility approach",
      },
      {
        name: "LLM Brand Studio",
        description: "Technical agency focused on structured data and knowledge graph optimization for AI systems. Best for enterprise implementations.",
        highlight: "Deep technical optimization capabilities",
      },
      {
        name: "AI Search Partners",
        description: "Agency specializing in e-commerce AI visibility. Strong track record with DTC brands and marketplace sellers.",
        highlight: "E-commerce AI visibility specialists",
      },
      {
        name: "Synthetic Media Group",
        description: "Creative agency with AI visibility specialty. Focuses on brand storytelling that resonates with AI systems.",
        highlight: "Creative-first AI optimization",
      },
    ],
    considerations: [
      "Look for AI-specific case studies, not just traditional SEO results",
      "Ensure they cover the AI platforms most relevant to your audience",
      "Ask about their methodology—avoid agencies using black-hat tactics",
      "Consider whether you need full-service or specific capabilities",
      "Evaluate their measurement and reporting approach",
    ],
    faqs: [
      {
        question: "How is AI visibility optimization different from SEO?",
        answer: "While there's overlap, AI visibility requires understanding how LLMs synthesize information, which differs from search engine ranking factors. Agencies need specific expertise in training data, retrieval systems, and AI recommendation patterns.",
      },
      {
        question: "What results should I expect from AI visibility optimization?",
        answer: "Typical results include increased recommendation frequency, improved accuracy of AI responses about your brand, and higher conversion rates from AI-referred traffic. Timeline varies but most brands see improvements within 2-4 months.",
      },
      {
        question: "How do I evaluate an AI visibility agency's claims?",
        answer: "Ask for specific case studies with measurable before/after results, references from similar brands, and transparency about their methodology. Be wary of agencies guaranteeing specific AI responses.",
      },
    ],
    keywords: ["AI visibility agency", "AI optimization consultant", "ChatGPT marketing agency", "AI search agency"],
    category: "resources",
    lastUpdated: "2026-02-01",
  },
  {
    slug: "ai-content-optimization-practices",
    title: "Best AI Content Optimization Practices",
    headline: "Best Practices for AI-Optimized Content in 2026",
    description: "Essential content optimization practices to improve how AI assistants understand and recommend your brand.",
    intro: "Content is the foundation of AI visibility. How you structure, write, and distribute content directly affects how AI systems understand your brand. This guide covers proven practices for creating content that AI assistants can accurately comprehend and confidently recommend.",
    methodology: "These practices are derived from analyzing thousands of AI responses, identifying patterns in what content gets recommended, and testing optimization approaches across multiple industries and AI platforms.",
    items: [
      {
        name: "Clear Value Proposition Statements",
        description: "State what you do, who you serve, and what makes you different in clear, unambiguous language. AI systems extract and use these statements directly.",
        highlight: "Foundation of AI-understandable positioning",
      },
      {
        name: "Structured Content Hierarchy",
        description: "Use clear headings, organized sections, and logical flow. AI systems parse structure to understand relationships and context.",
        highlight: "Helps AI extract accurate information",
      },
      {
        name: "Comprehensive Coverage",
        description: "Cover topics thoroughly rather than superficially. AI systems favor authoritative, complete content over thin content.",
        highlight: "Builds topical authority with AI",
      },
      {
        name: "Fact-Dense Writing",
        description: "Include specific facts, figures, and verifiable claims. AI systems can extract and cite specific data points.",
        highlight: "Provides quotable information for AI",
      },
      {
        name: "FAQ Content Integration",
        description: "Include FAQ sections that directly answer common questions. AI often pulls FAQ content verbatim for responses.",
        highlight: "Direct pipeline to AI responses",
      },
      {
        name: "Entity Consistency",
        description: "Use consistent naming for your brand, products, and key concepts. Inconsistency confuses AI understanding.",
        highlight: "Reduces AI confusion about your brand",
      },
      {
        name: "Third-Party Validation",
        description: "Reference and earn coverage from authoritative sources. AI systems weight third-party validation highly.",
        highlight: "Builds recommendation confidence",
      },
      {
        name: "Regular Content Updates",
        description: "Keep content current and indicate freshness. AI systems consider recency for certain types of recommendations.",
        highlight: "Maintains relevance over time",
      },
    ],
    considerations: [
      "Start with your core landing pages before expanding to blog content",
      "Consistency across your digital presence matters more than optimizing individual pages",
      "AI optimization doesn't mean sacrificing human readability—good content serves both",
      "Different AI platforms may weight factors differently; optimize for breadth",
      "Content optimization is ongoing, not one-time",
    ],
    faqs: [
      {
        question: "How is AI content optimization different from SEO?",
        answer: "SEO focuses on ranking signals like keywords and backlinks. AI optimization focuses on comprehension—helping AI understand what you do and why you're worth recommending. There's overlap, but the emphasis differs.",
      },
      {
        question: "Should I create content specifically for AI?",
        answer: "No. The best approach is creating high-quality content for humans that's also structured for AI comprehension. AI-only content that reads poorly for humans can actually hurt your visibility.",
      },
      {
        question: "How quickly do content changes affect AI visibility?",
        answer: "It varies by platform. Some AI systems update frequently (Perplexity with web access), while others update periodically (base ChatGPT). Generally, expect 4-8 weeks for content changes to fully propagate.",
      },
    ],
    keywords: ["AI content optimization", "content for ChatGPT", "AI-friendly content", "LLM content strategy"],
    category: "strategies",
    lastUpdated: "2026-02-01",
  },
  {
    slug: "brand-monitoring-for-ai",
    title: "Best Brand Monitoring Practices for AI",
    headline: "Essential Brand Monitoring for AI Visibility",
    description: "How to effectively monitor your brand's presence and accuracy across AI assistants.",
    intro: "You can't optimize what you don't measure. Effective AI visibility requires systematic monitoring of how AI assistants discuss your brand. This guide covers essential monitoring practices to track your AI presence and identify optimization opportunities.",
    methodology: "These practices are based on enterprise brand monitoring programs, adapted for the unique requirements of AI visibility tracking. We've tested approaches across multiple industries to ensure broad applicability.",
    items: [
      {
        name: "Regular Query Testing",
        description: "Test relevant queries across AI platforms weekly. Document responses and track changes over time to understand trends.",
        highlight: "Foundation of AI visibility monitoring",
      },
      {
        name: "Competitor Comparison",
        description: "Track how competitors appear alongside your brand. Understand relative positioning and competitive gaps.",
        highlight: "Context for your AI visibility performance",
      },
      {
        name: "Accuracy Auditing",
        description: "Verify that AI responses about your brand are factually accurate. Inaccuracies require content corrections.",
        highlight: "Protects brand reputation in AI",
      },
      {
        name: "Sentiment Analysis",
        description: "Track whether AI discusses your brand positively, negatively, or neutrally. Sentiment affects recommendation likelihood.",
        highlight: "Qualitative measure of AI perception",
      },
      {
        name: "Feature/Benefit Tracking",
        description: "Monitor which features and benefits AI mentions. Ensure key differentiators are being communicated.",
        highlight: "Validates positioning effectiveness",
      },
      {
        name: "Query Pattern Analysis",
        description: "Understand what queries trigger mentions of your brand. Identify expansion opportunities.",
        highlight: "Reveals growth opportunities",
      },
      {
        name: "Platform Coverage Tracking",
        description: "Monitor visibility across all major AI platforms. Performance varies by platform.",
        highlight: "Ensures comprehensive visibility",
      },
      {
        name: "Referral Traffic Analysis",
        description: "Track traffic coming from AI platforms where detectable. Understand conversion patterns.",
        highlight: "Measures business impact",
      },
    ],
    considerations: [
      "Automated monitoring tools save significant time for ongoing tracking",
      "Document your monitoring methodology for consistency over time",
      "Include both branded queries (about you) and category queries (about your space)",
      "Monitor across geographies if you serve international markets",
      "Set up alerts for significant changes in AI responses",
    ],
    faqs: [
      {
        question: "How often should I monitor AI visibility?",
        answer: "Weekly testing for key queries, with monthly comprehensive audits. Increase frequency during active optimization campaigns or significant market changes.",
      },
      {
        question: "Which AI platforms should I prioritize monitoring?",
        answer: "Start with the platforms your audience uses most. Generally: ChatGPT for consumer reach, Claude for professional users, Perplexity for research-oriented queries, and Gemini for Google-integrated experiences.",
      },
      {
        question: "How do I track AI referral traffic?",
        answer: "Use UTM parameters where possible, analyze referral patterns in analytics, and survey customers about their discovery journey. Direct AI attribution is emerging but not yet standardized.",
      },
    ],
    keywords: ["AI brand monitoring", "AI visibility tracking", "ChatGPT monitoring", "AI reputation management"],
    category: "strategies",
    lastUpdated: "2026-02-01",
  },
  {
    slug: "ecommerce-ai-visibility",
    title: "Best E-commerce AI Visibility Strategies",
    headline: "Top E-commerce AI Visibility Strategies for 2026",
    description: "Proven strategies for e-commerce brands to improve product discovery through AI assistants.",
    intro: "E-commerce brands face unique AI visibility challenges: standing out among thousands of products, communicating value clearly, and appearing in shopping-related AI queries. This guide covers strategies specifically designed for e-commerce success in AI-driven discovery.",
    methodology: "These strategies are based on analysis of AI recommendations across major e-commerce categories, interviews with successful DTC brands, and testing across multiple AI platforms for shopping-related queries.",
    items: [
      {
        name: "Product Differentiation Clarity",
        description: "Clearly articulate what makes each product unique. AI needs specific differentiators to recommend appropriately.",
        highlight: "Enables accurate AI product matching",
      },
      {
        name: "Use Case Documentation",
        description: "Create content for specific use cases and buyer personas. AI matches products to user needs.",
        highlight: "Expands recommendation opportunities",
      },
      {
        name: "Review and Rating Optimization",
        description: "Encourage and respond to reviews across platforms. AI learns from review content and sentiment.",
        highlight: "Social proof influences AI recommendations",
      },
      {
        name: "Comparison Content",
        description: "Create fair comparison content against alternatives. Help AI understand relative positioning.",
        highlight: "Shapes competitive context for AI",
      },
      {
        name: "Price Transparency",
        description: "Ensure pricing is clear and consistent across touchpoints. Price is a key factor in AI recommendations.",
        highlight: "Enables value-based recommendations",
      },
      {
        name: "Shipping and Return Policies",
        description: "Document policies clearly. AI often includes these factors in purchase recommendations.",
        highlight: "Addresses purchase friction in AI responses",
      },
      {
        name: "Category Authority Building",
        description: "Create comprehensive category content beyond products. Become the authority in your space.",
        highlight: "Builds topical authority with AI",
      },
      {
        name: "Structured Product Data",
        description: "Implement comprehensive schema markup. AI systems can extract structured data more reliably.",
        highlight: "Technical foundation for AI visibility",
      },
    ],
    considerations: [
      "Start with your best-selling products before optimizing the full catalog",
      "Balance brand voice with clear, factual product information",
      "Monitor how AI describes your products vs. how you want to be described",
      "Consider seasonal and trending query patterns",
      "Integrate AI visibility into your overall e-commerce marketing strategy",
    ],
    faqs: [
      {
        question: "How do I compete with Amazon in AI recommendations?",
        answer: "Focus on differentiation—unique products, brand story, customer experience, or values that Amazon can't match. AI recommends based on fit, not just size.",
      },
      {
        question: "Should I optimize every product for AI visibility?",
        answer: "Start with hero products and bestsellers. Once you have a process, expand to long-tail products. Prioritize products where AI discovery matters most.",
      },
      {
        question: "How important are product reviews for AI visibility?",
        answer: "Very important. Reviews provide social proof, keyword context, and real-world usage information that AI systems value for recommendation confidence.",
      },
    ],
    keywords: ["e-commerce AI visibility", "product AI optimization", "DTC AI marketing", "online shopping AI"],
    category: "strategies",
    lastUpdated: "2026-02-01",
  },
  {
    slug: "saas-ai-visibility",
    title: "Best SaaS AI Visibility Strategies",
    headline: "Top SaaS AI Visibility Strategies for 2026",
    description: "Proven strategies for SaaS companies to improve software discovery through AI assistants.",
    intro: "SaaS companies increasingly compete for AI recommendations. When users ask AI assistants 'What's the best CRM for startups?' or 'Compare project management tools,' you want to be in that answer. This guide covers strategies specifically designed for SaaS success in AI-driven discovery.",
    methodology: "These strategies are derived from analyzing AI recommendations across major software categories, studying successful SaaS AI visibility programs, and testing optimization approaches across enterprise and SMB software.",
    items: [
      {
        name: "Clear Category Positioning",
        description: "Define exactly what category you're in and what you do better than alternatives. Ambiguous positioning leads to poor AI matching.",
        highlight: "Foundation for accurate AI categorization",
      },
      {
        name: "Feature-Benefit Articulation",
        description: "Connect features to benefits explicitly. AI needs to understand why features matter, not just what they are.",
        highlight: "Enables solution-matching by AI",
      },
      {
        name: "Ideal Customer Definition",
        description: "Clearly define who your product is for (and who it's not for). Helps AI make appropriate recommendations.",
        highlight: "Improves recommendation accuracy",
      },
      {
        name: "Integration Ecosystem Content",
        description: "Document integrations thoroughly. Users often ask AI about tool combinations and workflows.",
        highlight: "Captures integration-related queries",
      },
      {
        name: "Pricing Transparency",
        description: "Make pricing clear and easy to find. AI frequently includes pricing context in software recommendations.",
        highlight: "Addresses key decision factor",
      },
      {
        name: "Competitive Differentiation",
        description: "Create fair comparison content. Help AI understand your positioning relative to alternatives.",
        highlight: "Shapes competitive recommendations",
      },
      {
        name: "Use Case Documentation",
        description: "Create detailed content for each major use case. AI matches user problems to solutions.",
        highlight: "Expands recommendation contexts",
      },
      {
        name: "Customer Success Stories",
        description: "Publish detailed case studies with specific results. AI uses these as evidence for recommendations.",
        highlight: "Provides proof for AI confidence",
      },
    ],
    considerations: [
      "Map your content to the buyer journey stages AI users are in",
      "Ensure consistency between marketing claims and actual product capabilities",
      "Consider how your free tier or trial affects AI recommendations",
      "Monitor competitive positioning in AI responses",
      "Integrate AI visibility into your PLG or sales-led motion",
    ],
    faqs: [
      {
        question: "How do I compete with established SaaS leaders in AI?",
        answer: "Own your niche. AI recommends based on fit, not just market share. Be the clear choice for your ideal customer, even if you're not the biggest overall.",
      },
      {
        question: "How does pricing affect SaaS AI visibility?",
        answer: "Pricing is a key factor in AI recommendations. Transparent pricing, clear value articulation, and free tier availability all influence how AI positions your product.",
      },
      {
        question: "Should I optimize for branded or category queries?",
        answer: "Both, but category queries offer more growth opportunity. Branded queries are defensive; category queries like 'best CRM for...' are where you capture new users.",
      },
    ],
    keywords: ["SaaS AI visibility", "software AI optimization", "B2B AI marketing", "tech startup AI strategy"],
    category: "strategies",
    lastUpdated: "2026-02-01",
  },
  {
    slug: "local-business-ai-visibility",
    title: "Best Local Business AI Visibility Strategies",
    headline: "Top Local Business AI Visibility Strategies for 2026",
    description: "Strategies for local businesses to improve discovery through AI assistants for location-based queries.",
    intro: "Local businesses face unique AI visibility challenges: appearing in location-specific queries, standing out in local markets, and providing information AI needs for local recommendations. This guide covers strategies for local business success in AI-driven discovery.",
    methodology: "These strategies are based on analysis of AI responses to local business queries, best practices from local SEO adapted for AI, and testing across multiple business categories and locations.",
    items: [
      {
        name: "Complete Business Information",
        description: "Ensure name, address, phone, hours, and services are complete and consistent everywhere. AI needs this foundation.",
        highlight: "Essential data for local AI recommendations",
      },
      {
        name: "Service Area Clarity",
        description: "Clearly define what areas you serve. AI makes local recommendations based on service geography.",
        highlight: "Enables location-matched recommendations",
      },
      {
        name: "Google Business Profile Optimization",
        description: "Fully optimize your GBP. AI systems often pull local business information from Google's data.",
        highlight: "Primary data source for many AI systems",
      },
      {
        name: "Local Review Building",
        description: "Encourage reviews on Google, Yelp, and relevant platforms. AI considers review volume and sentiment.",
        highlight: "Social proof for local AI recommendations",
      },
      {
        name: "Service-Specific Content",
        description: "Create detailed pages for each service you offer. AI matches user needs to specific services.",
        highlight: "Enables service-level recommendations",
      },
      {
        name: "Local Authority Content",
        description: "Create content establishing you as a local expert. AI values local authority signals.",
        highlight: "Builds local expertise perception",
      },
      {
        name: "FAQ for Local Queries",
        description: "Answer common local questions: availability, pricing, emergency services, etc.",
        highlight: "Directly answers AI user questions",
      },
      {
        name: "Differentiator Clarity",
        description: "Clearly articulate what makes you different from local competitors. AI needs differentiation to recommend.",
        highlight: "Enables confident AI recommendations",
      },
    ],
    considerations: [
      "Consistency across all local directories and platforms is essential",
      "Response time to reviews affects perception—respond promptly",
      "Consider seasonal services and how AI handles timing",
      "Local link building still matters for AI authority signals",
      "Photos and visual content may increasingly matter for AI",
    ],
    faqs: [
      {
        question: "How do I appear in 'best [service] near me' AI queries?",
        answer: "Ensure complete local business data, strong reviews, clear service descriptions, and locally-relevant content. AI combines these signals for local recommendations.",
      },
      {
        question: "Do reviews on Google help AI visibility?",
        answer: "Yes. AI systems learn from reviews across platforms. Google reviews are particularly valuable because Google's data informs many AI systems.",
      },
      {
        question: "How important is website content for local AI visibility?",
        answer: "Very important. While business data gets you in the consideration set, website content helps AI understand your services, differentiation, and expertise for accurate recommendations.",
      },
    ],
    keywords: ["local business AI visibility", "local AI optimization", "local SEO for AI", "small business AI marketing"],
    category: "strategies",
    lastUpdated: "2026-02-01",
  },
  {
    slug: "ai-visibility-courses",
    title: "Best AI Visibility Courses and Training",
    headline: "Top AI Visibility Courses and Training Programs for 2026",
    description: "Curated list of the best courses and training programs for learning AI visibility optimization.",
    intro: "AI visibility is an emerging discipline, and quality education resources are essential for building expertise. This guide covers the best courses, certifications, and training programs for mastering AI visibility optimization.",
    methodology: "We evaluated courses based on curriculum comprehensiveness, instructor credentials, practical applicability, student outcomes, and value for investment. We prioritized programs with hands-on components and current content.",
    items: [
      {
        name: "AdsX AI Visibility Certification",
        description: "Comprehensive certification program covering all aspects of AI visibility optimization. Includes practical exercises and real-world case studies.",
        highlight: "Most comprehensive AI visibility certification available",
        link: "/contact",
      },
      {
        name: "HubSpot AI Marketing Course",
        description: "Free introductory course covering AI's impact on marketing, including visibility considerations. Good starting point for marketers.",
        highlight: "Free, good for fundamentals",
      },
      {
        name: "Search Engine Journal AI SEO Training",
        description: "Course covering the intersection of SEO and AI, including visibility optimization strategies. Taught by industry practitioners.",
        highlight: "Strong SEO-to-AI bridge content",
      },
      {
        name: "Coursera AI for Marketing",
        description: "Academic-style course covering AI fundamentals for marketers. Provides theoretical foundation for understanding AI systems.",
        highlight: "Strong theoretical foundation",
      },
      {
        name: "LinkedIn Learning AI Marketing Paths",
        description: "Collection of courses on AI marketing topics. Flexible learning paths for different skill levels.",
        highlight: "Self-paced, LinkedIn credential",
      },
      {
        name: "Content Marketing Institute AI Workshop",
        description: "Intensive workshop on AI-optimized content creation. Practical focus on content that AI systems value.",
        highlight: "Content-focused AI training",
      },
    ],
    considerations: [
      "Check course update dates—AI visibility is evolving rapidly",
      "Look for courses with practical, hands-on components",
      "Consider your current skill level when choosing",
      "Instructor credentials in AI visibility specifically matter",
      "Community and ongoing support add significant value",
    ],
    faqs: [
      {
        question: "Do I need technical skills for AI visibility training?",
        answer: "Basic marketing and digital skills are sufficient for most courses. Technical courses exist for those wanting deeper understanding, but aren't required for effective optimization.",
      },
      {
        question: "How long does it take to learn AI visibility?",
        answer: "Fundamentals can be learned in a few weeks. Mastery takes months of practice and testing. The field is evolving, so continuous learning is essential.",
      },
      {
        question: "Are AI visibility certifications worth it?",
        answer: "Quality certifications demonstrate expertise to employers and clients. Look for certifications with practical components and industry recognition.",
      },
    ],
    keywords: ["AI visibility courses", "AI marketing training", "ChatGPT optimization course", "AI SEO certification"],
    category: "resources",
    lastUpdated: "2026-02-01",
  },
  {
    slug: "ai-visibility-books",
    title: "Best AI Visibility Books and Resources",
    headline: "Essential AI Visibility Books and Reading for 2026",
    description: "Curated reading list for understanding AI visibility, from foundational concepts to advanced strategies.",
    intro: "Building deep expertise in AI visibility requires understanding both the technical and strategic dimensions. This reading list covers essential books and resources for developing comprehensive AI visibility knowledge.",
    methodology: "We selected resources based on relevance to AI visibility, author expertise, practical applicability, and enduring value. We balanced technical understanding with strategic application.",
    items: [
      {
        name: "The AI-First Brand (Coming 2026)",
        description: "Comprehensive guide to building brands optimized for AI-driven discovery. Covers strategy, tactics, and measurement.",
        highlight: "First dedicated book on AI brand visibility",
      },
      {
        name: "Attention Factory by Matthew Brennan",
        description: "Deep dive into how AI recommendation systems shape content distribution. Provides foundation for understanding AI recommendations.",
        highlight: "Foundational understanding of AI recommendations",
      },
      {
        name: "The Alignment Problem by Brian Christian",
        description: "Explores how AI systems learn and make decisions. Essential context for understanding AI behavior.",
        highlight: "Deep AI system understanding",
      },
      {
        name: "Marketing Artificial Intelligence by Paul Roetzer",
        description: "Covers AI's impact on marketing broadly, including visibility considerations. Good for marketing context.",
        highlight: "Marketing-focused AI perspective",
      },
      {
        name: "SEO 2026 by Adam Clarke",
        description: "Annual SEO guide with growing AI visibility coverage. Bridges traditional SEO with emerging AI considerations.",
        highlight: "SEO-to-AI transition guidance",
      },
      {
        name: "Building a StoryBrand by Donald Miller",
        description: "While not AI-specific, principles of clear brand messaging directly apply to AI visibility.",
        highlight: "Clear messaging fundamentals",
      },
      {
        name: "OpenAI and Anthropic Documentation",
        description: "Primary sources for understanding how major AI systems work. Essential for technical understanding.",
        highlight: "Primary source knowledge",
      },
    ],
    considerations: [
      "AI visibility is evolving—supplement books with current articles and research",
      "Technical AI understanding helps even for non-technical practitioners",
      "Classic marketing principles still apply in AI contexts",
      "Follow thought leaders and researchers for latest developments",
      "Combine reading with hands-on practice and testing",
    ],
    faqs: [
      {
        question: "Are there books specifically about AI visibility?",
        answer: "The field is new, so dedicated books are just emerging. Currently, combining general AI books with marketing and SEO resources provides the best foundation.",
      },
      {
        question: "How do I stay current on AI visibility?",
        answer: "Follow industry publications, researcher blogs, and platform announcements. Join communities focused on AI marketing. The field moves too fast for books alone.",
      },
      {
        question: "What's the minimum reading to get started?",
        answer: "Start with one AI fundamentals resource and one marketing strategy resource. Then add depth based on your specific needs and interests.",
      },
    ],
    keywords: ["AI visibility books", "AI marketing books", "LLM optimization reading", "AI brand books"],
    category: "resources",
    lastUpdated: "2026-02-01",
  },
  {
    slug: "ai-visibility-metrics",
    title: "Best AI Visibility Metrics to Track",
    headline: "Essential AI Visibility Metrics for 2026",
    description: "The key metrics every brand should track to measure and improve AI visibility performance.",
    intro: "What gets measured gets managed. AI visibility requires new metrics beyond traditional SEO and marketing KPIs. This guide covers the essential metrics for tracking AI visibility performance and demonstrating ROI.",
    methodology: "These metrics are derived from enterprise AI visibility programs, refined through testing across industries and business models. We prioritized metrics that are measurable, actionable, and connected to business outcomes.",
    items: [
      {
        name: "Recommendation Rate",
        description: "Percentage of relevant queries where your brand is recommended. The primary measure of AI visibility.",
        highlight: "Core AI visibility metric",
      },
      {
        name: "Mention Accuracy",
        description: "How accurately AI describes your brand, products, and value proposition. Accuracy affects conversion.",
        highlight: "Quality of AI representation",
      },
      {
        name: "Sentiment Score",
        description: "Whether AI discusses your brand positively, negatively, or neutrally. Affects recommendation confidence.",
        highlight: "Qualitative visibility measure",
      },
      {
        name: "Share of Voice",
        description: "Your recommendation rate compared to competitors for the same queries. Competitive context.",
        highlight: "Relative visibility position",
      },
      {
        name: "Query Coverage",
        description: "Number and types of queries where you appear. Breadth of visibility.",
        highlight: "Visibility footprint size",
      },
      {
        name: "Feature Mention Rate",
        description: "How often key features and differentiators are included in AI responses about you.",
        highlight: "Differentiation effectiveness",
      },
      {
        name: "AI Referral Traffic",
        description: "Traffic coming from AI platforms. Direct business impact measure.",
        highlight: "Traffic impact metric",
      },
      {
        name: "AI Conversion Rate",
        description: "Conversion rate of AI-referred traffic. Quality and intent signal.",
        highlight: "Business outcome metric",
      },
    ],
    considerations: [
      "Start with recommendation rate and accuracy before adding complexity",
      "Track metrics across multiple AI platforms for comprehensive view",
      "Benchmark against competitors for context",
      "Connect visibility metrics to business outcomes",
      "Set up consistent measurement methodology for trending over time",
    ],
    faqs: [
      {
        question: "How do I measure AI referral traffic?",
        answer: "Use a combination of referrer analysis, UTM tracking where possible, and customer surveys. Direct attribution is evolving but imperfect; triangulate multiple signals.",
      },
      {
        question: "What's a good recommendation rate?",
        answer: "It varies by industry and competition. Aim to appear in 50%+ of relevant category queries. For branded queries, target 90%+ accuracy.",
      },
      {
        question: "How often should I measure AI visibility metrics?",
        answer: "Track key metrics weekly, conduct comprehensive audits monthly. Increase frequency during active optimization campaigns.",
      },
    ],
    keywords: ["AI visibility metrics", "AI marketing KPIs", "ChatGPT performance metrics", "AI visibility measurement"],
    category: "guides",
    lastUpdated: "2026-02-01",
  },
  {
    slug: "ai-visibility-mistakes",
    title: "AI Visibility Mistakes to Avoid",
    headline: "Common AI Visibility Mistakes and How to Avoid Them",
    description: "Learn from common mistakes brands make when optimizing for AI visibility and how to avoid them.",
    intro: "AI visibility optimization is new, and many brands make preventable mistakes. This guide covers the most common errors we see and how to avoid them, helping you optimize effectively from the start.",
    methodology: "These mistakes are compiled from our experience working with hundreds of brands, analyzing failed optimization attempts, and identifying patterns in what doesn't work for AI visibility.",
    items: [
      {
        name: "Treating AI Like Search Engines",
        description: "Applying SEO tactics directly to AI without understanding the differences. AI synthesizes information differently than search engines rank pages.",
        highlight: "Most common strategic mistake",
      },
      {
        name: "Ignoring Third-Party Presence",
        description: "Only optimizing owned content while ignoring reviews, mentions, and third-party sites that AI also learns from.",
        highlight: "Incomplete visibility approach",
      },
      {
        name: "Inconsistent Messaging",
        description: "Different messaging across touchpoints confuses AI about your actual positioning and capabilities.",
        highlight: "Creates AI confusion",
      },
      {
        name: "Optimizing for One AI Platform",
        description: "Focusing only on ChatGPT while ignoring Claude, Perplexity, and other platforms users switch between.",
        highlight: "Leaves visibility gaps",
      },
      {
        name: "Expecting Immediate Results",
        description: "AI systems update at different rates. Expecting overnight changes leads to premature strategy abandonment.",
        highlight: "Patience required",
      },
      {
        name: "Keyword Stuffing for AI",
        description: "Overloading content with keywords hoping AI will pick them up. AI evaluates comprehensiveness and value, not keyword density.",
        highlight: "Outdated tactic",
      },
      {
        name: "Ignoring Accuracy Issues",
        description: "Not monitoring and correcting inaccurate AI responses about your brand. Inaccuracies compound over time.",
        highlight: "Reputation risk",
      },
      {
        name: "No Measurement Framework",
        description: "Optimizing without tracking results. You can't improve what you don't measure.",
        highlight: "Flying blind",
      },
    ],
    considerations: [
      "Start with an audit of current AI visibility before optimization",
      "Build measurement infrastructure early in your optimization journey",
      "Take a comprehensive approach across owned and earned media",
      "Plan for multi-platform optimization from the start",
      "Set realistic timelines for seeing results",
    ],
    faqs: [
      {
        question: "How do I know if I'm making these mistakes?",
        answer: "Conduct an honest audit of your current approach. Are you measuring results? Covering multiple platforms? Addressing third-party content? If not, start there.",
      },
      {
        question: "What's the biggest mistake brands make?",
        answer: "Treating AI like search engines. The optimization approaches differ significantly, and SEO tactics don't transfer directly. Understanding this difference is foundational.",
      },
      {
        question: "How do I fix inaccurate AI responses about my brand?",
        answer: "Update your content to clearly state accurate information, correct inaccuracies in third-party sources where possible, and build new authoritative content that AI can learn from.",
      },
    ],
    keywords: ["AI visibility mistakes", "AI optimization errors", "ChatGPT marketing mistakes", "AI visibility problems"],
    category: "guides",
    lastUpdated: "2026-02-01",
  },
  {
    slug: "ai-visibility-roadmap",
    title: "AI Visibility Roadmap Template",
    headline: "Complete AI Visibility Roadmap for 2026",
    description: "Step-by-step roadmap for building comprehensive AI visibility from scratch.",
    intro: "Building AI visibility requires systematic effort across multiple dimensions. This roadmap provides a proven framework for establishing and growing your brand's presence across AI assistants, from initial audit through ongoing optimization.",
    methodology: "This roadmap is based on successful AI visibility programs across industries, refined through implementation experience. It's designed to be adaptable to different business sizes and resources.",
    items: [
      {
        name: "Phase 1: Audit and Baseline (Week 1-2)",
        description: "Assess current AI visibility across platforms. Document how AI discusses your brand, competitors, and category. Establish measurement baseline.",
        highlight: "Know where you're starting",
      },
      {
        name: "Phase 2: Foundation Optimization (Week 3-6)",
        description: "Optimize core website content for AI comprehension. Ensure clear value propositions, structured content, and comprehensive coverage.",
        highlight: "Fix the fundamentals",
      },
      {
        name: "Phase 3: Expand Presence (Week 7-10)",
        description: "Address third-party presence. Optimize profiles, encourage reviews, and build authoritative third-party content.",
        highlight: "Broaden your visibility footprint",
      },
      {
        name: "Phase 4: Competitive Positioning (Week 11-14)",
        description: "Develop comparison content, address competitive queries, and strengthen differentiation messaging.",
        highlight: "Win against alternatives",
      },
      {
        name: "Phase 5: Scale and Automate (Week 15-18)",
        description: "Implement ongoing monitoring, automate tracking, and establish optimization workflows for continuous improvement.",
        highlight: "Sustainable visibility program",
      },
      {
        name: "Phase 6: Measure and Report (Ongoing)",
        description: "Track key metrics, report on progress, and continuously refine strategy based on results.",
        highlight: "Prove and improve ROI",
      },
    ],
    considerations: [
      "Adapt timeline to your resources—faster with more resources, slower with constraints",
      "Phases can overlap; don't wait for perfection before progressing",
      "Quick wins in early phases build momentum and stakeholder support",
      "Plan for ongoing optimization—this isn't a one-time project",
      "Celebrate and communicate wins throughout the journey",
    ],
    faqs: [
      {
        question: "How long does it take to build strong AI visibility?",
        answer: "Initial improvements can be seen in 4-8 weeks. Strong, comprehensive visibility typically takes 4-6 months to establish. Ongoing optimization is continuous.",
      },
      {
        question: "What resources do I need for this roadmap?",
        answer: "At minimum: someone to own the initiative, content creation capability, and tools for monitoring. Larger programs benefit from dedicated resources and specialized tools.",
      },
      {
        question: "Can I skip phases if I'm already doing some optimization?",
        answer: "Start with the audit regardless—you may find gaps. Then focus effort on phases where you have the most opportunity based on audit findings.",
      },
    ],
    keywords: ["AI visibility roadmap", "AI optimization plan", "AI marketing strategy", "AI visibility implementation"],
    category: "guides",
    lastUpdated: "2026-02-01",
  },
  {
    slug: "ai-visibility-case-studies",
    title: "Best AI Visibility Case Studies",
    headline: "Inspiring AI Visibility Case Studies for 2026",
    description: "Collection of detailed case studies showing how brands achieved AI visibility success.",
    intro: "Learning from real examples accelerates AI visibility success. This collection features detailed case studies across industries, showing the strategies, tactics, and results of successful AI visibility programs.",
    methodology: "These case studies are selected based on documented results, replicable strategies, and diverse industry representation. We prioritized case studies with specific, measurable outcomes.",
    items: [
      {
        name: "DTC E-commerce Brand: 3x AI Recommendations",
        description: "How a $50M DTC brand increased AI recommendation rate from 22% to 67% in 4 months through content optimization and review strategy.",
        highlight: "E-commerce success story",
      },
      {
        name: "SaaS Startup: From Zero to Category Leader",
        description: "How a Series A SaaS company became the #1 AI-recommended solution in their niche through category positioning and content authority.",
        highlight: "SaaS category ownership",
      },
      {
        name: "Local Service Business: Dominating Local AI",
        description: "How a multi-location service business achieved 81% AI recommendation rate for local queries through systematic local optimization.",
        highlight: "Local business success",
      },
      {
        name: "Enterprise B2B: Winning Complex Purchase Decisions",
        description: "How an enterprise software company influenced AI recommendations in complex, multi-stakeholder purchase journeys.",
        highlight: "Enterprise B2B approach",
      },
      {
        name: "Consumer Brand: Competing with Category Giants",
        description: "How a challenger consumer brand achieved parity with industry leaders in AI recommendations through differentiation strategy.",
        highlight: "Challenger brand tactics",
      },
      {
        name: "Professional Services: Building Trust in AI",
        description: "How a professional services firm built AI visibility while maintaining authority and trust requirements.",
        highlight: "Services firm approach",
      },
    ],
    considerations: [
      "Adapt strategies to your specific context—no case study is directly replicable",
      "Focus on the principles and approach, not just the tactics",
      "Consider the resources available in each case study vs. your own",
      "Multiple case studies often provide complementary insights",
      "Document your own journey to learn and potentially share",
    ],
    faqs: [
      {
        question: "How applicable are case studies to my business?",
        answer: "Focus on transferable principles rather than exact tactics. Industry-matched case studies are helpful but not required—the underlying strategies often apply broadly.",
      },
      {
        question: "How do I verify case study claims?",
        answer: "Look for specific, measurable outcomes and detailed methodology. Be skeptical of vague claims or unrealistic timelines. Reach out to companies directly when possible.",
      },
      {
        question: "Where can I find more AI visibility case studies?",
        answer: "Check agency websites, marketing publications, and conference presentations. AdsX publishes detailed case studies regularly. The field is young, so quality case studies are still emerging.",
      },
    ],
    keywords: ["AI visibility case studies", "AI marketing examples", "ChatGPT optimization case study", "AI visibility success stories"],
    category: "resources",
    lastUpdated: "2026-02-01",
  },
  {
    slug: "ai-visibility-checklist",
    title: "Complete AI Visibility Checklist",
    headline: "The Complete AI Visibility Checklist for 2026",
    description: "Comprehensive checklist covering all aspects of AI visibility optimization.",
    intro: "This comprehensive checklist covers every aspect of AI visibility optimization. Use it to audit your current state, plan improvements, and ensure nothing falls through the cracks in your AI visibility program.",
    methodology: "This checklist synthesizes best practices from successful AI visibility programs across industries. It's designed to be comprehensive yet actionable, covering both quick wins and long-term optimization.",
    items: [
      {
        name: "Website Foundation",
        description: "Clear value proposition, structured content, comprehensive coverage, FAQ sections, accurate information, mobile optimization, fast loading.",
        highlight: "Content and technical basics",
      },
      {
        name: "Brand Messaging",
        description: "Consistent positioning, clear differentiation, feature-benefit alignment, audience clarity, voice consistency across channels.",
        highlight: "Messaging consistency",
      },
      {
        name: "Third-Party Presence",
        description: "Google Business Profile, industry directories, review platforms, social profiles, Wikipedia (if notable), news coverage.",
        highlight: "Off-site visibility",
      },
      {
        name: "Reviews and Social Proof",
        description: "Review generation strategy, response protocol, testimonial collection, case study development, rating optimization.",
        highlight: "Social proof signals",
      },
      {
        name: "Competitive Positioning",
        description: "Comparison content, competitive differentiation, alternative addressing, category content, positioning clarity.",
        highlight: "Win against competitors",
      },
      {
        name: "Technical Optimization",
        description: "Schema markup, structured data, crawlability, site architecture, internal linking, canonical tags.",
        highlight: "Technical foundation",
      },
      {
        name: "Monitoring and Measurement",
        description: "Query testing protocol, tracking tools, reporting framework, benchmark establishment, trend monitoring.",
        highlight: "Measurement infrastructure",
      },
      {
        name: "Ongoing Optimization",
        description: "Content update cadence, review response, coverage building, competitive monitoring, strategy refinement.",
        highlight: "Continuous improvement",
      },
    ],
    considerations: [
      "Work through the checklist systematically, not randomly",
      "Prioritize based on current gaps and quick wins",
      "Document your status on each item for tracking",
      "Revisit the checklist quarterly to catch new gaps",
      "Use the checklist to build your optimization roadmap",
    ],
    faqs: [
      {
        question: "How do I prioritize this checklist?",
        answer: "Start with the foundation (website, messaging) before expanding to third-party and competitive elements. Within each section, prioritize items with the largest current gaps.",
      },
      {
        question: "How often should I review this checklist?",
        answer: "Do a comprehensive review quarterly. More frequent checks on high-priority items or during active optimization periods.",
      },
      {
        question: "Do I need to complete everything on this checklist?",
        answer: "Not necessarily. Focus on items most relevant to your business and where you have the largest opportunities. Some items may not apply to every business.",
      },
    ],
    keywords: ["AI visibility checklist", "AI optimization checklist", "ChatGPT marketing checklist", "AI visibility audit"],
    category: "guides",
    lastUpdated: "2026-02-01",
  },
];

/**
 * Get all curated lists
 */
export function getAllLists(): CuratedList[] {
  return curatedLists;
}

/**
 * Get a specific list by slug
 */
export function getListBySlug(slug: string): CuratedList | undefined {
  return curatedLists.find((l) => l.slug === slug);
}

/**
 * Get all list slugs
 */
export function getAllListSlugs(): string[] {
  return curatedLists.map((l) => l.slug);
}

/**
 * Get lists by category
 */
export function getListsByCategory(
  category: CuratedList["category"]
): CuratedList[] {
  return curatedLists.filter((l) => l.category === category);
}

/**
 * Get list categories with counts
 */
export function getListCategories(): { slug: string; name: string; count: number }[] {
  const categoryNames: Record<CuratedList["category"], string> = {
    tools: "Tools & Software",
    strategies: "Strategies",
    resources: "Resources",
    guides: "Guides",
  };

  const counts: Record<string, number> = {};
  for (const list of curatedLists) {
    counts[list.category] = (counts[list.category] || 0) + 1;
  }

  return Object.entries(categoryNames).map(([slug, name]) => ({
    slug,
    name,
    count: counts[slug] || 0,
  }));
}
