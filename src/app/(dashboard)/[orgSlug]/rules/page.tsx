import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db/client";
import { organization, member } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { RulesView } from "@/components/rules/rules-view";
import { getNotificationRules } from "@/lib/actions/rules";

export const metadata = {
  title: "Notification Rules",
  description: "Configure alerts and notifications for ad account changes",
};

export default async function RulesPage({
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

  // Get notification rules
  const rulesResult = await getNotificationRules(org.id);

  const canManageRules =
    membership.role === "owner" || membership.role === "admin";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notification Rules</h1>
        <p className="text-muted-foreground">
          Configure what changes trigger alerts and how you want to be notified
        </p>
      </div>

      <RulesView
        organizationId={org.id}
        rules={rulesResult.rules}
        canManageRules={canManageRules}
        userId={session.user.id}
        orgSlug={orgSlug}
      />
    </div>
  );
}
