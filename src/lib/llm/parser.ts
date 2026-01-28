import type { BrandAnalysis, Sentiment } from "@/types/visibility";

/**
 * Parse an LLM response to extract brand visibility information.
 */
export function analyzeResponse(
  response: string,
  brandName: string,
  competitors: string[]
): { brand: BrandAnalysis; competitors: BrandAnalysis[] } {
  const brandResult = analyzeBrand(response, brandName);
  const competitorResults = competitors.map((name) =>
    analyzeBrand(response, name)
  );

  return {
    brand: brandResult,
    competitors: competitorResults,
  };
}

function analyzeBrand(response: string, brandName: string): BrandAnalysis {
  const lowerResponse = response.toLowerCase();
  const lowerBrand = brandName.toLowerCase();

  // Check if brand is mentioned
  const mentioned = lowerResponse.includes(lowerBrand);

  if (!mentioned) {
    return {
      name: brandName,
      mentioned: false,
      position: null,
      sentiment: null,
      context: null,
    };
  }

  // Find position in numbered list
  const position = findPosition(response, brandName);

  // Analyze sentiment around the mention
  const sentiment = analyzeSentiment(response, brandName);

  // Extract context snippet
  const context = extractContext(response, brandName);

  return {
    name: brandName,
    mentioned: true,
    position,
    sentiment,
    context,
  };
}

/**
 * Find the position of a brand in a numbered list.
 * Handles formats like:
 *   1. BrandName
 *   1) BrandName
 *   **1. BrandName**
 *   #1: BrandName
 */
function findPosition(response: string, brandName: string): number | null {
  const escapedBrand = escapeRegex(brandName);

  // Match numbered list items containing the brand
  const patterns = [
    // "1. BrandName" or "1. **BrandName**"
    new RegExp(
      `(\\d+)\\.\\s*(?:\\*\\*)?[^\\n]*?${escapedBrand}`,
      "im"
    ),
    // "1) BrandName"
    new RegExp(
      `(\\d+)\\)\\s*[^\\n]*?${escapedBrand}`,
      "im"
    ),
    // "#1: BrandName" or "#1 BrandName"
    new RegExp(
      `#(\\d+)[:\\s][^\\n]*?${escapedBrand}`,
      "im"
    ),
  ];

  for (const pattern of patterns) {
    const match = response.match(pattern);
    if (match && match[1]) {
      const pos = parseInt(match[1], 10);
      if (pos >= 1 && pos <= 20) {
        return pos;
      }
    }
  }

  // Try ordinal position: "First, ... BrandName"
  const ordinals: Record<string, number> = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
    sixth: 6,
    seventh: 7,
  };

  for (const [word, pos] of Object.entries(ordinals)) {
    const ordinalPattern = new RegExp(
      `${word}[^.]*?${escapeRegex(brandName)}`,
      "im"
    );
    if (ordinalPattern.test(response)) {
      return pos;
    }
  }

  return null;
}

/**
 * Analyze the sentiment of text surrounding a brand mention.
 */
function analyzeSentiment(response: string, brandName: string): Sentiment {
  const context = extractContext(response, brandName, 300);
  if (!context) return "neutral";

  const lowerContext = context.toLowerCase();

  const positiveWords = [
    "best",
    "excellent",
    "great",
    "outstanding",
    "top",
    "leading",
    "powerful",
    "popular",
    "recommend",
    "highly",
    "robust",
    "comprehensive",
    "innovative",
    "trusted",
    "reliable",
    "industry-leading",
    "well-known",
    "strong",
    "favorite",
    "preferred",
    "superior",
    "standout",
  ];

  const negativeWords = [
    "worst",
    "poor",
    "limited",
    "expensive",
    "complicated",
    "outdated",
    "lacking",
    "weak",
    "disappointing",
    "frustrating",
    "confusing",
    "overpriced",
    "difficult",
    "steep learning curve",
    "not recommended",
    "avoid",
  ];

  let positiveCount = 0;
  let negativeCount = 0;

  for (const word of positiveWords) {
    if (lowerContext.includes(word)) positiveCount++;
  }

  for (const word of negativeWords) {
    if (lowerContext.includes(word)) negativeCount++;
  }

  if (positiveCount > negativeCount + 1) return "positive";
  if (negativeCount > positiveCount + 1) return "negative";
  return "neutral";
}

/**
 * Extract a context snippet around a brand mention.
 */
function extractContext(
  response: string,
  brandName: string,
  maxLength: number = 200
): string | null {
  const lowerResponse = response.toLowerCase();
  const lowerBrand = brandName.toLowerCase();
  const index = lowerResponse.indexOf(lowerBrand);

  if (index === -1) return null;

  // Find the start of the sentence/line containing the mention
  let start = Math.max(0, index - 50);
  // Try to align to a sentence or line boundary
  const lineStart = response.lastIndexOf("\n", index);
  if (lineStart > start) start = lineStart + 1;

  let end = Math.min(response.length, start + maxLength);
  // Try to end at a sentence boundary
  const sentenceEnd = response.indexOf(".", index + brandName.length);
  if (sentenceEnd > 0 && sentenceEnd < end + 50) end = sentenceEnd + 1;

  let snippet = response.slice(start, end).trim();

  // Clean up markdown formatting
  snippet = snippet
    .replace(/\*\*/g, "")
    .replace(/#{1,3}\s*/g, "")
    .replace(/^\d+\.\s*/, "")
    .trim();

  if (start > 0) snippet = "..." + snippet;
  if (end < response.length) snippet = snippet + "...";

  return snippet;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Calculate an overall visibility score (0-100) based on platform results.
 */
export function calculateVisibilityScore(
  results: { mentioned: boolean; position: number | null }[]
): number {
  if (results.length === 0) return 0;

  let score = 0;

  for (const result of results) {
    if (!result.mentioned) continue;

    // Base score for being mentioned (out of 100 per platform)
    let platformScore = 40;

    // Bonus for position
    if (result.position !== null) {
      if (result.position === 1) platformScore += 60;
      else if (result.position === 2) platformScore += 45;
      else if (result.position === 3) platformScore += 35;
      else if (result.position <= 5) platformScore += 20;
      else platformScore += 10;
    } else {
      // Mentioned but no clear position
      platformScore += 15;
    }

    score += platformScore;
  }

  // Normalize to 0-100 based on number of platforms
  return Math.min(100, Math.round(score / results.length));
}
