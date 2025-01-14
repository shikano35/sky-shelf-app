import express from "express";
import { body } from "express-validator";
import {
  getAllUsers,
  getUserById,
  registUser,
  updateUser,
  deleteUser,
} from "../controllers/users.mjs";
import { requestErrorHandler } from "../helpers/helper.mjs";
import { adminOnly } from "../helpers/auth.mjs";

const router = express.Router();

// GET: 全てのユーザーを取得
router.get("/", requestErrorHandler(getAllUsers));

router.get("/admin/users", adminOnly, requestErrorHandler(getAllUsers));

// GET: ユーザーの取得
router.get("/:id", requestErrorHandler(getUserById));



// POST: ユーザーの追加
router.post(
  "/",
  body("username").notEmpty(),
  body("email").notEmpty(),
  body("password").notEmpty(),
  requestErrorHandler(registUser)
);

// PATCH: ユーザーの更新
router.patch(
  "/:id",
  body("username").optional().notEmpty(),
  body("email").optional().notEmpty(),
  body("password").optional().notEmpty(),
  requestErrorHandler(updateUser)
);

router.patch("/admin/users/:id", adminOnly, requestErrorHandler(updateUser));

// DELETE: ユーザーの削除
router.delete("/:id", requestErrorHandler(deleteUser));

router.delete("/admin/users/:id", adminOnly, requestErrorHandler(deleteUser));

export default router;
