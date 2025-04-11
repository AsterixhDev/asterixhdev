"use client";

import ProjectCard from "@/components/ProjectCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectsApiResponse } from "@/lib/types";
import clsx from "clsx";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";

type GroupedProjects = {
  all: ProjectsApiResponse["projects"];
  best: ProjectsApiResponse["projects"];
  mid: ProjectsApiResponse["projects"];
};
export default function Projects() {
  const [state, setState] = useState<{
    projects: GroupedProjects;
    loading: boolean;
    error: boolean;
  }>({
    error: false,
    loading: true,
    projects: {
      all: [],
      best: [],
      mid: [],
    },
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const res = await fetch("/api/portfolio/projects");
        const data = (await res.json()) as ProjectsApiResponse;

        // Group projects by category
        const grouped: GroupedProjects = {
          all: data.projects,
          best: data.projects.filter((p) => p.category === "best"),
          mid: data.projects.filter((p) => p.category === "mid"),
        };

        setState((prev) => ({
          ...prev,
          loading: false,
          projects: grouped,
        }));
      } catch (error) {
        console.error(error);
        setState((prev) => ({
          ...prev,
          loading: false,
          error: true,
        }));
      }
    };

    fetchProjects();
  }, []);

  return (
    <motion.div
      id="projects"
      className="w-full mx-auto flex flex-col gap-5 bg-black px-4 sm:px-10 lg:px-30 py-10"
    >
      <h1
        className={clsx(
          "text-2xl sm:text-3xl relative lg:text-4xl xl:text-5xl flex items-center gap-2 font-extrabold text-white tracking-tight leading-snug drop-shadow-lg pl-2",
          "before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:h-full before:w-1 rounded-full before:bg-gradient-to-b before:from-secondary before:to-primary"
        )}
      >
        Projects & Experiences
      </h1>
      <div className="w-full">
        <p className="text-muted-foreground text-sm mt-1">
          Here are some of my projects that I have worked on. You can check them
          out on my GitHub or GitLab.
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          I am currently working on a few more projects that will be released
          soon. Stay tuned!
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-1/2 mx-auto mb-4">
          {Object.keys(state.projects).map((k) => {
            const category = state.projects[k as keyof GroupedProjects];
            return (
              category.length >0 && (
                <TabsTrigger key={k} value={k} className="capitalize">
                  {k} ({category.length})
                </TabsTrigger>
              )
            );
          })}
        </TabsList>
        {state.loading ? (
          <div className="w-full h-60 flex items-center justify-center">
            Loading projects...
          </div>
        ) : state.error ? (
          <div className="w-full h-60 flex items-center justify-center text-destructive">
            Error loading projects
          </div>
        ) : (
          <>
            <TabsContent value="all">
              <ul className="w-full grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
                {state.projects.all.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="best">
              <ul className="w-full grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
                {state.projects.best.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="mid">
              <ul className="w-full grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
                {state.projects.mid.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </ul>
            </TabsContent>
          </>
        )}
      </Tabs>
    </motion.div>
  );
}
