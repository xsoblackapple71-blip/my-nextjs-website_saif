"use client";

import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import GlassmorphismCard from "@/components/glassmorphism-card";
import {
  Play,
  Palette,
  Volume2,
  Sparkles,
  Film,
  Zap,
  ArrowRight,
  Check,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: Play,
      title: "YouTube & Social Media Video Editing",
      description:
        "Engaging edits optimized for different platforms with perfect pacing and retention hooks.",
      features: [
        "Platform-specific optimization",
        "Retention-focused editing",
        "Thumbnail creation",
        "SEO-friendly titles",
        "Engagement hooks",
      ],
      color: "text-red-400",
    },
    {
      icon: Film,
      title: "Course & Tutorial Video Editing",
      description:
        "Clear, educational content with smooth transitions and professional presentation.",
      features: [
        "Screen recording editing",
        "Multi-camera sync",
        "Chapter markers",
        "Subtitle integration",
        "Interactive elements",
      ],
      color: "text-blue-400",
    },
    {
      icon: Sparkles,
      title: "Motion Graphics & Animated Titles",
      description:
        "Eye-catching animations and graphics that enhance your storytelling.",
      features: [
        "Custom animations",
        "Kinetic typography",
        "Infographic animations",
        "Transition effects",
        "Brand-consistent design",
      ],
      color: "text-purple-400",
    },
    {
      icon: Palette,
      title: "Color Correction & Grading",
      description:
        "Professional color work that gives your videos a cinematic and polished look.",
      features: [
        "Cinematic color grading",
        "Color matching",
        "Exposure correction",
        "Skin tone enhancement",
        "Mood creation",
      ],
      color: "text-green-400",
    },
    {
      icon: Zap,
      title: "Logo Animations & Lower Thirds",
      description:
        "Professional branding elements that make your content look premium.",
      features: [
        "Logo reveals",
        "Animated lower thirds",
        "Brand package creation",
        "Consistent styling",
        "Multiple variations",
      ],
      color: "text-yellow-400",
    },
    {
      icon: Volume2,
      title: "Audio Sync & Cleanup",
      description:
        "Crystal clear audio with perfect synchronization and noise reduction.",
      features: [
        "Audio synchronization",
        "Noise reduction",
        "Audio enhancement",
        "Music mixing",
        "Voice optimization",
      ],
      color: "text-cyan-400",
    },
  ];

  const packages = [
    {
      name: "Basic Edit",
      price: "$50-100",
      description: "Perfect for simple YouTube videos and social media content",
      features: [
        "Basic cuts and transitions",
        "Color correction",
        "Audio sync",
        "Simple graphics",
        "1-2 revisions",
      ],
      popular: false,
    },
    {
      name: "Professional Edit",
      price: "$100-250",
      description: "Comprehensive editing for professional content",
      features: [
        "Advanced editing techniques",
        "Motion graphics",
        "Color grading",
        "Audio enhancement",
        "Custom animations",
        "3-5 revisions",
      ],
      popular: true,
    },
    {
      name: "Premium Package",
      price: "$250-500",
      description: "Full production service for high-end content",
      features: [
        "Complete post-production",
        "Advanced motion graphics",
        "Professional color grading",
        "Audio mastering",
        "Custom branding elements",
        "Unlimited revisions",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 md:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 text-white">
            My Services
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            From concept to completion, I offer comprehensive video editing and
            motion graphics services to bring your vision to life.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mb-16 md:mb-20"
        >
          {services.map((service, index) => (
            <m.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassmorphismCard className="p-6 sm:p-7 h-full">
                <div className="flex h-full flex-col space-y-4">
                  <service.icon className={`${service.color} mb-2`} size={32} />
                  <h3 className="text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-sm text-gray-300"
                      >
                        <Check className="mr-2 text-green-400" size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassmorphismCard>
            </m.div>
          ))}
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
              Pricing Packages
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              Choose the package that fits your project needs
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((pkg, index) => (
              <m.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="h-full"
              >
                <GlassmorphismCard
                  className={`p-6 sm:p-8 h-full relative flex flex-col ${pkg.popular ? "ring-2 ring-blue-500" : ""}`}
                >
                  {pkg.popular && (
                    <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg shadow-blue-600/20">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className={`flex flex-1 flex-col ${pkg.popular ? "pt-8" : "pt-2"}`}>
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2 text-white">
                        {pkg.name}
                      </h3>
                      <div className="text-3xl font-bold text-blue-400 mb-2">
                        {pkg.price}
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>
                    <ul className="flex-1 space-y-3 mb-8">
                      {pkg.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center text-sm text-gray-300"
                        >
                          <Check
                            className="mr-3 text-green-400 flex-shrink-0"
                            size={16}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`mt-auto w-full ${pkg.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 hover:bg-gray-600"}`}
                      asChild
                    >
                      <a href="/contact">Get Started</a>
                    </Button>
                  </div>
                </GlassmorphismCard>
              </m.div>
            ))}
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-16"
        >
          <GlassmorphismCard className="p-6 sm:p-8">
            <h3 className="text-2xl font-semibold mb-8 text-white text-center">
              My Process
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Consultation",
                  description:
                    "We discuss your vision, goals, and requirements",
                },
                {
                  step: "02",
                  title: "Planning",
                  description:
                    "I create a detailed plan and timeline for your project",
                },
                {
                  step: "03",
                  title: "Production",
                  description: "I work on your project with regular updates",
                },
                {
                  step: "04",
                  title: "Delivery",
                  description: "Final review, revisions, and project delivery",
                },
              ].map((process) => (
                <div key={process.step} className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {process.step}
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-white">
                    {process.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{process.description}</p>
                </div>
              ))}
            </div>
          </GlassmorphismCard>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="text-center"
        >
          <GlassmorphismCard className="p-6 sm:p-8">
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Let's discuss your project and create something amazing together.
              I'm here to help bring your vision to life with professional video
              editing and motion graphics.
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <a href="/contact">
                Get a Quote <ArrowRight className="ml-2" size={20} />
              </a>
            </Button>
          </GlassmorphismCard>
        </m.div>
      </div>
    </div>
  );
}
