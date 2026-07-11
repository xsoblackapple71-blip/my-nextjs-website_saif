import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Skills & Expertise",
  description:
    "Explore Sakibul Saif's skills in video editing, motion graphics, color grading, audio enhancement, and professional post-production.",
  alternates: {
    canonical: "https://saifstudio.vercel.app/skills",
  },
  openGraph: {
    title: "Skills & Expertise",
    description:
      "Explore Sakibul Saif's skills in video editing, motion graphics, color grading, audio enhancement, and professional post-production.",
    url: "https://saifstudio.vercel.app/skills",
  },
  twitter: {
    title: "Skills & Expertise",
    description:
      "Explore Sakibul Saif's skills in video editing, motion graphics, color grading, audio enhancement, and professional post-production.",
  },
};

export default function SkillsLayout({ children }: { children: ReactNode }) {
  return children;
}
