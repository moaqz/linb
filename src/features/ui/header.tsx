import { UserButton } from "@clerk/nextjs";
import { Logo } from ".";

export function Header() {
  return (
    <header className="mt-4 w-full">
      <div className="flex items-center justify-between rounded-md border-2 border-black bg-white p-4 shadow-neo">
        <Logo />
        <UserButton />
      </div>
    </header>
  );
}
