import NextLink from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  href: string;
  className?: string;
  size?: "normal" | "small";
}

export function Link({ size = "normal", ...rest }: Props) {
  return (
    <NextLink
      className={`inline-flex items-center gap-1 rounded border-2 border-black bg-yellow-300 font-medium text-black shadow-neo transition-shadow hover:shadow-none ${
        size === "small" ? "px-3 py-1.5 text-base" : "px-6 py-2 text-lg"
      }`}
      {...rest}
    />
  );
}
