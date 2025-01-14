import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type DetailCardProps = {
  imageUrl: string;
  name: string;
  description: string;
  additionalInfo: React.ReactNode;
  backLink: string;
  actionLink?: string;
  actionLabel?: string;
};

export const DetailCard: React.FC<DetailCardProps> = ({
  imageUrl,
  name,
  description,
  additionalInfo,
  backLink,
  actionLink,
  actionLabel = "読む",
}) => (
  <div className="flex flex-col items-center justify-center p-6">
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col items-center">
        <Image
          src={imageUrl}
          alt={name}
          width={150}
          height={150}
          className="rounded-lg"
        />
        <CardTitle className="text-2xl mt-4">{name}</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">{additionalInfo}</CardContent>
      <CardContent className="flex justify-between">
        <Link href={backLink}>
          <Button variant="outline" className="px-8">
            戻る
          </Button>
        </Link>
        {actionLink && (
          <Link href={actionLink} passHref>
            <Button variant="outline" className="px-8">
              {actionLabel}
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  </div>
);
