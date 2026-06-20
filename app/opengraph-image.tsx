import { ImageResponse } from "next/og";

export const alt =
  "Gala D. — Customer Success Manager. Sales results, technical depth.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#f6f7f6",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#0b6e4f",
              color: "#ffffff",
              padding: "10px 22px",
              borderRadius: 999,
              fontSize: 24,
              letterSpacing: "0.12em",
              fontFamily: "Arial, sans-serif",
              fontWeight: 700,
            }}
          >
            CUSTOMER SUCCESS MANAGER
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            lineHeight: 1.12,
            fontWeight: 600,
            color: "#14181a",
            maxWidth: 980,
            letterSpacing: "-0.02em",
          }}
        >
          Sales results, technical depth — ready for Customer Success.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: "#14181a" }}>
            Gala&nbsp;D.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#586862",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Onboarding · Retention · Account management
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
