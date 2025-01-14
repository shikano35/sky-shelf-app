import React from "react";
import { fetchBooks } from "@/lib/fetch";
import { Book } from "@/lib/types";
import { DetailCard } from "@/components/DetailCard";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const books: Book[] = await fetchBooks();
  const book = books.find((b) => b.id.toString() === slug);

  if (!book) {
    return <p>書籍が見つかりませんでした。</p>;
  }

  return (
    <DetailCard
      imageUrl={book.imageUrl}
      name={book.name}
      description={book.comment}
      additionalInfo={
        <>
          <p>
            <strong>著者:</strong> {book.writer}
          </p>
          <p className="mt-4">
            <strong>ジャンル:</strong> {book.genre}
          </p>
          <p className="mt-4">
            <strong>出版年:</strong> {book.year}
          </p>
        </>
      }
      backLink="/books"
      actionLink={book.bookUrl}
    />
  );
}
