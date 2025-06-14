import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    domains: ["i.pravatar.cc"],
  },
  eslint : {
    ignoreDuringBuilds : true,
  },
  typescript : {
    ignoreBuildErrors : true
  }
};

export default nextConfig;
