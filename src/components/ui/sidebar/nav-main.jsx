"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <div key={item.title}>
            {!item?.items?.length ? (
              <SidebarMenuItem key={item.title}>
                <Link href={item?.url || ""}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`${
                      pathname === item.url &&
                      "text-primary bg-primary/10 font-semibold"
                    }`}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ) : (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <div key={subItem.title}>
                          {subItem?.items?.length ? (
                            <Collapsible
                              key={subItem.title}
                              asChild
                              defaultOpen={subItem.isActive}
                              className="group/collapsible"
                            >
                              <SidebarMenuSubItem>
                                <CollapsibleTrigger asChild>
                                  <SidebarMenuSubButton tooltip={subItem.title}>
                                    {subItem.icon && (
                                      <subItem.icon className="w-4 h-4" />
                                    )}
                                    <span>{subItem.title}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                  </SidebarMenuSubButton>
                                </CollapsibleTrigger>

                                {/* ✅ Level 3 Starts Here */}
                                <CollapsibleContent>
                                  <SidebarMenuSub className="pl-4">
                                    {subItem.items.map((subSubItem) => (
                                      <SidebarMenuSubItem
                                        key={subSubItem.title}
                                      >
                                        {subSubItem?.items?.length ? (
                                          // Optional: you can continue nesting further here if needed
                                          <Collapsible
                                            key={subSubItem.title}
                                            asChild
                                            defaultOpen={subSubItem.isActive}
                                            className="group/collapsible"
                                          >
                                            <SidebarMenuSubItem>
                                              <CollapsibleTrigger asChild>
                                                <SidebarMenuSubButton
                                                  tooltip={subSubItem.title}
                                                >
                                                  {subSubItem.icon && (
                                                    <subSubItem.icon className="w-4 h-4" />
                                                  )}
                                                  <span>
                                                    {subSubItem.title}
                                                  </span>
                                                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                </SidebarMenuSubButton>
                                              </CollapsibleTrigger>
                                            </SidebarMenuSubItem>
                                          </Collapsible>
                                        ) : (
                                          <SidebarMenuSubButton asChild>
                                            <Link href={subSubItem.url || ""}>
                                              {subSubItem.icon && (
                                                <subSubItem.icon className="w-4 h-4" />
                                              )}
                                              <span>{subSubItem.title}</span>
                                            </Link>
                                          </SidebarMenuSubButton>
                                        )}
                                      </SidebarMenuSubItem>
                                    ))}
                                  </SidebarMenuSub>
                                </CollapsibleContent>
                              </SidebarMenuSubItem>
                            </Collapsible>
                          ) : (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url || ""}>
                                  {subItem.icon && (
                                    <subItem.icon className="w-4 h-4" />
                                  )}
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                        </div>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )}
          </div>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
