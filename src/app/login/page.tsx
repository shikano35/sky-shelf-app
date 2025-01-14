import React from "react";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="sticky top-0">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col gap-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
