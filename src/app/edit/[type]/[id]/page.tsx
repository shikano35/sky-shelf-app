"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useParams } from "next/navigation";

interface BookFormData {
  name: string;
  comment?: string;
  writer: string;
  genre: string;
  imageUrl: string;
  bookUrl: string;
  year?: string;
}

interface NovelistFormData {
  name: string;
  comment?: string;
  books: string;
  years: string;
  imageUrl: string;
  url: string;
}

async function updateItem(
  type: string,
  id: string,
  updates: BookFormData | NovelistFormData
) {
  const response = await fetch(`http://localhost:8080/api/${type}s/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("更新に失敗しました");
  return response.json();
}

export default function Page() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

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
      : { name: "", comment: "", books: "", years: "", imageUrl: "", url: "" };

  const [formData, setFormData] = useState<BookFormData | NovelistFormData>(
    initialFormData
  );

  useEffect(() => {
    const fetchItem = async () => {
      const defaultFormData =
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
          : {
              name: "",
              comment: "",
              books: "",
              years: "",
              imageUrl: "",
              url: "",
            };

      const response = await fetch(`http://localhost:8080/api/${type}s/${id}`);
      const data = await response.json();
      setFormData({ ...defaultFormData, ...data });
    };
    fetchItem();
  }, [type, id]);

  const mutation = useMutation({
    mutationFn: (updates: BookFormData | NovelistFormData) =>
      updateItem(type, id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [type, id] });
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

  const renderField = (
    name: string,
    placeholder: string,
    type: "input" | "textarea" = "input",
    required = false
  ) => {
    const FieldComponent = type === "input" ? Input : Textarea;
    return (
      <FieldComponent
        name={name}
        placeholder={placeholder}
        value={(formData as BookFormData | NovelistFormData)[name] || ""}
        onChange={handleChange}
        className="mb-4"
        required={required}
      />
    );
  };

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">
            {type === "book" ? "書籍編集" : "小説家編集"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {renderField("name", "名前", "input", true)}
            {renderField("comment", "コメント (任意)", "textarea")}
            {type === "book" && (
              <>
                {renderField("writer", "著者", "input", true)}
                {renderField("genre", "ジャンル", "input", true)}
                {renderField("bookUrl", "書籍URL", "input", true)}
                {renderField("imageUrl", "画像URL", "input", true)}
                {renderField("year", "年 (任意)", "input")}
              </>
            )}
            {type === "novelist" && (
              <>
                {renderField("books", "著作", "input", true)}
                {renderField("years", "活動年", "input", true)}
                {renderField("url", "Wikipedia URL", "input", true)}
                {renderField("imageUrl", "画像URL", "input", true)}
              </>
            )}
            <div className="flex justify-between">
              <Button variant="link" asChild>
                <Link href={`/${type}s`}>戻る</Link>
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                更新
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
