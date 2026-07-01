"use client";

import { useMemo, useState } from "react";

interface FactorResult {
  key: string;
  label: string;
  earned: number;
  max: number;
  status: "pass" | "partial" | "fail";
  detail: string;
  fix: string;
}

function containsWord(haystack: string, needle: string): boolean {
  const h = haystack.toLowerCase();
  const n = needle.trim().toLowerCase();
  if (!n) return false;
  return h.includes(n);
}

const ATTRIBUTE_KEYWORDS: Record<string, string[]> = {
  Color: [
    "color", "colour", "black", "white", "red", "blue", "green", "grey", "gray",
    "navy", "beige", "brown", "pink", "purple", "yellow", "orange", "silver", "gold",
  ],
  Size: [
    "size", "small", "medium", "large", "x-large", "xl", "xxl", "inch", "cm", "mm",
    "ml", "oz", "liter", "litre", "gram", "kg", "fl oz",
  ],
  Material: [
    "material", "cotton", "leather", "polyester", "wool", "silk", "linen", "nylon",
    "stainless", "steel", "aluminum", "aluminium", "wood", "ceramic", "glass",
    "plastic", "rubber", "denim", "suede",
  ],
};

interface Rating {
  label: string;
  color: string;
  blurb: string;
}

function ratingFor(score: number): Rating {
  if (score >= 90) {
    return {
      label: "Excellent",
      color: "#10b981",
      blurb:
        "This product is feed-ready. Ad platforms and AI shopping engines have everything they need to match, rank, and cite it.",
    };
  }
  if (score >= 70) {
    return {
      label: "Good",
      color: "#3b82f6",
      blurb:
        "Solid foundation. Close the remaining gaps below to unlock full Shopping/PMax eligibility and stronger AI visibility.",
    };
  }
  if (score >= 50) {
    return {
      label: "Fair",
      color: "#f59e0b",
      blurb:
        "Partial coverage. Missing attributes are actively capping your ad reach and how confidently AI models can recommend this product.",
    };
  }
  return {
    label: "Poor",
    color: "#ef4444",
    blurb:
      "This product is under-fed. Expect disapprovals, low match rates, and near-zero pickup in AI shopping answers until the essentials are filled in.",
  };
}

interface FieldProps {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
  counter?: boolean;
}

