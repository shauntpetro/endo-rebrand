import type { MetadataRoute } from "next";
import {
  SITE_ORIGIN,
  SITE_ORIGIN_IS_CONFIGURED,
} from "@/lib/metadata";

export function createRobots(
  siteOrigin: string,
  isConfigured: boolean,
): MetadataRoute.Robots {
  if (!isConfigured) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/concepts"],
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/concepts"],
    },
    sitemap: `${siteOrigin}/sitemap.xml`,
  };
}

export default function robots(): MetadataRoute.Robots {
  return createRobots(SITE_ORIGIN, SITE_ORIGIN_IS_CONFIGURED);
}
