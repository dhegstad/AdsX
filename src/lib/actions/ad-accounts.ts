"use server";

import { db } from "@/lib/db/client";
import { adAccount } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { canAddAdAccount } from "@/lib/usage/track";

export async function getAdAccounts(organizationId: string) {
  try {
    const accounts = await db
      .select()
      .from(adAccount)
      .where(eq(adAccount.organizationId, organizationId));

    return { success: true, accounts };
  } catch (error) {
    console.error("Error fetching ad accounts:", error);
    return { success: false, accounts: [] };
  }
}

export async function disconnectAdAccount(data: {
  accountId: string;
  organizationId: string;
}) {
  try {
    // Delete the ad account
    await db.delete(adAccount).where(eq(adAccount.id, data.accountId));

    return { success: true };
  } catch (error) {
    console.error("Error disconnecting ad account:", error);
    return { success: false, error: "Failed to disconnect account" };
  }
}

export async function createAdAccount(data: {
  organizationId: string;
  platform: "meta" | "google";
  accountId: string;
  accountName: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
}) {
  try {
    // Check if organization can add more ad accounts
    const limitCheck = await canAddAdAccount(data.organizationId);

    if (!limitCheck.allowed) {
      return {
        success: false,
        error: limitCheck.reason || "Ad account limit reached",
      };
    }

    const [newAccount] = await db
      .insert(adAccount)
      .values({
        organizationId: data.organizationId,
        platform: data.platform,
        platformAccountId: data.accountId,
        platformAccountName: data.accountName,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        tokenExpiresAt: data.expiresAt,
        isActive: true,
      })
      .returning();

    return { success: true, account: newAccount };
  } catch (error) {
    console.error("Error creating ad account:", error);
    return { success: false, error: "Failed to connect account" };
  }
}
