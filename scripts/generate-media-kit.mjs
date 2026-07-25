import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  stat,
  utimes,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const run = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const MEDIA = path.join(PUBLIC, "downloads", "media");
const mediaKitRelease = JSON.parse(
  await readFile(
    path.join(ROOT, "lib", "media-kit-release.json"),
    "utf8",
  ),
);

if (
  !Number.isInteger(mediaKitRelease.version) ||
  mediaKitRelease.version < 1 ||
  !/^\d{4}-\d{2}-\d{2}$/.test(mediaKitRelease.releaseDate) ||
  mediaKitRelease.archiveName !==
    `endocyclic-media-kit-web-v${mediaKitRelease.version}`
) {
  throw new Error("Media-kit release metadata is invalid.");
}

const FIXED_ARCHIVE_DATE = new Date(
  `${mediaKitRelease.releaseDate}T00:00:00.000Z`,
);

const WORDMARK_AVIF = path.join(PUBLIC, "logo.avif");
const WORDMARK_PNG = path.join(
  MEDIA,
  "endocyclic-wordmark-transparent.png",
);
const PORTRAIT_AVIF = path.join(
  PUBLIC,
  "team",
  "tanya-petrossian-v2.avif",
);
const PORTRAIT_JPEG = path.join(
  MEDIA,
  "tanya-petrossian-endocyclic-v2.jpg",
);

const scientificPackages = [
  {
    slug: "platform-mechanism",
    packageName: "endocyclic-platform-mechanism",
    source: path.join(
      PUBLIC,
      "illustrations",
      "selective-mechanism-v11.avif",
    ),
    readme: path.join(MEDIA, "platform-mechanism", "README.txt"),
  },
  {
    slug: "portfolio-architecture",
    packageName: "endocyclic-portfolio-architecture",
    source: path.join(
      PUBLIC,
      "illustrations",
      "pipeline-portfolio-wide-v2.avif",
    ),
    readme: path.join(MEDIA, "portfolio-architecture", "README.txt"),
  },
  {
    slug: "endo-205-mechanism",
    packageName: "endocyclic-endo-205-mechanism",
    source: path.join(
      PUBLIC,
      "illustrations",
      "endo-205-translation-v6.avif",
    ),
    readme: path.join(
      MEDIA,
      "endo-205-mechanism",
      "README.txt",
    ),
  },
  {
    slug: "femluna-targeting",
    packageName: "endocyclic-femluna-targeting",
    source: path.join(
      PUBLIC,
      "illustrations",
      "femluna-targeting-v3.avif",
    ),
    readme: path.join(MEDIA, "femluna-targeting", "README.txt"),
  },
];

const compatibilityPackages = [
  {
    packageName: "endocyclic-endo-205-selective-uptake",
    source: path.join(
      PUBLIC,
      "illustrations",
      "endo-205-translation-v6.avif",
    ),
    readme: path.join(
      MEDIA,
      "endo-205-selective-uptake",
      "README.txt",
    ),
  },
];

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

async function writeManifest(directory, relativeFiles) {
  const lines = [];

  for (const relativeFile of [...relativeFiles].sort()) {
    const buffer = await readFile(path.join(directory, relativeFile));
    lines.push(`${sha256(buffer)}  ${relativeFile}`);
  }

  await writeFile(
    path.join(directory, "SHA256SUMS.txt"),
    `${lines.join("\n")}\n`,
  );
}

async function normalizeTimestamps(target) {
  const targetStat = await stat(target);

  if (targetStat.isDirectory()) {
    const entries = await readdir(target);
    await Promise.all(
      entries.map((entry) => normalizeTimestamps(path.join(target, entry))),
    );
  }

  await utimes(target, FIXED_ARCHIVE_DATE, FIXED_ARCHIVE_DATE);
}

async function listArchiveEntries(rootDirectory) {
  const parent = path.dirname(rootDirectory);
  const entries = [];

  async function visit(target) {
    const targetStat = await stat(target);
    const relative = path.relative(parent, target).split(path.sep).join("/");

    if (targetStat.isDirectory()) {
      entries.push(`${relative}/`);
      const children = (await readdir(target)).sort();
      for (const child of children) {
        await visit(path.join(target, child));
      }
      return;
    }

    entries.push(relative);
  }

  await visit(rootDirectory);
  return entries;
}

async function writeDeterministicZip(rootDirectory, outputPath) {
  const entries = await listArchiveEntries(rootDirectory);
  await rm(outputPath, { force: true });
  await run("zip", ["-X", "-q", outputPath, ...entries], {
    cwd: path.dirname(rootDirectory),
    maxBuffer: 1024 * 1024,
  });
}

