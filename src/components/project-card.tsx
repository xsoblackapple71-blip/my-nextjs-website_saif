"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import GlassmorphismCard from "@/components/glassmorphism-card";
import CategoryPlaceholder from "@/components/category-placeholder";
import YouTubeChannelLogo from "@/components/youtube-channel-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VideoProject } from "@/types/videos";
import { getYouTubeEmbedUrl } from "@/lib/helper";

interface ProjectCardProps {
    project: VideoProject;
    currentCategory?: string;
}

export default function ProjectCard({ project, currentCategory = "All" }: ProjectCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const embedUrl = getYouTubeEmbedUrl(project.video_link);
    const modalPlayerSrc = embedUrl
        ? `${embedUrl}?autoplay=1&modestbranding=1&showinfo=0&rel=0&playsinline=1`
        : null;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isModalOpen]);

    const handleOpenModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleCloseModal = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        e?.preventDefault();
        setIsModalOpen(false);
    };

    return (
        <div className="h-full">
            <GlassmorphismCard className="h-full group hover:shadow-2xl hover:shadow-blue-900/10 transition-shadow duration-500 flex flex-col">
                <div className="flex flex-col h-full p-5">
                    {/* Media Area */}
                    <div className="relative overflow-hidden rounded-2xl aspect-video mb-5 shadow-lg bg-black isolate">
                        <div
                            className="relative w-full h-full cursor-pointer group/thumb"
                            onClick={handleOpenModal}
                        >
                            {imageError ? (
                                <CategoryPlaceholder 
                                    category={project.category[0] || 'Video'}
                                    title={project.video_title}
                                />
                            ) : (
                                <m.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full h-full"
                                >
                                    <Image
                                        src={`https://img.youtube.com/vi/${project.cover_image}/maxresdefault.jpg`}
                                        alt={`${project.video_title} thumbnail for ${project.category[0] || "video project"}`}
                                        fill
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        loading="lazy"
                                        onError={() => setImageError(true)}
                                    />
                                </m.div>
                            )}

                            {!imageError && (
                                <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-black/40 transition-colors duration-300 flex items-center justify-center backdrop-blur-[0px] group-hover/thumb:backdrop-blur-[2px]">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white transform scale-90 group-hover/thumb:scale-110 transition-all duration-300 shadow-xl shadow-black/20">
                                        <Play className="ml-1 fill-white" size={28} />
                                    </div>
                                </div>
                            )}

                            {project.duration && (
                                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm border border-white/10 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                                    {project.duration}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col relative w-full">
                        {/* Category Tags - Absolute positioning on top right or just below title if preferred */}
                        <div className="flex gap-2 mb-3 flex-wrap">
                            {project.category.slice(0, 2).map((cat) => (
                                <Badge key={cat} variant="secondary" className="bg-white/5 hover:bg-white/10 text-gray-400 text-[10px] font-normal border-none">
                                    {cat}
                                </Badge>
                            ))}
                        </div>

                        <Link href={`/project/${project.id}?category=${encodeURIComponent(currentCategory)}&scrollTo=${project.id}`} className="block group/title">
                            <h3 className="text-xl font-bold mb-3 text-white group-hover/title:text-blue-400 transition-colors line-clamp-2 leading-tight">
                                {project.video_title}
                            </h3>
                        </Link>

                        <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                            {project.video_description}
                        </p>

                        {/* Actions & Metadata */}
                        <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                                    <YouTubeChannelLogo
                                        videoUrl={project.video_link}
                                        clientName={project.client_name}
                                        className="w-8 h-8"
                                        fallbackImage={project.client_image}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium text-white line-clamp-1 max-w-[100px] truncate">{project.client_name}</span>
                                    <span className="text-[10px] text-gray-500">{new Date(project.publish_date).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link href={`/project/${project.id}?category=${encodeURIComponent(currentCategory)}&scrollTo=${project.id}`}>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 px-5 text-xs font-medium text-white bg-white/5 border border-white/10 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl"
                                    >
                                        Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </GlassmorphismCard>

            <AnimatePresence>
                {isModalOpen && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm px-4 sm:px-6"
                        onClick={handleCloseModal}
                    >
                        <m.div
                            initial={{ scale: 0.96, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.96, opacity: 0, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full max-w-5xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="absolute -top-12 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white transition hover:bg-black/80"
                                aria-label="Close video"
                            >
                                <X size={18} />
                            </button>

                            {modalPlayerSrc ? (
                                <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl" style={{ aspectRatio: "16 / 9" }}>
                                    <iframe
                                        src={modalPlayerSrc}
                                        title={project.video_title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="absolute inset-0 h-full w-full border-0"
                                    />
                                </div>
                            ) : (
                                <div className="flex h-[60vh] w-full items-center justify-center rounded-2xl bg-black/80 text-white">
                                    Video unavailable for embedding
                                </div>
                            )}
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}
