import express from "express";
import apiRoutes from "./api-routes/index.mjs";
import env from "dotenv";
import cors from 'cors';

env.config();

const app = express();

 // CORSを許可する設定
 app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// API
app.use("/api", apiRoutes);

app.use(function (req, res) {
  res.status(404).json("Not Found");
});

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ meg: "不正なエラーが発生しました", error: err });
});

// サーバーの起動
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});