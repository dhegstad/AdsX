import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/config";
import { db } from "@/lib/db/client";
import { organization, member } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSlackIntegration } from "@/lib/actions/slack";
import { SlackIntegration } from "@/components/settings/slack-integration";
import { SettingsNav } from "@/components/settings/settings-nav";

export const metadata = {
  title: "Integrations - Settings",
  description: "Manage your third-party integrations",
};

export default async function IntegrationsSettingsPage({
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

  // Get Slack integration
  const slackResult = await getSlackIntegration(org.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your organization settings and preferences
        </p>
      </div>

      <SettingsNav orgSlug={orgSlug} />

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Integrations</h3>
          <p className="text-sm text-muted-foreground">
            Connect third-party services to enhance your workflow
          </p>
        </div>

        <SlackIntegration
          organizationId={org.id}
          orgSlug={orgSlug}
          integration={slackResult.integration}
        />
      </div>
    </div>
  );
}
