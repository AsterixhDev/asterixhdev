"use client";
import { VariantInteractiveButton } from "@/components/magicui/interactive-hover-button";
import { ProjectGrid } from "@/components/Sections/Admin/portfolio/ProjectComponent";
import { useIsMobile } from "@/lib/hooks/useMobile";
import { Project } from "@/lib/types";
import Link from "next/link";
import React, { useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const isMobile = useIsMobile(768);

  const isCl = typeof window !== "undefined";
  // Check if the window object is available
  // If not, return null or a fallback component

  // fetch projects from the server
  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/portfolio/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Call the fetch function when the component mounts
  React.useEffect(() => {
    fetchProjects();
  }, []);

  // const handleEdit = (id: number) => {
  //   // Logic for editing a project
  //   console.log("Edit Project", id);
  // };

  // const handleDelete = async (id: number) => {
  //   // Logic for deleting a project
  //   // You might want to show a confirmation dialog before deleting
  //   // and then call the API to delete the project
  //   // For now, just log the id
  //   // Example API call to delete the project
  //   const response = await fetch(`/api/portfolio/projects`, {
  //     method: "DELETE",
  //     body: JSON.stringify({ id }),
  //   });
  //   if (!response.ok) {
  //     throw new Error("Failed to delete project");
  //   }
  //   setProjects((prevProjects) =>
  //     prevProjects.filter((project) => project.id !== id)
  //   );
  // };
  if (!isCl) {
    return null; // or a fallback component
  }
  const adminHeader = document.querySelector(
    "[data-slot=admin-content-header]"
  ) as HTMLElement;

  return (
    <div className="pb-6">
      <div
        style={{
          top: `${isMobile ? adminHeader?.offsetHeight : 0}px`,
        }}
        className="px-6 py-4 w-full sticky top-0 bg-muted z-10 flex items-center justify-between mb-4"
      >
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link href="/admin/projects/new">
          <VariantInteractiveButton
            variant="primary"
            secondaryHoverContent={
              <div className="flex items-center gap-2">
                <i className="pi pi-plus" />
                New
              </div>
            }
          >
            New
          </VariantInteractiveButton>
        </Link>
      </div>

      {/* Most Recent Projects */}
      <section className="mb-6 px-6 relative z-0 isolate">
        <h2 className="text-2xl font-semibold mb-2">Recent Projects</h2>
        <ul className="space-y-4">
          <ProjectGrid projects={projects.slice(0, 3)} />
        </ul>
      </section>

      {/* View All Projects */}
      <section className="mb-6 px-6 relative z-0 isolate">
        <h2 className="text-2xl font-semibold mb-2">All Projects</h2>
        <ul className="space-y-4">
          <ProjectGrid projects={projects} />
        </ul>
      </section>
    </div>
  );
}
