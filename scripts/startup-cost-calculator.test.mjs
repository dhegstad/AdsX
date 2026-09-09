import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateStartupCosts, DEFAULT_STARTUP_INPUTS, validateStartupInputs, startupCostCsv } from '../src/lib/startup-cost-calculator.ts';

const example = { ...DEFAULT_STARTUP_INPUTS };
const zero = Object.fromEntries(Object.keys(example).map(key => [key, 0]));

test('the published example reconciles cash, monthly costs and whole-order break-even', () => {
  const r = calculateStartupCosts(example);
  assert.equal(r.startupCash, 1500);
  assert.equal(r.fixedMonthly, 250);
  assert.equal(r.reserve, 750);
  assert.equal(r.launchBudget, 2250);
  assert.equal(r.processingPerOrder, 1.92);
  assert.equal(r.variablePerOrder, 31.92);
  assert.equal(r.contributionPerOrder, 22.08);
  assert.equal(r.monthlyRevenue, 2700);
  assert.equal(r.monthlyCosts, 1846);
  assert.equal(r.monthlyResult, 854);
  assert.equal(r.breakEvenOrders, 12);
  assert.equal(r.breakEvenRevenue, 648);
  assert.ok(calculateStartupCosts({ ...example, orders: 11 }).monthlyResult < 0);
  assert.ok(calculateStartupCosts({ ...example, orders: 12 }).monthlyResult >= 0);
});

test('opening inventory changes cash without double-counting products in monthly costs', () => {
  const base = calculateStartupCosts(example);
  const r = calculateStartupCosts({ ...example, initialInventory: 3000 });
  assert.equal(r.launchBudget - base.launchBudget, 2000);
  assert.equal(r.monthlyCosts, base.monthlyCosts);
  assert.equal(r.monthlyResult, base.monthlyResult);
});

test('startup spending and the buffer are not monthly operating expenses', () => {
  const base = calculateStartupCosts(example);
  const r = calculateStartupCosts({ ...example, setup: 600, reserveMonths: 6 });
  assert.equal(r.launchBudget - base.launchBudget, 1050);
  assert.equal(r.monthlyResult, base.monthlyResult);
  assert.equal(r.breakEvenOrders, base.breakEvenOrders);
});

test('fees include shipping receipts and separate additional platform fees', () => {
  const r = calculateStartupCosts({ ...example, platformPercent: 2 });
  assert.equal(r.processingPerOrder, 1.92);
  assert.equal(r.platformFeePerOrder, 1.08);
  assert.equal(r.contributionPerOrder, 21);
  assert.equal(r.monthlyResult, 800);
});

test('digital products can have no stock, shipping or physical fulfillment', () => {
  const r = calculateStartupCosts({ ...example, initialInventory: 0, productCost: 0, shippingCollected: 0, shippingCost: 0, fulfillment: 0, returnsAllowance: 0 });
  assert.equal(r.startupCash, 500);
  assert.equal(r.contributionPerOrder, 48.2);
  assert.equal(r.monthlyResult, 2160);
  assert.equal(r.breakEvenOrders, 6);
});

test('zero orders still incur fixed costs, without per-order expenses', () => {
  const r = calculateStartupCosts({ ...example, orders: 0 });
  assert.equal(r.monthlyRevenue, 0);
  assert.equal(r.monthlyVariable, 0);
  assert.equal(r.monthlyCosts, 250);
  assert.equal(r.monthlyResult, -250);
});

test('zero or negative contribution cannot cover positive fixed costs', () => {
  for (const orderValue of [0, 5]) {
    const r = calculateStartupCosts({ ...example, orderValue });
    assert.equal(r.breakEvenOrders, null);
    assert.equal(r.breakEvenRevenue, null);
    assert.ok(r.monthlyResult < 0);
  }
  assert.equal(calculateStartupCosts({ ...zero, orderValue: 20, productCost: 20, subscription: 40 }).breakEvenOrders, null);
});

test('zero costs and zero sales produce finite zero results', () => {
  const r = calculateStartupCosts(zero);
  assert.equal(r.launchBudget, 0);
  assert.equal(r.monthlyResult, 0);
  assert.equal(r.breakEvenOrders, 0);
  assert.equal(r.contributionPercent, null);
  for (const value of Object.values(r)) assert.ok(value === null || Number.isFinite(value));
  assert.equal(calculateStartupCosts({ ...zero, productCost: 1 }).breakEvenOrders, 0);
});

test('cent arithmetic does not turn an exact ten-order break-even into eleven', () => {
  const r = calculateStartupCosts({ ...zero, orderValue: 0.3, productCost: 0.2, subscription: 1, orders: 10 });
  assert.equal(r.contributionPerOrder, 0.1);
  assert.equal(r.breakEvenOrders, 10);
  assert.equal(r.monthlyResult, 0);
});

test('processing and platform percentage fees round separately per order', () => {
  const r = calculateStartupCosts({ ...zero, orderValue: 0.17, paymentPercent: 2.9, platformPercent: 3 });
  assert.equal(r.processingPerOrder, 0);
  assert.equal(r.platformFeePerOrder, 0.01);
  assert.equal(r.contributionPerOrder, 0.16);
});

test('incomplete, out-of-range, fractional-count and overprecise inputs are rejected', () => {
  for (const patch of [{ orderValue: NaN }, { orderValue: Infinity }, { setup: -1 }, { apps: 1_000_001 }, { reserveMonths: 25 }, { reserveMonths: 0.5 }, { orders: 1.5 }, { paymentPercent: 100.01 }, { orderValue: 1.001 }]) {
    assert.ok(Object.keys(validateStartupInputs({ ...example, ...patch })).length > 0);
    assert.throws(() => calculateStartupCosts({ ...example, ...patch }), RangeError);
  }
  assert.deepEqual(validateStartupInputs({ ...example, paymentFixed: 0.29 }), {});
});

test('maximum supported inputs stay finite', () => {
  const r = calculateStartupCosts({ ...example, orderValue: 1_000_000, orders: 1_000_000, initialInventory: 1_000_000 });
  for (const value of Object.values(r)) assert.ok(value === null || Number.isFinite(value));
});

test('download contains inputs, currency-labelled results, assumptions and unreachable cases', () => {
  const csv = startupCostCsv(example, 'USD');
  assert.match(csv, /"Initial inventory purchase","1000","USD"/);
  assert.match(csv, /"Startup cash plus buffer","2250","USD"/);
  assert.match(csv, /"Monthly operating result","854","USD"/);
  assert.match(csv, /Annual prepayments, replenishment, and payout timing/);
  assert.match(startupCostCsv(example, 'NOK'), /"Monthly operating result","854","NOK"/);
  assert.match(startupCostCsv({ ...example, orderValue: 0 }, 'USD'), /Not reachable with these inputs/);
  assert.throws(() => startupCostCsv(example, '=SUM()'), RangeError);
});
