import type { NextConfig } from "next";

// Sitewide security headers. Applied to every response via headers() below.
// CSP is intentionally omitted here — it needs a nonce/allowlist for the inline
// GA + OpenPanel + JSON-LD scripts and should be rolled out Report-Only first.
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  // Remove the framework-fingerprinting x-powered-by header.
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Clickjacking protection everywhere EXCEPT /plasmic-host, which Plasmic
      // Studio must be able to embed in an iframe.
      {
        source: "/((?!plasmic-host).*)",
        headers: [{ key: "X-Frame-Options", value: "SAMEORIGIN" }],
      },
    ];
  },
  async redirects() {
    return [
      // Canonicalise the host: www → apex (thedirtagency.com), matching
      // siteUrl and every sitemap/canonical URL. A permanent (308) redirect
      // so search engines consolidate signals on the apex. http → https is
      // handled upstream by the reverse proxy.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.thedirtagency.com" }],
        destination: "https://thedirtagency.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
