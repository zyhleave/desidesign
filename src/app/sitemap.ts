import type { MetadataRoute } from "next";

/**
 * 实际存在的页面 slug（sitemap 真实输出）
 * 新增落地页时，往这里加 slug + 在 src/app/<slug>/page.tsx 创建对应路由
 */
const LIVE_SLUGS = [
  "diwali-card-maker",
  "diwali-photo-frame-free",
  "happy-diwali-post-generator",
];

/**
 * 计划中的页面 slug（sitemap 暂不输出，避免 Google 抓到 404）
 * 落地页建好后，从这里移到 LIVE_SLUGS
 */
const PLANNED_SLUGS = [
  "diwali-poster-maker",
  "diwali-banner-maker",
  "diwali-greeting-card-maker",
  "diwali-invitation-maker",
  "ai-diwali-image-generator",
  "diwali-sale-poster",
  "diwali-offer-banner",
  "happy-diwali-business-post",
  "diwali-wishes-for-customers",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://desidesign.me";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    ...LIVE_SLUGS.map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
