import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    "",
    "/nosotros",
    "/valores",
    "/colecciones",
    "/contacto",
    ...getProducts().map((p) => `/colecciones/${p.slug}`),
  ].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "monthly",
    priority: p ? 0.7 : 1,
  }));
}
