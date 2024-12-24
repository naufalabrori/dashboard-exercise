"use client";
import * as React from "react";
import { ChevronRight, FolderOpen, Warehouse } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menus = [
  {
    title: "Master Data",
    url: "masterdata",
    icon: <FolderOpen />,
    items: [
      {
        title: "User",
        url: "/masterdata/user",
      },
      {
        title: "Role",
        url: "/masterdata/role",
      },
    ],
  },
  {
    title: "Logistic",
    url: "logistic",
    icon: <Warehouse />,
    items: [
      {
        title: "Inbound",
        url: "/logistic/inbound",
      },
      {
        title: "Other Inbound",
        url: "/logistic/otherinbound",
        isActive: true,
      },
      {
        title: "Other Outbound",
        url: "/logistic/otheroutbound",
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent className="gap-0">
        {menus.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen={pathname.includes(item.url)}
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  <div className="flex mr-2">{item.icon}</div>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname.includes(item.url)}
                          className="pl-8"
                        >
                          <Link href={`/dashboard${item.url}`}>
                            {item.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
