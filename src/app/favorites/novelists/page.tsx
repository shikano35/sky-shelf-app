"use client";

import React, { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { ItemCardList, Item } from "@/components/ItemCardList";
import { useAuthStore } from "@/store/useAuthStore";

export default function FavoriteNovelistsPage() {
  const { isLoggedIn } = useAuthStore();
  const [favoriteNovelists, setFavoriteNovelists] = useState<Item[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/"; // ログインしていない場合、トップページへリダイレクト
      return;
    }

    const fetchFavoriteNovelists = async () => {
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
            const novelists = data
              .filter(
                (item: {
                  novelist: {
                    id: number;
                    name: string;
                    comment: string;
                    imageUrl: string;
                    books: string;
                    years: string;
                  };
                }) => item.novelist
              )
              .map(
                (item: {
                  novelist: {
                    id: number;
                    name: string;
                    comment: string;
                    imageUrl: string;
                    books: string;
                    years: string;
                  };
                }) => ({
                  id: item.novelist.id,
                  name: item.novelist.name,
                  comment: item.novelist.comment,
                  imageUrl: item.novelist.imageUrl,
                  details: [
                    `代表作: ${item.novelist.books}`,
                    `活動年: ${item.novelist.years}`,
                  ],
                  detailLink: `/authors/${item.novelist.id}`,
                  type: "novelist",
                })
              );
            setFavoriteNovelists(novelists);
          }
        } catch (error) {
          console.error("お気に入り小説家の取得に失敗しました:", error);
        }
      }
    };

    fetchFavoriteNovelists();
  }, [isLoggedIn]);

  return (
    <Container>
      <ItemCardList items={favoriteNovelists} heading="お気に入りの小説家" />
    </Container>
  );
}
