/**
 * AI Platform data for programmatic SEO
 * Each platform generates a dedicated page at /platforms/[platform]
 */

export interface PlatformFeature {
  feature: string;
  description: string;
}

export interface OptimizationStrategy {
  strategy: string;
  explanation: string;
}

export interface PlatformFAQ {
  question: string;
  answer: string;
}

export interface Platform {
  slug: string;
  name: string;
  company: string;
  headline: string;
  description: string;
  overview: string;
  userBase: string;
  whyItMatters: string;
  keyFeatures: PlatformFeature[];
  optimizationStrategies: OptimizationStrategy[];
  audienceProfile: string;
  visibilityImportance: "critical" | "high" | "medium";
  stats: { value: string; label: string }[];
  faqs: PlatformFAQ[];
  keywords: string[];
}

export const platforms: Platform[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    company: "OpenAI",
    headline: "AI Visibility for ChatGPT",
    description:
      "Get your brand recommended by ChatGPT, the world's most popular AI assistant with 200M+ weekly active users. We help brands appear when users ask ChatGPT for recommendations in your category.",
    overview:
      "ChatGPT is the world's leading AI assistant, created by OpenAI and powered by their GPT-4 language model. Since its launch in November 2022, ChatGPT has transformed how people research, learn, and make decisions. With over 200 million weekly active users, ChatGPT has become a primary touchpoint for product recommendations, service comparisons, and purchase research. Users ask ChatGPT questions they once typed into Google—making ChatGPT visibility essential for brands that want to be discovered.",
    userBase:
      "ChatGPT's user base spans professionals, students, developers, and general consumers. Usage is particularly strong among tech-forward professionals, researchers, and knowledge workers. Enterprise adoption is accelerating with ChatGPT Enterprise, bringing AI assistance into corporate workflows. The platform sees especially high usage for product research, software recommendations, and comparison shopping.",
    whyItMatters:
      "ChatGPT's massive user base means millions of potential customers are asking it for recommendations in your category every day. When a user asks 'What's the best CRM for startups?' or 'Compare email marketing tools,' your brand needs to be in that answer. ChatGPT visibility is often the highest-impact AI visibility investment due to the platform's market-leading position.",
    keyFeatures: [
      {
        feature: "Conversational Interface",
        description:
          "Users have natural conversations, asking follow-up questions and getting refined recommendations—more opportunities for brand mentions.",
      },
      {
        feature: "Web Browsing (Plus/Enterprise)",
        description:
          "ChatGPT can search the web for current information, making your website content directly accessible for recent queries.",
      },
      {
        feature: "Memory",
        description:
          "ChatGPT remembers context across conversations, meaning positive brand impressions can influence future recommendations.",
      },
      {
        feature: "Custom GPTs",
        description:
          "Users create specialized GPTs for specific tasks, creating additional visibility opportunities in niche use cases.",
      },
    ],
    optimizationStrategies: [
      {
        strategy: "Build comprehensive brand presence",
        explanation:
          "ChatGPT's training data includes web content, reviews, and discussions. Strong presence across these sources improves visibility.",
      },
      {
        strategy: "Optimize for common query patterns",
        explanation:
          "Understand how users phrase questions in your category and ensure your content addresses these patterns.",
      },
      {
        strategy: "Ensure website crawlability",
        explanation:
          "GPTBot crawls websites for training data. Ensure your site is accessible and well-structured for AI crawlers.",
      },
      {
        strategy: "Build authority signals",
        explanation:
          "ChatGPT considers reputation signals. Reviews, coverage, and authority content improve recommendation likelihood.",
      },
    ],
    audienceProfile:
      "ChatGPT users skew younger and more tech-savvy than the general population, but adoption is broadening rapidly. Professionals use it for work research, students for learning, and consumers for purchase decisions. The platform is particularly strong for B2B software research and considered consumer purchases.",
    visibilityImportance: "critical",
    stats: [
      { value: "200M+", label: "weekly active users" },
      { value: "#1", label: "most used AI assistant globally" },
      { value: "4.2x", label: "higher conversion from AI referrals vs ads" },
    ],
    faqs: [
      {
        question: "How do I get ChatGPT to recommend my brand?",
        answer:
          "ChatGPT bases recommendations on its training data and browsing results. We optimize your digital presence across sources ChatGPT learns from, improving recommendation likelihood.",
      },
      {
        question: "Can I pay for ChatGPT placement?",
        answer:
          "Currently, ChatGPT doesn't offer paid placement. Visibility is earned through optimization of your digital presence and brand signals.",
      },
      {
        question: "How quickly can I see ChatGPT visibility results?",
        answer:
          "Most brands see measurable improvements within 4-8 weeks, with continued growth as optimization compounds over time.",
      },
      {
        question: "Does ChatGPT know about my company?",
        answer:
          "It depends on your digital presence. We can audit your ChatGPT visibility to show exactly how you currently appear and where opportunities exist.",
      },
      {
        question: "How often does ChatGPT update its knowledge?",
        answer:
          "ChatGPT's training data has periodic updates, and the browsing feature accesses current information. We optimize for both training data presence and real-time visibility.",
      },
    ],
    keywords: [
      "ChatGPT visibility",
      "ChatGPT optimization",
      "ChatGPT marketing",
      "get recommended by ChatGPT",
      "ChatGPT brand visibility",
    ],
  },
  {
    slug: "claude",
    name: "Claude",
    company: "Anthropic",
    headline: "AI Visibility for Claude",
    description:
      "Get your brand recommended by Claude, Anthropic's AI assistant known for thoughtful, nuanced responses. We help brands appear when professionals and researchers ask Claude for recommendations.",
    overview:
      "Claude is an AI assistant created by Anthropic, founded by former OpenAI researchers with a focus on AI safety. Claude is known for providing thoughtful, nuanced, and balanced responses. The platform has gained particular popularity among professionals, researchers, and enterprise users who value careful analysis over quick answers. Claude's reputation for helpfulness and accuracy makes its recommendations particularly influential.",
    userBase:
      "Claude's user base skews toward professionals, developers, researchers, and enterprise users. The platform is popular in industries like finance, healthcare, and technology where accuracy and nuance are valued. Many businesses use Claude through APIs for customer-facing applications, extending its reach. Claude's professional user base makes it especially important for B2B visibility.",
    whyItMatters:
      "Claude's professional user base includes decision-makers, researchers, and procurement professionals—exactly the audience that influences B2B purchasing decisions. When these users ask Claude for software recommendations or vendor comparisons, being visible can directly impact your pipeline. Claude's reputation for thoughtful responses means its recommendations carry significant weight.",
    keyFeatures: [
      {
        feature: "Long Context Window",
        description:
          "Claude can process very long documents, making it popular for analyzing proposals, contracts, and detailed research.",
      },
      {
        feature: "Nuanced Responses",
        description:
          "Claude provides balanced, thoughtful answers that consider multiple perspectives—users trust its recommendations.",
      },
      {
        feature: "Enterprise Focus",
        description:
          "Claude for Enterprise brings AI into corporate workflows, reaching professional decision-makers.",
      },
      {
        feature: "Developer Popularity",
        description:
          "Claude's API is popular among developers building AI applications, extending brand exposure.",
      },
    ],
    optimizationStrategies: [
      {
        strategy: "Focus on professional and B2B content",
        explanation:
          "Claude's professional user base means B2B-focused content is particularly important for visibility.",
      },
      {
        strategy: "Emphasize accuracy and authority",
        explanation:
          "Claude values authoritative sources. Ensure your content demonstrates expertise and accuracy.",
      },
      {
        strategy: "Build presence in professional communities",
        explanation:
          "Claude learns from professional sources. Visibility in industry publications and professional forums helps.",
      },
      {
        strategy: "Optimize for comparison queries",
        explanation:
          "Professionals often ask Claude for vendor comparisons. Ensure your competitive positioning is clear.",
      },
    ],
    audienceProfile:
      "Claude users are typically more senior, more technical, and more deliberate in their research than average AI users. They value nuance over speed and are often evaluating significant purchases or decisions. This makes Claude particularly important for B2B brands and high-consideration products.",
    visibilityImportance: "high",
    stats: [
      { value: "Growing", label: "rapidly among professionals" },
      { value: "Top 3", label: "AI assistant for enterprise" },
      { value: "Higher", label: "conversion from professional users" },
    ],
    faqs: [
      {
        question: "Why is Claude important for B2B visibility?",
        answer:
          "Claude's professional user base includes decision-makers who influence purchasing. Being visible when they research options directly impacts pipeline.",
      },
      {
        question: "How is Claude different from ChatGPT?",
        answer:
          "Claude is known for more nuanced, careful responses. It's particularly popular among professionals who value accuracy over speed.",
      },
      {
        question: "Does Claude require different optimization than ChatGPT?",
        answer:
          "Core principles overlap, but Claude's professional audience means B2B content and authority signals are especially important.",
      },
      {
        question: "Can Claude access current information about my company?",
        answer:
          "Claude has a knowledge cutoff but can be provided with current documents. We optimize for both training data and real-time contexts.",
      },
      {
        question: "How do I know if I'm visible in Claude?",
        answer:
          "We test Claude with relevant queries to assess your current visibility and identify optimization opportunities.",
      },
    ],
    keywords: [
      "Claude AI visibility",
      "Claude optimization",
      "Anthropic Claude marketing",
      "Claude brand visibility",
      "Claude B2B visibility",
    ],
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    company: "Perplexity AI",
    headline: "AI Visibility for Perplexity",
    description:
      "Get your brand cited by Perplexity, the AI-powered answer engine that searches the web in real-time. We help brands appear in Perplexity's sourced responses.",
    overview:
      "Perplexity is an AI-powered answer engine that combines large language model capabilities with real-time web search. Unlike ChatGPT, Perplexity actively searches the internet to provide current information with source citations. This makes Perplexity particularly important for visibility because your current content can appear directly in responses, not just information from training data. Perplexity is growing rapidly among users who want sourced, verifiable information.",
    userBase:
      "Perplexity's user base includes researchers, professionals, and information-seekers who value sourced, current information. The platform is popular among users who want to verify AI responses with actual sources. Enterprise adoption is growing for research and due diligence use cases. Perplexity Pro users represent a highly engaged segment.",
    whyItMatters:
      "Perplexity's real-time search capability means your current content can appear in responses immediately—you don't have to wait for training data updates. When users ask Perplexity for product comparisons or recommendations, well-optimized content can be cited directly. The source citations also drive traffic, making Perplexity a more measurable AI visibility channel.",
    keyFeatures: [
      {
        feature: "Real-Time Web Search",
        description:
          "Perplexity searches the web to answer queries, meaning your current content can appear immediately.",
      },
      {
        feature: "Source Citations",
        description:
          "Responses include source links, driving traffic to cited content—measurable AI visibility.",
      },
      {
        feature: "Focus Mode",
        description:
          "Users can focus searches on specific source types (academic, news, etc.), creating targeted visibility opportunities.",
      },
      {
        feature: "Perplexity Pro",
        description:
          "Pro users have access to advanced features and are often researching significant decisions.",
      },
    ],
    optimizationStrategies: [
      {
        strategy: "Optimize for crawlability",
        explanation:
          "Perplexity needs to find and extract your content. Ensure your site is fast, crawlable, and well-structured.",
      },
      {
        strategy: "Create citation-worthy content",
        explanation:
          "Perplexity cites sources. Create authoritative content that's worth citing—data, comparisons, comprehensive guides.",
      },
      {
        strategy: "Maintain current content",
        explanation:
          "Perplexity accesses current information. Keep content updated to appear in real-time searches.",
      },
      {
        strategy: "Structure for extraction",
        explanation:
          "Format content so Perplexity can easily extract and present key information.",
      },
    ],
    audienceProfile:
      "Perplexity users value accuracy and sources. They're often researching significant decisions and want verifiable information. The audience skews professional and research-oriented, with high intent and engagement.",
    visibilityImportance: "high",
    stats: [
      { value: "Fastest growing", label: "AI search platform" },
      { value: "Real-time", label: "content visibility possible" },
      { value: "Direct traffic", label: "from source citations" },
    ],
    faqs: [
      {
        question: "How is Perplexity different from ChatGPT?",
        answer:
          "Perplexity searches the web in real-time and cites sources. Your current content can appear immediately, unlike training-data-dependent platforms.",
      },
      {
        question: "How quickly can I appear in Perplexity?",
        answer:
          "Since Perplexity uses real-time search, optimized content can appear in responses quickly—often within days of optimization.",
      },
      {
        question: "Does Perplexity drive traffic?",
        answer:
          "Yes. Perplexity includes source citations, meaning users can click through to your content. This makes Perplexity uniquely measurable.",
      },
      {
        question: "What content does Perplexity prefer to cite?",
        answer:
          "Perplexity cites authoritative, well-structured content that directly answers queries. Comprehensive guides, data, and comparisons perform well.",
      },
      {
        question: "Should I prioritize Perplexity over ChatGPT?",
        answer:
          "Both are important. Perplexity offers faster results and measurable traffic; ChatGPT has a larger user base. We optimize for both.",
      },
    ],
    keywords: [
      "Perplexity visibility",
      "Perplexity optimization",
      "Perplexity AI marketing",
      "Perplexity citation",
      "Perplexity SEO",
    ],
  },
  {
    slug: "gemini",
    name: "Gemini",
    company: "Google",
    headline: "AI Visibility for Google Gemini",
    description:
      "Get your brand visible in Google Gemini, integrated across Google Search and the Google ecosystem. We help brands appear in Gemini's AI-powered responses.",
    overview:
      "Gemini is Google's AI assistant and family of language models, integrated across Google's massive ecosystem including Search, Workspace, Android, and more. Gemini represents Google's response to ChatGPT and is rapidly becoming how billions of Google users interact with AI. The integration with Google Search means Gemini visibility increasingly overlaps with traditional SEO, while the broader ecosystem creates AI touchpoints across productivity and mobile experiences.",
    userBase:
      "Gemini's potential user base is enormous—essentially everyone who uses Google products. Integration with Search means billions of potential users. Workspace integration reaches hundreds of millions of professionals. Android integration brings Gemini to billions of mobile users. This makes Gemini visibility increasingly important for any brand.",
    whyItMatters:
      "Google's reach means Gemini will touch more users than any other AI assistant. As AI becomes more integrated with Google Search, the line between SEO and AI visibility blurs. Brands that optimize for Gemini now will be positioned as Google continues this integration. The potential audience makes Gemini visibility strategically important.",
    keyFeatures: [
      {
        feature: "Search Integration",
        description:
          "Gemini provides AI answers directly in Google Search, blending with traditional results.",
      },
      {
        feature: "Workspace Integration",
        description:
          "Gemini in Google Workspace reaches professionals using Docs, Sheets, Gmail, and more.",
      },
      {
        feature: "Android Integration",
        description:
          "Gemini on Android devices provides AI assistance to billions of mobile users.",
      },
      {
        feature: "Multimodal Capabilities",
        description:
          "Gemini can process images, video, and audio, creating diverse visibility opportunities.",
      },
    ],
    optimizationStrategies: [
      {
        strategy: "Leverage existing SEO",
        explanation:
          "Gemini's Google integration means SEO signals matter. Strong organic presence supports Gemini visibility.",
      },
      {
        strategy: "Optimize Google Business Profile",
        explanation:
          "For local businesses, Google Business Profile data feeds Gemini responses.",
      },
      {
        strategy: "Build Knowledge Graph presence",
        explanation:
          "Google's Knowledge Graph informs Gemini. Ensure your brand has strong knowledge graph representation.",
      },
      {
        strategy: "Implement structured data",
        explanation:
          "Schema markup helps Google understand your content, benefiting both Search and Gemini.",
      },
    ],
    audienceProfile:
      "Gemini's audience is essentially Google's audience—everyone. This includes professionals in Workspace, consumers on Android, and searchers on Google.com. The breadth of reach makes Gemini optimization important for brands of all types.",
    visibilityImportance: "critical",
    stats: [
      { value: "Billions", label: "of potential users via Google" },
      { value: "Integrated", label: "with Google Search" },
      { value: "Growing", label: "Workspace and Android adoption" },
    ],
    faqs: [
      {
        question: "How does Gemini relate to Google Search?",
        answer:
          "Gemini is increasingly integrated with Google Search, providing AI-generated answers alongside traditional results. SEO and Gemini visibility are converging.",
      },
      {
        question: "Does SEO help with Gemini visibility?",
        answer:
          "Yes. Google's SEO signals inform Gemini. Strong organic presence supports visibility in Gemini's AI responses.",
      },
      {
        question: "How is Gemini different from ChatGPT?",
        answer:
          "Gemini is integrated throughout Google's ecosystem—Search, Workspace, Android. It's becoming the AI layer across Google products.",
      },
      {
        question: "Should I optimize for Gemini specifically?",
        answer:
          "Yes. While SEO helps, Gemini-specific optimization ensures visibility as Google continues AI integration.",
      },
      {
        question: "How important will Gemini be?",
        answer:
          "Given Google's reach, Gemini will likely become the most widely-encountered AI assistant. Early optimization is strategically valuable.",
      },
    ],
    keywords: [
      "Google Gemini visibility",
      "Gemini optimization",
      "Gemini AI marketing",
      "Google AI visibility",
      "Gemini SEO",
    ],
  },
  {
    slug: "copilot",
    name: "Microsoft Copilot",
    company: "Microsoft",
    headline: "AI Visibility for Microsoft Copilot",
    description:
      "Get your brand visible in Microsoft Copilot, integrated across Windows, Office 365, and Bing. We help B2B brands appear in Copilot's professional-focused responses.",
    overview:
      "Microsoft Copilot is an AI assistant integrated throughout Microsoft's ecosystem—Windows, Microsoft 365 (Word, Excel, PowerPoint, Outlook), Edge browser, and Bing search. Powered by OpenAI's technology with Microsoft-specific training and integration, Copilot brings AI assistance into the daily workflows of hundreds of millions of professionals. For B2B brands, Copilot visibility means being present in the tools decision-makers use every day.",
    userBase:
      "Copilot's user base is primarily professionals and enterprise users—hundreds of millions of Microsoft 365 subscribers, Windows users, and Edge/Bing users. The platform is particularly strong in enterprise environments where Microsoft dominates. This makes Copilot especially important for B2B visibility, reaching professionals during their workday.",
    whyItMatters:
      "Microsoft's dominance in enterprise software means Copilot reaches professionals when they're working—researching vendors, comparing products, and making decisions. When an employee asks Copilot about software options in Excel or while browsing in Edge, B2B brands need to be visible. Copilot's workplace integration creates uniquely valuable visibility opportunities.",
    keyFeatures: [
      {
        feature: "Microsoft 365 Integration",
        description:
          "Copilot in Word, Excel, PowerPoint, and Outlook reaches professionals during work tasks.",
      },
      {
        feature: "Bing Integration",
        description:
          "Copilot powers AI features in Bing, reaching searchers with AI-enhanced results.",
      },
      {
        feature: "Windows Integration",
        description:
          "Copilot in Windows provides AI assistance across the operating system.",
      },
      {
        feature: "Enterprise Features",
        description:
          "Microsoft 365 Copilot for enterprise brings AI to corporate workflows with security features.",
      },
    ],
    optimizationStrategies: [
      {
        strategy: "Focus on B2B content",
        explanation:
          "Copilot's professional user base makes B2B-focused content and positioning particularly important.",
      },
      {
        strategy: "Optimize for Bing",
        explanation:
          "Copilot uses Bing for search. Bing optimization supports Copilot visibility.",
      },
      {
        strategy: "Build professional authority",
        explanation:
          "Visibility in professional sources, industry publications, and enterprise contexts helps.",
      },
      {
        strategy: "Address enterprise use cases",
        explanation:
          "Content addressing enterprise needs and concerns performs well in professional contexts.",
      },
    ],
    audienceProfile:
      "Copilot users are predominantly professionals using Microsoft products for work. This includes everyone from individual contributors to executives across industries. The enterprise focus makes Copilot particularly important for B2B brands targeting business buyers.",
    visibilityImportance: "high",
    stats: [
      { value: "400M+", label: "Microsoft 365 subscribers" },
      { value: "1B+", label: "Windows users" },
      { value: "Enterprise", label: "decision-makers reached" },
    ],
    faqs: [
      {
        question: "Why is Copilot important for B2B?",
        answer:
          "Copilot is integrated into Microsoft 365, reaching professionals during work. When they research vendors or products, B2B brands need visibility.",
      },
      {
        question: "How does Copilot relate to ChatGPT?",
        answer:
          "Copilot uses OpenAI's technology but is integrated into Microsoft products. It may have different training data and behaviors.",
      },
      {
        question: "Does Bing optimization help with Copilot?",
        answer:
          "Yes. Copilot uses Bing for search capabilities. Bing visibility supports Copilot visibility.",
      },
      {
        question: "How do I optimize for Copilot specifically?",
        answer:
          "Focus on B2B content, professional authority, and Bing presence. We test Copilot specifically as part of comprehensive optimization.",
      },
      {
        question: "Is Copilot different from other AI assistants?",
        answer:
          "Copilot's unique value is workplace integration. It reaches professionals during work tasks, creating distinct visibility opportunities.",
      },
    ],
    keywords: [
      "Microsoft Copilot visibility",
      "Copilot optimization",
      "Copilot B2B marketing",
      "Microsoft AI visibility",
      "Copilot enterprise",
    ],
  },
  {
    slug: "meta-ai",
    name: "Meta AI",
    company: "Meta",
    headline: "AI Visibility for Meta AI",
    description:
      "Get your brand visible in Meta AI, integrated across Facebook, Instagram, WhatsApp, and Messenger. We help consumer brands appear in Meta's AI assistant.",
    overview:
      "Meta AI is Meta's AI assistant powered by their Llama models, integrated across Facebook, Instagram, WhatsApp, and Messenger—platforms with billions of users. Meta AI brings AI assistance into social media and messaging, creating AI touchpoints in spaces where users spend significant time. For consumer brands, Meta AI visibility means being present where people connect and discover.",
    userBase:
      "Meta AI's potential reach includes Facebook (3B+ users), Instagram (2B+ users), WhatsApp (2B+ users), and Messenger users. The audience is broad and consumer-focused, spanning demographics worldwide. Social and messaging contexts create opportunities for lifestyle, entertainment, shopping, and discovery-focused visibility.",
    whyItMatters:
      "Meta's platforms are where people spend time socially—sharing, discovering, and discussing. When Meta AI is asked for recommendations in these contexts, consumer brands need visibility. The social context creates particularly valuable visibility for lifestyle, entertainment, food, travel, and shopping categories.",
    keyFeatures: [
      {
        feature: "Social Integration",
        description:
          "Meta AI is integrated into social feeds where users discover and discuss products.",
      },
      {
        feature: "Messaging Integration",
        description:
          "AI assistance in WhatsApp and Messenger reaches billions of messaging users.",
      },
      {
        feature: "Visual Discovery",
        description:
          "Integration with Instagram creates opportunities for visual product discovery.",
      },
      {
        feature: "Llama Models",
        description:
          "Powered by Meta's open Llama models, which are also used in many other applications.",
      },
    ],
    optimizationStrategies: [
      {
        strategy: "Build social presence",
        explanation:
          "Meta AI learns from social signals. Strong presence on Facebook and Instagram supports visibility.",
      },
      {
        strategy: "Focus on consumer contexts",
        explanation:
          "Meta's platforms are consumer-focused. Content addressing lifestyle, entertainment, and shopping performs well.",
      },
      {
        strategy: "Optimize for visual discovery",
        explanation:
          "Instagram's visual nature makes visual content optimization important for Meta AI.",
      },
      {
        strategy: "Engage authentically",
        explanation:
          "Social signals matter. Authentic engagement and positive social presence support visibility.",
      },
    ],
    audienceProfile:
      "Meta AI's audience is broad consumer—anyone using Meta's platforms. This includes diverse demographics across countries and interests. Social and messaging contexts make this platform particularly important for consumer brands, lifestyle products, and local businesses.",
    visibilityImportance: "medium",
    stats: [
      { value: "3B+", label: "Facebook users" },
      { value: "2B+", label: "Instagram users" },
      { value: "2B+", label: "WhatsApp users" },
    ],
    faqs: [
      {
        question: "How important is Meta AI for consumer brands?",
        answer:
          "Very important. Meta's platforms are where consumers spend time socially. Visibility in Meta AI reaches users in discovery contexts.",
      },
      {
        question: "Does social media presence affect Meta AI?",
        answer:
          "Yes. Meta AI considers social signals. Strong, authentic social presence supports visibility in their AI.",
      },
      {
        question: "How is Meta AI different from ChatGPT?",
        answer:
          "Meta AI is integrated into social and messaging contexts. The social environment creates different visibility opportunities.",
      },
      {
        question: "Is Meta AI global?",
        answer:
          "Meta's platforms are global with billions of users. Meta AI is being rolled out across their platforms worldwide.",
      },
      {
        question: "What categories perform well in Meta AI?",
        answer:
          "Consumer categories like lifestyle, entertainment, food, travel, and shopping align well with Meta's social context.",
      },
    ],
    keywords: [
      "Meta AI visibility",
      "Facebook AI marketing",
      "Instagram AI visibility",
      "Meta AI optimization",
      "social AI visibility",
    ],
  },
  {
    slug: "amazon-alexa",
    name: "Amazon Alexa",
    company: "Amazon",
    headline: "AI Visibility for Amazon Alexa",
    description:
      "Get your brand recommended by Alexa, Amazon's voice AI in hundreds of millions of devices. We help brands appear in Alexa's voice search and recommendations.",
    overview:
      "Amazon Alexa is the AI assistant powering Amazon Echo devices and integrated into hundreds of millions of smart home and automotive products. Alexa represents the voice-first AI interface, where users ask questions and make requests through natural speech. The platform is particularly important for shopping, local services, and smart home categories where voice queries are common.",
    userBase:
      "Alexa reaches users primarily through Echo devices in homes, but also in cars, headphones, and third-party devices. Users are typically consumers making voice queries for information, shopping, and home control. The platform over-indexes for shopping-related queries given Amazon's e-commerce focus.",
    whyItMatters:
      "Alexa's position in homes means it's often the first AI people ask when they have a quick question or need. Voice queries like 'Alexa, what's the best coffee maker?' create purchase-intent visibility opportunities. For products sold on Amazon, Alexa visibility directly impacts discoverability.",
    keyFeatures: [
      {
        feature: "Voice-First Interface",
        description:
          "Alexa is primarily voice-controlled, creating unique optimization considerations.",
      },
      {
        feature: "Shopping Integration",
        description:
          "Tight integration with Amazon shopping makes Alexa influential for product discovery.",
      },
      {
        feature: "Skills Ecosystem",
        description:
          "Alexa Skills create additional brand touchpoints and visibility opportunities.",
      },
      {
        feature: "Smart Home Hub",
        description:
          "As a smart home hub, Alexa has presence in daily home routines.",
      },
    ],
    optimizationStrategies: [
      {
        strategy: "Optimize Amazon presence",
        explanation:
          "Alexa draws from Amazon data. Strong Amazon product listings and reviews support visibility.",
      },
      {
        strategy: "Consider voice query patterns",
        explanation:
          "Voice queries differ from typed queries. Optimize for conversational, question-based queries.",
      },
      {
        strategy: "Build Alexa Skills",
        explanation:
          "For appropriate brands, Alexa Skills create direct voice presence.",
      },
      {
        strategy: "Focus on purchase-intent queries",
        explanation:
          "Alexa's shopping integration makes purchase-focused optimization particularly valuable.",
      },
    ],
    audienceProfile:
      "Alexa users are consumers who have adopted smart home technology. They tend to be Amazon shoppers who appreciate voice convenience. Queries often have shopping or local intent. The home context creates specific visibility opportunities.",
    visibilityImportance: "medium",
    stats: [
      { value: "100M+", label: "Alexa devices sold" },
      { value: "Voice-first", label: "AI interface in homes" },
      { value: "Shopping", label: "intent queries common" },
    ],
    faqs: [
      {
        question: "How does Alexa differ from ChatGPT?",
        answer:
          "Alexa is voice-first and tightly integrated with Amazon shopping. Optimization focuses on voice patterns and Amazon presence.",
      },
      {
        question: "Does Amazon product optimization help Alexa visibility?",
        answer:
          "Yes. Alexa draws from Amazon data. Strong product listings, reviews, and Amazon presence support Alexa visibility.",
      },
      {
        question: "What queries work well on Alexa?",
        answer:
          "Voice queries tend to be conversational questions. 'What's the best...' and shopping-related queries are common.",
      },
      {
        question: "Should I build an Alexa Skill?",
        answer:
          "For some brands, Skills create valuable direct presence. We can advise whether this makes sense for your category.",
      },
      {
        question: "Is Alexa important for non-product brands?",
        answer:
          "Less so than product brands, but local services and content brands can benefit from voice visibility.",
      },
    ],
    keywords: [
      "Alexa visibility",
      "Alexa optimization",
      "Amazon voice marketing",
      "Alexa brand visibility",
      "voice search optimization",
    ],
  },
  {
    slug: "apple-intelligence",
    name: "Apple Intelligence",
    company: "Apple",
    headline: "AI Visibility for Apple Intelligence",
    description:
      "Get your brand visible in Apple Intelligence, Apple's on-device AI integrated across iPhone, Mac, and iPad. We help brands appear in Apple's AI ecosystem.",
    overview:
      "Apple Intelligence is Apple's AI system integrated into iPhone, iPad, Mac, and other Apple devices. With over 2 billion active Apple devices, Apple Intelligence brings AI assistance to a massive, affluent user base. Apple's privacy-focused approach means some AI runs on-device, but integration with services creates visibility opportunities. As Apple expands AI features, visibility becomes increasingly important.",
    userBase:
      "Apple's user base is over 2 billion active devices, skewing toward more affluent consumers and creative professionals. Apple users often represent high-value customers across categories. The ecosystem includes iOS, macOS, watchOS, and more, creating multiple AI touchpoints.",
    whyItMatters:
      "Apple's affluent user base makes visibility valuable for premium brands. As Apple Intelligence expands, it will influence how billions of users discover and interact with brands. The integrated Apple ecosystem means visibility can span multiple device types and contexts.",
    keyFeatures: [
      {
        feature: "Device Integration",
        description:
          "Apple Intelligence is integrated into iPhone, iPad, Mac—devices users interact with constantly.",
      },
      {
        feature: "Siri Enhancement",
        description:
          "Apple Intelligence enhances Siri with more natural conversation and better understanding.",
      },
      {
        feature: "Privacy Focus",
        description:
          "Apple's privacy-first approach means some AI runs on-device, affecting how information flows.",
      },
      {
        feature: "Ecosystem Reach",
        description:
          "The Apple ecosystem creates AI touchpoints across devices and use cases.",
      },
    ],
    optimizationStrategies: [
      {
        strategy: "Optimize for Apple ecosystem",
        explanation:
          "App Store presence, Apple Maps, and Apple-specific integrations support visibility.",
      },
      {
        strategy: "Build app presence",
        explanation:
          "Apps are first-class citizens in Apple's ecosystem. Relevant apps support AI visibility.",
      },
      {
        strategy: "Optimize for Siri",
        explanation:
          "Siri integration and voice query optimization support Apple Intelligence visibility.",
      },
      {
        strategy: "Consider premium positioning",
        explanation:
          "Apple's affluent user base responds to premium positioning and quality signals.",
      },
    ],
    audienceProfile:
      "Apple users tend to be more affluent, often creative professionals or quality-focused consumers. They represent high-value customers across many categories. The demographic is particularly important for premium brands, creative tools, and lifestyle products.",
    visibilityImportance: "medium",
    stats: [
      { value: "2B+", label: "active Apple devices" },
      { value: "Premium", label: "user demographic" },
      { value: "Growing", label: "AI integration" },
    ],
    faqs: [
      {
        question: "How is Apple Intelligence different from ChatGPT?",
        answer:
          "Apple Intelligence is integrated into Apple devices and has a privacy-focused, on-device approach. It's about AI across the Apple ecosystem.",
      },
      {
        question: "Why is Apple's user base valuable?",
        answer:
          "Apple users tend to be more affluent and willing to pay for quality. They represent high-value customers for many categories.",
      },
      {
        question: "Does App Store presence help?",
        answer:
          "Yes. Apps are central to Apple's ecosystem. App Store presence and optimization support overall Apple visibility.",
      },
      {
        question: "How important is Apple Intelligence now?",
        answer:
          "Apple Intelligence is expanding. Early optimization positions you as Apple continues developing AI features.",
      },
      {
        question: "What categories benefit most from Apple visibility?",
        answer:
          "Premium brands, creative tools, productivity apps, and lifestyle products align well with Apple's user base.",
      },
    ],
    keywords: [
      "Apple Intelligence visibility",
      "Apple AI optimization",
      "Siri visibility",
      "Apple AI marketing",
      "iOS AI visibility",
    ],
  },
  {
    slug: "llama",
    name: "Llama (Open Source)",
    company: "Meta",
    headline: "AI Visibility for Llama-Powered Applications",
    description:
      "Get your brand visible across the ecosystem of applications powered by Meta's open-source Llama models. We help brands optimize for the growing Llama ecosystem.",
    overview:
      "Llama is Meta's open-source family of large language models, freely available for developers to build applications. Llama powers thousands of AI applications, chatbots, and services beyond Meta's own products. The open-source nature means Llama-based applications are everywhere—enterprise tools, consumer apps, and specialized assistants. Visibility in the Llama ecosystem means being present across this diverse landscape.",
    userBase:
      "Llama's user base is distributed across thousands of applications built on the models. This includes enterprise AI tools, consumer chatbots, industry-specific assistants, and research applications. Users may not know they're using Llama, but the model's ubiquity creates broad exposure.",
    whyItMatters:
      "As an open-source model, Llama powers a vast ecosystem of AI applications. Optimizing for how Llama understands your brand affects visibility across this entire ecosystem. Many companies build internal AI tools on Llama, making enterprise visibility particularly impacted.",
    keyFeatures: [
      {
        feature: "Open Source",
        description:
          "Llama's open nature means it powers thousands of diverse applications.",
      },
      {
        feature: "Enterprise Adoption",
        description:
          "Many companies use Llama for internal AI tools and applications.",
      },
      {
        feature: "Diverse Ecosystem",
        description:
          "Applications range from consumer chatbots to specialized industry tools.",
      },
      {
        feature: "Rapid Evolution",
        description:
          "New Llama versions and applications emerge frequently.",
      },
    ],
    optimizationStrategies: [
      {
        strategy: "Build broad digital presence",
        explanation:
          "Llama is trained on diverse web data. Comprehensive presence across sources supports visibility.",
      },
      {
        strategy: "Consider enterprise applications",
        explanation:
          "Many enterprise tools use Llama. B2B visibility efforts benefit the Llama ecosystem.",
      },
      {
        strategy: "Monitor ecosystem developments",
        explanation:
          "The Llama ecosystem evolves rapidly. Stay aware of new applications and opportunities.",
      },
      {
        strategy: "Ensure accurate brand information",
        explanation:
          "Consistent, accurate information helps Llama-based applications represent you correctly.",
      },
    ],
    audienceProfile:
      "Llama's distributed nature means the audience is diverse—whoever uses Llama-powered applications. This includes enterprise users of internal AI tools, consumers using Llama-based chatbots, and researchers using Llama for analysis. The ecosystem is broad and growing.",
    visibilityImportance: "medium",
    stats: [
      { value: "Thousands", label: "of applications powered by Llama" },
      { value: "Open source", label: "accessibility" },
      { value: "Growing", label: "enterprise adoption" },
    ],
    faqs: [
      {
        question: "How is Llama different from ChatGPT?",
        answer:
          "Llama is open-source, so it powers many different applications rather than one platform. Visibility in Llama affects a distributed ecosystem.",
      },
      {
        question: "Why does Llama ecosystem visibility matter?",
        answer:
          "Llama powers enterprise tools, chatbots, and specialized applications. Being well-represented in Llama benefits visibility across this ecosystem.",
      },
      {
        question: "How do I optimize for Llama?",
        answer:
          "Broad digital presence with accurate, consistent information helps. Llama learns from diverse sources like other LLMs.",
      },
      {
        question: "Are Llama applications identifiable?",
        answer:
          "Often not—users may not know they're using Llama. But the model's ubiquity makes optimization valuable regardless.",
      },
      {
        question: "Is Llama used by enterprises?",
        answer:
          "Yes, increasingly. Many companies build internal AI tools on Llama for privacy and control reasons.",
      },
    ],
    keywords: [
      "Llama visibility",
      "open source AI visibility",
      "Llama optimization",
      "Meta Llama marketing",
      "Llama ecosystem",
    ],
  },
  {
    slug: "ai-search-engines",
    name: "AI Search Engines",
    company: "Various",
    headline: "AI Visibility Across Search Engines",
    description:
      "Get your brand visible across the ecosystem of AI-powered search engines including Perplexity, You.com, and others. We optimize for the growing AI search landscape.",
    overview:
      "Beyond traditional search engines and major AI assistants, a growing ecosystem of AI-powered search engines is emerging. Platforms like Perplexity, You.com, Neeva (acquired by Snowflake), and others are reimagining search with AI. These platforms often provide more direct answers, cite sources, and offer different user experiences than Google. As users explore alternatives, visibility across AI search engines becomes important.",
    userBase:
      "AI search engine users tend to be early adopters, tech-savvy individuals, and users dissatisfied with traditional search. They're often looking for direct answers, better sourcing, or privacy-focused alternatives. The audience skews toward research-oriented queries and considered decisions.",
    whyItMatters:
      "The search landscape is fragmenting. Users now have multiple AI-powered options beyond Google. Being visible across this ecosystem ensures you reach users wherever they search. Many AI search engines cite sources, creating direct traffic opportunities.",
    keyFeatures: [
      {
        feature: "Direct Answers",
        description:
          "AI search engines provide synthesized answers rather than just links.",
      },
      {
        feature: "Source Citations",
        description:
          "Many cite sources, creating traffic opportunities for well-optimized content.",
      },
      {
        feature: "Alternative Audiences",
        description:
          "Users exploring beyond Google represent distinct and growing segments.",
      },
      {
        feature: "Specialized Features",
        description:
          "Different engines offer unique features—privacy, developer focus, research tools.",
      },
    ],
    optimizationStrategies: [
      {
        strategy: "Create citation-worthy content",
        explanation:
          "AI search engines cite sources. Authoritative, well-structured content gets cited.",
      },
      {
        strategy: "Ensure broad crawlability",
        explanation:
          "Various crawlers index for AI search. Ensure your content is accessible to all.",
      },
      {
        strategy: "Monitor emerging platforms",
        explanation:
          "New AI search engines launch regularly. Monitor and optimize for emerging players.",
      },
      {
        strategy: "Optimize for answer formats",
        explanation:
          "Structure content to be extractable as direct answers, not just searchable.",
      },
    ],
    audienceProfile:
      "AI search engine users are typically early adopters, researchers, and users seeking better search experiences. They value direct answers and sourced information. The audience is often higher-intent and more research-focused than average searchers.",
    visibilityImportance: "high",
    stats: [
      { value: "Growing", label: "alternative search usage" },
      { value: "Multiple", label: "platforms to optimize for" },
      { value: "Direct traffic", label: "from source citations" },
    ],
    faqs: [
      {
        question: "Which AI search engines matter most?",
        answer:
          "Perplexity is the clear leader. You.com and others have niche audiences. We prioritize based on your target market.",
      },
      {
        question: "Are these different from ChatGPT?",
        answer:
          "Yes. AI search engines are specifically designed for search and research, often with source citations and real-time information.",
      },
      {
        question: "Do AI search engines drive traffic?",
        answer:
          "Many do, through source citations. This makes them more measurable than other AI visibility channels.",
      },
      {
        question: "Should I optimize for all AI search engines?",
        answer:
          "We focus on those relevant to your audience. Core optimization principles apply broadly, with platform-specific adjustments.",
      },
      {
        question: "Will AI search engines replace Google?",
        answer:
          "Unlikely to fully replace, but capturing meaningful share. Multi-platform visibility is increasingly important.",
      },
    ],
    keywords: [
      "AI search engine visibility",
      "AI search optimization",
      "Perplexity SEO",
      "alternative search visibility",
      "AI search marketing",
    ],
  },
];

/**
 * Get all platforms for static generation
 */
export function getAllPlatforms(): Platform[] {
  return platforms;
}

/**
 * Get a specific platform by slug
 */
export function getPlatformBySlug(slug: string): Platform | undefined {
  return platforms.find((p) => p.slug === slug);
}

/**
 * Get all platform slugs for generateStaticParams
 */
export function getAllPlatformSlugs(): string[] {
  return platforms.map((p) => p.slug);
}

/**
 * Get platforms by importance
 */
export function getPlatformsByImportance(
  importance: Platform["visibilityImportance"]
): Platform[] {
  return platforms.filter((p) => p.visibilityImportance === importance);
}
