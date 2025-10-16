import { redirect } from "next/navigation";

export default async function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;

  // Default redirect to general settings
  // This ensures /settings redirects to /settings/general
  if (!children) {
    redirect(`/${orgSlug}/settings/general`);
  }

  return <>{children}</>;
}
