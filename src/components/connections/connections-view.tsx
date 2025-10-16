"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Facebook, Plug, Unplug, CheckCircle2, XCircle } from "lucide-react";
import { disconnectAdAccount } from "@/lib/actions/ad-accounts";

interface AdAccount {
  id: string;
  platform: string;
  platformAccountId: string;
  platformAccountName: string;
  isActive: boolean;
  lastSyncAt: Date | null;
  createdAt: Date;
}

interface ConnectionsViewProps {
  organizationId: string;
  accounts: AdAccount[];
  canManageConnections: boolean;
}

export function ConnectionsView({
  organizationId,
  accounts,
  canManageConnections,
}: ConnectionsViewProps) {
  const router = useRouter();
  const [disconnecting, setDisconnecting] = useState<string | null>(null);

  const metaAccounts = accounts.filter((acc) => acc.platform === "meta");
  const googleAccounts = accounts.filter((acc) => acc.platform === "google");

  const handleConnectMeta = () => {
    // Initiate Meta OAuth flow
    window.location.href = `/api/oauth/meta/authorize?org=${organizationId}`;
  };

  const handleConnectGoogle = () => {
    // Initiate Google OAuth flow
    window.location.href = `/api/oauth/google/authorize?org=${organizationId}`;
  };

  const handleDisconnect = async (accountId: string) => {
    setDisconnecting(accountId);

    const result = await disconnectAdAccount({
      accountId,
      organizationId,
    });

    if (result.success) {
      router.refresh();
    }

    setDisconnecting(null);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "meta":
        return <Facebook className="h-5 w-5" />;
      case "google":
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        );
      default:
        return <Plug className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return (
        <Badge variant="default" className="bg-emerald-500">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Active
        </Badge>
      );
    }
    return (
      <Badge variant="secondary">
        <XCircle className="mr-1 h-3 w-3" />
        Inactive
      </Badge>
    );
  };

  const formatLastSync = (date: Date | null) => {
    if (!date) return "Never";
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Meta Ads Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                <Facebook className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Meta Ads</CardTitle>
                <CardDescription>
                  Connect your Facebook and Instagram ad accounts
                </CardDescription>
              </div>
            </div>
            {canManageConnections && (
              <Button onClick={handleConnectMeta}>
                <Plug className="mr-2 h-4 w-4" />
                Connect account
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {metaAccounts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Facebook className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-1">No Meta Ads accounts connected</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your Meta Ads account to start monitoring changes
              </p>
              {canManageConnections && (
                <Button onClick={handleConnectMeta} size="sm">
                  <Plug className="mr-2 h-4 w-4" />
                  Connect Meta Ads
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {metaAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                      {getPlatformIcon(account.platform)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{account.platformAccountName}</p>
                        {getStatusBadge(account.isActive)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ID: {account.platformAccountId} • Last sync: {formatLastSync(account.lastSyncAt)}
                      </p>
                    </div>
                  </div>
                  {canManageConnections && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={disconnecting === account.id}
                        >
                          <Unplug className="mr-2 h-4 w-4" />
                          Disconnect
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Disconnect account?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will stop monitoring changes for {account.platformAccountName}. You can
                            reconnect it later.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDisconnect(account.id)}>
                            Disconnect
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Google Ads Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div>
                <CardTitle>Google Ads</CardTitle>
                <CardDescription>
                  Connect your Google Ads accounts for monitoring
                </CardDescription>
              </div>
            </div>
            {canManageConnections && (
              <Button onClick={handleConnectGoogle}>
                <Plug className="mr-2 h-4 w-4" />
                Connect account
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {googleAccounts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <svg className="h-6 w-6 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-1">No Google Ads accounts connected</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your Google Ads account to start monitoring changes
              </p>
              {canManageConnections && (
                <Button onClick={handleConnectGoogle} size="sm">
                  <Plug className="mr-2 h-4 w-4" />
                  Connect Google Ads
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {googleAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                      {getPlatformIcon(account.platform)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{account.platformAccountName}</p>
                        {getStatusBadge(account.isActive)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ID: {account.platformAccountId} • Last sync: {formatLastSync(account.lastSyncAt)}
                      </p>
                    </div>
                  </div>
                  {canManageConnections && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={disconnecting === account.id}
                        >
                          <Unplug className="mr-2 h-4 w-4" />
                          Disconnect
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Disconnect account?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will stop monitoring changes for {account.platformAccountName}. You can
                            reconnect it later.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDisconnect(account.id)}>
                            Disconnect
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {!canManageConnections && (
        <p className="text-sm text-muted-foreground">
          Only owners and admins can manage ad account connections
        </p>
      )}
    </div>
  );
}
