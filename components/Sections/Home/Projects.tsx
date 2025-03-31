"use client";

import ProjectCard from "@/components/ProjectCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";
import { Variants } from "motion/react";
import * as motion from "motion/react-client";

export default function Projects() {
  const section2Variants: Variants = {
    offscreen: { opacity: 0, scale: 0.9 },
    onscreen: { opacity: 1, scale: 1 },
  };
  return (
    <motion.div
      className="w-full mx-auto flex flex-col gap-5 bg-black px-4 sm:px-10 lg:px-30 py-10"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.1 }}
      variants={section2Variants}
    >
      <h1
        className={clsx(
          "text-2xl sm:text-3xl relative lg:text-4xl xl:text-5xl flex items-center gap-2 font-extrabold text-white tracking-tight leading-snug drop-shadow-lg pl-2",
          "before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:h-full before:w-1 rounded-full before:bg-gradient-to-b before:from-secondary before:to-primary"
        )}
      >
        Projects
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
          <TabsTrigger value="all" className="cursor-pointer *:duration-300">All</TabsTrigger>
          <TabsTrigger value="personal" className="cursor-pointer *:duration-300">Personal</TabsTrigger>
          <TabsTrigger value="best" className="cursor-pointer *:duration-300">Best</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ul className="w-full grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </ul>
        </TabsContent>
        <TabsContent value="personal">
          <ul className="w-full grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </ul>
        </TabsContent>
        <TabsContent value="best">
          <ul className="w-full grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </ul>
        </TabsContent>
      </Tabs>
      
    </motion.div>
  );
}
