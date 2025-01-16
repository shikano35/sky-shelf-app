import React from "react";
import { Container } from "@/components/Container";
import { fetchUsers } from "@/lib/fetch";
import { ItemCardList, Item } from "@/components/ItemCardList";
import { User } from "@/lib/types";
import AdminGuard from "../../components/AdminGuard";

export default async function UsersPage() {
  const users: User[] = await fetchUsers();

  const items: Item[] = users.map((user) => ({
    id: user.id,
    name: user.username,
    comment: user.email,
    imageUrl: "/default-user.svg",
    details: [`メール: ${user.email}`],
    detailLink: "",
    type: "user",
  }));

  return (
    <AdminGuard>
      <Container>
        <ItemCardList items={items} heading="ユーザー一覧" />
      </Container>
    </AdminGuard>
  );
}
