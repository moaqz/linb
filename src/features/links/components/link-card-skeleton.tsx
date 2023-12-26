export function LinkCardSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={idx}
          role="status"
          className="min-h-[80px] animate-pulse border-2 border-[#ccc] bg-gray-200 px-2 py-2.5 shadow-[2px_3px_#ccc]"
        >
          <div className="mb-4 h-2.5 w-20 rounded-full bg-gray-300" />
          <div className="h-2.5 w-56 rounded-full bg-gray-300" />
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </div>
  );
}
