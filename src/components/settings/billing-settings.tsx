"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Zap,
  Check,
  X,
  ExternalLink,
  Loader2,
  Crown,
  TrendingUp,
} from "lucide-react";
import { createCheckoutSession, createPortalSession, cancelSubscription, reactivateSubscription } from "@/lib/actions/billing";
import { getPaidPlans, getPlan } from "@/lib/stripe/plans";
import type { PlanType } from "@/lib/stripe/plans";
import { getUsagePercentage } from "@/lib/usage/track";
import type { OrganizationUsage } from "@/lib/usage/track";
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

interface BillingSettingsProps {
  organizationId: string;
  orgSlug: string;
  canManageBilling: boolean;
  subscription: {
    id: string;
    plan: string;
    status: string;
    stripeCurrentPeriodEnd: Date | null;
    cancelAtPeriodEnd: boolean;
    maxAdAccounts: number;
    maxSeats: number;
    maxChangeEventsPerMonth: number;
    trialEndsAt: Date | null;
  } | null;
  usage: OrganizationUsage;
}

export function BillingSettings({
  organizationId,
  orgSlug,
  canManageBilling,
  subscription,
  usage,
}: BillingSettingsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

  const currentPlan = subscription ? getPlan(subscription.plan as PlanType) : getPlan("trial");
  const plans = getPaidPlans();

  const handleUpgrade = async (planId: PlanType) => {
    if (!canManageBilling) return;

    setIsLoading(true);

    try {
      const result = await createCheckoutSession({
        organizationId,
        planId,
        successUrl: `${window.location.origin}/${orgSlug}/settings/billing?success=true`,
        cancelUrl: `${window.location.origin}/${orgSlug}/settings/billing`,
      });

      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        alert("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageBilling = async () => {
    if (!canManageBilling) return;

    setIsLoading(true);

    try {
      const result = await createPortalSession({
        organizationId,
        returnUrl: `${window.location.origin}/${orgSlug}/settings/billing`,
      });

      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        alert("Failed to open billing portal");
      }
    } catch (error) {
      console.error("Error opening portal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setIsCanceling(true);

    try {
      const result = await cancelSubscription(organizationId);

      if (result.success) {
        router.refresh();
      } else {
        alert("Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
    } finally {
      setIsCanceling(false);
    }
  };

  const handleReactivate = async () => {
    setIsLoading(true);

    try {
      const result = await reactivateSubscription(organizationId);

      if (result.success) {
        router.refresh();
      } else {
        alert("Failed to reactivate subscription");
      }
    } catch (error) {
      console.error("Error reactivating subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (!subscription) return null;

    const statusColors: Record<string, string> = {
      active: "bg-emerald-500",
      trialing: "bg-blue-500",
      past_due: "bg-orange-500",
      canceled: "bg-gray-500",
    };

    return (
      <Badge className={statusColors[subscription.status] || "bg-gray-500"}>
        {subscription.status === "trialing" ? "Trial" : subscription.status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Manage your subscription and billing information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                {currentPlan.id === "agency" && <Crown className="h-5 w-5 text-yellow-500" />}
                {currentPlan.id === "pro" && <TrendingUp className="h-5 w-5 text-purple-500" />}
                {currentPlan.id === "starter" && <Zap className="h-5 w-5 text-blue-500" />}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">{currentPlan.name}</p>
                    {getStatusBadge()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {subscription?.plan === "trial" ? "Free trial with basic features" : currentPlan.description}
                  </p>
                </div>
              </div>

              {subscription?.trialEndsAt && subscription.status === "trialing" && (
                <p className="text-sm text-orange-600 mt-2">
                  Trial ends {new Date(subscription.trialEndsAt).toLocaleDateString()}
                </p>
              )}

              {subscription?.cancelAtPeriodEnd && subscription.stripeCurrentPeriodEnd && (
                <p className="text-sm text-orange-600 mt-2">
                  Subscription ends {new Date(subscription.stripeCurrentPeriodEnd).toLocaleDateString()}
                </p>
              )}
            </div>

            {canManageBilling && (
              <div className="flex gap-2">
                {subscription && subscription.plan !== "trial" && (
                  <Button
                    variant="outline"
                    onClick={handleManageBilling}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ExternalLink className="mr-2 h-4 w-4" />
                    )}
                    Manage Billing
                  </Button>
                )}

                {subscription?.cancelAtPeriodEnd && (
                  <Button onClick={handleReactivate} disabled={isLoading}>
                    Reactivate
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      {(!subscription || subscription.plan === "trial") && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Upgrade to unlock more features</h3>
            <p className="text-sm text-muted-foreground">
              Choose the plan that best fits your needs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={plan.recommended ? "border-primary shadow-lg" : ""}
              >
                {plan.recommended && (
                  <div className="bg-primary text-primary-foreground text-center text-sm font-medium py-1">
                    Recommended
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={isLoading || !canManageBilling}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>
            Track your account usage and limits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Ad accounts connected</p>
                <p className="text-sm text-muted-foreground">
                  {usage.adAccountsUsed} / {usage.adAccountsLimit}
                </p>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    usage.adAccountsUsed >= usage.adAccountsLimit
                      ? "bg-destructive"
                      : "bg-primary"
                  }`}
                  style={{
                    width: `${getUsagePercentage(usage.adAccountsUsed, usage.adAccountsLimit)}%`,
                  }}
                />
              </div>
              {usage.adAccountsUsed >= usage.adAccountsLimit && (
                <p className="text-xs text-destructive mt-1">
                  Limit reached. Upgrade to add more ad accounts.
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Change events this month</p>
                <p className="text-sm text-muted-foreground">
                  {usage.changeEventsUsed.toLocaleString()} /{" "}
                  {usage.changeEventsLimit.toLocaleString()}
                </p>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    usage.changeEventsUsed >= usage.changeEventsLimit
                      ? "bg-destructive"
                      : usage.changeEventsUsed >= usage.changeEventsLimit * 0.8
                      ? "bg-orange-500"
                      : "bg-primary"
                  }`}
                  style={{
                    width: `${getUsagePercentage(usage.changeEventsUsed, usage.changeEventsLimit)}%`,
                  }}
                />
              </div>
              {usage.changeEventsUsed >= usage.changeEventsLimit && (
                <p className="text-xs text-destructive mt-1">
                  Monthly limit reached. Upgrade for higher limits.
                </p>
              )}
              {usage.changeEventsUsed >= usage.changeEventsLimit * 0.8 &&
                usage.changeEventsUsed < usage.changeEventsLimit && (
                  <p className="text-xs text-orange-600 mt-1">
                    Approaching monthly limit. Consider upgrading.
                  </p>
                )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Team members</p>
                <p className="text-sm text-muted-foreground">
                  {usage.seatsUsed} / {usage.seatsLimit}
                </p>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    usage.seatsUsed >= usage.seatsLimit ? "bg-destructive" : "bg-primary"
                  }`}
                  style={{
                    width: `${getUsagePercentage(usage.seatsUsed, usage.seatsLimit)}%`,
                  }}
                />
              </div>
              {usage.seatsUsed >= usage.seatsLimit && (
                <p className="text-xs text-destructive mt-1">
                  Limit reached. Upgrade to invite more team members.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cancel Subscription */}
      {subscription && subscription.plan !== "trial" && !subscription.cancelAtPeriodEnd && canManageBilling && (
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions for your subscription
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Cancel subscription</p>
                <p className="text-sm text-muted-foreground">
                  Your subscription will remain active until the end of the billing period
                </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={isCanceling}>
                    {isCanceling ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <X className="mr-2 h-4 w-4" />
                    )}
                    Cancel Plan
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel subscription?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Your subscription will remain active until{" "}
                      {subscription.stripeCurrentPeriodEnd
                        ? new Date(subscription.stripeCurrentPeriodEnd).toLocaleDateString()
                        : "the end of the billing period"}
                      . After that, you&apos;ll be downgraded to the free trial plan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancelSubscription}>
                      Cancel Subscription
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      )}

      {!canManageBilling && (
        <p className="text-sm text-muted-foreground">
          Only organization owners can manage billing
        </p>
      )}
    </div>
  );
}
