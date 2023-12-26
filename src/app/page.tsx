import { Link, Logo } from "@/features/ui";
import Footer from "@/features/ui/footer";
import { currentUser } from "@clerk/nextjs/server";

async function Page() {
  const user = await currentUser();

  return (
    <div className="mx-auto grid h-screen max-w-screen-lg grid-rows-[auto_1fr_auto] px-4">
      <header className="mt-4 w-full">
        <div className="flex items-center justify-between rounded-md border-2 border-black bg-white p-4 shadow-neo">
          <Logo />

          {user ? (
            <Link href="/collections" size="small">
              Go to Collections
            </Link>
          ) : (
            <Link href="/sign-up" size="small">
              Sign in
            </Link>
          )}
        </div>
      </header>

      <main className="w-full">
        <div className="mt-40 max-w-sm text-left sm:max-w-xl">
          <h1 className="text-4xl font-semibold sm:text-5xl">
            Find your Favorite websites in seconds
          </h1>

          <p className="my-6 text-lg">
            A Simple and Intuitive Bookmarking Application to Organize Your
            Links.
          </p>

          <Link href="/collections">Get Started</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Page;
