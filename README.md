# Webプログラミング及び演習Ⅱ 最終課題

## SkyShelf

これは、青空文庫の書籍及びその作者の詳細を調べたり、読んだりするためのWebアプリケーションです。書籍、作者をお気に入り登録する機能を用意し、管理者は書籍、作者カードの追加、情報の更新、削除ができます。

## 実行方法

以下のコマンドで開発サーバーを実行することができます。

```bash
npm run dev
```

フロントエンドとバックエンドを別々に実行したい場合は以下のコマンドで行うことができます。

```bash
npm run dev:api
npm run start
```

フロントエンドは [http://localhost:3000](http://localhost:3000) 、バックエンドは [http://localhost:8080](http://localhost:8080)で動作させています。

## ログイン方法

管理者メール: admin@admin.com
<br>
管理者パスワード: admin

テストユーザーメール: test@test.com
<br>
テストユーザーパスワード: test

## 注意

書籍で追加できる画像URLは`https://www.amazon.co.jp/`の画像のみです。
<br>
小説家で追加できる画像URLは`https://ja.wikipedia.org/wiki/`の画像のみです。

## 技術スタック

|    scripts     | 内容                                     |
| :------------: | :--------------------------------------- |
|   TypeScript   | -                                        |
|    Next.js     | -                                        |
|  tailwind CSS  | -                                        |
|   Shadcn/ui    | UIで使用                                 |
|    Zustand     | ログイン状態の管理で使用                 |
| TanStack Query | 非同期の状態管理及びデータフェッチで使用 |
|   JavaScript   | -                                        |
|    Node.js     | -                                        |
|   Express.js   | -                                        |
|    prettier    | コードの整形                             |
|     ESLint     | 静的解析                                 |

## npm scripts

|  scripts   | 実行内容                         |
| :--------: | :------------------------------- |
|    dev     | 開発モードで起動                 |
| dev:client | フロントエンドを開発モードで起動 |
|  dev:api   | バックエンドを開発モードで起動   |
|   build    | ビルド                           |
|   start    | 本番モードで起動                 |
|    lint    | ESLintでチェック                 |
|  prettier  | prettierで整形                   |
|  prepare   | -                                |

## ディレクトリ説明

### src/

フロントエンド

### server/

バックエンド
