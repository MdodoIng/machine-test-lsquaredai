import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    domains: ["i.pravatar.cc"],
  },
};

export default nextConfig;
