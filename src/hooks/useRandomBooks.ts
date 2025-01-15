"use client";

import { useEffect, useState } from "react";
import { fetchBooks } from "@/lib/fetch";
import { Book } from "@/lib/types";

// 配列をシャッフルする関数
const shuffleArray = <T>(array: T[]): T[] => {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};

// ランダムな書籍データを取得するカスタムフック
export const useRandomBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      const fetchedBooks: Book[] = await fetchBooks();
      const shuffledBooks = shuffleArray(fetchedBooks);
      setBooks(shuffledBooks);
    };

    loadBooks();
  }, []);

  return books;
};
