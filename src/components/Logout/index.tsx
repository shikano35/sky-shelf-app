"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

export function Logout() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/books");
  };

  return (
    <div className="flex flex-col gap-6 w-96">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">ログアウト画面</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">本当にログアウトしますか？</p>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            ログアウト
          </Button>
          <div className="text-center text-sm mt-4">
            <Button asChild variant="link">
              <Link href="/books">戻る</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
