import type { MetadataRoute } from "next";

/**
 * 实际存在的页面 slug（sitemap 真实输出）
 * 新增落地页时，往这里加 slug + 在 src/app/<slug>/page.tsx 创建对应路由
 */
const LIVE_SLUGS = [
  "happy-diwali-post-generator",
  "wedding-invitation-maker",
  "wedding-invitation-wording",
  "haldi-ceremony-invitation",
  "haldi-invitation-card",
  "sangeet-invitation-card",
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

/**
 * 2026-07-28: wedding-invitation-maker 和 wedding-invitation-wording
 * 页面文件早就存在，但 sitemap.ts 没更新所以 sitemap 从未输出它们。
 * 本次修复让 sitemap 包含全部 3 个落地页。
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://desidesign.me";
  // Always use today so Google sees fresh content
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];
  const lastMod = new Date(todayStr + "T08:00:00.000Z");
  return [
    { url: `${base}/`, lastModified: lastMod, changeFrequency: "daily", priority: 1.0 },
    ...LIVE_SLUGS.map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
