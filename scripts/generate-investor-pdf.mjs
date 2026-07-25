/**
 * Generates the tagged EndoCyclic Therapeutics public investor summary.
 *
 * Requirements:
 * - LibreOffice (`soffice`) on PATH, installed in /Applications on macOS,
 *   or supplied with SOFFICE_PATH.
 *
 * Run with: npm run pdf:investor
 */

import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const source = resolve(projectRoot, "docs/investor-summary-source.html");
const output = resolve(
  projectRoot,
  "public/downloads/endocyclic-investor-summary-v2.pdf",
);
const legacyOutput = resolve(
  projectRoot,
  "public/downloads/endocyclic-investor-summary.pdf",
);
const exportFilter =
  'pdf:writer_pdf_Export:{"UseTaggedPDF":{"type":"boolean","value":true},"PDFUACompliance":{"type":"boolean","value":true},"ExportBookmarks":{"type":"boolean","value":true}}';

function findSoffice() {
  const candidates = [
    process.env.SOFFICE_PATH,
    "/Applications/LibreOffice.app/Contents/MacOS/soffice",
    "/usr/bin/soffice",
    "/usr/local/bin/soffice",
    "/opt/homebrew/bin/soffice",
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }

  try {
    return execFileSync("which", ["soffice"], { encoding: "utf8" }).trim();
  } catch {
    throw new Error(
      "LibreOffice is required to generate the tagged investor PDF. Install LibreOffice or set SOFFICE_PATH.",
    );
  }
}

const temporaryDirectory = mkdtempSync(
  resolve(tmpdir(), "endocyclic-investor-pdf-"),
);

try {
  execFileSync(
    findSoffice(),
    [
      "--headless",
      "--convert-to",
      exportFilter,
      "--outdir",
      temporaryDirectory,
      source,
    ],
    { stdio: "inherit" },
  );

  const generatedPdf = resolve(
    temporaryDirectory,
    "investor-summary-source.pdf",
  );
  if (!existsSync(generatedPdf)) {
    throw new Error("LibreOffice did not create the expected investor PDF.");
  }

  mkdirSync(dirname(output), { recursive: true });
  copyFileSync(generatedPdf, output);
  copyFileSync(generatedPdf, legacyOutput);
  console.log(`Generated tagged investor summary: ${output}`);
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
