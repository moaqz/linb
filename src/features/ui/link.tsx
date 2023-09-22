import NextLink from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  href: string;
  className?: string;
  size?: "normal" | "small"
}

export function Link({ size = "normal", ...rest }: Props) {
  return (
    <NextLink
      className={`inline-flex items-center gap-1 border-2 bg-yellow-300 border-black rounded shadow-neo text-black font-medium transition-shadow hover:shadow-none ${
        size === "small" ? "px-3 py-1.5 text-base" : "text-lg px-6 py-2"
      }`}
      {...rest}
    />
  );
}
