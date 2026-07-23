import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EndoCyclic Therapeutics — Precision medicine, activated by disease.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RING = Array.from({ length: 9 }, (_, index) => {
  const angle = (index / 9) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 790 + Math.cos(angle) * 53,
    y: 325 + Math.sin(angle) * 53,
  };
});

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#fff8f4",
          color: "#392638",
          fontFamily: "Hanken Grotesk, Arial, sans-serif",
        }}
      >
        <svg
          aria-hidden="true"
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", inset: 0 }}
        >
          <path
            d="M862 -25 C796 90 842 155 800 228 C756 305 820 390 786 468 C758 533 784 585 744 662 H1240 V-25 Z"
            fill="#f7e8e7"
          />
          <path
            d="M862 -25 C796 90 842 155 800 228 C756 305 820 390 786 468 C758 533 784 585 744 662"
            fill="none"
            stroke="#c9798a"
            strokeWidth="3"
          />
          <path
            d="M542 442 C640 436 669 375 735 349 C760 339 769 334 790 325"
            fill="none"
            stroke="#d8b850"
            strokeWidth="3"
          />
          <path
            d="M843 325 C920 325 959 279 1040 260 C1118 241 1148 278 1228 238"
            fill="none"
            stroke="#43877d"
            strokeWidth="3"
          />
          <circle cx="1042" cy="260" r="54" fill="#e5f0eb" stroke="#43877d" strokeWidth="3" />
          {RING.map((node, index) => (
            <circle key={index} cx={node.x} cy={node.y} r="12" fill="#f1d8de" stroke="#8b4b62" strokeWidth="3" />
          ))}
          <circle cx="790" cy="325" r="53" fill="none" stroke="#8b4b62" strokeWidth="3" />
          <circle cx="1042" cy="260" r="12" fill="#fff8f4" stroke="#27675e" strokeWidth="3" />
          <circle cx="1092" cy="392" r="8" fill="#c9798a" />
          <circle cx="1144" cy="444" r="5" fill="#d8b850" />
          <circle cx="1008" cy="518" r="7" fill="#43877d" />
        </svg>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "62px 68px 54px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#43877d" }} />
            <span style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#27675e" }}>
              EndoCyclic Therapeutics
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", width: "690px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
              <span style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "#8b4b62" }}>
                Clinical-stage precision medicine
              </span>
              <span style={{ width: "62px", height: "1px", background: "#c9798a" }} />
            </div>
            <div style={{ fontSize: "72px", lineHeight: 1.02, letterSpacing: "-3.2px", fontWeight: 500 }}>
              Precision medicine, activated by disease.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              paddingTop: "20px",
              borderTop: "1px solid #39263826",
              fontSize: "18px",
              color: "#574650",
            }}
          >
            <span>ENDO-205</span>
            <span style={{ margin: "0 16px", color: "#c9798a" }}>·</span>
            <span>FDA IND Allowance (2026)</span>
            <span style={{ margin: "0 16px", color: "#c9798a" }}>·</span>
            <span>Phase 1</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
