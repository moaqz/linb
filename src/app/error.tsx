"use client";

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
        <button
          onClick={() => reset()}
          className="px-2 py-1.5 bg-yellow-400 border-2 border-black font-semibold shadow-[2px_3px] transition-shadow hover:shadow-none"
        >
          Try again
        </button>

        <Link
          href="/"
          className="px-2 py-1.5 bg-red-400 border-2 border-black font-semibold shadow-[2px_3px] transition-shadow hover:shadow-none"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
