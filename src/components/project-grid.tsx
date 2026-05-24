"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { m } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";
import type { VideoProject } from "@/types/videos";
import { getVideoProjectsByCategory, getFeaturedProjects } from "@/lib/helper";

interface ProjectGridProps {
  initialCategories: { category: string; count: number }[];
  initialProjects: VideoProject[];
}

export default function ProjectGrid({ initialCategories, initialProjects }: ProjectGridProps) {
  const searchParams = useSearchParams();
  const selectedCategoryFromUrl = searchParams.get("category") || "Featured Projects";
  const scrollToProjectId = searchParams.get("scrollTo");
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryFromUrl);
  const [displayedProjects, setDisplayedProjects] = useState<VideoProject[]>(
    initialProjects.slice(0, 9)
  );
  const [allProjects, setAllProjects] = useState<VideoProject[]>(initialProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialProjects.length > 9);

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    setSelectedCategory(selectedCategoryFromUrl);
  }, [selectedCategoryFromUrl]);

  // Load projects for selected category
  useEffect(() => {
    let projects;
    if (selectedCategory === "All") {
      projects = initialProjects;
    } else if (selectedCategory === "Featured Projects") {
      projects = getFeaturedProjects(9);
    } else {
      projects = getVideoProjectsByCategory(selectedCategory);
    }

    setAllProjects(projects);
    setDisplayedProjects(projects.slice(0, ITEMS_PER_PAGE));
    setCurrentPage(1);
    setHasMore(projects.length > ITEMS_PER_PAGE);
  }, [selectedCategory, initialProjects]);

  useEffect(() => {
    if (!scrollToProjectId) return;

    const targetIndex = allProjects.findIndex((project) => project.id === scrollToProjectId);
    if (targetIndex !== -1 && targetIndex >= displayedProjects.length) {
      const nextCount = targetIndex + 1;
      setDisplayedProjects(allProjects.slice(0, nextCount));
      setCurrentPage(Math.ceil(nextCount / ITEMS_PER_PAGE));
      setHasMore(allProjects.length > nextCount);
    }

    const timeout = window.setTimeout(() => {
      const target = document.getElementById(`project-card-${scrollToProjectId}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [scrollToProjectId, displayedProjects, allProjects]);

  // Load more projects
  const loadMoreProjects = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newProjects = allProjects.slice(startIndex, endIndex);

    setDisplayedProjects((prev) => [...prev, ...newProjects]);
    setCurrentPage(nextPage);
    setHasMore(endIndex < allProjects.length);
    setLoading(false);
  }, [currentPage, allProjects, loading, hasMore]);


  return (
    <>
        {/* Category Filter */}
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
        >
            {initialCategories.map(({ category, count }) => {
              const isFeatured = category === "Featured Projects";
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    // update URL so state is encoded in history and deep-links work
                    try {
                      router.push(`/?category=${encodeURIComponent(category)}`, { scroll: false });
                    } catch (e) {
                      // fallback: replace location
                      if (typeof window !== 'undefined') {
                        const url = new URL(window.location.href);
                        url.searchParams.set('category', category);
                        window.history.pushState({}, '', url.toString());
                      }
                    }
                  }}
                  className={`
                    relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                    ${isActive
                      ? isFeatured
                        ? "bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-500 text-black shadow-[0_0_30px_rgba(59,130,246,0.45)] scale-105"
                        : "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                      : isFeatured
                        ? "bg-white/10 text-cyan-200 border border-cyan-300/10 hover:bg-cyan-500/10 hover:text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
                    }
                  `}
                >
                  {category}
                  <span className={`
                    ml-2 text-[10px] px-1.5 py-0.5 rounded-full transition-colors
                    ${isActive ? "bg-black text-white" : "bg-white/10 text-gray-400"}
                  `}>
                    {count}
                  </span>
                </button>
              );
            })}
        </m.div>

        {/* Projects Grid */}
        <m.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
            {displayedProjects.map((project, index) => (
            <m.div
                key={project.id}
                layout
                id={`project-card-${project.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
            >
                <ProjectCard project={project} currentCategory={selectedCategory} />
            </m.div>
            ))}
        </m.div>

        {/* Manual Load More Button */}
        {hasMore && (
            <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-20"
            >
            <Button
                onClick={loadMoreProjects}
                disabled={loading}
                size="lg"
                className="bg-white text-black hover:bg-gray-200 rounded-full px-8 h-12 font-medium transition-all hover:scale-105"
            >
                {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                </>
                ) : (
                <>
                    Load More Projects
                    <ArrowRight className="ml-2" size={16} />
                </>
                )}
            </Button>
            </m.div>
        )}
    </>
  );
}
