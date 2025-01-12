"use client";

import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      <SidebarProvider>
        <AppSidebar isOpen={isSidebarOpen} />
      </SidebarProvider>
      <div className="absolute inset-0 z-0">
        <main className="h-full w-full mt-16">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
