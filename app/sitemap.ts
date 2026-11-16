import type { MetadataRoute } from "next";
import { locales } from "@/data/ui";

const SITE = process.env.PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/resume"].flatMap((suffix) =>
    locales.map((l) => ({
      url: `${SITE}/${l}${suffix}`,
      lastModified: new Date(),
      alternates: { languages: { ko: `${SITE}/ko${suffix}`, en: `${SITE}/en${suffix}` } },
    })),
  );
}
