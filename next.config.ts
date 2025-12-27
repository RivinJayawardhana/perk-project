import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // Only run ESLint in strict mode, skip during builds to avoid Vercel issues
    ignoreDuringBuilds: false,
  },
  async redirects() {
    return [
      // Redirect from .co domain to .io domain
      {
        source: "/:path*",
        destination: "https://venturenext.io/:path*",
        has: [
          {
            type: "host",
            value: "venturenext.co",
          },
        ],
        permanent: true,
      },
      // Redirect from Vercel preview domains to .io domain
      {
        source: "/:path*",
        destination: "https://venturenext.io/:path*",
        has: [
          {
            type: "host",
            value: "(?<vercelDomain>.*\\.vercel\\.app)",
          },
        ],
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
