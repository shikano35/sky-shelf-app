import React from "react";
import { RegistForm } from "@/components/RegistForm";

export default function RegistPage() {
  return (
    <div className="sticky top-0">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col gap-6">
          <RegistForm />
        </div>
      </div>
    </div>
  );
}