function TextField({ label, hint, value, onChange, placeholder, textarea, counter }: FieldProps) {
  return (
    <label className="block p-6 border-b border-[#333]">
      <div
        className="text-xs tracking-widest text-[#888] mb-2 flex justify-between"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span>{label}</span>
        {counter && <span className="text-[#10b981]">{value.trim().length} chars</span>}
      </div>
      {textarea ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm md:text-base text-[#EAEAEA] outline-none focus:text-[#10b981] transition-colors placeholder:text-[#555] resize-y"
          style={{ fontFamily: "var(--font-mono)" }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-lg md:text-xl font-bold text-[#EAEAEA] outline-none focus:text-[#10b981] transition-colors placeholder:text-[#555]"
          style={{ fontFamily: "var(--font-mono)" }}
        />
      )}
      {hint && <div className="text-xs text-[#666] mt-2">{hint}</div>}
    </label>
  );
}

export function FeedReadinessChecker() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageCount, setImageCount] = useState(1);
  const [hasGtin, setHasGtin] = useState(false);
  const [brand, setBrand] = useState("");
  const [productType, setProductType] = useState("");
  const [attributes, setAttributes] = useState("");

  const result = useMemo(() => {
    const factors: FactorResult[] = [];

    // 1. Title — 20 pts (length 12, brand 4, product type 4)
    {
      const len = title.trim().length;
      const lenOk = len >= 30 && len <= 150;
      const hasBrand = brand.trim().length > 0 && containsWord(title, brand);
      const hasType =
        productType.trim().length > 0 &&
        productType
          .split(/[\s,/>|-]+/)
          .some((t) => t.trim().length > 2 && containsWord(title, t));
      const earned = (lenOk ? 12 : len >= 15 ? 6 : 0) + (hasBrand ? 4 : 0) + (hasType ? 4 : 0);
      factors.push({
        key: "title",
        label: "Product title (30–150 chars, includes brand + type)",
        earned,
        max: 20,
        status: earned >= 20 ? "pass" : earned > 0 ? "partial" : "fail",
        detail: `${len} chars${hasBrand ? ", brand found" : ", no brand"}${hasType ? ", type found" : ", no type"}.`,
        fix:
          "Use the pattern Brand + Product + Key Attribute + Type (e.g. \"Acme Merino Wool Crew-Neck Sweater\"). Keep it 30–150 characters so it survives truncation in Shopping and AI results.",
      });
    }

    // 2. Description — 20 pts (>=500 full, >=250 partial)
    {
      const len = description.trim().length;
      const earned = len >= 500 ? 20 : len >= 250 ? 10 : len >= 80 ? 4 : 0;
      factors.push({
        key: "description",
        label: "Description depth (≥ ~500 characters)",
        earned,
        max: 20,
        status: earned >= 20 ? "pass" : earned > 0 ? "partial" : "fail",
        detail: `${len} characters.`,
        fix:
          "Write 500+ characters of unique, specific copy: use cases, materials, dimensions, care, and who it's for. Long, factual descriptions are what LLMs quote when recommending products.",
      });
    }

    // 3. Images — 15 pts (>=1 gives 10, >=3 bonus +5)
    {
      const earned = imageCount >= 3 ? 15 : imageCount >= 1 ? 10 : 0;
      factors.push({
        key: "images",
        label: "Images (≥ 1 required, ≥ 3 recommended)",
        earned,
        max: 15,
        status: earned >= 15 ? "pass" : earned > 0 ? "partial" : "fail",
        detail: `${imageCount} image${imageCount === 1 ? "" : "s"}.`,
        fix:
          "Add at least 3 high-resolution images on clean backgrounds showing angles, scale, and in-use context. Feeds with a single image lose in Shopping ad ranking and visual AI results.",
      });
    }

    // 4. GTIN / barcode — 15 pts
    {
      const earned = hasGtin ? 15 : 0;
      factors.push({
        key: "gtin",
        label: "GTIN / barcode present",
        earned,
        max: 15,
        status: hasGtin ? "pass" : "fail",
        detail: hasGtin ? "Barcode supplied." : "No barcode.",
        fix:
          "Populate the Barcode (GTIN/UPC/EAN) field on each variant. Google matches products to its catalog by GTIN — missing it suppresses impressions and blocks unique-product identifiers AI shopping relies on.",
      });
    }

    // 5. Brand / vendor — 10 pts
    {
      const earned = brand.trim().length > 0 ? 10 : 0;
      factors.push({
        key: "brand",
        label: "Brand / vendor set",
        earned,
        max: 10,
        status: earned > 0 ? "pass" : "fail",
        detail: brand.trim().length > 0 ? `"${brand.trim()}"` : "No brand.",
        fix:
          "Set the Vendor field in Shopify (it maps to the feed \"brand\" attribute). Brand is required for most Shopping categories and is a primary signal AI models use to attribute and rank products.",
      });
    }

    // 6. Product type / category — 10 pts
    {
      const earned = productType.trim().length > 0 ? 10 : 0;
      factors.push({
        key: "type",
        label: "Product type / category",
        earned,
        max: 10,
        status: earned > 0 ? "pass" : "fail",
        detail: productType.trim().length > 0 ? `"${productType.trim()}"` : "No product type.",
        fix:
          "Fill Shopify's Product Type and map a Google Product Category. Precise categorization drives correct auction placement and lets AI engines slot the item into the right comparison set.",
      });
    }

    // 7. Key attributes (color/size/material) — 10 pts (~3.33 each)
    {
      const haystack = `${attributes} ${title} ${description}`;
      const present = Object.entries(ATTRIBUTE_KEYWORDS).filter(([, words]) =>
        words.some((w) => containsWord(haystack, w)),
      );
      const found = present.map(([name]) => name);
      const earned = Math.round((found.length / 3) * 10);
      factors.push({
        key: "attributes",
        label: "Key attributes (color, size, material)",
        earned,
        max: 10,
        status: found.length >= 3 ? "pass" : found.length > 0 ? "partial" : "fail",
        detail: found.length > 0 ? `Detected: ${found.join(", ")}.` : "None detected.",
        fix:
          "Add structured color, size, and material attributes (as metafields/variants and in copy). These attributes are what shoppers and AI assistants filter on — without them the product is invisible to attribute-based queries.",
      });
    }

    const score = factors.reduce((sum, f) => sum + f.earned, 0);
    const maxScore = factors.reduce((sum, f) => sum + f.max, 0);
    const normalized = Math.round((score / maxScore) * 100);

    return { factors, score: normalized, rating: ratingFor(normalized), price };
  }, [title, description, price, imageCount, hasGtin, brand, productType, attributes]);

  const statusMark = (status: FactorResult["status"]) =>
    status === "pass" ? "✓" : status === "partial" ? "~" : "✕";
  const statusColor = (status: FactorResult["status"]) =>
    status === "pass" ? "#10b981" : status === "partial" ? "#f59e0b" : "#ef4444";

  return (
    <div className="border border-[#333]">
      <div className="grid lg:grid-cols-2">
        {/* Inputs */}
        <div className="border-b lg:border-b-0 lg:border-r border-[#333]">
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              YOUR PRODUCT
            </div>
          </div>
          <TextField
            label="PRODUCT TITLE"
            value={title}
            onChange={setTitle}
            placeholder="Acme Merino Wool Crew-Neck Sweater"
            hint="Brand + product + key attribute + type works best."
            counter
          />
          <TextField
            label="DESCRIPTION"
            value={description}
            onChange={setDescription}
            placeholder="Describe materials, fit, use cases, dimensions, care…"
            textarea
            counter
          />
          <TextField
            label="PRICE (OPTIONAL)"
            value={price}
            onChange={setPrice}
            placeholder="$89.00"
            hint="Not scored, but required for a valid feed."
          />
          <div className="p-6 border-b border-[#333]">
            <div
              className="text-xs tracking-widest text-[#888] mb-3 flex justify-between"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span>IMAGE COUNT</span>
              <span className="text-[#10b981]">{imageCount}</span>
            </div>
            <input
              type="range"
              min={0}
              max={8}
              step={1}
              value={imageCount}
              onChange={(e) => setImageCount(parseInt(e.target.value, 10))}
              className="w-full accent-[#10b981]"
            />
            <div className="text-xs text-[#666] mt-2">
              At least 1 required; 3+ strengthens Shopping and visual AI results.
            </div>
          </div>
          <TextField
            label="BRAND / VENDOR"
            value={brand}
            onChange={setBrand}
            placeholder="Acme"
            hint="Maps to the Shopify Vendor field."
          />
          <TextField
            label="PRODUCT TYPE / CATEGORY"
            value={productType}
            onChange={setProductType}
            placeholder="Sweaters"
            hint="Shopify Product Type + Google Product Category."
          />
          <TextField
            label="KEY ATTRIBUTES"
            value={attributes}
            onChange={setAttributes}
            placeholder="Navy, size M, 100% merino wool"
            hint="Color, size, material — used for AI readability."
          />
          <label className="flex items-center gap-3 p-6 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasGtin}
              onChange={(e) => setHasGtin(e.target.checked)}
              className="h-5 w-5 accent-[#10b981]"
            />
            <span className="text-sm text-[#EAEAEA]" style={{ fontFamily: "var(--font-mono)" }}>
              GTIN / BARCODE PRESENT (UPC/EAN)
            </span>
          </label>
        </div>

        {/* Results */}
        <div>
          <div className="p-6 border-b border-[#333] bg-[#0c0c0c]">
            <div
              className="text-xs tracking-widest text-[#10b981]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FEED-READINESS SCORE
            </div>
          </div>

          {/* Score header */}
          <div className="p-8 border-b-2" style={{ borderColor: result.rating.color }}>
            <div className="flex items-end gap-4">
              <div
                className="font-bold leading-none"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(48px, 10vw, 88px)",
                  color: result.rating.color,
                }}
              >
                {result.score}
              </div>
              <div className="pb-2">
                <div
                  className="text-lg font-bold uppercase"
                  style={{ fontFamily: "var(--font-mono)", color: result.rating.color }}
                >
                  {result.rating.label}
                </div>
                <div className="text-xs text-[#666]" style={{ fontFamily: "var(--font-mono)" }}>
                  / 100
                </div>
              </div>
            </div>
            {/* Bar */}
            <div className="mt-4 h-2 w-full bg-[#1a1a1a]">
              <div
                className="h-2 transition-all"
                style={{ width: `${result.score}%`, backgroundColor: result.rating.color }}
              />
            </div>
            <p className="text-sm text-[#aaa] leading-relaxed mt-4">{result.rating.blurb}</p>
          </div>

          {/* Factor checklist */}
          <div>
            {result.factors.map((f) => (
              <div key={f.key} className="p-6 border-b border-[#333]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span
                      className="text-lg font-bold leading-none mt-0.5"
                      style={{ fontFamily: "var(--font-mono)", color: statusColor(f.status) }}
                    >
                      {statusMark(f.status)}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-[#EAEAEA]">{f.label}</div>
                      <div className="text-xs text-[#666] mt-1" style={{ fontFamily: "var(--font-mono)" }}>
                        {f.detail}
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-sm font-bold shrink-0"
                    style={{ fontFamily: "var(--font-mono)", color: statusColor(f.status) }}
                  >
                    {f.earned}/{f.max}
                  </div>
                </div>
                {f.status !== "pass" && (
                  <p className="text-xs text-[#888] leading-relaxed mt-3 pl-7">
                    <span className="text-[#10b981]" style={{ fontFamily: "var(--font-mono)" }}>
                      FIX:{" "}
                    </span>
                    {f.fix}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
