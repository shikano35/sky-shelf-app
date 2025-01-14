"use client";

import React, { useEffect, useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    setIsLoggedIn(!!token);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleNavigateToList = () => {
    router.push("/books");
  };

  return (
    <div className="sticky top-0">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col gap-6">
          {isLoggedIn ? (
            <>
              <h1 className="text-4xl font-bold">ようこそ、{username}さん！</h1>
              <Button onClick={handleNavigateToList}>一覧へ</Button>
            </>
          ) : (
            <LoginForm
              title="ようこそ！"
              message="登録せずに始める"
              url="/books"
            />
          )}
        </div>
      </div>
    </div>
  );
}
