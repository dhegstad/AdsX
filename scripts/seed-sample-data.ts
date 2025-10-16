import { db } from "../src/lib/db/client";
import { adAccount, changeEvent } from "../src/lib/db/schema";
import { eq } from "drizzle-orm";

async function seedSampleData() {
  console.log("🌱 Seeding sample data...");

  try {
    // Get all ad accounts
    const accounts = await db.select().from(adAccount);

    if (accounts.length === 0) {
      console.log("❌ No ad accounts found. Please connect an account first.");
      console.log("   You can create a test account by running:");
      console.log("   await createTestAdAccount()");
      return;
    }

    console.log(`✓ Found ${accounts.length} ad account(s)`);

    // Sample change events for each account
    const sampleEvents = [
      {
        changeType: "budget_increased",
        entityType: "campaign",
        entityName: "Black Friday Sale 2024",
        oldValue: { budget: 500, status: "active" },
        newValue: { budget: 1000, status: "active" },
      },
      {
        changeType: "paused",
        entityType: "ad_set",
        entityName: "US Audience - Mobile",
        oldValue: { status: "active", daily_budget: 100 },
        newValue: { status: "paused", daily_budget: 100 },
      },
      {
        changeType: "created",
        entityType: "ad",
        entityName: "Holiday Promo - Video Ad",
        oldValue: null,
        newValue: { status: "active", creative_type: "video" },
      },
      {
        changeType: "updated",
        entityType: "campaign",
        entityName: "Summer Collection Launch",
        oldValue: { name: "Summer Collection Launch", targeting: "broad" },
        newValue: { name: "Summer Collection - Final Week", targeting: "broad" },
      },
      {
        changeType: "budget_decreased",
        entityType: "campaign",
        entityName: "Retargeting Campaign",
        oldValue: { budget: 750, status: "active" },
        newValue: { budget: 500, status: "active" },
      },
      {
        changeType: "resumed",
        entityType: "ad_set",
        entityName: "Desktop - High Intent",
        oldValue: { status: "paused", daily_budget: 200 },
        newValue: { status: "active", daily_budget: 200 },
      },
      {
        changeType: "deleted",
        entityType: "ad",
        entityName: "Old Seasonal Banner",
        oldValue: { status: "active", creative_type: "image" },
        newValue: null,
      },
      {
        changeType: "updated",
        entityType: "ad_set",
        entityName: "iOS Users - Premium",
        oldValue: { targeting: "ios_14+", bid_amount: 5.5 },
        newValue: { targeting: "ios_15+", bid_amount: 6.0 },
      },
      {
        changeType: "created",
        entityType: "campaign",
        entityName: "Q4 Product Launch",
        oldValue: null,
        newValue: { budget: 2000, status: "active", objective: "conversions" },
      },
      {
        changeType: "updated",
        entityType: "ad",
        entityName: "Carousel - Product Showcase",
        oldValue: { headline: "Shop Now", cta: "learn_more" },
        newValue: { headline: "Limited Time Offer", cta: "shop_now" },
      },
    ];

    let eventsCreated = 0;

    for (const account of accounts) {
      console.log(`\n📊 Creating sample events for: ${account.platformAccountName}`);

      for (const event of sampleEvents) {
        const entityId = `${event.entityType}_${Math.random().toString(36).substr(2, 9)}`;

        const diff =
          event.oldValue && event.newValue
            ? generateDiff(event.oldValue, event.newValue)
            : null;

        // Create events at different times in the past
        const detectedAt = new Date();
        detectedAt.setHours(detectedAt.getHours() - Math.floor(Math.random() * 48));

        // Calculate severity based on change type
        const severity =
          event.changeType === "deleted" || event.changeType.includes("budget_decreased")
            ? "warning"
            : event.changeType === "created"
            ? "info"
            : "info";

        await db.insert(changeEvent).values({
          adAccountId: account.id,
          platform: account.platform as "meta" | "google",
          resourceType: event.entityType,
          resourceId: entityId,
          resourceName: event.entityName,
          changeType: event.changeType,
          severity,
          beforeValue: event.oldValue,
          afterValue: event.newValue,
          diff,
          detectedAt,
        });

        eventsCreated++;
      }

      console.log(`✓ Created ${sampleEvents.length} events`);
    }

    console.log(`\n✅ Successfully seeded ${eventsCreated} sample change events!`);
    console.log("🎉 Visit your activity feed to see them in action!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    throw error;
  }
}

function generateDiff(
  oldValue: Record<string, any>,
  newValue: Record<string, any>
): Record<string, any> {
  const diff: Record<string, any> = {};
  const allKeys = new Set([...Object.keys(oldValue), ...Object.keys(newValue)]);

  for (const key of allKeys) {
    if (oldValue[key] !== newValue[key]) {
      diff[key] = {
        old: oldValue[key],
        new: newValue[key],
      };
    }
  }

  return diff;
}

// Optional: Create a test ad account if none exist
async function createTestAdAccount() {
  console.log("🔧 Creating test ad account...");

  try {
    // Get the first organization
    const { organization } = await import("../src/lib/db/schema");
    const [org] = await db.select().from(organization).limit(1);

    if (!org) {
      console.log("❌ No organization found. Please create one first.");
      return;
    }

    const [testAccount] = await db
      .insert(adAccount)
      .values({
        organizationId: org.id,
        platform: "meta",
        platformAccountId: "act_test_" + Math.random().toString(36).substr(2, 9),
        platformAccountName: "Test Meta Ads Account",
        accessToken: "test_token",
        isActive: true,
      })
      .returning();

    console.log(`✅ Created test account: ${testAccount.platformAccountName}`);
    return testAccount;
  } catch (error) {
    console.error("❌ Error creating test account:", error);
    throw error;
  }
}

// Run the seeder
seedSampleData()
  .then(() => {
    console.log("\n✨ Seeding complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Seeding failed:", error);
    process.exit(1);
  });
