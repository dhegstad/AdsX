"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrganization } from "@/lib/actions/organization";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { trackOrganizationCreated } from "@/lib/analytics/events";

interface CreateOrgFormProps {
  userId: string;
}

export function CreateOrgForm({ userId }: CreateOrgFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await createOrganization({
        name,
        userId,
      });

      if (!result.success || !result.organization) {
        setError(result.error || "Failed to create organization");
        setLoading(false);
        return;
      }

      // Track organization creation
      trackOrganizationCreated(
        result.organization.id,
        result.organization.name
      );

      // Redirect to the new organization
      router.push(`/${result.organization.slug}/overview`);
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create your organization</CardTitle>
        <CardDescription>
          This is where you&apos;ll manage your ad accounts and team
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Organization name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Acme Inc"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              You can always change this later
            </p>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={loading || !name.trim()}
          >
            {loading ? "Creating..." : "Create organization"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
