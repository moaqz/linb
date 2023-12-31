import Image from "next/image";

export function LinksEmptyState() {
  return (
    <div className="flex flex-col items-center text-center">
      <Image
        src="/illustration-found.svg"
        alt="Illustration of no result found"
        width={250}
        height={250}
      />
      <p className="mb-1 text-xl font-bold">No results found</p>
      <p className="text-gray-500">Add Links to grow your collection</p>
    </div>
  );
}
