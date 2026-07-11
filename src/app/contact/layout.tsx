import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact Sakibul Saif",
  description:
    "Get in touch with Sakibul Saif for professional video editing, motion graphics, and content creation services.",
  alternates: {
    canonical: "https://www.itsSaif.me/contact",
  },
  openGraph: {
    title: "Contact Sakibul Saif",
    description:
      "Get in touch with Sakibul Saif for professional video editing, motion graphics, and content creation services.",
    url: "https://www.itsSaif.me/contact",
  },
  twitter: {
    title: "Contact Sakibul Saif",
    description:
      "Get in touch with Sakibul Saif for professional video editing, motion graphics, and content creation services.",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
