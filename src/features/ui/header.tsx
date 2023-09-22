import { UserButton } from "@clerk/nextjs";
import { Logo } from ".";

export function Header() {
  return (
    <header className="max-w-screen-lg mx-auto w-full mt-4">
      <div className="flex items-center justify-between p-4 bg-white border-2 border-black shadow-neo rounded-md">
        <Logo />
        <UserButton />
      </div>
    </header>
  );
}
