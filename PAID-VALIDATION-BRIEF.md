# Paid validation — does Shopify affiliate actually pay? (small test)

**The question this answers:** can we acquire a Shopify signup for **less than the ~$150 bounty**? That single number decides whether paid is a growth engine or a dead end — and it's unknowable from our ~15 non-brand organic clicks/month. Spend a few hundred dollars, get the answer in ~2 weeks.

**Why paid, why now:** AdsX's own competency is paid ads. Organic search is structurally capped here (demoted domain, ~82% AI fan-out). Paid is the only lever that scales high-intent volume predictably and gives a fast, clean read.

---

## Setup (Google Search first — highest intent)

**Budget:** $20–30/day × ~14 days = **$300–420 total.** One campaign, exact/phrase match, tight negatives.

**Ad groups (each → its best-matching landing page):**

| Ad group | Example keywords | Landing page |
|---|---|---|
| **The deal** (hottest) | `shopify $1 a month`, `shopify free trial`, `start a shopify store`, `how to start shopify` | `/shopify-free-trial-deal` |
| **Comparisons** (uses the new sprint content) | `gumroad vs shopify`, `kajabi vs shopify`, `kartra vs shopify`, `sellfy vs shopify` | the matching `/blog/*-vs-shopify-*` post |
| **Fit / consideration** | `is shopify worth it`, `is shopify right for me` | `/is-shopify-right-for-you` |

**Negatives (add before launch):** `jobs`, `careers`, `login`, `stock`, `nasdaq`, `free forever`, `download`, `discount code`, `coupon`, `theme free`, `tutorial pdf`. Watch the search-terms report daily for the first 3 days and prune.

**Ad copy (deal group) — lead with the offer:**
- Headlines: `Start a Shopify Store — $1/Month` · `Cardless Free Trial, Then $1/mo` · `Launch on Shopify for $1/Month` · `Sell Online in 2026 — Start Free`
- Descriptions: `Build free with no credit card, then $1/month for 3 months on any plan. See exactly how to lock it in.` · `The real 2026 Shopify offer, explained — activate the trial and the $1 deal in minutes.`

---

## Landing-page readiness (do these before spending)

1. **Hero CTA gap** — `/shopify-free-trial-deal` renders its tracked "Start free trial" CTA *after* the intro, not as an immediate hero button. Paid visitors decide in seconds. **Add a prominent above-the-fold "Start free trial → $1/mo" button in the hero** (I can wire this into `HubPage` — ~20 min). Highest-leverage single fix for the test.
2. Comparison LPs already carry top/mid/footer affiliate CTAs via the post template — fine as-is.

## Tracking (so the test is readable)

- CTAs already fire a GA4 event (`trackAffiliateClick`) and pass Impact subIds (`subId1=<page slug>`, `subId2=<placement>`).
- **Add a paid marker:** append `?src=gads` to every ad's final URL, and have the CTA fold `src` into the Impact subId (small code change — I can add a `src`→subId passthrough). Then Impact conversions with that marker = paid signups. Without it, approximate by attributing Impact signups during the flight window on those LPs to paid.
- ⚠️ Impact **Reports API scope is still pending** (clicks blocked) — so read **conversions/earnings** from the nightly Impact pull + GA4 affiliate-click events as the click proxy.

## Read the result (the gate)

`CAC = spend ÷ signups.`
- **CAC < $150** → it works. Scale budget, keep the comparison LPs as the paid content engine. Blog becomes support.
- **$150–300** → borderline. Optimize the hero CTA / offer framing / keyword tightness and re-read before scaling.
- **> $300 or ~0 signups** → paid-to-affiliate doesn't clear at current conversion. Pivot: rethink the offer, add complementary affiliate offers to raise revenue-per-visitor, or treat email capture as the goal instead of an immediate signup.

**Expectation setting:** at this budget expect ~100–300 clicks total — enough to see *directional* CAC, not a precise number. The goal is a go/no-go signal, not a scaled campaign.
