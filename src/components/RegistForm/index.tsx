"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { useAuthStore } from "@/store/useAuthStore";

// 新規登録 API コール関数
async function registerUser(credentials: {
  username: string;
  email: string;
  password: string;
}) {
  const response = await fetch("http://localhost:8080/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "登録に失敗しました");
  }

  // レスポンスからトークンを取得
  return response.json();
}

export function RegistForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  // useMutation フックを使用して新規登録処理を管理
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // トークンをlocalStorageに保存
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("isAdmin", (data.user?.isAdmin ?? false).toString());

      // Zustandの状態を更新
      setAuth(true, data.user?.isAdmin ?? false);

      // ホームページへリダイレクト
      router.push("/");
    },
    onError: (error: Error) => {
      alert(`エラー: ${error.message}`);
    },
  });

  // フォーム送信処理
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    mutation.mutate({ username, email, password });
  }

  return (
    <div className="flex flex-col gap-6 -mt-16 w-96">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">新規登録</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            {mutation.isError && (
              <div className="text-red-500">{mutation.error?.message}</div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="sample@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button
              type="submit"
              className="w-full mt-4"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "登録中..." : "新規登録"}
            </Button>
          </form>
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
