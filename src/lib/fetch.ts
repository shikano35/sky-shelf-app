import { Book } from "@/lib/types";
import { Novelist } from "@/lib/types";

export async function fetchBooks(): Promise<Book[]> {
  const response = await fetch("http://localhost:8080/api/books/");
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
}

export async function fetchNovelists(): Promise<Novelist[]> {
  const response = await fetch("http://localhost:8080/api/novelists/");
  if (!response.ok) {
    throw new Error("Failed to fetch novelists");
  }
  return response.json();
}
