import React from "react";
import { Logout } from "@/components/Logout";

export default function LogoutPage() {
  return (
    <div className="sticky top-0">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col gap-6">
          <Logout />
        </div>
      </div>
    </div>
  );
}
