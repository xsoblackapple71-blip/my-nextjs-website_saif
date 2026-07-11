import React from "react";
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/navbar";
import MouseMoveEffect from "@/components/mouse-move-effect";
import JumpToTop from "@/components/jump-to-top";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";
import FramerLazyMotion from "@/components/framer-lazy-motion";
import AnalyticsBeacon from "@/components/analytics-beacon";

const inter = Inter({ subsets: ["latin"] });
// const nunito = Nunito({ subsets: ["latin"] });q

export const metadata: Metadata = {
  metadataBase: new URL("https://www.itsSaif.me"),
  title: {
    default: "Sakibul Saif | Video Editor & Motion Graphics Designer",
    template: "%s | Sakibul Saif",
  },
  description:
    "Professional video editor and motion graphics designer creating cinematic edits, YouTube content, motion graphics, and polished visual storytelling for brands and creators.",
  keywords: [
    "Sakibul Saif",
    "Video Editor",
    "Motion Graphics Designer",
    "DaVinci Resolve",
    "Premiere Pro",
    "After Effects",
    "Color Grading",
    "YouTube Video Editing",
    "Course Video Editing",
    "Logo Animation",
    "Visual Storytelling",
    "Freelance Video Editor",
    "Bangladesh Video Editor",
    "Cinematic Editing",
    "Content Creator",
    "Lower Thirds",
    "Audio Sync",
  ],
  authors: [{ name: "Sakibul Saif", url: "https://www.itsSaif.me" }],
  creator: "Sakibul Saif",
  publisher: "Sakibul Saif",
  applicationName: "Sakibul Saif Portfolio",
  category: "Video Editing",
  classification: "Portfolio",
  icons: {
    icon: "/Logo.png",
    apple: "/Logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.itsSaif.me",
    title: "Sakibul Saif | Video Editor & Motion Graphics Designer",
    description:
      "Professional video editor and motion graphics designer creating cinematic edits, YouTube content, motion graphics, and polished storytelling for brands and creators.",
    siteName: "Sakibul Saif Portfolio",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "Sakibul Saif portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakibul Saif | Video Editor & Motion Graphics Designer",
    description:
      "Cinematic edits, motion graphics, and polished storytelling for YouTube, brands, and creators.",
    creator: "@sakibulsaif",
    site: "@sakibulsaif",
    images: ["/Logo.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://www.itsSaif.me",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/Logo.png" />
        <link rel="apple-touch-icon" href="/Logo.png" />
        <meta name="theme-color" content="#020817" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sakibul Saif",
              url: "https://www.itsSaif.me",
              image: "/Logo.png",
              sameAs: ["https://www.itsSaif.me"],
              jobTitle: "Video Editor & Motion Graphics Designer",
              knowsAbout: [
                "Video Editing",
                "Motion Graphics",
                "DaVinci Resolve",
                "Adobe Premiere Pro",
                "Adobe After Effects",
                "Color Grading",
                "Audio Syncing",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              alumniOf: {
                "@type": "Organization",
                name: "Green University of Bangladesh",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen text-white`}
        style={{
          background: "#020817",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="grid-background-large min-h-screen">
          <SmoothScroll>
            <FramerLazyMotion>
              <MouseMoveEffect />
              <Navbar />
              <main className="">{children}</main>
              <Footer />
              <JumpToTop />
              <Toaster position="top-center" />
            </FramerLazyMotion>
          </SmoothScroll>
        </div>
        <AnalyticsBeacon />
      </body>
    </html>
  );
}
