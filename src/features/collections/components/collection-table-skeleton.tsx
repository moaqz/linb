export function CollectionTableSkeleton() {
  return (
    <div role="status" className="mt-4 w-full animate-pulse bg-gray-200 border-2 border-[#ccc]">

      <div className="flex items-center justify-between px-6 py-3">
        <div className="h-2.5 bg-gray-300 rounded w-24"></div>
        <div className="hidden h-2.5 bg-gray-300 rounded w-24 sm:block"></div>
        <div className="hidden h-2.5 bg-gray-300 rounded w-24 sm:block"></div>
        <div className="h-2.5 bg-gray-300 rounded w-24"></div>
      </div>

      {Array.from({ length: 6 }).map((_, idx) => (
        <div className="flex items-center justify-between px-6 py-4 border-t-2 border-[#ccc]" key={idx}>
          <div className="h-2.5 bg-gray-300 rounded w-24"></div>
          <div className="hidden h-2.5 bg-gray-300 rounded w-24 sm:block"></div>
          <div className="h-6 bg-gray-300 rounded w-24"></div>
          <div className="hidden h-2.5 bg-gray-300 rounded w-24 sm:block"></div>
        </div>
      ))}

      <span className="sr-only">Loading...</span>
    </div>
  );
}
