import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/calendario", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/historia", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/ritualistica", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/projetos", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/projetos/a-vida-continua", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/projetos/hospital-terapeutico", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/projetos/firmando-os-trabalhos", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/projetos/pao-solidario", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/projetos/apometria", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/gira", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/amala", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/musicalidade", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/ingresso", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/ingresso/estatuto", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/ingresso/regimento-interno", priority: 0.6, changeFrequency: "yearly" as const },
  ];

  return pages.map((page) => ({
    url: `${siteConfig.url}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
