import express from "express";
import { body } from "express-validator";
import { login } from "../controllers/auth.mjs";
import { requestErrorHandler } from "../helpers/helper.mjs";

const router = express.Router();

router.post(
  "/login",
  body("email")
    .notEmpty()
    .withMessage("メールアドレスは必須です")
    .isEmail()
    .withMessage("正しいメールアドレスを入力してください")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("パスワードは必須です"),
  requestErrorHandler(login)
);

export default router;
