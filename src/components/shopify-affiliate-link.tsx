"use client";

import type { AnchorHTMLAttributes } from "react";
import { shopifyAffiliateHref, trackAffiliateClick, type AffiliateTagOptions } from "@/lib/affiliate";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & AffiliateTagOptions & { destination?: string };

// Use for inline links on non-markdown pages, which do not pass through the
// article renderer. The final href is server-rendered and works without GA4/JS.
export function ShopifyAffiliateLink({ slug, placement, destination, onClick, rel, ...props }: Props) {
  return <a {...props}
    href={shopifyAffiliateHref({ slug, placement, deepLink: destination })}
    target="_blank"
    rel={[...new Set(`${rel || ""} sponsored noopener noreferrer`.split(/\s+/).filter(Boolean))].join(" ")}
    onClick={event => { trackAffiliateClick({ slug, placement }); onClick?.(event); }}
  />;
}
