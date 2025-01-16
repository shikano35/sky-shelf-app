"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon as OutlineHeartIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";

export type Item = {
  id: number | string;
  name: string;
  comment: string;
  imageUrl: string;
  details: string[];
  detailLink: string;
  type: "book" | "novelist" | "user";
};

type ItemCardListProps = {
  items: Item[];
  heading: string;
};

export const ItemCardList: React.FC<ItemCardListProps> = ({
  items,
  heading,
}) => {
  const { isLoggedIn, isAdmin } = useAuthStore();
  const [bookFavorites, setBookFavorites] = useState<number[]>([]);
  const [novelistFavorites, setNovelistFavorites] = useState<number[]>([]);

  // お気に入りデータを取得
  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (userId && token) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/favorites/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.ok) {
            const data = await response.json();
            const bookFavIds = data
              .filter((fav: { bookId?: number }) => fav.bookId)
              .map((fav: { bookId: number }) => fav.bookId);
            const novelistFavIds = data
              .filter((fav: { novelistId?: number }) => fav.novelistId)
              .map((fav: { novelistId: number }) => fav.novelistId);

            setBookFavorites(bookFavIds);
            setNovelistFavorites(novelistFavIds);
          } else {
            console.error("お気に入りデータの取得に失敗しました。");
          }
        } catch (error) {
          console.error("エラーが発生しました:", error);
        }
      }
    };

    fetchFavorites();
  }, []);

  // お気に入り登録・解除
  const toggleFavorite = async (
    index: number,
    itemType: "book" | "novelist" | "user"
  ) => {
    if (!isLoggedIn) return;
    if (itemType === "user") return;

    const item = items[index];
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error(
        "User ID is not available. Please ensure the user is logged in."
      );
      return;
    }

    try {
      const url =
        itemType === "book"
          ? "http://localhost:8080/api/favorites/books"
          : "http://localhost:8080/api/favorites/novelists";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          [itemType === "book" ? "bookId" : "novelistId"]: item.id,
        }),
      });

      if (response.ok) {
        // 登録・解除の反映
        if (itemType === "book") {
          setBookFavorites((prevFavorites) =>
            prevFavorites.includes(Number(item.id))
              ? prevFavorites.filter((id) => id !== Number(item.id))
              : [...prevFavorites, Number(item.id)]
          );
        } else {
          setNovelistFavorites((prevFavorites) =>
            prevFavorites.includes(Number(item.id))
              ? prevFavorites.filter((id) => id !== Number(item.id))
              : [...prevFavorites, Number(item.id)]
          );
        }
      } else {
        console.error("お気に入りの更新に失敗しました。");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <h2 className="my-16 text-2xl font-bold">{heading}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={item.id} className="m-4">
            <Card
              className={`h-full relative ${
                item.type !== "user"
                  ? "hover:bg-primary-foreground hover:border-slate-300"
                  : ""
              }`}
            >
              {isAdmin && (
                <>
                  <Link
                    href={`/edit/${item.type}/${item.id}`}
                    className="absolute top-2 right-4"
                  >
                    <Button variant="outline" size="icon">
                      <PencilSquareIcon className="h-12 w-12" />
                    </Button>
                  </Link>
                  <Link
                    href={`/delete/${item.type}/${item.id}`}
                    className="absolute bottom-2 right-4"
                  >
                    <Button size="icon">
                      <TrashIcon className="h-6 w-6" />
                    </Button>
                  </Link>
                </>
              )}
              {!isAdmin && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(index, item.type);
                  }}
                  className={`absolute bottom-4 right-4 ${
                    isLoggedIn ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                  disabled={!isLoggedIn}
                >
                  {item.type === "book" ? (
                    bookFavorites.includes(Number(item.id)) ? (
                      <SolidHeartIcon className="h-6 w-6 text-red-500" />
                    ) : (
                      <OutlineHeartIcon className="h-6 w-6 text-red-500" />
                    )
                  ) : novelistFavorites.includes(Number(item.id)) ? (
                    <SolidHeartIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <OutlineHeartIcon className="h-6 w-6 text-red-500" />
                  )}
                </button>
              )}
              <Link
                href={item.type === "user" ? "#" : item.detailLink}
                onClick={(e) => {
                  if (item.type === "user") {
                    e.preventDefault();
                  }
                }}
                className={`flex flex-col items-center ${
                  item.type === "user" ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <CardHeader className="flex items-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={110}
                    height={110}
                    className="rounded-md h-48 w-32"
                  />
                  <CardTitle className="pt-4 text-lg">{item.name}</CardTitle>
                  <CardDescription className="text-center">
                    {item.comment}
                  </CardDescription>
                </CardHeader>
                <CardContent className="-mt-2 flex flex-col items-center">
                  {item.details.map((detail, index) => (
                    <p key={index} className="text-sm text-gray-600">
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Link>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
