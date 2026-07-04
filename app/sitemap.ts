import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://endocyclic.com";
  const now = new Date();
  const routes = [
    { path: "", priority: 1, freq: "weekly" as const },
    { path: "/innovation", priority: 0.9, freq: "monthly" as const },
    { path: "/pipeline", priority: 0.9, freq: "monthly" as const },
    { path: "/imaging", priority: 0.8, freq: "monthly" as const },
    { path: "/impact", priority: 0.8, freq: "monthly" as const },
    { path: "/team", priority: 0.7, freq: "monthly" as const },
    { path: "/news", priority: 0.7, freq: "weekly" as const },
    { path: "/investors", priority: 0.8, freq: "monthly" as const },
    { path: "/contact", priority: 0.6, freq: "yearly" as const },
    { path: "/media", priority: 0.6, freq: "monthly" as const },
  ];
  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
