import { LinkCardSkeleton } from "@/features/links/components";

export default function Loading() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="mb-4 h-10 w-28 bg-gray-300" />
        <div className="mb-4 h-10 w-16 bg-gray-300" />
      </div>
      <LinkCardSkeleton />
      <div className="mt-4 flex items-center justify-between">
        <div className="mb-4 h-10 w-16 bg-gray-300" />
        <div className="mb-4 h-10 w-16 bg-gray-300" />
      </div>
    </div>
  );
}
