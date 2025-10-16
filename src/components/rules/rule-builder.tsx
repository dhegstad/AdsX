"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createNotificationRule, updateNotificationRule, type RuleConditions } from "@/lib/actions/rules";
import { listSlackChannels } from "@/lib/actions/slack";
import { Loader2, MessageSquare } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  priority: z.enum(["low", "normal", "high"]),

  // Conditions
  platforms: z.array(z.enum(["meta", "google"])).optional(),
  changeTypes: z.array(z.string()).optional(),
  resourceTypes: z.array(z.string()).optional(),
  severity: z.array(z.enum(["critical", "warning", "info"])).optional(),
  budgetChangeEnabled: z.boolean().default(false),
  budgetChangeOperator: z.enum(["greater_than", "less_than", "equals"]).optional(),
  budgetChangeValue: z.number().optional(),
  statusChanges: z.array(z.string()).optional(),

  // Notification channels
  slackChannelId: z.string().optional(),
  slackChannelName: z.string().optional(),
  emailRecipients: z.string().optional(),
  webhookUrl: z.string().url().optional().or(z.literal("")),

  // Advanced settings
  quietHoursStart: z.string().optional(),
  quietHoursEnd: z.string().optional(),
  quietHoursTimezone: z.string().optional(),
  digestMode: z.enum(["hourly", "daily", "none"]).default("none"),
  digestTime: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface RuleBuilderProps {
  organizationId: string;
  userId: string;
  existingRule?: {
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
  };
  onSuccess: () => void;
}

