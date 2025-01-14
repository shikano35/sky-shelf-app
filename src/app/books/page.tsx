import React from "react";
import { Container } from "@/components/Container";
import { fetchBooks } from "@/lib/fetch";
import { ItemCardList, Item } from "@/components/ItemCardList";
import { Book } from "@/lib/types";

export default async function BooksPage() {
  const books: Book[] = await fetchBooks();

  const items: Item[] = books.map((book) => ({
    id: book.id,
    name: book.name,
    comment: book.comment,
    imageUrl: book.imageUrl,
    details: [
      `著者: ${book.writer}`,
      `ジャンル: ${book.genre}`,
      `出版年: ${book.year}`,
    ],
    favoriteLink: `/books/favorites/${book.id}`,
    detailLink: `/books/${book.id}`,
  }));

  return (
    <Container>
      <ItemCardList items={items} heading="書籍一覧" />
    </Container>
  );
}
