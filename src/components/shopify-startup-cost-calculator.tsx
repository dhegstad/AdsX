"use client";

import { useRef, useState } from "react";
import {
  calculateStartupCosts,
  DEFAULT_STARTUP_INPUTS,
  STARTUP_FIELD_GROUPS,
  startupCostCsv,
  validateStartupInputs,
  type StartupCostInputs,
  type StartupField,
} from "@/lib/startup-cost-calculator";

const TOOL_ID = "shopify-startup-cost-calculator";
const CURRENCIES = ["USD", "GBP", "EUR", "CAD", "AUD", "NZD", "NOK"];
const mono = { fontFamily: "var(--font-mono)" };
const strings = (values: StartupCostInputs) => Object.fromEntries(Object.entries(values).map(([key, value]) => [key, String(value)])) as Record<StartupField, string>;

function trackTool(event: "tool_used" | "tool_download") {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", event, { tool_id: TOOL_ID });
}

export function ShopifyStartupCostCalculator() {
  const [values, setValues] = useState(() => strings(DEFAULT_STARTUP_INPUTS));
  const [currency, setCurrency] = useState("USD");
  const [downloadMessage, setDownloadMessage] = useState("");
  const used = useRef(false);
  const input = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim() === "" ? NaN : Number(value)])) as StartupCostInputs;
  const errors = validateStartupInputs(input);
  const valid = Object.keys(errors).length === 0;
  const result = valid ? calculateStartupCosts(input) : null;
  const format = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency, currencyDisplay: "narrowSymbol", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

  function recordUse() {
    if (!used.current) { trackTool("tool_used"); used.current = true; }
    setDownloadMessage("");
  }
  function update(key: StartupField, value: string) {
    recordUse();
    setValues(previous => ({ ...previous, [key]: value }));
  }
  function reset(empty: boolean) {
    recordUse();
    setValues(strings(empty ? Object.fromEntries(Object.keys(DEFAULT_STARTUP_INPUTS).map(key => [key, 0])) as StartupCostInputs : DEFAULT_STARTUP_INPUTS));
  }
  function download() {
    if (!result) return;
    try {
      const blob = new Blob(["\uFEFF", startupCostCsv(input, currency)], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `adsx-shopify-startup-budget-${currency.toLowerCase()}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      trackTool("tool_download");
      setDownloadMessage("Your worksheet is ready. Check your browser’s downloads.");
    } catch {
      setDownloadMessage("The worksheet could not be downloaded. Please try again.");
    }
  }

  return <div id="calculator" className="scroll-mt-6">
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#333] pb-7 mb-8">
      <div className="max-w-xl">
        <p className="text-sm font-semibold text-[#10b981]">Start with the example, then make it yours.</p>
        <p className="text-sm text-[#aaa] mt-2 leading-relaxed">All starting amounts are illustrative, including the subscription and payment rates. They are not Shopify quotes or suggested spending levels.</p>
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="budget-currency" className="block text-xs text-[#aaa] mb-2">Currency</label>
          <select id="budget-currency" value={currency} onChange={event => { recordUse(); setCurrency(event.target.value); }} className="border border-[#555] bg-[#111] text-[#EAEAEA] px-3 py-3 min-h-11 focus:outline-none focus:ring-2 focus:ring-[#10b981]">
            {CURRENCIES.map(code => <option key={code} value={code}>{code}</option>)}
          </select>
        </div>
        <button type="button" onClick={() => reset(false)} className="text-sm underline underline-offset-4 text-[#ccc] min-h-11 px-2 hover:text-[#10b981] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#10b981]">Reset example</button>
        <button type="button" onClick={() => reset(true)} className="text-sm underline underline-offset-4 text-[#ccc] min-h-11 px-2 hover:text-[#10b981] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#10b981]">Start from zero</button>
      </div>
    </div>
    <p className="text-xs text-[#999] mb-8">Currency changes labels only; it does not convert amounts. Use one currency throughout.</p>

    <div className="lg:hidden sticky top-2 z-20 flex justify-between items-center gap-4 bg-[#101a15] border border-[#10b981]/60 px-4 py-3 mb-6 shadow-lg">
      <div><p className="text-xs text-[#aaa]">Startup + buffer · {currency}</p><p className="text-lg text-[#EAEAEA] break-words" style={mono}>{result ? format(result.launchBudget) : "Check inputs"}</p></div>
      <a href="#budget-results" className="text-sm text-[#10b981] underline underline-offset-4 shrink-0 py-2">View results ↓</a>
    </div>

    <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">
      <div id="budget-inputs" className="lg:col-span-3 min-w-0 space-y-8 scroll-mt-24">
        {STARTUP_FIELD_GROUPS.map((group, groupIndex) => <fieldset key={group.title} className="border border-[#333] px-5 pb-6 min-w-0">
          <legend className="px-2 text-xl text-[#EAEAEA]"><span className="text-[#10b981] text-sm mr-3" style={mono}>0{groupIndex + 1}</span>{group.title}</legend>
          <p className="text-sm text-[#aaa] mt-3 mb-6 leading-relaxed">{group.description}</p>
          <div className="grid sm:grid-cols-2 gap-x-5 gap-y-6">
            {group.fields.map(field => {
              const id = `startup-${field.id}`;
              const error = errors[field.id];
              const count = field.kind === "count" || field.kind === "months";
              return <div key={field.id} className="min-w-0">
                <label htmlFor={id} className="block text-sm text-[#ddd] mb-2">{field.label}</label>
                <div className={`flex items-center border bg-[#0c0c0c] focus-within:ring-2 focus-within:ring-[#10b981] ${error ? "border-[#fca5a5]" : "border-[#555]"}`}>
                  {field.kind === "money" && <span className="pl-3 text-xs text-[#10b981]" aria-hidden="true" style={mono}>{currency}</span>}
                  <input id={id} type="number" inputMode={count ? "numeric" : "decimal"} min={0} max={field.kind === "percent" ? 100 : field.kind === "months" ? 24 : 1_000_000} step={count ? 1 : 0.01} required value={values[field.id]} onChange={event => update(field.id, event.target.value)} aria-invalid={Boolean(error)} aria-describedby={[field.help ? `${id}-help` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined} className="w-full min-w-0 bg-transparent p-3 text-lg text-[#EAEAEA] outline-none" style={mono} />
                  {field.kind === "percent" && <span aria-hidden="true" className="pr-3 text-[#10b981]">%</span>}
                </div>
                {field.help && <p id={`${id}-help`} className="text-xs leading-relaxed text-[#999] mt-2">{field.help}</p>}
                {error && <p id={`${id}-error`} className="text-xs text-[#fca5a5] mt-2">{error}</p>}
              </div>;
            })}
          </div>
        </fieldset>)}
      </div>

      <aside id="budget-results" className="lg:col-span-2 lg:sticky lg:top-6 min-w-0 scroll-mt-24" aria-label="Your budget results">
        <a href="#budget-inputs" className="lg:hidden block text-sm text-[#10b981] underline mb-4 py-2">↑ Back to inputs</a>
        <div className="border border-[#10b981]/60 bg-[#101a15] p-6 md:p-7">
          <div className="flex items-center justify-between gap-3 text-xs text-[#10b981] mb-5" style={mono}><span>YOUR BUDGET</span><span>{currency}</span></div>
          <h2 className="text-lg text-[#ccc]">Startup cash + fixed-cost buffer</h2>
          <p data-testid="launch-budget" className="text-4xl xl:text-5xl text-[#EAEAEA] mt-3 break-words tracking-tight" style={mono}>{result ? format(result.launchBudget) : "—"}</p>
          {result ? <>
            <dl className="text-sm mt-6 space-y-3">
              <div className="flex justify-between gap-4"><dt className="text-[#aaa]">Upfront startup spending</dt><dd className="text-right text-[#ddd]" data-testid="startup-cash">{format(result.startupCash)}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-[#aaa]">{input.reserveMonths}-month fixed-cost buffer</dt><dd className="text-right text-[#ddd]">{format(result.reserve)}</dd></div>
            </dl>
            {result.launchBudget > 0 && <div className="h-2 flex mt-5 overflow-hidden" aria-hidden="true"><span className="bg-[#10b981]" style={{ width: `${result.startupCash / result.launchBudget * 100}%` }} /><span className="bg-[#738c7b] flex-1" /></div>}
            <p className="mt-5 text-xs leading-relaxed text-[#aaa]">The buffer covers fixed monthly costs only. Annual bills paid upfront, inventory replenishment, and payout delays can require more cash.</p>
          </> : <p className="mt-5 text-sm text-[#fca5a5]" role="status">Complete or correct the highlighted fields to see your estimate.</p>}
        </div>

        <div className="border border-t-0 border-[#333] bg-[#0d0d0d] p-6 md:p-7">
          <div className="grid grid-cols-2 gap-x-5 gap-y-6">
            <div><h3 className="text-xs text-[#aaa] mb-2">Fixed costs / month</h3><p data-testid="fixed-monthly" className="text-xl break-words text-[#EAEAEA]" style={mono}>{result ? format(result.fixedMonthly) : "—"}</p></div>
            <div><h3 className="text-xs text-[#aaa] mb-2">Contribution / order</h3><p data-testid="contribution" className={`text-xl break-words ${result && result.contributionPerOrder < 0 ? "text-[#fca5a5]" : "text-[#EAEAEA]"}`} style={mono}>{result ? format(result.contributionPerOrder) : "—"}</p></div>
            <div className="col-span-2 border-t border-[#333] pt-6"><h3 className="text-sm text-[#aaa] mb-2">Orders to cover monthly costs</h3><p data-testid="break-even-orders" className="text-3xl text-[#EAEAEA] break-words" style={mono}>{result ? result.breakEvenOrders === null ? "Not reachable" : `${result.breakEvenOrders.toLocaleString("en-US")} orders` : "—"}</p><p className="text-xs text-[#999] mt-2">At these per-order costs and the same monthly marketing budget. Excludes recovery of startup spending.</p></div>
            <div className="col-span-2 border-t border-[#333] pt-6"><h3 className="text-sm text-[#aaa] mb-2">Monthly operating result{valid ? ` at ${input.orders.toLocaleString("en-US")} orders` : ""}</h3><p data-testid="monthly-result" className={`text-3xl break-words ${result && result.monthlyResult < 0 ? "text-[#fca5a5]" : "text-[#10b981]"}`} style={mono}>{result ? format(result.monthlyResult) : "—"}</p><p className="text-xs text-[#999] mt-2">Revenue minus the monthly and per-order costs entered, before income tax.</p></div>
          </div>
          {result && result.contributionPerOrder <= 0 && <p role="status" className="text-sm leading-relaxed text-[#fca5a5] border border-[#fca5a5]/40 p-4 mt-6">{result.contributionPerOrder < 0 ? "Each order loses money before fixed costs. More orders increase the loss under these inputs." : "Each order contributes zero toward fixed costs. Review your selling price and per-order costs."}{result.fixedMonthly === 0 ? " With no fixed costs, zero orders breaks even." : " Sales cannot cover the monthly commitments yet."}</p>}
          {result && <details className="border-t border-[#333] mt-6 pt-5">
            <summary className="text-sm text-[#ccc] cursor-pointer min-h-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#10b981]">See the monthly breakdown</summary>
            <dl className="text-sm space-y-3 mt-4">{[
              ["Product revenue", input.orders * input.orderValue], ["Customer-paid shipping", input.orders * input.shippingCollected],
              ["Products, fulfillment, shipping & refunds", input.orders * (input.productCost + input.fulfillment + input.shippingCost + input.returnsAllowance)],
              ["Estimated processing & platform fees", input.orders * (result.processingPerOrder + result.platformFeePerOrder)],
              ["Fixed costs including marketing", result.fixedMonthly], ["Total monthly costs", result.monthlyCosts],
            ].map(([label, value]) => <div key={label} className="flex justify-between gap-4"><dt className="text-[#999]">{label}</dt><dd className="text-[#ddd] text-right shrink-0">{format(Number(value))}</dd></div>)}</dl>
          </details>}
          <button type="button" onClick={download} disabled={!valid} className="w-full mt-7 min-h-12 bg-[#EAEAEA] text-[#080808] font-semibold px-5 py-3 hover:bg-[#10b981] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#10b981] disabled:opacity-40 disabled:cursor-not-allowed">Download budget worksheet ↓</button>
          <p role="status" className="text-xs text-[#aaa] mt-3 min-h-4">{downloadMessage || "CSV file with your inputs, results, and assumptions."}</p>
        </div>
        <output className="sr-only" aria-live="polite" aria-atomic="true">{result ? `Budget updated. Startup cash and buffer: ${format(result.launchBudget)}. Monthly operating result: ${format(result.monthlyResult)}.` : "Budget unavailable. Check the input errors."}</output>
      </aside>
    </div>
  </div>;
}
