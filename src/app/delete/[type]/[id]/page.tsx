"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";

async function deleteItem(type: string, id: string) {
  const url =
    type === "user"
      ? `http://localhost:8080/api/users/${id}`
      : `http://localhost:8080/api/${type}s/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("削除に失敗しました");
  }

  if (response.status === 204) {
    return null;
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function DeletePage() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => deleteItem(type, id),
    onSuccess: () => {
      router.push(`/${type}s`);
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const handleDelete = () => {
    if (window.confirm("本当に削除してもよろしいですか？")) {
      mutation.mutate();
    }
  };

  return (
    <AdminGuard>
      <div className="p-6 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">削除確認</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              この
              {type === "user"
                ? "ユーザー"
                : type === "book"
                  ? "書籍"
                  : "小説家"}
              を削除しますか？
            </p>
            <div className="flex justify-between mt-4">
              <Button variant="link" asChild>
                <Link href={`/${type}s`}>戻る</Link>
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "削除中..." : "削除"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminGuard>
  );
}
