import Anthropic from "@anthropic-ai/sdk";

const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

export async function queryAnthropic(prompt: string): Promise<string> {
  if (!client) {
    throw new Error("Anthropic API key not configured");
  }

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.content[0];
  if (!content || content.type !== "text") {
    throw new Error("No response from Anthropic");
  }

  return content.text;
}

export function isAnthropicConfigured(): boolean {
  return !!process.env.ANTHROPIC_API_KEY;
}
