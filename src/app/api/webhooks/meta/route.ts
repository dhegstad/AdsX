import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db/client";
import { adAccount } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { detectAndRecordChanges, type ResourceState } from "@/lib/change-detection/detect-changes";

/**
 * GET handler for Meta webhook verification
 * Meta sends a verification request when you set up the webhook
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  // Check if this is a verification request
  if (mode === "subscribe") {
    // Verify the token matches your configured verify token
    const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || "adsx_verify_token_2024";

    if (token === VERIFY_TOKEN) {
      console.log("✅ Meta webhook verified successfully");
      // Respond with the challenge to verify the webhook
      return new NextResponse(challenge, { status: 200 });
    } else {
      console.error("❌ Meta webhook verification failed - invalid token");
      return NextResponse.json({ error: "Invalid verify token" }, { status: 403 });
    }
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

/**
 * POST handler for Meta webhook events
 * Meta sends notifications about changes to your ad accounts
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-hub-signature-256");

    // Verify the webhook signature
    if (!verifyWebhookSignature(body, signature)) {
      console.error("❌ Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const data = JSON.parse(body);
    console.log("📥 Received Meta webhook:", JSON.stringify(data, null, 2));

    // Process the webhook event
    if (data.object === "page" || data.object === "instagram") {
      for (const entry of data.entry || []) {
        // Process changes for each entry
        for (const change of entry.changes || []) {
          await processMetaChange(change);
        }
      }
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Error processing Meta webhook:", error);
    // Still return 200 to prevent Meta from retrying
    return NextResponse.json({ success: false }, { status: 200 });
  }
}

/**
 * Verify the webhook signature using the app secret
 */
function verifyWebhookSignature(payload: string, signature: string | null): boolean {
  if (!signature) {
    return false;
  }

  const APP_SECRET = process.env.META_APP_SECRET;
  if (!APP_SECRET) {
    console.error("❌ META_APP_SECRET not configured");
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", APP_SECRET)
    .update(payload)
    .digest("hex");

  const signatureHash = signature.replace("sha256=", "");

  return crypto.timingSafeEqual(
    Buffer.from(signatureHash),
    Buffer.from(expectedSignature)
  );
}

/**
 * Process a change notification from Meta
 */
async function processMetaChange(change: any) {
  console.log("🔄 Processing Meta change:", change.field);

  const { field, value } = change;

  // Map Meta change fields to our resource types
  let resourceType: string | null = null;
  let resourceId: string | null = null;

  switch (field) {
    case "campaigns":
      resourceType = "campaign";
      resourceId = value.campaign_id;
      break;
    case "adsets":
      resourceType = "ad_set";
      resourceId = value.adset_id;
      break;
    case "ads":
      resourceType = "ad";
      resourceId = value.ad_id;
      break;
    default:
      console.log(`⚠️ Unhandled change field: ${field}`);
      return;
  }

  if (!resourceType || !resourceId) {
    return;
  }

  // Find the ad account associated with this change
  const accountId = value.account_id;
  if (!accountId) {
    console.error("❌ No account_id in webhook payload");
    return;
  }

  // Find our internal ad account record
  const [account] = await db
    .select()
    .from(adAccount)
    .where(eq(adAccount.platformAccountId, accountId))
    .limit(1);

  if (!account) {
    console.log(`⚠️ Ad account not found: ${accountId}`);
    return;
  }

  // Fetch the current state of the resource from Meta API
  // Note: In production, you'd make an API call here to get the full resource data
  // For now, we'll use the webhook payload data
  const currentState: ResourceState = {
    id: resourceId,
    name: value.name || "Unknown",
    status: value.status || "unknown",
    budget: value.budget_remaining,
    ...value, // Include all other fields from the webhook
  };

  // Detect changes and record them
  await detectAndRecordChanges(
    account.id,
    "meta",
    resourceType,
    [currentState]
  );

  console.log(`✅ Processed ${resourceType} change: ${resourceId}`);
}
