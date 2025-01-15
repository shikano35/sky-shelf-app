"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type LoginResponse = {
  token: string;
  user: {
    username: string;
    id: string;
  };
};

// ログイン API コール関数
async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      Array.isArray(errorData.error)
        ? errorData.error.map((e: { msg: string }) => e.msg).join(", ")
        : errorData.error
    );
  }

  return response.json();
}

export function LoginForm({
  className,
  title = "ログイン画面",
  message = "戻る",
  url = "/",
  ...props
}: {
  message?: string;
  title?: string;
  url?: string;
} & React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const queryClient = useQueryClient();

  // useMutation フック
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // 成功時の処理
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("userId", data.user.id);
      setLoggedIn(true);

      // キャッシュにデータをセット
      queryClient.setQueryData(["user"], data.user);

      // ページ遷移
      router.push("/");
    },
    onError: (error: Error) => {
      // エラー時の処理
      console.error("ログインに失敗しました:", error.message);
    },
    retry: 1, // リトライ回数
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    mutation.mutate({ email, password });
  }

  return (
    <div
      className={cn("flex flex-col gap-6 -mt-16 w-96", className)}
      {...props}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {mutation.isError && (
                <div className="text-red-500">{mutation.error?.message}</div>
              )}
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
                {mutation.isPending ? "ログイン中..." : "ログイン"}
              </Button>
              <Button asChild variant="outline">
                <Link href="/regist">新規登録</Link>
              </Button>
            </div>
          </form>
          <div className="text-center text-sm mt-4">
            <Button asChild variant="link">
              <Link href={url}>{message}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
