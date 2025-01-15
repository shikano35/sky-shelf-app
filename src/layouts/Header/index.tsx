"use client";

import React from "react";
import { DrawerMenu } from "@/components/DrawerMenu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/solid";

type HeaderProps = {
  toggleSidebar: () => void;
};

export function Header({ toggleSidebar }: HeaderProps) {
  const { isLoggedIn } = useAuthStore();

  return (
    <header className="sticky top-0 z-10 flex justify-between items-center w-full py-4 px-10 border bg-white/70 backdrop-blur-md">
      <div className="flex items-center">
        <DrawerMenu toggleSidebar={toggleSidebar} />
        <Link href="/">
          <h1 className="text-4xl font-bold">SkyShelf</h1>
        </Link>
      </div>
      {isLoggedIn ? (
        <Link href="/logout">
          <Button variant="outline">
            <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
          </Button>
        </Link>
      ) : (
        <Link href="/login">
          <Button variant="outline">
            <ArrowLeftEndOnRectangleIcon className="w-6 h-6" />
          </Button>
        </Link>
      )}
    </header>
  );
}
