"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useParams } from "next/navigation";
import AdminGuard from "@/components/AdminGuard";

type BookFormData = {
  name: string;
  comment?: string;
  writer: string;
  genre: string;
  imageUrl: string;
  bookUrl: string;
  year?: string;
};

type NovelistFormData = {
  name: string;
  comment?: string;
  books: string;
  years: string;
  imageUrl: string;
  url: string;
};

type UserFormData = {
  username: string;
  email: string;
  password: string;
};

async function createItem(
  type: string,
  data: BookFormData | NovelistFormData | UserFormData
) {
  const response = await fetch(`http://localhost:8080/api/${type}s`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("登録に失敗しました");
  return response.json();
}

export default function NewPage() {
  const { type } = useParams<{ type: string }>();
  const router = useRouter();

  const initialFormData =
    type === "book"
      ? {
          name: "",
          comment: "",
          writer: "",
          genre: "",
          imageUrl: "",
          bookUrl: "",
          year: "",
        }
      : type === "novelist"
        ? { name: "", comment: "", books: "", years: "", imageUrl: "", url: "" }
        : { username: "", email: "", password: "" };

  const [formData, setFormData] = useState<
    BookFormData | NovelistFormData | UserFormData
  >(initialFormData);

  const mutation = useMutation({
    mutationFn: (data: BookFormData | NovelistFormData | UserFormData) =>
      createItem(type, data),
    onSuccess: () => {
      router.push(`/${type}s`);
    },
    onError: (error: Error) => alert(error.message),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  function renderField(
    name: keyof BookFormData | keyof NovelistFormData | keyof UserFormData,
    placeholder: string,
    type: "input" | "textarea" = "input",
    required = false
  ) {
    const FieldComponent = type === "input" ? Input : Textarea;

    const value =
      (formData as BookFormData)[name as keyof BookFormData] ??
      (formData as NovelistFormData)[name as keyof NovelistFormData] ??
      (formData as UserFormData)[name as keyof UserFormData];

    return (
      <FieldComponent
        name={name as string}
        placeholder={placeholder}
        value={value || ""}
        onChange={handleChange}
        className="mb-4"
        required={required}
      />
    );
  }

  return (
    <AdminGuard>
      <div className="p-6 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">
              {type === "book"
                ? "書籍新規登録"
                : type === "novelist"
                  ? "小説家新規登録"
                  : "ユーザー新規登録"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {type === "book" && (
                <>
                  {renderField("name", "名前", "input", true)}
                  {renderField("comment", "コメント (任意)", "textarea")}
                  {renderField("writer", "著者", "input", true)}
                  {renderField("genre", "ジャンル", "input", true)}
                  {renderField("bookUrl", "書籍URL", "input", true)}
                  {renderField("imageUrl", "画像URL", "input", true)}
                  {renderField("year", "年 (任意)", "input")}
                </>
              )}
              {type === "novelist" && (
                <>
                  {renderField("name", "名前", "input", true)}
                  {renderField("comment", "コメント (任意)", "textarea")}
                  {renderField("books", "著作", "input", true)}
                  {renderField("years", "活動年", "input", true)}
                  {renderField("url", "Wikipedia URL", "input", true)}
                  {renderField("imageUrl", "画像URL", "input", true)}
                </>
              )}
              {type === "user" && (
                <>
                  {renderField("username", "ユーザーネーム", "input", true)}
                  {renderField("email", "メールアドレス", "input", true)}
                  {renderField("password", "パスワード", "input", true)}
                </>
              )}
              <div className="flex justify-between">
                <Button variant="link" asChild>
                  <Link href={"/new"}>戻る</Link>
                </Button>
                <Button type="submit" disabled={mutation.isPending}>
                  登録
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminGuard>
  );
}
