import { trackEvent, identifyUser } from "./posthog";

/**
 * Analytics events for tracking user actions
 */

// Organization events
export function trackOrganizationCreated(orgId: string, orgName: string) {
  trackEvent("organization_created", {
    organization_id: orgId,
    organization_name: orgName,
  });
}

export function trackOrganizationUpdated(orgId: string) {
  trackEvent("organization_updated", {
    organization_id: orgId,
  });
}

export function trackOrganizationDeleted(orgId: string) {
  trackEvent("organization_deleted", {
    organization_id: orgId,
  });
}

// Ad account events
export function trackAdAccountConnected(
  provider: "meta" | "google",
  accountId: string,
  accountName: string
) {
  trackEvent("ad_account_connected", {
    provider,
    account_id: accountId,
    account_name: accountName,
  });
}

export function trackAdAccountDisconnected(
  provider: "meta" | "google",
  accountId: string
) {
  trackEvent("ad_account_disconnected", {
    provider,
    account_id: accountId,
  });
}

// Notification rule events
export function trackNotificationRuleCreated(
  ruleId: string,
  changeType: string,
  notificationChannel: string
) {
  trackEvent("notification_rule_created", {
    rule_id: ruleId,
    change_type: changeType,
    notification_channel: notificationChannel,
  });
}

export function trackNotificationRuleUpdated(ruleId: string) {
  trackEvent("notification_rule_updated", {
    rule_id: ruleId,
  });
}

export function trackNotificationRuleDeleted(ruleId: string) {
  trackEvent("notification_rule_deleted", {
    rule_id: ruleId,
  });
}

// Integration events
export function trackSlackConnected(workspaceName: string) {
  trackEvent("slack_connected", {
    workspace_name: workspaceName,
  });
}

export function trackSlackDisconnected() {
  trackEvent("slack_disconnected");
}

// Subscription events
export function trackSubscriptionUpgraded(plan: string) {
  trackEvent("subscription_upgraded", {
    plan,
  });
}

export function trackSubscriptionDowngraded(plan: string) {
  trackEvent("subscription_downgraded", {
    plan,
  });
}

export function trackSubscriptionCanceled() {
  trackEvent("subscription_canceled");
}

// User events
export function trackUserSignedUp(userId: string, email: string) {
  identifyUser(userId, {
    email,
  });
  trackEvent("user_signed_up");
}

export function trackUserSignedIn(userId: string) {
  identifyUser(userId);
  trackEvent("user_signed_in");
}

// Activity feed events
export function trackChangeEventViewed(eventId: string, changeType: string) {
  trackEvent("change_event_viewed", {
    event_id: eventId,
    change_type: changeType,
  });
}

export function trackActivityFilterApplied(filters: Record<string, any>) {
  trackEvent("activity_filter_applied", filters);
}

// Team events
export function trackTeamMemberInvited(role: string) {
  trackEvent("team_member_invited", {
    role,
  });
}

export function trackTeamMemberRemoved() {
  trackEvent("team_member_removed");
}
