"use client";

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
import clsx from "clsx";
import { Variants } from "motion/react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { useState } from "react";
import './HomeSections.css'

export default function AboutSection() {
  const [shown, setShown] = useState(false);
  const section2Variants: Variants = {
    offscreen: { opacity: 0, scale: 0.9 },
    onscreen: { opacity: 1, scale: 1 },
  };
  const skills = [
    "React",
    "Next.js",
    "vue",
    "nuxt.js",
    "Tailwind CSS",
    "TypeScript",
    "MongoDB",
  ];
  return (
    <motion.section
      onViewportEnter={() => setShown(true)}
      onViewportLeave={() => setShown(false)}
      className="w-full mx-auto rounded-t-4xl flex flex-col gap-5 h-fit bg-primary/30 backdrop-blur-3xl px-4 sm:px-10 lg:px-30 py-10"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.1 }}
      variants={section2Variants}
    >
      <h1
        className={clsx(
          "text-2xl sm:text-3xl relative lg:text-4xl xl:text-5xl flex items-center gap-2 font-extrabold text-white tracking-tight leading-snug drop-shadow-lg pl-2",
          "before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:h-full before:w-1 rounded-full before:bg-gradient-to-b before:from-secondary before:to-primary",
        )}
      >
        About me
      </h1>
      <div className="grid grid-cols-1 mt-10 relative sm:grid-cols-2 gap-6 isolate">
        <motion.div
          initial={"offscreen"}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={clsx(
            "bg-secondary/20 bg-conic grid grid-cols-1 backdrop-blur-lg h-fit min-h-full rounded-lg shadow-md",
            "before:absolute after:absolute",
            "before:size-full after:size-full",
            "before:left-1/2 after:left-1/2",
            "before:top-1/2 after:top-1/2",
            "before:-translate-1/2 after:-translate-1/2",
            "before:-z-10 after:-z-10",
            "before:p-1 after:p-1",
            "before:blur-3xl",
            "before:animate-conic",
            "after:animate-conic",
            "animatedTerminal",
            "before:rounded-md after:rounded-xl",
            "before:box-content after:box-content"
          )}
        >
          <Terminal className="bg-accent !max-w-full !max-h-full !min-h-full backdrop-blur-lg h-fit rounded-lg shadow-md">
            {shown && (
              <span className="flex items-center gap-2">
                <TypingAnimation duration={100}>
                  &gt; asterixhdev
                </TypingAnimation>
                <TypingAnimation
                  className="text-primary"
                  duration={100}
                  delay={1400}
                >
                  run
                </TypingAnimation>
                <TypingAnimation duration={100} delay={1700}>
                  skills
                </TypingAnimation>
              </span>
            )}

            {shown &&
              skills.map((skill, index) => (
                <AnimatedSpan
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  key={index}
                  delay={index * 500 + 2500}
                  className="text-green-500"
                >
                  <span>✔ {skill}</span>
                </AnimatedSpan>
              ))}

            {shown && (
              <>
                <TypingAnimation delay={6500} className="text-muted-foreground">
                  some skills found.
                </TypingAnimation>

                <AnimatedSpan
                  delay={7000}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <TypingAnimation
                    delay={7000}
                    className="text-muted-foreground"
                  >
                    View all in
                  </TypingAnimation>
                  <Link
                    href="/"
                    className="text-primary hover:underline underline-offset-2"
                  >
                    <TypingAnimation delay={8000}>About page</TypingAnimation>
                  </Link>
                </AnimatedSpan>
              </>
            )}
          </Terminal>
        </motion.div>
        <div className="bg-secondary/20 backdrop-blur-lg p-6 rounded-xl shadow-xl transform aboutWriteup transition duration-300">
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
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
