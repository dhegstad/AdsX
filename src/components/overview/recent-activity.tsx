"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Activity as ActivityIcon,
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  Pause,
  Play,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ChangeEvent {
  id: string;
  adAccountId: string;
  changeType: string;
  entityType: string;
  entityId: string;
  entityName: string;
  oldValue: Record<string, any> | null;
  newValue: Record<string, any> | null;
  diff: Record<string, any> | null;
  detectedAt: Date;
  createdAt: Date;
  accountName: string;
  platform: string;
}

interface RecentActivityProps {
  events: ChangeEvent[];
  orgSlug: string;
}

export function RecentActivity({ events, orgSlug }: RecentActivityProps) {
  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case "created":
        return <Plus className="h-4 w-4 text-emerald-500" />;
      case "updated":
        return <Edit className="h-4 w-4 text-blue-500" />;
      case "deleted":
        return <Trash2 className="h-4 w-4 text-red-500" />;
      case "paused":
        return <Pause className="h-4 w-4 text-orange-500" />;
      case "resumed":
        return <Play className="h-4 w-4 text-emerald-500" />;
      default:
        return <ActivityIcon className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getChangeTypeLabel = (changeType: string) => {
    return changeType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest changes across your ad accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <ActivityIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No activity yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your ad accounts to start monitoring changes
            </p>
            <Button asChild>
              <Link href={`/${orgSlug}/connections`}>Connect accounts</Link>
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
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest changes across your ad accounts</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/${orgSlug}/activity`}>
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.slice(0, 5).map((event) => (
            <Link
              key={event.id}
              href={`/${orgSlug}/activity/${event.id}`}
              className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                {getChangeIcon(event.changeType)}
              </div>

              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{event.entityName}</p>
                  <Badge variant="outline" className="text-xs">
                    {event.entityType}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {event.accountName} •{" "}
                  {formatDistanceToNow(new Date(event.detectedAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>

              <Badge
                variant={
                  event.changeType === "created"
                    ? "default"
                    : event.changeType === "deleted"
                    ? "destructive"
                    : "secondary"
                }
              >
                {getChangeTypeLabel(event.changeType)}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
