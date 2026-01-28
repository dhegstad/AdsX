import { NextRequest, NextResponse } from "next/server";
import { queryOpenAI, isOpenAIConfigured } from "@/lib/llm/openai";
import { queryAnthropic, isAnthropicConfigured } from "@/lib/llm/anthropic";
import { analyzeResponse, calculateVisibilityScore } from "@/lib/llm/parser";
import type { PlatformResult, Platform, AuditResponse } from "@/types/visibility";

interface VisibilityRequest {
  brandName: string;
  brandUrl: string;
  category: string;
  competitors: string[];
}

export async function POST(request: NextRequest) {
  try {
    // TODO: Add auth check here once Better Auth is configured
    // const session = await auth.api.getSession({ headers: request.headers });
    // if (!session) {
    //   return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    // }

    const data: VisibilityRequest = await request.json();

    // Validation
    if (!data.brandName?.trim()) {
      return NextResponse.json(
        { success: false, errors: { brandName: "Brand name is required" } },
        { status: 400 }
      );
    }
    if (!data.category?.trim()) {
      return NextResponse.json(
        { success: false, errors: { category: "Category is required" } },
        { status: 400 }
      );
    }

    const brandName = data.brandName.trim().slice(0, 100);
    const category = data.category.trim().slice(0, 100);
    const competitors = (data.competitors || [])
      .map((c) => c.trim())
      .filter(Boolean)
      .slice(0, 10);

    // Full audit: multiple prompt variations for richer data
    const prompts = [
      `What are the best ${category} tools or services available today? Please provide a ranked list of your top 5-7 recommendations with a brief explanation for each.`,
      `I'm evaluating ${category} solutions for my business. What would you recommend? Please rank your top picks and explain the strengths of each.`,
      `Compare the top ${category} platforms. Which ones are the best and why? Provide a ranked list.`,
    ];

    // Use the first prompt for now (can expand to multiple later)
    const prompt = prompts[0];

    // Query all configured platforms
    const platformQueries: {
      platform: Platform;
      displayName: string;
      query: () => Promise<string>;
    }[] = [];

    if (isOpenAIConfigured()) {
      platformQueries.push({
        platform: "openai",
        displayName: "ChatGPT",
        query: () => queryOpenAI(prompt),
      });
    }
    if (isAnthropicConfigured()) {
      platformQueries.push({
        platform: "anthropic",
        displayName: "Claude",
        query: () => queryAnthropic(prompt),
      });
    }

    if (platformQueries.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No AI platforms configured. Please add API keys.",
        },
        { status: 503 }
      );
    }

    // Run queries in parallel
    const queryResults = await Promise.allSettled(
      platformQueries.map((pq) => pq.query())
    );

    // Parse results
    const results: PlatformResult[] = [];

    for (let i = 0; i < platformQueries.length; i++) {
      const pq = platformQueries[i];
      const result = queryResults[i];

      if (result.status === "fulfilled") {
        const analysis = analyzeResponse(
          result.value,
          brandName,
          competitors
        );
        results.push({
          platform: pq.platform,
          displayName: pq.displayName,
          brandAnalysis: analysis.brand,
          competitorAnalysis: analysis.competitors,
          rawResponse: result.value,
        });
      } else {
        results.push({
          platform: pq.platform,
          displayName: pq.displayName,
          brandAnalysis: {
            name: brandName,
            mentioned: false,
            position: null,
            sentiment: null,
            context: null,
          },
          competitorAnalysis: [],
          rawResponse: "",
          error: "Failed to query platform",
        });
      }
    }

    // Calculate summary
    const mentionedPlatforms = results.filter(
      (r) => r.brandAnalysis.mentioned && !r.error
    );
    const positions = mentionedPlatforms
      .map((r) => r.brandAnalysis.position)
      .filter((p): p is number => p !== null);

    const visibilityScore = calculateVisibilityScore(
      results.map((r) => ({
        mentioned: r.brandAnalysis.mentioned,
        position: r.brandAnalysis.position,
      }))
    );

    const response: AuditResponse = {
      success: true,
      results,
      summary: {
        visibilityScore,
        platformsMentioned: mentionedPlatforms.length,
        totalPlatforms: results.length,
        avgPosition:
          positions.length > 0
            ? Math.round(
                (positions.reduce((a, b) => a + b, 0) / positions.length) * 10
              ) / 10
            : null,
        bestPlatform:
          mentionedPlatforms.length > 0
            ? mentionedPlatforms.sort(
                (a, b) =>
                  (a.brandAnalysis.position ?? 99) -
                  (b.brandAnalysis.position ?? 99)
              )[0].displayName
            : null,
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Visibility audit error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
