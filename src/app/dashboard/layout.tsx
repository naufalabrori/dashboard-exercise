"use client";
import { AppSidebar } from "@/components/modules/dashboard/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Cookies from "universal-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AUTH_COOKIES_KEY } from "@/lib/utils";
import Link from "next/link";
import useMenuStore from "@/hooks/useMenuStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookies = new Cookies();
  const router = useRouter();
  const pathname = usePathname();
  const isDashboardChild = pathname.includes("/dashboard/");

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { menu } = useMenuStore();
  const queryClient = new QueryClient();

  useEffect(() => {
    const token = cookies.get(AUTH_COOKIES_KEY);
    if (token) {
      setIsAuth(true);
    } else {
      localStorage.clear();
      router.push("/auth/login");
    }
  }, [router]);

  return (
    isAuth && (
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          {/* Sidebar */}
          <AppSidebar />

          {/* Main Content */}
          <main className="flex flex-col flex-1">
            <SidebarInset>
              {/* Header */}
              <header className="flex sticky top-0 bg-background h-16 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      {isDashboardChild ? (
                        <Link href="/dashboard">
                          <BreadcrumbLink className="font-bold">Dashboard</BreadcrumbLink>
                        </Link>
                      ) : (
                        <BreadcrumbPage className="font-bold">Dashboard</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {isDashboardChild ? (
                      <>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                          <BreadcrumbPage className="font-bold">{menu}</BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    ) : null}
                  </BreadcrumbList>
                </Breadcrumb>
              </header>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-4 p-3 bg-gray-100">{children}</div>
            </SidebarInset>
          </main>
        </SidebarProvider>
      </QueryClientProvider>
    )
  );
}
