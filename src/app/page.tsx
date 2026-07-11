import type { Metadata } from "next";
import { Suspense } from "react";
import MouseMoveEffect from "@/components/mouse-move-effect";
import Hero from "@/components/hero";
import GlassmorphismCard from "@/components/glassmorphism-card";
import ProjectGrid from "@/components/project-grid";
import {
  getVideoCategoriesWithCountIncludingAll,
  getAllVideoProjectsFlattened,
  getFeaturedProjects,
  VIDEO_CATEGORY_ORDER,
} from "@/lib/helper";

export const metadata: Metadata = {
  title: "Sakibul Saif | Video Editor & Motion Graphics Designer",
  description:
    "Freelance video editor and motion graphics designer in Bangladesh creating cinematic edits, corporate videos, real estate content, and polished YouTube storytelling.",
  alternates: {
    canonical: "https://saifstudio.vercel.app",
  },
  openGraph: {
    title: "Sakibul Saif | Video Editor & Motion Graphics Designer",
    description:
      "Freelance video editor and motion graphics designer in Bangladesh creating cinematic edits, corporate videos, real estate content, and polished YouTube storytelling.",
    url: "https://saifstudio.vercel.app",
  },
  twitter: {
    title: "Sakibul Saif | Video Editor & Motion Graphics Designer",
    description:
      "Freelance video editor and motion graphics designer in Bangladesh creating cinematic edits, corporate videos, real estate content, and polished YouTube storytelling.",
  },
};

export default function HomePage() {
  // Fetch data on the server
  const allCategories = getVideoCategoriesWithCountIncludingAll();
  const featuredProjects = getFeaturedProjects(8);

  const categories = VIDEO_CATEGORY_ORDER.filter((category) =>
    category !== "Featured Projects"
  ).map((category) => {
    const existing = allCategories.find((item) => item.category === category);
    return {
      category,
      count: existing?.count ?? 0,
    };
  });

  const allProjects = getAllVideoProjectsFlattened();
  
  // Update "All" count to match filtered projects and remove duplicate categories
  const updatedCategories = [
    { category: "Featured Projects", count: featuredProjects.length },
    { category: "All", count: allProjects.length },
    ...categories.filter((category) => category.category !== "All" && category.count > 0),
  ];

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
                Video Projects for Brands, Creators, and Businesses
              </span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              From polished corporate videos and real estate edits to YouTube storytelling and motion graphics, I focus on making your content not just polished, but powerful. Explore my <a href="/services" className="text-blue-400 underline decoration-blue-400/40 underline-offset-4 hover:text-blue-300">services</a> or <a href="/contact" className="text-blue-400 underline decoration-blue-400/40 underline-offset-4 hover:text-blue-300">contact me</a> to discuss your next project.
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
              Freelance Video Editing <span className="text-blue-500">& Motion Graphics</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              If you need a freelance video editor in Bangladesh for YouTube, corporate content, or real estate projects, I combine creative storytelling with technical precision to deliver polished results.
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
