import { Book, Novelist, User } from "@/lib/types";

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

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch("http://localhost:8080/api/users/");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}
