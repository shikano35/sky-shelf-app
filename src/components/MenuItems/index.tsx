import React from "react";
import Link from "next/link";

const items = [
  { title: "トップページ", url: "/" },
  { title: "書籍一覧", url: "/books" },
  { title: "小説家一覧", url: "/novelists" },
  { title: "お気に入り書籍一覧", url: "/favorites/books" },
  { title: "お気に入り小説家一覧", url: "/favorites/novelists" },
  { title: "おまかせ", url: "/random" },
];

type MenuItemsProps = {
  onLinkClick: () => void;
};

export function MenuItems({ onLinkClick }: MenuItemsProps) {
  return (
    <div className="flex flex-col items-center p-4">
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.url}
          className="block p-2 hover:bg-input mt-2 rounded-md"
          onClick={onLinkClick}
        >
          <span className="text-sm text-primary font-medium">{item.title}</span>
        </Link>
      ))}
    </div>
  );
}
