import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db/client";
import { organization, member } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { SettingsNav } from "@/components/settings/settings-nav";
import { MembersSettings } from "@/components/settings/members-settings";
import { getOrganizationMembers } from "@/lib/actions/organization";

export const metadata = {
  title: "Members Settings",
};

export default async function MembersSettingsPage({
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

  // Get all members
  const membersResult = await getOrganizationMembers(org.id);

  const canManageMembers = membership.role === "owner" || membership.role === "admin";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your organization settings and preferences
        </p>
      </div>

      <SettingsNav orgSlug={orgSlug} />

      <MembersSettings
        organizationId={org.id}
        members={membersResult.members}
        canManageMembers={canManageMembers}
        currentUserRole={membership.role}
        currentUserId={session.user.id}
      />
    </div>
  );
}
