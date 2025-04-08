"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import clsx from "clsx";
import Link from "next/link";
import { Navigation } from "./Admin";

export function AdminMobileDrawer({
  trigger = <Button variant="outline">Open Drawer</Button>,
  navigations,
}: {
  trigger?: React.ReactNode;
  navigations: Record<string, Navigation[]>;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full">
          <DrawerTitle>
            <div className="flex flex-col gap-2 p-4">
              <h2 className="text-2xl font-bold">Admin</h2>
              <p className="text-sm opacity-50">
                Select an item from the navigation
              </p>
            </div>
          </DrawerTitle>
          <div className="w-full max-h-[60vh] overflow-y-auto flex flex-col gap-2 noscrollbar py-4">
            {Object.keys(navigations).map((key) => {
              const navigation = navigations[key];
              return (
                <div key={key} className="w-full px-2">
                  <strong className="text-accent-foreground/60 px-4">
                    {key}
                  </strong>
                  <nav className="flex flex-col gap-2 mt-2">
                    {navigation.map((PortfolioNavigation) => (
                      <Link
                        href={PortfolioNavigation.url}
                        key={PortfolioNavigation.title}
                        className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                      >
                        <i
                          className={clsx(
                            "pi bg-accent-foreground text-accent rounded-full p-2",
                            PortfolioNavigation.icon
                          )}
                        />
                        {PortfolioNavigation.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              );
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
