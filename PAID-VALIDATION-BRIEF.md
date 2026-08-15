# Paid validation — CAN we acquire Shopify signups profitably? (compliant test)

**The question:** can we acquire a Shopify signup for **less than the ~$150 bounty** — *within Shopify's affiliate rules*? That number decides whether paid is a growth engine or a dead end.

> ⚠️ **Read the compliance section first.** Shopify's Affiliate Program Terms (Part A, Sec. 6.3) **ban branded-keyword bidding**. That removes the cheap, high-intent keywords and makes a profitable paid-search CAC unlikely — so this test is deliberately bounded, and a "no" is a valid, useful outcome.

---

## Compliance rules (Shopify Affiliate Program, Part A §6.3) — do not violate

| Rule | What it means for us |
|---|---|
| **No bidding on "Shopify" or misspellings** | Add **`shopify`** (and common misspellings) as a **campaign negative keyword.** This also blocks "X vs shopify" / "is shopify worth it" queries — they contain the trademark. |
| **No "Shopify" in ad copy or display domain** | Headlines/descriptions must NOT say "Shopify." Frame on the outcome ("online store", "sell digital products"). |
| **No mimicking Shopify's ads / posing as Shopify** | No lookalike branding, no "official" framing. |
| **Use your OWN landing page** | Ads → an adsx.com page that carries the affiliate CTA. Do **not** direct-link the affiliate URL from the ad. |
| **Disclose the affiliate relationship** (FTC) | Landing pages already state "affiliate link — we may earn a commission." |

Violation = affiliate account termination + clawed-back commissions. Not worth it.

## What we CAN bid on (non-branded only)

| Intent | Example keywords (no "shopify") | Landing page |
|---|---|---|
| **Category / start** | `start an online store`, `online store builder`, `how to sell online`, `sell digital products online`, `print on demand store` | `/start-a-shopify-store` or `/is-shopify-right-for-you` |
| **Competitor alternatives** | `gumroad alternative`, `sellfy alternative`, `kajabi alternative`, `kartra alternative`, `gumroad vs sellfy` | the matching comparison post |

Ad copy examples (no trademark): `Launch Your Online Store — $1/Month to Start` · `Sell Digital Products From a Store You Own` · `Which Platform Should You Actually Use?`

## Setup

- **Budget:** $20–30/day × ~14 days = **$300–420.** Google Search, exact/phrase match.
- **Negatives (before launch):** `shopify` + misspellings, `jobs`, `login`, `free forever`, `coupon`, `download`, `crack`, `nulled`.
- **Consider Meta/TikTok instead of / alongside search:** since branded search is off-limits, interest-based social ads to "start selling online / side hustle" audiences (still no Shopify trademark in creative) may give a better top-funnel CAC read than expensive non-branded search terms.

## Landing-page readiness (do before spending)

1. **Hero CTA gap** — `/shopify-free-trial-deal` shows its tracked CTA *after* the intro. Add a prominent above-the-fold "Start free trial → $1/mo" button. (I can wire this into `HubPage`.)
2. Comparison LPs already carry tracked affiliate CTAs via the post template.

## Tracking

- CTAs fire GA4 (`trackAffiliateClick`) + Impact subIds (`subId1=slug`, `subId2=placement`).
- **Add a paid marker:** ad final URLs get `?src=gads`; fold `src` into the Impact subId (small code change) so paid signups are attributable. ⚠️ Impact **Reports API scope pending** — read conversions/earnings from the nightly pull + GA4 as the proxy.

## Read the result (the gate)

`CAC = spend ÷ signups.`
- **< $150** → compliant paid works. Scale carefully. (Unlikely on non-branded search — would be a pleasant surprise.)
- **$150–300** → optimize LP/offer/creative and re-read.
- **> $300 or ~0 signups** → **the expected outcome.** Paid-search-to-affiliate doesn't clear the bounty once branded terms are off-limits. Conclusion: **don't fund paid search; put the energy into organic comparison content + AI/GEO citations + email capture + a 2nd affiliate offer.**

**Bottom line:** run this only as a small, bounded probe to *confirm* the economics. The compliance constraint means the realistic answer is "paid search can't clear $150," which is itself the decision — it redirects effort to the compliant, scalable levers.
