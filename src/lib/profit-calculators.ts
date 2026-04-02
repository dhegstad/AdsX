/**
 * Shopify profit calculator data for programmatic SEO
 * Each niche generates a page at /tools/shopify-[niche]-profit-calculator
 */

export interface BreakdownItem {
  item: string;
  cost: string;
}

export interface ProfitCalculatorFAQ {
  question: string;
  answer: string;
}

export interface ProfitCalculator {
  slug: string;
  nicheName: string;
  headline: string;
  description: string;
  avgProductPrice: number;
  avgCOGS: number;
  avgShippingCost: number;
  shopifyMonthlyFee: number;
  estimatedAdSpend: number;
  avgOrdersPerMonth: number;
  margins: { low: number; mid: number; high: number };
  breakdownItems: BreakdownItem[];
  tips: string[];
  keywords: string[];
  faqs: ProfitCalculatorFAQ[];
}

export const profitCalculators: ProfitCalculator[] = [
  {
    slug: "tshirt",
    nicheName: "T-Shirt",
    headline: "Shopify T-Shirt Profit Calculator",
    description:
      "See how much profit you can make selling t-shirts on Shopify. Includes cost breakdown, margin analysis, and monthly profit projections for t-shirt businesses.",
    avgProductPrice: 28,
    avgCOGS: 8.5,
    avgShippingCost: 4.5,
    shopifyMonthlyFee: 39,
    estimatedAdSpend: 500,
    avgOrdersPerMonth: 100,
    margins: { low: 25, mid: 45, high: 60 },
    breakdownItems: [
      { item: "Blank T-Shirt Cost", cost: "$4.00-6.00 per unit" },
      { item: "Printing/DTG Cost", cost: "$3.00-5.00 per unit" },
      { item: "Packaging & Labels", cost: "$0.50-1.50 per unit" },
      { item: "Shipping (Domestic)", cost: "$3.50-5.50 per order" },
      { item: "Shopify Subscription", cost: "$39/month (Basic plan)" },
      { item: "Advertising (Facebook/Instagram)", cost: "$300-800/month" },
    ],
    tips: [
      "Buy blanks in bulk (100+) to reduce per-unit cost by 20-30% from suppliers like Bella+Canvas or Next Level",
      "Use DTG printing for low-volume designs and screen printing when selling 50+ of the same design",
      "Offer bundle discounts (3 shirts for $65) to increase average order value above $60",
      "Focus on niche designs rather than generic — niche t-shirts command $5-15 higher prices",
    ],
    keywords: [
      "shopify tshirt profit calculator",
      "t-shirt business profit margin",
      "how much profit selling tshirts",
      "tshirt shopify business calculator",
    ],
    faqs: [
      {
        question: "How much profit can I make selling t-shirts on Shopify?",
        answer:
          "A typical Shopify t-shirt business selling 100 shirts/month at $28 average price with $8.50 COGS can expect $1,000-1,500/month in profit after all expenses. Top performers selling 300+ shirts/month can earn $4,000-8,000/month by optimizing costs and increasing prices through branding.",
      },
      {
        question: "What is a good profit margin for t-shirts?",
        answer:
          "A healthy t-shirt profit margin is 40-60%. At $28 retail with $8.50 COGS, your gross margin is about 70%. After shipping, Shopify fees, and advertising, net margins typically settle at 25-45% depending on your ad efficiency and order volume.",
      },
      {
        question: "How many t-shirts do I need to sell to be profitable?",
        answer:
          "To cover a $39/month Shopify subscription and $500/month in ads, you need approximately 35-40 t-shirt sales per month at a $15 gross profit per shirt. Most successful t-shirt businesses become comfortably profitable at 75-100 orders per month.",
      },
    ],
  },
  {
    slug: "candle",
    nicheName: "Candle",
    headline: "Shopify Candle Business Profit Calculator",
    description:
      "Calculate your candle business profitability on Shopify. Full cost breakdown for soy, beeswax, and premium candle makers with margin analysis.",
    avgProductPrice: 32,
    avgCOGS: 7,
    avgShippingCost: 6,
    shopifyMonthlyFee: 39,
    estimatedAdSpend: 450,
    avgOrdersPerMonth: 80,
    margins: { low: 30, mid: 50, high: 65 },
    breakdownItems: [
      { item: "Wax & Fragrance Oils", cost: "$2.50-4.00 per candle" },
      { item: "Container/Vessel", cost: "$1.50-3.00 per candle" },
      { item: "Wick, Label & Packaging", cost: "$1.00-2.00 per candle" },
      { item: "Shipping (fragile item)", cost: "$5.00-8.00 per order" },
      { item: "Shopify Subscription", cost: "$39/month (Basic plan)" },
      { item: "Advertising & Marketing", cost: "$300-600/month" },
    ],
    tips: [
      "Source wax and fragrance oils in bulk from suppliers like CandleScience or Lone Star Candle Supply — buying 50lb+ slabs saves 25-40%",
      "Offer candle subscription boxes for recurring revenue — subscribers have 3x higher lifetime value",
      "Premium packaging and branded boxes justify $5-10 higher prices and reduce returns",
      "Seasonal collections (holiday, fall, spring) drive 2-3x sales spikes — plan inventory 8 weeks ahead",
    ],
    keywords: [
      "shopify candle profit calculator",
      "candle business profit margin",
      "how much profit selling candles",
      "candle making business shopify",
    ],
    faqs: [
      {
        question: "How much does it cost to start a candle business on Shopify?",
        answer:
          "A basic Shopify candle business can start for $300-800: Shopify subscription ($39/month), initial supplies for 50 candles ($150-300), packaging ($50-100), and initial advertising ($100-300). Scale investment as sales grow.",
      },
      {
        question: "What profit margin should I expect selling candles?",
        answer:
          "Candle margins are excellent at 50-65% gross margin. A $32 candle costing $7 to make yields $25 gross profit. After shipping and marketing, net margins of 30-50% are achievable, making candles one of the highest-margin Shopify product categories.",
      },
      {
        question: "How many candles do I need to sell monthly to make a living?",
        answer:
          "To earn $3,000/month profit, you need approximately 150-200 candle sales at $32 average price with a 45% net margin. At 80 candles/month, expect $1,000-1,500 in profit — a solid side income with room to grow.",
      },
    ],
  },
  {
    slug: "jewelry",
    nicheName: "Jewelry",
    headline: "Shopify Jewelry Business Profit Calculator",
    description:
      "Calculate profitability for your Shopify jewelry store. Cost breakdown for handmade, plated, and fine jewelry businesses with realistic margin analysis.",
    avgProductPrice: 55,
    avgCOGS: 14,
    avgShippingCost: 4,
    shopifyMonthlyFee: 39,
    estimatedAdSpend: 600,
    avgOrdersPerMonth: 75,
    margins: { low: 35, mid: 55, high: 75 },
    breakdownItems: [
      { item: "Materials (metals, stones, beads)", cost: "$5.00-12.00 per piece" },
      { item: "Labor/Production Time", cost: "$3.00-8.00 per piece" },
      { item: "Packaging (jewelry box, bag)", cost: "$1.50-3.00 per piece" },
      { item: "Shipping (insured, small package)", cost: "$3.00-5.00 per order" },
      { item: "Shopify Subscription", cost: "$39/month (Basic plan)" },
      { item: "Photography & Advertising", cost: "$400-800/month" },
    ],
    tips: [
      "Invest in professional product photography — jewelry is highly visual and good photos can increase conversion rates by 40%",
      "Build collections around themes (birthstones, zodiac, minimalist) to encourage multiple-piece purchases",
      "Offer engraving or personalization for $5-15 extra — customization increases perceived value dramatically",
      "Use influencer gifting over paid ads initially — micro-influencers generate higher ROI for jewelry brands",
    ],
    keywords: [
      "shopify jewelry profit calculator",
      "jewelry business profit margin",
      "how much profit selling jewelry online",
      "shopify jewelry store profitability",
    ],
    faqs: [
      {
        question: "Is selling jewelry on Shopify profitable?",
        answer:
          "Yes, jewelry is one of the most profitable Shopify niches. Gross margins of 55-75% are common, especially for handmade pieces. A store selling 75 pieces/month at $55 average can generate $1,500-2,500/month in profit after all expenses.",
      },
      {
        question: "What is the average profit margin for online jewelry?",
        answer:
          "Fashion and handmade jewelry typically achieves 55-75% gross margins. Fine jewelry margins are lower (40-60%) due to material costs. After advertising and overhead, net margins of 35-55% are realistic for well-run Shopify jewelry stores.",
      },
      {
        question: "How much should I spend on advertising a jewelry store?",
        answer:
          "Start with $15-20/day ($450-600/month) on Facebook and Instagram. Jewelry performs well on visual platforms. Target a 3-4x return on ad spend (ROAS). Once profitable, scale ad spend proportionally — successful jewelry brands spend 15-25% of revenue on advertising.",
      },
    ],
  },
  {
    slug: "dropshipping",
    nicheName: "Dropshipping",
    headline: "Shopify Dropshipping Profit Calculator",
    description:
      "Calculate realistic dropshipping profits on Shopify. Honest breakdown of costs, margins, and monthly projections for dropshipping businesses.",
    avgProductPrice: 35,
    avgCOGS: 15,
    avgShippingCost: 0,
    shopifyMonthlyFee: 39,
    estimatedAdSpend: 800,
    avgOrdersPerMonth: 120,
    margins: { low: 10, mid: 25, high: 40 },
    breakdownItems: [
      { item: "Product Cost (from supplier)", cost: "$10.00-20.00 per unit" },
      { item: "Supplier Shipping (often included)", cost: "$0-5.00 per order" },
      { item: "Payment Processing Fees", cost: "$1.30-1.50 per order" },
      { item: "Shopify Subscription", cost: "$39/month (Basic plan)" },
      { item: "Advertising (Facebook, TikTok)", cost: "$500-1,200/month" },
      { item: "Apps (DSers, reviews, etc.)", cost: "$30-80/month" },
    ],
    tips: [
      "Focus on products with at least 2.5x markup (sell for $35+ what costs $14 or less from supplier)",
      "Test products with small ad budgets ($20-50) before scaling — kill ads that don't convert within 3 days",
      "Build a brand rather than a generic store — branded dropshipping stores have 30-50% higher conversion rates",
      "Negotiate better pricing with suppliers once you hit 50+ orders/month — even $1-2 savings per unit compounds quickly",
    ],
    keywords: [
      "shopify dropshipping profit calculator",
      "dropshipping profit margin",
      "how much profit dropshipping shopify",
      "dropshipping profitability calculator",
    ],
    faqs: [
      {
        question: "Is dropshipping on Shopify still profitable?",
        answer:
          "Yes, but margins are thinner than other models. Realistic net margins are 10-25% after all costs. A store doing 120 orders/month at $35 average can profit $400-1,200/month. Success depends heavily on product selection and advertising efficiency.",
      },
      {
        question: "What is a realistic dropshipping profit margin?",
        answer:
          "Net profit margins of 15-25% are realistic for well-optimized dropshipping stores. Gross margins of 50-60% are common, but advertising costs (the biggest expense) typically consume 20-35% of revenue. The key is achieving a ROAS above 3x on your ad spend.",
      },
      {
        question: "How much money do I need to start dropshipping on Shopify?",
        answer:
          "Budget $200-500 to start: Shopify subscription ($39/month), essential apps ($20-50/month), and initial ad testing budget ($150-400). Avoid spending more until you find a winning product. Many successful dropshippers started with under $300.",
      },
    ],
  },
  {
    slug: "print-on-demand",
    nicheName: "Print-on-Demand",
    headline: "Shopify Print-on-Demand Profit Calculator",
    description:
      "Calculate print-on-demand profits on Shopify. Realistic cost breakdown for POD businesses selling custom merchandise through Printful, Printify, and more.",
    avgProductPrice: 30,
    avgCOGS: 13,
    avgShippingCost: 5,
    shopifyMonthlyFee: 39,
    estimatedAdSpend: 500,
    avgOrdersPerMonth: 90,
    margins: { low: 15, mid: 30, high: 45 },
    breakdownItems: [
      { item: "Base Product + Printing (POD provider)", cost: "$8.00-18.00 per unit" },
      { item: "POD Shipping (via Printful/Printify)", cost: "$4.00-7.00 per order" },
      { item: "Payment Processing", cost: "$1.20-1.40 per order" },
      { item: "Shopify Subscription", cost: "$39/month (Basic plan)" },
      { item: "Advertising (Social + Google)", cost: "$300-700/month" },
      { item: "Design Tools & Mockup Apps", cost: "$15-50/month" },
    ],
    tips: [
      "Use Printify's premium providers or Printful for better quality — customer satisfaction directly impacts repeat purchases and reviews",
      "Create designs for specific niches (dog breeds, professions, hobbies) rather than generic designs — niche POD products convert 2-3x better",
      "Offer matching sets (mug + t-shirt + hoodie with same design) to increase average order value by 40-60%",
      "Test designs on social media organically before paying for ads — viral potential saves significantly on ad spend",
    ],
    keywords: [
      "shopify print on demand profit calculator",
      "pod profit margin shopify",
      "print on demand profitability",
      "printful printify profit calculator",
    ],
    faqs: [
      {
        question: "How much profit can you make with print-on-demand?",
        answer:
          "A Shopify POD store selling 90 items/month at $30 average can profit $500-1,200/month. Top POD sellers doing 300+ orders/month earn $3,000-8,000/month. Margins are lower than traditional inventory (15-30% net), but zero inventory risk makes POD attractive for beginners.",
      },
      {
        question: "Is print-on-demand worth it on Shopify?",
        answer:
          "Yes, especially for testing product ideas with zero inventory risk. The tradeoff is lower margins (15-30% net vs 40-60% for self-fulfilled). POD is ideal for building a brand before investing in bulk inventory. Many successful brands start with POD and transition to inventory as they scale.",
      },
      {
        question: "Printful or Printify — which is more profitable?",
        answer:
          "Printify generally offers lower base costs (saving $1-3 per item) through their network of print providers, making it more profitable per unit. Printful offers more consistent quality and branding options. For maximum profit, test both and compare quality and pricing for your specific products.",
      },
    ],
  },
  {
    slug: "subscription-box",
    nicheName: "Subscription Box",
    headline: "Shopify Subscription Box Profit Calculator",
    description:
      "Calculate profitability for your Shopify subscription box business. Includes cost breakdown, churn analysis, and recurring revenue projections.",
    avgProductPrice: 45,
    avgCOGS: 18,
    avgShippingCost: 8,
    shopifyMonthlyFee: 39,
    estimatedAdSpend: 700,
    avgOrdersPerMonth: 150,
    margins: { low: 20, mid: 35, high: 50 },
    breakdownItems: [
      { item: "Product Curation (4-6 items per box)", cost: "$12.00-24.00 per box" },
      { item: "Box & Packaging Materials", cost: "$2.00-5.00 per box" },
      { item: "Shipping (heavier packages)", cost: "$6.00-12.00 per box" },
      { item: "Shopify + Subscription App", cost: "$39 + $50-100/month" },
      { item: "Advertising & Influencer Marketing", cost: "$500-1,000/month" },
      { item: "Fulfillment Labor or 3PL Costs", cost: "$2.00-4.00 per box" },
    ],
    tips: [
      "Negotiate wholesale pricing aggressively — at 150+ boxes/month, suppliers often offer 30-50% discounts on retail pricing",
      "Reduce churn with prepaid plans (3, 6, 12 months) at small discounts — prepaid subscribers stay 2-3x longer than monthly",
      "Include a 'hero item' worth more than the box price to increase perceived value and unboxing excitement on social media",
      "Partner with brands for product inclusion — many brands will provide products at cost or free for the exposure to your subscriber base",
    ],
    keywords: [
      "shopify subscription box profit calculator",
      "subscription box profit margin",
      "subscription box business profitability",
      "shopify subscription box costs",
    ],
    faqs: [
      {
        question: "How profitable are subscription boxes on Shopify?",
        answer:
          "Well-run subscription boxes achieve 20-35% net margins. A 150-subscriber box at $45/month generates $6,750/month in revenue and $1,350-2,362/month in profit. The key advantage is predictable recurring revenue — subscribers provide stable income compared to one-time product sales.",
      },
      {
        question: "What is the average churn rate for subscription boxes?",
        answer:
          "Average subscription box churn is 10-15% per month. This means you need to acquire 15-25 new subscribers monthly just to maintain 150 active subscribers. Reducing churn by offering prepaid plans and improving box quality is more profitable than acquiring new subscribers.",
      },
      {
        question: "What Shopify apps do I need for subscription boxes?",
        answer:
          "Essential apps include ReCharge ($99/month) or Bold Subscriptions ($49/month) for recurring billing, plus a reviews app and email marketing tool. Budget $100-150/month total for apps. These enable features like subscription management, skip/pause options, and automatic renewal billing.",
      },
    ],
  },
  {
    slug: "digital-products",
    nicheName: "Digital Products",
    headline: "Shopify Digital Products Profit Calculator",
    description:
      "Calculate digital product profits on Shopify. Near-zero marginal costs make digital products the highest-margin Shopify business model.",
    avgProductPrice: 25,
    avgCOGS: 0.5,
    avgShippingCost: 0,
    shopifyMonthlyFee: 39,
    estimatedAdSpend: 400,
    avgOrdersPerMonth: 100,
    margins: { low: 50, mid: 70, high: 85 },
    breakdownItems: [
      { item: "Product Creation (amortized)", cost: "$0.10-1.00 per sale" },
      { item: "Digital Delivery App", cost: "$0-15/month" },
      { item: "Payment Processing", cost: "$1.02-1.05 per order" },
      { item: "Shopify Subscription", cost: "$39/month (Basic plan)" },
      { item: "Advertising & Content Marketing", cost: "$200-600/month" },
      { item: "Tools (design, hosting, updates)", cost: "$20-50/month" },
    ],
    tips: [
      "Create product bundles (template pack, course + templates) to increase average order value by 50-100%",
      "Use content marketing and SEO over paid ads — digital product audiences respond better to educational content than ads",
      "Offer free samples or lite versions as lead magnets — convert 10-20% of free users to paid customers",
      "Update products quarterly and notify past buyers — this drives repeat purchases and positive reviews",
    ],
    keywords: [
      "shopify digital product profit calculator",
      "digital product profit margin",
      "selling digital products shopify",
      "digital download shopify profitability",
    ],
    faqs: [
      {
        question: "What profit margins can I expect selling digital products?",
        answer:
          "Digital products have the highest margins of any Shopify business model: 70-85% net margin is common since there are no physical production, shipping, or inventory costs. A $25 digital product sold 100 times/month generates approximately $1,750-2,125 in profit.",
      },
      {
        question: "What digital products sell best on Shopify?",
        answer:
          "Top sellers include digital planners and templates ($10-30), Lightroom presets ($15-40), Notion templates ($5-25), printable art ($5-20), e-books and guides ($15-50), and online courses ($50-300). Products that solve a specific problem and can be instantly delivered perform best.",
      },
      {
        question: "Do I need a special app to sell digital products on Shopify?",
        answer:
          "Yes, Shopify's free Digital Downloads app handles basic file delivery. For larger files, license keys, or streaming content, apps like SendOwl ($15/month) or Sky Pilot ($15/month) offer more features. The app cost is minimal compared to the margins digital products generate.",
      },
    ],
  },
  {
    slug: "skincare",
    nicheName: "Skincare",
    headline: "Shopify Skincare Business Profit Calculator",
    description:
      "Calculate skincare brand profitability on Shopify. Cost breakdown for private-label and handmade skincare businesses with regulatory considerations.",
    avgProductPrice: 38,
    avgCOGS: 9,
    avgShippingCost: 5,
    shopifyMonthlyFee: 39,
    estimatedAdSpend: 700,
    avgOrdersPerMonth: 100,
    margins: { low: 30, mid: 50, high: 65 },
    breakdownItems: [
      { item: "Product Manufacturing (private label)", cost: "$4.00-10.00 per unit" },
      { item: "Packaging & Labeling", cost: "$2.00-4.00 per unit" },
      { item: "Regulatory Compliance & Testing", cost: "$1.00-2.00 per unit (amortized)" },
      { item: "Shipping (careful packaging required)", cost: "$4.00-6.00 per order" },
      { item: "Shopify Subscription", cost: "$39/month (Basic plan)" },
      { item: "Advertising & Influencer Marketing", cost: "$500-900/month" },
    ],
    tips: [
      "Start with 3-5 hero SKUs rather than a full line — focused brands convert better and simplify inventory management",
      "Invest in premium packaging — skincare buyers judge quality by presentation, and it justifies higher prices",
      "Build a content strategy around skin concerns (acne, aging, dryness) to drive organic traffic and establish authority",
      "Collect and showcase customer before/after photos and reviews — social proof drives 2-4x more conversions in skincare",
    ],
    keywords: [
      "shopify skincare profit calculator",
      "skincare business profit margin",
      "how much profit selling skincare",
      "skincare shopify business profitability",
    ],
    faqs: [
      {
        question: "How profitable is a skincare business on Shopify?",
        answer:
          "Very profitable. Skincare typically achieves 50-65% gross margins. A store selling 100 units/month at $38 average with $9 COGS generates $1,500-2,400/month in profit after all expenses. Skincare also benefits from high repeat purchase rates — 40-60% of skincare customers reorder.",
      },
      {
        question: "How much does it cost to start a skincare brand on Shopify?",
        answer:
          "Budget $2,000-8,000 to launch: product development and testing ($500-3,000), initial inventory ($500-2,000), packaging ($300-1,000), Shopify and marketing ($200-500/month), and compliance/insurance ($200-500). Private-label skincare has lower startup costs than custom formulations.",
      },
      {
        question: "Do I need FDA approval to sell skincare on Shopify?",
        answer:
          "Cosmetics don't require FDA pre-approval, but must comply with FDA regulations including proper labeling, ingredient listing, and safety standards. Avoid drug claims (like 'cures acne'). Consider liability insurance and product testing. Consult a regulatory expert before launching.",
      },
    ],
  },
  {
    slug: "food-beverage",
    nicheName: "Food & Beverage",
    headline: "Shopify Food & Beverage Profit Calculator",
    description:
      "Calculate profitability for selling food products on Shopify. Includes cost breakdown for specialty food, snacks, and beverage e-commerce businesses.",
    avgProductPrice: 30,
    avgCOGS: 10,
    avgShippingCost: 8,
    shopifyMonthlyFee: 39,
    estimatedAdSpend: 500,
    avgOrdersPerMonth: 80,
    margins: { low: 15, mid: 30, high: 45 },
    breakdownItems: [
      { item: "Ingredients & Production", cost: "$4.00-10.00 per unit" },
      { item: "Packaging (food-safe, labeled)", cost: "$2.00-4.00 per unit" },
      { item: "Shipping (temperature/weight concerns)", cost: "$6.00-12.00 per order" },
      { item: "Shopify Subscription", cost: "$39/month (Basic plan)" },
      { item: "Advertising & Sampling", cost: "$300-700/month" },
      { item: "Licenses, Insurance & Compliance", cost: "$50-200/month (amortized)" },
    ],
    tips: [
      "Offer variety packs and sampler bundles — they increase AOV by 30-50% and introduce customers to your full product line",
      "Build a subscription model for consumable products — 'subscribe and save' reduces churn and provides predictable revenue",
      "Use cottage food laws for small-scale starting if available in your state — they reduce regulatory burden significantly",
      "Partner with food bloggers and recipe creators for authentic content — food influencer posts drive 3-5x more engagement than standard ads",
    ],
    keywords: [
      "shopify food business profit calculator",
      "food and beverage ecommerce profitability",
      "selling food online shopify profit",
      "food business profit margin online",
    ],
    faqs: [
      {
        question: "Is selling food on Shopify profitable?",
        answer:
          "Yes, but margins are tighter than non-perishable goods due to shipping costs and compliance requirements. Net margins of 15-30% are typical. A store selling 80 orders/month at $30 average generates $360-720/month profit. Subscription models and bundling are key to improving profitability.",
      },
      {
        question: "What licenses do I need to sell food on Shopify?",
        answer:
          "Requirements vary by state but typically include a food handler's permit, business license, and commercial kitchen certification (unless cottage food laws apply). Some states require FDA facility registration for interstate commerce. Budget $200-1,000 for initial licensing.",
      },
      {
        question: "How do I handle shipping for food products?",
        answer:
          "Non-perishable foods (snacks, sauces, spices) ship via standard carriers. Perishable items need insulated packaging and expedited shipping, adding $5-15 per order. Use Shopify's shipping profiles to set different rates by product type. Consider flat-rate shipping to simplify pricing.",
      },
    ],
  },
  {
    slug: "handmade-crafts",
    nicheName: "Handmade Crafts",
    headline: "Shopify Handmade Crafts Profit Calculator",
    description:
      "Calculate profitability for selling handmade crafts on Shopify. Cost breakdown including materials, labor time, and realistic margin analysis for crafters.",
    avgProductPrice: 42,
    avgCOGS: 12,
    avgShippingCost: 5.5,
    shopifyMonthlyFee: 39,
    estimatedAdSpend: 350,
    avgOrdersPerMonth: 60,
    margins: { low: 25, mid: 40, high: 55 },
    breakdownItems: [
      { item: "Raw Materials (fabric, wood, clay, etc.)", cost: "$4.00-10.00 per piece" },
      { item: "Labor/Production Time Value", cost: "$5.00-15.00 per piece" },
      { item: "Packaging & Presentation", cost: "$1.50-3.00 per piece" },
      { item: "Shipping (varies by size/weight)", cost: "$4.00-8.00 per order" },
      { item: "Shopify Subscription", cost: "$39/month (Basic plan)" },
      { item: "Advertising (Pinterest, Instagram)", cost: "$200-500/month" },
    ],
    tips: [
      "Price your labor at minimum $15-25/hour — underpricing handmade work is the most common mistake crafters make",
      "Pinterest drives the highest ROI for handmade sellers — invest time in pins before scaling paid ads on other platforms",
      "Offer custom/personalized options at premium pricing — customization adds $10-30 to perceived value with minimal extra cost",
      "Create process videos and behind-the-scenes content — handmade shoppers value the maker story and it builds emotional connection",
    ],
    keywords: [
      "shopify handmade profit calculator",
      "handmade crafts profit margin",
      "selling handmade crafts shopify",
      "craft business profitability calculator",
    ],
    faqs: [
      {
        question: "How much can I make selling handmade crafts on Shopify?",
        answer:
          "A Shopify handmade craft store selling 60 items/month at $42 average generates $2,520/month in revenue and $600-1,260/month in profit. The main challenge is production capacity — handmade items require significant time investment. Most solo crafters cap at 80-120 items/month.",
      },
      {
        question: "How should I price my handmade products?",
        answer:
          "Use the formula: Materials + Labor (hours x $20-25) + Overhead (15-20%) = Wholesale Price. Multiply by 2-2.5x for retail. A product costing $12 in materials plus 30 minutes of labor ($12.50) should retail for at least $49-61. Never price based only on materials.",
      },
      {
        question: "Should I sell on Etsy or Shopify for handmade products?",
        answer:
          "Start on both. Etsy provides built-in marketplace traffic perfect for discovery. Shopify gives you brand ownership and higher margins. As your brand grows, shift marketing spend toward driving traffic to your Shopify store where you keep more profit and own the customer relationship.",
      },
    ],
  },
];

/**
 * Get all profit calculators for static generation
 */
export function getAllProfitCalculators(): ProfitCalculator[] {
  return profitCalculators;
}

/**
 * Get a specific profit calculator by slug
 */
export function getProfitCalculatorBySlug(slug: string): ProfitCalculator | undefined {
  return profitCalculators.find((c) => c.slug === slug);
}

/**
 * Get all profit calculator slugs for generateStaticParams
 */
export function getAllProfitCalculatorSlugs(): string[] {
  return profitCalculators.map((c) => c.slug);
}
