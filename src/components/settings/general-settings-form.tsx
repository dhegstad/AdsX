"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrganization } from "@/lib/actions/organization";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@/lib/auth/client";

interface GeneralSettingsFormProps {
  organization: {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
  };
  canEdit: boolean;
  userRole: string;
}

export function GeneralSettingsForm({
  organization,
  canEdit,
  userRole,
}: GeneralSettingsFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState(organization.name);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      setError("You must be signed in");
      return;
    }

    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const result = await updateOrganization({
        organizationId: organization.id,
        name,
        userId: session.user.id,
      });

      if (!result.success) {
        setError(result.error || "Failed to update organization");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);

      // Refresh the page after a short delay
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  const hasChanges = name !== organization.name;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Organization name</CardTitle>
          <CardDescription>
            Update your organization&apos;s display name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-md bg-emerald-500/10 p-3 text-sm text-emerald-600">
                Organization updated successfully!
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!canEdit || loading}
                required
              />
            </div>

            {canEdit && (
              <Button
                type="submit"
                disabled={loading || !hasChanges}
              >
                {loading ? "Saving..." : "Save changes"}
              </Button>
            )}

            {!canEdit && (
              <p className="text-sm text-muted-foreground">
                Only owners and admins can edit organization settings
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Organization details</CardTitle>
          <CardDescription>
            Read-only information about your organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label className="text-muted-foreground">Organization ID</Label>
            <p className="font-mono text-sm">{organization.id}</p>
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">Slug</Label>
            <p className="font-mono text-sm">{organization.slug}</p>
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">Your role</Label>
            <p className="text-sm capitalize">{userRole}</p>
          </div>

          <div className="space-y-1">
            <Label className="text-muted-foreground">Created</Label>
            <p className="text-sm">
              {new Date(organization.createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
