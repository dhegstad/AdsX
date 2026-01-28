import { NextRequest, NextResponse } from "next/server";
import { queryOpenAI, isOpenAIConfigured } from "@/lib/llm/openai";
import { queryAnthropic, isAnthropicConfigured } from "@/lib/llm/anthropic";
import { analyzeResponse, calculateVisibilityScore } from "@/lib/llm/parser";
import type { PlatformResult, Platform, AuditResponse } from "@/types/visibility";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface FreeAuditRequest {
  firstName: string;
  lastName: string;
  email: string;
  brandName: string;
  brandUrl: string;
  category: string;
  competitors: string[];
}

export async function POST(request: NextRequest) {
  try {
    const data: FreeAuditRequest = await request.json();

    // Validation
    const errors: Record<string, string> = {};
    if (!data.firstName?.trim()) errors.firstName = "First name is required";
    if (!data.lastName?.trim()) errors.lastName = "Last name is required";
    if (!data.email?.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = "Invalid email address";
    if (!data.brandName?.trim()) errors.brandName = "Brand name is required";
    if (!data.brandUrl?.trim()) errors.brandUrl = "Website URL is required";
    else if (!/^https?:\/\/.+\..+/.test(data.brandUrl.trim()))
      errors.brandUrl = "Enter a valid URL";
    if (!data.category?.trim()) errors.category = "Category is required";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const brandName = data.brandName.trim().slice(0, 100);
    const brandUrl = data.brandUrl.trim().slice(0, 500);
    const category = data.category.trim().slice(0, 100);
    const competitors = (data.competitors || [])
      .map((c) => c.trim())
      .filter(Boolean)
      .slice(0, 5);

    // Optionally fetch and validate the URL (non-blocking)
    let urlMetadata: { title?: string; description?: string } | null = null;
    try {
      const urlResponse = await fetch(brandUrl, {
        method: "HEAD",
        signal: AbortSignal.timeout(5000),
      });
      if (!urlResponse.ok) {
        console.warn(`Brand URL returned status ${urlResponse.status}`);
      }
    } catch (e) {
      console.warn("Could not fetch brand URL:", e);
    }

    // Build the prompt
    const prompt = `What are the best ${category} tools or services available today? Please provide a ranked list of your top 5-7 recommendations with a brief explanation for each. Focus on well-known, reputable options that are currently popular in the market.`;

    // Query enabled platforms in parallel (free audit: up to 2)
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

    // Send lead notification email (non-blocking)
    sendLeadNotification(data, response).catch(console.error);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Free audit error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}

async function sendLeadNotification(
  data: FreeAuditRequest,
  auditResult: AuditResponse
) {
  if (!resend) return;

  const fromEmail = process.env.FROM_EMAIL || "hello@adsx.com";
  const contactEmail = process.env.CONTACT_EMAIL || "hello@adsx.com";

  await resend.emails.send({
    from: `AdsX Visibility Tracker <${fromEmail}>`,
    to: contactEmail,
    subject: `New Free Audit: ${data.brandName} (${data.category})`,
    html: `
      <h2>New Free Audit Lead</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Brand:</strong> ${data.brandName}</p>
      <p><strong>Website:</strong> <a href="${data.brandUrl}">${data.brandUrl}</a></p>
      <p><strong>Category:</strong> ${data.category}</p>
      <p><strong>Competitors:</strong> ${data.competitors.join(", ") || "None specified"}</p>
      <hr>
      <h3>Audit Results</h3>
      <p><strong>Visibility Score:</strong> ${auditResult.summary.visibilityScore}/100</p>
      <p><strong>Platforms Mentioned:</strong> ${auditResult.summary.platformsMentioned}/${auditResult.summary.totalPlatforms}</p>
      <p><strong>Avg Position:</strong> ${auditResult.summary.avgPosition ?? "Not ranked"}</p>
      <p><strong>Best Platform:</strong> ${auditResult.summary.bestPlatform ?? "N/A"}</p>
    `,
  });
}
