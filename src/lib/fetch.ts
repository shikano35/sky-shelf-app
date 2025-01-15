import { Book } from "@/lib/types";
import { Novelist, FavoriteResponse } from "@/lib/types";

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

export async function fetchFavorites(
  userId: number
): Promise<FavoriteResponse[]> {
  const response = await fetch(`http://localhost:8080/api/favorites/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }
  return response.json();
}

export function getUserId(): number | null {
  if (typeof window === "undefined") return null;

  const userId = localStorage.getItem("userId");
  return userId ? parseInt(userId, 10) : null;
}
