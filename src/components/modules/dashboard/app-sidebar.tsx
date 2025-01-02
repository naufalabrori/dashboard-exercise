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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarMenu>
        {menus.map((item) => (
          <Collapsible
            asChild
            key={item.title}
            title={item.title}
            defaultOpen={pathname.includes(item.url)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  <div className="flex mr-2">{item.icon}</div>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.includes(subItem.url)}
                        className="pl-2"
                      >
                        <Link href={`/dashboard${subItem.url}`}>
                          {subItem.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>

      <SidebarRail />
    </Sidebar>
  );
}
