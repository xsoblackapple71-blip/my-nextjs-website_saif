import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allVideoProjects } from "@/db/projects";
import ProjectDetails from "@/components/project-details";
import type { VideoProject } from "@/types/videos";

const siteUrl = "https://saifstudio.vercel.app";

function getProjectSeoTitle(project: VideoProject) {
  const categoryLabel = project.category?.[0] || "Video Project";
  return `${project.video_title} | ${categoryLabel} by Sakibul Saif`;
}

function getProjectSeoDescription(project: VideoProject) {
  const cleanDescription = project.video_description
    .replace(/\s+/g, " ")
    .trim();
  const shortDescription = cleanDescription.length > 155
    ? `${cleanDescription.slice(0, 152)}...`
    : cleanDescription;
  const categoryText = project.category?.join(", ").toLowerCase() || "video editing";
  const clientText = project.client_name ? ` for ${project.client_name}` : "";

  return `${shortDescription} This ${categoryText} project by Sakibul Saif delivers polished storytelling, motion graphics, and professional editing${clientText}.`;
}

// Generate unique static params for all projects
export async function generateStaticParams() {
  return allVideoProjects.map((project) => ({
    id: project.id,
  }));
}

// Generate metadata for each project
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = allVideoProjects.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const seoTitle = getProjectSeoTitle(project);
  const seoDescription = getProjectSeoDescription(project);

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: `${siteUrl}/project/${project.id}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `${siteUrl}/project/${project.id}`,
      images: [
        {
          url: `https://img.youtube.com/vi/${project.cover_image}/maxresdefault.jpg`,
          width: 1280,
          height: 720,
          alt: `${project.video_title} by Sakibul Saif`,
        },
      ],
    },
    twitter: {
      title: seoTitle,
      description: seoDescription,
      images: [`https://img.youtube.com/vi/${project.cover_image}/maxresdefault.jpg`],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = allVideoProjects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}
