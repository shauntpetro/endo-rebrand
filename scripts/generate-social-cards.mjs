import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.env.FONTCONFIG_FILE ??= path.join(
  ROOT,
  "scripts",
  "fonts",
  "fonts.conf",
);
const { default: sharp } = await import("sharp");

const PUBLIC = path.join(ROOT, "public");
const OUTPUT = path.join(PUBLIC, "social");
const FONT = path.join(
  ROOT,
  "scripts",
  "fonts",
  "HankenGrotesk[wght].ttf",
);
const LOGO = path.join(PUBLIC, "logo.avif");

const WIDTH = 1200;
const HEIGHT = 630;
const PAPER = "#fff8f4";
const INK = "#392638";
const TEAL_INK = "#27675e";
const MUTED = "#6d5e66";

const cards = [
  {
    route: "/",
    filename: "endocyclic-home-v6.jpg",
    label: "CLINICAL-STAGE PRECISION MEDICINE",
    headline: "Precision peptides,\nactivated through pH.",
    art: "illustrations/hero-home-v8.avif",
    position: "centre",
    disclosure: "ENDO-205 lesion elimination: preclinical · not a clinical outcome",
  },
  {
    route: "/innovation",
    filename: "endocyclic-innovation-v5.jpg",
    label: "PRECISION PEPTIDE PLATFORM",
    headline: "A selective route into\ndiseased tissue.",
    art: "illustrations/selective-mechanism-v11.avif",
    position: "centre",
    focus: "engage-clear",
    disclosure: "Stage 04: ENDO-205 preclinical lesion elimination",
  },
  {
    route: "/pipeline",
    filename: "endocyclic-pipeline-v3.jpg",
    label: "DEVELOPMENT PORTFOLIO",
    headline: "One precision peptide\nplatform. Four programs.",
    art: "illustrations/pipeline-portfolio-wide-v2.avif",
    position: "centre",
  },
  {
    route: "/imaging",
    filename: "endocyclic-imaging-v2.jpg",
    label: "FEMLUNA™ · IND-ENABLING",
    headline: "Find what current\nimaging can miss.",
    art: "illustrations/femluna-targeting-v3-portrait.avif",
    mode: "portrait",
  },
  {
    route: "/impact",
    filename: "endocyclic-impact-v1.jpg",
    label: "THE ENDOMETRIOSIS BURDEN",
    headline: "A disease affecting more\nthan 190 million women.",
    art: "illustrations/endometriosis-biology-v1.avif",
    position: "centre",
    flop: true,
  },
  {
    route: "/team",
    filename: "endocyclic-team-v11.jpg",
    label: "FOUNDER LEADERSHIP",
    headline: "Founder-led into\nthe clinic.",
    art: "illustrations/platform-breadth-v3.avif",
    mode: "portrait-team",
    fontSize: 46,
  },
  {
    route: "/news",
    filename: "endocyclic-news-v2.jpg",
    label: "NEWS & RECOGNITION",
    headline: "Milestones and recognition,\nat the source.",
    art: "illustrations/news-regulatory-threshold-v2.avif",
    position: "centre",
  },
  {
    route: "/contact",
    filename: "endocyclic-contact-v3.jpg",
    label: "CONTACT",
    headline: "Connect with\nEndoCyclic.",
    art: "illustrations/platform-breadth-v3.avif",
    position: "centre",
  },
  {
    route: "/investors",
    filename: "endocyclic-investors-v3.jpg",
    label: "INVESTOR RELATIONS",
    headline: "ENDO-205: FDA IND\nAllowance. Phase 1.",
    art: "illustrations/investor-platform-v3.avif",
    position: "centre",
  },
  {
    route: "/media",
    filename: "endocyclic-media-v9.jpg",
    label: "PRESS RESOURCES",
    headline: "Accurate company information,\nready to use.",
    art: "illustrations/selective-mechanism-v11.avif",
    position: "centre",
    focus: "engage-clear",
    disclosure: "ENDO-205 lesion elimination: preclinical · not a clinical outcome",
  },
];

