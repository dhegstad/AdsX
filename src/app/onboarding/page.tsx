import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/config";
import { CreateOrgForm } from "@/components/auth/create-org-form";
import { getUserOrganizations } from "@/lib/actions/organization";

export const metadata = {
  title: "Welcome to AdsX",
};

export default async function OnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  // Check if user already has organizations
  const result = await getUserOrganizations(session.user.id);

  if (result.success && result.organizations.length > 0) {
    // User already has orgs, redirect to first one
    redirect(`/${result.organizations[0].slug}/overview`);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex items-center space-x-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <span className="font-mono text-lg font-bold">AX</span>
        </div>
        <span className="text-2xl font-semibold">AdsX</span>
      </div>

      <CreateOrgForm userId={session.user.id} />
    </div>
  );
}
