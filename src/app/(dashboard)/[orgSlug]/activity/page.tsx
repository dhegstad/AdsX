import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db/client";
import { organization, member } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ActivityFeed } from "@/components/activity/activity-feed";
import { getChangeEvents } from "@/lib/actions/change-events";

export const metadata = {
  title: "Activity Feed",
  description: "Monitor all changes to your ad accounts in real-time",
};

export default async function ActivityPage({
  params,
  searchParams,
}: {
  params: Promise<{ orgSlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { orgSlug } = await params;
  const filters = await searchParams;

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

  // Get change events with filters
  const platform = Array.isArray(filters.platform) ? filters.platform[0] : filters.platform;
  const changeType = Array.isArray(filters.changeType) ? filters.changeType[0] : filters.changeType;

  const eventsResult = await getChangeEvents({
    organizationId: org.id,
    platform: platform as "meta" | "google" | undefined,
    changeType: changeType as string | undefined,
    limit: 50,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Activity</h1>
        <p className="text-muted-foreground">
          Real-time monitoring of all changes to your ad accounts
        </p>
      </div>

      <ActivityFeed
        organizationId={org.id}
        events={eventsResult.events}
        initialFilters={{
          platform: platform as "meta" | "google" | undefined,
          changeType: changeType as string | undefined,
        }}
      />
    </div>
  );
}
