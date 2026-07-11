"use client";

import { m } from "framer-motion";
import Image from "next/image";
import HeroImage from "../../../Image 1.png";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Marquee from "@/components/ui/marquee";
import CTASection from "@/components/CTASection";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  Cpu,
  Award,
  Clock,
  Zap,
  Quote,
  Sparkles,
  UserCheck,
  FileText,
} from "lucide-react";
import { clientsData } from "@/db/clients";

export default function AboutPage() {
  const SHOW_TRUSTED_BY = false;

  return (
    <div className="min-h-screen flex flex-col justify-center pt-32 pb-12 md:py-24 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mt-0 md:mt-20 mb-3 text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Sakibul Saif</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional video editor and motion graphics designer with 3+ years of experience creating polished content for brands, creators, and businesses. Browse my <a href="/#projects" className="text-blue-400 underline decoration-blue-400/40 underline-offset-4 hover:text-blue-300">recent projects</a> or <a href="/contact" className="text-blue-400 underline decoration-blue-400/40 underline-offset-4 hover:text-blue-300">start a conversation</a> about your next project.
          </p>
        </m.div>

        <BentoGrid className="max-w-6xl mx-auto mb-20">
          {/* 1. Hero Profile - SUPER HIGHLIGHTED */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 md:row-span-2"
          >
            <BentoGridItem
              title=""
              description=""
              header={
                <div className="relative w-full h-full min-h-[32rem] md:min-h-[28rem] lg:min-h-[34rem] rounded-xl overflow-hidden group-hover/bento:scale-[1.02] transition-transform duration-500">
                  <Image
                    src={HeroImage}
                    alt="Portrait of Sakibul Saif, a professional video editor and motion graphics designer"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                    priority
                    className="object-cover object-[50%_20%] grayscale-[0] hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                  {/* Name Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter"
                    >
                      SAKIBUL<br />
                      <span className="text-blue-500">SAIF</span>
                    </m.div>
                    <div className="h-1 w-16 md:w-20 bg-purple-500 mt-4 rounded-full" />
                    <p className="text-gray-300 mt-4 text-xs md:text-sm font-medium tracking-wide uppercase">
                      Video Editor & Motion Graphics Designer
                    </p>
                  </div>
                </div>
              }
              className="h-full shadow-2xl shadow-blue-900/10"
              icon={null} // Icon inside header
            />
          </m.div>

          {/* 2. Stats - Experience - VISUAL */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1"
          >
            <BentoGridItem
              title="Experience"
              description="Years of professional grinding."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-black to-neutral-900 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-emerald-500/30 transition-colors py-8 md:py-0">
                  <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full" />
                  <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-900 z-10">3+</span>
                  <div className="text-emerald-500/50 text-xs font-mono uppercase tracking-[0.2em] z-10 mt-2">Years Active</div>
                </div>
              }
              className="h-full"
              icon={<Clock className="h-4 w-4 text-emerald-500" />}
            />
          </m.div>



          {/* 4. Global Reach - Visual Map */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1"
          >
            <BentoGridItem
              title="Global Reach"
              description="Remote ready."
              header={
                <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#0a0a0a] overflow-hidden flex items-center justify-center border border-white/5">
                  {/* Abstract grid lines for map feel */}
                  <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center animate-pulse">
                      <MapPin className="text-blue-500" size={32} />
                    </div>
                    <div className="mt-2 bg-blue-500/20 backdrop-blur text-blue-300 px-3 py-1 rounded text-xs font-bold border border-blue-500/30">
                      WORLDWIDE
                    </div>
                  </div>
                </div>
              }
              className="h-full"
              icon={<MapPin className="h-4 w-4 text-indigo-500" />}
            />
          </m.div>

          {/* 5. Professional Brief / CV Card */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2"
          >
            <BentoGridItem
              title="Interactive Resume / CV Card"
              description="Professional Brief"
              header={
                <div className="flex flex-1 w-full h-full min-h-[16rem] rounded-xl border border-white/5 bg-gradient-to-br from-neutral-950 via-slate-950 to-neutral-900 shadow-[0_0_50px_rgba(59,130,246,0.1)] p-8">
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-500/10 border border-violet-500/20 text-violet-300 shadow-[0_0_30px_rgba(139,92,246,0.15)] backdrop-blur-xl">
                        <FileText size={26} />
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.4em] text-violet-300/90 mb-1">Professional Brief</p>
                        <h3 className="text-xl font-semibold text-white">Want a deeper breakdown?</h3>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-8">
                      Want to look at the complete corporate timeline, technical software stack, and full experience breakdown? Access my full resume here.
                    </p>
                    <a
                      href="/MD_Shakibul_Islam_Video_editor.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full max-w-xs px-6 py-3 rounded-full bg-white/10 border border-white/10 text-white font-semibold transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]"
                    >
                      <span>View Full CV</span>
                      <span className="ml-3 inline-flex h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.45)] animate-pulse" />
                    </a>
                  </div>
                </div>
              }
              className="h-full"
              icon={<FileText className="h-4 w-4 text-violet-400" />}
            />
          </m.div>

          {/* 6. Socials - Visual Bar */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-1"
          >
            <BentoGridItem
              title="Connect"
              description=""
              header={
                <div className="flex flex-1 h-full w-full items-center justify-between px-6 bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-xl border border-white/5 py-4 md:py-0 min-h-[5rem]">
                  <a href="https://www.instagram.com/saif.mlx/" target="_blank" rel="noopener noreferrer" aria-label="Visit Sakibul Saif on Instagram" className="p-3 bg-white/5 rounded-full hover:bg-pink-600 hover:scale-110 transition-all duration-300 text-white"><Instagram size={20} /></a>
                  <a href="https://www.youtube.com/@SakibulSaifxAlpha" target="_blank" rel="noopener noreferrer" aria-label="Visit Sakibul Saif on YouTube" className="p-3 bg-white/5 rounded-full hover:bg-red-600 hover:scale-110 transition-all duration-300 text-white"><Youtube size={20} /></a>
                  <a href="https://mail.google.com/mail/?view=cm&to=saifefx@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email Sakibul Saif" className="p-3 bg-white/5 rounded-full hover:bg-blue-600 hover:scale-110 transition-all duration-300 text-white"><Mail size={20} /></a>
                </div>
              }
              className="h-full"
              icon={<Zap className="h-4 w-4 text-white" />}
            />
          </m.div>

          {/* 7. Personal Background Grid */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="md:col-span-2"
          >
            <BentoGridItem
              title="My Story & Passion"
              description="The Journey Behind the Lens"
              header={
                <div className="flex flex-1 w-full h-full min-h-[20rem] rounded-xl border border-white/5 bg-gradient-to-br from-neutral-950 via-slate-950 to-neutral-900 shadow-[0_0_40px_rgba(255,255,255,0.03)] p-8">
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-500/10 border border-blue-500/20 text-blue-300 shadow-[0_0_30px_rgba(59,130,246,0.15)] backdrop-blur-xl">
                        <Sparkles size={26} />
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.4em] text-blue-300/90 mb-1">Creative Pulse</p>
                        <h3 className="text-xl font-semibold text-white">The Journey Behind the Lens</h3>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      With 3+ years of experience, I create polished content using Adobe Premiere Pro, After Effects, Photoshop, and CapCut. My work spans corporate videos, real estate videos, talking head videos, YouTube content, and motion graphics for clients who value clear storytelling, strong visuals, and professional results.
                    </p>
                  </div>
                </div>
              }
              className="h-full"
              icon={<Sparkles className="h-4 w-4 text-cyan-400" />}
            />
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="md:col-span-1"
          >
            <BentoGridItem
              title="Personal Blueprint"
              description="Quick Facts"
              header={
                <div className="flex flex-1 w-full h-full min-h-[20rem] rounded-xl border border-white/5 bg-[#020817] shadow-[0_0_40px_rgba(255,255,255,0.03)] p-6">
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.15)] backdrop-blur-xl">
                        <UserCheck size={26} />
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300/90 mb-1">Blueprint & Roots</p>
                        <h3 className="text-xl font-semibold text-white">Education & Languages</h3>
                      </div>
                    </div>
                    <div className="space-y-4 text-sm text-gray-300">
                      <div>
                        <p className="text-gray-400 uppercase tracking-[0.2em] text-[0.68rem] mb-1">Education</p>
                        <p>BA (Honors) in English at European University of Bangladesh (Running)</p>
                        <p>HSC completed from Chatmohar Govt. College.</p>
                      </div>
                      <div>
                        <p className="text-gray-400 uppercase tracking-[0.2em] text-[0.68rem] mb-1">Bangla & English</p>
                        <p>Full Professional Fluency (Speaking + Writing).</p>
                      </div>
                      <div>
                        <p className="text-gray-400 uppercase tracking-[0.2em] text-[0.68rem] mb-1">Hindi</p>
                        <p>Conversational Fluency (Listening + Speaking only).</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
              className="h-full"
              icon={<UserCheck className="h-4 w-4 text-emerald-400" />}
            />
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="md:col-span-3"
          >
            <BentoGridItem
              title="Philosophy"
              description="Story is King."
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-black border border-white/5 p-6 flex items-center">
                  <Quote className="text-white/10 absolute top-4 right-4" size={48} />
                  <p className="text-gray-300 italic text-sm md:text-base leading-relaxed relative z-10">
                    "I don't just cut footage; I construct feelings. Every frame must earn its place on the timeline, serving the narrative above all else."
                  </p>
                </div>
              }
              className="h-full"
              icon={<Award className="h-4 w-4 text-yellow-500" />}
            />
          </m.div>

        </BentoGrid>

        {/* Clients Section */}
        {SHOW_TRUSTED_BY && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Trusted By</h2>
              <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
            </div>

            <div
              className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background py-10"
              style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
            >
              <Marquee className="[--duration:20s]">
                {clientsData.map((client) => (
                  <div key={client.id} className="mx-8 flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 cursor-pointer">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white/5 p-4 flex items-center justify-center shadow-sm hover:shadow-md hover:bg-white/10 transition-all">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="mt-3 text-xs font-medium text-gray-400 group-hover:text-gray-200 transition-colors text-center whitespace-nowrap">
                      {client.name}
                    </p>
                  </div>
                ))}
              </Marquee>
            </div>
          </m.div>
        )}

        <CTASection
          title="Ready to Work Together?"
          description="Let's make something that breaks the internet."
          buttonText="Start Collaboration"
          href="/contact"
        />
      </div>
    </div>
  );
}
