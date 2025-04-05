"use client";
import { VariantInteractiveButton } from "@/components/magicui/interactive-hover-button";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
import StackIcon from "tech-stack-icons";
import skills from "./skills";

type Props = {
  // Define any props if needed
  shown?: boolean;
  handleskillClick?: () => void;
};
export default function SkillTerminal({ shown, handleskillClick }: Props) {
  return (
    <Terminal className="bg-accent !max-w-full !max-h-full !min-h-full backdrop-blur-lg h-fit rounded-lg shadow-md">
      {shown && (
        <span className="flex items-center gap-2">
          <TypingAnimation duration={100}>&gt; asterixhdev</TypingAnimation>
          <TypingAnimation className="text-primary" duration={100} delay={1400}>
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
            <span className="flex gap-2">
              ✔ {skill.name}{" "}
              <em className="size-5">
                <StackIcon className="size-full" name={skill.icon} />
              </em>
            </span>
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
            <TypingAnimation delay={7000} className="text-muted-foreground">
              See all skills
            </TypingAnimation>
            <VariantInteractiveButton
              onClick={handleskillClick}
              className="text-muted-foreground hover:underline underline-offset-2"
            >
              <TypingAnimation delay={7000}>See all</TypingAnimation>
            </VariantInteractiveButton>
          </AnimatedSpan>
        </>
      )}
    </Terminal>
  );
}
