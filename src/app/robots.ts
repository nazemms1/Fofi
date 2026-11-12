import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(SITE.url ? { sitemap: `${SITE.url}/sitemap.xml` } : {}),
  };
}
