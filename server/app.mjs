import express from "express";
import apiRoutes from "./api-routes/index.mjs";
import env from "dotenv";
env.config();

const app = express();
const port = process.env.PORT || 8080;

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

app.listen(port, () => {
  console.log(`Server Start: http://localhost:${port}`);
});
