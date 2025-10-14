"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../ui/mode-toggle";
import ProfilePopover from "./profile";
import Logo from "./logo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { INTERNAL_LINKS } from "@/constants/navLinks";

export default function Navbar({ navigationItems }) {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      setLoggedIn(true);
    }
  }, [pathname]);

  // Separate regular links from dropdown/popover links
  const regularLinks = navigationItems.filter(
    (item) => !item.children || item.children.length === 0
  );
  const dropdownLinks = navigationItems.filter(
    (item) => item.children && item.children.length > 0
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/70 backdrop-blur-sm z-50 border-b text-xs">
      <div className="mx-auto py-3 px-6">
        <div className="flex justify-between items-center h-10">
          <Logo />

          <div className="flex items-center gap-6">
            {/* Regular Links */}
            {regularLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-medium transition-colors ${
                  pathname === item.href
                    ? "font-semibold"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Popover Menus for items with children */}
            <div className="flex items-center gap-3">
              {dropdownLinks.map((menu) => (
                <Popover key={menu.label}>
                  <PopoverTrigger asChild>
                    <button className="text-xs text-foreground/80 hover:text-foreground bg-transparent hover:bg-transparent flex items-center gap-1 font-medium">
                      {menu.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-72 p-0 py-2 border rounded-lg shadow-lg"
                    align="start"
                  >
                    <div className="max-h-96 overflow-y-auto text-xs">
                      {menu.children.map((section, idx) => (
                        <div key={section.label}>
                          {/* Section Header */}
                          <div className="px-4 py-2 mt-4">
                            <h3 className="font-semibold uppercase tracking-wide">
                              {section.label}
                            </h3>
                          </div>

                          {/* Section Items */}
                          <div className="p-2 space-y-1">
                            {section.children?.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href || "#"}
                                className="flex items-center justify-between px-3 py-2 rounded-md text-muted-foreground hover:text-foreground"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>

                          {/* Divider between sections */}
                          {idx < menu.children.length - 1 && (
                            <div className="border-t" />
                          )}
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />

            {loggedIn ? (
              <ProfilePopover />
            ) : (
              <Link href={INTERNAL_LINKS.LOGIN}>
                <Button>
                  Sign In
                  <LogIn className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
