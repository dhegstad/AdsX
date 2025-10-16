import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db/client";
import { organization, member } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { OverviewStats } from "@/components/overview/overview-stats";
import { RecentActivity } from "@/components/overview/recent-activity";
import { getChangeEvents } from "@/lib/actions/change-events";
import { getAdAccounts } from "@/lib/actions/ad-accounts";

export default async function OverviewPage({
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

  // Get data for overview
  const [eventsResult, accountsResult] = await Promise.all([
    getChangeEvents({ organizationId: org.id, limit: 10 }),
    getAdAccounts(org.id),
  ]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">
          Monitor your ad account changes and alerts
        </p>
      </div>

      {/* Stats */}
      <OverviewStats
        totalChanges={eventsResult.events.length}
        connectedAccounts={accountsResult.accounts.length}
      />

      {/* Recent activity */}
      <RecentActivity events={eventsResult.events} orgSlug={orgSlug} />
    </div>
  );
}
