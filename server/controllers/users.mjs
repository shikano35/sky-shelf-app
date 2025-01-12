import { validationResult } from "express-validator";
import prisma from "../helpers/prisma/index.js";
import bcrypt from "bcrypt";

// GET: 全てのユーザーを取得
async function getAllUsers(req, res) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  res.json(users);
}

// GET: ユーザーの取得
async function getUserById(req, res) {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
}

// POST: ユーザーの追加
async function registUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });
  res.status(201).json({ id: newUser.id, username: newUser.username, email: newUser.email });
}

// PATCH: ユーザーの更新
async function updateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { id } = req.params;
  const { username, email, password } = req.body;

  // パスワードが提供されている場合のみハッシュ化
  const dataToUpdate = {
    username,
    email,
  };

  if (password) {
    dataToUpdate.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: dataToUpdate,
  });
  if (!updatedUser) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(updatedUser);
}

// DELETE: ユーザーの削除
async function deleteUser(req, res) {
  const { id } = req.params;
  const { deletedCount } = await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  if (deletedCount === 0) {
    return res.status(404).json({ error: "Target user not found" });
  }
  res.status(204).send();
}

export { getAllUsers, getUserById, registUser, updateUser, deleteUser };
