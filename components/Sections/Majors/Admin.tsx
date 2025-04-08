"use client";

import { useIsMobile } from "@/lib/hooks/useMobile";
import { AdminMobileDrawer } from "./AdminMobileDrawer";
import clsx from "clsx";
import Link from "next/link";

// Menu items.
const PortfolioNavigations = [
  {
    title: "Projects",
    url: "/admin/projects",
    icon: "pi-briefcase", // Represents a personal/about section
  },
  {
    title: "Services",
    url: "/#services",
    icon: "pi-wrench", // Suggests tools/settings typically used for services
  },
  {
    title: "Skills",
    url: "/admin/skills",
    icon: "pi-graduation-cap", // Indicates work, projects, or professional experience
  },
  {
    title: "Contact information",
    url: "/admin/contact",
    icon: "pi-envelope", // Represents messaging or communication
  },
];
const BlogNavigations = [
  {
    title: "Blogs",
    url: "/admin/projects",
    icon: "pi-comments", // Represents a personal/about section
  }
];
export interface Navigation {
  title: string;
  url: string;
  icon: string;
}
const navigations:Record<string,Navigation[]> = {
  "Portfolio": PortfolioNavigations,
  "Blog": BlogNavigations,
  "Settings": [
    {
      title: "Preferences",
      url: "/admin/preferences",
      icon: "pi-cog", // Suggests tools/settings typically used for services
    },
  ]
}

export function AdminSidebar({mobileTrigger}:{
  mobileTrigger?: React.ReactNode
}) {
  const isMobile = useIsMobile(768);

  if (isMobile) {
    return <AdminMobileDrawer navigations={navigations} trigger={mobileTrigger}/>;
  }

  return <aside className="min-w-fit shrink-0 flex flex-col gap-2 w-[15rem] bg-muted/20 backdrop-blur-lg rounded-2xl h-full min-h-screen p-2">
    {
      Object.keys(navigations).map((key) => {
        const navigation = navigations[key];
        return (
          <div key={key} className="w-full bg-muted backdrop-blur-lg rounded-xl py-4 px-2">
            <strong className="text-accent-foreground/60 px-4">{key}</strong>
            <nav className="flex flex-col gap-2 mt-2">
              {navigation.map((PortfolioNavigation) => (
                <Link href={PortfolioNavigation.url} key={PortfolioNavigation.title} className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-black/20 transition-colors duration-200">
                  <i className={clsx(
                    "pi bg-accent-foreground text-accent rounded-full p-2",
                    PortfolioNavigation.icon,
                  )} />
                  {PortfolioNavigation.title}
                </Link>
              ))}
            </nav>
          </div>
        );
      })
    }
  </aside>;
}
