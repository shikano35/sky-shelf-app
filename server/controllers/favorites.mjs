import prisma from "../helpers/prisma/index.js";

// 書籍のお気に入り登録/解除
export async function toggleFavoriteBook(req, res) {
  const { userId, bookId } = req.body;

  try {
    // 既にお気に入り登録されているか確認
    const existingFavorite = await prisma.favorite.findFirst({
      where: { userId, bookId },
    });

    if (existingFavorite) {
      // お気に入り解除
      await prisma.favorite.delete({ where: { id: existingFavorite.id } });
      return res.status(200).json({ message: "Book unfavorited" });
    } else {
      // お気に入り登録
      await prisma.favorite.create({
        data: { userId, bookId },
      });
      return res.status(200).json({ message: "Book favorited" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle favorite book", details: error.message });
  }
}

// 小説家のお気に入り登録/解除
export async function toggleFavoriteNovelist(req, res) {
  const { userId, novelistId } = req.body;

  try {
    // 既にお気に入り登録されているか確認
    const existingFavorite = await prisma.favorite.findFirst({
      where: { userId, novelistId },
    });

    if (existingFavorite) {
      // お気に入り解除
      await prisma.favorite.delete({ where: { id: existingFavorite.id } });
      return res.status(200).json({ message: "Novelist unfavorited" });
    } else {
      // お気に入り登録
      await prisma.favorite.create({
        data: { userId, novelistId },
      });
      return res.status(200).json({ message: "Novelist favorited" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle favorite novelist", details: error.message });
  }
}

export async function getFavorites(req, res) {
  const { userId } = req.params;

  try {
    // userId を整数型に変換
    const parsedUserId = parseInt(userId, 10);

    // 無効な userId を防止
    if (isNaN(parsedUserId)) {
      return res.status(400).json({ error: "Invalid userId provided" });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: parsedUserId },
      include: { book: true, novelist: true },
    });

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favorites", details: error.message });
  }
}
