import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  env: {
    NEXT_PUBLIC_WS_PORT: process.env.NEXT_PUBLIC_WS_PORT ?? "3001",
  },
};

export default nextConfig;
