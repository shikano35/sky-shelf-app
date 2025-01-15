import prisma from "../helpers/prisma/index.js";

// 書籍のお気に入り登録/解除
export async function toggleFavoriteBook(req, res) {
  const { userId, bookId } = req.body;

  if (!userId || !bookId) {
    return res.status(400).json({ error: "ユーザーIDと書籍IDは必須です。" });
  }

  try {
    // 既にお気に入り登録されているか確認
    const existingFavorite = await prisma.favorite.findFirst({
      where: { userId, bookId },
    });

    if (existingFavorite) {
      // お気に入り解除
      await prisma.favorite.delete({ where: { id: existingFavorite.id } });
      return res.status(200).json({ message: "本がお気に入り解除されました。" });
    } else {
      // お気に入り登録
      await prisma.favorite.create({
        data: { userId, bookId },
      });
      return res.status(200).json({ message: "本をお気に入り登録しました。" });
    }
  } catch (error) {
    res.status(500).json({ error: "書籍のお気に入り登録/お気に入り解除に失敗しました。", details: error.message });
  }
}

// 小説家のお気に入り登録/解除
export async function toggleFavoriteNovelist(req, res) {
  const { userId, novelistId } = req.body;

  if (!userId || !novelistId) {
    return res.status(400).json({ error: "ユーザーIDと小説家IDは必須です。" });
  }

  try {
    // 既にお気に入り登録されているか確認
    const existingFavorite = await prisma.favorite.findFirst({
      where: { userId, novelistId },
    });

    if (existingFavorite) {
      // お気に入り解除
      await prisma.favorite.delete({ where: { id: existingFavorite.id } });
      return res.status(200).json({ message: "小説家がお気に入り解除されました。" });
    } else {
      // お気に入り登録
      await prisma.favorite.create({
        data: { userId, novelistId },
      });
      return res.status(200).json({ message: "小説家をお気に入り登録しました。" });
    }
  } catch (error) {
    res.status(500).json({ error: "小説家のお気に入り登録/お気に入り解除に失敗しました。", details: error.message });
  }
}

export async function getFavorites(req, res) {
  const { userId } = req.params;

  try {
    // userId を整数型に変換
    const parsedUserId = parseInt(userId, 10);

    // 無効な userId を防止
    if (isNaN(parsedUserId)) {
      return res.status(400).json({ error: "無効なユーザーIDが提供されました。" });
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: parsedUserId,
        OR: [
          { bookId: { not: null } },
          { novelistId: { not: null } }
        ],
      },
      include: { book: true, novelist: true },
    });

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: "お気に入りの取得に失敗しました。", details: error.message });
  }
}