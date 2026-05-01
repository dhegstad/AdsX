export type CoverageState =
  | "VERDICT_UNSPECIFIED"
  | "PASS"
  | "PARTIAL"
  | "FAIL"
  | "NEUTRAL";

export type IndexingState =
  | "INDEXING_STATE_UNSPECIFIED"
  | "INDEXING_ALLOWED"
  | "BLOCKED_BY_META_TAG"
  | "BLOCKED_BY_HTTP_HEADER"
  | "BLOCKED_BY_ROBOTS_TXT";

export type PageFetchState =
  | "PAGE_FETCH_STATE_UNSPECIFIED"
  | "SUCCESSFUL"
  | "SOFT_404"
  | "BLOCKED_ROBOTS_TXT"
  | "NOT_FOUND"
  | "ACCESS_DENIED"
  | "SERVER_ERROR"
  | "REDIRECT_ERROR"
  | "ACCESS_FORBIDDEN"
  | "BLOCKED_4XX"
  | "INTERNAL_CRAWL_ERROR"
  | "INVALID_URL";

export interface InspectionResult {
  inspectionResultLink: string;
  indexStatusResult: {
    verdict: CoverageState;
    coverageState: string;
    robotsTxtState: IndexingState;
    indexingState: IndexingState;
    lastCrawlTime?: string;
    pageFetchState: PageFetchState;
    googleCanonical?: string;
    userCanonical?: string;
    referringUrls?: string[];
    crawledAs?: string;
  };
}

export interface IndexingSubmitResult {
  urlNotificationMetadata?: {
    url: string;
    latestUpdate?: {
      url: string;
      type: string;
      notifyTime: string;
    };
    latestRemove?: {
      url: string;
      type: string;
      notifyTime: string;
    };
  };
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

export interface AnalyticsRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface IndexCoverageStats {
  total: number;
  indexed: number;
  notIndexed: number;
  errors: number;
}

export interface UrlStatus {
  url: string;
  verdict?: CoverageState;
  coverageState?: string;
  lastCrawlTime?: string;
  pageFetchState?: PageFetchState;
  clicks?: number;
  impressions?: number;
  position?: number;
  indexingState?: IndexingState;
}
