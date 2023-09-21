import { Button, ChevronLeftIcon, ChevronRightIcon, Link } from "@/features/ui";

export function Pagination({ currentPage, totalPages, collectionId }: {
  currentPage: number,
  totalPages: number,
  collectionId: number
}) {
  const BASE_URL = `/collections/${collectionId}?page=`;

  return (
    <div className="mt-4 flex items-center justify-between">
      {currentPage <= 1
        ? <Button disabled>
          <ChevronLeftIcon width={20} height={20} />
          <span>Prev</span>
        </Button>
        : <Link href={`${BASE_URL}${currentPage - 1}`}>
          <ChevronLeftIcon width={20} height={20} />
          <span>Prev</span>
        </Link>}

      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage >= totalPages
        ? <Button>
          <span>Next</span>
          <ChevronRightIcon width={20} height={20} />
        </Button>
        : <Link href={`${BASE_URL}${currentPage + 1}`}>
          <span>Next</span>
          <ChevronRightIcon width={20} height={20} />
        </Link>}
    </div>
  );
}
