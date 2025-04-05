import { RippleButton } from "@/components/magicui/ripple-button";
import React from "react";
import skills, { Skill as skillprop } from "./skills";
import StackIcon from "tech-stack-icons";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

type Props = {
  handleskillClick?: () => void;
};



export function Skill(skill: skillprop) {
  return (
    
      <HoverCard>
      <HoverCardTrigger><span className="flex bg-secondary/30 cursor-pointer flex-col border rounded-md gap-2 p-2 items-center justify-center">
        <em className="size-5">
          <StackIcon className="size-full" name={skill.icon} />
        </em>
        <strong className="text-muted-foreground">
        {skill.name}
        </strong>
      </span></HoverCardTrigger>
      <HoverCardContent>
        <div className="w-full">
            <span className="flex gap-2 border-b pb-2 items-center justify-between">
                <em className="text-muted-foreground not-italic font-bold">{skill.experience}</em>
            </span>
            <p className="text-muted-foreground text-sm mt-1">
                {skill.description}
            </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
export default function SkillsFull({ handleskillClick }: Props) {
  return (
    <div className="size-full bg-muted p-4 rounded-lg shadow-md flex flex-col gap-2">
      <div className="w-full border-b border-b-secondary py-2 flex items-center gap-2">
        <RippleButton
          variant="default"
          className="!bg-transparent shadow-2xl !p-0"
          otherClasses={{
            children: "size-4 !p-1 flex items-center justify-center",
          }}
          onClick={handleskillClick}
        >
          <span className="sr-only">back to terminal</span>
          <i className="pi pi-arrow-left text-primary"></i>
        </RippleButton>
        <strong>Skills</strong>
      </div>

      <div className="w-full grid gap-2 grid-cols-[repeat(auto-fill,_minmax(100px,1fr))]">
        {skills.map((skill, index) => (
          <Skill key={index} {...skill} />
        ))}
      </div>
    </div>
  );
}
