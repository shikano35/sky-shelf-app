import React from "react";
import { Container } from "@/components/Container";
import { fetchNovelists } from "@/lib/fetch";
import { ItemCardList, Item } from "@/components/ItemCardList";
import { Novelist } from "@/lib/types";

export default async function AuthorsPage() {
  const novelists: Novelist[] = await fetchNovelists();

  const items: Item[] = novelists.map((novelist) => ({
    id: novelist.id,
    name: novelist.name,
    comment: novelist.comment,
    imageUrl: novelist.imageUrl,
    details: [novelist.books, novelist.years],
    favoriteLink: `/authors/favorites/${novelist.id}`,
    detailLink: `/authors/${novelist.id}`,
  }));

  return (
    <Container>
      <ItemCardList items={items} heading="小説家一覧" />
    </Container>
  );
}
