"use client";

import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/lib/types";

// ProjectGrid component for displaying multiple projects
export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard showEdit={true} key={`${project._id}`}  index={index+1} project={project} />
      ))}
    </div>
  );
}
