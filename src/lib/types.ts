export type Book = {
  id: number;
  comment?: string;
  name: string; // 書籍名
  writer: string; // 著者名
  genre: string; // ジャンル
  imageUrl: string; // 画像URL
  bookUrl: string; // 書籍URL
  year?: string; // 出版年
};

export type Novelist = {
  id: number;
  comment?: string;
  name: string; // 小説家名
  books: string; // 書籍情報
  years: string; // 年代
  imageUrl: string; // 画像URL
  url: string; // 小説家のURL
};

export type User = {
  id: number;
  username: string; // ユーザー名
  email: string; // メールアドレス
  password: string; // パスワード
  regDate: Date; // 登録日
};
