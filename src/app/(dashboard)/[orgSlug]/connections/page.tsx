import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db/client";
import { organization, member } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ConnectionsView } from "@/components/connections/connections-view";
import { getAdAccounts } from "@/lib/actions/ad-accounts";

export const metadata = {
  title: "Ad Account Connections",
  description: "Connect and manage your Meta and Google Ads accounts",
};

export default async function ConnectionsPage({
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

  // Get connected ad accounts
  const accountsResult = await getAdAccounts(org.id);

  const canManageConnections =
    membership.role === "owner" || membership.role === "admin";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ad Accounts</h1>
        <p className="text-muted-foreground">
          Connect and manage your advertising accounts
        </p>
      </div>

      <ConnectionsView
        organizationId={org.id}
        accounts={accountsResult.accounts}
        canManageConnections={canManageConnections}
      />
    </div>
  );
}
