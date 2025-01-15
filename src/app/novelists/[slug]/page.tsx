import React from "react";
import { fetchNovelists } from "@/lib/fetch";
import { Novelist } from "@/lib/types";
import { DetailCard } from "@/components/DetailCard";

export default async function AuthorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const novelists: Novelist[] = await fetchNovelists();
  const novelist = novelists.find((n) => n.id.toString() === slug);

  if (!novelist) {
    return <p>小説家が見つかりませんでした。</p>;
  }

  return (
    <DetailCard
      imageUrl={novelist.imageUrl}
      name={novelist.name}
      description={novelist.comment ?? "コメントがありません"}
      additionalInfo={
        <>
          <p>
            <strong>書籍情報:</strong> {novelist.books}
          </p>
          <p>
            <strong>年代:</strong> {novelist.years}
          </p>
        </>
      }
      backLink="/authors"
      actionLink={novelist.url}
    />
  );
}
