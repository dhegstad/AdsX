import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db/client";
import { organization, member } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { SettingsNav } from "@/components/settings/settings-nav";
import { BillingSettings } from "@/components/settings/billing-settings";
import { getSubscription } from "@/lib/actions/billing";
import { getOrganizationUsage } from "@/lib/usage/track";

export const metadata = {
  title: "Billing Settings",
};

export default async function BillingSettingsPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  // Get organization
  const [org] = await db
    .select()
    .from(organization)
    .where(eq(organization.slug, orgSlug))
    .limit(1);

  if (!org) {
    redirect("/onboarding");
  }

  // Check if user is a member
  const [membership] = await db
    .select()
    .from(member)
    .where(eq(member.organizationId, org.id))
    .where(eq(member.userId, session.user.id))
    .limit(1);

  if (!membership) {
    redirect("/onboarding");
  }

  const canManageBilling = membership.role === "owner";

  // Get subscription data
  const subscriptionResult = await getSubscription(org.id);

  // Get real usage data
  const usage = await getOrganizationUsage(org.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your organization settings and preferences
        </p>
      </div>

      <SettingsNav orgSlug={orgSlug} />

      <BillingSettings
        organizationId={org.id}
        orgSlug={orgSlug}
        canManageBilling={canManageBilling}
        subscription={subscriptionResult.subscription}
        usage={usage}
      />
    </div>
  );
}
