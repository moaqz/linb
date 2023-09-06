import NextLink from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export function Link(props: Props) {
  return (
    <NextLink
      className="inline-flex gap-1 px-2 py-1.5 bg-yellow-400 border-2 border-black font-semibold shadow-[2px_3px_#000] transition-shadow hover:shadow-none"
      {...props}
    />
  );
}
