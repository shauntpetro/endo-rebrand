import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "EndoCyclic Therapeutics — Precision Medicine for Endometriosis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #2E263A 0%, #4A3F5C 50%, #2E263A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "#C9A961",
            marginBottom: "40px",
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "24px",
            letterSpacing: "-1px",
          }}
        >
          EndoCyclic Therapeutics
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#C9A961",
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: "800px",
          }}
        >
          Clinical-Stage Precision Medicine for Endometriosis
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "rgba(255, 255, 255, 0.6)",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          First-in-Class • Non-Hormonal • FDA IND Cleared
        </div>
      </div>
    ),
    { ...size }
  );
}
