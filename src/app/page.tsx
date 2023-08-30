import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

async function Page() {
  const user = await currentUser();

  return (
    <>
      <header className="mb-6 border-b-2 border-b-black bg-white">
        <div className="max-w-screen-lg mx-auto flex items-center justify-between p-4">
          <Link href="/" className="text-2xl font-bold">
            Linb
          </Link>

          {user ? (
            <Link
              href="/collections"
              className="px-2 py-1.5 bg-yellow-400 border-2 border-black font-semibold shadow-[2px_3px] transition-shadow hover:shadow-none"
            >
              Go to Collections
            </Link>
          ) : (
            <Link
              href="/sign-up"
              className="px-2 py-1.5 bg-yellow-400 border-2 border-black font-semibold shadow-[2px_3px] transition-shadow hover:shadow-none"
            >
              Sign in
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-screen-lg mx-auto px-4">
        <div className="text-center mt-40 sm:text-left max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-semibold balance">
            Find your Favorite websites in seconds
          </h1>

          <p className="my-6 text-lg balance">
            A Simple and Intuitive Bookmarking Application to Organize Your
            Links.
          </p>

          <Link
            href="/collections"
            className="w-fit px-2 py-1.5 bg-yellow-400 border-2 border-black font-semibold shadow-[2px_3px] transition-shadow hover:shadow-none"
          >
            Get Started
          </Link>
        </div>
      </main>

      <footer className="w-full px-2 py-6 absolute bottom-0 text-center text-sm">
        <p className="text-sm">
          Crafted by{" "}
          <a
            className="font-medium underline underline-offset-4"
            href="https://github.com/moaqz"
            target="_blank"
          >
            moaqz
          </a>
          . The source code is on{" "}
          <a
            target="_blank"
            className="font-medium underline underline-offset-4"
            href="https://github.com/moaqz/linb"
          >
            Github
          </a>
          .
        </p>
      </footer>
    </>
  );
}

export default Page;
