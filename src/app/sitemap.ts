import type { MetadataRoute } from "next";
import { AVAILABLE_PRODUCTS } from "@/data/products";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url || "http://localhost:3000";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/shop`, changeFrequency: "weekly", priority: 0.9 },
    ...AVAILABLE_PRODUCTS.map((p) => ({
      url: `${base}/shop/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
