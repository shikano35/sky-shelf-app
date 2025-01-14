"use client";

import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const queryClient = new QueryClient();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen bg-muted">
        <Header toggleSidebar={toggleSidebar} />
        <SidebarProvider>
          <div className="flex flex-1">
            <AppSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <main
              className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "md:-ml-0" : "md:-ml-64"}`}
            >
              {children}
            </main>
          </div>
        </SidebarProvider>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
