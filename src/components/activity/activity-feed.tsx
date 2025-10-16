"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Activity as ActivityIcon,
  Facebook,
  ArrowUpCircle,
  ArrowDownCircle,
  Edit,
  Pause,
  Play,
  Trash2,
  Plus,
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

interface ActivityFeedProps {
  organizationId: string;
  events: ChangeEvent[];
  initialFilters?: {
    platform?: "meta" | "google";
    changeType?: string;
  };
}

export function ActivityFeed({
  organizationId,
  events,
  initialFilters,
}: ActivityFeedProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };

  const filteredEvents = events.filter((event) =>
    event.entityName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      case "budget_increased":
        return <ArrowUpCircle className="h-4 w-4 text-emerald-500" />;
      case "budget_decreased":
        return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
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

  const getPlatformIcon = (platform: string) => {
    if (platform === "meta") {
      return <Facebook className="h-4 w-4" />;
    }
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    );
  };

  const formatChangeSummary = (event: ChangeEvent) => {
    if (!event.diff) {
      return `${getChangeTypeLabel(event.changeType)} ${event.entityType}`;
    }

    const changes = Object.keys(event.diff);
    if (changes.length === 0) {
      return `${getChangeTypeLabel(event.changeType)} ${event.entityType}`;
    }

    // Format specific change types
    if (changes.includes("budget")) {
      const { old, new: newVal } = event.diff.budget;
      return `Budget changed from $${old} to $${newVal}`;
    }

    if (changes.includes("status")) {
      const { old, new: newVal } = event.diff.status;
      return `Status changed from ${old} to ${newVal}`;
    }

    if (changes.includes("name")) {
      const { old, new: newVal } = event.diff.name;
      return `Renamed from "${old}" to "${newVal}"`;
    }

    // Generic format for other changes
    return `Updated ${changes.length} ${changes.length === 1 ? "field" : "fields"}`;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Select
              defaultValue={initialFilters?.platform || "all"}
              onValueChange={(value) => handleFilterChange("platform", value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All platforms</SelectItem>
                <SelectItem value="meta">Meta Ads</SelectItem>
                <SelectItem value="google">Google Ads</SelectItem>
              </SelectContent>
            </Select>

            <Select
              defaultValue={initialFilters?.changeType || "all"}
              onValueChange={(value) => handleFilterChange("changeType", value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Change type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All changes</SelectItem>
                <SelectItem value="created">Created</SelectItem>
                <SelectItem value="updated">Updated</SelectItem>
                <SelectItem value="deleted">Deleted</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="resumed">Resumed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Activity Feed */}
      {filteredEvents.length === 0 ? (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <ActivityIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No activity yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Changes to your ad accounts will appear here in real-time
            </p>
            <Button variant="outline" onClick={() => router.push("connections")}>
              Connect ad accounts
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-2">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="p-4 hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => router.push(`activity/${event.id}`)}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  {getChangeIcon(event.changeType)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{event.entityName}</p>
                    <Badge variant="outline" className="text-xs">
                      {event.entityType}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {formatChangeSummary(event)}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      {getPlatformIcon(event.platform)}
                      <span>{event.accountName}</span>
                    </div>
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(new Date(event.detectedAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
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
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