async function makeJpeg(source, output) {
  await sharp(source)
    .toColourspace("srgb")
    .jpeg({
      quality: 92,
      progressive: true,
      chromaSubsampling: "4:4:4",
      optimiseScans: true,
    })
    .toFile(output);
}

async function generateDirectAssets() {
  await mkdir(MEDIA, { recursive: true });
  await sharp(WORDMARK_AVIF)
    .toColourspace("srgb")
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(WORDMARK_PNG);
}

async function stageScientificPackage(tempDirectory, definition) {
  const packageRoot = path.join(tempDirectory, definition.packageName);
  const avifName = `${definition.packageName}.avif`;
  const jpegName = `${definition.packageName}.jpg`;

  await mkdir(packageRoot, { recursive: true });
  await copyFile(definition.source, path.join(packageRoot, avifName));
  await makeJpeg(definition.source, path.join(packageRoot, jpegName));
  await copyFile(definition.readme, path.join(packageRoot, "README.txt"));
  await writeManifest(packageRoot, [avifName, jpegName, "README.txt"]);
  await normalizeTimestamps(packageRoot);
  await writeDeterministicZip(
    packageRoot,
    path.join(MEDIA, `${definition.packageName}.zip`),
  );

  return packageRoot;
}

async function stageCompleteKit(tempDirectory, scientificRoots) {
  const kitName = mediaKitRelease.archiveName;
  const kitRoot = path.join(tempDirectory, kitName);
  const boilerplateDirectory = path.join(kitRoot, "boilerplate");
  const brandDirectory = path.join(kitRoot, "brand");
  const leadershipDirectory = path.join(kitRoot, "leadership");
  const scienceDirectory = path.join(kitRoot, "science");

  await Promise.all([
    mkdir(boilerplateDirectory, { recursive: true }),
    mkdir(brandDirectory, { recursive: true }),
    mkdir(leadershipDirectory, { recursive: true }),
    mkdir(scienceDirectory, { recursive: true }),
  ]);

  await Promise.all([
    copyFile(path.join(MEDIA, "README.txt"), path.join(kitRoot, "README.txt")),
    copyFile(
      path.join(PUBLIC, "downloads", "endocyclic-approved-boilerplate.txt"),
      path.join(
        boilerplateDirectory,
        "endocyclic-approved-boilerplate.txt",
      ),
    ),
    copyFile(
      WORDMARK_AVIF,
      path.join(brandDirectory, "endocyclic-wordmark.avif"),
    ),
    copyFile(
      WORDMARK_PNG,
      path.join(brandDirectory, "endocyclic-wordmark-transparent.png"),
    ),
    copyFile(
      PORTRAIT_AVIF,
      path.join(
        leadershipDirectory,
        "tanya-petrossian-endocyclic.avif",
      ),
    ),
    copyFile(
      PORTRAIT_JPEG,
      path.join(
        leadershipDirectory,
        "tanya-petrossian-endocyclic-web.jpg",
      ),
    ),
  ]);

  for (const [index, definition] of scientificPackages.entries()) {
    const destination = path.join(scienceDirectory, definition.slug);
    await mkdir(destination, { recursive: true });

    const sourceRoot = scientificRoots[index];
    const files = await readdir(sourceRoot);
    await Promise.all(
      files
        .filter((file) => file !== "SHA256SUMS.txt")
        .map((file) =>
          copyFile(path.join(sourceRoot, file), path.join(destination, file)),
        ),
    );
  }

  const manifestFiles = [];

  async function collectFiles(directory) {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) await collectFiles(target);
      else {
        const relative = path.relative(kitRoot, target).split(path.sep).join("/");
        if (relative !== "SHA256SUMS.txt") manifestFiles.push(relative);
      }
    }
  }

  await collectFiles(kitRoot);
  await writeManifest(kitRoot, manifestFiles);
  await normalizeTimestamps(kitRoot);
  await writeDeterministicZip(
    kitRoot,
    path.join(MEDIA, `${kitName}.zip`),
  );
}

const tempDirectory = await mkdtemp(
  path.join(tmpdir(), "endocyclic-media-kit-"),
);

try {
  await generateDirectAssets();

  const scientificRoots = [];
  for (const definition of scientificPackages) {
    scientificRoots.push(
      await stageScientificPackage(tempDirectory, definition),
    );
  }

  for (const definition of compatibilityPackages) {
    await stageScientificPackage(tempDirectory, definition);
  }

  await stageCompleteKit(tempDirectory, scientificRoots);
  console.log("Generated deterministic web media packages.");
} finally {
  await rm(tempDirectory, { recursive: true, force: true });
}
