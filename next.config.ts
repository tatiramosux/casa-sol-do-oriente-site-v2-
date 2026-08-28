import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: process.env.VERCEL_BUILD
    ? { tsconfigPath: "tsconfig.vercel.json" }
    : undefined,
};

export default nextConfig;
