import type { Metadata } from "next";

// `.invalid` is reserved for documentation and can never resolve publicly.
// Keep unconfigured builds internally consistent without accidentally
// publishing canonicals or structured-data URLs for an unapproved domain.
const DEFAULT_SITE_ORIGIN = "https://endocyclic.invalid";

function parseSiteOrigin(value: string | undefined) {
  const candidate = value?.trim();
  if (!candidate) return null;

  try {
    const url = new URL(candidate);
    const isCleanHttpsOrigin =
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash;

    return isCleanHttpsOrigin ? url.origin : null;
  } catch {
    return null;
  }
}

export function resolveSiteOrigin(value: string | undefined) {
  return parseSiteOrigin(value) ?? DEFAULT_SITE_ORIGIN;
}

export function hasValidSiteOrigin(value: string | undefined) {
  return parseSiteOrigin(value) !== null;
}

const configuredSiteOrigin = parseSiteOrigin(
  process.env.NEXT_PUBLIC_SITE_URL,
);
export const SITE_ORIGIN = configuredSiteOrigin ?? DEFAULT_SITE_ORIGIN;
export const SITE_ORIGIN_IS_CONFIGURED = configuredSiteOrigin !== null;
export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const FOUNDER_ID = `${SITE_ORIGIN}/team#tanya-petrossian`;

export const PUBLIC_ROUTES = [
  "/",
  "/innovation",
  "/pipeline",
  "/imaging",
  "/impact",
  "/team",
  "/news",
  "/contact",
  "/investors",
  "/media",
] as const;

export type PublicRoutePath = (typeof PUBLIC_ROUTES)[number];

type SocialImageDescriptor = {
  url: string;
  width: 1200;
  height: 630;
  type: "image/jpeg";
  alt: string;
};

function createSocialImage(
  filename: string,
  alt: string,
): SocialImageDescriptor {
  return {
    url: `${SITE_ORIGIN}/social/${filename}`,
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt,
  };
}

export const SOCIAL_IMAGES = {
  "/": createSocialImage(
    "endocyclic-home-v6.jpg",
    "Conceptual EndoCyclic precision peptide artwork with the headline “Precision peptides, activated through pH.” A separate receding-lesion state represents the ENDO-205 preclinical lesion-elimination finding, not clinical outcomes or restored-tissue histology.",
  ),
  "/innovation": createSocialImage(
    "endocyclic-innovation-v5.jpg",
    "EndoCyclic precision peptide platform artwork with the headline “A selective route into diseased tissue.” The final state represents the ENDO-205 preclinical lesion-elimination finding, not clinical outcomes.",
  ),
  "/pipeline": createSocialImage(
    "endocyclic-pipeline-v3.jpg",
    "EndoCyclic development portfolio artwork with the headline “One precision peptide platform. Four programs.”",
  ),
  "/imaging": createSocialImage(
    "endocyclic-imaging-v2.jpg",
    "FemLUNA conceptual targeting artwork with the headline “Find what current imaging can miss.”",
  ),
  "/impact": createSocialImage(
    "endocyclic-impact-v1.jpg",
    "Conceptual endometriosis anatomy artwork with the headline “A disease affecting more than 190 million women.”",
  ),
  "/team": createSocialImage(
    "endocyclic-team-v11.jpg",
    "Portrait of Dr. Tanya Petrossian with the headline “Founder-led into the clinic.”",
  ),
  "/news": createSocialImage(
    "endocyclic-news-v2.jpg",
    "EndoCyclic platform artwork with the headline “Milestones and recognition, at the source.”",
  ),
  "/contact": createSocialImage(
    "endocyclic-contact-v3.jpg",
    "EndoCyclic platform artwork with the headline “Connect with EndoCyclic.”",
  ),
  "/investors": createSocialImage(
    "endocyclic-investors-v3.jpg",
    "EndoCyclic portfolio artwork with the headline “ENDO-205: FDA IND Allowance. Phase 1.”",
  ),
  "/media": createSocialImage(
    "endocyclic-media-v9.jpg",
    "Conceptual EndoCyclic selective peptide artwork with the headline “Accurate company information, ready to use.” Evidence 04 represents the ENDO-205 preclinical lesion-elimination finding, not clinical outcomes.",
  ),
} satisfies Record<PublicRoutePath, SocialImageDescriptor>;

export function createPageMetadata({
  title,
  description,
  path,
  socialTitle = `${title} | EndoCyclic Therapeutics`,
  socialDescription = description,
  socialImage = SOCIAL_IMAGES[path],
}: {
  title: string;
  description: string;
  path: PublicRoutePath;
  socialTitle?: string;
  socialDescription?: string;
  socialImage?: SocialImageDescriptor;
}): Metadata {
  const url = `${SITE_ORIGIN}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "EndoCyclic Therapeutics",
      title: socialTitle,
      description: socialDescription,
      url,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [socialImage],
    },
  };
}
