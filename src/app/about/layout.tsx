import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Sakibul Saif",
  description:
    "Learn more about Sakibul Saif, a video editor and motion graphics designer specializing in cinematic storytelling and polished visual content.",
  alternates: {
    canonical: "https://www.itsSaif.me/about",
  },
  openGraph: {
    title: "About Sakibul Saif",
    description:
      "Learn more about Sakibul Saif, a video editor and motion graphics designer specializing in cinematic storytelling and polished visual content.",
    url: "https://www.itsSaif.me/about",
  },
  twitter: {
    title: "About Sakibul Saif",
    description:
      "Learn more about Sakibul Saif, a video editor and motion graphics designer specializing in cinematic storytelling and polished visual content.",
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
