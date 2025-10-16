import { redirect, notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db/client";
import { organization, member } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { ChangeEventDetail } from "@/components/activity/change-event-detail";
import { getChangeEventById } from "@/lib/actions/change-events";

export default async function ChangeEventPage({
  params,
}: {
  params: Promise<{ orgSlug: string; eventId: string }>;
}) {
  const { orgSlug, eventId } = await params;

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
    .where(and(
      eq(member.organizationId, org.id),
      eq(member.userId, session.user.id)
    ))
    .limit(1);

  if (!membership) {
    redirect("/onboarding");
  }

  // Get change event
  const eventResult = await getChangeEventById(eventId);

  if (!eventResult.success || !eventResult.event) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <ChangeEventDetail event={eventResult.event} orgSlug={orgSlug} />
    </div>
  );
}
