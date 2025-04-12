"use client";

import { VariantInteractiveButton } from "@/components/magicui/interactive-hover-button";
import clsx from "clsx";
import * as motion from "motion/react-client";
import { useState } from "react";
import "./HomeSections.css";
import SkillTerminal from "./SkillTerminal";
import SkillsFull from "./SkillsFull";

export default function AboutSection() {
  const [shown, setShown] = useState(false);
  const [shownOnce, setShownOnce] = useState(false);
  const [shownFullSkill, setShownFullSkill] = useState(false);


  const handleSkillClick = () => {
    setShownFullSkill(!shownFullSkill);
  };

  return (
    <motion.section
    id="about"
      onViewportEnter={() =>{
        setShown(true)
        setShownOnce(true)
      }}
      onViewportLeave={() => setShown(false)}
      className="w-full mx-auto overflow-hidden rounded-t-4xl flex flex-col gap-5 h-fit bg-primary/30 backdrop-blur-3xl px-4 sm:px-10 lg:px-30 py-10"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{
        amount: 0.2
      }}
      
    >
      <h1
        className={clsx(
          "text-2xl sm:text-3xl relative lg:text-4xl xl:text-5xl flex items-center gap-2 font-extrabold text-white tracking-tight leading-snug drop-shadow-lg pl-2",
          "before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:h-full before:w-1 rounded-full before:bg-gradient-to-b before:from-secondary before:to-primary"
        )}
      >
        About me
      </h1>
      <div className="grid grid-cols-1 mt-10 relative sm:grid-cols-2 gap-6 isolate">
        <motion.div
          className={clsx(
            "bg-secondary/20 bg-conic grid grid-cols-1 backdrop-blur-lg h-fit min-h-full rounded-lg shadow-md",
            // "before:absolute after:absolute",
            // "before:size-full after:size-full",
            // "before:left-1/2 after:left-1/2",
            // "before:top-1/2 after:top-1/2",
            // "before:-translate-1/2 after:-translate-1/2",
            // "before:-z-10 after:-z-10",
            // "before:p-1 after:p-1",
            // "before:blur-3xl",
            // "before:animate-conic",
            // "after:animate-conic",
            // "animatedTerminal",
            // "before:rounded-md after:rounded-xl",
            // "before:box-content after:box-content"
            "duration-300",
            shown?(
              "translate-x-0 scale-100 opacity-100"
            ):(
              "-translate-x-64 scale-50 opacity-0"
            )
          )}
        >
          {shownFullSkill?<SkillsFull handleskillClick={handleSkillClick}/>: (
            <SkillTerminal shown={shownOnce} handleskillClick={handleSkillClick} />
          )}
        </motion.div>
        <div className={
          clsx(
            "bg-secondary/20 backdrop-blur-lg p-6 rounded-xl shadow-xl transform aboutWriteup transition duration-300",
            shown?(
              "translate-x-0 scale-100 opacity-100"
            ):(
              "translate-x-64 scale-50 opacity-0"
            )
          )
        }>
          <motion.div>
            <h1 className="text-2xl font-bold text-white mb-4">
              The true Asterixh
            </h1>
            <p className="text-gray-200 text-sm leading-relaxed text-justify">
              Hi, I’m Paul Peter—known online as Asterixh. With a passion for
              creating high-impact, user-centered web experiences, I bring a
              blend of creativity and technical expertise to every project.
              Skilled in TypeScript, React, and performance optimization, I
              focus on building seamless, scalable solutions that make a real
              difference. Let’s turn your vision into an exceptional digital
              experience.
            </p>
            <VariantInteractiveButton
              secondaryHoverContent={
                <>
                  <span>Download CV</span>
                  <i className="pi pi-download"></i>
                </>
              }
              className="mt-4 !rounded-lg"
              variant="primary"
            >
              Download CV
            </VariantInteractiveButton>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
