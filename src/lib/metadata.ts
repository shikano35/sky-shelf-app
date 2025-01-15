import { Metadata } from "next";

export const baseMetadata: Metadata = {
  title: "SkyShelf",
  description: "青空文庫の作品を心地よく読むためのアプリケーションです。",
  keywords: "SkyShelf, 青空文庫, Aozora Bunko",
  authors: [{ name: "Shin Takemura", url: "https://example.com" }],
  generator:
    "Node.js, Express.js JavaScript, Prisma, SQLite, Next.js, TypeScript, Tailwind CSS, Shadcn/ui, ESLint, Prettier",
  applicationName: "SkyShelf",
  openGraph: {
    title: "SkyShelf",
    description: "青空文庫の作品を心地よく読むためのアプリケーションです。",
    type: "website",
    url: "https://example.com",
    siteName: "SkyShelf",
    locale: "ja_JP",
    images: [
      {
        url: "https://example.com",
        width: 1200,
        height: 630,
        alt: "SkyShelf",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "SkyShelf",
    description: "青空文庫の作品を心地よく読むためのアプリケーションです。",
  },
};
