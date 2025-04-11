"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = React.ComponentPropsWithoutRef<typeof Link>;

export default function ScrollToNavigator({ ...props }: Props) {
  const router = useRouter();
  const path = usePathname();
  const [located, setLocated] = useState<{
    sectionId?: string;
    locatedPath: string;
  }>({
    sectionId: undefined,
    locatedPath: "/",
  });

  const handlePosition = (sectionId: string) => {
    sectionId = sectionId.replace(/\/#/g, "");
    const element = document.getElementById(sectionId);
    const scrollContainer = (element?.closest(
      "[data-slot='main-scroll-container']"
    ) ||
      document.querySelector(
        "[data-slot='main-scroll-container']"
      )) as HTMLElement;

    // Get the header's height using the data attribute
    const headerHeight =
      document.querySelector("[data-slot='main-header']")?.clientHeight || 0;
    const calculatePosition = () => {
      if (element && scrollContainer) {
        const elementRect = element.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        // Calculate the element's offset from the container's top
        const offset = elementRect.top - containerRect.top;
        // Determine the new scroll position
        const targetScroll = scrollContainer.scrollTop + offset - headerHeight;
        const calculatedPosition = (targetScroll < 0 ? 0 : targetScroll) - 10;

        return calculatedPosition;
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
      }, 10);
    }
  };
  useEffect(() => {
    if (path === located.locatedPath) {
      console.log("locating");
      handlePosition(`${located.sectionId}`);
    } else {
      console.log("routing");
      router.push(located.locatedPath);
    }
  }, [located.locatedPath, located.sectionId, path, router]);

  return (
    <Link
      {...props}
      href={`${props.href}`}
      onClick={async (e) => {
        e.preventDefault();
        const hrefSplit = `${props.href}`.split("#");
        const goTo = hrefSplit[0];
        setLocated({
          locatedPath: goTo,
          sectionId: hrefSplit.at(-1),
        });

        handlePosition(props.href.toString());
        if (props.onClick) {
          props.onClick(e);
        }
      }}
    />
  );
}
