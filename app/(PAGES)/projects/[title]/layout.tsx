import { fetchProject } from "@/lib/fetchProjects";
import { Metadata } from "next";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: {
  params: { title: string };
}): Promise<Metadata> {
  const project = await fetchProject(params.title); // Implement this function
  if (!project) {
    return {
      title: `${params.title} - AsterixhDev Portfolio`,
      description: "No project found with the name " + params.title,
      openGraph: {
        title: `${params.title} - AsterixhDev Portfolio`,
        description: "No project found with the name " + params.title,
        images: "/images/my-image.jpg",
      },
    };
  }

  return {
    title: `${project.title} - AsterixhDev Portfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} - AsterixhDev Portfolio`,
      description: project.description,
      images: project.projectImages,
    },
  };
}

export default function ProjectLayout({ children }: Props) {
  return children;
}
