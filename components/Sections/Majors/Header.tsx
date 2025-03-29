"use client";
import { VariantInteractiveButton } from "@/components/magicui/interactive-hover-button";
import { RippleButton } from "@/components/magicui/ripple-button";
import { WordRotate } from "@/components/magicui/word-rotate";
import { useIsMobile } from "@/lib/hooks/useMobile";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [dropped, setDropped] = useState(false)
  const isMobile = useIsMobile(768)
  const links = {
    About: "#about",
    Projects: "#projects",
    Skills: "#projects",
    Contact: "#contact",
  } as const;
  return (
    <header className="sticky w-[95vw] sm:w-[90vw]  top-2 rounded-full mx-auto right-0 z-50 bg-black/60 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Brand Name */}
        <div className="text-base sm:text-2xl font-extrabold text-white tracking-wide">
          <WordRotate words={["AsterixhDev", "Web developer"]} duration={5000} />
        </div>
        {/* Navigation Menu */}
        
        <nav className={
          clsx(
            "flex duration-500 ease-in-out",
            isMobile&&"absolute p-4 items-center gap-4 justify-center left-0 rounded-lg w-full h-fit flex-col bg-gradient-to-t from-primary to-background",
            isMobile?{
              "top-[calc(100%_+_(var(--spacing)_*_4))] opacity-100":dropped,
              "top-0 -z-10 pointer-events-none rounded-t-4xl opacity-0":!dropped,
            }:"relative flex-row space-x-8"
          )
        }>
          {(Object.keys(links) as Array<keyof typeof links>).map((link) => (
            <Link
              key={link}
              href={links[link]}
              className="text-lg md:text-sm font-medium text-white transition-colors duration-300 relative"
            >
              {link}
            </Link>
          ))}
          {
            isMobile&&<RippleButton variant="primary" className="md:hidden !bg-primary shadow-2xl !p-0 absolute top-[100%] !rounded-t-none" otherClasses={{
              children:"size-10 !p-1 flex items-center justify-center"
            }} onClick={() => setDropped(false)}>
              <span className="sr-only">Menu</span>
              <i className="pi pi-times !w-full flex items-center justify-center"></i>
            </RippleButton>
          }
        </nav>
        {/* CTA Button */}
        <div className="flex items-center gap-3">
        <VariantInteractiveButton variant="secondary" secondaryHoverContent={
          <>
          <span>Hire Me</span>
          <i className="pi pi-briefcase"></i>
          </>
        } className="ml-4 !rounded-lg" >
          Hire Me
        </VariantInteractiveButton>
        <RippleButton variant="primary" className="md:hidden !p-0" otherClasses={{
          children:"size-10 !p-1 flex items-center justify-center"
        }} onClick={() => setDropped(!dropped)}>
          <span className="sr-only">Menu</span>
          <i className={
            clsx(
              "duration-500 !w-full flex items-center justify-center",
              dropped?"pi pi-times":"pi pi-bars",
            )
          }></i>
        </RippleButton>
        </div>
      </div>
    </header>
  );
}
