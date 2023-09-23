import { LinkCardSkeleton } from "@/features/links/components";

export default function Loading() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className=" bg-gray-300 w-28 h-10 mb-4"></div>
        <div className=" bg-gray-300 w-16 h-10 mb-4"></div>
      </div>
      <LinkCardSkeleton />
      <div className="flex items-center justify-between mt-4">
        <div className=" bg-gray-300 w-16 h-10 mb-4"></div>
        <div className=" bg-gray-300 w-16 h-10 mb-4"></div>
      </div>
    </div>
  );
}
