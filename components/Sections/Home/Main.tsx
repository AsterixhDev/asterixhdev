import { Meteors } from "@/components/magicui/meteors";
import { motion } from "@/components/motion";
import Blob1 from "@/components/shapes/blobs";
import clsx from "clsx";
import { Variants } from "motion/react";
import React from "react";

export default function Main() {
  const sectionVariants: Variants = {
    offscreen: { opacity: 0, scale: 0.9 },
    onscreen: { opacity: 1, scale: 1 },
  };
  return (
    <>
      <span className="size-full overflow-hidden absolute inset-0 -z-10 pointer-events-none">
        <Meteors minDuration={50} number={100} angle={120} />
      </span>
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.1 }}
        variants={sectionVariants}
        className="w-full h-fit py-30 items-center gap-10 sm:gap-5 sm:items-start justify-center px-4 sm:px-10 lg:px-30 flex flex-col min-[498px]:grid min-[498px]:grid-cols-2"
      >
        <div className="flex justify-center h-full flex-col gap-4">
          <h1 className="text-7xl min-[498px]:text-5xl xl:text-8xl font-extrabold text-white tracking-tight leading-snug drop-shadow-lg">
            Hello, I&apos;m <br />
            <span>
              Peter{" "}
              <strong className="bg-gradient-to-b from-primary to-secondary/40  bg-clip-text text-transparent dark:from-white dark:to-slate-900/10">
                Paul
              </strong>
            </span>
          </h1>

          <p
            className={clsx(
              "relative before:absolute before:left-0 before:h-full before:w-1 rounded-full before:bg-gradient-to-b before:from-secondary before:to-primary",
              "text-2xl xl:text-3xl font-semibold text-white dark:text-black pl-2"
            )}
          >
            i&apos;m a <strong className="text-secondary">Front end</strong>{" "}
            developer
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-10">
          <span
            style={{ "--y": "20px" } as React.CSSProperties}
            className="block drop-shadow-md [--y:20px] animate-[bounceCustomY_10s_infinite] relative w-full isolate pointer-events-none"
          >
            <Blob1 className="size-full" imageFill="/images/my-images/1.jpg" />
            <span className="size-full absolute -z-10 left-1/2 top-1/2 -translate-1/2">
              <Blob1
                gradientFill={[
                  "var(--color-secondary)",
                  "var(--color-primary)",
                ]}
                svg={{
                  style: { "--y": "20px" } as React.CSSProperties,
                }}
                className="size-full animate-[bounceCustomY_10s_infinite] absolute left-2 top-2"
              />
              <Blob1
                gradientFill={[
                  "var(--color-primary)",
                  "var(--color-secondary)",
                ]}
                className="size-full absolute -left-2 -top-2 blur-3xl"
              />
            </span>
          </span>
          <ul className="socialLinks">
            <li>
              <i className="pi pi-github"></i>
            </li>
            <li>
              <i className="pi pi-twitter"></i>
            </li>
            <li>
              <i className="pi pi-linkedin"></i>
            </li>
          </ul>
        </div>
        <div className="w-full flex justify-between items-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-primary-foreground">2+</span>
              <span className="mt-1 text-xs font-medium text-center">
                <strong className="text-primary">Years Experience</strong>
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-primary-foreground">10+</span>
              <span className="mt-1 text-xs font-medium text-center">
                <strong className="text-primary">Completed Projects</strong>
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-primary-foreground">3+</span>
              <span className="mt-1 text-xs font-medium text-center">
                <strong className="text-primary">Satisfied Clients</strong>
              </span>
            </div>
          </div>
      </motion.section>
    </>
  );
}
