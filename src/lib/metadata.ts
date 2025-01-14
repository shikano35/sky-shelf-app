import { Metadata } from "next";

export const baseMetadata: Metadata = {
  title: "Readers",
  description: "青空文庫の作品を心地よく読むためのアプリケーションです。",
  keywords: "Readers, 青空文庫, Aozora Bunko",
  authors: [{ name: "Shin Takemura", url: "https://example.com" }],
  generator:
    "Node.js, Express.js JavaScript, Prisma, SQLite, Next.js, TypeScript, Tailwind CSS, Shadcn/ui, ESLint, Prettier",
  applicationName: "Readers",
  openGraph: {
    title: "Readers",
    description: "青空文庫の作品を心地よく読むためのアプリケーションです。",
    type: "website",
    url: "https://example.com",
    siteName: "Readers",
    locale: "ja_JP",
    images: [
      {
        url: "https://example.com",
        width: 1200,
        height: 630,
        alt: "Readers",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Readers",
    description: "青空文庫の作品を心地よく読むためのアプリケーションです。",
  },
};
