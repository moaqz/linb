"use client";

import { Button } from "@/features/ui";
import Link from "next/link";
import { useEffect } from "react";

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
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
    <main className="grid h-screen w-full place-content-center space-y-4 text-center">
      <p className="text-xl">There was a problem</p>
      <h1 className="balance text-4xl font-bold">
        {isAuthError ? error.message : "Something went wrong"}
      </h1>

      <div className="flex items-center justify-center gap-2">
        <Button onClick={() => reset()}>Try again</Button>

        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded border-2 border-black bg-white px-3 py-1.5 text-base font-medium text-black shadow-neo transition-shadow enabled:hover:shadow-none disabled:shadow-none"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
