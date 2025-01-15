import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, bookId, novelistId } = await request.json();

  if (!userId || (!bookId && !novelistId)) {
    return NextResponse.json(
      { error: "パラメータが不足しています。" },
      { status: 400 }
    );
  }

  const endpoint = bookId ? "/api/favorites/books" : "/api/favorites/novelists";

  try {
    const response = await fetch(`http://localhost:8080${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        userId,
        bookId,
        novelistId,
      }),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `内部サーバーエラーが発生しました。: ${error}` },
      { status: 500 }
    );
  }
}
