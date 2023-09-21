import { currentUser } from "@clerk/nextjs/server";
import { Link, Logo } from "@/features/ui";

async function Page() {
  const user = await currentUser();

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto]">
      <header className="border-b-2 border-b-black bg-white">
        <div className="max-w-screen-lg mx-auto flex items-center justify-between p-4">
          <Logo />

          {user
            ? (
              <Link href="/collections">Go to Collections</Link>
            )
            : (
              <Link href="/sign-up">Sign in</Link>
            )}
        </div>
      </header>

      <main className="w-full max-w-screen-lg mx-auto px-4">
        <div className="mt-40 text-left max-w-sm sm:max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-semibold">
            Find your Favorite websites in seconds
          </h1>

          <p className="my-6 text-lg">
            A Simple and Intuitive Bookmarking Application to Organize Your
            Links.
          </p>

          <Link href="/collections">Get Started</Link>
        </div>
      </main>

      <footer className="max-w-screen-lg mx-auto w-full px-2 sm:px-4 py-6">
        <p className="text-sm [&>a]:font-medium [&>a]:underline [&>a]:underline-offset-4">
          Crafted by{" "}
          <a href="https://github.com/moaqz" target="_blank" rel="noreferrer">
            moaqz
          </a>
          . The source code is on{" "}
          <a target="_blank" href="https://github.com/moaqz/linb" rel="noreferrer">
            Github
          </a>
          .
        </p>
      </footer>
    </div>
  );
}

export default Page;
