import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";
import { UserIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import AdminGuard from "@/components/AdminGuard";

export default function NewPage() {
  return (
    <AdminGuard>
      <div className="flex justify-center space-x-16 mt-32">
        <Link href="/new/novelist">
          <Card className="w-64 h-64 flex flex-col justify-center border border-border hover:bg-primary-foreground hover:border-slate-300">
            <CardHeader className="items-center">
              <UserIcon className="h-16 w-16 mb-4" />
              <CardTitle className="text-primary">小説家追加</CardTitle>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/new/book">
          <Card className="w-64 h-64 flex flex-col justify-center border border-border hover:bg-primary-foreground hover:border-slate-300">
            <CardHeader className="items-center">
              <BookOpenIcon className="h-16 w-16 mb-4" />
              <CardTitle>書籍追加</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </AdminGuard>
  );
}
