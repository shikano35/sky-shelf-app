import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

interface AppSidebarProps {
  isOpen: boolean;
}

const items = [
  { title: "トップページ", url: "/" },
  { title: "書籍一覧", url: "/books" },
  { title: "小説家一覧", url: "/authors" },
  { title: "お気に入り書籍一覧", url: "/books/favorites" },
  { title: "お気に入り小説家一覧", url: "authors/favorites" },
  { title: "おまかせ", url: "/random" },
];

export function AppSidebar({ isOpen }: AppSidebarProps) {
  return (
    <Sidebar
      className={`sticky top-0 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="py-6">
                    <Link href={item.url} className="mt-2">
                      <span className="text-base font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
