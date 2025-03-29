import React from "react";
import { Safari } from "./magicui/safari";
import clsx from "clsx";
import "./Sections/Home/HomeSections.css";
import { RippleButton } from "./magicui/ripple-button";

type Props = object;

export default function ProjectCard({}: Props) {
  return (
    <li
      className={clsx(
        "border isolate projectCard cursor-pointer bg-conic h-[calc(var(--spacing)_*_80)] max-h-[350px] relative rounded-3xl",
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
        "before:box-content after:box-content"
      )}
    >
      <div className="size-full bg-black rounded-3xl overflow-hidden relative flex flex-col gap-2">
        <span className="w-full h-[calc(100%-var(--spacing)_*_10)] p-4 flex items-center justify-center flex-col gap-4">
          <Safari
            url="magicui.design"
            className="size-full"
            imageSrc="/images/katind.png"
          />
          <strong className="text-3xl sm:text-4xl">01</strong>
        </span>
        <div className="absolute flex flex-col justify-between content py-0 px-4 duration-500 h-[calc(100%-var(--spacing)_*_10)] w-full top-[calc(100%-var(--spacing)_*_10)] bg-muted rounded-t-xl">
          <div className="w-full flex flex-col gap-2">
          <h3 className="text-lg h-10 flex items-center font-bold">
            Project name
          </h3>
          <p className="line-clamp-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
            quo architecto iste magni tempora blanditiis deleniti perspiciatis
            obcaecati reiciendis consectetur. In id quasi veniam consectetur nam
            voluptate animi impedit tenetur iste aut repudiandae quidem nobis
            eum vel quaerat quas mollitia, ad doloribus illo dolorum officia
            repellendus optio. Fugit repellendus beatae eos hic. Aperiam
            laboriosam consectetur accusamus fuga doloremque recusandae minus.
            Optio rerum vitae minus molestiae, eos, unde totam nemo quidem
            saepe, consequuntur in vero cum voluptate et reiciendis! Assumenda
            eveniet, distinctio dolores perferendis non doloremque voluptatibus
            consectetur et. Esse corporis, quas eos numquam quod quam at
            similique non doloribus dicta?
          </p>
          </div>
            <div className="w-full flex gap-2">
                <RippleButton className="!rounded-full shrink-0 bg-primary/40 border-none !size-10 *:!p-0 *:flex *:items-center *:justify-center">
                    <i className="pi pi-github text-primary-foreground size-full block"></i>
                </RippleButton>
                <RippleButton className="bg-black border-none text-primary-foreground !px-10 *:!flex *:!items-center *:!gap-2">
                Visit
                <i className="pi pi-globe"></i>
                    
                </RippleButton>
                <RippleButton className="bg-primary/40 border-none text-primary-foreground !px-10 *:!flex *:!items-center *:!gap-2">
                Read
                <i className="pi pi-arrow-right"></i>
                    
                </RippleButton>
            </div>
        </div>
      </div>
    </li>
  );
}
