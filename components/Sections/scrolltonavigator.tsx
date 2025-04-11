"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = React.ComponentPropsWithoutRef<typeof Link>;

export default function ScrollToNavigator({ ...props }: Props) {
  const router = useRouter();
  const path = usePathname();
  const [isRouting, setIsRouting] = useState(false);
  const [targetSection, setTargetSection] = useState<string | undefined>();

  const handlePosition = (sectionId: string) => {
    sectionId = sectionId.replace(/\/#/g, "");
    const element = document.getElementById(sectionId);
    const scrollContainer = (element?.closest(
      "[data-slot='main-scroll-container']"
    ) ||
      document.querySelector(
        "[data-slot='main-scroll-container']"
      )) as HTMLElement;

    const headerHeight =
      document.querySelector("[data-slot='main-header']")?.clientHeight || 0;

    const calculatePosition = () => {
      if (element && scrollContainer) {
        const elementRect = element.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        const offset = elementRect.top - containerRect.top;
        const targetScroll = scrollContainer.scrollTop + offset - headerHeight;
        return (targetScroll < 0 ? 0 : targetScroll) - 10;
      }
      return 0;
    };

    if (element && scrollContainer) {
      setTimeout(() => {
        scrollContainer.style.transitionDuration = "1s";
        scrollContainer.scrollTo({
          top: calculatePosition(),
          behavior: "smooth",
        });
      }, 100); // Increased delay for better reliability
    }
  };

  useEffect(() => {
    // Handle positioning after route change and page load
    if (isRouting && targetSection) {
      const handleRouteComplete = () => {
        handlePosition(targetSection);
        setIsRouting(false);
        setTargetSection(undefined);
      };

      // Wait for page content to load
      if (document.readyState === 'complete') {
        handleRouteComplete();
      } else {
        window.addEventListener('load', handleRouteComplete);
        return () => window.removeEventListener('load', handleRouteComplete);
      }
    }
  }, [isRouting, targetSection, path]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const hrefSplit = props.href.toString().split("#");
    const [routePath, section] = hrefSplit;
    
    setTargetSection(section);

    if (path === routePath) {
      // Same page, just scroll
      handlePosition(section);
    } else {
      // Different page, set routing flag and navigate
      setIsRouting(true);
      router.push(props.href.toString());
    }

    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <Link
      {...props}
      href={props.href}
      onClick={handleClick}
    />
  );
}