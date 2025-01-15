"use client";

import React from "react";
import { Container } from "@/components/Container";
import { ItemCardList, Item } from "@/components/ItemCardList";
import { useRandomBooks } from "@/hooks/useRandomBooks";

export default function RandomBooksPage() {
  const books = useRandomBooks();

  const items: Item[] = books.map((book) => ({
    id: book.id,
    name: book.name,
    comment: book.comment ?? "コメントがありません",
    imageUrl: book.imageUrl,
    details: [
      `著者: ${book.writer}`,
      `ジャンル: ${book.genre}`,
      `出版年: ${book.year}`,
    ],
    detailLink: `/books/${book.id}`,
    type: "book",
  }));

  return (
    <Container>
      <ItemCardList items={items} heading="おすすめ書籍一覧" />
    </Container>
  );
}
