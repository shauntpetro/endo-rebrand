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
          background: "#1A1524",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "22px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#E3C77E",
          }}
        >
          <span>EndoCyclic Therapeutics</span>
          <span>Irvine, CA</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: "96px", height: "3px", background: "#C9A961", marginBottom: "32px" }} />
          <div
            style={{
              fontSize: "92px",
              color: "#EDE7DA",
              lineHeight: 0.98,
              letterSpacing: "-3px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Correction,</span>
            <span>
              not <span style={{ color: "#E3C77E", fontStyle: "italic" }}>destruction.</span>
            </span>
          </div>
        </div>

        <div
          style={{
            fontSize: "26px",
            color: "rgba(237,231,218,0.72)",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          First-in-class · Non-hormonal · FDA IND Allowance for ENDO-205
        </div>
      </div>
    ),
    { ...size },
  );
}
