"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { isAdmin } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      alert("このページは表示できません。");
      router.push("/");
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return null; // 管理者ではない場合、何も表示しない
  }

  return <>{children}</>;
}
