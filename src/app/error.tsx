"use client";

import { Button } from "@/features/ui";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isAuthError = error instanceof TypeError;

  return (
    <main className="h-screen w-full grid place-content-center space-y-4 text-center">
      <p className="text-xl">There was a problem</p>
      <h1 className="text-4xl font-bold balance">
        {isAuthError ? error.message : "Something went wrong"}
      </h1>

      <div className="flex items-center justify-center gap-2">
        <Button onClick={() => reset()}>
          Try again
        </Button>

        <Link
          href="/"
          className="inline-flex items-center gap-1 border-2 bg-white px-3 py-1.5 text-base border-black rounded shadow-neo text-black font-medium transition-shadow enabled:hover:shadow-none disabled:shadow-none"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
