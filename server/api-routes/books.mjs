import express from "express";
import { body } from "express-validator";
import {
  getAllBooks,
  getBookById,
  registBook,
  updateBook,
  deleteBook,
} from "../controllers/books.mjs";
import { requestErrorHandler } from "../helpers/helper.mjs";

const router = express.Router();

// GET: 全ての本を取得
router.get("/", requestErrorHandler(getAllBooks));

// GET: 本の取得
router.get("/:id", requestErrorHandler(getBookById));

// POST: 本の追加
router.post(
  "/",
  body("name").notEmpty(),
  body("writer").notEmpty(),
  body("genre").notEmpty(),
  body("imageUrl").notEmpty(),
  body("bookUrl").notEmpty(),
  requestErrorHandler(registBook)
);

// PATCH: 本の更新
router.patch(
  "/:id",
  body("name").optional().notEmpty(),
  body("writer").optional().notEmpty(),
  body("genre").optional().notEmpty(),
  body("imageUrl").optional().notEmpty(),
  body("bookUrl").optional().notEmpty(),
  requestErrorHandler(updateBook)
);

// DELETE: 本の削除
router.delete("/:id", requestErrorHandler(deleteBook));

export default router;
