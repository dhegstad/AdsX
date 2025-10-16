import type { RuleConditions } from "@/lib/actions/rules";

/**
 * Evaluates if a change event matches the given rule conditions
 *
 * @param conditions - The rule conditions to check against
 * @param changeEvent - The change event to evaluate
 * @returns true if the event matches all conditions, false otherwise
 */
export function evaluateRule(
  conditions: RuleConditions,
  changeEvent: {
    platform: string;
    adAccountId: string;
    changeType: string;
    resourceType: string;
    severity: string;
    beforeValue: any;
    afterValue: any;
  }
): boolean {
  // Check platform filter
  if (
    conditions.platforms &&
    conditions.platforms.length > 0 &&
    !conditions.platforms.includes(changeEvent.platform as "meta" | "google")
  ) {
    return false;
  }

  // Check ad account filter
  if (
    conditions.adAccountIds &&
    conditions.adAccountIds.length > 0 &&
    !conditions.adAccountIds.includes(changeEvent.adAccountId)
  ) {
    return false;
  }

  // Check change type filter
  if (
    conditions.changeTypes &&
    conditions.changeTypes.length > 0 &&
    !conditions.changeTypes.includes(changeEvent.changeType)
  ) {
    return false;
  }

  // Check resource type filter
  if (
    conditions.resourceTypes &&
    conditions.resourceTypes.length > 0 &&
    !conditions.resourceTypes.includes(changeEvent.resourceType)
  ) {
    return false;
  }

  // Check severity filter
  if (
    conditions.severity &&
    conditions.severity.length > 0 &&
    !conditions.severity.includes(changeEvent.severity as "critical" | "warning" | "info")
  ) {
    return false;
  }

  // Check budget change condition
  if (conditions.budgetChange) {
    const beforeBudget = changeEvent.beforeValue?.budget;
    const afterBudget = changeEvent.afterValue?.budget;

    if (typeof beforeBudget === "number" && typeof afterBudget === "number") {
      const change = Math.abs(afterBudget - beforeBudget);

      switch (conditions.budgetChange.operator) {
        case "greater_than":
          if (change <= conditions.budgetChange.value) return false;
          break;
        case "less_than":
          if (change >= conditions.budgetChange.value) return false;
          break;
        case "equals":
          if (change !== conditions.budgetChange.value) return false;
          break;
      }
    } else {
      // If no budget data, condition doesn't match
      return false;
    }
  }

  // Check status changes
  if (conditions.statusChanges && conditions.statusChanges.length > 0) {
    const statusChange = changeEvent.afterValue?.status;
    if (!statusChange || !conditions.statusChanges.includes(statusChange)) {
      return false;
    }
  }

  // All conditions passed
  return true;
}
