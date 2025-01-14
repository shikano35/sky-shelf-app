import express from "express";
import booksRouter from "./books.mjs";
import novelistsRouter from "./novelists.mjs";
import usersRouter from "./users.mjs";
import authRouter from "./auth.mjs";
import favoriteRouter from "./favorites.mjs";

const router = express.Router();

router.use("/books", booksRouter);
router.use("/novelists", novelistsRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/favorites", favoriteRouter);

export default router;