import { validationResult } from "express-validator";
import prisma from "../helpers/prisma/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { isAdmin } from "../helpers/admin.mjs";

dotenv.config();

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;

  console.log("入力されたデータ:", { email, password });

  const user = await prisma.user.findUnique({
    where: { email },
  });

  console.log("データベースから取得したユーザー:", user);

  if (!user) {
    return res.status(401).json({ error: "メールアドレスが見つかりません" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log("パスワード一致確認:", isPasswordValid);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "パスワードが間違っています" });
  }

  const token = jwt.sign(
    { userId: user.id, isAdmin: isAdmin(user) },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
}