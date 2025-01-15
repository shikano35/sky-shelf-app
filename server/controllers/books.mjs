import { validationResult } from "express-validator";
import prisma from "../helpers/prisma/index.js";

// GET: 全ての本を取得
async function getAllBooks(req, res) {
  const books = await prisma.book.findMany();
  res.json(books);
}

// GET: 本の取得
async function getBookById(req, res) {
  const { id } = req.params;
  const book = await prisma.book.findUnique({ where: { id: parseInt(id) } });
  if (!book) {
    return res.status(404).json({ error: "書籍が見つかりません。" });
  }
  res.json(book);
}

// POST: 本の追加
async function registBook(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { comment, name, writer, genre, imageUrl, bookUrl, year } = req.body;
  if (!name || !writer || !genre || !imageUrl || !bookUrl) {
    return res.status(400).json({ error: "必須項目が欠けています。" });
  }

  const newBook = await prisma.book.create({
    data: { comment, name, writer, genre, imageUrl, bookUrl, year },
  });
  res.status(201).json(newBook);
}

// PATCH: 本の更新
async function updateBook(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { id } = req.params;
  const { comment, name, writer, genre, imageUrl, bookUrl, year } = req.body;

  const updatedBook = await prisma.book.update({
    where: { id: parseInt(id) },
    data: { comment, name, writer, genre, imageUrl, bookUrl, year },
  });
  if (!updatedBook) {
    return res.status(404).json({ error: "書籍が見つかりません。" });
  }
  res.json(updatedBook);
}

// DELETE: 本の削除
async function deleteBook(req, res) {
  const { id } = req.params;
  const { deletedCount } = await prisma.book.delete({
    where: { id: parseInt(id) },
  });
  if (deletedCount === 0) {
    return res.status(404).json({ error: "対象の本が見つかりません。" });
  }
  res.status(204).send();
}

export { getAllBooks, getBookById, registBook, updateBook, deleteBook };
