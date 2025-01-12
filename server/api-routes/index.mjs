import express from "express";
import booksRouter from "./books.mjs";
import novelistsRouter from "./novelists.mjs";
import usersRouter from "./users.mjs";

const router = express.Router();

router.use("/books", booksRouter);
router.use("/novelists", novelistsRouter);
router.use("/users", usersRouter);

export default router;
