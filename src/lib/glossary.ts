/**
 * Glossary data for programmatic SEO
 * Each term generates a dedicated page at /glossary/[term]
 */

export interface RelatedTerm {
  term: string;
  slug: string;
}

export interface GlossaryFAQ {
  question: string;
  answer: string;
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  shortDefinition: string;
  fullDefinition: string;
  whyItMatters: string;
  examples: string[];
  relatedTerms: RelatedTerm[];
  usageInContext: string;
  commonMisconceptions?: string;
  faqs: GlossaryFAQ[];
  keywords: string[];
  category: "ai-fundamentals" | "visibility" | "optimization" | "measurement" | "strategy" | "platforms";
}

export const glossaryTerms: GlossaryTerm[] = [
  // AI Fundamentals
  {
    slug: "large-language-model",
    term: "Large Language Model (LLM)",
    shortDefinition: "An AI system trained on massive text datasets to understand and generate human-like text.",
    fullDefinition: "A Large Language Model (LLM) is a type of artificial intelligence that has been trained on enormous amounts of text data—often billions of words from books, websites, and other sources. This training enables LLMs to understand context, generate coherent text, answer questions, and perform various language tasks. Examples include GPT-4 (powering ChatGPT), Claude, Gemini, and Llama. LLMs form the foundation of modern AI assistants and are the systems that brands need to optimize for when pursuing AI visibility.",
    whyItMatters: "Understanding LLMs is essential for AI visibility because these are the systems that recommend (or don't recommend) your brand. LLMs synthesize information differently than search engines, requiring different optimization strategies.",
    examples: [
      "GPT-4 is the LLM that powers ChatGPT",
      "Claude is Anthropic's LLM known for helpfulness and safety",
      "Gemini is Google's multimodal LLM",
    ],
    relatedTerms: [
      { term: "AI Assistant", slug: "ai-assistant" },
      { term: "Natural Language Processing", slug: "natural-language-processing" },
      { term: "Training Data", slug: "training-data" },
    ],
    usageInContext: "When we optimize for AI visibility, we're essentially helping LLMs better understand your brand so they can accurately recommend you to users.",
    commonMisconceptions: "LLMs don't search the internet in real-time (though some have that capability added). They primarily draw from their training data and any retrieval systems connected to them.",
    faqs: [
      {
        question: "How do LLMs decide what to recommend?",
        answer: "LLMs base recommendations on patterns learned during training. They consider factors like relevance, reputation signals, and how well content matches user queries.",
      },
      {
        question: "Can you directly influence an LLM's training?",
        answer: "You can't directly modify LLM training, but you can optimize your digital presence so the information LLMs learn about your brand is accurate and favorable.",
      },
      {
        question: "Do all AI assistants use the same LLM?",
        answer: "No. ChatGPT uses GPT-4, Claude uses Claude 3, Perplexity uses multiple models, and each has different knowledge and recommendation patterns.",
      },
    ],
    keywords: ["LLM definition", "what is a large language model", "LLM explained", "AI language model"],
    category: "ai-fundamentals",
  },
  {
    slug: "ai-assistant",
    term: "AI Assistant",
    shortDefinition: "A software application powered by AI that helps users complete tasks through natural conversation.",
    fullDefinition: "An AI assistant is a software application that uses artificial intelligence—typically a large language model—to interact with users through natural language. AI assistants can answer questions, provide recommendations, help with research, write content, and complete various tasks. Popular AI assistants include ChatGPT, Claude, Google Gemini, Microsoft Copilot, and Perplexity. These assistants are becoming primary touchpoints for information discovery, making them crucial channels for brand visibility.",
    whyItMatters: "AI assistants are rapidly becoming how people discover products, services, and information. When a user asks an AI assistant 'What's the best CRM for startups?', your brand needs to be in that answer.",
    examples: [
      "ChatGPT helping a user research software options",
      "Claude providing product recommendations",
      "Perplexity answering a comparison question",
    ],
    relatedTerms: [
      { term: "Large Language Model", slug: "large-language-model" },
      { term: "AI Search", slug: "ai-search" },
      { term: "Conversational AI", slug: "conversational-ai" },
    ],
    usageInContext: "Our goal is to ensure your brand gets recommended by AI assistants when users ask questions relevant to your products or services.",
    faqs: [
      {
        question: "How many people use AI assistants?",
        answer: "ChatGPT alone has over 200 million weekly active users. Combined with Claude, Gemini, Copilot, and others, AI assistants reach hundreds of millions of users.",
      },
      {
        question: "Are AI assistants replacing Google?",
        answer: "Not replacing, but complementing. Many users now go to AI assistants first for research questions, then to Google for specific websites or transactions.",
      },
      {
        question: "Which AI assistant is most important for visibility?",
        answer: "ChatGPT has the largest user base, but optimizing for multiple assistants (ChatGPT, Claude, Perplexity, Gemini) provides the broadest coverage.",
      },
    ],
    keywords: ["AI assistant definition", "what is an AI assistant", "AI chatbot", "virtual assistant AI"],
    category: "ai-fundamentals",
  },
  {
    slug: "natural-language-processing",
    term: "Natural Language Processing (NLP)",
    shortDefinition: "The branch of AI focused on enabling computers to understand, interpret, and generate human language.",
    fullDefinition: "Natural Language Processing (NLP) is a field of artificial intelligence that deals with the interaction between computers and human language. NLP enables machines to read text, understand meaning, determine sentiment, and generate human-like responses. Modern LLMs represent the most advanced form of NLP, capable of nuanced understanding and generation that approaches human capability. NLP is fundamental to how AI assistants interpret user queries and formulate responses.",
    whyItMatters: "NLP determines how AI systems understand content about your brand. Content optimized for NLP comprehension is more likely to be accurately understood and recommended by AI assistants.",
    examples: [
      "An AI understanding that 'affordable CRM' and 'budget-friendly customer management software' mean similar things",
      "Sentiment analysis determining if reviews are positive or negative",
      "Named entity recognition identifying your brand in text",
    ],
    relatedTerms: [
      { term: "Large Language Model", slug: "large-language-model" },
      { term: "Semantic Search", slug: "semantic-search" },
      { term: "Entity Recognition", slug: "entity-recognition" },
    ],
    usageInContext: "We optimize your content structure and language to ensure NLP systems accurately understand your brand's value propositions.",
    faqs: [
      {
        question: "How does NLP affect AI recommendations?",
        answer: "NLP determines how AI understands your content. If your content is structured well for NLP, AI can better match your brand to relevant user queries.",
      },
      {
        question: "What content structures work best for NLP?",
        answer: "Clear, well-organized content with explicit statements about what you do, who you serve, and what makes you different tends to be best understood by NLP systems.",
      },
    ],
    keywords: ["NLP definition", "natural language processing explained", "NLP AI", "language AI"],
    category: "ai-fundamentals",
  },
  {
    slug: "training-data",
    term: "Training Data",
    shortDefinition: "The large dataset of text used to teach an LLM language patterns and knowledge.",
    fullDefinition: "Training data refers to the massive collection of text used to train large language models. This data typically includes books, websites, articles, forums, and other text sources—often comprising trillions of words. The quality, recency, and composition of training data directly affects what an LLM knows about any given topic, including your brand. Most LLMs have knowledge cutoff dates, meaning they only know information from their training data up to a certain point.",
    whyItMatters: "Your brand's presence in training data affects how LLMs understand and recommend you. Content published before an LLM's knowledge cutoff becomes part of its foundational knowledge.",
    examples: [
      "Information from your website being included in training data",
      "Reviews and mentions from third-party sites",
      "News articles and press coverage about your brand",
    ],
    relatedTerms: [
      { term: "Large Language Model", slug: "large-language-model" },
      { term: "Knowledge Cutoff", slug: "knowledge-cutoff" },
      { term: "Retrieval Augmented Generation", slug: "retrieval-augmented-generation" },
    ],
    usageInContext: "We help ensure the information about your brand that exists in training data is accurate, positive, and comprehensive.",
    faqs: [
      {
        question: "Can I add my content to LLM training data?",
        answer: "You can't directly add content, but by having quality content widely published and linked, it's more likely to be included in future training runs.",
      },
      {
        question: "What if incorrect information is in training data?",
        answer: "This is challenging but manageable. Newer content and retrieval systems can partially override training data, and optimization strategies can improve how your brand is represented.",
      },
    ],
    keywords: ["AI training data", "LLM training data", "machine learning data", "AI dataset"],
    category: "ai-fundamentals",
  },
  {
    slug: "knowledge-cutoff",
    term: "Knowledge Cutoff",
    shortDefinition: "The date after which an LLM has no information from its training data.",
    fullDefinition: "A knowledge cutoff is the date that marks the end of an LLM's training data. Information published after this date is not part of the model's core knowledge. For example, if an LLM has a knowledge cutoff of April 2024, it won't know about events, products, or content published after that date unless it has access to real-time retrieval systems. Understanding knowledge cutoffs is important for AI visibility strategy, as it affects what the model inherently knows about your brand.",
    whyItMatters: "If your brand launched or significantly changed after an LLM's cutoff, the model may have outdated or no information about you. This affects recommendations until retrieval systems or new training update the model's knowledge.",
    examples: [
      "A product launched in 2025 might not be in a model trained on 2024 data",
      "Company rebranding after the cutoff won't be reflected in base model knowledge",
      "New features or services may not be known to the model",
    ],
    relatedTerms: [
      { term: "Training Data", slug: "training-data" },
      { term: "Retrieval Augmented Generation", slug: "retrieval-augmented-generation" },
      { term: "Model Update", slug: "model-update" },
    ],
    usageInContext: "We optimize for both the model's base knowledge and retrieval systems to ensure current information about your brand is accessible.",
    faqs: [
      {
        question: "How often do LLMs update their knowledge cutoffs?",
        answer: "Major models typically update 1-2 times per year, but this varies. Some platforms add retrieval systems for more current information.",
      },
      {
        question: "How do I get current information to AI assistants?",
        answer: "Focus on platforms with retrieval capabilities (like Perplexity) and ensure your website is optimized for AI crawlers that feed retrieval systems.",
      },
    ],
    keywords: ["LLM knowledge cutoff", "AI knowledge date", "ChatGPT knowledge cutoff", "AI training date"],
    category: "ai-fundamentals",
  },
  {
    slug: "retrieval-augmented-generation",
    term: "Retrieval Augmented Generation (RAG)",
    shortDefinition: "A technique that enhances LLM responses by retrieving relevant current information from external sources.",
    fullDefinition: "Retrieval Augmented Generation (RAG) is a technique that combines LLM capabilities with real-time information retrieval. Instead of relying solely on training data, RAG systems search external sources (like the web) to find relevant, current information, then use this to generate more accurate, up-to-date responses. Perplexity is a prominent example of RAG in action. RAG is increasingly important for AI visibility because it allows AI assistants to access information published after their knowledge cutoff.",
    whyItMatters: "RAG systems can surface current information about your brand, overcoming training data limitations. Optimizing for RAG means ensuring your content is accessible and well-structured for retrieval systems.",
    examples: [
      "Perplexity searching the web to answer current questions",
      "ChatGPT's browse feature retrieving recent information",
      "Claude using provided documents to enhance responses",
    ],
    relatedTerms: [
      { term: "Knowledge Cutoff", slug: "knowledge-cutoff" },
      { term: "AI Search", slug: "ai-search" },
      { term: "Web Crawling", slug: "web-crawling" },
    ],
    usageInContext: "We optimize your digital presence for both LLM training data and RAG retrieval systems, ensuring comprehensive AI visibility.",
    faqs: [
      {
        question: "Which AI assistants use RAG?",
        answer: "Perplexity is built on RAG. ChatGPT and Claude have optional browsing capabilities. Most major assistants are adding RAG features.",
      },
      {
        question: "How do I optimize for RAG?",
        answer: "Ensure your website is crawlable, content is well-structured, and information is clearly presented. RAG systems need to quickly find and extract relevant information.",
      },
    ],
    keywords: ["RAG AI", "retrieval augmented generation", "RAG explained", "AI retrieval"],
    category: "ai-fundamentals",
  },
  {
    slug: "conversational-ai",
    term: "Conversational AI",
    shortDefinition: "AI technology that enables natural, human-like dialogue between users and machines.",
    fullDefinition: "Conversational AI refers to technologies that enable machines to engage in natural, human-like dialogue. This includes chatbots, virtual assistants, and AI-powered customer service tools. Modern conversational AI, powered by LLMs, can understand context, remember previous exchanges, and provide nuanced responses. For businesses, conversational AI represents both a customer interaction channel and a discovery mechanism where brand recommendations occur.",
    whyItMatters: "Conversational AI is where many brand recommendations happen. When users have dialogue with AI about their needs, your brand should be part of the conversation.",
    examples: [
      "A customer asking ChatGPT for product recommendations",
      "A user having a back-and-forth with Claude about software options",
      "An AI chatbot on a website helping with purchasing decisions",
    ],
    relatedTerms: [
      { term: "AI Assistant", slug: "ai-assistant" },
      { term: "Large Language Model", slug: "large-language-model" },
      { term: "Chatbot", slug: "chatbot" },
    ],
    usageInContext: "Conversational AI visibility ensures your brand gets recommended naturally during user dialogues with AI assistants.",
    faqs: [
      {
        question: "How is conversational AI different from search?",
        answer: "Conversational AI involves dialogue and follow-up questions, while search is typically a single query. This creates more opportunities for brand mentions and recommendations.",
      },
      {
        question: "Should I build my own conversational AI?",
        answer: "Many businesses add AI chat to their sites, but the bigger opportunity is being recommended by major AI assistants where users already go for advice.",
      },
    ],
    keywords: ["conversational AI definition", "AI conversation", "dialogue AI", "chat AI"],
    category: "ai-fundamentals",
  },
  {
    slug: "prompt",
    term: "Prompt",
    shortDefinition: "The text input a user provides to an AI system to request information or action.",
    fullDefinition: "A prompt is the text input that a user provides to an AI system to initiate a response. Prompts can be questions, commands, or context-setting statements. The way users phrase prompts significantly affects AI responses, including which brands get recommended. Understanding common prompt patterns in your industry helps optimize for the actual queries users make.",
    whyItMatters: "Users phrase prompts in various ways when seeking recommendations. Understanding these patterns helps ensure your brand appears for relevant queries regardless of exact wording.",
    examples: [
      "'What's the best project management software for small teams?'",
      "'Compare Salesforce and HubSpot for a startup'",
      "'I need a tool for email marketing that integrates with Shopify'",
    ],
    relatedTerms: [
      { term: "AI Assistant", slug: "ai-assistant" },
      { term: "Query Intent", slug: "query-intent" },
      { term: "Natural Language Processing", slug: "natural-language-processing" },
    ],
    usageInContext: "We analyze common prompts in your category to ensure your brand appears in responses to the questions your potential customers ask.",
    faqs: [
      {
        question: "What prompts should I optimize for?",
        answer: "Focus on prompts that indicate buying intent: 'best [category] for [use case]', 'alternatives to [competitor]', 'compare [product] options'.",
      },
      {
        question: "Can I see what prompts mention my brand?",
        answer: "Directly tracking all prompts isn't possible, but we can test common industry prompts and monitor how often your brand appears in responses.",
      },
    ],
    keywords: ["AI prompt", "LLM prompt", "ChatGPT prompt", "prompt engineering"],
    category: "ai-fundamentals",
  },

  // Visibility Category
  {
    slug: "ai-visibility",
    term: "AI Visibility",
    shortDefinition: "The degree to which a brand appears in AI assistant responses and recommendations.",
    fullDefinition: "AI visibility refers to how often and how favorably a brand appears when users ask AI assistants for recommendations, information, or comparisons. High AI visibility means your brand is frequently mentioned by ChatGPT, Claude, Perplexity, and other AI assistants when users ask relevant questions. AI visibility is becoming as important as traditional search visibility as more users turn to AI for research and recommendations.",
    whyItMatters: "As AI assistants become primary research tools, brands invisible to AI miss a rapidly growing channel. AI visibility directly impacts lead generation, brand awareness, and competitive positioning.",
    examples: [
      "Your SaaS product being recommended when users ask 'What's the best CRM for startups?'",
      "Your e-commerce brand appearing in 'best gifts for runners' queries",
      "Your company being cited in industry comparison discussions",
    ],
    relatedTerms: [
      { term: "AI Search", slug: "ai-search" },
      { term: "Brand Mention", slug: "brand-mention" },
      { term: "Share of Voice", slug: "share-of-voice-ai" },
    ],
    usageInContext: "Our core service is improving your AI visibility so you get recommended by AI assistants when potential customers ask relevant questions.",
    faqs: [
      {
        question: "How do I measure AI visibility?",
        answer: "We track how often your brand appears in AI responses, the sentiment of mentions, and your visibility relative to competitors across major AI platforms.",
      },
      {
        question: "How long does it take to improve AI visibility?",
        answer: "Most clients see measurable improvements within 4-8 weeks, with continued growth as optimization compounds over time.",
      },
      {
        question: "Is AI visibility different from SEO?",
        answer: "Yes. SEO focuses on search engine rankings. AI visibility focuses on being recommended by AI assistants—different algorithms, different optimization strategies.",
      },
    ],
    keywords: ["AI visibility", "AI brand visibility", "AI search visibility", "LLM visibility"],
    category: "visibility",
  },
  {
    slug: "ai-search",
    term: "AI Search",
    shortDefinition: "The use of AI assistants to find information, replacing or supplementing traditional search engines.",
    fullDefinition: "AI search refers to users using AI assistants like ChatGPT, Claude, or Perplexity to find information instead of traditional search engines like Google. Unlike traditional search that returns links, AI search provides synthesized answers, recommendations, and explanations. AI search is growing rapidly, with hundreds of millions of users now preferring AI for research questions, comparisons, and recommendations.",
    whyItMatters: "AI search is capturing a growing share of information-seeking behavior. Brands not optimized for AI search miss users who never see traditional search results.",
    examples: [
      "A user asking Perplexity to compare project management tools instead of Googling",
      "Someone asking ChatGPT for restaurant recommendations instead of checking Yelp",
      "A buyer asking Claude about software options instead of reading review sites",
    ],
    relatedTerms: [
      { term: "AI Visibility", slug: "ai-visibility" },
      { term: "AI Assistant", slug: "ai-assistant" },
      { term: "Traditional Search", slug: "traditional-search" },
    ],
    usageInContext: "AI search optimization ensures your brand appears when users research your category through AI assistants.",
    faqs: [
      {
        question: "Is AI search replacing Google?",
        answer: "Not replacing, but capturing significant share. Many users now start research with AI, then go to Google for specific websites or transactions.",
      },
      {
        question: "Which AI search platform is most important?",
        answer: "ChatGPT has the largest user base, but Perplexity is growing fast for research queries. Optimizing for multiple platforms provides best coverage.",
      },
    ],
    keywords: ["AI search", "AI search engine", "ChatGPT search", "AI information search"],
    category: "visibility",
  },
  {
    slug: "brand-mention",
    term: "Brand Mention",
    shortDefinition: "An instance where an AI assistant references a specific brand in its response.",
    fullDefinition: "A brand mention occurs when an AI assistant includes a specific brand name in its response to a user query. Brand mentions can be recommendations, comparisons, examples, or informational references. The frequency and sentiment of brand mentions are key metrics for AI visibility. Positive brand mentions in recommendation contexts are particularly valuable for driving awareness and consideration.",
    whyItMatters: "Brand mentions in AI responses put you in front of users at key decision moments. Being mentioned—and mentioned positively—directly impacts brand awareness and consideration.",
    examples: [
      "ChatGPT mentioning your brand as a top option in a category",
      "Perplexity citing your product in a comparison response",
      "Claude recommending your service for a specific use case",
    ],
    relatedTerms: [
      { term: "AI Visibility", slug: "ai-visibility" },
      { term: "Share of Voice", slug: "share-of-voice-ai" },
      { term: "Sentiment Analysis", slug: "sentiment-analysis" },
    ],
    usageInContext: "We track and optimize for brand mentions, ensuring your company appears frequently and positively in relevant AI responses.",
    faqs: [
      {
        question: "How can I track brand mentions in AI?",
        answer: "We use systematic testing across AI platforms to track when and how your brand is mentioned in response to relevant queries.",
      },
      {
        question: "Are all brand mentions equally valuable?",
        answer: "No. Mentions in recommendation contexts ('I recommend X for this') are more valuable than incidental references. Positive sentiment also matters.",
      },
    ],
    keywords: ["AI brand mention", "brand mention tracking", "AI brand reference", "LLM brand mention"],
    category: "visibility",
  },
  {
    slug: "share-of-voice-ai",
    term: "Share of Voice (AI)",
    shortDefinition: "The percentage of AI responses in your category that mention your brand versus competitors.",
    fullDefinition: "Share of Voice in AI contexts measures how often your brand is mentioned compared to competitors when AI assistants respond to relevant queries. If users ask 100 questions about 'best CRM software' and your brand appears in 15 responses while competitors average 10, you have a higher share of voice. This metric helps benchmark competitive position in AI visibility.",
    whyItMatters: "Share of voice indicates competitive strength in AI. Higher share of voice means more users hear about your brand when researching your category through AI.",
    examples: [
      "Your brand mentioned in 30% of responses to category queries vs. competitor at 20%",
      "Tracking share of voice changes over time as optimization takes effect",
      "Comparing share of voice across different AI platforms",
    ],
    relatedTerms: [
      { term: "Brand Mention", slug: "brand-mention" },
      { term: "AI Visibility", slug: "ai-visibility" },
      { term: "Competitive Analysis", slug: "competitive-analysis-ai" },
    ],
    usageInContext: "We measure and track your share of voice in AI responses, benchmarking against competitors to guide optimization priorities.",
    faqs: [
      {
        question: "How is AI share of voice measured?",
        answer: "We test AI platforms with relevant queries and track brand mention frequency, calculating share compared to competitors in your category.",
      },
      {
        question: "What's a good share of voice?",
        answer: "This varies by category competitiveness. Generally, being mentioned more often than your market share would suggest indicates strong AI visibility.",
      },
    ],
    keywords: ["AI share of voice", "SOV AI", "AI competitive visibility", "brand share AI"],
    category: "visibility",
  },
  {
    slug: "ai-recommendation",
    term: "AI Recommendation",
    shortDefinition: "When an AI assistant actively suggests a specific brand or product to a user.",
    fullDefinition: "An AI recommendation occurs when an AI assistant explicitly suggests a specific brand, product, or service in response to a user query. Recommendations are stronger than mere mentions—they indicate the AI is actively directing the user toward your brand. Recommendations often come in response to 'best', 'top', or 'recommended' queries and carry significant influence on user decisions.",
    whyItMatters: "Recommendations are the highest-value form of AI visibility. When AI actively recommends your brand, it's essentially providing an endorsement to users at a decision point.",
    examples: [
      "'For your needs, I'd recommend [Brand] because...'",
      "'The top options in this category include [Brand], which excels at...'",
      "'Based on what you've described, [Brand] would be a good fit'",
    ],
    relatedTerms: [
      { term: "Brand Mention", slug: "brand-mention" },
      { term: "AI Visibility", slug: "ai-visibility" },
      { term: "Purchase Intent", slug: "purchase-intent" },
    ],
    usageInContext: "Our optimization focuses on earning recommendations, not just mentions—ensuring AI actively directs users toward your brand.",
    faqs: [
      {
        question: "How do I get AI to recommend my brand?",
        answer: "Recommendations depend on the AI's understanding of your brand's strengths, reputation, and fit for user needs. We optimize all factors that influence recommendation likelihood.",
      },
      {
        question: "Can I pay for AI recommendations?",
        answer: "Currently, you cannot pay for placement in AI responses. Recommendations are earned through visibility optimization and brand strength.",
      },
    ],
    keywords: ["AI recommendation", "AI product recommendation", "ChatGPT recommendation", "AI brand recommendation"],
    category: "visibility",
  },

  // Optimization Category
  {
    slug: "ai-optimization",
    term: "AI Optimization",
    shortDefinition: "The practice of improving a brand's visibility and representation in AI assistant responses.",
    fullDefinition: "AI optimization encompasses all strategies and tactics used to improve how a brand appears in AI assistant responses. This includes content optimization for LLM comprehension, reputation management across sources AI learns from, structured data implementation, and ongoing monitoring and adjustment. AI optimization is distinct from SEO—while related, the algorithms and tactics differ significantly.",
    whyItMatters: "Without optimization, AI may not know about your brand, may have outdated information, or may recommend competitors instead. Optimization ensures you capture the AI visibility opportunity.",
    examples: [
      "Restructuring content for better LLM comprehension",
      "Improving brand presence on sources AI references",
      "Optimizing for common query patterns in your category",
    ],
    relatedTerms: [
      { term: "AI Visibility", slug: "ai-visibility" },
      { term: "Content Optimization", slug: "content-optimization-ai" },
      { term: "LLM SEO", slug: "llm-seo" },
    ],
    usageInContext: "Our AI optimization services systematically improve every factor that affects how AI assistants understand and recommend your brand.",
    faqs: [
      {
        question: "How is AI optimization different from SEO?",
        answer: "SEO optimizes for search engine ranking algorithms. AI optimization focuses on how LLMs understand and synthesize information about your brand—different systems, different tactics.",
      },
      {
        question: "How long does AI optimization take?",
        answer: "Initial improvements typically appear within 4-8 weeks. Optimization is ongoing as AI platforms evolve and competitive landscapes shift.",
      },
    ],
    keywords: ["AI optimization", "optimize for AI", "AI search optimization", "LLM optimization"],
    category: "optimization",
  },
  {
    slug: "content-optimization-ai",
    term: "Content Optimization (AI)",
    shortDefinition: "Structuring and writing content so AI systems can accurately understand and cite it.",
    fullDefinition: "Content optimization for AI involves creating and structuring content so that large language models can easily parse, understand, and accurately represent the information. This differs from traditional SEO content optimization—AI systems value clear statements of fact, well-organized information, and explicit descriptions over keyword density or backlink signals. Optimized content is more likely to be accurately cited and referenced by AI assistants.",
    whyItMatters: "AI assistants synthesize information from content. If your content is difficult for AI to parse or understand, your brand won't be accurately represented in AI responses.",
    examples: [
      "Using clear, explicit statements about what your product does",
      "Organizing content with logical structure AI can follow",
      "Providing specific examples and use cases AI can reference",
    ],
    relatedTerms: [
      { term: "AI Optimization", slug: "ai-optimization" },
      { term: "Structured Data", slug: "structured-data" },
      { term: "LLM SEO", slug: "llm-seo" },
    ],
    usageInContext: "We optimize your content for AI comprehension, ensuring your messaging is accurately understood and conveyed by AI assistants.",
    faqs: [
      {
        question: "Does AI content optimization hurt SEO?",
        answer: "No. Well-structured, clear content actually helps both AI and traditional search. The best content works for both humans and machines.",
      },
      {
        question: "What content formats work best for AI?",
        answer: "Clear prose with explicit statements, structured comparisons, FAQ sections, and specific examples tend to be well-understood by AI systems.",
      },
    ],
    keywords: ["content optimization AI", "AI content writing", "LLM content optimization", "AI-friendly content"],
    category: "optimization",
  },
  {
    slug: "structured-data",
    term: "Structured Data",
    shortDefinition: "Formatted markup that helps machines understand content on web pages.",
    fullDefinition: "Structured data is code (typically in JSON-LD, Microdata, or RDFa format) added to web pages to help machines understand content. This includes Schema.org markup for products, organizations, FAQs, reviews, and more. Structured data helps both search engines and AI systems accurately understand and categorize your content. Proper structured data implementation improves how AI comprehends and represents your brand.",
    whyItMatters: "Structured data provides explicit signals about what your content means. AI systems can use this to more accurately understand your offerings and recommend appropriately.",
    examples: [
      "Organization schema declaring company details",
      "Product schema describing offerings and prices",
      "FAQ schema providing question-answer pairs AI can reference",
    ],
    relatedTerms: [
      { term: "Content Optimization", slug: "content-optimization-ai" },
      { term: "Schema Markup", slug: "schema-markup" },
      { term: "Entity Recognition", slug: "entity-recognition" },
    ],
    usageInContext: "We implement structured data that helps AI systems accurately understand your brand, products, and value propositions.",
    faqs: [
      {
        question: "Does structured data directly affect AI responses?",
        answer: "Structured data helps AI systems understand your content more accurately. While not the only factor, it contributes to better representation in AI responses.",
      },
      {
        question: "What structured data types are most important?",
        answer: "Organization, Product, FAQ, and Review schemas are particularly valuable for AI visibility. The specific types depend on your business.",
      },
    ],
    keywords: ["structured data AI", "schema markup AI", "JSON-LD AI", "AI structured data"],
    category: "optimization",
  },
  {
    slug: "llm-seo",
    term: "LLM SEO",
    shortDefinition: "Search engine optimization strategies adapted for large language model visibility.",
    fullDefinition: "LLM SEO (also called GEO or Generative Engine Optimization) refers to optimization strategies specifically designed for visibility in large language model responses. While related to traditional SEO, LLM SEO focuses on how AI systems synthesize and present information rather than ranking algorithms. Key differences include emphasis on factual clarity, citation-worthiness, and comprehension-friendly structure over traditional SEO signals.",
    whyItMatters: "Traditional SEO doesn't automatically translate to AI visibility. LLM SEO addresses the unique ways AI systems evaluate and present information about brands.",
    examples: [
      "Optimizing content for AI citation rather than just rankings",
      "Building authority signals AI systems recognize",
      "Structuring information for LLM comprehension",
    ],
    relatedTerms: [
      { term: "AI Optimization", slug: "ai-optimization" },
      { term: "Generative Engine Optimization", slug: "generative-engine-optimization" },
      { term: "AI Visibility", slug: "ai-visibility" },
    ],
    usageInContext: "We apply LLM SEO principles to ensure your brand is visible not just in search rankings, but in AI assistant responses.",
    faqs: [
      {
        question: "Is LLM SEO replacing traditional SEO?",
        answer: "Not replacing—complementing. Strong brands will optimize for both traditional search and AI visibility. The tactics overlap but aren't identical.",
      },
      {
        question: "What's the most important LLM SEO factor?",
        answer: "There's no single factor, but citation-worthiness—being a source AI wants to reference—is fundamental. This comes from authority, clarity, and accuracy.",
      },
    ],
    keywords: ["LLM SEO", "AI SEO", "generative SEO", "ChatGPT SEO"],
    category: "optimization",
  },
  {
    slug: "generative-engine-optimization",
    term: "Generative Engine Optimization (GEO)",
    shortDefinition: "Strategies to improve visibility in AI-generated responses and recommendations.",
    fullDefinition: "Generative Engine Optimization (GEO) is the practice of optimizing content and brand presence for visibility in generative AI systems like ChatGPT, Claude, and Perplexity. GEO focuses on how AI generates responses that include or recommend your brand. The term emerged as AI assistants began capturing significant information-seeking traffic, creating a new optimization discipline alongside traditional SEO.",
    whyItMatters: "GEO represents the next evolution of search optimization. As more users turn to AI for information, brands must optimize for these generative systems.",
    examples: [
      "Optimizing for inclusion in AI-generated recommendations",
      "Ensuring accurate representation in AI comparisons",
      "Building the signals that make AI cite your brand",
    ],
    relatedTerms: [
      { term: "LLM SEO", slug: "llm-seo" },
      { term: "AI Optimization", slug: "ai-optimization" },
      { term: "AI Search", slug: "ai-search" },
    ],
    usageInContext: "GEO is core to our services—we help brands optimize for the generative AI engines that increasingly drive discovery and recommendations.",
    faqs: [
      {
        question: "How is GEO different from SEO?",
        answer: "SEO focuses on ranking in search results. GEO focuses on being included and recommended in AI-generated responses—different algorithms, different optimization approaches.",
      },
      {
        question: "Is GEO the same as AI visibility?",
        answer: "GEO is the practice; AI visibility is the outcome. GEO strategies lead to improved AI visibility.",
      },
    ],
    keywords: ["generative engine optimization", "GEO marketing", "GEO SEO", "AI engine optimization"],
    category: "optimization",
  },
  {
    slug: "entity-recognition",
    term: "Entity Recognition",
    shortDefinition: "AI's ability to identify and understand specific named entities like brands, people, or products.",
    fullDefinition: "Entity recognition (or Named Entity Recognition/NER) is an AI capability to identify and classify named entities in text—including organizations, products, people, and locations. When AI recognizes your brand as an entity, it can better understand context, relationships, and relevance. Strong entity recognition means AI 'knows' your brand as a distinct entity rather than just words in text.",
    whyItMatters: "If AI doesn't recognize your brand as an entity, it can't properly recommend you. Entity recognition is foundational to being understood and referenced by AI systems.",
    examples: [
      "AI recognizing 'Salesforce' as a CRM company, not just a word",
      "Understanding that 'Apple' in tech context means the company",
      "Connecting your brand name to your products and services",
    ],
    relatedTerms: [
      { term: "Knowledge Graph", slug: "knowledge-graph" },
      { term: "Brand Mention", slug: "brand-mention" },
      { term: "Structured Data", slug: "structured-data" },
    ],
    usageInContext: "We optimize your digital presence to ensure AI systems recognize your brand as a distinct entity with clear attributes and relationships.",
    faqs: [
      {
        question: "How do I know if AI recognizes my brand?",
        answer: "Ask AI assistants direct questions about your brand. If they know what you do and can discuss you accurately, entity recognition is working.",
      },
      {
        question: "How do I improve entity recognition?",
        answer: "Consistent brand mentions across authoritative sources, structured data, and clear content about your brand all strengthen entity recognition.",
      },
    ],
    keywords: ["entity recognition AI", "named entity recognition", "NER AI", "AI brand recognition"],
    category: "optimization",
  },
  {
    slug: "knowledge-graph",
    term: "Knowledge Graph",
    shortDefinition: "A structured database of entities and relationships that AI uses to understand connections.",
    fullDefinition: "A knowledge graph is a structured representation of information that maps entities (people, places, companies, products) and their relationships. Major AI systems use knowledge graphs to understand how concepts connect. Being represented in knowledge graphs—whether Google's, Wikidata, or AI-specific graphs—helps AI systems accurately understand and recommend your brand in relevant contexts.",
    whyItMatters: "Knowledge graph presence helps AI understand your brand's context, relationships, and relevance. Brands in knowledge graphs are more likely to be accurately represented in AI responses.",
    examples: [
      "Your company's entry in Google's Knowledge Graph",
      "Connections showing your product's category and competitors",
      "Relationships linking your brand to industry terms",
    ],
    relatedTerms: [
      { term: "Entity Recognition", slug: "entity-recognition" },
      { term: "Structured Data", slug: "structured-data" },
      { term: "Wikipedia", slug: "wikipedia-ai" },
    ],
    usageInContext: "We work to establish and strengthen your brand's knowledge graph presence, improving how AI systems understand your position in your market.",
    faqs: [
      {
        question: "How do I get into knowledge graphs?",
        answer: "Presence on authoritative sources like Wikipedia, strong structured data, and consistent information across the web all contribute to knowledge graph inclusion.",
      },
      {
        question: "Which knowledge graphs matter most?",
        answer: "Google's Knowledge Graph, Wikidata, and the implicit knowledge graphs within LLMs are all important. Optimizing for one often helps with others.",
      },
    ],
    keywords: ["knowledge graph AI", "AI knowledge graph", "entity graph", "semantic knowledge graph"],
    category: "optimization",
  },

  // Measurement Category
  {
    slug: "ai-attribution",
    term: "AI Attribution",
    shortDefinition: "Tracking and measuring traffic and conversions that originate from AI assistant recommendations.",
    fullDefinition: "AI attribution is the practice of identifying and measuring website traffic, leads, and conversions that come from AI assistant recommendations. Because AI-referred traffic doesn't have traditional referrer data, attribution requires specialized approaches like branded query analysis, post-visit surveys, and traffic pattern analysis. Proper AI attribution helps justify AI visibility investments by connecting optimization to business outcomes.",
    whyItMatters: "Without AI attribution, you can't measure ROI from AI visibility efforts. Understanding which traffic and conversions come from AI helps optimize investments and prove value.",
    examples: [
      "Tracking traffic spikes correlated with AI optimization",
      "Surveying customers about how they found you",
      "Analyzing branded search increases following AI visibility improvements",
    ],
    relatedTerms: [
      { term: "AI Visibility", slug: "ai-visibility" },
      { term: "Traffic Analysis", slug: "traffic-analysis" },
      { term: "Conversion Tracking", slug: "conversion-tracking" },
    ],
    usageInContext: "We implement AI attribution frameworks to help you understand and measure the impact of AI visibility on your business.",
    faqs: [
      {
        question: "How do you track AI referrals?",
        answer: "We use multiple signals: branded search increases, traffic pattern analysis, direct traffic spikes, and optional post-conversion surveys to attribute traffic to AI sources.",
      },
      {
        question: "Why is AI attribution difficult?",
        answer: "AI assistants don't pass traditional referrer data. Users often don't remember or report that they found you through AI, making direct tracking challenging.",
      },
    ],
    keywords: ["AI attribution", "AI traffic attribution", "measure AI visibility", "AI marketing attribution"],
    category: "measurement",
  },
  {
    slug: "sentiment-analysis",
    term: "Sentiment Analysis",
    shortDefinition: "Evaluating whether AI responses about your brand are positive, negative, or neutral.",
    fullDefinition: "Sentiment analysis in AI visibility context involves evaluating the tone and favorability of how AI assistants discuss your brand. Beyond just being mentioned, sentiment analysis assesses whether those mentions are positive recommendations, neutral information, or negative assessments. Tracking sentiment helps identify reputation issues and measure the quality of AI visibility, not just quantity.",
    whyItMatters: "Being mentioned negatively by AI can harm more than help. Sentiment analysis ensures your AI visibility is actually beneficial to your brand.",
    examples: [
      "AI recommending your product as 'a great choice' (positive)",
      "AI mentioning your brand neutrally in a list (neutral)",
      "AI noting customer complaints or limitations (negative)",
    ],
    relatedTerms: [
      { term: "Brand Mention", slug: "brand-mention" },
      { term: "AI Visibility", slug: "ai-visibility" },
      { term: "Reputation Management", slug: "reputation-management-ai" },
    ],
    usageInContext: "We track sentiment of AI mentions to ensure your brand isn't just visible, but presented favorably.",
    faqs: [
      {
        question: "How do you measure sentiment in AI responses?",
        answer: "We analyze AI responses for language indicating recommendation, praise, criticism, or neutrality, tracking trends over time and across platforms.",
      },
      {
        question: "What if AI sentiment is negative?",
        answer: "We identify root causes—often negative reviews or outdated information—and implement strategies to improve how AI perceives and presents your brand.",
      },
    ],
    keywords: ["AI sentiment analysis", "brand sentiment AI", "AI brand perception", "LLM sentiment"],
    category: "measurement",
  },
  {
    slug: "competitive-analysis-ai",
    term: "Competitive Analysis (AI)",
    shortDefinition: "Evaluating how competitors appear in AI responses compared to your brand.",
    fullDefinition: "Competitive analysis for AI visibility involves systematically testing how AI assistants discuss, recommend, and compare your brand versus competitors. This includes tracking which competitors appear in responses to category queries, how AI positions different brands, and identifying competitive gaps and opportunities in AI visibility.",
    whyItMatters: "Understanding competitive AI visibility helps identify opportunities and threats. If competitors dominate AI recommendations in your category, you're losing consideration before users even reach your site.",
    examples: [
      "Testing which brands AI recommends for category queries",
      "Analyzing how AI compares your product to alternatives",
      "Identifying competitors with strong or weak AI visibility",
    ],
    relatedTerms: [
      { term: "Share of Voice", slug: "share-of-voice-ai" },
      { term: "Brand Mention", slug: "brand-mention" },
      { term: "AI Visibility", slug: "ai-visibility" },
    ],
    usageInContext: "We continuously monitor competitor AI visibility to inform strategy and identify opportunities for your brand.",
    faqs: [
      {
        question: "How do you analyze competitor AI visibility?",
        answer: "We test AI platforms with relevant queries and systematically track which brands appear, how they're positioned, and how this changes over time.",
      },
      {
        question: "What can I learn from competitor analysis?",
        answer: "You can identify which competitors have invested in AI visibility, what queries they own, and where opportunities exist for your brand to gain ground.",
      },
    ],
    keywords: ["AI competitive analysis", "competitor AI visibility", "AI market analysis", "LLM competitive intelligence"],
    category: "measurement",
  },

  // Strategy Category
  {
    slug: "ai-first-marketing",
    term: "AI-First Marketing",
    shortDefinition: "A marketing approach that prioritizes visibility and presence in AI platforms.",
    fullDefinition: "AI-first marketing is a strategic approach that prioritizes visibility in AI platforms alongside or even before traditional channels. This recognizes that AI assistants are becoming primary discovery and research tools for many users. AI-first marketers optimize content, brand presence, and digital assets specifically for AI comprehension and recommendation.",
    whyItMatters: "As AI captures more information-seeking behavior, brands that adopt AI-first strategies will capture users that traditional marketing misses.",
    examples: [
      "Creating content designed for AI citation and recommendation",
      "Prioritizing AI visibility KPIs alongside traditional metrics",
      "Building brand presence on sources AI references",
    ],
    relatedTerms: [
      { term: "AI Visibility", slug: "ai-visibility" },
      { term: "AI Optimization", slug: "ai-optimization" },
      { term: "Content Strategy", slug: "content-strategy-ai" },
    ],
    usageInContext: "We help brands adopt AI-first marketing strategies that capture the growing AI search opportunity.",
    faqs: [
      {
        question: "Does AI-first mean abandoning traditional marketing?",
        answer: "No. AI-first means prioritizing AI visibility in strategy, but works alongside SEO, paid media, and other channels for comprehensive coverage.",
      },
      {
        question: "When should I adopt AI-first marketing?",
        answer: "Now. Early movers are establishing AI visibility while competition is still limited. Waiting means more competitive, more expensive optimization later.",
      },
    ],
    keywords: ["AI-first marketing", "AI marketing strategy", "AI-first brand", "AI marketing approach"],
    category: "strategy",
  },
  {
    slug: "omnichannel-ai",
    term: "Omnichannel AI Visibility",
    shortDefinition: "Maintaining consistent brand presence across all major AI platforms and assistants.",
    fullDefinition: "Omnichannel AI visibility means ensuring your brand appears consistently and accurately across all major AI platforms—ChatGPT, Claude, Perplexity, Gemini, Copilot, and others. Different platforms may have different training data and present information differently, making platform-specific optimization important for comprehensive AI visibility.",
    whyItMatters: "Users have preferences for different AI assistants. Optimizing for only one platform means missing users on others. Comprehensive visibility requires an omnichannel approach.",
    examples: [
      "Testing visibility across ChatGPT, Claude, Perplexity, and Gemini",
      "Ensuring consistent brand representation across platforms",
      "Addressing platform-specific gaps or inaccuracies",
    ],
    relatedTerms: [
      { term: "AI Visibility", slug: "ai-visibility" },
      { term: "Platform Coverage", slug: "platform-coverage" },
      { term: "AI Assistant", slug: "ai-assistant" },
    ],
    usageInContext: "We optimize for omnichannel AI visibility, ensuring your brand is well-represented across all major AI platforms.",
    faqs: [
      {
        question: "Do different AI platforms require different optimization?",
        answer: "Core principles are similar, but platforms may have different training data and knowledge. We test across platforms and address specific gaps.",
      },
      {
        question: "Which AI platforms are most important?",
        answer: "ChatGPT has the largest user base, but Perplexity is growing fast for research. We recommend optimizing for at least 3-4 major platforms.",
      },
    ],
    keywords: ["omnichannel AI", "multi-platform AI visibility", "AI platform strategy", "cross-platform AI"],
    category: "strategy",
  },
  {
    slug: "reputation-management-ai",
    term: "Reputation Management (AI)",
    shortDefinition: "Managing how your brand is perceived and represented by AI assistants.",
    fullDefinition: "AI reputation management focuses on ensuring AI assistants accurately and favorably represent your brand. This includes addressing negative or inaccurate information AI may have learned, building positive signals AI can reference, and monitoring for reputation issues in AI responses. AI reputation management is increasingly important as AI assistants influence more decisions.",
    whyItMatters: "AI forms opinions about your brand based on available information. Negative or inaccurate AI representations can influence many users before you're aware of the issue.",
    examples: [
      "Correcting outdated product information AI references",
      "Addressing negative review themes appearing in AI responses",
      "Building positive brand signals across sources AI learns from",
    ],
    relatedTerms: [
      { term: "Sentiment Analysis", slug: "sentiment-analysis" },
      { term: "Brand Mention", slug: "brand-mention" },
      { term: "AI Visibility", slug: "ai-visibility" },
    ],
    usageInContext: "We monitor and manage your AI reputation, ensuring AI assistants represent your brand accurately and positively.",
    faqs: [
      {
        question: "What if AI says incorrect things about my brand?",
        answer: "We identify root causes and implement strategies to improve information AI has access to, gradually improving accuracy over time.",
      },
      {
        question: "How do I fix negative AI reputation?",
        answer: "This requires addressing underlying issues (reviews, press, content) and building stronger positive signals. It's a process, not instant, but achievable.",
      },
    ],
    keywords: ["AI reputation management", "AI brand reputation", "LLM reputation", "AI brand perception management"],
    category: "strategy",
  },
  {
    slug: "content-strategy-ai",
    term: "Content Strategy (AI)",
    shortDefinition: "Planning and creating content specifically optimized for AI visibility and citation.",
    fullDefinition: "AI content strategy involves planning and creating content that AI systems can easily understand, cite, and use for recommendations. This includes choosing topics AI users frequently ask about, structuring content for LLM comprehension, and building content assets that establish authority and expertise AI recognizes. AI content strategy complements but differs from traditional content marketing.",
    whyItMatters: "Content is what AI learns from. Strategic content creation directly impacts what AI knows and says about your brand.",
    examples: [
      "Creating comparison content AI can reference",
      "Building FAQ content that answers common AI queries",
      "Developing authority content that establishes expertise",
    ],
    relatedTerms: [
      { term: "Content Optimization", slug: "content-optimization-ai" },
      { term: "AI Optimization", slug: "ai-optimization" },
      { term: "LLM SEO", slug: "llm-seo" },
    ],
    usageInContext: "We develop AI content strategies that build the information foundation for strong AI visibility.",
    faqs: [
      {
        question: "Does AI content strategy replace regular content marketing?",
        answer: "It complements it. Many principles overlap, but AI content strategy adds specific considerations for how LLMs process and cite content.",
      },
      {
        question: "What content types work best for AI?",
        answer: "Comprehensive guides, clear comparisons, detailed FAQs, and authoritative explanations tend to be well-understood and cited by AI.",
      },
    ],
    keywords: ["AI content strategy", "content strategy LLM", "AI content planning", "LLM content strategy"],
    category: "strategy",
  },

  // Platforms Category
  {
    slug: "chatgpt",
    term: "ChatGPT",
    shortDefinition: "OpenAI's popular AI assistant, one of the most important platforms for AI visibility.",
    fullDefinition: "ChatGPT is an AI assistant created by OpenAI, powered by the GPT-4 language model. With over 200 million weekly active users, it's the most widely used AI assistant globally. ChatGPT is used for research, recommendations, writing assistance, and countless other tasks. For AI visibility, ChatGPT is often the primary platform to optimize for due to its massive user base and influence.",
    whyItMatters: "ChatGPT's massive user base means millions of potential customers may be asking it for recommendations in your category. Visibility in ChatGPT directly impacts brand discovery.",
    examples: [
      "Users asking ChatGPT 'What CRM should I use for my startup?'",
      "People requesting product comparisons and recommendations",
      "Businesses researching vendors and solutions",
    ],
    relatedTerms: [
      { term: "OpenAI", slug: "openai" },
      { term: "GPT-4", slug: "gpt-4" },
      { term: "AI Assistant", slug: "ai-assistant" },
    ],
    usageInContext: "ChatGPT visibility is typically our first priority due to its market-leading user base.",
    faqs: [
      {
        question: "How many people use ChatGPT?",
        answer: "ChatGPT has over 200 million weekly active users, making it by far the most widely used AI assistant.",
      },
      {
        question: "How does ChatGPT decide what to recommend?",
        answer: "ChatGPT bases recommendations on patterns from training data, including reputation, reviews, and content quality. We optimize for these factors.",
      },
    ],
    keywords: ["ChatGPT visibility", "ChatGPT optimization", "ChatGPT marketing", "ChatGPT brand"],
    category: "platforms",
  },
  {
    slug: "claude",
    term: "Claude",
    shortDefinition: "Anthropic's AI assistant, known for thoughtful, nuanced responses.",
    fullDefinition: "Claude is an AI assistant created by Anthropic, designed to be helpful, harmless, and honest. Claude is known for providing thoughtful, nuanced responses and is particularly popular in professional contexts. With growing adoption among businesses and developers, Claude is an increasingly important platform for AI visibility, especially for B2B brands.",
    whyItMatters: "Claude's professional user base includes many decision-makers and researchers. Visibility in Claude helps reach users who may be evaluating your products or services.",
    examples: [
      "Professionals asking Claude for vendor recommendations",
      "Researchers using Claude for competitive analysis",
      "Teams asking Claude to compare software options",
    ],
    relatedTerms: [
      { term: "Anthropic", slug: "anthropic" },
      { term: "AI Assistant", slug: "ai-assistant" },
      { term: "ChatGPT", slug: "chatgpt" },
    ],
    usageInContext: "Claude is a priority platform for B2B visibility due to its professional user base.",
    faqs: [
      {
        question: "How is Claude different from ChatGPT?",
        answer: "Claude tends to give more nuanced, careful responses and is popular among professional users. Different training may result in different brand representations.",
      },
      {
        question: "Should I optimize separately for Claude?",
        answer: "Core optimization principles apply across platforms, but we test on Claude specifically to ensure accurate representation.",
      },
    ],
    keywords: ["Claude AI visibility", "Claude optimization", "Claude marketing", "Anthropic Claude"],
    category: "platforms",
  },
  {
    slug: "perplexity",
    term: "Perplexity",
    shortDefinition: "An AI-powered search engine that provides answers with citations.",
    fullDefinition: "Perplexity is an AI-powered answer engine that combines LLM capabilities with real-time web search. Unlike ChatGPT, Perplexity actively searches the web to provide current information with source citations. This makes Perplexity particularly important for AI visibility because it can surface your current content, not just what was in training data.",
    whyItMatters: "Perplexity's real-time search capability means your current content can appear in responses. Optimizing for Perplexity has more immediate impact than training-data-dependent platforms.",
    examples: [
      "Users asking Perplexity for current product comparisons",
      "Researchers using Perplexity for up-to-date information",
      "Buyers asking Perplexity about recent reviews and news",
    ],
    relatedTerms: [
      { term: "AI Search", slug: "ai-search" },
      { term: "Retrieval Augmented Generation", slug: "retrieval-augmented-generation" },
      { term: "AI Assistant", slug: "ai-assistant" },
    ],
    usageInContext: "Perplexity optimization offers faster results since it uses real-time retrieval rather than just training data.",
    faqs: [
      {
        question: "Why is Perplexity different from ChatGPT?",
        answer: "Perplexity searches the web in real-time and cites sources. Your current content can appear immediately, unlike waiting for training data updates.",
      },
      {
        question: "How do I optimize for Perplexity?",
        answer: "Ensure your website is crawlable, content is well-structured, and information is clearly presented for extraction.",
      },
    ],
    keywords: ["Perplexity visibility", "Perplexity optimization", "Perplexity marketing", "Perplexity AI"],
    category: "platforms",
  },
  {
    slug: "gemini",
    term: "Gemini",
    shortDefinition: "Google's AI assistant and family of language models.",
    fullDefinition: "Gemini is Google's AI assistant and the name of their family of large language models. Gemini is integrated into Google's ecosystem, including Search, Workspace, and Android. With Google's massive user base, Gemini visibility is important for reaching users who interact with AI through Google's products.",
    whyItMatters: "Google's reach means Gemini will touch billions of users. Visibility in Gemini is becoming as important as traditional Google search optimization.",
    examples: [
      "Users asking Gemini in Google Search for recommendations",
      "Workspace users getting AI assistance from Gemini",
      "Android users interacting with Gemini on their phones",
    ],
    relatedTerms: [
      { term: "Google", slug: "google" },
      { term: "AI Assistant", slug: "ai-assistant" },
      { term: "ChatGPT", slug: "chatgpt" },
    ],
    usageInContext: "Gemini optimization is increasingly important as Google integrates AI throughout its products.",
    faqs: [
      {
        question: "How does Gemini relate to Google Search?",
        answer: "Gemini is increasingly integrated with Google Search, providing AI-generated summaries and answers alongside traditional search results.",
      },
      {
        question: "Is Gemini different from Google Search optimization?",
        answer: "While related, optimizing for Gemini's AI responses requires attention to factors beyond traditional SEO.",
      },
    ],
    keywords: ["Gemini visibility", "Google Gemini optimization", "Gemini marketing", "Google AI"],
    category: "platforms",
  },
  {
    slug: "copilot",
    term: "Microsoft Copilot",
    shortDefinition: "Microsoft's AI assistant integrated across Windows, Office, and Bing.",
    fullDefinition: "Microsoft Copilot is an AI assistant integrated throughout Microsoft's ecosystem, including Windows, Microsoft 365, and Bing search. Copilot uses OpenAI's technology but with Microsoft-specific integrations and training. For businesses, Copilot's presence in workplace tools makes it an important platform for B2B visibility.",
    whyItMatters: "Copilot's integration with Microsoft 365 means professionals use it daily for work tasks. B2B brands need visibility in the tools their customers use every day.",
    examples: [
      "Users asking Copilot in Edge for product recommendations",
      "Professionals using Copilot in Word or Excel for research",
      "Bing users seeing Copilot-generated answers",
    ],
    relatedTerms: [
      { term: "Microsoft", slug: "microsoft" },
      { term: "Bing", slug: "bing" },
      { term: "AI Assistant", slug: "ai-assistant" },
    ],
    usageInContext: "Copilot is important for B2B visibility due to its integration with workplace tools.",
    faqs: [
      {
        question: "How is Copilot different from ChatGPT?",
        answer: "Copilot uses similar technology but is integrated into Microsoft products and may have different training data and behaviors.",
      },
      {
        question: "Should I optimize separately for Copilot?",
        answer: "Core principles apply, but we test on Copilot specifically given its workplace integration importance.",
      },
    ],
    keywords: ["Microsoft Copilot visibility", "Copilot optimization", "Copilot marketing", "Microsoft AI"],
    category: "platforms",
  },

  // Additional terms to reach 60
  {
    slug: "zero-click-search",
    term: "Zero-Click Search",
    shortDefinition: "When users get answers directly from AI without clicking through to websites.",
    fullDefinition: "Zero-click search refers to queries where users get complete answers from AI without needing to visit external websites. AI assistants provide synthesized answers, potentially reducing website traffic for informational queries. This makes being mentioned and cited in AI responses increasingly important—if users don't click through, you need visibility in the response itself.",
    whyItMatters: "As AI provides more complete answers, traditional traffic may decline for informational queries. Being mentioned in zero-click responses maintains visibility even without website visits.",
    examples: [
      "AI fully answering 'What's the best email marketing tool?'",
      "Users getting product comparisons without visiting comparison sites",
      "Complete how-to answers without clicking to tutorials",
    ],
    relatedTerms: [
      { term: "AI Search", slug: "ai-search" },
      { term: "AI Visibility", slug: "ai-visibility" },
      { term: "Brand Mention", slug: "brand-mention" },
    ],
    usageInContext: "We optimize for visibility in zero-click responses, ensuring your brand is present even when users don't visit your site.",
    faqs: [
      {
        question: "Does zero-click search hurt my website traffic?",
        answer: "It can reduce informational traffic, but being mentioned in AI responses still builds awareness. The key is visibility in those responses.",
      },
      {
        question: "How do I benefit from zero-click searches?",
        answer: "Ensure your brand is recommended in AI responses. Even without clicks, being mentioned influences awareness and consideration.",
      },
    ],
    keywords: ["zero-click search", "zero-click AI", "AI direct answers", "no-click search"],
    category: "visibility",
  },
  {
    slug: "citation",
    term: "Citation (AI)",
    shortDefinition: "When an AI assistant references your content or brand as a source.",
    fullDefinition: "In AI context, a citation occurs when an AI assistant references your content, website, or brand as a source of information. Citations are particularly prominent in platforms like Perplexity that show sources. Being cited by AI indicates your content is recognized as authoritative and trustworthy, making citations a valuable form of AI visibility.",
    whyItMatters: "Citations establish authority and can drive traffic. Being a source AI trusts enough to cite indicates strong content authority.",
    examples: [
      "Perplexity linking to your article as a source",
      "AI mentioning your research or data",
      "Your brand cited as an authority on a topic",
    ],
    relatedTerms: [
      { term: "Perplexity", slug: "perplexity" },
      { term: "Content Authority", slug: "content-authority" },
      { term: "AI Visibility", slug: "ai-visibility" },
    ],
    usageInContext: "We optimize for AI citations by building content authority and ensuring content is structured for citation.",
    faqs: [
      {
        question: "How do I get AI to cite my content?",
        answer: "Create authoritative, well-structured content that directly answers common questions. Platforms like Perplexity actively seek good sources.",
      },
      {
        question: "Are citations better than mentions?",
        answer: "Both are valuable. Citations indicate content authority; mentions indicate brand recognition. Ideally, you have both.",
      },
    ],
    keywords: ["AI citation", "AI source citation", "LLM citation", "AI content citation"],
    category: "visibility",
  },
  {
    slug: "content-authority",
    term: "Content Authority",
    shortDefinition: "The degree to which AI systems trust and reference your content as an expert source.",
    fullDefinition: "Content authority refers to how AI systems perceive the trustworthiness and expertise of your content. High content authority means AI is more likely to cite, reference, and recommend your content as a source. Authority is built through consistent quality, expertise demonstration, and recognition from other authoritative sources.",
    whyItMatters: "AI systems aim to provide accurate, trustworthy information. Content with high authority is more likely to be used and recommended.",
    examples: [
      "AI citing your industry research",
      "Your how-to guides being referenced for questions",
      "Being the source for category definitions",
    ],
    relatedTerms: [
      { term: "Citation", slug: "citation" },
      { term: "E-E-A-T", slug: "e-e-a-t" },
      { term: "Content Optimization", slug: "content-optimization-ai" },
    ],
    usageInContext: "We build content authority that makes AI systems trust and cite your content.",
    faqs: [
      {
        question: "How is content authority measured?",
        answer: "Through citation frequency, being used as a source, and appearing in authoritative context. We track these signals across AI platforms.",
      },
      {
        question: "How do I build content authority?",
        answer: "Create comprehensive, accurate content. Get referenced by other authoritative sources. Demonstrate expertise consistently.",
      },
    ],
    keywords: ["content authority AI", "AI content trust", "authoritative content", "AI content authority"],
    category: "optimization",
  },
  {
    slug: "e-e-a-t",
    term: "E-E-A-T (Experience, Expertise, Authoritativeness, Trust)",
    shortDefinition: "Quality signals that influence how AI and search engines evaluate content credibility.",
    fullDefinition: "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness—a framework Google uses to evaluate content quality. These signals also influence AI systems' perception of content credibility. Content demonstrating clear expertise, author experience, topical authority, and trustworthiness is more likely to be well-represented in AI responses.",
    whyItMatters: "AI systems, like search engines, prefer trustworthy sources. Strong E-E-A-T signals improve how AI perceives and recommends your content.",
    examples: [
      "Author bios demonstrating expertise",
      "Content showing first-hand experience",
      "Trust signals like reviews and credentials",
    ],
    relatedTerms: [
      { term: "Content Authority", slug: "content-authority" },
      { term: "Trust Signals", slug: "trust-signals" },
      { term: "AI Optimization", slug: "ai-optimization" },
    ],
    usageInContext: "We optimize E-E-A-T signals to improve how AI systems perceive your content credibility.",
    faqs: [
      {
        question: "Does E-E-A-T affect AI visibility?",
        answer: "Yes. AI systems are trained to recognize quality signals similar to E-E-A-T. Authoritative, trustworthy content is more likely to be recommended.",
      },
      {
        question: "How do I improve E-E-A-T for AI?",
        answer: "Demonstrate author expertise, show first-hand experience, build authoritative backlinks, and maintain trustworthy site practices.",
      },
    ],
    keywords: ["E-E-A-T AI", "EEAT AI visibility", "AI content quality", "trust signals AI"],
    category: "optimization",
  },
  {
    slug: "query-intent",
    term: "Query Intent",
    shortDefinition: "The underlying purpose or goal behind a user's question to an AI assistant.",
    fullDefinition: "Query intent refers to the actual purpose behind a user's question. Understanding intent helps predict what kind of response AI will give and whether your brand should appear. Intents include informational (learning about something), navigational (finding a specific site), transactional (ready to buy), and commercial investigation (comparing options). Different intents create different visibility opportunities.",
    whyItMatters: "AI tailors responses to intent. Understanding which intents are most valuable for your brand helps prioritize optimization efforts.",
    examples: [
      "Informational: 'What is a CRM?'",
      "Commercial: 'Best CRM for small business'",
      "Transactional: 'HubSpot pricing'",
    ],
    relatedTerms: [
      { term: "Prompt", slug: "prompt" },
      { term: "AI Search", slug: "ai-search" },
      { term: "Purchase Intent", slug: "purchase-intent" },
    ],
    usageInContext: "We analyze query intent patterns in your category to prioritize high-value visibility opportunities.",
    faqs: [
      {
        question: "Which query intents are most valuable?",
        answer: "Commercial investigation intents ('best X for Y', 'compare X options') are typically most valuable as users are actively evaluating solutions.",
      },
      {
        question: "How do I find relevant intents?",
        answer: "We analyze how users phrase questions in your category, identifying the intents where your brand should appear.",
      },
    ],
    keywords: ["query intent AI", "search intent AI", "AI query intent", "user intent LLM"],
    category: "strategy",
  },
  {
    slug: "purchase-intent",
    term: "Purchase Intent",
    shortDefinition: "Queries indicating a user is ready or close to making a buying decision.",
    fullDefinition: "Purchase intent refers to queries that indicate a user is actively considering or ready to make a purchase. These are high-value visibility opportunities because users are at a decision point. AI recommendations for purchase-intent queries directly influence buying decisions, making visibility for these queries particularly important.",
    whyItMatters: "Visibility for purchase-intent queries reaches users when they're most ready to convert. This is where AI visibility most directly drives revenue.",
    examples: [
      "'Best email marketing tool for e-commerce'",
      "'Shopify vs BigCommerce for my store'",
      "'Should I buy [Product] or [Competitor]'",
    ],
    relatedTerms: [
      { term: "Query Intent", slug: "query-intent" },
      { term: "AI Recommendation", slug: "ai-recommendation" },
      { term: "Conversion", slug: "conversion" },
    ],
    usageInContext: "We prioritize visibility for purchase-intent queries that directly drive conversions.",
    faqs: [
      {
        question: "How do I identify purchase-intent queries?",
        answer: "Look for queries with 'best', 'compare', 'vs', 'for [use case]', and 'should I buy'. These indicate active evaluation.",
      },
      {
        question: "Are purchase-intent queries more competitive?",
        answer: "Often yes, but they're worth prioritizing due to their direct impact on conversions.",
      },
    ],
    keywords: ["purchase intent AI", "buying intent AI", "high intent queries AI", "AI buying decision"],
    category: "measurement",
  },
  {
    slug: "ai-crawling",
    term: "AI Crawling",
    shortDefinition: "How AI systems access and index web content for use in responses.",
    fullDefinition: "AI crawling refers to how AI systems and their associated services access web content. This includes OpenAI's GPTBot, Google's crawlers for Gemini, and various crawlers for retrieval-augmented systems. Understanding AI crawling helps ensure your content is accessible to AI systems that might reference it.",
    whyItMatters: "If AI crawlers can't access your content, it can't be used in responses. Proper crawlability is foundational to AI visibility.",
    examples: [
      "GPTBot crawling your website for training data",
      "Perplexity's crawler indexing your content for retrieval",
      "Robots.txt configurations affecting AI access",
    ],
    relatedTerms: [
      { term: "Web Crawling", slug: "web-crawling" },
      { term: "Retrieval Augmented Generation", slug: "retrieval-augmented-generation" },
      { term: "Training Data", slug: "training-data" },
    ],
    usageInContext: "We ensure your content is properly accessible to AI crawlers that feed visibility systems.",
    faqs: [
      {
        question: "Should I block AI crawlers?",
        answer: "Generally no, if you want AI visibility. Blocking crawlers prevents your content from being used in AI responses.",
      },
      {
        question: "How do I know if AI is crawling my site?",
        answer: "Check server logs for AI crawler user agents like GPTBot, ClaudeBot, or PerplexityBot.",
      },
    ],
    keywords: ["AI crawling", "GPTBot", "AI crawler", "LLM web crawling"],
    category: "optimization",
  },
  {
    slug: "first-mover-advantage",
    term: "First-Mover Advantage (AI)",
    shortDefinition: "The benefit of establishing AI visibility before competitors fully engage.",
    fullDefinition: "First-mover advantage in AI visibility refers to the benefits of establishing strong AI presence before competitors saturate the channel. Early movers can establish themselves as category leaders in AI recommendations, build authority that compounds over time, and capture visibility at lower cost than later entrants will face.",
    whyItMatters: "AI visibility is still an emerging channel. Brands optimizing now face less competition and can establish positions that become harder to displace.",
    examples: [
      "Becoming the default recommendation in your category",
      "Building AI authority that compounds over time",
      "Establishing visibility before cost increases",
    ],
    relatedTerms: [
      { term: "AI Visibility", slug: "ai-visibility" },
      { term: "Competitive Analysis", slug: "competitive-analysis-ai" },
      { term: "AI-First Marketing", slug: "ai-first-marketing" },
    ],
    usageInContext: "We help brands capture first-mover advantage while AI visibility is still an emerging opportunity.",
    faqs: [
      {
        question: "How long will first-mover advantage last?",
        answer: "The window is closing as more brands recognize the opportunity. Early investment now creates lasting advantages.",
      },
      {
        question: "Is it too late for first-mover advantage?",
        answer: "Not yet in most categories, but the window is narrowing. The sooner you start, the more advantage you capture.",
      },
    ],
    keywords: ["AI first-mover advantage", "early AI visibility", "AI competitive advantage", "AI early adopter"],
    category: "strategy",
  },
  {
    slug: "hallucination",
    term: "Hallucination",
    shortDefinition: "When AI generates false or fabricated information that appears convincing.",
    fullDefinition: "Hallucination refers to when AI systems generate information that is factually incorrect but presented confidently. AI might 'hallucinate' incorrect details about your brand—wrong products, features, or information. Understanding hallucination helps contextualize AI visibility challenges and the importance of ensuring AI has accurate information about your brand.",
    whyItMatters: "AI might say incorrect things about your brand due to hallucination. Monitoring and optimizing helps reduce inaccurate representations.",
    examples: [
      "AI mentioning a product feature you don't have",
      "Incorrect founding date or company details",
      "Made-up customer testimonials or statistics",
    ],
    relatedTerms: [
      { term: "Training Data", slug: "training-data" },
      { term: "Reputation Management", slug: "reputation-management-ai" },
      { term: "Sentiment Analysis", slug: "sentiment-analysis" },
    ],
    usageInContext: "We monitor for hallucinations about your brand and work to ensure AI has accurate information to draw from.",
    faqs: [
      {
        question: "Why does AI hallucinate?",
        answer: "AI generates responses based on patterns, sometimes creating plausible but incorrect information. This is a known limitation being actively improved.",
      },
      {
        question: "Can I prevent hallucinations about my brand?",
        answer: "You can't prevent them entirely, but ensuring accurate, clear information is widely available helps reduce their likelihood.",
      },
    ],
    keywords: ["AI hallucination", "LLM hallucination", "AI misinformation", "AI false information"],
    category: "ai-fundamentals",
  },
  {
    slug: "model-update",
    term: "Model Update",
    shortDefinition: "When an AI company releases a new or improved version of their language model.",
    fullDefinition: "A model update occurs when an AI company releases a new or improved version of their language model. Updates can bring new knowledge, improved capabilities, and potentially different behavior regarding brand recommendations. Model updates are important moments for AI visibility, as they may reset or change how your brand appears in responses.",
    whyItMatters: "Model updates can change your AI visibility. Monitoring updates and adjusting strategy ensures you maintain visibility as models evolve.",
    examples: [
      "GPT-4 update with new knowledge cutoff",
      "Claude 3 release with improved capabilities",
      "Gemini updates with new features",
    ],
    relatedTerms: [
      { term: "Knowledge Cutoff", slug: "knowledge-cutoff" },
      { term: "Training Data", slug: "training-data" },
      { term: "Large Language Model", slug: "large-language-model" },
    ],
    usageInContext: "We monitor model updates and adjust optimization to maintain visibility as AI systems evolve.",
    faqs: [
      {
        question: "How often do models update?",
        answer: "Major models typically have significant updates 1-2 times per year, with smaller improvements more frequently.",
      },
      {
        question: "Do updates affect my visibility?",
        answer: "They can. New training data or changed algorithms may affect recommendations. We monitor and adjust for updates.",
      },
    ],
    keywords: ["AI model update", "LLM update", "AI version update", "model upgrade"],
    category: "ai-fundamentals",
  },
  {
    slug: "ai-advertising",
    term: "AI Advertising",
    shortDefinition: "Paid advertising strategies specifically for AI platforms and AI-influenced channels.",
    fullDefinition: "AI advertising encompasses paid advertising strategies designed for AI platforms or AI-influenced channels. While organic AI visibility is currently the primary focus, AI advertising is emerging as platforms explore monetization. This includes potential future ad placements in AI responses, as well as current strategies to capture AI-influenced traffic.",
    whyItMatters: "As AI platforms mature, paid AI advertising will likely emerge. Understanding the landscape helps prepare for this evolution.",
    examples: [
      "Perplexity's emerging ad products",
      "Search ads capturing AI-researched queries",
      "Future AI platform advertising opportunities",
    ],
    relatedTerms: [
      { term: "AI Visibility", slug: "ai-visibility" },
      { term: "AI Search", slug: "ai-search" },
      { term: "Paid Media", slug: "paid-media" },
    ],
    usageInContext: "We monitor emerging AI advertising opportunities and help brands prepare for paid AI visibility.",
    faqs: [
      {
        question: "Can I pay for placement in AI responses?",
        answer: "Currently limited, but platforms like Perplexity are developing ad products. This space is evolving rapidly.",
      },
      {
        question: "How should I prepare for AI advertising?",
        answer: "Build strong organic AI visibility first. When paid options emerge, organic strength will inform better paid strategy.",
      },
    ],
    keywords: ["AI advertising", "AI ads", "AI platform advertising", "LLM advertising"],
    category: "strategy",
  },
  {
    slug: "wikipedia-ai",
    term: "Wikipedia (for AI)",
    shortDefinition: "Wikipedia's significant role as a training source and authority signal for AI systems.",
    fullDefinition: "Wikipedia plays an outsized role in AI visibility because it's a major training data source for most LLMs. Companies with Wikipedia pages are more likely to be recognized as entities by AI. Wikipedia's information often appears in AI responses, making Wikipedia presence and accuracy important for AI visibility strategy.",
    whyItMatters: "AI systems heavily weight Wikipedia. Having an accurate, comprehensive Wikipedia page significantly improves AI's understanding of your brand.",
    examples: [
      "Wikipedia company page appearing in AI knowledge",
      "Wikipedia data informing AI's understanding of your industry",
      "Wikipedia notability affecting AI entity recognition",
    ],
    relatedTerms: [
      { term: "Knowledge Graph", slug: "knowledge-graph" },
      { term: "Entity Recognition", slug: "entity-recognition" },
      { term: "Training Data", slug: "training-data" },
    ],
    usageInContext: "For larger brands, Wikipedia presence is an important component of AI visibility strategy.",
    faqs: [
      {
        question: "Do I need a Wikipedia page for AI visibility?",
        answer: "It's not required but significantly helps, especially for larger brands. Wikipedia is a major AI training source.",
      },
      {
        question: "Can I create my own Wikipedia page?",
        answer: "Wikipedia has strict notability requirements and conflict-of-interest policies. Generally, you shouldn't create your own page.",
      },
    ],
    keywords: ["Wikipedia AI", "Wikipedia LLM", "Wikipedia visibility", "AI Wikipedia"],
    category: "optimization",
  },
  {
    slug: "trust-signals",
    term: "Trust Signals",
    shortDefinition: "Indicators that help AI systems assess the credibility of a brand or content.",
    fullDefinition: "Trust signals are indicators that AI systems use to assess credibility and reliability of brands and content. These include reviews, certifications, authoritative backlinks, press coverage, and consistent information across sources. Strong trust signals make AI more likely to recommend your brand confidently.",
    whyItMatters: "AI systems aim to provide reliable recommendations. Strong trust signals increase confidence in recommending your brand.",
    examples: [
      "High ratings on review platforms",
      "Coverage in authoritative publications",
      "Industry certifications and awards",
    ],
    relatedTerms: [
      { term: "E-E-A-T", slug: "e-e-a-t" },
      { term: "Content Authority", slug: "content-authority" },
      { term: "Reputation Management", slug: "reputation-management-ai" },
    ],
    usageInContext: "We build trust signals that make AI systems confident in recommending your brand.",
    faqs: [
      {
        question: "What trust signals matter most for AI?",
        answer: "Reviews, authoritative coverage, consistent information, and presence on trusted platforms all contribute to AI trust.",
      },
      {
        question: "How do I build trust signals?",
        answer: "Earn reviews, get press coverage, maintain consistent accurate information, and build presence on authoritative sites.",
      },
    ],
    keywords: ["AI trust signals", "LLM trust", "AI credibility", "brand trust AI"],
    category: "optimization",
  },
  {
    slug: "schema-markup",
    term: "Schema Markup",
    shortDefinition: "Structured code that explicitly tells machines what content means.",
    fullDefinition: "Schema markup is a semantic vocabulary of code you can add to your website to help machines understand your content. Types include Organization, Product, FAQ, Review, and many others. Schema markup helps both search engines and AI systems accurately categorize and understand your content.",
    whyItMatters: "Schema provides explicit signals about content meaning, helping AI systems accurately understand and represent your offerings.",
    examples: [
      "Organization schema with company details",
      "Product schema with pricing and features",
      "FAQ schema for common questions",
    ],
    relatedTerms: [
      { term: "Structured Data", slug: "structured-data" },
      { term: "Content Optimization", slug: "content-optimization-ai" },
      { term: "Entity Recognition", slug: "entity-recognition" },
    ],
    usageInContext: "We implement comprehensive schema markup to help AI accurately understand your brand and offerings.",
    faqs: [
      {
        question: "Which schema types are most important?",
        answer: "Organization, Product, FAQ, and Review are foundational. Specific types depend on your business model.",
      },
      {
        question: "Does schema directly affect AI responses?",
        answer: "It helps AI systems understand your content accurately, contributing to better representation in responses.",
      },
    ],
    keywords: ["schema markup AI", "schema.org AI", "structured markup", "AI schema"],
    category: "optimization",
  },
  {
    slug: "web-crawling",
    term: "Web Crawling",
    shortDefinition: "The process of automatically discovering and indexing web content.",
    fullDefinition: "Web crawling is the automated process of discovering and downloading web content for indexing. Various AI systems employ web crawlers to gather content for training data or real-time retrieval. Understanding web crawling helps ensure your content is accessible to the systems that feed AI visibility.",
    whyItMatters: "If crawlers can't access your content, AI systems can't learn from or cite it. Crawlability is foundational to visibility.",
    examples: [
      "GPTBot crawling for training data",
      "Perplexity crawling for real-time retrieval",
      "Google crawling for Gemini responses",
    ],
    relatedTerms: [
      { term: "AI Crawling", slug: "ai-crawling" },
      { term: "Robots.txt", slug: "robots-txt" },
      { term: "Technical SEO", slug: "technical-seo" },
    ],
    usageInContext: "We ensure your website is optimally crawlable for AI systems.",
    faqs: [
      {
        question: "How do I make my site crawlable for AI?",
        answer: "Ensure crawlers aren't blocked, content is accessible, and your site loads quickly. Standard technical SEO practices apply.",
      },
      {
        question: "Should I treat AI crawlers differently?",
        answer: "Generally, if you want AI visibility, ensure AI crawlers have access. Some sites block them, sacrificing visibility for other concerns.",
      },
    ],
    keywords: ["web crawling AI", "AI crawler", "site crawling", "crawlability AI"],
    category: "optimization",
  },
  {
    slug: "robots-txt",
    term: "Robots.txt",
    shortDefinition: "A file that tells web crawlers which pages they can or cannot access.",
    fullDefinition: "Robots.txt is a text file at a website's root that provides instructions to web crawlers about which pages to access or ignore. With AI crawlers like GPTBot and ClaudeBot, robots.txt decisions affect whether your content can be used for AI training or retrieval. Understanding robots.txt implications is important for AI visibility strategy.",
    whyItMatters: "Blocking AI crawlers in robots.txt prevents your content from being used in AI responses. This is a fundamental AI visibility decision.",
    examples: [
      "Allowing GPTBot access: 'User-agent: GPTBot Allow: /'",
      "Blocking all AI crawlers from certain sections",
      "Selectively managing crawler access",
    ],
    relatedTerms: [
      { term: "AI Crawling", slug: "ai-crawling" },
      { term: "Web Crawling", slug: "web-crawling" },
      { term: "Technical SEO", slug: "technical-seo" },
    ],
    usageInContext: "We audit robots.txt configurations to ensure optimal AI crawler access.",
    faqs: [
      {
        question: "Should I block AI crawlers?",
        answer: "If you want AI visibility, generally no. Some publishers block for content control reasons, but this sacrifices visibility.",
      },
      {
        question: "Which AI crawlers should I allow?",
        answer: "GPTBot, ClaudeBot, PerplexityBot are key ones. We can audit your configuration for optimal AI access.",
      },
    ],
    keywords: ["robots.txt AI", "AI crawler robots", "block AI crawler", "allow AI crawler"],
    category: "optimization",
  },
  {
    slug: "chatbot",
    term: "Chatbot",
    shortDefinition: "A software application that simulates conversation with users.",
    fullDefinition: "A chatbot is software that simulates conversation, ranging from simple rule-based systems to sophisticated AI-powered assistants. Modern AI chatbots powered by LLMs can engage in nuanced dialogue. For businesses, chatbots represent both a customer interaction channel and an opportunity for brand visibility when users ask chatbots for recommendations.",
    whyItMatters: "AI-powered chatbots are recommendation channels. Whether on AI platforms or your own site, chatbots influence user decisions and require visibility optimization.",
    examples: [
      "AI-powered customer service chatbots",
      "Website chat assistants providing recommendations",
      "Platform chatbots like ChatGPT answering user questions",
    ],
    relatedTerms: [
      { term: "AI Assistant", slug: "ai-assistant" },
      { term: "Conversational AI", slug: "conversational-ai" },
      { term: "Large Language Model", slug: "large-language-model" },
    ],
    usageInContext: "We optimize for visibility in AI chatbot conversations where users seek recommendations.",
    faqs: [
      {
        question: "How do chatbots affect my brand visibility?",
        answer: "AI chatbots recommend brands during conversations. Being visible in these recommendations is increasingly important for discovery.",
      },
      {
        question: "Should I build my own chatbot?",
        answer: "Many businesses do, but the larger opportunity is visibility in major AI platforms where users already go for advice.",
      },
    ],
    keywords: ["chatbot AI", "AI chatbot", "conversational bot", "chat AI"],
    category: "ai-fundamentals",
  },
  {
    slug: "openai",
    term: "OpenAI",
    shortDefinition: "The AI company that created ChatGPT and the GPT family of models.",
    fullDefinition: "OpenAI is an artificial intelligence research company that created ChatGPT, GPT-4, and other influential AI systems. As the company behind the most widely-used AI assistant, OpenAI's models and policies significantly impact AI visibility strategies. Understanding OpenAI's approach helps contextualize ChatGPT optimization efforts.",
    whyItMatters: "OpenAI's ChatGPT is the largest AI assistant. Understanding OpenAI helps contextualize visibility efforts for their platforms.",
    examples: [
      "ChatGPT powered by OpenAI's GPT-4",
      "GPTBot crawler gathering training data",
      "OpenAI's API powering various applications",
    ],
    relatedTerms: [
      { term: "ChatGPT", slug: "chatgpt" },
      { term: "GPT-4", slug: "gpt-4" },
      { term: "Large Language Model", slug: "large-language-model" },
    ],
    usageInContext: "We optimize for OpenAI's platforms, particularly ChatGPT, as part of comprehensive AI visibility strategy.",
    faqs: [
      {
        question: "How do I contact OpenAI about my brand?",
        answer: "OpenAI doesn't offer direct brand optimization. Visibility is achieved through optimizing your digital presence, which OpenAI's systems then learn from.",
      },
      {
        question: "Does OpenAI favor certain brands?",
        answer: "OpenAI doesn't manually curate recommendations. AI recommendations are based on training data patterns and user queries.",
      },
    ],
    keywords: ["OpenAI", "OpenAI visibility", "OpenAI marketing", "OpenAI brand"],
    category: "platforms",
  },
  {
    slug: "anthropic",
    term: "Anthropic",
    shortDefinition: "The AI safety company that created Claude.",
    fullDefinition: "Anthropic is an AI safety company that created Claude, one of the leading AI assistants. Founded by former OpenAI researchers, Anthropic focuses on building AI that is helpful, harmless, and honest. Claude is known for thoughtful, nuanced responses and is popular among professional users, making Anthropic's platform important for B2B AI visibility.",
    whyItMatters: "Anthropic's Claude has a professional user base. Visibility in Claude reaches decision-makers and researchers.",
    examples: [
      "Claude providing business recommendations",
      "Professionals using Claude for research",
      "Claude API powering business applications",
    ],
    relatedTerms: [
      { term: "Claude", slug: "claude" },
      { term: "AI Assistant", slug: "ai-assistant" },
      { term: "Large Language Model", slug: "large-language-model" },
    ],
    usageInContext: "We optimize for Anthropic's Claude, particularly important for B2B visibility.",
    faqs: [
      {
        question: "How is Anthropic different from OpenAI?",
        answer: "Anthropic focuses heavily on AI safety. Claude tends to give more careful, nuanced responses and is popular in professional settings.",
      },
      {
        question: "Should I optimize separately for Claude?",
        answer: "Core principles apply across platforms, but we test on Claude specifically given its distinct user base.",
      },
    ],
    keywords: ["Anthropic", "Anthropic Claude", "Anthropic AI", "Anthropic visibility"],
    category: "platforms",
  },
  {
    slug: "gpt-4",
    term: "GPT-4",
    shortDefinition: "OpenAI's most advanced language model, powering ChatGPT.",
    fullDefinition: "GPT-4 (Generative Pre-trained Transformer 4) is OpenAI's most advanced language model, powering ChatGPT and many other applications. GPT-4 demonstrates remarkable capabilities in understanding and generating text, making it the most influential model for AI visibility. Understanding GPT-4's capabilities and limitations helps optimize for ChatGPT visibility.",
    whyItMatters: "GPT-4 powers the most-used AI assistant. Understanding its capabilities helps optimize for ChatGPT visibility effectively.",
    examples: [
      "ChatGPT using GPT-4 for user interactions",
      "GPT-4 API powering various applications",
      "GPT-4's multimodal capabilities understanding images",
    ],
    relatedTerms: [
      { term: "ChatGPT", slug: "chatgpt" },
      { term: "OpenAI", slug: "openai" },
      { term: "Large Language Model", slug: "large-language-model" },
    ],
    usageInContext: "We optimize for GPT-4's capabilities as the model powering ChatGPT.",
    faqs: [
      {
        question: "What's GPT-4's knowledge cutoff?",
        answer: "GPT-4's training data has a cutoff date, typically several months before release. Browse features can access more current information.",
      },
      {
        question: "How does GPT-4 decide recommendations?",
        answer: "GPT-4 bases responses on training data patterns. We optimize your digital presence to influence these patterns favorably.",
      },
    ],
    keywords: ["GPT-4", "GPT-4 visibility", "GPT-4 optimization", "ChatGPT GPT-4"],
    category: "platforms",
  },
  {
    slug: "traditional-search",
    term: "Traditional Search",
    shortDefinition: "Search engines like Google that return lists of links to websites.",
    fullDefinition: "Traditional search refers to search engines like Google, Bing, and Yahoo that return lists of links in response to queries. Unlike AI search that provides synthesized answers, traditional search directs users to click through to websites. Traditional search remains important but is complemented—and for some queries, replaced—by AI search.",
    whyItMatters: "Understanding the difference between traditional and AI search helps allocate visibility efforts appropriately across channels.",
    examples: [
      "Google search returning 10 blue links",
      "Bing showing website results",
      "DuckDuckGo providing privacy-focused search",
    ],
    relatedTerms: [
      { term: "AI Search", slug: "ai-search" },
      { term: "SEO", slug: "seo-traditional" },
      { term: "Zero-Click Search", slug: "zero-click-search" },
    ],
    usageInContext: "We help brands balance traditional SEO with emerging AI visibility for comprehensive search presence.",
    faqs: [
      {
        question: "Is traditional search still important?",
        answer: "Yes. Traditional search still drives significant traffic. The best strategy optimizes for both traditional and AI search.",
      },
      {
        question: "How is AI search different?",
        answer: "AI provides synthesized answers rather than links. Users may get complete answers without clicking through to websites.",
      },
    ],
    keywords: ["traditional search", "Google search", "search engine", "SERP"],
    category: "visibility",
  },
  {
    slug: "conversion",
    term: "Conversion",
    shortDefinition: "When a user completes a desired action like purchase, signup, or inquiry.",
    fullDefinition: "A conversion occurs when a user completes a desired action—making a purchase, signing up for a trial, submitting an inquiry, or other goals. Tracking conversions from AI-referred traffic helps measure AI visibility ROI. AI-referred conversions often show higher quality due to the research-oriented nature of AI usage.",
    whyItMatters: "Conversions are the ultimate measure of AI visibility success. Tracking AI-attributed conversions proves ROI and guides optimization.",
    examples: [
      "Purchase from AI-referred visitor",
      "Demo request after AI recommendation",
      "Signup influenced by AI research",
    ],
    relatedTerms: [
      { term: "AI Attribution", slug: "ai-attribution" },
      { term: "Purchase Intent", slug: "purchase-intent" },
      { term: "ROI", slug: "roi" },
    ],
    usageInContext: "We help track and optimize for conversions from AI-referred traffic.",
    faqs: [
      {
        question: "Do AI referrals convert better?",
        answer: "Often yes. Users who research via AI tend to be further along in decision-making, leading to higher quality conversions.",
      },
      {
        question: "How do I track AI conversions?",
        answer: "We use multiple signals including traffic analysis, surveys, and branded search correlation to attribute conversions to AI sources.",
      },
    ],
    keywords: ["AI conversion", "conversion tracking AI", "AI referral conversion", "AI marketing conversion"],
    category: "measurement",
  },
  {
    slug: "traffic-analysis",
    term: "Traffic Analysis",
    shortDefinition: "Examining website visitor patterns to understand sources and behavior.",
    fullDefinition: "Traffic analysis involves examining website visitor patterns, sources, and behavior. For AI visibility, traffic analysis helps identify AI-referred visitors by looking at referral patterns, landing pages, behavior, and timing correlations. While AI doesn't pass traditional referrer data, careful analysis can reveal AI influence on traffic.",
    whyItMatters: "Traffic analysis is essential for understanding AI visibility impact since direct AI referral data isn't available.",
    examples: [
      "Correlating traffic spikes with AI optimization",
      "Analyzing direct traffic patterns for AI influence",
      "Examining behavior differences of suspected AI referrals",
    ],
    relatedTerms: [
      { term: "AI Attribution", slug: "ai-attribution" },
      { term: "Conversion", slug: "conversion" },
      { term: "Analytics", slug: "analytics" },
    ],
    usageInContext: "We analyze traffic patterns to identify and measure AI visibility impact.",
    faqs: [
      {
        question: "How can you tell traffic came from AI?",
        answer: "We look for patterns: traffic correlating with optimization, changes in direct traffic, behavioral signals, and branded search increases.",
      },
      {
        question: "Why doesn't AI show as a referrer?",
        answer: "AI assistants don't pass referrer data when users visit recommended sites. Attribution requires indirect analysis methods.",
      },
    ],
    keywords: ["AI traffic analysis", "traffic attribution", "website analytics AI", "AI referral traffic"],
    category: "measurement",
  },
  {
    slug: "roi",
    term: "ROI (Return on Investment)",
    shortDefinition: "The financial return generated relative to AI visibility investment.",
    fullDefinition: "ROI for AI visibility measures the financial return generated compared to investment in optimization. This includes revenue from AI-attributed traffic, brand awareness value, and competitive positioning benefits. Calculating AI visibility ROI requires careful attribution and valuation of both direct and indirect benefits.",
    whyItMatters: "ROI justifies AI visibility investment and guides resource allocation. Understanding return helps optimize spending.",
    examples: [
      "Revenue from AI-attributed conversions vs. optimization cost",
      "Brand awareness value from AI mentions",
      "Cost savings from lower CAC through AI channel",
    ],
    relatedTerms: [
      { term: "AI Attribution", slug: "ai-attribution" },
      { term: "Conversion", slug: "conversion" },
      { term: "Traffic Analysis", slug: "traffic-analysis" },
    ],
    usageInContext: "We track and report ROI to demonstrate AI visibility value and optimize investment.",
    faqs: [
      {
        question: "What ROI can I expect from AI visibility?",
        answer: "ROI varies by industry and starting point, but clients typically see positive returns within 90 days through qualified traffic and conversions.",
      },
      {
        question: "How do you calculate AI visibility ROI?",
        answer: "We track AI-attributed traffic and conversions, calculate revenue impact, and compare to visibility investment.",
      },
    ],
    keywords: ["AI visibility ROI", "AI marketing ROI", "return on AI investment", "AI optimization ROI"],
    category: "measurement",
  },
  {
    slug: "seo-traditional",
    term: "SEO (Search Engine Optimization)",
    shortDefinition: "Optimizing websites to rank higher in traditional search engine results.",
    fullDefinition: "SEO (Search Engine Optimization) is the practice of optimizing websites to rank higher in traditional search engine results like Google. While related to AI visibility, SEO focuses on different algorithms and tactics. Strong SEO can support AI visibility (as search-visible content may appear in training data), but SEO alone doesn't ensure AI visibility.",
    whyItMatters: "Understanding SEO's relationship to AI visibility helps build comprehensive search strategy that covers both traditional and AI channels.",
    examples: [
      "Optimizing for Google rankings",
      "Building backlinks for authority",
      "Technical site optimization for crawlability",
    ],
    relatedTerms: [
      { term: "LLM SEO", slug: "llm-seo" },
      { term: "Traditional Search", slug: "traditional-search" },
      { term: "AI Optimization", slug: "ai-optimization" },
    ],
    usageInContext: "We help brands complement SEO with AI visibility for comprehensive search presence.",
    faqs: [
      {
        question: "Is SEO enough for AI visibility?",
        answer: "No. SEO and AI visibility require different approaches. Strong SEO helps but doesn't guarantee AI visibility.",
      },
      {
        question: "Should I do SEO or AI visibility?",
        answer: "Both. They complement each other for comprehensive search visibility across traditional and AI channels.",
      },
    ],
    keywords: ["SEO", "search engine optimization", "Google SEO", "traditional SEO"],
    category: "optimization",
  },
  {
    slug: "technical-seo",
    term: "Technical SEO",
    shortDefinition: "Website infrastructure optimization that affects both search and AI visibility.",
    fullDefinition: "Technical SEO refers to website infrastructure optimizations—site speed, mobile-friendliness, crawlability, structured data, and more. These technical factors affect both traditional SEO and AI visibility. Proper technical SEO ensures AI crawlers can access and understand your content effectively.",
    whyItMatters: "Technical SEO provides the foundation for both search and AI visibility. Poor technical implementation limits all visibility efforts.",
    examples: [
      "Fast page load speeds",
      "Mobile-responsive design",
      "Proper crawler access configuration",
    ],
    relatedTerms: [
      { term: "Web Crawling", slug: "web-crawling" },
      { term: "Robots.txt", slug: "robots-txt" },
      { term: "Structured Data", slug: "structured-data" },
    ],
    usageInContext: "We ensure technical SEO supports both traditional and AI visibility goals.",
    faqs: [
      {
        question: "Does technical SEO affect AI visibility?",
        answer: "Yes. Technical factors like crawlability and structure affect how AI systems access and understand your content.",
      },
      {
        question: "What technical factors matter most for AI?",
        answer: "Crawlability, content structure, load speed, and proper markup all contribute to AI visibility effectiveness.",
      },
    ],
    keywords: ["technical SEO AI", "technical optimization", "site structure SEO", "crawlability"],
    category: "optimization",
  },
  {
    slug: "paid-media",
    term: "Paid Media",
    shortDefinition: "Advertising where you pay for visibility, including potential future AI advertising.",
    fullDefinition: "Paid media encompasses advertising where you pay for visibility—search ads, social ads, display, and emerging AI advertising opportunities. While most AI visibility is currently organic, paid options are emerging on platforms like Perplexity. Understanding paid media's relationship to AI visibility helps plan comprehensive marketing strategy.",
    whyItMatters: "Paid media and AI visibility are complementary. Strong organic AI visibility makes paid efforts more effective, and paid can amplify organic visibility.",
    examples: [
      "Search ads capturing AI-researched queries",
      "Emerging AI platform advertising",
      "Paid content amplifying organic visibility",
    ],
    relatedTerms: [
      { term: "AI Advertising", slug: "ai-advertising" },
      { term: "ROI", slug: "roi" },
      { term: "AI Visibility", slug: "ai-visibility" },
    ],
    usageInContext: "We help brands integrate AI visibility with paid media for comprehensive marketing strategy.",
    faqs: [
      {
        question: "Should I do paid media or AI visibility?",
        answer: "Both work together. Organic AI visibility builds foundation; paid can amplify and capture additional traffic.",
      },
      {
        question: "Are there AI platform ads?",
        answer: "Emerging. Perplexity has advertising products in development. This space is evolving rapidly.",
      },
    ],
    keywords: ["paid media AI", "AI advertising", "paid visibility", "media buying AI"],
    category: "strategy",
  },
  {
    slug: "semantic-search",
    term: "Semantic Search",
    shortDefinition: "Search that understands meaning and intent, not just keywords.",
    fullDefinition: "Semantic search refers to search systems that understand the meaning and intent behind queries, not just matching keywords. AI assistants represent the ultimate evolution of semantic search, understanding nuanced questions and providing contextual answers. Optimizing for semantic understanding is key to AI visibility.",
    whyItMatters: "AI uses semantic understanding to match queries with relevant brands. Your content must be semantically clear for AI to understand and recommend you.",
    examples: [
      "AI understanding 'CRM for startups' and 'customer management for new companies' mean similar things",
      "Recognizing intent behind different phrasings",
      "Connecting related concepts semantically",
    ],
    relatedTerms: [
      { term: "Natural Language Processing", slug: "natural-language-processing" },
      { term: "Query Intent", slug: "query-intent" },
      { term: "AI Search", slug: "ai-search" },
    ],
    usageInContext: "We optimize for semantic understanding so AI accurately connects your brand to relevant queries.",
    faqs: [
      {
        question: "How do I optimize for semantic search?",
        answer: "Use clear, varied language that expresses your value proposition in multiple ways. Help AI understand meaning, not just keywords.",
      },
      {
        question: "Is semantic different from keyword optimization?",
        answer: "Yes. Semantic focuses on meaning and relationships; keyword optimization focuses on specific terms. Both matter, but semantic is increasingly important.",
      },
    ],
    keywords: ["semantic search AI", "semantic SEO", "meaning-based search", "semantic optimization"],
    category: "optimization",
  },
  {
    slug: "analytics",
    term: "Analytics",
    shortDefinition: "Tools and practices for measuring digital performance including AI visibility.",
    fullDefinition: "Analytics encompasses the tools and practices used to measure digital performance. For AI visibility, analytics involves tracking AI-attributed traffic, measuring brand mentions across AI platforms, and understanding the impact of optimization efforts. Traditional analytics tools are supplemented with AI-specific tracking for comprehensive measurement.",
    whyItMatters: "Analytics prove AI visibility ROI and guide optimization efforts. Without measurement, you can't improve or justify investment.",
    examples: [
      "Google Analytics tracking site traffic",
      "AI mention monitoring across platforms",
      "Attribution analysis for AI referrals",
    ],
    relatedTerms: [
      { term: "Traffic Analysis", slug: "traffic-analysis" },
      { term: "AI Attribution", slug: "ai-attribution" },
      { term: "ROI", slug: "roi" },
    ],
    usageInContext: "We provide comprehensive analytics covering both traditional metrics and AI visibility performance.",
    faqs: [
      {
        question: "What analytics do I need for AI visibility?",
        answer: "Traditional analytics plus AI-specific tracking: mention monitoring, visibility testing, and attribution analysis.",
      },
      {
        question: "How do you track AI performance?",
        answer: "We combine platform testing, traffic analysis, and proprietary monitoring to measure AI visibility comprehensively.",
      },
    ],
    keywords: ["AI analytics", "visibility analytics", "AI tracking", "AI measurement"],
    category: "measurement",
  },
  {
    slug: "platform-coverage",
    term: "Platform Coverage",
    shortDefinition: "The range of AI platforms where your brand has visibility.",
    fullDefinition: "Platform coverage refers to how many AI platforms include and accurately represent your brand. Comprehensive coverage across ChatGPT, Claude, Perplexity, Gemini, Copilot, and others ensures you reach users regardless of their AI assistant preference. Different platforms may have different knowledge about your brand, making multi-platform optimization important.",
    whyItMatters: "Users have AI platform preferences. Comprehensive coverage ensures you don't miss users on any major platform.",
    examples: [
      "Visibility across ChatGPT, Claude, Perplexity, Gemini",
      "Consistent brand representation across platforms",
      "Addressing platform-specific gaps",
    ],
    relatedTerms: [
      { term: "Omnichannel AI", slug: "omnichannel-ai" },
      { term: "AI Visibility", slug: "ai-visibility" },
      { term: "AI Assistant", slug: "ai-assistant" },
    ],
    usageInContext: "We monitor and optimize platform coverage to ensure comprehensive AI visibility.",
    faqs: [
      {
        question: "Which platforms should I cover?",
        answer: "At minimum: ChatGPT, Claude, Perplexity, Gemini. These represent the vast majority of AI assistant usage.",
      },
      {
        question: "Do platforms require different optimization?",
        answer: "Core principles are similar, but we test each platform to identify and address platform-specific gaps.",
      },
    ],
    keywords: ["AI platform coverage", "multi-platform AI", "AI platform visibility", "cross-platform optimization"],
    category: "strategy",
  },
  {
    slug: "google",
    term: "Google (AI Context)",
    shortDefinition: "Google's role in AI through Gemini and AI integration in Search.",
    fullDefinition: "In the AI context, Google is significant for Gemini (their AI assistant), AI integration in Google Search, and their knowledge graph that influences AI systems broadly. Google's massive user base means Gemini and AI-enhanced Search will touch billions of users, making Google's AI products increasingly important for visibility strategy.",
    whyItMatters: "Google's reach means their AI products will become major visibility channels. Early optimization for Gemini positions brands for this evolution.",
    examples: [
      "Gemini providing AI answers in Google Search",
      "Google's Knowledge Graph informing AI systems",
      "Android integration of Gemini",
    ],
    relatedTerms: [
      { term: "Gemini", slug: "gemini" },
      { term: "Traditional Search", slug: "traditional-search" },
      { term: "Knowledge Graph", slug: "knowledge-graph" },
    ],
    usageInContext: "We optimize for Google's AI products as part of comprehensive visibility strategy.",
    faqs: [
      {
        question: "How does Google AI differ from ChatGPT?",
        answer: "Google's AI is integrated into Search and other Google products, potentially reaching more users through existing touchpoints.",
      },
      {
        question: "Should I optimize for Google AI separately?",
        answer: "Google's Knowledge Graph and structured data matter for Gemini. We include Google AI in comprehensive optimization.",
      },
    ],
    keywords: ["Google AI", "Google Gemini", "Google AI Search", "Google AI visibility"],
    category: "platforms",
  },
  {
    slug: "microsoft",
    term: "Microsoft (AI Context)",
    shortDefinition: "Microsoft's role in AI through Copilot and Bing integration.",
    fullDefinition: "In the AI context, Microsoft is significant for Copilot (their AI assistant), integration with Microsoft 365, and Bing's AI features. With hundreds of millions of Microsoft 365 users, Copilot represents a major AI visibility channel, particularly for B2B brands. Microsoft's partnership with OpenAI also gives them access to cutting-edge AI technology.",
    whyItMatters: "Microsoft's workplace dominance means Copilot reaches professionals daily. B2B visibility requires attention to Microsoft's AI products.",
    examples: [
      "Copilot in Microsoft 365 for work tasks",
      "Bing's AI-enhanced search results",
      "Copilot in Windows and Edge",
    ],
    relatedTerms: [
      { term: "Copilot", slug: "copilot" },
      { term: "Bing", slug: "bing" },
      { term: "OpenAI", slug: "openai" },
    ],
    usageInContext: "We include Microsoft's AI products in comprehensive visibility strategy, especially for B2B.",
    faqs: [
      {
        question: "Is Microsoft AI important for B2B?",
        answer: "Yes. Copilot's integration with Microsoft 365 means professionals use it for work tasks, including vendor research.",
      },
      {
        question: "How does Microsoft AI relate to OpenAI?",
        answer: "Microsoft partners with OpenAI and uses their technology, but has distinct products and integrations.",
      },
    ],
    keywords: ["Microsoft AI", "Microsoft Copilot", "Bing AI", "Microsoft AI visibility"],
    category: "platforms",
  },
  {
    slug: "bing",
    term: "Bing",
    shortDefinition: "Microsoft's search engine with integrated AI capabilities.",
    fullDefinition: "Bing is Microsoft's search engine, now featuring integrated AI capabilities through Copilot. While smaller than Google, Bing's AI integration and presence in Microsoft products gives it significance for AI visibility. Bing's AI features represent an early example of traditional search evolving toward AI-powered responses.",
    whyItMatters: "Bing's AI integration reaches users in Microsoft's ecosystem. As search evolves toward AI, Bing represents part of the visibility landscape.",
    examples: [
      "Bing Chat/Copilot answering queries",
      "AI-generated summaries in Bing results",
      "Integration with Microsoft Edge",
    ],
    relatedTerms: [
      { term: "Microsoft", slug: "microsoft" },
      { term: "Copilot", slug: "copilot" },
      { term: "Traditional Search", slug: "traditional-search" },
    ],
    usageInContext: "We include Bing's AI features in multi-platform visibility optimization.",
    faqs: [
      {
        question: "How important is Bing AI?",
        answer: "While smaller than ChatGPT, Bing AI reaches users in Microsoft's ecosystem. It's part of comprehensive coverage.",
      },
      {
        question: "Is Bing AI different from Copilot?",
        answer: "They're integrated. Copilot powers AI features in Bing and across Microsoft products.",
      },
    ],
    keywords: ["Bing AI", "Bing Chat", "Bing Copilot", "Bing AI visibility"],
    category: "platforms",
  },
];

/**
 * Get all glossary terms for static generation
 */
export function getAllTerms(): GlossaryTerm[] {
  return glossaryTerms;
}

/**
 * Get a specific term by slug
 */
export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}

/**
 * Get all term slugs for generateStaticParams
 */
export function getAllTermSlugs(): string[] {
  return glossaryTerms.map((t) => t.slug);
}

/**
 * Get terms by category
 */
export function getTermsByCategory(
  category: GlossaryTerm["category"]
): GlossaryTerm[] {
  return glossaryTerms.filter((t) => t.category === category);
}

/**
 * Get all categories with counts
 */
export function getGlossaryCategories(): { slug: string; name: string; count: number }[] {
  const categoryNames: Record<GlossaryTerm["category"], string> = {
    "ai-fundamentals": "AI Fundamentals",
    visibility: "Visibility",
    optimization: "Optimization",
    measurement: "Measurement",
    strategy: "Strategy",
    platforms: "Platforms",
  };

  const counts: Record<string, number> = {};
  for (const term of glossaryTerms) {
    counts[term.category] = (counts[term.category] || 0) + 1;
  }

  return Object.entries(categoryNames).map(([slug, name]) => ({
    slug,
    name,
    count: counts[slug] || 0,
  }));
}
