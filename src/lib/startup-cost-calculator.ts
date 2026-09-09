// Monetary calculations use integer cents. Percentage fees are estimated and
// rounded per order; actual provider billing can differ.
export const DEFAULT_STARTUP_INPUTS = {
  initialInventory: 1000,
  setup: 300,
  otherStartup: 200,
  reserveMonths: 3,
  subscription: 40,
  apps: 20,
  domainEmail: 5,
  otherMonthly: 35,
  marketing: 150,
  orders: 50,
  orderValue: 50,
  shippingCollected: 4,
  productCost: 20,
  fulfillment: 3,
  shippingCost: 5,
  paymentPercent: 3,
  paymentFixed: 0.3,
  platformPercent: 0,
  returnsAllowance: 2,
};

export type StartupCostInputs = typeof DEFAULT_STARTUP_INPUTS;
export type StartupField = keyof StartupCostInputs;
export type StartupErrors = Partial<Record<StartupField, string>>;
type FieldDefinition = {
  id: StartupField;
  label: string;
  kind: "money" | "percent" | "count" | "months";
  help?: string;
};

export const STARTUP_FIELD_GROUPS: { title: string; description: string; fields: FieldDefinition[] }[] = [
  {
    title: "Before you open",
    description: "Estimate upfront spending and choose a buffer for fixed monthly costs.",
    fields: [
      { id: "initialInventory", label: "Initial inventory purchase", kind: "money", help: "Cash paid for opening stock. Use 0 for a digital store without inventory." },
      { id: "setup", label: "Theme, design & setup", kind: "money" },
      { id: "otherStartup", label: "Other one-time startup costs", kind: "money", help: "For example: samples, equipment, photography, or registration." },
      { id: "reserveMonths", label: "Months of fixed-cost buffer", kind: "months", help: "An extra reserve; not an expense or a sales forecast." },
    ],
  },
  {
    title: "Your monthly commitments",
    description: "Use normal recurring prices after promotions, with annual costs divided by 12.",
    fields: [
      { id: "subscription", label: "Shopify subscription", kind: "money", help: "Enter your own regional quote. The example amount is not a Shopify plan price." },
      { id: "apps", label: "Paid apps", kind: "money" },
      { id: "domainEmail", label: "Domain & email allowance", kind: "money" },
      { id: "otherMonthly", label: "Other monthly overhead", kind: "money", help: "Include storage, tools, or a regular pay allowance if relevant." },
      { id: "marketing", label: "Monthly marketing budget", kind: "money", help: "Held constant in this model. Do not also include it in a per-order cost." },
    ],
  },
  {
    title: "What one order earns and costs",
    description: "Use a representative basket. Payment fees apply to product revenue plus customer-paid shipping.",
    fields: [
      { id: "orders", label: "Expected orders per month", kind: "count" },
      { id: "orderValue", label: "Average product revenue per order", kind: "money", help: "After discounts, before expected refunds. Exclude sales tax and shipping." },
      { id: "shippingCollected", label: "Shipping paid by the customer", kind: "money" },
      { id: "productCost", label: "Product cost per order", kind: "money", help: "Landed cost of the items sold. Opening inventory is not deducted again." },
      { id: "fulfillment", label: "Packaging & fulfillment per order", kind: "money", help: "Include packing labor or fulfillment fees where applicable." },
      { id: "shippingCost", label: "Shipping label per order", kind: "money" },
      { id: "paymentPercent", label: "Payment processing percentage", kind: "percent", help: "Use your blended provider rate; 3% is an illustrative input." },
      { id: "paymentFixed", label: "Payment processing fixed fee", kind: "money", help: "Assumes one payment per order." },
      { id: "platformPercent", label: "Additional platform transaction fee", kind: "percent", help: "Use an effective rate for affected orders, or 0 if no additional fee applies." },
      { id: "returnsAllowance", label: "Refunds & replacements per order", kind: "money", help: "Expected average lost revenue and extra costs, net of recoveries. Avoid counting costs already entered above." },
    ],
  },
];

export function validateStartupInputs(input: StartupCostInputs): StartupErrors {
  const errors: StartupErrors = {};
  for (const field of STARTUP_FIELD_GROUPS.flatMap(group => group.fields)) {
    const value = input[field.id];
    const max = field.kind === "percent" ? 100 : field.kind === "months" ? 24 : 1_000_000;
    if (!Number.isFinite(value)) errors[field.id] = "Enter a number.";
    else if (value < 0 || value > max) errors[field.id] = `Enter a number from 0 to ${max.toLocaleString("en-US")}.`;
    else if ((field.kind === "count" || field.kind === "months") && !Number.isInteger(value)) errors[field.id] = "Enter a whole number.";
    else if (Math.abs(value * 100 - Math.round(value * 100)) > 0.000001) errors[field.id] = "Use no more than two decimal places.";
  }
  return errors;
}

