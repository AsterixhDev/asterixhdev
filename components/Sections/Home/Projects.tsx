"use client";

import React, { useState } from "react";
import * as motion from "motion/react-client";
import { Variants } from "motion/react";
import clsx from "clsx";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  const [shown, setShown] = useState(false);
  const section2Variants: Variants = {
    offscreen: { opacity: 0, scale: 0.9 },
    onscreen: { opacity: 1, scale: 1 },
  };
  return (
    <motion.div
      onViewportEnter={() => setShown(true)}
      onViewportLeave={() => setShown(false)}
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

      <ul className="w-full grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
      </ul>
    </motion.div>
  );
}
