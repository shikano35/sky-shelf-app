"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

async function deleteItem(type: string, id: string) {
  const response = await fetch(`http://localhost:8080/api/${type}s/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("削除に失敗しました");
  }

  // レスポンスが空の場合は特に処理しない
  if (response.status === 204) {
    // No Contentの場合、ボディは空
    return null; // もしくは、必要に応じて成功メッセージを返す
  }

  try {
    const data = await response.json(); // JSONパース
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
      // 削除が成功した後、一覧ページへリダイレクト
      router.push(`/${type}s`);
    },
    onError: (error: Error) => {
      alert(error.message); // エラーメッセージを表示
    },
  });

  const handleDelete = () => {
    if (window.confirm("本当に削除してもよろしいですか？")) {
      mutation.mutate();
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">削除確認</CardTitle>
        </CardHeader>
        <CardContent>
          <p>この{type === "book" ? "書籍" : "小説家"}を削除しますか？</p>
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
  );
}