function svgBuffer(markup) {
  return Buffer.from(markup);
}

function leftReadabilityGradient(
  opacityAtEnd = 0.08,
  profile = "default",
) {
  const compact = profile === "engage-clear";
  const solidEnd = compact ? 38 : 46;
  const softEnd = compact ? 52 : 61;
  const clearEnd = compact ? 66 : 76;
  const softOpacity = compact ? 0.82 : 0.88;
  const clearOpacity = compact ? 0.12 : 0.28;

  return svgBuffer(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
      <defs>
        <linearGradient id="paper" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${PAPER}" stop-opacity="1"/>
          <stop offset="${solidEnd}%" stop-color="${PAPER}" stop-opacity="0.99"/>
          <stop offset="${softEnd}%" stop-color="${PAPER}" stop-opacity="${softOpacity}"/>
          <stop offset="${clearEnd}%" stop-color="${PAPER}" stop-opacity="${clearOpacity}"/>
          <stop offset="100%" stop-color="${PAPER}" stop-opacity="${opacityAtEnd}"/>
        </linearGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#paper)"/>
    </svg>
  `);
}

function threadBuffer() {
  return svgBuffer(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
      <defs>
        <linearGradient id="thread" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#c9798a"/>
          <stop offset="52%" stop-color="#d8b850"/>
          <stop offset="100%" stop-color="#43877d"/>
        </linearGradient>
      </defs>
      <circle cx="72" cy="538" r="5" fill="#43877d"/>
      <rect x="72" y="536.5" width="1056" height="3" rx="1.5" fill="url(#thread)"/>
    </svg>
  `);
}

async function textBuffer({
  text,
  font,
  colour,
  width,
  height,
  spacing,
  weight = 500,
}) {
  const escaped = text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  return sharp({
    text: {
      text: `<span foreground="${colour}" weight="${weight}">${escaped}</span>`,
      font,
      fontfile: FONT,
      width,
      height,
      spacing,
      align: "left",
      rgba: true,
      wrap: "word",
    },
  })
    .png()
    .toBuffer();
}

async function roundedPortrait() {
  const width = 300;
  const height = 380;
  const portrait = await sharp(
    path.join(PUBLIC, "team", "tanya-petrossian-v2.avif"),
  )
    .resize(width, height, { fit: "cover", position: "north" })
    .png()
    .toBuffer();
  const mask = svgBuffer(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="${width}" height="${height}" rx="150" fill="white"/>
    </svg>
  `);

  return sharp(portrait)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function baseFor(card) {
  const artPath = path.join(PUBLIC, card.art);

  if (card.mode === "portrait") {
    const portrait = await sharp(artPath)
      .resize(520, HEIGHT, { fit: "cover", position: "centre" })
      .png()
      .toBuffer();

    return sharp({
      create: {
        width: WIDTH,
        height: HEIGHT,
        channels: 3,
        background: PAPER,
      },
    })
      .composite([
        { input: portrait, left: 680, top: 0 },
        { input: leftReadabilityGradient(0.04), left: 0, top: 0 },
      ])
      .png()
      .toBuffer();
  }

  if (card.mode === "portrait-team") {
    const tissue = await sharp(artPath)
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
      .modulate({ saturation: 0.78, brightness: 1.03 })
      .png()
      .toBuffer();
    const portrait = await roundedPortrait();
    const mat = svgBuffer(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
        <defs>
          <linearGradient id="veil" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="${PAPER}" stop-opacity="1"/>
            <stop offset="56%" stop-color="${PAPER}" stop-opacity="0.98"/>
            <stop offset="100%" stop-color="#f4e7d8" stop-opacity="0.82"/>
          </linearGradient>
        </defs>
        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#veil)"/>
        <ellipse cx="948" cy="325" rx="214" ry="248" fill="#f1d8de" opacity="0.76"/>
        <ellipse cx="948" cy="325" rx="185" ry="222" fill="none" stroke="#392638" stroke-opacity="0.13"/>
      </svg>
    `);

    return sharp(tissue)
      .composite([
        { input: mat, left: 0, top: 0 },
        { input: portrait, left: 798, top: 118 },
      ])
      .png()
      .toBuffer();
  }

  if (card.focus === "engage-clear") {
    const art = await sharp(artPath)
      .resize(1500, 750, {
        fit: "cover",
        position: "centre",
      })
      .extract({ left: 60, top: 60, width: WIDTH, height: HEIGHT })
      .png()
      .toBuffer();

    return sharp(art)
      .composite([
        {
          input: leftReadabilityGradient(0.02, "engage-clear"),
          left: 0,
          top: 0,
        },
      ])
      .png()
      .toBuffer();
  }

  let pipeline = sharp(artPath);
  if (card.flop) pipeline = pipeline.flop();
  const art = await pipeline
    .resize(WIDTH, HEIGHT, {
      fit: "cover",
      position: card.position ?? "centre",
    })
    .png()
    .toBuffer();

  return sharp(art)
    .composite([
      { input: leftReadabilityGradient(), left: 0, top: 0 },
    ])
    .png()
    .toBuffer();
}

