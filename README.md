2024年1月に作成しました。

[こちら](https://github.com/shikano35/readers-php-app)をNext.jsでリファクタリングした作品です

## 実行方法

1. 準備

```bash
cp .env.example .env
npm i
npm run build
```

2. 開発サーバーを実行

```bash
npm run dev
```

3. 本番環境を実行

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
