/**
 * Persona data for programmatic SEO
 * Each persona generates a dedicated landing page at /for/[persona]
 */

export interface PainPoint {
  title: string;
  description: string;
  solution: string;
}

export interface KPI {
  metric: string;
  howWeHelp: string;
}

export interface Objection {
  objection: string;
  response: string;
}

export interface PersonaFAQ {
  question: string;
  answer: string;
}

export interface Persona {
  slug: string;
  title: string;
  fullTitle: string;
  headline: string;
  description: string;
  painPoints: PainPoint[];
  kpis: KPI[];
  objections: Objection[];
  relevantIndustries: string[];
  faqs: PersonaFAQ[];
  keywords: string[];
  seniority: "c-suite" | "director" | "manager";
}

export const personas: Persona[] = [
  {
    slug: "cmo",
    title: "CMO",
    fullTitle: "Chief Marketing Officer",
    headline: "AI Search Visibility for CMOs",
    description:
      "As a CMO, you're responsible for every touchpoint between your brand and customers. AI assistants are becoming one of the most influential touchpoints—and most marketing teams have zero visibility into how their brand appears. We help CMOs take control of this critical new channel.",
    painPoints: [
      {
        title: "Invisible ROI Attribution",
        description:
          "Your brand may be getting recommended by AI, or competitors may be stealing share—you have no way to know without proper tracking.",
        solution:
          "We provide comprehensive AI visibility audits and ongoing monitoring so you can track and attribute AI-driven traffic.",
      },
      {
        title: "Channel Strategy Gaps",
        description:
          "Your marketing mix doesn't include AI search optimization, creating a blind spot as consumers shift their search behavior.",
        solution:
          "We integrate AI visibility into your overall channel strategy, ensuring you're reaching customers wherever they search.",
      },
      {
        title: "Competitor Intelligence",
        description:
          "You don't know how competitors appear in AI recommendations or what strategies they're using.",
        solution:
          "We provide competitive AI visibility analysis showing exactly how you stack up and where opportunities exist.",
      },
      {
        title: "Team Capability Gaps",
        description:
          "Your team doesn't have expertise in AI search optimization—it's too new and different from traditional SEO or paid media.",
        solution:
          "We bring specialized expertise your team lacks, handling AI visibility while they focus on channels they know best.",
      },
      {
        title: "Board-Level Pressure",
        description:
          "The board is asking about AI's impact on marketing but you don't have clear answers or strategy.",
        solution:
          "We provide executive-level reporting and strategy that positions you as proactive on AI's marketing implications.",
      },
    ],
    kpis: [
      {
        metric: "Brand Mentions in AI",
        howWeHelp:
          "We track how often your brand is recommended across ChatGPT, Claude, Perplexity, and other AI platforms.",
      },
      {
        metric: "Share of Voice in AI",
        howWeHelp:
          "We measure your AI visibility compared to key competitors in your category.",
      },
      {
        metric: "AI-Attributed Traffic",
        howWeHelp:
          "We help you identify and track traffic coming from AI recommendations.",
      },
      {
        metric: "Customer Acquisition Cost",
        howWeHelp:
          "AI referrals typically have lower CAC than paid channels—we help you capture this efficient channel.",
      },
    ],
    objections: [
      {
        objection: "Is AI search really significant enough to warrant investment?",
        response:
          "40% of Gen Z prefers AI over Google for product research. 73% of B2B buyers use AI in their buying process. These numbers are growing exponentially—early investment establishes dominance before costs rise.",
      },
      {
        objection: "How do I justify this to the CFO?",
        response:
          "AI-attributed traffic shows 4.2x higher conversion rates than paid ads. We provide clear ROI tracking and typically see positive returns within 90 days.",
      },
      {
        objection: "We're already doing SEO—isn't that enough?",
        response:
          "AI optimization is fundamentally different from SEO. AI models synthesize information differently, and traditional SEO tactics don't translate. Many SEO-strong brands are invisible in AI results.",
      },
    ],
    relevantIndustries: ["saas", "ecommerce", "fintech"],
    faqs: [
      {
        question: "How quickly can I show results to the board?",
        answer:
          "Most CMOs see measurable improvements within 6-8 weeks, with comprehensive reporting available for board presentations within 90 days.",
      },
      {
        question: "How does this integrate with our existing marketing stack?",
        answer:
          "We work alongside your existing SEO, content, and paid teams. AI visibility is complementary, not competitive, with your current channels.",
      },
      {
        question: "What resources do we need to allocate internally?",
        answer:
          "Minimal. We handle the optimization work; you mainly need to provide access to existing brand assets and content, and participate in quarterly strategy reviews.",
      },
      {
        question: "How do you handle multi-brand portfolios?",
        answer:
          "We have experience optimizing visibility for brand portfolios, ensuring each brand has appropriate visibility while avoiding cannibalization.",
      },
      {
        question: "Can you present to our leadership team?",
        answer:
          "Yes. We regularly present AI visibility strategy and results to C-suite executives and boards.",
      },
    ],
    keywords: [
      "AI visibility for CMO",
      "CMO AI marketing strategy",
      "chief marketing officer AI search",
      "CMO ChatGPT optimization",
    ],
    seniority: "c-suite",
  },
  {
    slug: "vp-marketing",
    title: "VP Marketing",
    fullTitle: "Vice President of Marketing",
    headline: "AI Search Visibility for VPs of Marketing",
    description:
      "As VP of Marketing, you're bridging strategy and execution. AI search is emerging as a critical channel that doesn't fit neatly into existing team structures or processes. We help VPs of Marketing integrate AI visibility into their marketing operations without disrupting current initiatives.",
    painPoints: [
      {
        title: "Channel Ownership Confusion",
        description:
          "AI visibility doesn't clearly belong to SEO, content, or paid—your teams don't know who should own it.",
        solution:
          "We work as a specialized partner that handles AI visibility directly, collaborating with your existing teams without disrupting their focus.",
      },
      {
        title: "Resource Allocation Challenges",
        description:
          "You can't justify pulling resources from proven channels to experiment with AI optimization.",
        solution:
          "Our model requires minimal internal resources—we handle the work while you maintain focus on existing priorities.",
      },
      {
        title: "Measurement Complexity",
        description:
          "You can't measure AI visibility or attribute results, making it hard to prioritize against proven channels.",
        solution:
          "We provide clear measurement frameworks and attribution models that integrate with your existing analytics.",
      },
      {
        title: "Team Skill Gaps",
        description:
          "No one on your team has AI optimization expertise, and training takes time you don't have.",
        solution:
          "We bring specialized expertise immediately—no training required. Over time, we can upskill your team if desired.",
      },
      {
        title: "Execution Bandwidth",
        description:
          "Your team is already stretched thin on current initiatives—adding new channels isn't realistic.",
        solution:
          "We operate as an extension of your team, handling execution so your internal resources stay focused.",
      },
    ],
    kpis: [
      {
        metric: "Campaign Performance",
        howWeHelp:
          "We ensure campaigns are visible when prospects ask AI about related topics, extending campaign reach.",
      },
      {
        metric: "Lead Generation",
        howWeHelp:
          "AI recommendations drive high-intent traffic that converts to qualified leads.",
      },
      {
        metric: "Brand Awareness",
        howWeHelp:
          "AI mentions increase brand awareness in a way that's trackable and measurable.",
      },
      {
        metric: "Marketing Efficiency",
        howWeHelp:
          "AI-attributed leads typically have lower acquisition costs than paid channels.",
      },
    ],
    objections: [
      {
        objection: "We need to focus on proven channels right now.",
        response:
          "AI visibility doesn't replace your current channels—it amplifies them. And it requires minimal internal resources since we handle execution.",
      },
      {
        objection: "How do I explain this initiative to the CMO?",
        response:
          "We provide executive-ready materials that clearly articulate the opportunity, competitive landscape, and expected ROI.",
      },
      {
        objection: "Our team doesn't have bandwidth for another vendor relationship.",
        response:
          "We're designed to be low-touch. After initial setup, we work autonomously with quarterly strategy syncs.",
      },
    ],
    relevantIndustries: ["saas", "ecommerce"],
    faqs: [
      {
        question: "How much of my team's time will this require?",
        answer:
          "Very little. After initial onboarding (2-3 hours), ongoing involvement is typically 1-2 hours per month for check-ins.",
      },
      {
        question: "How does this fit with our existing SEO efforts?",
        answer:
          "It's complementary. Strong SEO provides foundation, but AI optimization requires different tactics. We coordinate with your SEO team to ensure alignment.",
      },
      {
        question: "What's the onboarding process like?",
        answer:
          "We start with a comprehensive AI visibility audit, then develop a strategy customized to your brand and competitive landscape. Full onboarding typically takes 2 weeks.",
      },
      {
        question: "How do you report on progress?",
        answer:
          "Monthly reports with key metrics, competitive analysis, and optimization updates. Dashboard access available for real-time monitoring.",
      },
      {
        question: "Can we start small and expand?",
        answer:
          "Absolutely. Many clients start with a single product line or market, then expand as they see results.",
      },
    ],
    keywords: [
      "AI visibility for VP Marketing",
      "VP Marketing AI strategy",
      "marketing VP AI search optimization",
      "vice president marketing AI",
    ],
    seniority: "director",
  },
  {
    slug: "head-of-growth",
    title: "Head of Growth",
    fullTitle: "Head of Growth",
    headline: "AI Search Visibility for Growth Leaders",
    description:
      "As Head of Growth, you're always looking for new channels before they become saturated. AI search is the most significant new acquisition channel since social media—and it's still in the early-mover window. We help growth leaders capture this channel before competitors wake up.",
    painPoints: [
      {
        title: "Channel Saturation",
        description:
          "Paid and organic channels are increasingly competitive and expensive—you need new efficient acquisition sources.",
        solution:
          "AI recommendations represent a high-intent, low-competition channel with significantly better unit economics than saturated alternatives.",
      },
      {
        title: "Attribution Complexity",
        description:
          "You can't track AI-driven conversions with standard analytics, making it hard to optimize and prove value.",
        solution:
          "We implement AI-specific attribution that integrates with your growth stack, providing clear visibility into this channel's performance.",
      },
      {
        title: "Experimentation Constraints",
        description:
          "You want to test AI as a channel but don't have resources to build expertise internally.",
        solution:
          "We provide immediate expertise—you can test AI visibility as a channel without building capabilities from scratch.",
      },
      {
        title: "Scaling Challenges",
        description:
          "Even if AI shows promise, you don't know how to scale it alongside other channels.",
        solution:
          "We develop scaling playbooks that grow AI visibility in coordination with your broader growth strategy.",
      },
      {
        title: "Competitive Windows",
        description:
          "You know early movers in new channels get the best results, but can't move fast enough alone.",
        solution:
          "We accelerate your time-to-value, helping you establish AI visibility before competitors saturate the channel.",
      },
    ],
    kpis: [
      {
        metric: "Customer Acquisition Cost",
        howWeHelp:
          "AI-attributed customers typically have 30-50% lower CAC than paid channels.",
      },
      {
        metric: "Conversion Rate",
        howWeHelp:
          "AI recommendations are high-intent—users asking AI have typically done more research and convert better.",
      },
      {
        metric: "Channel Efficiency",
        howWeHelp:
          "We track AI visibility ROI so you can accurately compare it against other growth channels.",
      },
      {
        metric: "Time to Value",
        howWeHelp:
          "We accelerate results with proven optimization strategies—most clients see impact within 6 weeks.",
      },
    ],
    objections: [
      {
        objection: "We need to focus on scalable channels.",
        response:
          "AI search is highly scalable—as AI adoption grows (40%+ annually), this channel grows with it. Early optimization creates compounding advantages.",
      },
      {
        objection: "How does this compare to our current CAC?",
        response:
          "We typically see AI-attributed leads at 30-50% lower CAC than paid search and social. We can provide category-specific benchmarks.",
      },
      {
        objection: "We can't afford to experiment right now.",
        response:
          "AI visibility isn't an experiment—it's a proven channel. We have case studies showing consistent results across industries.",
      },
    ],
    relevantIndustries: ["saas", "ecommerce"],
    faqs: [
      {
        question: "How does AI visibility fit into a growth model?",
        answer:
          "AI recommendations function as a high-intent acquisition channel. It integrates into your model like any other channel, with its own CAC, conversion rates, and LTV metrics.",
      },
      {
        question: "What's the minimum viable test?",
        answer:
          "We can start with a focused optimization targeting your highest-value product or market. This provides clear signal within 6-8 weeks.",
      },
      {
        question: "How does this scale with growth?",
        answer:
          "AI visibility scales naturally as AI adoption grows. Unlike paid channels, costs don't increase linearly with volume.",
      },
      {
        question: "Can you share benchmark data?",
        answer:
          "Yes. We have extensive benchmarks across industries showing typical CAC, conversion rates, and time-to-value for AI visibility initiatives.",
      },
      {
        question: "How do you handle multi-touch attribution?",
        answer:
          "We work within your existing attribution model, helping you identify AI touchpoints in the customer journey.",
      },
    ],
    keywords: [
      "AI visibility for growth",
      "head of growth AI strategy",
      "growth marketing AI search",
      "AI acquisition channel",
    ],
    seniority: "director",
  },
  {
    slug: "marketing-director",
    title: "Marketing Director",
    fullTitle: "Marketing Director",
    headline: "AI Search Visibility for Marketing Directors",
    description:
      "As Marketing Director, you're managing day-to-day marketing operations while planning for the future. AI search is rapidly becoming a critical channel that most marketing teams aren't equipped to handle. We help Marketing Directors add AI visibility to their channel mix without overloading their teams.",
    painPoints: [
      {
        title: "Team Capacity Limits",
        description:
          "Your team is already at capacity—you can't add another specialty to their plates.",
        solution:
          "We operate as a specialized extension of your team, handling AI visibility so your team stays focused on their core responsibilities.",
      },
      {
        title: "Knowledge Gaps",
        description:
          "Neither you nor your team has deep expertise in AI optimization—and there's no time to develop it.",
        solution:
          "We bring the specialized expertise you lack, with clear processes that don't require you to become an AI expert.",
      },
      {
        title: "Budget Constraints",
        description:
          "You need to show results from any new initiative quickly to justify continued investment.",
        solution:
          "We focus on quick wins first, delivering measurable improvements within 60 days while building long-term visibility.",
      },
      {
        title: "Agency Fatigue",
        description:
          "You're already managing multiple agencies and vendors—adding another relationship feels burdensome.",
        solution:
          "We're designed to be low-maintenance. After setup, we work autonomously with streamlined reporting and minimal meeting time.",
      },
      {
        title: "Proving Value Up",
        description:
          "You need to demonstrate initiative value to leadership without adding to your workload.",
        solution:
          "We provide executive-ready reporting that clearly shows AI visibility impact on business metrics.",
      },
    ],
    kpis: [
      {
        metric: "Traffic from AI Sources",
        howWeHelp:
          "We help you identify and grow traffic from AI recommendation sources.",
      },
      {
        metric: "Content Performance",
        howWeHelp:
          "AI visibility extends the reach of your content marketing investments.",
      },
      {
        metric: "Competitive Position",
        howWeHelp:
          "We track how your brand appears relative to competitors in AI results.",
      },
      {
        metric: "Lead Quality",
        howWeHelp:
          "AI-referred leads are typically higher quality due to the research-focused nature of AI queries.",
      },
    ],
    objections: [
      {
        objection: "We're already working with too many vendors.",
        response:
          "We require minimal management time—typically 1-2 hours per month after initial setup. We integrate into your existing workflows.",
      },
      {
        objection: "How do I get leadership buy-in?",
        response:
          "We provide compelling executive materials and can present directly to leadership if helpful.",
      },
      {
        objection: "We need to see results fast.",
        response:
          "Our quickstart program delivers first measurable improvements within 30 days, with full optimization in 60-90 days.",
      },
    ],
    relevantIndustries: ["saas", "ecommerce", "fintech"],
    faqs: [
      {
        question: "How much time will I need to spend managing this?",
        answer:
          "After a 3-hour onboarding, expect 1-2 hours per month for review calls and occasional approvals. We handle everything else.",
      },
      {
        question: "How do you coordinate with our other agencies?",
        answer:
          "We're happy to coordinate with your SEO, content, and PR agencies to ensure alignment. We have experience working alongside all major agencies.",
      },
      {
        question: "What do you need from us to get started?",
        answer:
          "Access to your website, brand guidelines, and any existing content strategy documents. We handle the rest.",
      },
      {
        question: "How quickly can we launch?",
        answer:
          "We can complete onboarding and launch initial optimizations within 2 weeks of signing.",
      },
      {
        question: "What does reporting look like?",
        answer:
          "Monthly reports with key metrics, plus dashboard access for real-time monitoring. Reports are designed for quick review with executive summaries.",
      },
    ],
    keywords: [
      "AI visibility marketing director",
      "marketing director AI search",
      "director marketing AI optimization",
      "marketing director ChatGPT strategy",
    ],
    seniority: "director",
  },
  {
    slug: "ecommerce-manager",
    title: "E-commerce Manager",
    fullTitle: "E-commerce Manager",
    headline: "AI Search Visibility for E-commerce Managers",
    description:
      "As an E-commerce Manager, you're always looking for new ways to drive qualified traffic and increase conversions. AI assistants are becoming a major product discovery channel—consumers ask AI for recommendations before making purchases. We help E-commerce Managers ensure their products appear in these critical conversations.",
    painPoints: [
      {
        title: "Product Discovery Shifts",
        description:
          "Consumers are asking AI 'What's the best [product] for [need]?' instead of browsing—your products might be invisible.",
        solution:
          "We optimize your product catalog and brand presence so AI recommends your products for relevant queries.",
      },
      {
        title: "Review Aggregation",
        description:
          "AI synthesizes reviews from across the web—you can't control how your products appear in AI's interpretation.",
        solution:
          "We help you optimize your review presence and product information so AI represents your products accurately and favorably.",
      },
      {
        title: "Competitive Blind Spots",
        description:
          "You don't know if AI recommends competitors over you or why.",
        solution:
          "We provide competitive AI visibility analysis showing exactly where you stand and how to improve.",
      },
      {
        title: "Conversion Attribution",
        description:
          "You can't track which sales come from AI recommendations.",
        solution:
          "We implement tracking to identify AI-influenced purchases and attribute them properly.",
      },
      {
        title: "Catalog Complexity",
        description:
          "With hundreds or thousands of SKUs, optimizing for AI seems impossibly complex.",
        solution:
          "We focus on your highest-value products first, then systematically expand coverage across your catalog.",
      },
    ],
    kpis: [
      {
        metric: "Product Page Traffic",
        howWeHelp:
          "AI recommendations drive high-intent traffic directly to product pages.",
      },
      {
        metric: "Conversion Rate",
        howWeHelp:
          "AI-referred visitors convert at higher rates because they've already done research.",
      },
      {
        metric: "Average Order Value",
        howWeHelp:
          "AI recommendations often surface premium products, lifting AOV.",
      },
      {
        metric: "Revenue per Visit",
        howWeHelp:
          "Combined higher conversion and AOV significantly improve revenue per visit from AI sources.",
      },
    ],
    objections: [
      {
        objection: "We focus on marketplace optimization (Amazon, etc.).",
        response:
          "AI often pulls information from marketplaces, making your marketplace optimization even more important. We optimize for AI visibility of your marketplace presence too.",
      },
      {
        objection: "Our catalog is too large to optimize.",
        response:
          "We prioritize based on margin, volume, and strategic importance. You don't need to optimize everything at once.",
      },
      {
        objection: "How is this different from SEO?",
        response:
          "AI optimization focuses on how AI models synthesize and present information, not just rankings. The tactics and outcomes are quite different.",
      },
    ],
    relevantIndustries: ["ecommerce"],
    faqs: [
      {
        question: "Which products should we prioritize?",
        answer:
          "We typically start with your highest-margin, highest-volume products, then expand based on competitive opportunity and strategic importance.",
      },
      {
        question: "How do you handle seasonal products?",
        answer:
          "We adjust optimization timing to ensure visibility peaks during relevant seasons—gift guides, holiday shopping, etc.",
      },
      {
        question: "Can you help with new product launches?",
        answer:
          "Yes. AI visibility for new products requires specific strategies to establish presence quickly. We have playbooks for product launch optimization.",
      },
      {
        question: "How do you work with our existing SEO efforts?",
        answer:
          "AI optimization is complementary to SEO. We coordinate with your SEO team to ensure strategies reinforce each other.",
      },
      {
        question: "What e-commerce platforms do you work with?",
        answer:
          "We work with all major platforms: Shopify, BigCommerce, Magento, WooCommerce, and custom builds.",
      },
    ],
    keywords: [
      "AI visibility e-commerce",
      "e-commerce AI search optimization",
      "product AI visibility",
      "e-commerce ChatGPT optimization",
    ],
    seniority: "manager",
  },
  {
    slug: "brand-manager",
    title: "Brand Manager",
    fullTitle: "Brand Manager",
    headline: "AI Search Visibility for Brand Managers",
    description:
      "As a Brand Manager, you're responsible for how your brand is perceived everywhere it appears. AI assistants are now one of the most influential touchpoints—millions of consumers hear about brands through AI recommendations. We help Brand Managers control their brand's presence in AI conversations.",
    painPoints: [
      {
        title: "Brand Representation",
        description:
          "You can't control how AI describes your brand—it might be inaccurate, outdated, or unflattering.",
        solution:
          "We optimize your digital presence so AI understands and accurately represents your brand positioning and value propositions.",
      },
      {
        title: "Competitive Positioning",
        description:
          "When consumers ask AI to compare your brand to competitors, you don't know what it says.",
        solution:
          "We monitor and optimize competitive comparisons, ensuring your brand's advantages are represented fairly.",
      },
      {
        title: "Message Consistency",
        description:
          "AI might surface outdated messaging or positioning that no longer reflects your brand.",
        solution:
          "We ensure current brand messaging is reflected in AI responses through systematic optimization.",
      },
      {
        title: "Brand Safety",
        description:
          "You can't monitor if AI associates your brand with incorrect information or inappropriate content.",
        solution:
          "We continuously monitor how AI represents your brand and address any issues quickly.",
      },
      {
        title: "Campaign Amplification",
        description:
          "Your brand campaigns don't extend to AI—missing millions of AI-influenced touchpoints.",
        solution:
          "We help extend campaign messaging to AI visibility, amplifying your campaign investments.",
      },
    ],
    kpis: [
      {
        metric: "Brand Mention Accuracy",
        howWeHelp:
          "We track and improve how accurately AI represents your brand and key messages.",
      },
      {
        metric: "Competitive Win Rate",
        howWeHelp:
          "We monitor and optimize how often AI recommends your brand over competitors.",
      },
      {
        metric: "Message Consistency",
        howWeHelp:
          "We ensure AI responses align with your current brand positioning and messaging.",
      },
      {
        metric: "Brand Sentiment in AI",
        howWeHelp:
          "We track the sentiment of AI responses about your brand and optimize for favorable representation.",
      },
    ],
    objections: [
      {
        objection: "We already have brand guidelines—shouldn't AI follow them?",
        response:
          "AI doesn't read brand guidelines—it synthesizes information from across the web. Active optimization ensures AI represents your brand correctly.",
      },
      {
        objection: "Isn't this PR's responsibility?",
        response:
          "AI visibility requires specific technical optimization, not just messaging. We work with PR to ensure consistency while handling the technical work.",
      },
      {
        objection: "How much control can we really have over AI?",
        response:
          "You can significantly influence AI through strategic optimization of your digital presence. We have proven methods for improving brand representation.",
      },
    ],
    relevantIndustries: ["ecommerce", "saas"],
    faqs: [
      {
        question: "Can you help fix incorrect AI information about our brand?",
        answer:
          "Yes. We identify and address inaccurate AI representations through strategic optimization of your digital presence.",
      },
      {
        question: "How do you monitor brand mentions in AI?",
        answer:
          "We use proprietary tools to regularly test AI responses about your brand across all major platforms.",
      },
      {
        question: "Can you coordinate with our PR team?",
        answer:
          "Absolutely. We work closely with PR to ensure AI visibility aligns with broader brand communications strategy.",
      },
      {
        question: "How do you handle brand crises in AI?",
        answer:
          "We have rapid response protocols to address AI brand issues, including optimization strategies to correct misinformation.",
      },
      {
        question: "Do you work with brand tracking tools?",
        answer:
          "Yes. We integrate AI visibility data with your existing brand tracking for comprehensive measurement.",
      },
    ],
    keywords: [
      "brand manager AI visibility",
      "brand AI search optimization",
      "brand reputation AI",
      "brand manager ChatGPT strategy",
    ],
    seniority: "manager",
  },
  {
    slug: "content-director",
    title: "Content Director",
    fullTitle: "Content Director",
    headline: "AI Search Visibility for Content Directors",
    description:
      "As a Content Director, you're responsible for content that drives business results. AI assistants are now synthesizing and redistributing your content in ways you don't control—and often without credit. We help Content Directors ensure their content is represented and sourced correctly in AI conversations.",
    painPoints: [
      {
        title: "Content Attribution",
        description:
          "AI uses your content without attribution—you're producing value for AI platforms without recognition or traffic.",
        solution:
          "We optimize your content to maximize AI citation and drive traffic back to your original sources.",
      },
      {
        title: "Content Cannibalization",
        description:
          "AI summarizes your content directly, reducing the need for users to click through to your site.",
        solution:
          "We position your content as the authoritative source, driving users to your site for the full experience.",
      },
      {
        title: "Competitive Content",
        description:
          "You don't know if AI prefers competitors' content over yours or why.",
        solution:
          "We analyze AI content preferences and optimize your content to be prioritized in AI responses.",
      },
      {
        title: "Content Strategy Gaps",
        description:
          "Your content strategy doesn't account for AI consumption—missing a major distribution channel.",
        solution:
          "We help you develop AI-optimized content strategies that work for both traditional and AI channels.",
      },
      {
        title: "ROI Justification",
        description:
          "You can't measure content performance in AI, making it hard to justify content investments.",
        solution:
          "We provide AI-specific content performance metrics showing how your content appears and drives results.",
      },
    ],
    kpis: [
      {
        metric: "AI Content Citations",
        howWeHelp:
          "We track how often AI cites your content as a source.",
      },
      {
        metric: "AI-Driven Traffic",
        howWeHelp:
          "We optimize content to drive traffic from AI conversations back to your site.",
      },
      {
        metric: "Content Authority",
        howWeHelp:
          "We position your content as the definitive source on key topics.",
      },
      {
        metric: "Topic Coverage",
        howWeHelp:
          "We identify topic gaps where new content could capture AI visibility.",
      },
    ],
    objections: [
      {
        objection: "We already optimize content for SEO.",
        response:
          "AI optimization is different from SEO. AI synthesizes differently than Google ranks—the tactics for each are distinct.",
      },
      {
        objection: "Shouldn't AI just use our content if it's good?",
        response:
          "Quality helps, but active optimization determines whether AI chooses your content over competitors'. Good content can still be invisible.",
      },
      {
        objection: "We don't have resources for another content initiative.",
        response:
          "We optimize your existing content—you don't need to create more. We make your current investments work harder.",
      },
    ],
    relevantIndustries: ["saas", "ecommerce"],
    faqs: [
      {
        question: "Does AI optimization require new content?",
        answer:
          "Not initially. We optimize existing content first, then identify strategic gaps where new content would add value.",
      },
      {
        question: "How do you optimize existing content for AI?",
        answer:
          "We adjust structure, formatting, and key information presentation to improve how AI parses and surfaces your content.",
      },
      {
        question: "How does this affect our editorial calendar?",
        answer:
          "We work within your existing calendar, adding AI optimization to planned content and identifying high-impact topics.",
      },
      {
        question: "Can you work with our existing content team?",
        answer:
          "Absolutely. We provide guidance and optimization that your team can implement, or we can handle optimization directly.",
      },
      {
        question: "How do you measure content performance in AI?",
        answer:
          "We track AI citations, traffic from AI sources, and topic coverage using proprietary monitoring tools.",
      },
    ],
    keywords: [
      "content director AI visibility",
      "content AI optimization",
      "AI content strategy",
      "content director ChatGPT",
    ],
    seniority: "director",
  },
  {
    slug: "digital-marketing-manager",
    title: "Digital Marketing Manager",
    fullTitle: "Digital Marketing Manager",
    headline: "AI Search Visibility for Digital Marketing Managers",
    description:
      "As a Digital Marketing Manager, you're managing multiple channels to drive measurable results. AI search is emerging as a critical new channel—but it doesn't fit into your existing toolkit. We help Digital Marketing Managers add AI visibility to their channel mix with clear metrics and proven tactics.",
    painPoints: [
      {
        title: "New Channel Uncertainty",
        description:
          "You don't have the tools, training, or time to figure out AI optimization—it's completely different from your other channels.",
        solution:
          "We bring ready-to-deploy expertise so you can add AI visibility without becoming an expert yourself.",
      },
      {
        title: "Attribution Gaps",
        description:
          "Your analytics don't capture AI-driven traffic, making AI invisible in your channel reporting.",
        solution:
          "We implement AI attribution that integrates with your existing analytics for clear channel comparison.",
      },
      {
        title: "Limited Bandwidth",
        description:
          "You're fully loaded managing existing channels—you can't take on another without dropping something.",
        solution:
          "We handle AI visibility as a managed service, requiring minimal time from you after initial setup.",
      },
      {
        title: "Performance Pressure",
        description:
          "You're measured on channel performance—adding an unproven channel feels risky.",
        solution:
          "We provide clear performance metrics from day one, with typical clients seeing positive results within 60 days.",
      },
      {
        title: "Integration Complexity",
        description:
          "Your martech stack doesn't support AI tracking—adding it seems complicated.",
        solution:
          "We integrate lightweight tracking without requiring major changes to your existing stack.",
      },
    ],
    kpis: [
      {
        metric: "AI Channel Traffic",
        howWeHelp:
          "We track and grow traffic specifically from AI recommendation sources.",
      },
      {
        metric: "Channel Mix Efficiency",
        howWeHelp:
          "AI visibility typically shows better efficiency than paid channels, improving overall mix.",
      },
      {
        metric: "Campaign Extension",
        howWeHelp:
          "We extend your campaigns to AI visibility, amplifying paid investments.",
      },
      {
        metric: "Lead Generation",
        howWeHelp:
          "AI-attributed leads add to your total pipeline without cannibalizing other channels.",
      },
    ],
    objections: [
      {
        objection: "I need to focus on channels I can control.",
        response:
          "AI visibility is more controllable than you think. We have proven optimization tactics with predictable outcomes.",
      },
      {
        objection: "How do I report on this to leadership?",
        response:
          "We provide clear reporting that fits into your existing channel reports, making AI visibility as measurable as any other channel.",
      },
      {
        objection: "We don't have budget for new channels.",
        response:
          "AI visibility often pays for itself quickly through improved efficiency. We can start with a pilot to prove ROI before scaling.",
      },
    ],
    relevantIndustries: ["ecommerce", "saas"],
    faqs: [
      {
        question: "How does AI visibility fit with my other channels?",
        answer:
          "AI visibility is additive—it reaches users at different points in their journey without cannibalizing other channels.",
      },
      {
        question: "What analytics integrations do you support?",
        answer:
          "We integrate with Google Analytics, HubSpot, Segment, and most major analytics platforms.",
      },
      {
        question: "How much time will I need to manage this?",
        answer:
          "After onboarding, expect 1-2 hours per month for check-ins. We handle day-to-day optimization.",
      },
      {
        question: "Can you coordinate with my paid campaigns?",
        answer:
          "Yes. We align AI visibility with your campaign calendar to maximize impact and efficiency.",
      },
      {
        question: "What results can I expect in the first 90 days?",
        answer:
          "Most clients see measurable visibility improvements within 30 days and clear traffic/conversion impact within 90 days.",
      },
    ],
    keywords: [
      "digital marketing AI visibility",
      "digital marketing manager AI",
      "digital marketing AI search",
      "digital marketing ChatGPT optimization",
    ],
    seniority: "manager",
  },
];

/**
 * Get all personas for static generation
 */
export function getAllPersonas(): Persona[] {
  return personas;
}

/**
 * Get a specific persona by slug
 */
export function getPersonaBySlug(slug: string): Persona | undefined {
  return personas.find((p) => p.slug === slug);
}

/**
 * Get all persona slugs for generateStaticParams
 */
export function getAllPersonaSlugs(): string[] {
  return personas.map((p) => p.slug);
}
