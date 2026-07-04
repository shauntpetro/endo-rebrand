import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "EndoCyclic Therapeutics — Non-hormonal precision medicine for endometriosis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#fbfaf8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "22px", letterSpacing: "3px", textTransform: "uppercase", color: "#2f6e62" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#4a9b8e" }} />
          <span>Clinical-stage precision medicine</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "64px", color: "#2e263a", lineHeight: 1.1, letterSpacing: "-1.5px", fontWeight: 500, maxWidth: "900px" }}>
            Medicine designed to act only where disease lives.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "24px", color: "#6f6a76" }}>
          <span>EndoCyclic Therapeutics</span>
          <span>Non-hormonal · Phase 1 · Irvine, CA</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
