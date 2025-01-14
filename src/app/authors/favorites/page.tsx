import React from "react";
import { Heading } from "@/components/Heading";
import { fetchNovelists } from "@/lib/fetch";
import { Container } from "@/components/Container";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Novelist } from "@/lib/types";

export default async function AuthorsFavoritesPage() {
  const novelists: Novelist[] = await fetchNovelists();
  return (
    <div>
      <Container>
        <div className="flex justify-center">
          <Heading as="h2" className="my-16">
            お気に入り小説家一覧
          </Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {novelists.map((novelist) => (
            <Link
              key={novelist.id}
              href={`/authors/${novelist.id}`}
              className="m-4"
            >
              <Card className="hover:bg-primary-foreground hover:border-slate-300 h-full relative">
                <Link
                  href={`/authors/favorites/${novelist.id}`}
                  className="absolute bottom-4 right-4"
                >
                  <HeartIcon className="h-6 w-6 text-red-500" />
                </Link>
                <CardHeader className="flex items-center">
                  <Image
                    src={novelist.imageUrl}
                    alt={novelist.name}
                    width={110}
                    height={110}
                    className="rounded-md h-40 w-28"
                  />
                  <CardTitle className="pt-4 text-lg">
                    {novelist.name}
                  </CardTitle>
                  <CardDescription>{novelist.comment}</CardDescription>
                </CardHeader>
                <CardContent className="-mt-2 mb-2 flex flex-col items-center">
                  <p>{novelist.books}</p>
                  <p>{novelist.years}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
