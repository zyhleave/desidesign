import type { MetadataRoute } from "next";

const SLUGS = [
  "diwali-card-maker",
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
    ...SLUGS.map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
