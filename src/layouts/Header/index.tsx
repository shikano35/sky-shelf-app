import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="z-10 flex items-center w-full h-16 bg-background px-8 border">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="mr-8"
          onClick={toggleSidebar}
        >
          <Bars3Icon className="" />
        </Button>
        <h1 className="text-4xl font-bold">Readers</h1>
      </div>
    </header>
  );
}
