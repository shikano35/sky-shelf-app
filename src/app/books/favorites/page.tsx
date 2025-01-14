import React from "react";
import { Heading } from "@/components/Heading";
import { Container } from "@/components/Container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchBooks } from "@/lib/fetch";
import { HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { Book } from "@/lib/types";

export default async function BooksPage() {
  const books: Book[] = await fetchBooks();
  return (
    <div>
      <Container>
        <div className="flex justify-center">
          <Heading as="h2" className="my-16">
            お気に入り書籍一覧
          </Heading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`} className="m-4">
              <Card className="hover:bg-primary-foreground hover:border-slate-300 h-full relative">
                <Link
                  href={`/books/favorites/${book.id}`}
                  className="absolute bottom-4 right-4"
                >
                  <HeartIcon className="h-6 w-6 text-red-500" />
                </Link>
                <div className="flex flex-col items-center">
                  <CardHeader className="flex items-center h-[21rem]">
                    <Image
                      src={book.imageUrl}
                      alt={book.name}
                      width={110}
                      height={110}
                      className="rounded-md"
                    />
                    <CardTitle className="pt-4 text-lg">{book.name}</CardTitle>
                    <CardDescription>{book.comment}</CardDescription>
                  </CardHeader>
                  <CardContent className="-mt-2 flex flex-col items-center">
                    <p>著者: {book.writer}</p>
                    <p>ジャンル: {book.genre}</p>
                    <p>出版年: {book.year}</p>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
