import { fetchProject } from "@/lib/fetchProjects";
import { Metadata } from "next";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ title: string }>;
}): Promise<Metadata> {
  const slugs = await(params)
  const title = decodeURIComponent(slugs.title)
  const project = await fetchProject(title); // Implement this function
  if (!project) {
    return {
      title: `${title} - AsterixhDev Portfolio`,
      description: "No project found with the name " + title,
      openGraph: {
        title: `${title} - AsterixhDev Portfolio`,
        description: "No project found with the name " + title,
        images: "/images/my-image.jpg",
      },
    };
  }

  return {
    title: `${title} - AsterixhDev Portfolio`,
    description: project.description,
    openGraph: {
      title: `${title} - AsterixhDev Portfolio`,
      description: project.description,
      images: project.projectImages,
    },
  };
}

export default function ProjectLayout({ children }: Props) {
  return children;
}
