import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-screen w-full grid place-content-center space-y-4 text-center">
      <h2 className="text-9xl font-bold">
        404
      </h2>

      <h1 className="text-2xl font-medium">Oops... looks like you got lost</h1>

      <div className="flex items-center justify-center gap-2">
        <Link
          href="/"
          className="px-2 py-1.5 bg-yellow-400 border-2 border-black font-semibold shadow-[2px_3px] transition-shadow hover:shadow-none"
        >
          Back to home page
        </Link>
      </div>
    </main>
  );
}
