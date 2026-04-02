/**
 * Migration guide data for programmatic SEO
 * Each migration generates a page at /migrate/[platform]-to-shopify
 */

export interface MigrationStep {
  title: string;
  description: string;
}

export interface MigrationIssue {
  issue: string;
  solution: string;
}

export interface MigrationFAQ {
  question: string;
  answer: string;
}

export interface Migration {
  slug: string;
  platformName: string;
  headline: string;
  description: string;
  difficulty: "easy" | "moderate" | "complex";
  estimatedTime: string;
  dataToMigrate: string[];
  steps: MigrationStep[];
  commonIssues: MigrationIssue[];
  shopifyAdvantages: string[];
  keywords: string[];
  faqs: MigrationFAQ[];
}

export const migrations: Migration[] = [
  {
    slug: "magento-to-shopify",
    platformName: "Magento",
    headline: "How to Migrate from Magento to Shopify",
    description:
      "Complete guide to migrating your Magento store to Shopify. Move products, customers, and orders without losing SEO rankings or sales data.",
    difficulty: "complex",
    estimatedTime: "2-4 weeks",
    dataToMigrate: [
      "Products & variants",
      "Customer accounts",
      "Order history",
      "Categories & collections",
      "SEO URLs & redirects",
      "Blog content",
    ],
    steps: [
      {
        title: "Export Your Magento Data",
        description:
          "Use Magento's built-in export tools or a migration app to export products, customers, and orders as CSV files. Back up your entire database before starting.",
      },
      {
        title: "Set Up Your Shopify Store",
        description:
          "Create your Shopify account, choose a theme, and configure basic settings like currency, shipping zones, and tax rules before importing data.",
      },
      {
        title: "Import Products & Collections",
        description:
          "Map Magento product attributes to Shopify fields. Import products via CSV or use a migration tool like LitExtension or Cart2Cart for complex catalogs.",
      },
      {
        title: "Migrate Customer & Order Data",
        description:
          "Import customer accounts and historical orders. Note that customers will need to reset passwords since password hashes are not transferable between platforms.",
      },
      {
        title: "Set Up URL Redirects",
        description:
          "Create 301 redirects from old Magento URLs to new Shopify URLs. This is critical for preserving SEO rankings and avoiding broken links.",
      },
      {
        title: "Test & Launch",
        description:
          "Thoroughly test checkout, payment processing, shipping calculations, and all product pages. Run the stores in parallel briefly before switching DNS.",
      },
    ],
    commonIssues: [
      {
        issue: "Complex product configurations lost during migration",
        solution:
          "Magento's configurable products don't map 1:1 to Shopify variants. Use a migration app that handles attribute mapping or manually restructure products.",
      },
      {
        issue: "Custom Magento extensions have no Shopify equivalent",
        solution:
          "Audit your extensions before migrating. Most have Shopify app equivalents. For custom functionality, consider Shopify's app ecosystem or custom development.",
      },
      {
        issue: "SEO rankings drop after migration",
        solution:
          "Implement comprehensive 301 redirects, preserve meta titles and descriptions, and submit the updated sitemap to Google Search Console immediately.",
      },
    ],
    shopifyAdvantages: [
      "No server management or hosting costs — Shopify handles all infrastructure",
      "Faster page load times with Shopify's global CDN vs self-hosted Magento",
      "Automatic security updates and PCI compliance without manual patches",
      "Access to 8,000+ apps vs managing complex Magento extensions",
    ],
    keywords: [
      "magento to shopify migration",
      "migrate magento to shopify",
      "magento shopify migration guide",
      "switch from magento to shopify",
    ],
    faqs: [
      {
        question: "How long does it take to migrate from Magento to Shopify?",
        answer:
          "A typical Magento to Shopify migration takes 2-4 weeks depending on catalog size and complexity. Stores with under 1,000 products and simple configurations can migrate in 1-2 weeks, while large catalogs with custom attributes may take 4+ weeks.",
      },
      {
        question: "Will I lose my SEO rankings when migrating from Magento?",
        answer:
          "Not if you properly set up 301 redirects from all old Magento URLs to their new Shopify equivalents. Preserve your meta titles, descriptions, and H1 tags. Submit your new sitemap to Google Search Console within 24 hours of launch.",
      },
      {
        question: "Can I migrate Magento customer passwords to Shopify?",
        answer:
          "No, password hashes cannot be transferred between Magento and Shopify due to different encryption methods. Customers will need to use the 'Forgot Password' flow on their first login. Send a proactive email before launch explaining this.",
      },
    ],
  },
  {
    slug: "prestashop-to-shopify",
    platformName: "PrestaShop",
    headline: "How to Migrate from PrestaShop to Shopify",
    description:
      "Step-by-step guide to moving your PrestaShop store to Shopify. Transfer products, customers, orders, and preserve your SEO rankings.",
    difficulty: "moderate",
    estimatedTime: "1-2 weeks",
    dataToMigrate: [
      "Products & combinations",
      "Customer accounts",
      "Order history",
      "Categories",
      "SEO URLs & redirects",
      "CMS pages",
    ],
    steps: [
      {
        title: "Export PrestaShop Data",
        description:
          "Use PrestaShop's back office to export products and customers as CSV. For orders and CMS content, use phpMyAdmin or a migration tool for a complete export.",
      },
      {
        title: "Create Your Shopify Store",
        description:
          "Set up your Shopify account and configure core settings. Choose a theme that matches your brand and set up payment gateways, shipping, and taxes.",
      },
      {
        title: "Map & Import Products",
        description:
          "Map PrestaShop product combinations to Shopify variants. Import via CSV or automated tools. Pay attention to multi-language content if your store supports multiple languages.",
      },
      {
        title: "Transfer Customer & Order Data",
        description:
          "Import customer accounts with addresses and order history. Use Shopify's customer CSV import or an automated migration tool for large databases.",
      },
      {
        title: "Configure URL Redirects",
        description:
          "PrestaShop uses different URL structures than Shopify. Create comprehensive 301 redirects to maintain search engine rankings and prevent 404 errors.",
      },
      {
        title: "Quality Assurance & Go-Live",
        description:
          "Test every product page, the checkout flow, email notifications, and mobile responsiveness. Verify all redirects work before pointing your domain to Shopify.",
      },
    ],
    commonIssues: [
      {
        issue: "Multi-language content not fully supported",
        solution:
          "Shopify supports multi-language via Markets or translation apps like Langify or Weglot. Plan your language strategy before migrating content.",
      },
      {
        issue: "PrestaShop modules functionality gaps",
        solution:
          "List all active PrestaShop modules and find Shopify app equivalents. Most common functionality like reviews, wishlists, and newsletters have mature Shopify apps.",
      },
      {
        issue: "Product combinations mapping to Shopify variants",
        solution:
          "PrestaShop combinations with many attributes may exceed Shopify's 3-option/100-variant limit. Consider restructuring as separate products or using a variant expander app.",
      },
    ],
    shopifyAdvantages: [
      "No PHP hosting or server maintenance required",
      "Built-in payment processing with Shopify Payments reduces fees",
      "Superior mobile shopping experience out of the box",
      "Massive app ecosystem compared to PrestaShop's module marketplace",
    ],
    keywords: [
      "prestashop to shopify migration",
      "migrate prestashop to shopify",
      "prestashop shopify migration guide",
      "switch from prestashop to shopify",
    ],
    faqs: [
      {
        question: "Can I migrate PrestaShop product combinations to Shopify?",
        answer:
          "Yes, but with limitations. Shopify supports up to 3 product options and 100 variants per product. PrestaShop combinations with more attributes will need to be restructured. Migration tools like LitExtension handle most standard combinations automatically.",
      },
      {
        question: "How do I handle multi-language content during migration?",
        answer:
          "Shopify supports multiple languages through Shopify Markets (built-in) or apps like Weglot and Langify. Migrate your primary language first, then add translations. Consider which languages drive the most revenue to prioritize.",
      },
      {
        question: "Is PrestaShop or Shopify cheaper to run?",
        answer:
          "While PrestaShop is open-source, total cost of ownership including hosting, security, and maintenance often exceeds Shopify's monthly fee. Shopify's Basic plan at $39/month includes hosting, SSL, and security updates that would cost $50-200/month separately for PrestaShop.",
      },
    ],
  },
  {
    slug: "opencart-to-shopify",
    platformName: "OpenCart",
    headline: "How to Migrate from OpenCart to Shopify",
    description:
      "Complete migration guide for moving your OpenCart store to Shopify. Transfer all products, customer data, and orders while maintaining SEO equity.",
    difficulty: "moderate",
    estimatedTime: "1-2 weeks",
    dataToMigrate: [
      "Products & options",
      "Customer accounts",
      "Order history",
      "Categories & manufacturers",
      "SEO URLs",
      "Product reviews",
    ],
    steps: [
      {
        title: "Audit Your OpenCart Store",
        description:
          "Document your product count, active extensions, custom modifications, and URL structures. Identify which features are critical for your Shopify store.",
      },
      {
        title: "Export OpenCart Data",
        description:
          "Export products, customers, and orders via OpenCart's admin panel or directly from the MySQL database. Use CSV format for the cleanest data transfer.",
      },
      {
        title: "Set Up Shopify & Import Products",
        description:
          "Configure your Shopify store basics and import products. Map OpenCart options to Shopify variants and ensure images, descriptions, and pricing transfer correctly.",
      },
      {
        title: "Migrate Customers & Orders",
        description:
          "Import customer accounts with their addresses and order history. This preserves the relationship data needed for marketing and customer service.",
      },
      {
        title: "Implement SEO Redirects",
        description:
          "OpenCart's SEO URLs differ from Shopify's structure. Create 301 redirects for every product, category, and information page to preserve search rankings.",
      },
      {
        title: "Test, Verify & Launch",
        description:
          "Check product data accuracy, test the entire purchase flow, verify redirect chains, and confirm email automations before going live.",
      },
    ],
    commonIssues: [
      {
        issue: "OpenCart product options exceed Shopify variant limits",
        solution:
          "OpenCart allows unlimited options while Shopify caps at 3 options/100 variants. Restructure complex products or use apps like Infinite Options for additional customization.",
      },
      {
        issue: "Multi-store setup not available on basic Shopify",
        solution:
          "If you run multiple OpenCart storefronts, consider Shopify Markets for international stores or Shopify Plus for a true multi-store setup.",
      },
      {
        issue: "Custom OpenCart modifications lost in migration",
        solution:
          "Document all vQmod/OCMOD modifications and find Shopify app equivalents. Most common modifications have ready-made Shopify apps available.",
      },
    ],
    shopifyAdvantages: [
      "No more managing PHP/MySQL hosting and server security",
      "99.99% uptime guarantee vs self-hosted reliability concerns",
      "One-click app installs instead of manual extension installation",
      "Built-in analytics and reporting far superior to OpenCart's defaults",
    ],
    keywords: [
      "opencart to shopify migration",
      "migrate opencart to shopify",
      "opencart shopify migration guide",
      "switch from opencart to shopify",
    ],
    faqs: [
      {
        question: "How do I export my OpenCart products for Shopify import?",
        answer:
          "Use OpenCart's built-in export (System > Maintenance > Backup) or install an export extension for CSV format. For large stores, direct database export via phpMyAdmin gives you the most complete data. Migration tools like Cart2Cart can also automate the entire process.",
      },
      {
        question: "Will my OpenCart product reviews transfer to Shopify?",
        answer:
          "Product reviews don't transfer automatically via CSV import. Use a migration tool that supports review migration, or export reviews separately and import them into a Shopify reviews app like Judge.me or Loox.",
      },
      {
        question: "Can I keep my domain name when switching to Shopify?",
        answer:
          "Yes, you can either transfer your domain to Shopify or simply update the DNS records to point to Shopify's servers. Either way, you'll keep the same domain and preserve your SEO authority.",
      },
    ],
  },
  {
    slug: "3dcart-to-shopify",
    platformName: "3dcart (Shift4Shop)",
    headline: "How to Migrate from 3dcart to Shopify",
    description:
      "Guide to migrating your 3dcart (now Shift4Shop) store to Shopify. Move your entire catalog, customer base, and order history seamlessly.",
    difficulty: "moderate",
    estimatedTime: "1-2 weeks",
    dataToMigrate: [
      "Products & categories",
      "Customer accounts",
      "Order history",
      "Blog posts",
      "SEO URLs & meta data",
      "Gift certificates & coupons",
    ],
    steps: [
      {
        title: "Export 3dcart Data",
        description:
          "Use 3dcart's built-in export tools under Products > Export to create CSV files. Export customers and orders separately from their respective admin sections.",
      },
      {
        title: "Prepare Your Shopify Store",
        description:
          "Create your Shopify account, select a theme, and configure shipping, taxes, and payment settings to match your current 3dcart configuration.",
      },
      {
        title: "Import Product Catalog",
        description:
          "Clean up your CSV data to match Shopify's import format. Map 3dcart fields like extra fields and options to Shopify's product structure and metafields.",
      },
      {
        title: "Transfer Customer & Order Data",
        description:
          "Import customer accounts and order history. 3dcart's data structure maps relatively well to Shopify, making this step more straightforward than some platforms.",
      },
      {
        title: "Set Up Redirects & SEO",
        description:
          "Map all 3dcart URLs to Shopify equivalents and create 301 redirects. Preserve meta titles and descriptions for all product and category pages.",
      },
      {
        title: "Final Testing & DNS Switch",
        description:
          "Test all functionality including checkout, shipping calculations, and discount codes. Switch your domain DNS once everything is verified.",
      },
    ],
    commonIssues: [
      {
        issue: "3dcart extra fields don't map to standard Shopify fields",
        solution:
          "Use Shopify metafields to store additional product data from 3dcart's extra fields. Apps like Metafields Guru make managing these fields easier.",
      },
      {
        issue: "Gift certificates need to be recreated",
        solution:
          "Shopify uses gift cards instead of gift certificates. Export outstanding gift certificate balances and create equivalent Shopify gift cards for active ones.",
      },
      {
        issue: "3dcart's built-in features require Shopify apps",
        solution:
          "Features like product Q&A, built-in reviews, and RMA management that come with 3dcart will need Shopify app equivalents. Budget for app subscriptions.",
      },
    ],
    shopifyAdvantages: [
      "Far larger theme marketplace with professional designs",
      "Superior checkout experience that converts at higher rates",
      "Better app ecosystem with 8,000+ integrations",
      "More reliable platform with guaranteed uptime and support",
    ],
    keywords: [
      "3dcart to shopify migration",
      "migrate 3dcart to shopify",
      "shift4shop to shopify migration",
      "3dcart shopify migration guide",
    ],
    faqs: [
      {
        question: "Is 3dcart the same as Shift4Shop?",
        answer:
          "Yes, 3dcart rebranded to Shift4Shop in 2021 after being acquired by Shift4 Payments. The migration process is the same regardless of which name your store uses. All existing 3dcart stores were moved to the Shift4Shop platform.",
      },
      {
        question: "How much does it cost to migrate from 3dcart to Shopify?",
        answer:
          "DIY migration using CSV imports is free (besides your Shopify subscription). Automated migration tools like Cart2Cart charge $29-299 depending on data volume. Professional migration services typically cost $500-5,000 for complex stores.",
      },
      {
        question: "Will my 3dcart coupons work on Shopify?",
        answer:
          "Coupons need to be recreated manually on Shopify since discount code structures differ between platforms. Export your active coupon codes from 3dcart and recreate them in Shopify's Discounts section before launch.",
      },
    ],
  },
  {
    slug: "godaddy-to-shopify",
    platformName: "GoDaddy",
    headline: "How to Migrate from GoDaddy Online Store to Shopify",
    description:
      "Step-by-step guide to migrating your GoDaddy ecommerce store to Shopify. Upgrade to a professional e-commerce platform without losing data.",
    difficulty: "easy",
    estimatedTime: "3-7 days",
    dataToMigrate: [
      "Products & images",
      "Customer list",
      "Order history",
      "Domain settings",
      "Basic page content",
      "Product categories",
    ],
    steps: [
      {
        title: "Export GoDaddy Products",
        description:
          "In your GoDaddy dashboard, go to Commerce > Products and export your product catalog as a CSV file. Download all product images separately as backup.",
      },
      {
        title: "Set Up Shopify Store",
        description:
          "Create your Shopify store and configure your theme, payment provider, shipping zones, and tax settings. Shopify's setup wizard makes this straightforward.",
      },
      {
        title: "Import Products to Shopify",
        description:
          "Format your GoDaddy CSV to match Shopify's product import template. Upload products and verify images, pricing, and variants transferred correctly.",
      },
      {
        title: "Move Customer Data",
        description:
          "Export your GoDaddy customer list and import it into Shopify. Customer email addresses and basic info transfer easily; order history may need manual migration.",
      },
      {
        title: "Transfer Your Domain",
        description:
          "If your domain is registered with GoDaddy, either transfer it to Shopify or update DNS records to point to your new Shopify store.",
      },
      {
        title: "Test & Go Live",
        description:
          "Place test orders, verify product pages render correctly, and confirm email notifications are working. Set up URL redirects for any changed page paths.",
      },
    ],
    commonIssues: [
      {
        issue: "Limited export options from GoDaddy",
        solution:
          "GoDaddy's export tools are basic. For complex stores, manually copy product data or use a scraping tool. For small catalogs, manual recreation in Shopify may be faster.",
      },
      {
        issue: "Domain transfer delays",
        solution:
          "GoDaddy domain transfers can take 5-7 days. Start the transfer process early or simply update DNS A-records to point to Shopify immediately while the transfer processes.",
      },
      {
        issue: "Lost design customizations",
        solution:
          "GoDaddy designs don't transfer to Shopify. Choose a Shopify theme that matches your brand aesthetic and customize it. Shopify's themes are far more flexible than GoDaddy's.",
      },
    ],
    shopifyAdvantages: [
      "Vastly superior e-commerce features compared to GoDaddy's basic offering",
      "Professional themes designed for conversion optimization",
      "Integrated marketing tools including email, SEO, and social selling",
      "Scalable platform that grows with your business from startup to enterprise",
    ],
    keywords: [
      "godaddy to shopify migration",
      "migrate godaddy to shopify",
      "godaddy online store to shopify",
      "switch from godaddy to shopify",
    ],
    faqs: [
      {
        question: "Can I keep my GoDaddy domain when moving to Shopify?",
        answer:
          "Yes. You can either transfer your domain to Shopify (recommended for simplicity) or keep it at GoDaddy and update the DNS records to point to Shopify. Either option works and your website address stays the same.",
      },
      {
        question: "Is Shopify better than GoDaddy for e-commerce?",
        answer:
          "Shopify is significantly more powerful for e-commerce. GoDaddy's online store is a basic add-on to their hosting service, while Shopify is purpose-built for selling online with advanced features like abandoned cart recovery, multi-channel selling, and 8,000+ apps.",
      },
      {
        question: "How much does Shopify cost compared to GoDaddy?",
        answer:
          "Shopify Basic starts at $39/month vs GoDaddy's Commerce plan at $24.99/month. However, Shopify includes far more e-commerce features, better themes, and tools that would cost extra on GoDaddy, making the per-feature value significantly better.",
      },
    ],
  },
  {
    slug: "ecwid-to-shopify",
    platformName: "Ecwid",
    headline: "How to Migrate from Ecwid to Shopify",
    description:
      "Complete guide to moving your Ecwid store to Shopify. Transition from an embedded store widget to a full-featured e-commerce platform.",
    difficulty: "easy",
    estimatedTime: "3-7 days",
    dataToMigrate: [
      "Products & variations",
      "Customer accounts",
      "Order history",
      "Product categories",
      "Discount coupons",
      "Product images",
    ],
    steps: [
      {
        title: "Export Ecwid Data",
        description:
          "Go to Ecwid Control Panel > Catalog > Products and export your product catalog as CSV. Export customers and orders from their respective sections.",
      },
      {
        title: "Set Up Your Shopify Store",
        description:
          "Create a new Shopify store with your preferred theme. Configure payment processing, shipping rates, and tax settings to match your current Ecwid setup.",
      },
      {
        title: "Import Products & Categories",
        description:
          "Format your Ecwid CSV export to match Shopify's import format. Import products and organize them into Shopify collections to replace Ecwid categories.",
      },
      {
        title: "Migrate Customers & Orders",
        description:
          "Import your customer list into Shopify. For order history, use a migration tool or import via Shopify's API for a complete migration.",
      },
      {
        title: "Set Up Domain & Redirects",
        description:
          "Point your domain to Shopify. If you used Ecwid embedded on another site, set up redirects from your old store pages to the new Shopify URLs.",
      },
      {
        title: "Verify & Launch",
        description:
          "Test all product pages, the checkout process, and payment processing. Verify inventory counts are accurate and shipping calculations are correct.",
      },
    ],
    commonIssues: [
      {
        issue: "Embedded store URLs don't have direct equivalents",
        solution:
          "Ecwid stores embedded in Wix, WordPress, etc. use JavaScript-rendered URLs. Create redirects from your old website pages to corresponding Shopify product pages.",
      },
      {
        issue: "Product variations mapping differences",
        solution:
          "Ecwid's variation system is flexible but maps well to Shopify variants. Ensure products with more than 100 variations are restructured before import.",
      },
      {
        issue: "Losing the existing website integration",
        solution:
          "Moving from Ecwid means leaving your host site (Wix, WordPress, etc.). Shopify provides a complete website, so rebuild any important non-store pages in Shopify.",
      },
    ],
    shopifyAdvantages: [
      "Full standalone e-commerce platform instead of embedded widget",
      "Far more powerful marketing and SEO tools built in",
      "Dedicated mobile app for store management on the go",
      "Access to Shopify's POS system for in-person selling",
    ],
    keywords: [
      "ecwid to shopify migration",
      "migrate ecwid to shopify",
      "ecwid shopify migration guide",
      "switch from ecwid to shopify",
    ],
    faqs: [
      {
        question: "Should I switch from Ecwid to Shopify?",
        answer:
          "If you're serious about e-commerce growth, yes. Ecwid is great as an add-on store widget, but Shopify provides a complete e-commerce ecosystem with superior themes, apps, marketing tools, and scalability. The switch makes sense once you outgrow Ecwid's limitations.",
      },
      {
        question: "Can I use Shopify embedded in my existing website like Ecwid?",
        answer:
          "Shopify offers a Buy Button and Hydrogen/headless options for embedding into other sites, but its strength is as a standalone platform. Most merchants migrating from Ecwid benefit from using Shopify as their complete website and store.",
      },
      {
        question: "How do I redirect traffic from my old Ecwid store?",
        answer:
          "Since Ecwid is typically embedded, set up redirects on your host website (WordPress, Wix, etc.) pointing old store pages to your new Shopify URLs. For the host site itself, you can add a prominent banner directing visitors to your new store.",
      },
    ],
  },
  {
    slug: "jimdo-to-shopify",
    platformName: "Jimdo",
    headline: "How to Migrate from Jimdo to Shopify",
    description:
      "Guide to migrating your Jimdo online store to Shopify. Upgrade from a website builder with basic e-commerce to a dedicated selling platform.",
    difficulty: "easy",
    estimatedTime: "3-5 days",
    dataToMigrate: [
      "Products & images",
      "Customer information",
      "Order records",
      "Page content",
      "Domain settings",
      "Basic SEO data",
    ],
    steps: [
      {
        title: "Document Your Jimdo Store",
        description:
          "Jimdo has limited export options. Screenshot or document all products, prices, descriptions, and images. Download all product images at the highest resolution available.",
      },
      {
        title: "Create Your Shopify Store",
        description:
          "Set up a Shopify account and choose a theme. Configure your store's fundamental settings including payments, shipping, and tax collection.",
      },
      {
        title: "Manually Add or Import Products",
        description:
          "For small catalogs, add products directly in Shopify. For larger stores, create a CSV file from your documented data and use Shopify's product importer.",
      },
      {
        title: "Recreate Store Pages",
        description:
          "Rebuild your About, Contact, FAQ, and other content pages in Shopify. Use Shopify's page editor which offers more flexibility than Jimdo's builder.",
      },
      {
        title: "Transfer Domain",
        description:
          "Move your domain from Jimdo to Shopify or update DNS settings. If using a Jimdo subdomain, set up a new custom domain on Shopify.",
      },
      {
        title: "Test Everything & Launch",
        description:
          "Place test orders, check mobile responsiveness, verify all pages load correctly, and confirm email notifications work before going live.",
      },
    ],
    commonIssues: [
      {
        issue: "No automated export from Jimdo",
        solution:
          "Jimdo lacks bulk export tools. For small stores (under 50 products), manual recreation is fastest. For larger stores, use a web scraping tool or migration service.",
      },
      {
        issue: "Jimdo AI-built pages need complete redesign",
        solution:
          "If you used Jimdo's AI builder, your design won't transfer. This is actually an opportunity — Shopify's themes are far more professional and conversion-optimized.",
      },
      {
        issue: "Jimdo subdomain users need a real domain",
        solution:
          "If you've been using a yourstore.jimdosite.com address, purchase a custom domain through Shopify or a registrar. This upgrade significantly improves credibility.",
      },
    ],
    shopifyAdvantages: [
      "Professional e-commerce platform vs basic website builder add-on",
      "Abandoned cart recovery and advanced marketing automation",
      "Multi-channel selling across social media and marketplaces",
      "Dedicated customer support available 24/7 via chat and phone",
    ],
    keywords: [
      "jimdo to shopify migration",
      "migrate jimdo to shopify",
      "jimdo shopify migration guide",
      "switch from jimdo to shopify",
    ],
    faqs: [
      {
        question: "Is Shopify worth the upgrade from Jimdo?",
        answer:
          "For serious e-commerce, absolutely. Jimdo is a website builder with basic store features. Shopify is purpose-built for selling online with tools like abandoned cart recovery, multi-channel selling, advanced analytics, and 8,000+ apps that Jimdo simply cannot match.",
      },
      {
        question: "Can I export my Jimdo products automatically?",
        answer:
          "Jimdo has very limited export functionality compared to other platforms. For most stores, you'll need to manually document products or use a third-party migration service. The good news is that most Jimdo stores are small enough for manual migration to be practical.",
      },
      {
        question: "Will my Jimdo website design work on Shopify?",
        answer:
          "No, designs don't transfer between platforms. You'll choose a new Shopify theme and customize it to match your brand. Shopify's theme store has hundreds of professional designs, many of which are free, that are specifically optimized for e-commerce conversion.",
      },
    ],
  },
  {
    slug: "nuvemshop-to-shopify",
    platformName: "Nuvemshop",
    headline: "How to Migrate from Nuvemshop to Shopify",
    description:
      "Complete guide to migrating your Nuvemshop (Tiendanube) store to Shopify. Expand beyond Latin America with a global e-commerce platform.",
    difficulty: "moderate",
    estimatedTime: "1-2 weeks",
    dataToMigrate: [
      "Products & variants",
      "Customer accounts",
      "Order history",
      "Categories",
      "SEO metadata",
      "Blog content",
    ],
    steps: [
      {
        title: "Export Nuvemshop Data",
        description:
          "Use Nuvemshop's admin panel to export products as CSV. Export customers and orders separately. Download all product images as a backup.",
      },
      {
        title: "Configure Shopify Store",
        description:
          "Create your Shopify account and set up your store for your target markets. Configure Shopify Markets for multi-country selling if you serve multiple Latin American countries.",
      },
      {
        title: "Import Product Catalog",
        description:
          "Map Nuvemshop's product fields to Shopify format and import via CSV. Ensure Spanish/Portuguese product descriptions and SEO content transfer correctly.",
      },
      {
        title: "Migrate Customer & Order Data",
        description:
          "Import customer databases and order histories. Ensure local payment method information is documented for recreating integrations on Shopify.",
      },
      {
        title: "Set Up Local Payments & Shipping",
        description:
          "Configure Shopify Payments and local payment methods like MercadoPago, Boleto, and PIX. Set up shipping with local carriers like Correios or Mercado Envios.",
      },
      {
        title: "Test Regional Features & Launch",
        description:
          "Verify local payment methods, shipping calculations, and tax compliance. Test the complete purchase flow with regional payment options before going live.",
      },
    ],
    commonIssues: [
      {
        issue: "Local payment methods need reconfiguration",
        solution:
          "Shopify supports MercadoPago and other Latin American payment methods through payment apps. Install and configure these before launch to avoid checkout disruption.",
      },
      {
        issue: "Regional shipping carrier integrations",
        solution:
          "Set up Shopify shipping apps for Latin American carriers. Apps like Melhor Envio, Frenet, or Kangu provide carrier integrations comparable to Nuvemshop's built-in options.",
      },
      {
        issue: "Tax calculation differences between platforms",
        solution:
          "Latin American tax systems are complex. Use Shopify's tax settings and consider a tax compliance app specific to your countries (Brazil, Argentina, Mexico, etc.).",
      },
    ],
    shopifyAdvantages: [
      "Global reach with Shopify Markets for international expansion",
      "Superior app ecosystem with 8,000+ integrations vs Nuvemshop's limited selection",
      "Better performance and uptime for high-traffic stores",
      "Access to Shopify's extensive educational resources and community",
    ],
    keywords: [
      "nuvemshop to shopify migration",
      "migrate nuvemshop to shopify",
      "tiendanube to shopify migration",
      "nuvemshop shopify migration guide",
    ],
    faqs: [
      {
        question: "Does Shopify work well in Latin America?",
        answer:
          "Yes. Shopify has expanded significantly in Latin America with local payment methods (MercadoPago, Boleto, PIX), local shipping carriers, and Portuguese/Spanish language support. Many large Latin American brands have migrated from Nuvemshop to Shopify for better scalability.",
      },
      {
        question: "Can I use MercadoPago on Shopify?",
        answer:
          "Yes, Shopify supports MercadoPago as a payment provider in Brazil, Argentina, Mexico, Chile, Colombia, and other Latin American countries. You can enable it directly in your Shopify payment settings or through the MercadoPago app.",
      },
      {
        question: "Is Nuvemshop or Shopify better for Brazilian stores?",
        answer:
          "Nuvemshop (Tiendanube) has strong local features for Brazil, but Shopify offers superior scalability, more apps, better themes, and global expansion capabilities. For stores planning to grow beyond Brazil or needing advanced features, Shopify is the better choice.",
      },
    ],
  },
  {
    slug: "lightspeed-to-shopify",
    platformName: "Lightspeed",
    headline: "How to Migrate from Lightspeed to Shopify",
    description:
      "Step-by-step guide to migrating your Lightspeed eCom store to Shopify. Transition your online and POS operations to a unified Shopify ecosystem.",
    difficulty: "moderate",
    estimatedTime: "1-3 weeks",
    dataToMigrate: [
      "Products & variants",
      "Customer accounts",
      "Order history",
      "Categories & brands",
      "SEO data & URLs",
      "Inventory levels",
    ],
    steps: [
      {
        title: "Export Lightspeed Data",
        description:
          "Use Lightspeed eCom's export features to download products, customers, and orders as CSV files. Export inventory data including stock levels and warehouse locations.",
      },
      {
        title: "Set Up Shopify Store & POS",
        description:
          "Create your Shopify store and if applicable, set up Shopify POS to replace Lightspeed's retail system. Configure both online and in-store settings.",
      },
      {
        title: "Import Product Catalog",
        description:
          "Map Lightspeed product fields to Shopify's format. Import products, variants, and images. Set up collections to match your Lightspeed category structure.",
      },
      {
        title: "Transfer Customers & Orders",
        description:
          "Import customer data and order history. If you use Lightspeed's loyalty program, plan the transition to a Shopify loyalty app before migration.",
      },
      {
        title: "Configure Inventory & POS",
        description:
          "Set up Shopify's inventory management and POS locations. Sync stock levels between online and physical stores. Configure barcode scanning and receipt printing.",
      },
      {
        title: "Parallel Testing & Cutover",
        description:
          "Run both systems simultaneously for a testing period. Verify inventory accuracy, POS functionality, and online store operations before fully switching.",
      },
    ],
    commonIssues: [
      {
        issue: "POS transition disrupts in-store operations",
        solution:
          "Plan the POS switch for your slowest business day. Train staff on Shopify POS beforehand. Run both systems in parallel for 1-2 days to ensure smooth operations.",
      },
      {
        issue: "Lightspeed's inventory structure differs from Shopify's",
        solution:
          "Lightspeed's inventory management is more complex than standard Shopify. Use Shopify's multi-location inventory feature and consider apps like Stocky for advanced inventory needs.",
      },
      {
        issue: "Loyalty program data migration",
        solution:
          "Export loyalty points and customer tiers from Lightspeed. Set up a Shopify loyalty app like Smile.io or LoyaltyLion and manually import customer balances.",
      },
    ],
    shopifyAdvantages: [
      "Unified online store and POS system with real-time inventory sync",
      "Superior e-commerce features and checkout conversion rates",
      "More affordable POS hardware and lower processing fees",
      "Massive app ecosystem for extending both online and retail functionality",
    ],
    keywords: [
      "lightspeed to shopify migration",
      "migrate lightspeed to shopify",
      "lightspeed ecom to shopify",
      "lightspeed shopify migration guide",
    ],
    faqs: [
      {
        question: "Can Shopify POS replace Lightspeed POS?",
        answer:
          "Yes. Shopify POS has matured significantly and now rivals Lightspeed for retail features including inventory management, staff management, and customer loyalty. Shopify POS Pro ($89/month per location) offers features comparable to Lightspeed's retail plans.",
      },
      {
        question: "How do I sync inventory between online and in-store?",
        answer:
          "Shopify automatically syncs inventory across all sales channels and POS locations in real-time. When you sell online, in-store stock updates immediately and vice versa. This is a core Shopify feature that requires no additional apps.",
      },
      {
        question: "Is Shopify cheaper than Lightspeed for omnichannel retail?",
        answer:
          "Generally yes. Shopify's combined online + POS pricing is typically lower than Lightspeed's, especially for multi-location retailers. Shopify Basic ($39/month) plus POS Pro ($89/location) is competitive with Lightspeed's retail plans which start at $89/month.",
      },
    ],
  },
  {
    slug: "yahoo-stores-to-shopify",
    platformName: "Yahoo Stores",
    headline: "How to Migrate from Yahoo Stores to Shopify",
    description:
      "Guide to migrating your legacy Yahoo Store (Aabaco/Verizon Small Business) to Shopify. Modernize your e-commerce presence on a current platform.",
    difficulty: "complex",
    estimatedTime: "2-4 weeks",
    dataToMigrate: [
      "Products & images",
      "Customer database",
      "Order history",
      "Page content",
      "SEO URLs & rankings",
      "Domain settings",
    ],
    steps: [
      {
        title: "Archive Your Yahoo Store Data",
        description:
          "Export all product data, customer lists, and order history from Yahoo's Store Manager. Download every product image at full resolution since Yahoo's hosting will be inaccessible after migration.",
      },
      {
        title: "Clean & Prepare Data",
        description:
          "Yahoo Store data formats are legacy and need significant cleaning. Restructure product data into Shopify's CSV format, standardize image filenames, and organize categories.",
      },
      {
        title: "Build Your Shopify Store",
        description:
          "Create a new Shopify store with a modern, mobile-responsive theme. Yahoo Store designs are outdated — this is your opportunity for a major visual upgrade.",
      },
      {
        title: "Import Products & Content",
        description:
          "Import your cleaned product data via Shopify's CSV importer. Upload all images and recreate any custom content pages from your Yahoo Store.",
      },
      {
        title: "Comprehensive URL Redirect Strategy",
        description:
          "Yahoo Store URLs use unique formats. Create a complete redirect map from every old URL to its Shopify equivalent. This is critical since long-running Yahoo Stores have significant SEO equity.",
      },
      {
        title: "Extended Testing & Phased Launch",
        description:
          "Test thoroughly with real transactions. For long-established stores, consider a soft launch with a subset of products before fully migrating.",
      },
    ],
    commonIssues: [
      {
        issue: "Legacy Yahoo Store data formats are difficult to parse",
        solution:
          "Yahoo's RTML-based data doesn't export cleanly. Use a professional migration service familiar with Yahoo Store's unique data structure, or budget extra time for manual data cleaning.",
      },
      {
        issue: "Years of SEO equity at risk during migration",
        solution:
          "Yahoo Stores often have 10-20+ years of backlinks and rankings. Create exhaustive 301 redirects and use Google Search Console's Change of Address tool to preserve this equity.",
      },
      {
        issue: "Yahoo-specific features with no direct equivalent",
        solution:
          "Features like Yahoo's built-in order processing and crosslinks need Shopify app replacements. Document all features you actively use and find equivalents before migrating.",
      },
    ],
    shopifyAdvantages: [
      "Modern, mobile-first design replacing a platform from the 1990s",
      "Active development and regular feature updates vs Yahoo's stagnant platform",
      "Built-in SEO tools, analytics, and marketing features",
      "Reliable support and massive community vs Yahoo's limited merchant resources",
    ],
    keywords: [
      "yahoo stores to shopify migration",
      "migrate yahoo store to shopify",
      "yahoo ecommerce to shopify",
      "aabaco to shopify migration",
    ],
    faqs: [
      {
        question: "Is Yahoo Stores still operational?",
        answer:
          "Yahoo Stores has gone through multiple ownership changes (Yahoo > Aabaco > Verizon Small Business). While some legacy stores still operate, the platform receives minimal updates and no new features. Migrating to Shopify is strongly recommended for any remaining Yahoo Store merchants.",
      },
      {
        question: "How do I preserve my Yahoo Store's SEO rankings?",
        answer:
          "Create 301 redirects for every product, category, and content page. Yahoo Store URLs have unique formats (store.yahoo.com/yourstore/ or custom domains), so each needs individual mapping. Use Google Search Console to monitor the transition and submit your new sitemap.",
      },
      {
        question: "Can a professional handle my Yahoo Store migration?",
        answer:
          "Yes, and it's recommended for Yahoo Store migrations due to the legacy data formats. Several Shopify Partners specialize in Yahoo Store migrations. Expect to pay $1,000-10,000 depending on catalog size and complexity.",
      },
    ],
  },
];

/**
 * Get all migrations for static generation
 */
export function getAllMigrations(): Migration[] {
  return migrations;
}

/**
 * Get a specific migration by slug
 */
export function getMigrationBySlug(slug: string): Migration | undefined {
  return migrations.find((m) => m.slug === slug);
}

/**
 * Get all migration slugs for generateStaticParams
 */
export function getAllMigrationSlugs(): string[] {
  return migrations.map((m) => m.slug);
}
