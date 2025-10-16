"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Plus, MoreVertical, Edit, Trash2, AlertTriangle } from "lucide-react";
import { RuleBuilder } from "./rule-builder";
import { toggleRuleStatus, deleteNotificationRule } from "@/lib/actions/rules";

interface NotificationRule {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  priority: string;
  conditions: any;
  slackChannelId: string | null;
  slackChannelName: string | null;
  emailRecipients: string | null;
  webhookUrl: string | null;
  createdAt: Date;
}

interface RulesViewProps {
  organizationId: string;
  rules: NotificationRule[];
  canManageRules: boolean;
  userId: string;
  orgSlug: string;
}

export function RulesView({
  organizationId,
  rules,
  canManageRules,
  userId,
  orgSlug,
}: RulesViewProps) {
  const router = useRouter();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<NotificationRule | null>(null);

  const handleToggleRule = async (ruleId: string, isActive: boolean) => {
    await toggleRuleStatus({
      ruleId,
      organizationId,
      isActive: !isActive,
    });
    router.refresh();
  };

  const handleDeleteRule = async (ruleId: string) => {
    if (!confirm("Are you sure you want to delete this rule?")) {
      return;
    }

    await deleteNotificationRule({
      ruleId,
      organizationId,
    });
    router.refresh();
  };

  const handleEditRule = (rule: NotificationRule) => {
    setEditingRule(rule);
    setEditDialogOpen(true);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>;
      case "normal":
        return <Badge variant="secondary">Normal</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getChannelInfo = (rule: NotificationRule) => {
    const channels: string[] = [];
    if (rule.slackChannelName) channels.push(`#${rule.slackChannelName}`);
    if (rule.emailRecipients) {
      const emails = rule.emailRecipients.split(",").length;
      channels.push(`${emails} email${emails > 1 ? "s" : ""}`);
    }
    if (rule.webhookUrl) channels.push("Webhook");

    return channels.length > 0 ? channels.join(" • ") : "No channels configured";
  };

  const getConditionSummary = (conditions: any) => {
    const parts: string[] = [];

    if (conditions.platforms?.length > 0) {
      parts.push(`${conditions.platforms.length} platform${conditions.platforms.length > 1 ? "s" : ""}`);
    }
    if (conditions.changeTypes?.length > 0) {
      parts.push(`${conditions.changeTypes.length} change type${conditions.changeTypes.length > 1 ? "s" : ""}`);
    }
    if (conditions.severity?.length > 0) {
      parts.push(`${conditions.severity.join(", ")} severity`);
    }
    if (conditions.budgetChange) {
      parts.push(`budget ${conditions.budgetChange.operator.replace("_", " ")} $${conditions.budgetChange.value}`);
    }

    return parts.length > 0 ? parts.join(" • ") : "All changes";
  };

  if (rules.length === 0) {
    return (
      <Card>
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Bell className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No notification rules yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create rules to get notified about important changes to your ad accounts
            </p>
            {canManageRules && (
              <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create your first rule
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create Notification Rule</DialogTitle>
                    <DialogDescription>
                      Configure conditions and actions for this notification rule
                    </DialogDescription>
                  </DialogHeader>
                  <RuleBuilder
                    organizationId={organizationId}
                    userId={userId}
                    onSuccess={() => {
                      setCreateDialogOpen(false);
                      router.refresh();
                    }}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {canManageRules && (
        <div className="flex justify-end">
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create rule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Notification Rule</DialogTitle>
                <DialogDescription>
                  Configure conditions and actions for this notification rule
                </DialogDescription>
              </DialogHeader>
              <RuleBuilder
                organizationId={organizationId}
                userId={userId}
                onSuccess={() => {
                  setCreateDialogOpen(false);
                  router.refresh();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      )}

      <div className="grid gap-4">
        {rules.map((rule) => (
          <Card key={rule.id} className={!rule.isActive ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle>{rule.name}</CardTitle>
                    {getPriorityBadge(rule.priority)}
                    {!rule.isActive && (
                      <Badge variant="outline" className="text-muted-foreground">
                        Inactive
                      </Badge>
                    )}
                  </div>
                  {rule.description && (
                    <CardDescription>{rule.description}</CardDescription>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {canManageRules && (
                    <>
                      <Switch
                        checked={rule.isActive}
                        onCheckedChange={() => handleToggleRule(rule.id, rule.isActive)}
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditRule(rule)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit rule
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteRule(rule.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete rule
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Conditions</p>
                  <p className="text-sm text-muted-foreground">
                    {getConditionSummary(rule.conditions)}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Notify via</p>
                  <p className="text-sm text-muted-foreground">
                    {getChannelInfo(rule)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      {editingRule && (
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Notification Rule</DialogTitle>
              <DialogDescription>
                Update conditions and actions for this notification rule
              </DialogDescription>
            </DialogHeader>
            <RuleBuilder
              organizationId={organizationId}
              userId={userId}
              existingRule={editingRule}
              onSuccess={() => {
                setEditDialogOpen(false);
                setEditingRule(null);
                router.refresh();
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      {!canManageRules && (
        <p className="text-sm text-muted-foreground">
          Only owners and admins can manage notification rules
        </p>
      )}
    </div>
  );
}
