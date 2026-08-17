import { NextRequest, NextResponse } from "next/server";
import { unsubscribeByToken } from "@/lib/subscribers";

// One-click unsubscribe (CAN-SPAM + RFC 8058).
//   GET  ?token=…  → a human clicked the link in an email; show a plain page.
//   POST ?token=…  → the mail client's one-click List-Unsubscribe-Post; 200 only.

function page(title: string, message: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#080808;color:#EAEAEA;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;">
<div style="max-width:460px;padding:40px;text-align:center;">
<div style="display:inline-block;height:10px;width:10px;background:#10b981;margin-bottom:24px;"></div>
<h1 style="font-size:22px;margin:0 0 12px;">${title}</h1>
<p style="color:#9ca3af;line-height:1.6;margin:0 0 28px;">${message}</p>
<a href="https://www.adsx.com" style="color:#10b981;text-decoration:none;font-size:14px;">&larr; Back to AdsX</a>
</div></body></html>`;
}

async function handle(token: string): Promise<boolean> {
  return unsubscribeByToken(token);
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  const ok = await handle(token);
  const html = ok
    ? page("You're unsubscribed", "You won't get any more emails from the AdsX starter series. Changed your mind? You can always sign up again from the blog.")
    : page("Already unsubscribed", "This link is no longer active — you're not on the list. Nothing more to do.");
  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") ?? "";
  await handle(token);
  // Mail-client one-click expects a bare 200; no body required.
  return new NextResponse(null, { status: 200 });
}
