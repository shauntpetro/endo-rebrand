import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import { hasValidSiteOrigin } from "./lib/metadata";

const isDevelopment = process.env.NODE_ENV === "development";
const siteOriginIsConfigured = hasValidSiteOrigin(
  process.env.NEXT_PUBLIC_SITE_URL,
);
const defaultPostHogOrigin = "https://us.i.posthog.com";
const postHogOrigin = (() => {
  try {
    const candidate = new URL(
      process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || defaultPostHogOrigin,
    );
    return candidate.protocol === "https:"
      ? candidate.origin
      : defaultPostHogOrigin;
  } catch {
    return defaultPostHogOrigin;
  }
})();
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} ${postHogOrigin}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: blob:",
  `connect-src 'self' ${postHogOrigin} https://*.sentry.io`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  ...(!siteOriginIsConfigured
    ? [
        {
          key: "X-Robots-Tag",
          value: "noindex, nofollow, noarchive",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Cap stale-while-revalidate at one hour instead of Next's one-year default.
  // Versioned illustration and social assets retain their immutable headers.
  expireTime: 3600,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    // Keep the viewport-oriented 384px candidate in deviceSizes only.
    // Next otherwise emits the same 384w entry twice when merging defaults.
    imageSizes: [32, 48, 64, 96, 128, 256],
    deviceSizes: [384, 480, 560, 640, 650, 700, 750, 828, 1080, 1120, 1200, 1280, 1440, 1600, 1920, 2048, 3840],
  },
  async redirects() {
    return [
      {
        source: "/downloads/endocyclic-investor-summary.pdf",
        destination: "/downloads/endocyclic-investor-summary-v2.pdf",
        permanent: true,
      },
      {
        source: "/peptide",
        destination: "/innovation",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/illustrations/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/social/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/downloads/endocyclic-investor-summary-v2.pdf",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/downloads/media/endocyclic-media-kit-web-v4.zip",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/downloads/media/endocyclic-media-kit-web-v5.zip",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/downloads/media/endocyclic-media-kit-web-v6.zip",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/downloads/media/endocyclic-media-kit-web-v7.zip",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/downloads/media/endocyclic-media-kit-web-v8.zip",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/downloads/media/endocyclic-media-kit-web-v9.zip",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/downloads/media/endocyclic-media-kit-web-v10.zip",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/downloads/media/endocyclic-media-kit-web-v11.zip",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/downloads/media/endocyclic-media-kit-web-v12.zip",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/concepts/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  webpack: {
    automaticVercelMonitors: true,
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
