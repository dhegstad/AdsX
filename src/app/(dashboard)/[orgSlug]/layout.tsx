import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { OrgSwitcher } from "@/components/layout/org-switcher";
import { UserMenu } from "@/components/layout/user-menu";
import { auth } from "@/lib/auth/config";
import { getUserOrganizations } from "@/lib/actions/organization";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;

  // Check authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  // Get user's organizations
  const result = await getUserOrganizations(session.user.id);

  if (!result.success || result.organizations.length === 0) {
    // User has no organizations, send to onboarding
    redirect("/onboarding");
  }

  // Find the current organization
  const currentOrg = result.organizations.find((org) => org.slug === orgSlug);

  if (!currentOrg) {
    // Invalid org slug, redirect to first org
    redirect(`/${result.organizations[0].slug}/overview`);
  }

  const user = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AppSidebar orgSlug={orgSlug} />

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b px-6">
          <div className="w-64">
            <OrgSwitcher
              organizations={result.organizations}
              currentOrg={currentOrg}
              userId={session.user.id}
            />
          </div>
          <UserMenu user={user} orgSlug={orgSlug} />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-muted/10 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
