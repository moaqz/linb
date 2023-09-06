import { UserButton } from "@clerk/nextjs";
import Logo from "./logo";

function Header() {
  return (
    <header className="mb-6 border-b-2 border-b-black bg-white">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between p-4">
        <Logo />
        <UserButton />
      </div>
    </header>
  );
}

export default Header;