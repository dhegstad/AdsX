"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle, Trash2 } from "lucide-react";
import { deleteOrganization } from "@/lib/actions/organization";

interface SecuritySettingsProps {
  organizationId: string;
  organizationName: string;
  userId: string;
  isOwner: boolean;
}

export function SecuritySettings({
  organizationId,
  organizationName,
  userId,
  isOwner,
}: SecuritySettingsProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const handleDeleteOrganization = async () => {
    if (confirmText !== organizationName) {
      setDeleteError("Organization name does not match");
      return;
    }

    setDeleteError("");
    setDeleteLoading(true);

    try {
      const result = await deleteOrganization({
        organizationId,
        userId,
      });

      if (!result.success) {
        setDeleteError(result.error || "Failed to delete organization");
        setDeleteLoading(false);
        return;
      }

      // Redirect to onboarding after deletion
      router.push("/onboarding");
      router.refresh();
    } catch (err) {
      setDeleteError("An unexpected error occurred");
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security settings</CardTitle>
          <CardDescription>
            Manage security-related settings for your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Two-factor authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline" disabled>
                Coming soon
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">API keys</p>
                <p className="text-sm text-muted-foreground">
                  Manage API keys for programmatic access
                </p>
              </div>
              <Button variant="outline" disabled>
                Coming soon
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Danger zone</CardTitle>
          </div>
          <CardDescription>
            Irreversible actions that affect your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isOwner ? (
            <div className="space-y-4">
              <div className="rounded-md border border-destructive/50 p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Delete organization</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete this organization and all of its data.
                      This action cannot be undone.
                    </p>
                  </div>
                  <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete organization</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete the{" "}
                          <span className="font-semibold">{organizationName}</span>{" "}
                          organization and remove all associated data.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        {deleteError && (
                          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                            {deleteError}
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="confirm">
                            Type <span className="font-semibold">{organizationName}</span>{" "}
                            to confirm
                          </Label>
                          <Input
                            id="confirm"
                            value={confirmText}
                            onChange={(e) => {
                              setConfirmText(e.target.value);
                              setDeleteError("");
                            }}
                            disabled={deleteLoading}
                            placeholder={organizationName}
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setDeleteDialogOpen(false);
                            setConfirmText("");
                            setDeleteError("");
                          }}
                          disabled={deleteLoading}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteOrganization}
                          disabled={deleteLoading || confirmText !== organizationName}
                        >
                          {deleteLoading ? "Deleting..." : "Delete organization"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Only the organization owner can delete the organization
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
