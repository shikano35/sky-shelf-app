import React from "react";
import { Container } from "@/components/Container";
import { fetchNovelists } from "@/lib/fetch";
import { ItemCardList, Item } from "@/components/ItemCardList";
import { Novelist } from "@/lib/types";

export default async function AuthorsPage() {
  const novelists: Novelist[] = await fetchNovelists();

  // `Item`型のデータに変換
  const items: Item[] = novelists.map((novelist) => ({
    id: novelist.id,
    name: novelist.name,
    comment: novelist.comment,
    imageUrl: novelist.imageUrl,
    details: [`代表作: ${novelist.books}`, `活動年: ${novelist.years}`],
    detailLink: `/authors/${novelist.id}`,
    type: "novelist",
  }));

  return (
    <Container>
      <ItemCardList items={items} heading="小説家一覧" />
    </Container>
  );
}
