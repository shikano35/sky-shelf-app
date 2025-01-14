import express from "express";
import { toggleFavoriteBook, toggleFavoriteNovelist, getFavorites } from "../controllers/favorites.mjs";

const router = express.Router();

// 書籍のお気に入り登録/解除
router.post("/books", toggleFavoriteBook);

// 小説家のお気に入り登録/解除
router.post("/novelists", toggleFavoriteNovelist);

router.get("/:userId", getFavorites);

export default router;