export function LinkCardSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          role="status"
          className="min-h-[80px] animate-pulse px-2 py-2.5 bg-gray-200 border-2 border-[#ccc] shadow-[2px_3px_#ccc]"
        >
          <div className="h-2.5 bg-gray-300 rounded-full w-20 mb-4"></div>
          <div className="h-2.5 bg-gray-300 rounded-full w-56"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </div>
  );
}
