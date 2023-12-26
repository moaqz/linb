export function CollectionTableSkeleton() {
  return (
    <div
      role="status"
      className="mt-4 w-full animate-pulse border-2 border-[#ccc] bg-gray-200"
    >
      <div className="flex items-center justify-between px-6 py-3">
        <div className="h-2.5 w-24 rounded bg-gray-300" />
        <div className="hidden h-2.5 w-24 rounded bg-gray-300 sm:block" />
        <div className="hidden h-2.5 w-24 rounded bg-gray-300 sm:block" />
        <div className="h-2.5 w-24 rounded bg-gray-300" />
      </div>

      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          className="flex items-center justify-between border-t-2 border-[#ccc] px-6 py-4"
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={idx}
        >
          <div className="h-2.5 w-24 rounded bg-gray-300" />
          <div className="hidden h-2.5 w-24 rounded bg-gray-300 sm:block" />
          <div className="h-6 w-24 rounded bg-gray-300" />
          <div className="hidden h-2.5 w-24 rounded bg-gray-300 sm:block" />
        </div>
      ))}

      <span className="sr-only">Loading...</span>
    </div>
  );
}
