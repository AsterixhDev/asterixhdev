"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/lib/hooks/useMobile";
import clsx from "clsx";
import ScrollToNavigator from "../scrolltonavigator";

// Menu items.
const PortfolioNavigations = [
    {
      title: "About",
      url: "/#about",
      icon: "pi-user", // Represents a personal/about section
    },
    {
      title: "Services",
      url: "/#services",
      icon: "pi-wrench", // Suggests tools/settings typically used for services
    },
    {
      title: "Projects & Experience",
      url: "/#projects",
      icon: "pi-briefcase", // Indicates work, projects, or professional experience
    },
    {
      title: "Contact",
      url: "/#contact",
      icon: "pi-envelope", // Represents messaging or communication
    },
  ];
  

export function SideBarMobile() {
  const isMobile = useIsMobile(768)
  const { setOpenMobile } = useSidebar();


  
    if (!isMobile) {
        return null
    }

  return (
    <Sidebar>
      <SidebarContent className="p-2">
        <SidebarGroup className="!bg-sidebar-accent !rounded-lg">
          <SidebarGroupLabel className="!text-base">Portfolio</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {PortfolioNavigations.map((PortfolioNavigation) => (
                <SidebarMenuItem key={PortfolioNavigation.title}>
                  <SidebarMenuButton asChild>
                    <ScrollToNavigator
                      onClick={()=>{
                        setOpenMobile(false)
                      }}
                    className="!text-base !text-left !py-5" href={`${PortfolioNavigation.url}`} data-slot="scroll-to-navigator">
                      <i className={clsx(
                        "pi",
                        PortfolioNavigation.icon,
                      )}></i>
                      <span>{PortfolioNavigation.title}</span>
                    </ScrollToNavigator>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
