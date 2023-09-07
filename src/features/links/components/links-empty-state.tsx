import Image from "next/image";

export function LinksEmptyState() {
  return (
    <div className="text-center flex flex-col items-center">
      <Image
        src="/illustration-found.svg"
        alt="Illustration of no result found"
        width={250}
        height={250}
      />
      <p className="text-xl font-bold mb-1">No results found</p>
      <p className="text-gray-500">Add Links to grow your collection</p>
    </div>
  );
}