export function RuleBuilder({
  organizationId,
  userId,
  existingRule,
  onSuccess,
}: RuleBuilderProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slackChannels, setSlackChannels] = useState<Array<{ id: string; name: string; isPrivate: boolean }>>([]);
  const [loadingChannels, setLoadingChannels] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: existingRule?.name || "",
      description: existingRule?.description || "",
      isActive: existingRule?.isActive ?? true,
      priority: (existingRule?.priority as "low" | "normal" | "high") || "normal",

      platforms: existingRule?.conditions?.platforms || [],
      changeTypes: existingRule?.conditions?.changeTypes || [],
      resourceTypes: existingRule?.conditions?.resourceTypes || [],
      severity: existingRule?.conditions?.severity || [],
      budgetChangeEnabled: !!existingRule?.conditions?.budgetChange,
      budgetChangeOperator: existingRule?.conditions?.budgetChange?.operator || "greater_than",
      budgetChangeValue: existingRule?.conditions?.budgetChange?.value || 100,
      statusChanges: existingRule?.conditions?.statusChanges || [],

      slackChannelId: existingRule?.slackChannelId || "",
      slackChannelName: existingRule?.slackChannelName || "",
      emailRecipients: existingRule?.emailRecipients || "",
      webhookUrl: existingRule?.webhookUrl || "",

      quietHoursStart: "",
      quietHoursEnd: "",
      quietHoursTimezone: "UTC",
      digestMode: "none",
      digestTime: "",
    },
  });

  // Load Slack channels
  useEffect(() => {
    async function loadChannels() {
      try {
        const result = await listSlackChannels(organizationId);
        if (result.success) {
          setSlackChannels(result.channels);
        }
      } catch (error) {
        console.error("Failed to load Slack channels:", error);
      } finally {
        setLoadingChannels(false);
      }
    }

    loadChannels();
  }, [organizationId]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      const conditions: RuleConditions = {
        platforms: values.platforms,
        changeTypes: values.changeTypes,
        resourceTypes: values.resourceTypes,
        severity: values.severity,
        statusChanges: values.statusChanges,
      };

      if (values.budgetChangeEnabled && values.budgetChangeOperator && values.budgetChangeValue) {
        conditions.budgetChange = {
          operator: values.budgetChangeOperator,
          value: values.budgetChangeValue,
        };
      }

      const data = {
        name: values.name,
        description: values.description,
        isActive: values.isActive,
        priority: values.priority,
        conditions,
        slackChannelId: values.slackChannelId || undefined,
        slackChannelName: values.slackChannelName || undefined,
        emailRecipients: values.emailRecipients || undefined,
        webhookUrl: values.webhookUrl || undefined,
        quietHoursStart: values.quietHoursStart || undefined,
        quietHoursEnd: values.quietHoursEnd || undefined,
        quietHoursTimezone: values.quietHoursTimezone || undefined,
        digestMode: values.digestMode === "none" ? null : values.digestMode,
        digestTime: values.digestTime || undefined,
      };

      if (existingRule) {
        await updateNotificationRule({
          ruleId: existingRule.id,
          organizationId,
          ...data,
        });
      } else {
        await createNotificationRule({
          organizationId,
          createdBy: userId,
          ...data,
        });
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving rule:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const budgetChangeEnabled = form.watch("budgetChangeEnabled");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Basic Information</h3>
            <p className="text-sm text-muted-foreground">
              Configure the basic details of your notification rule
            </p>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rule Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., High Budget Changes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe what this rule monitors..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 mt-2">
                  <div className="space-y-0.5">
                    <FormLabel>Active</FormLabel>
                    <FormDescription>Enable this rule</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        {/* Conditions */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Conditions</h3>
            <p className="text-sm text-muted-foreground">
              Define which changes should trigger this rule
            </p>
          </div>

          <FormField
            control={form.control}
            name="platforms"
            render={() => (
              <FormItem>
                <FormLabel>Platforms</FormLabel>
                <FormDescription>
                  Select which platforms to monitor (leave empty for all)
                </FormDescription>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="platforms"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes("meta")}
                            onCheckedChange={(checked) => {
                              const current = field.value || [];
                              if (checked) {
                                field.onChange([...current, "meta"]);
                              } else {
                                field.onChange(current.filter((v) => v !== "meta"));
                              }
                            }}
                          />
                        </FormControl>
                        <Label className="font-normal">Meta Ads</Label>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="platforms"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes("google")}
                            onCheckedChange={(checked) => {
                              const current = field.value || [];
                              if (checked) {
                                field.onChange([...current, "google"]);
                              } else {
                                field.onChange(current.filter((v) => v !== "google"));
                              }
                            }}
                          />
                        </FormControl>
                        <Label className="font-normal">Google Ads</Label>
                      </FormItem>
                    )}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="changeTypes"
            render={() => (
              <FormItem>
                <FormLabel>Change Types</FormLabel>
                <FormDescription>
                  Select which types of changes to monitor (leave empty for all)
                </FormDescription>
                <div className="grid grid-cols-3 gap-4">
                  {["created", "updated", "deleted", "paused", "resumed"].map((type) => (
                    <FormField
                      key={type}
                      control={form.control}
                      name="changeTypes"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(type)}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                if (checked) {
                                  field.onChange([...current, type]);
                                } else {
                                  field.onChange(current.filter((v) => v !== type));
                                }
                              }}
                            />
                          </FormControl>
                          <Label className="font-normal capitalize">{type}</Label>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resourceTypes"
            render={() => (
              <FormItem>
                <FormLabel>Resource Types</FormLabel>
                <FormDescription>
                  Select which resources to monitor (leave empty for all)
                </FormDescription>
                <div className="flex gap-4">
                  {["campaign", "ad_set", "ad"].map((type) => (
                    <FormField
                      key={type}
                      control={form.control}
                      name="resourceTypes"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(type)}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                if (checked) {
                                  field.onChange([...current, type]);
                                } else {
                                  field.onChange(current.filter((v) => v !== type));
                                }
                              }}
                            />
                          </FormControl>
                          <Label className="font-normal capitalize">
                            {type.replace("_", " ")}
                          </Label>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="severity"
            render={() => (
              <FormItem>
                <FormLabel>Severity</FormLabel>
                <FormDescription>
                  Select severity levels to monitor (leave empty for all)
                </FormDescription>
                <div className="flex gap-4">
                  {["critical", "warning", "info"].map((level) => (
                    <FormField
                      key={level}
                      control={form.control}
                      name="severity"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(level as "critical" | "warning" | "info")}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                if (checked) {
                                  field.onChange([...current, level]);
                                } else {
                                  field.onChange(current.filter((v) => v !== level));
                                }
                              }}
                            />
                          </FormControl>
                          <Label className="font-normal capitalize">{level}</Label>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4 rounded-lg border p-4">
            <FormField
              control={form.control}
              name="budgetChangeEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel>Budget Change Filter</FormLabel>
                    <FormDescription>
                      Only notify when budget changes meet specific criteria
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {budgetChangeEnabled && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="budgetChangeOperator"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Operator</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="greater_than">Greater than</SelectItem>
                          <SelectItem value="less_than">Less than</SelectItem>
                          <SelectItem value="equals">Equals</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budgetChangeValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="100"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Notification Channels */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Notification Channels</h3>
            <p className="text-sm text-muted-foreground">
              Configure where to send notifications (at least one required)
            </p>
          </div>

          <FormField
            control={form.control}
            name="slackChannelId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slack Channel</FormLabel>
                <Select
                  onValueChange={(value) => {
                    if (value) {
                      const channel = slackChannels.find(ch => ch.id === value);
                      if (channel) {
                        form.setValue("slackChannelId", channel.id);
                        form.setValue("slackChannelName", channel.name);
                      }
                    } else {
                      form.setValue("slackChannelId", "");
                      form.setValue("slackChannelName", "");
                    }
                  }}
                  defaultValue={field.value}
                  disabled={loadingChannels || slackChannels.length === 0}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={
                        loadingChannels
                          ? "Loading channels..."
                          : slackChannels.length === 0
                          ? "No Slack workspace connected"
                          : "Select a channel"
                      } />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {slackChannels.map((channel) => (
                      <SelectItem key={channel.id} value={channel.id}>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>#{channel.name}</span>
                          {channel.isPrivate && (
                            <span className="text-xs text-muted-foreground">(private)</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {slackChannels.length === 0 && !loadingChannels ? (
                    <span>
                      Connect Slack in{" "}
                      <a href={`/${organizationId}/settings/integrations`} className="underline">
                        Settings → Integrations
                      </a>
                    </span>
                  ) : (
                    "Choose where to send notifications"
                  )}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emailRecipients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Recipients</FormLabel>
                <FormControl>
                  <Input
                    placeholder="team@example.com, admin@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Comma-separated list of email addresses
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="webhookUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Webhook URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com/webhook"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  HTTP endpoint to receive notifications
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {existingRule ? "Update Rule" : "Create Rule"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
