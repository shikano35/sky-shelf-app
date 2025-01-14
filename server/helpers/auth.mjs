import jwt from "jsonwebtoken";

export function adminOnly(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "認証が必要です" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return res.status(403).json({ error: "管理者権限が必要です" });
    }
    req.user = decoded; // トークンの情報をリクエストに保存
    next();
  } catch (error) {
    res.status(403).json({ error: "無効なトークンです" }, error);
  }
}
