"use client";

import React, { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { ItemCardList, Item } from "@/components/ItemCardList";
import { useAuthStore } from "@/store/useAuthStore";

export default function FavoriteBooksPage() {
  const { isLoggedIn } = useAuthStore();
  const [favoriteBooks, setFavoriteBooks] = useState<Item[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/"; // ログインしていない場合、トップページへリダイレクト
      return;
    }

    const fetchFavoriteBooks = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (userId && token) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/favorites/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            const books = data
              .filter(
                (item: {
                  book: {
                    id: number;
                    name: string;
                    comment: string;
                    imageUrl: string;
                    writer: string;
                    genre: string;
                    year: number;
                  };
                }) => item.book
              ) // お気に入りの書籍のみを抽出
              .map(
                (item: {
                  book: {
                    id: number;
                    name: string;
                    comment: string;
                    imageUrl: string;
                    writer: string;
                    genre: string;
                    year: number;
                  };
                }) => ({
                  id: item.book.id,
                  name: item.book.name,
                  comment: item.book.comment,
                  imageUrl: item.book.imageUrl,
                  details: [
                    `著者: ${item.book.writer}`,
                    `ジャンル: ${item.book.genre}`,
                    `出版年: ${item.book.year}`,
                  ],
                  detailLink: `/books/${item.book.id}`,
                  type: "book",
                })
              );
            setFavoriteBooks(books);
          }
        } catch (error) {
          console.error("お気に入り書籍の取得に失敗しました:", error);
        }
      }
    };

    fetchFavoriteBooks();
  }, [isLoggedIn]);

  return (
    <Container>
      <ItemCardList items={favoriteBooks} heading="お気に入りの書籍" />
    </Container>
  );
}
