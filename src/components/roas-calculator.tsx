"use client";

import { useMemo, useState } from "react";

function formatCurrency(amount: number): string {
  if (!isFinite(amount)) return "—";
  const rounded = Math.round(amount);
  return `$${rounded.toLocaleString("en-US")}`;
}

function formatRoas(value: number): string {
  if (!isFinite(value) || value <= 0) return "—";
  return `${value.toFixed(2)}x`;
}

function formatPct(value: number): string {
  if (!isFinite(value)) return "—";
  return `${value >= 0 ? "" : "-"}${Math.abs(value).toFixed(0)}%`;
}

interface FieldProps {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}

function NumberField({ label, hint, value, onChange, prefix, suffix, min = 0 }: FieldProps) {
  return (
    <label className="block p-6 border-b border-[#333]">
      <div
        className="text-xs tracking-widest text-[#888] mb-2"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </div>
      <div className="flex items-center gap-2">
        {prefix && (
          <span className="text-[#10b981] text-xl" style={{ fontFamily: "var(--font-mono)" }}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          inputMode="decimal"
          min={min}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full bg-transparent text-2xl md:text-3xl font-bold text-[#EAEAEA] outline-none focus:text-[#10b981] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          style={{ fontFamily: "var(--font-mono)" }}
        />
        {suffix && (
          <span className="text-[#888] text-xl" style={{ fontFamily: "var(--font-mono)" }}>
            {suffix}
          </span>
        )}
      </div>
      {hint && <div className="text-xs text-[#666] mt-2">{hint}</div>}
    </label>
  );
}

interface ResultProps {
  label: string;
  value: string;
  accent?: boolean;
  good?: boolean | null;
  border?: boolean;
}

function ResultCell({ label, value, accent, good, border = true }: ResultProps) {
  const color = good === true ? "#10b981" : good === false ? "#ef4444" : accent ? "#10b981" : "#EAEAEA";
  return (
    <div className={`p-6 ${border ? "border-r border-b border-[#333]" : "border-b border-[#333]"}`}>
      <div
        className="text-2xl md:text-3xl font-bold"
        style={{ fontFamily: "var(--font-mono)", color }}
      >
        {value}
      </div>
      <div
        className="text-xs tracking-widest text-[#888] mt-1"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </div>
    </div>
  );
}

export function RoasCalculator() {
  const [adSpend, setAdSpend] = useState(5000);
  const [adRevenue, setAdRevenue] = useState(15000);
  const [margin, setMargin] = useState(40);
  const [totalRevenue, setTotalRevenue] = useState(25000);

  const r = useMemo(() => {
    const marginDec = margin / 100;
    const roas = adSpend > 0 ? adRevenue / adSpend : 0;
    const breakEvenRoas = marginDec > 0 ? 1 / marginDec : 0;
    const grossProfit = adRevenue * marginDec;
    const netProfit = grossProfit - adSpend;
    const roi = adSpend > 0 ? (netProfit / adSpend) * 100 : 0;
    const mer = adSpend > 0 ? totalRevenue / adSpend : 0;
    const profitable = roas >= breakEvenRoas && breakEvenRoas > 0;
    const headroom = breakEvenRoas > 0 ? ((roas - breakEvenRoas) / breakEvenRoas) * 100 : 0;
    return { roas, breakEvenRoas, netProfit, roi, mer, profitable, headroom };
  }, [adSpend, adRevenue, margin, totalRevenue]);

  return (
    <div className="border border-[#333]">
      <div className="grid md:grid-cols-2">
        {/* Inputs */}
        <div className="border-r border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              YOUR NUMBERS
            </div>
          </div>
          <NumberField
            label="MONTHLY AD SPEND"
            prefix="$"
            value={adSpend}
            onChange={setAdSpend}
            hint="What you pay the ad platform (Meta, Google, TikTok)."
          />
          <NumberField
            label="REVENUE FROM ADS"
            prefix="$"
            value={adRevenue}
            onChange={setAdRevenue}
            hint="Sales the platform attributes to that spend."
          />
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888] mb-3 flex justify-between"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span>GROSS PROFIT MARGIN</span>
              <span className="text-[#10b981]">{margin}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={90}
              step={1}
              value={margin}
              onChange={(e) => setMargin(parseInt(e.target.value, 10))}
              className="w-full accent-[#10b981]"
            />
            <div className="text-xs text-[#666] mt-2">
              Margin after COGS, shipping, and payment fees — before ad spend.
            </div>
          </div>
          <NumberField
            label="TOTAL STORE REVENUE (OPTIONAL)"
            prefix="$"
            value={totalRevenue}
            onChange={setTotalRevenue}
            hint="All revenue this month, for blended MER."
          />
        </div>

        {/* Results */}
        <div>
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              YOUR RESULTS
            </div>
          </div>
          <div className="grid grid-cols-2">
            <ResultCell label="ROAS" value={formatRoas(r.roas)} accent />
            <ResultCell label="BREAK-EVEN ROAS" value={formatRoas(r.breakEvenRoas)} border={false} />
            <ResultCell
              label="NET PROFIT FROM ADS"
              value={formatCurrency(r.netProfit)}
              good={r.netProfit >= 0}
            />
            <ResultCell label="ROI ON AD SPEND" value={formatPct(r.roi)} good={r.roi >= 0} border={false} />
            <ResultCell label="BLENDED MER" value={formatRoas(r.mer)} />
            <ResultCell
              label="MARGIN VS BREAK-EVEN"
              value={r.breakEvenRoas > 0 ? formatPct(r.headroom) : "—"}
              good={r.headroom >= 0}
              border={false}
            />
          </div>
          {/* Verdict */}
          <div
            className="p-6 border-t-2"
            style={{ borderColor: r.profitable ? "#10b981" : "#ef4444" }}
          >
            <div
              className="text-xs tracking-widest mb-2"
              style={{ fontFamily: "var(--font-mono)", color: r.profitable ? "#10b981" : "#ef4444" }}
            >
              {r.profitable ? "PROFITABLE" : "BELOW BREAK-EVEN"}
            </div>
            <p className="text-sm text-[#aaa] leading-relaxed">
              {r.profitable
                ? `At a ${margin}% margin you break even at ${formatRoas(r.breakEvenRoas)}. Your ${formatRoas(r.roas)} ROAS clears that by ${formatPct(r.headroom)}, netting ${formatCurrency(r.netProfit)} in profit after ad spend.`
                : `At a ${margin}% margin you need at least ${formatRoas(r.breakEvenRoas)} ROAS to break even. Your ${formatRoas(r.roas)} ROAS falls short, losing ${formatCurrency(Math.abs(r.netProfit))} after ad spend. Raise margin, cut CPA, or improve conversion rate.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
