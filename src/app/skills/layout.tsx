import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Skills & Expertise",
  description:
    "Explore Sakibul Saif's skills in video editing, motion graphics, color grading, audio enhancement, and professional post-production.",
  alternates: {
    canonical: "https://www.itsSaif.me/skills",
  },
  openGraph: {
    title: "Skills & Expertise",
    description:
      "Explore Sakibul Saif's skills in video editing, motion graphics, color grading, audio enhancement, and professional post-production.",
    url: "https://www.itsSaif.me/skills",
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
