// src/components/Header.tsx
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { WordRotate } from "@/components/magicui/word-rotate";
import Link from "next/link";

export default function Header() {
  const links = {
    About: "#about",
    Projects: "#projects",
    Skills: "#projects",
    Contact: "#contact",
  } as const;
  return (
    <header className="sticky w-[95vw] sm:w-[80vw]  top-2 rounded-full mx-auto right-0 z-50 bg-black/60 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Brand Name */}
        <div className="text-base sm:text-2xl font-extrabold text-white tracking-wide">
          <WordRotate words={["AsterixhDev", "Web developer"]} duration={5000} />
        </div>
        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-8">
          {(Object.keys(links) as Array<keyof typeof links>).map((link) => (
            <Link
              key={link}
              href={links[link]}
              className="navlinks"
            >
              {link}
            </Link>
          ))}
        </nav>
        {/* CTA Button */}
        <InteractiveHoverButton className="ml-4">
          Hire Me
        </InteractiveHoverButton>
      </div>
    </header>
  );
}
