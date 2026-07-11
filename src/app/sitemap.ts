import type { MetadataRoute } from "next";
import { allVideoProjects } from "@/db/projects";

const siteUrl = "https://saifstudio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/skills",
    "/services",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes = allVideoProjects.map((project) => ({
    url: `${siteUrl}/project/${project.id}`,
    lastModified: project.publish_date
      ? new Date(project.publish_date)
      : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
