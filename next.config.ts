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
};

export default nextConfig;
