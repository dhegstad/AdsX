import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const alt = "AdsX Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Category colors
const categoryColors: Record<string, { bg: string; text: string }> = {
  Guide: { bg: "#059669", text: "#ffffff" },
  Strategy: { bg: "#7c3aed", text: "#ffffff" },
  Research: { bg: "#2563eb", text: "#ffffff" },
  "How-To": { bg: "#ea580c", text: "#ffffff" },
  "Case Studies": { bg: "#db2777", text: "#ffffff" },
  Analysis: { bg: "#0891b2", text: "#ffffff" },
  Resource: { bg: "#65a30d", text: "#ffffff" },
};

const categoryIcons: Record<string, string> = {
  Guide: "📚",
  Strategy: "🎯",
  Research: "🔬",
  "How-To": "🛠️",
  "Case Studies": "📊",
  Analysis: "🔍",
  Resource: "📋",
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ color: "#ffffff", fontSize: 48 }}>Post Not Found</div>
        </div>
      ),
      { ...size }
    );
  }

  const colors = categoryColors[post.category] || { bg: "#059669", text: "#ffffff" };
  const icon = categoryIcons[post.category] || "📝";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #111111 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "60px",
            height: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "40px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(16, 185, 129, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#10b981", fontSize: "24px", fontWeight: "bold" }}>X</span>
              </div>
              <span style={{ color: "#ffffff", fontSize: "28px", fontWeight: "bold" }}>AdsX</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: colors.bg,
                color: colors.text,
                padding: "10px 20px",
                borderRadius: "24px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              <span>{icon}</span>
              <span>{post.category}</span>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <h1
              style={{
                color: "#ffffff",
                fontSize: post.title.length > 60 ? "48px" : "56px",
                fontWeight: "bold",
                lineHeight: 1.2,
                margin: 0,
                maxWidth: "900px",
              }}
            >
              {post.title}
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "40px",
              paddingTop: "30px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "28px",
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#ffffff", fontSize: "20px", fontWeight: "bold" }}>
                  {post.author.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#ffffff", fontSize: "20px", fontWeight: "600" }}>
                  {post.author.name}
                </span>
                <span style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "16px" }}>
                  {post.author.role}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <span style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "18px" }}>
                {post.readingTime}
              </span>
              <span style={{ color: "#10b981", fontSize: "18px", fontWeight: "600" }}>
                adsx.com/blog
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
