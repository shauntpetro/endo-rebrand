/**
 * Generates the EndoCyclic Therapeutics Investor Summary PDF.
 * Run with: node scripts/generate-investor-pdf.mjs
 */

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, "../public/downloads/endocyclic-investor-summary.pdf");

// Design tokens
const GOLD = rgb(201 / 255, 169 / 255, 97 / 255);
const PLUM = rgb(74 / 255, 63 / 255, 92 / 255);
const PLUM_DARK = rgb(46 / 255, 38 / 255, 58 / 255);
const BLACK = rgb(26 / 255, 26 / 255, 26 / 255);
const GRAY = rgb(100 / 255, 100 / 255, 100 / 255);
const WHITE = rgb(1, 1, 1);
const CREAM = rgb(245 / 255, 241 / 255, 232 / 255);
const TEAL = rgb(74 / 255, 155 / 255, 142 / 255);

const PAGE_W = 612; // Letter
const PAGE_H = 792;
const MARGIN = 50;
const CONTENT_W = PAGE_W - 2 * MARGIN;

async function main() {
  const pdf = await PDFDocument.create();
  const helvetica = await pdf.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  // Helper: draw wrapped text, returns final Y
  function drawWrapped(page, text, x, y, font, size, color, maxW, lineHeight) {
    const words = text.split(" ");
    let line = "";
    let curY = y;
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(test, size) > maxW && line) {
        page.drawText(line, { x, y: curY, font, size, color });
        curY -= lineHeight;
        line = word;
      } else {
        line = test;
      }
    }
    if (line) {
      page.drawText(line, { x, y: curY, font, size, color });
      curY -= lineHeight;
    }
    return curY;
  }

  // Helper: section header with gold bar
  function sectionHeader(page, title, y) {
    page.drawRectangle({ x: MARGIN, y: y - 1, width: 40, height: 2, color: GOLD });
    page.drawText(title.toUpperCase(), {
      x: MARGIN + 48,
      y: y - 4,
      font: helveticaBold,
      size: 8,
      color: GOLD,
    });
    return y - 22;
  }

  // ──────────────── PAGE 1: Cover + Overview ────────────────
  const p1 = pdf.addPage([PAGE_W, PAGE_H]);

  // Dark header band
  p1.drawRectangle({ x: 0, y: PAGE_H - 160, width: PAGE_W, height: 160, color: PLUM_DARK });

  // Gold accent line
  p1.drawRectangle({ x: 0, y: PAGE_H - 162, width: PAGE_W, height: 2, color: GOLD });

  // Company name
  p1.drawText("ENDOCYCLIC THERAPEUTICS", {
    x: MARGIN,
    y: PAGE_H - 60,
    font: helveticaBold,
    size: 10,
    color: GOLD,
  });

  // Title
  p1.drawText("Investor Summary", {
    x: MARGIN,
    y: PAGE_H - 95,
    font: helveticaBold,
    size: 32,
    color: WHITE,
  });

  // Subtitle
  p1.drawText("Clinical-Stage Precision Medicine  |  Non-Hormonal  |  First-in-Class", {
    x: MARGIN,
    y: PAGE_H - 125,
    font: helvetica,
    size: 10,
    color: rgb(1, 1, 1, 0.7),
  });

  // Date
  p1.drawText("2026  |  Confidential", {
    x: MARGIN,
    y: PAGE_H - 145,
    font: helvetica,
    size: 8,
    color: rgb(1, 1, 1, 0.5),
  });

  let y = PAGE_H - 195;

  // Company Overview
  y = sectionHeader(p1, "Company Overview", y);
  y = drawWrapped(
    p1,
    "EndoCyclic Therapeutics, Inc. is a clinical-stage precision medicine company in Irvine, California. Led by founder and CEO Dr. Tanya Petrossian, PhD, the company is developing first-in-class, non-hormonal therapeutics and diagnostics for endometriosis and oncology using a proprietary precision peptide platform with pH-mediated activation.",
    MARGIN, y, helvetica, 9.5, BLACK, CONTENT_W, 14
  );
  y -= 8;
  y = drawWrapped(
    p1,
    "The platform enables selective uptake by diseased tissue via a proprietary endocytic pathway, designed to act only in diseased tissue while avoiding hormones, surgery, and systemic toxicity. EndoCyclic is a founding member of the Milken Institute Women's Health Network.",
    MARGIN, y, helvetica, 9.5, BLACK, CONTENT_W, 14
  );
  y -= 18;

  // Key Metrics bar
  p1.drawRectangle({ x: MARGIN, y: y - 55, width: CONTENT_W, height: 60, color: CREAM });
  const metricX = [MARGIN + 15, MARGIN + 143, MARGIN + 275, MARGIN + 400];
  const metricVals = ["$200B", "190M+", "IND Allowance", 'Perfect "10"'];
  const metricLabels = ["US economic burden", "Women affected", "FDA milestone", "NIH grant score"];
  for (let i = 0; i < 4; i++) {
    p1.drawText(metricVals[i], { x: metricX[i], y: y - 22, font: helveticaBold, size: 16, color: PLUM });
    p1.drawText(metricLabels[i], { x: metricX[i], y: y - 38, font: helvetica, size: 7.5, color: GRAY });
  }
  y -= 75;

  // Market Opportunity
  y = sectionHeader(p1, "Market Opportunity", y);
  const marketPoints = [
    "$180B-$250B global market potential for endometriosis treatments (McKinsey estimate)",
    "10% of reproductive-age women globally - 190M+ affected, leading cause of infertility and chronic pelvic pain",
    "$200B annual economic burden in the United States",
    "8-year average diagnostic delay",
  ];
  for (const point of marketPoints) {
    p1.drawText("-", { x: MARGIN + 4, y, font: helveticaBold, size: 9, color: GOLD });
    y = drawWrapped(p1, point, MARGIN + 16, y, helvetica, 9, BLACK, CONTENT_W - 16, 13);
    y -= 3;
  }
  y -= 12;

  // Disease burden callout
  p1.drawRectangle({ x: MARGIN, y: y - 38, width: CONTENT_W, height: 42, color: PLUM_DARK });
  p1.drawText("THE CARE GAP:", { x: MARGIN + 12, y: y - 15, font: helveticaBold, size: 8, color: GOLD });
  p1.drawText(
    "Current therapies are largely hormone-based and symptomatic; they do not eliminate lesions or modify disease biology.",
    { x: MARGIN + 12, y: y - 30, font: helvetica, size: 8.5, color: WHITE }
  );
  y -= 58;

  // Footer
  p1.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: 30, color: PLUM_DARK });
  p1.drawText("ENDOCYCLIC THERAPEUTICS, INC.  |  CONFIDENTIAL  |  PAGE 1", {
    x: MARGIN, y: 10, font: helvetica, size: 7, color: rgb(1, 1, 1, 0.5),
  });

  // ──────────────── PAGE 2: Pipeline + Milestones + Team ────────────────
  const p2 = pdf.addPage([PAGE_W, PAGE_H]);

  // Header bar
  p2.drawRectangle({ x: 0, y: PAGE_H - 40, width: PAGE_W, height: 40, color: PLUM_DARK });
  p2.drawText("ENDOCYCLIC THERAPEUTICS", { x: MARGIN, y: PAGE_H - 27, font: helveticaBold, size: 8, color: GOLD });
  p2.drawText("Investor Summary", { x: PAGE_W - MARGIN - 80, y: PAGE_H - 27, font: helvetica, size: 8, color: WHITE });

  y = PAGE_H - 70;

  // Pipeline
  y = sectionHeader(p2, "Clinical Pipeline", y);

  // Pipeline table header
  p2.drawRectangle({ x: MARGIN, y: y - 13, width: CONTENT_W, height: 18, color: PLUM_DARK });
  const colX = [MARGIN + 8, MARGIN + 90, MARGIN + 250, MARGIN + 340];
  ["Program", "Indication", "Stage", "Key Differentiator"].forEach((h, i) => {
    p2.drawText(h.toUpperCase(), { x: colX[i], y: y - 9, font: helveticaBold, size: 7, color: WHITE });
  });
  y -= 18;

  const pipeline = [
    { name: "ENDO-205", indication: "Endometriosis therapeutic", stage: "Phase 1", diff: "FDA IND Allowance (2026); first-in-class, non-hormonal, short-course, disease-modifying precision peptide therapeutic" },
    { name: "FemLUNA(TM)", indication: "Endometriosis imaging", stage: "IND-enabling", diff: "Targeted imaging agent capable of detecting superficial and sub-millimeter lesions often missed by current imaging" },
    { name: "ENDO-995", indication: "Malignant solid tumors", stage: "Pre-clinical", diff: "Investigational tumor-selective, non-hormonal therapeutic peptide" },
    { name: "ENDO-311", indication: "Solid tumor diagnostics", stage: "Pre-clinical", diff: "Investigational targeted imaging agent paired with ENDO-995" },
  ];

  for (const item of pipeline) {
    // Calculate row height based on differentiator text
    const diffLines = Math.ceil(helvetica.widthOfTextAtSize(item.diff, 8) / (CONTENT_W - colX[3] + MARGIN - 8));
    const rowH = Math.max(28, diffLines * 11 + 12);

    if (pipeline.indexOf(item) % 2 === 0) {
      p2.drawRectangle({ x: MARGIN, y: y - rowH + 5, width: CONTENT_W, height: rowH, color: CREAM });
    }

    p2.drawText(item.name, { x: colX[0], y: y - 8, font: helveticaBold, size: 9, color: PLUM });
    p2.drawText(item.indication, { x: colX[1], y: y - 8, font: helvetica, size: 8, color: BLACK });
    p2.drawText(item.stage, { x: colX[2], y: y - 8, font: helveticaBold, size: 7.5, color: TEAL });
    drawWrapped(p2, item.diff, colX[3], y - 8, helvetica, 8, GRAY, CONTENT_W - (colX[3] - MARGIN) - 8, 11);
    y -= rowH;
  }
  y -= 18;

  // Milestones & Validation
  y = sectionHeader(p2, "Milestones & Validation", y);
  const milestones = [
    "FDA IND Allowance achieved for ENDO-205 (2026); Phase 1 first-in-human clinical study",
    "NIH perfect score of 10 on a Commercialization Readiness Pilot grant",
    "Multiple NIH awards from NICHD",
    "Recognized as an NIH SBIR Success Story",
    "Fast Track filing underway",
    "No dose-limiting toxicities observed in GLP toxicology studies (preclinical)",
    "NIH-backed, with UCLA partnership, RADx Tech validation, and White House recognition",
    "Founding member, Milken Institute Women's Health Network",
  ];
  for (const m of milestones) {
    p2.drawText(">", { x: MARGIN + 4, y, font: helveticaBold, size: 9, color: TEAL });
    y = drawWrapped(p2, m, MARGIN + 18, y, helvetica, 8.5, BLACK, CONTENT_W - 18, 12);
    y -= 3;
  }
  y -= 14;

  // Leadership
  y = sectionHeader(p2, "Leadership", y);
  const leaders = [
    { name: "Tanya Petrossian, Ph.D.", role: "CEO, Founder & Inventor", detail: "UCLA Biochemistry; 15+ years peptide therapeutics; LA Entrepreneur in Residence; Biocom Catalyst Award" },
    { name: "Melanie Hartsough, Ph.D.", role: "Nonclinical Toxicology", detail: "Former FDA reviewer (CBER/CDER); President, American Board of Toxicology" },
    { name: "David Lin, Ph.D.", role: "CMC", detail: "27+ years pharma regulatory; former FDA acting Division Director (CDER)" },
    { name: "Andrea Lukes, MD", role: "Clinical Affairs", detail: "Board-certified OB/GYN, FACOG; 90+ clinical trials in women's health" },
    { name: "Aileen Ryan, MS", role: "Regulatory Affairs", detail: "40+ years regulatory; former Bayer Pharma, Ludwig Institute" },
    { name: "Miganush Stepanians, Ph.D.", role: "Biostatistics", detail: "Ph.D. Statistics (BU), M.S. Math (MIT); 20+ successful NDAs/MAAs" },
    { name: "Frank Fernandez", role: "CFO", detail: "Decades of financial leadership in life sciences" },
  ];
  for (const l of leaders) {
    p2.drawText(l.name, { x: MARGIN, y, font: helveticaBold, size: 8.5, color: PLUM });
    p2.drawText(`  -  ${l.role}`, { x: MARGIN + helveticaBold.widthOfTextAtSize(l.name, 8.5), y, font: helvetica, size: 8.5, color: GOLD });
    y -= 10;
    p2.drawText(l.detail, { x: MARGIN + 8, y, font: helvetica, size: 7, color: GRAY });
    y -= 12;
  }

  // Footer
  p2.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: 30, color: PLUM_DARK });
  p2.drawText("ENDOCYCLIC THERAPEUTICS, INC.  |  CONFIDENTIAL  |  PAGE 2", {
    x: MARGIN, y: 10, font: helvetica, size: 7, color: rgb(1, 1, 1, 0.5),
  });

  // ──────────────── PAGE 3: Investment Thesis + Contact ────────────────
  const p3 = pdf.addPage([PAGE_W, PAGE_H]);

  // Header bar
  p3.drawRectangle({ x: 0, y: PAGE_H - 40, width: PAGE_W, height: 40, color: PLUM_DARK });
  p3.drawText("ENDOCYCLIC THERAPEUTICS", { x: MARGIN, y: PAGE_H - 27, font: helveticaBold, size: 8, color: GOLD });
  p3.drawText("Investor Summary", { x: PAGE_W - MARGIN - 80, y: PAGE_H - 27, font: helvetica, size: 8, color: WHITE });

  y = PAGE_H - 70;

  // Investment Thesis
  y = sectionHeader(p3, "Investment Thesis", y);
  const thesisPoints = [
    {
      title: "Clinical-Stage Lead in a $180B-$250B Market",
      text: "ENDO-205 is a first-in-class, non-hormonal precision peptide therapeutic with FDA IND Allowance (2026), now in Phase 1. It is designed as a short-course, disease-modifying treatment for endometriosis.",
    },
    {
      title: "Regulatory and External Milestones",
      text: "FDA IND Allowance, a perfect NIH grant score of 10, multiple NICHD awards, and NIH SBIR Success Story recognition mark the path into clinical-stage development.",
    },
    {
      title: "One Platform, Four Precision Programs",
      text: "The proprietary precision peptide platform spans ENDO-205 and FemLUNA for endometriosis, plus the ENDO-995 therapeutic and ENDO-311 diagnostic pair for oncology.",
    },
    {
      title: "Significant Unmet Need",
      text: "Endometriosis affects more than 190 million women worldwide, carries a $200 billion annual economic burden in the United States, and takes an average of eight years to diagnose.",
    },
    {
      title: "Founder-Led Development Team",
      text: "Founder and CEO Dr. Tanya Petrossian leads expertise across nonclinical toxicology, CMC, clinical affairs, regulatory affairs, biostatistics, and finance.",
    },
  ];

  for (const t of thesisPoints) {
    p3.drawText(t.title, { x: MARGIN, y, font: helveticaBold, size: 11, color: PLUM });
    y -= 16;
    y = drawWrapped(p3, t.text, MARGIN, y, helvetica, 9, BLACK, CONTENT_W, 13.5);
    y -= 12;
  }
  y -= 6;

  // Current Standard of Care comparison
  y = sectionHeader(p3, "Why Non-Hormonal Matters", y);
  p3.drawRectangle({ x: MARGIN, y: y - 85, width: CONTENT_W, height: 90, color: CREAM });

  // Two columns
  const halfW = CONTENT_W / 2 - 10;
  p3.drawText("CURRENT STANDARD OF CARE", { x: MARGIN + 12, y: y - 12, font: helveticaBold, size: 7.5, color: GRAY });
  const socPoints = [
    "Largely hormone-based",
    "Primarily symptomatic",
    "Does not eliminate lesions",
    "Does not modify disease biology",
  ];
  let socY = y - 28;
  for (const s of socPoints) {
    p3.drawText("-", { x: MARGIN + 12, y: socY, font: helveticaBold, size: 8, color: rgb(0.8, 0.2, 0.2) });
    socY = drawWrapped(p3, s, MARGIN + 24, socY, helvetica, 7.5, GRAY, halfW - 24, 10);
    socY -= 2;
  }

  const col2X = MARGIN + CONTENT_W / 2 + 10;
  p3.drawText("ENDOCYCLIC APPROACH", { x: col2X, y: y - 12, font: helveticaBold, size: 7.5, color: PLUM });
  const endoPoints = [
    "Non-hormonal precision peptide mechanism",
    "Designed to eliminate lesions and modify disease",
    "Short-course, disease-modifying treatment",
    "Designed to avoid hormones, surgery, and systemic toxicity",
  ];
  let endoY = y - 28;
  for (const e of endoPoints) {
    p3.drawText("+", { x: col2X, y: endoY, font: helveticaBold, size: 8, color: TEAL });
    endoY = drawWrapped(p3, e, col2X + 12, endoY, helvetica, 7.5, BLACK, halfW - 12, 10);
    endoY -= 2;
  }
  y -= 110;

  // Contact
  y -= 10;
  y = sectionHeader(p3, "Contact & Next Steps", y);
  y -= 4;
  p3.drawText("EndoCyclic Therapeutics, Inc.", { x: MARGIN, y, font: helveticaBold, size: 12, color: PLUM });
  y -= 18;
  p3.drawText("Irvine, California", { x: MARGIN, y, font: helvetica, size: 9.5, color: BLACK });
  y -= 16;
  p3.drawText("info@endocyclic.com", { x: MARGIN, y, font: helvetica, size: 9.5, color: GOLD });
  y -= 16;
  p3.drawText("endocyclic.com/investors", { x: MARGIN, y, font: helvetica, size: 9.5, color: GOLD });
  y -= 30;

  // Disclaimer
  p3.drawRectangle({ x: MARGIN, y: y - 65, width: CONTENT_W, height: 70, color: CREAM });
  y -= 12;
  p3.drawText("IMPORTANT NOTICE", { x: MARGIN + 10, y, font: helveticaBold, size: 7, color: GRAY });
  y -= 12;
  drawWrapped(
    p3,
    "This document is provided for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities. All statements regarding the company's pipeline, clinical programs, and market opportunity are forward-looking statements subject to risks and uncertainties. ENDO-205 is an investigational product and has not been approved by the FDA for any indication. Past performance of NIH-funded programs does not guarantee future clinical or commercial success.",
    MARGIN + 10, y, helvetica, 7, GRAY, CONTENT_W - 20, 10
  );

  // Footer
  p3.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: 30, color: PLUM_DARK });
  p3.drawText("ENDOCYCLIC THERAPEUTICS, INC.  |  CONFIDENTIAL  |  PAGE 3", {
    x: MARGIN, y: 10, font: helvetica, size: 7, color: rgb(1, 1, 1, 0.5),
  });

  // Save
  const bytes = await pdf.save();
  writeFileSync(OUTPUT, bytes);
  console.log(`\u2713 Investor summary PDF generated: ${OUTPUT} (${bytes.length} bytes, 3 pages)`);
}

main().catch(console.error);
