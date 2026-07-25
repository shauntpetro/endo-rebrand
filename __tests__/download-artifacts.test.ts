import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import mediaKitRelease from "@/lib/media-kit-release.json";

const publicFile = (path: string) =>
  resolve(process.cwd(), "public", path.replace(/^\//, ""));

function archiveEntries(path: string) {
  return execFileSync("unzip", ["-Z1", path], { encoding: "utf8" })
    .trim()
    .split(/\r?\n/);
}

function archiveEntry(path: string, entry: string) {
  return execFileSync("unzip", ["-p", path, entry]);
}

function sha256(buffer: Buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

describe("public download artifacts", () => {
  it("keeps the media-kit archive name synchronized with its release version", () => {
    expect(mediaKitRelease.archiveName).toBe(
      `endocyclic-media-kit-web-v${mediaKitRelease.version}`,
    );
    expect(mediaKitRelease.releaseDate).toBe("2026-07-24");
  });

  it("keeps the investor-summary source on approved milestone terminology", () => {
    const source = readFileSync(
      resolve(process.cwd(), "docs/investor-summary-source.html"),
      "utf8",
    );

    expect(source).toContain(
      "White House recognition (company-reported)",
    );
    expect(source).toContain("NIH RADx Tech");
    expect(source).not.toContain("NIH ACT ENDO");
    expect(source).not.toContain("White House presentation");
    expect(source).not.toMatch(/<td>Preclinical<\/td>/);
  });

  it("ships the investor PDF and keeps the legacy file byte-identical", () => {
    const current = readFileSync(
      publicFile("/downloads/endocyclic-investor-summary-v2.pdf"),
    );
    const legacy = readFileSync(
      publicFile("/downloads/endocyclic-investor-summary.pdf"),
    );

    expect(current.subarray(0, 5).toString()).toBe("%PDF-");
    expect(legacy.equals(current)).toBe(true);
  });

  it.each([
    {
      packageName: "endocyclic-platform-mechanism",
      source: "/illustrations/selective-mechanism-v11.avif",
      width: 1774,
      height: 887,
      caption:
        "Conceptual four-part illustration of EndoCyclic's precision peptide platform: selective uptake, pH-mediated activation, and a separate receding-lesion state representing the ENDO-205 preclinical lesion-elimination finding.",
      qualification:
        "Stage 04 represents ENDO-205 preclinical studies demonstrating elimination of endometriosis lesions and associated inflammation. Conceptual representation; not clinical imagery, observed human efficacy, restored-tissue histology, or performance data.",
      alt: "Conceptual four-part illustration of an intact EndoCyclic peptide undergoing selective uptake and pH-mediated activation before a separate state shows the same lesion receding to represent the ENDO-205 preclinical lesion-elimination finding.",
    },
    {
      packageName: "endocyclic-portfolio-architecture",
      source: "/illustrations/pipeline-portfolio-wide-v2.avif",
      width: 1774,
      height: 887,
      caption:
        "Conceptual overview of four EndoCyclic therapeutic and diagnostic programs across endometriosis and oncology.",
      qualification:
        "Conceptual representation; not clinical imagery or development-performance data.",
      alt: "Conceptual illustration of the EndoCyclic four-program portfolio architecture.",
    },
    {
      packageName: "endocyclic-endo-205-mechanism",
      source: "/illustrations/endo-205-translation-v6.avif",
      width: 1536,
      height: 1024,
      caption:
        "Conceptual illustration of ENDO-205 selective uptake and pH-mediated activation before a separate receding-lesion state represents the preclinical lesion-elimination finding.",
      qualification:
        "The final state represents ENDO-205 preclinical studies demonstrating elimination of endometriosis lesions and associated inflammation. Conceptual representation; not a patient image, clinical scan, observed human outcome, restored-tissue histology, efficacy data, safety data, or performance data.",
      alt: "Conceptual sequence showing an intact ENDO-205 peptide undergoing selective uptake and pH-mediated activation before a separate state shows the same lesion receding to represent the preclinical lesion-elimination finding.",
    },
    {
      packageName: "endocyclic-femluna-targeting",
      source: "/illustrations/femluna-targeting-v3.avif",
      width: 1536,
      height: 1024,
      caption:
        "Conceptual illustration of FemLUNA™, an IND-enabling targeted imaging agent developed for accurate, non-invasive detection of endometriosis, including superficial and sub-millimeter lesions.",
      qualification:
        "Conceptual representation; FemLUNA™ is IND-enabling. Not a patient image, clinical scan, observed detection result, or performance data.",
      alt: "Conceptual editorial illustration of a targeted imaging agent localizing near a small endometriosis lesion within simplified pelvic anatomy.",
    },
  ])(
    "ships $packageName as a complete, self-verifying publication package",
    async ({
      packageName,
      source,
      width,
      height,
      caption,
      qualification,
      alt,
    }) => {
      const archivePath = publicFile(
        `/downloads/media/${packageName}.zip`,
      );
      const root = `${packageName}/`;
      const entries = archiveEntries(archivePath);
      const expectedFiles = [
        `${root}README.txt`,
        `${root}SHA256SUMS.txt`,
        `${root}${packageName}.avif`,
        `${root}${packageName}.jpg`,
      ];

      expect(readFileSync(archivePath).subarray(0, 4)).toEqual(
        Buffer.from([0x50, 0x4b, 0x03, 0x04]),
      );
      expect(entries).toEqual([root, ...expectedFiles]);
      expect(
        entries.some(
          (entry) =>
            entry.includes("__MACOSX") || entry.endsWith(".DS_Store"),
        ),
      ).toBe(false);

      const archivedAvif = archiveEntry(
        archivePath,
        `${root}${packageName}.avif`,
      );
      expect(archivedAvif.equals(readFileSync(publicFile(source)))).toBe(true);

      const readme = archiveEntry(
        archivePath,
        `${root}README.txt`,
      ).toString("utf8");
      expect(readme).toContain(caption);
      expect(readme).toContain(qualification);
      expect(readme).toContain(alt);
      expect(readme).toContain("SUGGESTED CAPTION");
      expect(readme).toContain("SUGGESTED ALT TEXT");
      expect(readme).toContain("CREDIT");
      expect(readme).toContain("native source dimensions");

      const manifest = archiveEntry(
        archivePath,
        `${root}SHA256SUMS.txt`,
      )
        .toString("utf8")
        .trim()
        .split(/\r?\n/);
      expect(manifest).toHaveLength(3);
      for (const line of manifest) {
        const match = line.match(/^([a-f0-9]{64}) {2}(.+)$/);
        expect(match).not.toBeNull();
        const [, checksum, filename] = match!;
        expect(
          sha256(archiveEntry(archivePath, `${root}${filename}`)),
        ).toBe(checksum);
      }

      await expect(
        sharp(
          archiveEntry(archivePath, `${root}${packageName}.jpg`),
        ).metadata(),
      ).resolves.toMatchObject({
        format: "jpeg",
        width,
        height,
        space: "srgb",
        chromaSubsampling: "4:4:4",
        isProgressive: true,
      });
    },
  );

  it("keeps the legacy ENDO-205 download URL aligned with the current mechanism visual", () => {
    const packageName = "endocyclic-endo-205-selective-uptake";
    const archivePath = publicFile(`/downloads/media/${packageName}.zip`);
    const root = `${packageName}/`;
    const archivedAvif = archiveEntry(
      archivePath,
      `${root}${packageName}.avif`,
    );
    const readme = archiveEntry(
      archivePath,
      `${root}README.txt`,
    ).toString("utf8");

    expect(
      archivedAvif.equals(
        readFileSync(
          publicFile("/illustrations/endo-205-translation-v6.avif"),
        ),
      ),
    ).toBe(true);
    expect(readme).toContain(
      "preclinical lesion-elimination finding",
    );
    expect(readme).toContain(
      "LEGACY-URL COMPATIBILITY PACKAGE",
    );
  });

  it("retains the approved low-resolution portrait and prior release assets as immutable history", () => {
    expect(
      sha256(readFileSync(publicFile("/team/tanya-petrossian.avif"))),
    ).toBe(
      "c9046594d2b4be61eed00d03374a7d83735032d93d56720ed360f5a94eeede10",
    );
    expect(
      sha256(
        readFileSync(
          publicFile(
            "/downloads/media/tanya-petrossian-endocyclic-web.jpg",
          ),
        ),
      ),
    ).toBe(
      "54e46a5c51a77826f074a655854e48a0cd9cbed2541171a4b97461b9709dda71",
    );
    expect(
      readFileSync(publicFile("/social/endocyclic-team-v9.jpg")).subarray(
        0,
        3,
      ),
    ).toEqual(Buffer.from([0xff, 0xd8, 0xff]));
    expect(
      readFileSync(
        publicFile(
          "/downloads/media/endocyclic-media-kit-web-v10.zip",
        ),
      ).subarray(0, 4),
    ).toEqual(Buffer.from([0x50, 0x4b, 0x03, 0x04]));
  });

  it("ships native-size direct assets and the complete web media kit", async () => {
    const wordmarkPath = publicFile(
      "/downloads/media/endocyclic-wordmark-transparent.png",
    );
    const portraitAvifPath = publicFile(
      "/team/tanya-petrossian-v2.avif",
    );
    const portraitPath = publicFile(
      "/downloads/media/tanya-petrossian-endocyclic-v2.jpg",
    );
    const kitName = mediaKitRelease.archiveName;
    const root = `${kitName}/`;
    const kitPath = publicFile(`/downloads/media/${kitName}.zip`);
    const entries = archiveEntries(kitPath);

    await expect(sharp(wordmarkPath).metadata()).resolves.toMatchObject({
      format: "png",
      width: 233,
      height: 70,
      space: "srgb",
      hasAlpha: true,
    });
    await expect(sharp(portraitPath).metadata()).resolves.toMatchObject({
      format: "jpeg",
      width: 1164,
      height: 1476,
      space: "srgb",
      chromaSubsampling: "4:4:4",
      isProgressive: true,
    });
    await expect(sharp(portraitAvifPath).metadata()).resolves.toMatchObject({
      format: "heif",
      width: 1164,
      height: 1476,
      space: "srgb",
      hasAlpha: false,
    });

    expect(entries).toContain(
      `${root}brand/endocyclic-wordmark-transparent.png`,
    );
    expect(entries).toContain(
      `${root}leadership/tanya-petrossian-endocyclic-web.jpg`,
    );
    expect(entries).toContain(
      `${root}science/platform-mechanism/endocyclic-platform-mechanism.jpg`,
    );
    expect(entries).toContain(
      `${root}science/portfolio-architecture/endocyclic-portfolio-architecture.jpg`,
    );
    expect(entries).toContain(
      `${root}science/endo-205-mechanism/endocyclic-endo-205-mechanism.jpg`,
    );
    expect(entries).toContain(
      `${root}science/femluna-targeting/endocyclic-femluna-targeting.jpg`,
    );
    expect(entries).not.toContain("__MACOSX");

    const readme = archiveEntry(
      kitPath,
      `${root}README.txt`,
    ).toString("utf8");
    expect(readme).toContain(
      `WEB MEDIA KIT — VERSION ${mediaKitRelease.version}`,
    );
    expect(readme).toContain(
      `PACKAGE RELEASE DATE: ${mediaKitRelease.releaseDate}`,
    );
    expect(readme).toContain("does not contain vector artwork");
    expect(readme).toContain("required qualification");
    expect(readme).toContain(
      "do not indicate regulatory review or product approval",
    );
    expect(readme).not.toContain("FDA-approved");
    expect(readme).not.toContain("reviewed");

    const manifest = archiveEntry(
      kitPath,
      `${root}SHA256SUMS.txt`,
    )
      .toString("utf8")
      .trim()
      .split(/\r?\n/);
    for (const line of manifest) {
      const match = line.match(/^([a-f0-9]{64}) {2}(.+)$/);
      expect(match).not.toBeNull();
      const [, checksum, filename] = match!;
      expect(sha256(archiveEntry(kitPath, `${root}${filename}`))).toBe(
        checksum,
      );
    }

    expect(
      archiveEntry(
        kitPath,
        `${root}brand/endocyclic-wordmark-transparent.png`,
      ).equals(readFileSync(wordmarkPath)),
    ).toBe(true);
    expect(
      archiveEntry(
        kitPath,
        `${root}leadership/tanya-petrossian-endocyclic-web.jpg`,
      ).equals(readFileSync(portraitPath)),
    ).toBe(true);
    expect(
      archiveEntry(
        kitPath,
        `${root}leadership/tanya-petrossian-endocyclic.avif`,
      ).equals(readFileSync(portraitAvifPath)),
    ).toBe(true);
    expect(
      archiveEntry(
        kitPath,
        `${root}boilerplate/endocyclic-approved-boilerplate.txt`,
      ).equals(
        readFileSync(
          publicFile("/downloads/endocyclic-approved-boilerplate.txt"),
        ),
      ),
    ).toBe(true);
  });
});
