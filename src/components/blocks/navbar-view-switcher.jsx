"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "./navbar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/ui/sidebar/app-sidebar";
import NAVLINKS from "@/constants/navLinks";

export default function NavbarViewSwitcher({ children }) {
  const [navbarView, setNavbarView] = useState("navbar");
  useEffect(() => {
    const view = localStorage.getItem("navbar-view");
    if (view) {
      setNavbarView(view);
    }
  }, []);

  const toggleView = () => {
    localStorage.setItem(
      "navbar-view",
      navbarView === "navbar" ? "sidebar" : "navbar"
    );
    setNavbarView((prev) => (prev === "navbar" ? "sidebar" : "navbar"));
  };

  return (
    <div className="">
      {/* Fixed Toggle Button - Center of the Screen */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={toggleView} variant="secondary">
          {navbarView === "navbar" ? "Switch to Sidebar" : "Switch to Navbar"}
        </Button>
      </div>

      {/* Conditional View Rendering */}
      {navbarView === "navbar" ? (
        <>
          <Navbar navigationItems={NAVLINKS} />
          <main className="pt-20">{children}</main>
        </>
      ) : (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="w-full flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="w-full flex items-center justify-between gap-2 px-4">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                </div>
              </div>
            </header>
            <Separator />
            <main className="flex-1 overflow-y-auto px-4">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      )}
    </div>
  );
}
