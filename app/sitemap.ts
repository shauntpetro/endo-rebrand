import type { MetadataRoute } from "next";
import {
  SITE_ORIGIN,
  SITE_ORIGIN_IS_CONFIGURED,
  PUBLIC_ROUTES,
} from "@/lib/metadata";

export function createSitemap(
  siteOrigin: string,
  isConfigured: boolean,
): MetadataRoute.Sitemap {
  if (!isConfigured) return [];

  return PUBLIC_ROUTES.map((path) => ({
    url: `${siteOrigin}${path === "/" ? "" : path}`,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemap(SITE_ORIGIN, SITE_ORIGIN_IS_CONFIGURED);
}
