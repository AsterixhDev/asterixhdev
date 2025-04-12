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
  const project = await fetchProject(slugs.title); // Implement this function
  if (!project) {
    return {
      title: `${slugs.title} - AsterixhDev Portfolio`,
      description: "No project found with the name " + slugs.title,
      openGraph: {
        title: `${slugs.title} - AsterixhDev Portfolio`,
        description: "No project found with the name " + slugs.title,
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