export function calculateStartupCosts(input: StartupCostInputs) {
  if (Object.keys(validateStartupInputs(input)).length) throw new RangeError("Invalid startup-cost inputs");
  const cents = (value: number) => Math.round(value * 100);
  const money = (value: number) => value / 100;
  const oneTime = cents(input.setup) + cents(input.otherStartup);
  const startup = cents(input.initialInventory) + oneTime;
  const fixed = cents(input.subscription) + cents(input.apps) + cents(input.domainEmail) + cents(input.otherMonthly) + cents(input.marketing);
  const receipts = cents(input.orderValue) + cents(input.shippingCollected);
  const processing = Math.round(receipts * cents(input.paymentPercent) / 10_000) + cents(input.paymentFixed);
  const platform = Math.round(receipts * cents(input.platformPercent) / 10_000);
  const variable = cents(input.productCost) + cents(input.fulfillment) + cents(input.shippingCost) + cents(input.returnsAllowance) + processing + platform;
  const contribution = receipts - variable;
  const reserve = fixed * input.reserveMonths;
  const breakEvenOrders = fixed === 0 ? 0 : contribution > 0 ? Math.ceil(fixed / contribution) : null;
  return {
    startupCash: money(startup),
    inventoryCash: input.initialInventory,
    oneTimeCosts: money(oneTime),
    fixedMonthly: money(fixed),
    reserve: money(reserve),
    launchBudget: money(startup + reserve),
    revenuePerOrder: money(receipts),
    processingPerOrder: money(processing),
    platformFeePerOrder: money(platform),
    variablePerOrder: money(variable),
    contributionPerOrder: money(contribution),
    contributionPercent: receipts > 0 ? contribution / receipts * 100 : null,
    monthlyRevenue: money(receipts * input.orders),
    monthlyVariable: money(variable * input.orders),
    monthlyCosts: money(fixed + variable * input.orders),
    monthlyResult: money(contribution * input.orders - fixed),
    breakEvenOrders,
    breakEvenRevenue: breakEvenOrders === null ? null : money(breakEvenOrders * receipts),
  };
}

export type StartupCostResult = ReturnType<typeof calculateStartupCosts>;

export function startupCostCsv(input: StartupCostInputs, currency: string): string {
  if (!/^[A-Z]{3}$/.test(currency)) throw new RangeError("Invalid currency code");
  const result = calculateStartupCosts(input);
  const rows: (string | number)[][] = [["Section", "Item", "Amount", "Unit"]];
  for (const group of STARTUP_FIELD_GROUPS) for (const field of group.fields) {
    rows.push([group.title, field.label, input[field.id], field.kind === "money" ? currency : field.kind === "percent" ? "%" : field.kind]);
  }
  const outputs: [string, number | null, string][] = [
    ["Upfront startup cash", result.startupCash, currency],
    ["Fixed monthly costs", result.fixedMonthly, currency],
    ["Fixed-cost buffer", result.reserve, currency],
    ["Startup cash plus buffer", result.launchBudget, currency],
    ["Contribution per order", result.contributionPerOrder, currency],
    ["Monthly revenue including shipping", result.monthlyRevenue, currency],
    ["Monthly variable costs", result.monthlyVariable, currency],
    ["Monthly total costs", result.monthlyCosts, currency],
    ["Monthly operating result", result.monthlyResult, currency],
    ["Monthly break-even orders", result.breakEvenOrders, "orders"],
    ["Monthly break-even revenue including shipping", result.breakEvenRevenue, currency],
  ];
  for (const [label, value, unit] of outputs) rows.push(["Results", label, value === null ? "Not reachable with these inputs" : value, unit]);
  rows.push(["Notes", "Illustrative planning model; not Shopify prices or a sales forecast. Currency labels do not convert amounts.", "", ""]);
  rows.push(["Notes", "Inventory is upfront cash; products sold are deducted per order. The buffer covers fixed monthly costs only. Annual prepayments, replenishment, and payout timing can require more cash.", "", ""]);
  rows.push(["Notes", "Excludes sales tax, duties, financing and income tax. Include owner pay and other costs in the inputs if needed. Fees are estimated per order on product revenue plus shipping.", "", ""]);
  return rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\r\n");
}
