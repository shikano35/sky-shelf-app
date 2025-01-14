import React from "react";
import { cn } from "@/lib/utils";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
};

const headingBaseStyle = "text-center md:text-start text-primary font-bold";

const headingSizes = {
  h1: "text-4xl md:text-5xl mb-16",
  h2: "text-3xl md:text-4xl",
  h3: "text-2xl md:text-3xl",
  h4: "text-xl md:text-2xl",
  h5: "text-lg md:text-xl",
  h6: "text-base md:text-lg",
} as const;

export function Heading({ as = "h1", children, className }: HeadingProps) {
  const Component = as;

  return (
    <Component
      className={cn(headingBaseStyle, headingSizes[Component], className)}
    >
      {children}
    </Component>
  );
}
