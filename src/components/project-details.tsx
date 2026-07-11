"use client";

import { useState, useCallback } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import GlassmorphismCard from "@/components/glassmorphism-card";
import YouTubeChannelLogo from "@/components/youtube-channel-logo";
import {
    ArrowLeft,
    Play,
    Clock,
    User,
    Calendar,
    Quote,
    ExternalLink,
} from "lucide-react";
import { getYouTubeEmbedUrl } from "@/lib/helper";
import type { VideoProject } from "@/types/videos";

interface ProjectDetailsProps {
    project: VideoProject;
}

function getProjectDisplayDescription(project: VideoProject) {
    const cleanDescription = project.video_description
        .replace(/\s+/g, " ")
        .trim();
    const firstSentence = cleanDescription.split(".")[0]?.trim() || cleanDescription;
    const categoryText = project.category?.join(", ").toLowerCase() || "video editing";
    const clientText = project.client_name ? ` for ${project.client_name}` : "";

    return `${firstSentence}. This ${categoryText} project combines clean pacing, thoughtful motion graphics, and polished storytelling${clientText}.`;
}

function getProjectAltText(project: VideoProject, variant: "preview" | "gallery" = "preview") {
    return variant === "gallery"
        ? `${project.video_title} project gallery image by Sakibul Saif`
        : `${project.video_title} preview image by Sakibul Saif`;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get("category") || "Featured Projects";
    const projectScrollId = searchParams.get("scrollTo") || project.id;
    const [showVideo, setShowVideo] = useState(false);
    const embedUrl = getYouTubeEmbedUrl(project.video_link);
    const detailsPlayerSrc = embedUrl ? `${embedUrl}?autoplay=1` : null;

        const handleBack = useCallback(() => {
            const canGoBack =
                typeof window !== "undefined" &&
                window.history.state?.idx !== undefined &&
                window.history.state.idx > 0;

            if (canGoBack) {
                router.back();
                return;
            }

            // Fallback when browser history cannot restore directly, preserve category and project target.
            router.push(
                `/?category=${encodeURIComponent(selectedCategory)}&scrollTo=${encodeURIComponent(projectScrollId)}#project-card-${encodeURIComponent(projectScrollId)}`,
                { scroll: false }
            );
        }, [router, selectedCategory, projectScrollId]);

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <m.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        className="flex items-center pl-4 pr-6 py-2 h-auto text-sm font-medium text-white bg-white/5 border border-white/10 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl group"
                    >
                        <ArrowLeft className="mr-2" size={16} />
                        Back to Projects
                    </Button>
                </m.div>

                {/* Video Player Section */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <GlassmorphismCard className="p-4 md:p-6">
                        <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-900">
                            {showVideo && detailsPlayerSrc ? (
                                <iframe
                                    src={detailsPlayerSrc}
                                    title={project.video_title}
                                    className="w-full h-full"
                                    allowFullScreen
                                    allow="autoplay; encrypted-media"
                                />
                            ) : (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={
                                            project.cover_image
                                                ? `https://img.youtube.com/vi/${project.cover_image}/maxresdefault.jpg`
                                                : "/placeholder.svg"
                                        }
                                        alt={getProjectAltText(project, "preview")}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 75vw"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <Button
                                            onClick={() => setShowVideo(true)}
                                            size="lg"
                                            className="bg-red-600 hover:bg-red-700 cursor-pointer"
                                        >
                                            <Play className="mr-2" size={24} />
                                            Play Video
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </GlassmorphismCard>
                </m.div>

                {/* Project Details Section */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                >
                    <GlassmorphismCard className="p-6 md:p-8">
                        <div className="mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-end mb-4 gap-4">
                                {project.duration && (
                                    <div className="flex items-center text-gray-400 text-sm">
                                        <Clock className="mr-1" size={14} />
                                        {project.duration}
                                    </div>
                                )}
                            </div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
                                {project.video_title}
                            </h1>
                            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                                {getProjectDisplayDescription(project)}
                            </p>
                            <p className="mt-4 text-sm text-blue-300">
                                Looking for similar work? Visit my <a href="/services" className="underline decoration-blue-400/50 underline-offset-4 hover:text-white">services</a> or <a href="/contact" className="underline decoration-blue-400/50 underline-offset-4 hover:text-white">contact me</a> to discuss your next project.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-white">
                                    Project Details
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center text-gray-400">
                                        <Calendar className="mr-2" size={14} />
                                        <span>
                                            Published:{" "}
                                            {new Date(project.publish_date).toLocaleDateString(
                                                "en-US",
                                                {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                }
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-400">
                                        <User className="mr-2" size={14} />
                                        <span>Client: {project.client_name}</span>
                                    </div>
                                </div>
                            </div>

                            {project.software_used && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-white">
                                        Tools & Software
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.software_used.map((software) => (
                                            <Badge
                                                key={software}
                                                variant="outline"
                                                className="border-gray-600 text-gray-300"
                                            >
                                                {software}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-3 text-white">
                                Project Categories
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.category.map((category) => (
                                    <Badge
                                        key={category}
                                        variant="outline"
                                        className="border-gray-600 text-gray-300"
                                    >
                                        {category}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild className="bg-red-600 hover:bg-red-700">
                                <a
                                    href={project.video_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ExternalLink className="mr-2" size={16} />
                                    Watch on YouTube
                                </a>
                            </Button>
                        </div>
                    </GlassmorphismCard>
                </m.div>

                {/* Project Gallery */}
                {project.project_images && project.project_images.length > 0 && (
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-16"
                    >
                        <GlassmorphismCard className="p-8">
                            <h3 className="text-2xl font-semibold mb-6 text-white text-center">
                                Project Gallery
                            </h3>
                            <Carousel className="w-full max-w-4xl mx-auto">
                                <CarouselContent>
                                    {project.project_images.map((image, index) => (
                                        <CarouselItem key={index} className="basis-1/2">
                                            <div className="p-1">
                                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                                    <Image
                                                        src={image || "/placeholder.svg"}
                                                        alt={getProjectAltText(project, "gallery")}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                        loading="lazy"
                                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="cursor-pointer" />
                                <CarouselNext className="cursor-pointer" />
                            </Carousel>
                        </GlassmorphismCard>
                    </m.div>
                )}

                {/* Client Feedback */}
                {project.client_feedback && (
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-16"
                    >
                        <GlassmorphismCard className="p-8">
                            <h3 className="text-2xl font-semibold mb-6 text-white text-center">
                                Client Feedback
                            </h3>
                            <div className="max-w-3xl mx-auto">
                                <div className="flex items-center justify-center space-x-4 mb-6">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10">
                                        <YouTubeChannelLogo
                                            videoUrl={project.video_link}
                                            clientName={project.client_name}
                                            className="w-16 h-16"
                                            fallbackImage={project.client_image}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-medium text-white text-lg">
                                            {project.client_name}
                                        </p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <Quote
                                        className="absolute -top-4 -left-4 text-blue-400 opacity-50"
                                        size={32}
                                    />
                                    <blockquote className="text-gray-300 italic text-lg text-center leading-relaxed pl-8">
                                        "{project.client_feedback}"
                                    </blockquote>
                                </div>
                            </div>
                        </GlassmorphismCard>
                    </m.div>
                )}
            </div>
        </div>
    );
}
