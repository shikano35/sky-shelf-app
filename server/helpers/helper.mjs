export function requestErrorHandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.error("エラー詳細:", error); // エラー内容をコンソールに出力
      res.status(500).json({
        msg: "不正なエラーが発生しました",
        error: error.message || error, // エラー内容を含める
      });
    }
  };
}