async function generateCard(card) {
  const [base, logo, label, headline, disclosure] = await Promise.all([
    baseFor(card),
    sharp(LOGO).resize({ width: 280 }).png().toBuffer(),
    textBuffer({
      text: card.label,
      font: "Hanken Grotesk SemiBold 19",
      colour: TEAL_INK,
      width: 520,
      height: 28,
      spacing: 0,
      weight: 600,
    }),
    textBuffer({
      text: card.headline,
      font: `Hanken Grotesk Medium ${card.fontSize ?? 50}`,
      colour: INK,
      width: 650,
      height: card.mode === "portrait-team" ? undefined : 165,
      spacing: 0,
      weight: 500,
    }),
    textBuffer({
      text:
        card.disclosure ??
        (card.route === "/team"
          ? "Founder-led · clinical-stage precision medicine"
          : "Conceptual illustration · not clinical imagery"),
      font: "Hanken Grotesk Regular 17",
      colour: MUTED,
      width: 520,
      height: 25,
      spacing: 0,
      weight: 400,
    }),
  ]);

  const outputPath = path.join(OUTPUT, card.filename);
  await sharp(base)
    .composite([
      { input: logo, left: 72, top: 44 },
      {
        input: svgBuffer(`
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
            <circle cx="7" cy="7" r="6" fill="#43877d"/>
          </svg>
        `),
        left: 72,
        top: 177,
      },
      { input: label, left: 96, top: 169 },
      { input: headline, left: 72, top: 220 },
      { input: threadBuffer(), left: 0, top: 0 },
      { input: disclosure, left: 72, top: 564 },
    ])
    .flatten({ background: PAPER })
    .toColourspace("srgb")
    .jpeg({
      quality: 82,
      progressive: true,
      mozjpeg: true,
    })
    .toFile(outputPath);

  const metadata = await sharp(outputPath).metadata();
  const size = (await import("node:fs/promises")).stat(outputPath);
  const bytes = (await size).size;

  if (
    metadata.format !== "jpeg" ||
    metadata.width !== WIDTH ||
    metadata.height !== HEIGHT ||
    bytes > 300_000
  ) {
    throw new Error(
      `${card.filename} failed output contract: ` +
        `${metadata.format} ${metadata.width}x${metadata.height} ${bytes} bytes`,
    );
  }

  console.log(
    `${card.route.padEnd(12)} ${card.filename.padEnd(36)} ${Math.round(bytes / 1024)} KB`,
  );
}

await mkdir(OUTPUT, { recursive: true });
for (const card of cards) {
  await generateCard(card);
}
