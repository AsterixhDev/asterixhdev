"use client";
import { VariantInteractiveButton } from "@/components/magicui/interactive-hover-button";
import { RippleButton } from "@/components/magicui/ripple-button";
import { WordRotate } from "@/components/magicui/word-rotate";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/lib/hooks/useMobile";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import ScrollToNavigator from "../scrolltonavigator";

export default function Header() {
  const isMobile = useIsMobile(768)
  const currentPath = usePathname()
  const links = {
    About: "/#about",
    Projects: "/#projects",
    Services: "/#services",
    Contact: "/#contact",
  } as const;

  return (
    <header className="sticky w-[95vw] sm:w-[90vw]  top-2 rounded-full mx-auto right-0 z-50 bg-black/60 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Brand Name */}
        <div className="text-base sm:text-2xl font-extrabold text-white tracking-wide">
          <WordRotate words={["AsterixhDev", "Web developer"]} duration={5000} />
        </div>
        {/* Navigation Menu */}
        
        {
          !isMobile&&<nav className={
            clsx(
              "hidden md:flex duration-500 ease-in-out",            
              "relative flex-row space-x-8"
            )
          }>
            {(Object.keys(links) as Array<keyof typeof links>).map((link) => (
              <ScrollToNavigator
                key={link}
                variant={"ghost"}
                to={links[link]}
                className={
                  clsx(
                    "!p-0 !h-fit cursor-pointer !bg-transparent",
                    "navlinks text-lg md:text-sm font-medium text-white transition-colors duration-300 relative",
                    "before:w-0 before:absolute before:h-[2px] before:bg-gradient-to-r before:from-secondary before:to-primary",
                    "hover:before:w-full hover:before:absolute hover:before:bg-gradient-to-r hover:before:from-secondary hover:before:to-primary",
                    "before:duration-500 before:bottom-1 sm:before:-bottom-1 before:left-0 before:rounded-full before:delay-150",
                    currentPath===links[link]&&"before:!w-1/2 before:!opacity-100",
                  )
                }
              >
                {link}
              </ScrollToNavigator>
            ))}
           
          </nav>
        }
        {/* CTA Button */}
        <div className="flex items-center gap-3">
        <VariantInteractiveButton variant="secondary" secondaryHoverContent={
          <>
          <span>Hire Me</span>
          <i className="pi pi-arrow-up-right"></i>
          </>
        } className="ml-4 !rounded-lg" >
          Hire Me
        </VariantInteractiveButton>
        {
          isMobile&&<SidebarTrigger>
            <RippleButton variant="primary" className="md:hidden !size-10 !p-0" otherClasses={{
            children:"size-10 !p-1 flex items-center justify-center"
          }}>
            <span className="sr-only">Menu</span>
            <i className={
              clsx(
                "duration-500 !w-full flex items-center justify-center",
                "pi pi-bars",
              )
            }></i>
          </RippleButton>
          </SidebarTrigger>
        }
        </div>
        {/* Mobile Menu */}
        
      </div>
    </header>
  );
}
