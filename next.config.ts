import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 禁用 Turbopack（不支持中文路径）
  experimental: {
    turbo: undefined,
  },
};

export default nextConfig;
