import { validationResult } from "express-validator";
import prisma from "../helpers/prisma/index.js";

// GET: 全ての小説家を取得
async function getAllNovelists(req, res) {
  const novelists = await prisma.novelist.findMany();
  res.json(novelists);
}

// GET: 小説家の取得
async function getNovelistById(req, res) {
  const { id } = req.params;
  const novelist = await prisma.novelist.findUnique({
    where: { id: parseInt(id) },
  });
  if (!novelist) {
    return res.status(404).json({ error: "Novelist not found" });
  }
  res.json(novelist);
}

// POST: 小説家の追加
async function registNovelist(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { comment, name, books, years, imageUrl, url } = req.body;
  if (!name || !books || !years || !imageUrl || !url) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newNovelist = await prisma.novelist.create({
    data: { comment, name, books, years, imageUrl, url },
  });
  res.status(201).json(newNovelist);
}

// PATCH: 小説家の更新
async function updateNovelist(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { id } = req.params;
  const { comment, name, books, years, imageUrl, url } = req.body;

  const updatedNovelist = await prisma.novelist.update({
    where: { id: parseInt(id) },
    data: { comment, name, books, years, imageUrl, url },
  });
  if (!updatedNovelist) {
    return res.status(404).json({ error: "Novelist not found" });
  }
  res.json(updatedNovelist);
}

// DELETE: 小説家の削除
async function deleteNovelist(req, res) {
  const { id } = req.params;
  const { deletedCount } = await prisma.novelist.delete({
    where: { id: parseInt(id) },
  });
  if (deletedCount === 0) {
    return res.status(404).json({ error: "Target novelist not found" });
  }
  res.status(204).send();
}

export {
  getAllNovelists,
  getNovelistById,
  registNovelist,
  updateNovelist,
  deleteNovelist,
};
