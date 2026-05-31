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

// Mobile-only category filter component
function MobileCategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: { category: string; count: number }[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const active = categories.find((c) => c.category === selectedCategory) || categories[0];

  return (
    <div className="md:hidden mb-16">
      {!isExpanded ? (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              setSelectedCategory(active.category);
              setIsExpanded(false);
            }}
            className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
              ${selectedCategory === active.category
                ? active.category === "Featured Projects"
                  ? "bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-500 text-black shadow-[0_0_30px_rgba(59,130,246,0.45)] scale-105"
                  : "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                : active.category === "Featured Projects"
                  ? "bg-white/10 text-cyan-200 border border-cyan-300/10 hover:bg-cyan-500/10 hover:text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
              }
            `}
          >
            {active.category}
            <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full transition-colors ${selectedCategory === active.category ? "bg-black text-white" : "bg-white/10 text-gray-400"}`}>
              {active.count}
            </span>
          </button>

          <button
            onClick={() => setIsExpanded(true)}
            className="px-3 py-2 rounded-full text-sm bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
          >
            More ↓
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsExpanded(false)}
            className="px-3 py-2 rounded-full text-sm bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
          >
            Less ↑
          </button>
        </div>
      )}

      {/* Render full list only when expanded to avoid duplicates */}
      {isExpanded && (
        <m.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-4"
        >
          {categories.map(({ category, count }) => {
            const isFeatured = category === "Featured Projects";
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsExpanded(false);
                }}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
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
                <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full transition-colors ${isActive ? "bg-black text-white" : "bg-white/10 text-gray-400"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </m.div>
      )}
    </div>
  );
}

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

  const ITEMS_PER_PAGE = 9;

  const getFilteredProjects = (category: string) => {
    if (category === "All") {
      return initialProjects;
    }
    if (category === "Featured Projects") {
      return getFeaturedProjects(9);
    }
    return getVideoProjectsByCategory(category);
  };

  const getInitialDisplayedProjects = (
    projects: VideoProject[],
    targetId: string | null
  ) => {
    if (!targetId) {
      return projects.slice(0, ITEMS_PER_PAGE);
    }

    const targetIndex = projects.findIndex((project) => project.id === targetId);
    if (targetIndex === -1) {
      return projects.slice(0, ITEMS_PER_PAGE);
    }

    return projects.slice(0, Math.max(targetIndex + 1, ITEMS_PER_PAGE));
  };

  const [allProjects, setAllProjects] = useState<VideoProject[]>(() =>
    getFilteredProjects(selectedCategoryFromUrl)
  );

  const [displayedProjects, setDisplayedProjects] = useState<VideoProject[]>(() =>
    getInitialDisplayedProjects(
      getFilteredProjects(selectedCategoryFromUrl),
      scrollToProjectId
    )
  );

  const [currentPage, setCurrentPage] = useState(() =>
    Math.ceil(displayedProjects.length / ITEMS_PER_PAGE)
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    displayedProjects.length < allProjects.length
  );

  useEffect(() => {
    setSelectedCategory(selectedCategoryFromUrl);
  }, [selectedCategoryFromUrl]);

  // Load projects for selected category
  useEffect(() => {
    const projects = getFilteredProjects(selectedCategory);
    const shouldRestoreTarget =
      scrollToProjectId !== null && selectedCategory === selectedCategoryFromUrl;
    const nextDisplayedProjects = shouldRestoreTarget
      ? getInitialDisplayedProjects(projects, scrollToProjectId)
      : projects.slice(0, ITEMS_PER_PAGE);

    setAllProjects(projects);
    setDisplayedProjects(nextDisplayedProjects);
    setCurrentPage(Math.ceil(nextDisplayedProjects.length / ITEMS_PER_PAGE));
    setHasMore(projects.length > nextDisplayedProjects.length);
  }, [selectedCategory, selectedCategoryFromUrl, scrollToProjectId, initialProjects]);

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
        {/* Desktop: keep original full list unchanged */}
        <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex flex-wrap justify-center gap-3 mb-16"
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

        {/* Mobile: compact control with expand/collapse. When collapsed show only active pill + More button; when expanded hide standalone pill and show full mapped list + Less button. */}
        <MobileCategoryFilter
          categories={initialCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={(cat: string) => {
            setSelectedCategory(cat);
            try {
              router.push(`/?category=${encodeURIComponent(cat)}`, { scroll: false });
            } catch (e) {
              if (typeof window !== 'undefined') {
                const url = new URL(window.location.href);
                url.searchParams.set('category', cat);
                window.history.pushState({}, '', url.toString());
              }
            }
          }}
        />

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
