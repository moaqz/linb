import { CollectionTableSkeleton } from "@/features/collections/components";

export default function Loading() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className=" bg-gray-300 w-28 h-10 mb-4"></div>
        <div className=" bg-gray-300 w-28 h-10 mb-4"></div>
      </div>
      <CollectionTableSkeleton />
    </div>
  );
}
