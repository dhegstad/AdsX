# Second affiliate offer — scouting brief (verified Aug 2026)

**The ask (#4):** find a *second* affiliate offer for the same "starting/running an online store" audience that is **paid-ads-friendly** and ideally **recurring**, to (a) give the paid-CAC test ([PAID-VALIDATION-BRIEF.md](PAID-VALIDATION-BRIEF.md)) a monetizable offer Shopify's rules don't hamstring, and (b) diversify off the one-time $150 Shopify bounty.

## The headline that reframes the test

**Branded/trademark keyword bidding is banned by essentially every reputable program** — Shopify, Spocket, Omnisend, GetResponse, Printful, Printify, Gelato, Kajabi, SamCart, Brevo, Squarespace, PageFly, GemPages all prohibit it. The one shortlist program with *no discoverable* branded-bidding ban is **Kit (ConvertKit)**, and that's an absence-of-evidence, not a written allowance.

So the "run branded search against a friendlier program" idea is effectively dead. The realistic optimization is the next-best bundle: **usable non-branded PPC (permits paid search, ideally with direct-linking and no forced bridge page) + recurring commission + complements Shopify + low approval friction.** On that scorecard there's a clear winner.

**Shopify baseline (verified firsthand):** up to **$150 one-time**, 30-day cookie, branded bidding a "direct violation (Part A, Sec. 6.3)," must add "Shopify" as a negative keyword.

## Recommendation: **Spocket** (via PartnerStack)

A dropshipping supplier marketplace that installs **on** Shopify. It wins on all four target criteria at once:

- **Paid-ads-friendly — best in class.** Spocket's own help center teaches paid ads (bid on "dropshipping", "suppliers" on Google/Facebook) and it's the **only** recurring program verified to allow **direct-linking — no bridge page required**. Only its own brand terms are off-limits (same as everywhere).
- **Recurring — lifetime.** 20/25/30% tiered, "payments forever" (~$1,076/yr per referred store at the Gold tier). Lifetime LTV is exactly what makes a paid-CAC test pencil out where Shopify's one-time $150 can't.
- **Complements, doesn't compete.** A reader can convert on **both** the Shopify signup bounty *and* Spocket's recurring cut in the same funnel — it answers "where do I source what I sell?"
- **Low friction.** Self-serve through PartnerStack — no approval wait, no paid-plan requirement. 90-day cookie.

Firsthand sources: [spocket.co/affiliates](https://www.spocket.co/affiliates) · [PPC/keyword policy](https://help.spocket.co/en/articles/4291731-how-do-i-find-the-right-keywords-to-bid-on) · [90-day cookie](https://help.spocket.co/en/articles/3848014-how-do-cookies-work-on-my-partner-account) · [commission tiers](https://help.spocket.co/en/articles/3030604-what-is-the-spocket-partner-program) · [PartnerStack listing](https://market.partnerstack.com/page/spocket)

### #2 backup: Omnisend, with PageFly as the close alternative
- **Omnisend** (Impact) — cleanest all-round complement for a *prospective/new-seller* audience: 20% recurring up to 24 months, 60-day cookie, easiest approval, non-branded PPC allowed. Only knock: **no direct-linking** (bridge page required). [affiliates](https://www.omnisend.com/affiliates/) · [terms](https://www.omnisend.com/partner-terms/)
- **PageFly** (in-house) — actually wins on the two highest-weighted criteria (paid-ads-friendliness + recurring): 30% **lifetime** recurring, only *brand-name* PPC banned, **no bridge-page rule**, also a Shopify app. Pick it over Omnisend if optimizing specifically for the paid-CAC mechanics; weaker on audience (mid-funnel "optimize your store") and approval is manual. [agreement](https://pagefly.io/pages/pagefly-affiliate-agreement)
- **Wildcard — Kit (ConvertKit):** the only program with no discoverable branded-bidding ban. If branded bidding is a hard requirement, **email Kit's partner team to confirm in writing** before assuming anything.

## Comparison (verified Aug 2026)

| Program | Network | Commission | Recurring? | Cookie | Paid-ads / branded-bidding | Fit |
|---|---|---|---|---|---|---|
| **Spocket** ⭐#1 | PartnerStack | 20/25/30% tiered | **Lifetime** | 90d | **Non-branded PPC encouraged; direct-link OK (no bridge)**; own-brand banned | Excellent — suppliers |
| **Omnisend** ⭐#2 | Impact | 20% | Yes, ≤24mo | 60d | Non-branded PPC OK, **bridge page req.**; branded banned | Strong — email/SMS |
| **PageFly** #2-alt | In-house | 50%→**30% recurring** | **Lifetime** | 45d | Only brand-name PPC banned; **no bridge rule** | Strong — page builder |
| GemPages | In-house | 40%→25% recurring | Lifetime | 45d | Branded **and** direct-link banned | Strong — page builder |
| Sellfy | PartnerStack | 25–40% | **Lifetime** | 90d | Non-branded OK; branded banned | Good (mild overlap) |
| Kit (ConvertKit) | PartnerStack | 50% | Yes, 12mo | ? | **No branded ban found** (wildcard) | Moderate — creators |
| Printful | In-house | 10% (+$25) | Yes, 12mo | 30d | Bridge req.; branded banned | Excellent — POD |
| Printify | PartnerStack | 5% | Yes, 12mo | 90d | Branded banned | Excellent — POD |
| Kajabi | In-house | 100%→10-20% | Yes | 30d | Indirect PPC only; branded banned | Partial — courses |
| GetResponse | In-house/PS | 33% recurring or 40-60%/12mo | Yes | ? | **All paid ads gated** behind consent; branded banned | Moderate |
| Squarespace | Impact | $100–200 one-time | No | ? | Branded ban (secondary source) | **Competes** |
| Wix | Impact | Recurring, rate undisclosed | (unverified) | ? | Official copy invites paid + direct-link; branded rule unverifiable | **Competes** |
| BigCommerce | — | **DISCONTINUED May 2025** | — | — | — | Not an option |

## How to join + where the CTA goes

**Join Spocket:** spocket.co/affiliates → "Start Earning Now" → completes through **PartnerStack**; instant referral link + assets, no approval wait, no paid-plan requirement.

**adsx.com CTA placements (highest-intent first):**
1. **Bottom-funnel comparison posts** (fits the current comparison sprint): "best dropshipping suppliers", "AliExpress alternatives", "US/EU print-and-ship suppliers" — non-branded paid search *and* a supplier CTA both convert here.
2. **"Can I sell X on Shopify" / niche & product-research posts** — Spocket answers "where do I source it?" Place directly beneath the existing Shopify CTA (they stack).
3. **"How to start a dropshipping / online store" guides** — Spocket is the supplier step.

## Wiring it in (already scaffolded)

The nurture drip's **email 5 has a ready 2nd-offer slot**. The moment you have the PartnerStack link, set two repo Variables — no code change:

```
SECOND_AFFILIATE_LINK=<your PartnerStack Spocket link>
SECOND_AFFILIATE_NAME=Spocket
```

Email 5 then recommends it automatically (and links internally, never inventing a URL, until it's set). For on-page CTAs, add a Spocket block beneath the Shopify `AffiliateCTA` on the targeted post types above — best done as a follow-up once the link exists, since placement is per-post-type (Spocket only fits supplier/dropshipping intent, not every post).

## AVOID / restricted (don't waste time)
- **Store builders — Squarespace, Wix, BigCommerce:** BigCommerce is discontinued; Squarespace/Wix compete with Shopify and are one-time/undisclosed. No reason to run over Shopify's own bounty.
- **GetResponse:** legacy terms gate *all* paid ads behind written consent + bridge-page + no branded — least PPC-usable of the recurring set.
- **GemPages:** bans branded PPC *and* direct-linking — strictly worse than PageFly.
- **Printful / Printify / Gelato:** great audience fit but thin economics (5–12%, 12-month cap, bridge page). Fine as in-content links, not the paid-ads engine.
- **SamCart** (closed to new applicants), **ThriveCart / Zendrop / Brevo** (one-time — no durability).

## Verify-before-you-rely caveats
- **Spocket rate:** marketing says "up to 50%", but help center + PartnerStack document 20/25/30% lifetime — treat **20–30% lifetime** as the reliable number.
- **GetResponse (new joiners):** unclear whether a new signup gets 33% lifetime or 40–60%/12-month — confirm at signup.
- **Kit:** cookie unverified; branded-bidding "allowance" is inferred from the absence of a ban, not stated — confirm in writing.
- **Wix / Squarespace / Loox / Podia / Gelato:** one or more of rate, cookie, or paid-ads rule is secondary-source or unverified — re-check the official page before joining.

_Core #1/#2 recommendation rests on firsthand-fetched sources (Shopify, Spocket, Omnisend) and is solid; re-confirm any delegated number on the official page before acting._
