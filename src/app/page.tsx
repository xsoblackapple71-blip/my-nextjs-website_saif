import { Suspense } from "react";
import MouseMoveEffect from "@/components/mouse-move-effect";
import Hero from "@/components/hero";
import GlassmorphismCard from "@/components/glassmorphism-card";
import ProjectGrid from "@/components/project-grid";
import {
  getVideoCategoriesWithCountIncludingAll,
  getAllVideoProjectsFlattened,
  getFeaturedProjects,
} from "@/lib/helper";

export default function HomePage() {
  // Fetch data on the server
  const allCategories = getVideoCategoriesWithCountIncludingAll();
  const featuredProjects = getFeaturedProjects(6);

  // Keep only: All, Music Video, Documentary, Tutorial, Event Videos, Corporate Videos, Talking head, Motion Graphics, Promotional Video, Motion reel
  const categories = allCategories.filter(cat => 
    ["All", "Music Video", "Documentary", "Tutorial", "Event Videos", "Corporate Videos", "Talking head", "Motion Graphics", "Promotional Video", "Motion reel", "Seminar Video", "Anime fact Reel Video"].includes(cat.category)
  );

  // Filter projects to only show allowed categories
  const allProjects = getAllVideoProjectsFlattened().filter(project => 
    project.category.includes("Music Video") || project.category.includes("Documentary") || project.category.includes("Tutorial") || project.category.includes("Event Videos") || project.category.includes("Corporate Videos") || project.category.includes("Talking head") || project.category.includes("Motion Graphics") || project.category.includes("Promotional Video") || project.category.includes("Motion reel") || project.category.includes("Seminar Video") || project.category.includes("Anime fact Reel Video")
  );
  
  // Update "All" count to match filtered projects and remove duplicate categories
  const updatedCategories = [
    { category: "Featured Projects", count: featuredProjects.length },
    ...categories.map((cat) =>
      cat.category === "All" ? { ...cat, count: allProjects.length } : cat
    ),
  ].reduce((acc, categoryItem) => {
    if (!acc.some((item) => item.category === categoryItem.category)) {
      acc.push(categoryItem);
    }
    return acc;
  }, [] as { category: string; count: number }[]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MouseMoveEffect />

      <Hero />

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 relative">
            {/* Spotlight Effect behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight relative z-10">
              <span className="bg-gradient-to-r from-white via-blue-100 to-gray-400 bg-clip-text text-transparent">
                My Video Projects
              </span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              From smooth transitions to precise audio syncing and dynamic
              animations — I focus on making your content not just polished, but
              <span className="text-blue-400 font-medium"> powerful</span>.
            </p>

            <div className="mx-auto mt-10 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-3 text-sm text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.18)] backdrop-blur-xl">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)] animate-pulse" />
              Featured Projects are hand-picked and appear first in the category filter.
            </div>
          </div>

          <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading projects...</div>}>
            <ProjectGrid initialCategories={updatedCategories} initialProjects={allProjects} />
          </Suspense>
        </div>
      </section>

      {/* What I Can Do Section */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              What I Can Do <span className="text-blue-500">for You</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              If you're looking for someone who blends creativity with technical
              skill, communicates clearly, and truly cares about results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "YouTube Editing",
                description: "Engaging edits optimized for retention with perfect pacing.",
                icon: "🎬",
              },
              {
                title: "Course Content",
                description: "Clear, educational content with professional polish.",
                icon: "📚",
              },
              {
                title: "Motion Graphics",
                description: "Eye-catching animations that enhance your storytelling.",
                icon: "✨",
              },
              {
                title: "Color Grading",
                description: "Cinematic looks that give your videos a premium feel.",
                icon: "🎨",
              },
              {
                title: "Logo Animation",
                description: "Professional branding elements that stand out.",
                icon: "🏷️",
              },
              {
                title: "Audio Engineering",
                description: "Crystal clear audio mix with noise reduction.",
                icon: "🎵",
              },
            ].map((service, index) => (
              <div key={service.title} className="h-full">
                <GlassmorphismCard className="p-8 h-full flex flex-col items-center text-center group hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <div className="text-5xl mb-6 bg-white/5 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 border border-white/5">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </GlassmorphismCard>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
