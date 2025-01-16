import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useAuthStore } from "@/store/useAuthStore";

const items = [
  { title: "トップページ", url: "/" },
  { title: "書籍一覧", url: "/books" },
  { title: "小説家一覧", url: "/novelists" },
  { title: "お気に入り書籍一覧", url: "/favorites/books" },
  { title: "お気に入り小説家一覧", url: "/favorites/novelists" },
  { title: "おすすめ書籍一覧", url: "/random" },
];

type AppSidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export function AppSidebar({ isOpen, toggleSidebar }: AppSidebarProps) {
  const { isAdmin } = useAuthStore();

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 pointer-events-auto"
          onClick={toggleSidebar}
        />
      )}
      <Sidebar
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ${
          isOpen
            ? "translate-x-0 pointer-events-auto"
            : "-translate-x-full pointer-events-none"
        }`}
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="py-6">
                      <Link
                        href={item.url}
                        className="mt-2"
                        onClick={toggleSidebar}
                      >
                        <span className="text-base text-primary font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                {isAdmin && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="py-6">
                      <Link
                        href="/users"
                        className="mt-2"
                        onClick={toggleSidebar}
                      >
                        <span className="text-base text-primary font-medium">
                          ユーザー一覧
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button variant="outline" onClick={toggleSidebar}>
            <ChevronLeftIcon />
          </Button>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
