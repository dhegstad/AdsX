"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Facebook,
  Calendar,
  Tag,
  Hash,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { trackChangeEventViewed } from "@/lib/analytics/events";

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

interface ChangeEventDetailProps {
  event: ChangeEvent;
  orgSlug: string;
}

export function ChangeEventDetail({ event, orgSlug }: ChangeEventDetailProps) {
  const router = useRouter();

  useEffect(() => {
    // Track event view
    trackChangeEventViewed(event.id, event.changeType);
  }, [event.id, event.changeType]);

  const getPlatformIcon = (platform: string) => {
    if (platform === "meta") {
      return <Facebook className="h-5 w-5" />;
    }
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    );
  };

  const getChangeTypeLabel = (changeType: string) => {
    return changeType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  };

  const formatFieldName = (field: string): string => {
    return field
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/${orgSlug}/activity`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to activity
        </Button>
      </div>

      {/* Event Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{event.entityName}</CardTitle>
              <CardDescription className="mt-2">
                {getChangeTypeLabel(event.changeType)} on{" "}
                {format(new Date(event.detectedAt), "PPpp")} (
                {formatDistanceToNow(new Date(event.detectedAt), { addSuffix: true })})
              </CardDescription>
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  event.platform === "meta"
                    ? "bg-blue-500/10 text-blue-500"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {getPlatformIcon(event.platform)}
              </div>
              <div>
                <p className="text-sm font-medium">Platform</p>
                <p className="text-sm text-muted-foreground">
                  {event.platform === "meta" ? "Meta Ads" : "Google Ads"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Tag className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Entity Type</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {event.entityType}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Hash className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Entity ID</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {event.entityId}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Changes Detail */}
      {event.diff && Object.keys(event.diff).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Changes</CardTitle>
            <CardDescription>
              Detailed view of what changed in this event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(event.diff).map(([field, values]: [string, any]) => (
                <div key={field}>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">{formatFieldName(field)}</Badge>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/20">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowDownCircle className="h-4 w-4 text-red-500" />
                        <p className="text-sm font-medium text-red-700 dark:text-red-400">
                          Old Value
                        </p>
                      </div>
                      <pre className="text-sm text-red-900 dark:text-red-300 whitespace-pre-wrap break-all">
                        {formatValue(values.old)}
                      </pre>
                    </div>

                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/20">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowUpCircle className="h-4 w-4 text-emerald-500" />
                        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                          New Value
                        </p>
                      </div>
                      <pre className="text-sm text-emerald-900 dark:text-emerald-300 whitespace-pre-wrap break-all">
                        {formatValue(values.new)}
                      </pre>
                    </div>
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ad Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Ad Account</CardTitle>
          <CardDescription>
            The ad account where this change was detected
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                event.platform === "meta"
                  ? "bg-blue-500/10 text-blue-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {getPlatformIcon(event.platform)}
            </div>
            <div>
              <p className="font-medium">{event.accountName}</p>
              <p className="text-sm text-muted-foreground">
                {event.platform === "meta" ? "Meta Ads" : "Google Ads"} Account
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
