import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // resvg is a native addon; keep it external so the bundler doesn't try to inline the .node binary.
  serverExternalPackages: ["@resvg/resvg-js"],
  // Ensure the embedded font ships inside the /api/preview serverless bundle on Vercel.
  outputFileTracingIncludes: {
    "/api/preview": ["./src/assets/fonts/**"],
  },
  async redirects() {
    // Consolidate the 4 retired Diwali tools into the single kept tool.
    // Permanent (308) so link equity is preserved during this practice phase.
    return [
      { source: "/diwali-card-maker", destination: "/happy-diwali-post-generator", permanent: true },
      { source: "/diwali-photo-frame-free", destination: "/happy-diwali-post-generator", permanent: true },
      { source: "/diwali-wishes-card-maker", destination: "/happy-diwali-post-generator", permanent: true },
      { source: "/happy-diwali-card-maker", destination: "/happy-diwali-post-generator", permanent: true },
      { source: "/shubh-diwali-wishes-image", destination: "/happy-diwali-post-generator", permanent: true },
    ];
  },
};

export default nextConfig;
