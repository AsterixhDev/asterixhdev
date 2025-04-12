"use client";

import { Project } from "@/lib/types";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./Sections/Home/HomeSections.css";
import { RippleButton } from "./magicui/ripple-button";
import { Safari } from "./magicui/safari";

type Props = {
  className?: string;
  project?: Project;
  index?: number;
  showEdit?:boolean
};

export default function ProjectCard({ className, project, index,showEdit=false }: Props) {
  const [focused, setFocused] = useState(false);
  const cardRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <li
      ref={cardRef}
      onClick={() => setFocused(!focused)}
      className={clsx(
        "border isolate bg-conic h-[calc(var(--spacing)_*_80)] max-h-[350px] relative rounded-3xl",
        focused && "projectCardActive",
        "before:duration-500 after:duration-500",
        "before:absolute after:absolute",
        "before:opacity-0 after:opacity-0",
        "before:size-full after:size-full",
        "before:left-1/2 after:left-1/2",
        "before:top-1/2 after:top-1/2",
        "before:-translate-1/2 after:-translate-1/2",
        "before:-z-10 after:-z-10",
        "before:p-1 after:p-1",
        "before:blur-3xl",
        "before:animate-conic",
        "after:animate-conic",
        "before:rounded-xl after:rounded-3xl",
        "before:box-content after:box-content",
        className
      )}
    >
      <div className="size-full bg-black rounded-3xl overflow-hidden relative flex flex-col gap-2">
        <span className="w-full h-[calc(100%-var(--spacing)_*_10)] p-4 flex items-center justify-center flex-col gap-4">
          <Safari
            url={`${project?.liveUrl}`}
            className="size-full"
            imageSrc={project?.projectImages[0]}
          />
          <strong className="text-3xl sm:text-4xl">
            {index ? index : "01"}
          </strong>
        </span>
        <div onClick={(e)=>{
          e.stopPropagation()
          setFocused(true)
        }} className={clsx("absolute flex flex-col justify-between content py-2 px-4 duration-500 h-[calc(100%-var(--spacing)_*_10)] w-full top-[calc(100%-var(--spacing)_*_14)] bg-muted rounded-t-xl",
        !focused?"cursor-zoom-in":"cursor-auto")}>
          <div className="w-full flex flex-col gap-2">
            <div className=".w-full flex justify-between items-center gap-2">
              <h3 className="text-lg h-10 flex items-center font-bold">
                {project?.title ? project?.title : "Project name"}
              </h3>
              <div className="w-fit flex items-center gap-2">
              
                {
                  showEdit&&<Link href={`/projects/${project?.title}/edit`}>
                  <RippleButton variant="secondary" className="!rounded-full shrink-0 bg-primary/40 border-none !size-10 *:!p-0 *:flex *:items-center *:justify-center">
                    <i className="pi pi-pi-pencil text-primary-foreground size-full block"></i>
                  </RippleButton>
                </Link>
                }
              <Link href={`${project?.githubUrl}`}>
                <RippleButton className="!rounded-full shrink-0 bg-primary/40 border-none !size-10 *:!p-0 *:flex *:items-center *:justify-center">
                  <i className="pi pi-github text-primary-foreground size-full block"></i>
                </RippleButton>
              </Link>
              </div>
            </div>
            <p className="line-clamp-6">
              {project?.description
                ? project?.description
                : "Project description"}
            </p>
          </div>
          <div className="w-full flex gap-2">
            <Link className="w-full" href={`${project?.liveUrl}`}>
              <RippleButton className="!w-full bg-black border-none text-primary-foreground *:!flex *:!items-center *:!gap-2">
                Visit
                <i className="pi pi-globe"></i>
              </RippleButton>
            </Link>
            <Link className="w-full" href={`/projects/${project?.title}`}>
              <RippleButton className="!w-full bg-primary/40 border-none text-primary-foreground *:!flex *:!items-center *:!gap-2">
                Read
                <i className="pi pi-arrow-right"></i>
              </RippleButton>
            </Link>
          </div>
        </div>
      </div>

      
    </li>
  );
}
