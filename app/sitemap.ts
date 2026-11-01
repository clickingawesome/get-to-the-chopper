import type { MetadataRoute } from "next";
import { recipes } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, priority: 1 },
    { url: `${SITE_URL}/recipes/`, lastModified: now, priority: 0.9 },
    { url: `${SITE_URL}/chapters/`, lastModified: now, priority: 0.8 },
    ...recipes.map((r) => ({ url: `${SITE_URL}/recipes/${r.slug}/`, lastModified: now, priority: 0.7 })),
  ];
}
