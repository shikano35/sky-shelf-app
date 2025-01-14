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
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";

export type Item = {
  id: number | string;
  name: string;
  comment: string;
  imageUrl: string;
  details: string[];
  favoriteLink: string;
  detailLink: string;
};

type ItemCardListProps = {
  items: Item[];
  heading: string;
};

export const ItemCardList: React.FC<ItemCardListProps> = ({
  items,
  heading,
}) => {
  const [favorites, setFavorites] = useState<boolean[]>(items.map(() => false));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleFavorite = async (index: number) => {
    if (!isLoggedIn) return;

    const item = items[index];
    const isCurrentlyFavorite = favorites[index];
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites];
      newFavorites[index] = !isCurrentlyFavorite;
      return newFavorites;
    });

    try {
      const response = await fetch("http://localhost:8080/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          itemId: item.id,
          isFavorite: !isCurrentlyFavorite,
          type: "book",
        }),
      });

      if (!response.ok) {
        console.error("Failed to update favorite status");
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
          <Link key={item.id} href={item.detailLink} className="m-4">
            <Card className="hover:bg-primary-foreground hover:border-slate-300 h-full relative">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(index);
                }}
                className="absolute bottom-4 right-4"
                disabled={!isLoggedIn}
              >
                {favorites[index] ? (
                  <SolidHeartIcon className="h-6 w-6 text-red-500" />
                ) : (
                  <OutlineHeartIcon className="h-6 w-6 text-red-500" />
                )}
              </button>
              <div className="flex flex-col items-center">
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
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
