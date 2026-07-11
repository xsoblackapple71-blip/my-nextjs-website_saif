import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional video editing, motion graphics, color grading, and audio cleanup services from Sakibul Saif.",
  alternates: {
    canonical: "https://saifstudio.vercel.app/services",
  },
  openGraph: {
    title: "Services",
    description:
      "Professional video editing, motion graphics, color grading, and audio cleanup services from Sakibul Saif.",
    url: "https://saifstudio.vercel.app/services",
  },
  twitter: {
    title: "Services",
    description:
      "Professional video editing, motion graphics, color grading, and audio cleanup services from Sakibul Saif.",
  },
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children;
}
