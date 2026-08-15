"use client";

import type { MouseEvent } from "react";
import { useState } from "react";
import { m } from "framer-motion";
import { ArrowDown } from "lucide-react";
import MagneticButton from "./magnetic-button";

import { useLenis } from "lenis/react";

export default function Hero() {
    const videos = ["/videos/intro.mp4", "/videos/intro 2.mp4"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const lenis = useLenis();

    const scrollToProjects = (e?: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        e?.preventDefault();

        const target = document.getElementById("project-grid") ?? document.getElementById("projects");
        const offset = 120;

        if (lenis && target) {
            lenis.scrollTo(target, {
                duration: 1.4,
                offset: -offset,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
            return;
        }

        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 sm:pt-28">
            {/* Background Ambience - Deepened and refined */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-blue-900/15 rounded-[100%] blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]" />
            </div>

            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="relative z-10 flex min-h-[calc(100vh-6rem)] w-full items-center justify-center px-4 py-10 sm:px-6 md:px-8 lg:px-10"
            >
                <div className="flex w-full max-w-7xl flex-col items-center justify-center text-center">
                    <m.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
                        whileHover={{ scale: 1.02, boxShadow: "0 30px 120px rgba(59, 130, 246, 0.28)" }}
                        className="group relative mx-auto mb-8 w-[92%] max-w-[1200px] cursor-pointer sm:w-[84%] md:mb-10 md:w-[78%]"
                    >
                        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/20 blur-3xl" />
                        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/40 p-2 shadow-[0_24px_100px_rgba(2,6,23,0.55)] backdrop-blur-xl sm:p-3">
                            <video
                                key={currentIndex}
                                className="aspect-[16/9] w-full rounded-[20px] object-cover"
                                src={videos[currentIndex]}
                                autoPlay
                                muted
                                playsInline
                                controls={false}
                                preload="metadata"
                                onEnded={() => setCurrentIndex((prev) => (prev + 1) % videos.length)}
                            />
                        </div>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.12 }}
                        className="w-full"
                    >
                        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-blue-300 shadow-[0_0_30px_rgba(59,130,246,0.15)] backdrop-blur-xl sm:text-xs">
                            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                            Available for Hire
                        </div>

                        <h1 className="mb-5 text-5xl font-bold leading-[0.9] tracking-[0.02em] text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.25rem]">
                            <span className="block bg-gradient-to-b from-white via-white/95 to-white/45 bg-clip-text text-transparent drop-shadow-sm">
                                SAKIBUL
                            </span>
                            <span className="mt-1 block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                                SAIF
                            </span>
                        </h1>

                        <m.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.18 }}
                            className="mx-auto mb-4 max-w-2xl text-base font-medium uppercase tracking-[0.28em] text-blue-200/90 sm:text-lg"
                        >
                            Cinematic Video Editor & Motion Graphics Designer
                        </m.p>

                        <m.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.24 }}
                            className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg"
                        >
                            I create cinematic edits for YouTube, corporate brands and real estate with a strong focus on storytelling and premium visuals.
                        </m.p>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
                        className="flex w-full max-w-md flex-col items-center justify-center gap-4 sm:max-w-none sm:flex-row sm:gap-6"
                    >
                        <MagneticButton>
                            <a
                                href="#projects"
                                onClick={scrollToProjects}
                                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] sm:w-auto sm:px-10 sm:text-lg"
                            >
                                <span className="relative z-10 flex items-center">View Portfolio</span>
                            </a>
                        </MagneticButton>

                        <MagneticButton>
                            <a
                                href="/contact"
                                className="group inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] sm:w-auto sm:px-10 sm:text-lg"
                            >
                                Contact Me
                            </a>
                        </MagneticButton>
                    </m.div>
                </div>
            </m.div>

            {/* Scroll Indicator */}
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:bottom-12"
            >
                <button
                    onClick={scrollToProjects}
                    className="flex flex-col items-center gap-3 text-white/40 transition-colors duration-500 hover:text-white"
                >
                    <span className="text-[9px] font-medium uppercase tracking-[0.3em] sm:text-[10px]">Scroll</span>
                    <ArrowDown className="animate-bounce" size={18} strokeWidth={1.5} />
                </button>
            </m.div>
        </section>
    );
}
