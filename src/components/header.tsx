import { UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <header className="mb-6 border-b-2 border-b-black bg-white">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Linb</h1>
        <UserButton />
      </div>
    </header>
  );
}

export default Header;
