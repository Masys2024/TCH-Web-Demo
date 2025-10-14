"use client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export default function Logo() {
  return (
    <Link href="/" aria-label="Home" className="flex items-center h-14 w-auto">
      <Image
        src="/logo.png"
        alt="Company Logo"
        className="h-8 w-full object-contain"
        // className="h-full w-full object-contain"
        width={160}
        height={40}
        priority
      />
    </Link>
  );
}

export function LoginLogo() {
  return (
    <Link href="/" aria-label="Home">
      <Image
        src="/logo.png"
        alt="Company Logo"
        className="h-16 w-auto object-contain"
        width={1600}
        height={400}
        priority
      />
    </Link>
  );
}

export function SidebarLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div size="lg">
          <Image
            src="/logo.png"
            alt="Company Logo"
            className="h-16 w-auto object-contain"
            width={1600}
            height={400}
            priority
          />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
