import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "captainkunafa.com",
        pathname: "/**",
      },
    ],
  },
  headers: async () => [
    {
      source: "/(Kunafa-animations-v2|mobile-view-framesv2|platters)/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

export default nextConfig;
