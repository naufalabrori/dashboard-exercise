"use client";
import * as React from "react";
import { ChevronRight, LogOut } from "lucide-react";
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
import { logout } from "@/services/User/auth";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const items = [
  {
    title: "Master Data",
    url: "masterdata",
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
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent className="gap-0">
        {items.map((item) => (
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
                          className="pl-6"
                        >
                          <Link href={`/dashboard${item.url}`}>{item.title}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
        {/* Tambahkan tombol Logout */}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-red-500 hover:text-red-600"
            >
              <LogOut />
              <span>Logout</span>
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
