import { clientsData } from "@/db/clients";
import { allVideoProjects, featuredVideoProjects } from "@/db/projects";
import { Client, VideoProject } from "@/types/videos";

const uniqueProjectsById = (projects: VideoProject[]): VideoProject[] => {
  const seen = new Set<string>();
  return projects.filter((project) => {
    if (seen.has(project.id)) return false;
    seen.add(project.id);
    return true;
  });
};

const CATEGORY_NORMALIZATION: Record<string, string> = {
  "Promotional Video": "Promotional Videos",
  "Promotional Videos": "Promotional Videos",
  "Corporate Videos": "Corporate Videos",
  "Motion Graphics": "Motion Graphics",
  "Music Video": "Music Videos",
  "Music Videos": "Music Videos",
  "Talking head": "Talking Head",
  "Talking Head": "Talking Head",
  "Event Videos": "Event Videos",
  "Tutorial": "Tutorial",
  "Logo animation": "Logo Animation",
  "Logo Animation": "Logo Animation",
  "Seminar Video": "Seminar Videos",
  "Seminar Videos": "Seminar Videos",
  "Motion reel": "Motion Reel",
  "Motion Reel": "Motion Reel",
  "Anime fact Reel Video": "Anime Fact Reel Videos",
  "Anime Fact Reel Videos": "Anime Fact Reel Videos",
};

export const VIDEO_CATEGORY_ORDER = [
  "Featured Projects",
  "All",
  "Promotional Videos",
  "Corporate Videos",
  "Motion Graphics",
  "Music Videos",
  "Talking Head",
  "Event Videos",
  "Tutorial",
  "Logo Animation",
  "Seminar Videos",
  "Motion Reel",
  "Anime Fact Reel Videos",
];

export const normalizeVideoCategory = (category: string): string | null => {
  return CATEGORY_NORMALIZATION[category.trim()] ?? null;
};

const getProjectNormalizedCategories = (project: VideoProject): string[] => {
  const normalizedSet = new Set<string>();
  project.category.forEach((category) => {
    const normalized = normalizeVideoCategory(category);
    if (!normalized) return;
    if (normalized === "Motion Graphics" && !project.id.startsWith("motion_")) {
      return;
    }
    normalizedSet.add(normalized);
  });
  return Array.from(normalizedSet);
};

export const getVisibleVideoProjects = (): VideoProject[] => {
  return getAllVideoProjects().filter(
    (project) => getProjectNormalizedCategories(project).length > 0
  );
};

// Helper function to get all projects sorted by date (latest first)
export const getAllVideoProjects = (): VideoProject[] => {
  return uniqueProjectsById([...allVideoProjects]).sort(
    (a, b) =>
      new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
  );
};

export const getAllVideoProjectsFlattened = (): VideoProject[] => {
  return getAllVideoProjects();
};

// Helper function to get projects by category sorted by date (latest first)
export const getVideoProjectsByCategory = (
  category: string
): VideoProject[] => {
  if (category === "All") {
    return getAllVideoProjects();
  }

  const baseProjects = getAllVideoProjects();

  const filteredProjects = baseProjects.filter((project) =>
    getProjectNormalizedCategories(project).includes(category)
  );

  return filteredProjects.sort(
    (a, b) =>
      new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
  );
};

// Helper function to get project by ID
export const getVideoProjectById = (id: string): VideoProject | undefined => {
  return allVideoProjects.find((project) => project.id === id);
};

// Helper function to get all unique categories
export const getVideoCategories = (): string[] => {
  const categoriesSet = new Set<string>();
  const projects = getAllVideoProjects();

  projects.forEach((project) => {
    getProjectNormalizedCategories(project).forEach((cat) => categoriesSet.add(cat));
  });

  return Array.from(categoriesSet);
};

// Returns categories with project count, sorted descending
export const getVideoCategoriesWithCount = (): {
  category: string;
  count: number;
}[] => {
  const categoryCountMap = new Map<string, number>();
  const projects = getAllVideoProjects();

  projects.forEach((project) => {
    getProjectNormalizedCategories(project).forEach((cat) => {
      categoryCountMap.set(cat, (categoryCountMap.get(cat) || 0) + 1);
    });
  });

  const sortedCategories = VIDEO_CATEGORY_ORDER.filter(
    (category) => category !== "Featured Projects" && category !== "All"
  ).map((category) => ({
    category,
    count: categoryCountMap.get(category) || 0,
  })).filter((category) => category.count > 0);

  return sortedCategories;
};

export const getVideoCategoriesWithCountIncludingAll = (): {
  category: string;
  count: number;
}[] => {
  const categoryCounts = getVideoCategoriesWithCount();
  const allCount = getAllVideoProjects().length;

  return [{ category: "All", count: allCount }, ...categoryCounts];
};

export function getFeaturedProjects(limit = 6): VideoProject[] {
  const featured = featuredVideoProjects.slice(0, limit);
  if (featured.length >= limit) return featured;

  const fallback = getAllVideoProjects().filter(
    (project) => !featured.some((item) => item.id === project.id)
  );
  return [...featured, ...fallback.slice(0, limit - featured.length)];
}

export function getClients(): Client[] {
  return clientsData;
}

// Helper function to get the proper embed link
export const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;

  // Handle Shorts
  if (url.includes("youtube.com/shorts/")) {
    const match = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }

  // Handle Regular YouTube video
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

// Legacy support - keep the old structure for backward compatibility if needed
export const videoProjectsData = {
  "Talking Head": allVideoProjects.filter((p) =>
    p.category.includes("Talking Head")
  ),
  Shorts: allVideoProjects.filter((p) => p.category.includes("Shorts")),
  Promo: allVideoProjects.filter((p) => p.category.includes("Promo")),
  Documentary: allVideoProjects.filter((p) =>
    p.category.includes("Documentary")
  ),
  Explainer: allVideoProjects.filter((p) => p.category.includes("Explainer")),
  "Motion Graphics": allVideoProjects.filter(
    (p) => p.category.includes("Motion Graphics") && p.id.startsWith("motion_")
  ),
  Animation: allVideoProjects.filter((p) => p.category.includes("Animation")),
};
