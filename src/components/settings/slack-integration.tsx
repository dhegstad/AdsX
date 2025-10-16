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
import { MessageSquare, CheckCircle2, XCircle, Unplug } from "lucide-react";
import { disconnectSlack, testSlackIntegration } from "@/lib/actions/slack";

interface SlackIntegrationProps {
  organizationId: string;
  orgSlug: string;
  integration: {
    id: string;
    teamId: string;
    teamName: string;
    defaultChannelId: string | null;
    defaultChannelName: string | null;
    isActive: boolean;
    createdAt: Date;
  } | null;
}

export function SlackIntegration({
  organizationId,
  orgSlug,
  integration,
}: SlackIntegrationProps) {
  const router = useRouter();
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleConnect = () => {
    window.location.href = `/api/oauth/slack/authorize?org=${organizationId}`;
  };

  const handleDisconnect = async () => {
    if (!integration) return;

    setIsDisconnecting(true);

    const result = await disconnectSlack({
      integrationId: integration.id,
      organizationId,
    });

    if (result.success) {
      router.refresh();
    }

    setIsDisconnecting(false);
  };

  const handleTest = async () => {
    if (!integration || !integration.defaultChannelId || !integration.defaultChannelName) {
      alert("Please configure a default channel in a notification rule first");
      return;
    }

    setIsTesting(true);

    const result = await testSlackIntegration({
      organizationId,
      channelId: integration.defaultChannelId,
      channelName: integration.defaultChannelName,
    });

    if (result.success) {
      alert("Test message sent! Check your Slack channel.");
    } else {
      alert(`Failed to send test message: ${result.error}`);
    }

    setIsTesting(false);
  };

  if (!integration) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Slack Integration</CardTitle>
                <CardDescription>
                  Connect your Slack workspace to receive notifications
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No Slack workspace connected</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your Slack workspace to receive real-time notifications about ad account changes
            </p>
            <Button onClick={handleConnect}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Connect Slack
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Slack Integration</CardTitle>
              <CardDescription>
                Receive notifications in your Slack workspace
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-medium">{integration.teamName}</p>
                {integration.isActive ? (
                  <Badge variant="default" className="bg-emerald-500">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    <XCircle className="mr-1 h-3 w-3" />
                    Inactive
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Team ID: {integration.teamId}
                {integration.defaultChannelName && (
                  <>
                    {" "}• Default channel: #{integration.defaultChannelName}
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTest}
              disabled={isTesting || !integration.defaultChannelId}
            >
              {isTesting ? "Sending..." : "Test Connection"}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" disabled={isDisconnecting}>
                  <Unplug className="mr-2 h-4 w-4" />
                  Disconnect
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Disconnect Slack?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will stop sending notifications to your Slack workspace. Any
                    notification rules using Slack will need to be updated or will stop working.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDisconnect}>
                    Disconnect
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-lg bg-muted">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Tip:</strong> Configure Slack channels in your notification rules to
            control where alerts are sent.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
