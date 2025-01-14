import express from "express";
import { body } from "express-validator";
import {
  getAllNovelists,
  getNovelistById,
  registNovelist,
  updateNovelist,
  deleteNovelist,
} from "../controllers/novelists.mjs";
import { requestErrorHandler } from "../helpers/helper.mjs";

const router = express.Router();

// GET: 全ての小説家を取得
router.get("/", requestErrorHandler(getAllNovelists));

// GET: 小説家の取得
router.get("/:id", requestErrorHandler(getNovelistById));

// POST: 小説家の追加
router.post("/",
body("name").notEmpty(),
body("books").notEmpty(),
body("years").notEmpty(),
body("imageUrl").notEmpty(),
body("url").notEmpty(),
requestErrorHandler(registNovelist)
);

// PATCH: 小説家の更新
router.patch("/:id", 
body("name").optional().notEmpty(),
body("books").optional().notEmpty(),
body("years").optional().notEmpty(),
body("imageUrl").optional().notEmpty(),
body("url").optional().notEmpty(),
requestErrorHandler(updateNovelist)
);

// DELETE: 小説家の削除
router.delete("/:id", requestErrorHandler(deleteNovelist));

export default router;
