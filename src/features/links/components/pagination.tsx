import { Button, ChevronLeftIcon, ChevronRightIcon } from "@/features/ui";

interface Props {
  currentPage: number;
  totalPages: number;
  updatePage: (n: number) => void;
}

export function Pagination({ currentPage, totalPages, updatePage }: Props) {
  const handlePrevPageClick = () => {
    if (currentPage <= 1) {
      return;
    }

    updatePage(currentPage - 1);
  };

  const handleNextPageClick = () => {
    if (currentPage >= totalPages) {
      return;
    }

    updatePage(currentPage + 1);
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      <Button onClick={handlePrevPageClick} disabled={currentPage <= 1}>
        <ChevronLeftIcon width={20} height={20} />
        <span>Prev</span>
      </Button>

      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        onClick={handleNextPageClick}
        disabled={currentPage >= totalPages}
      >
        <span>Next</span>
        <ChevronRightIcon width={20} height={20} />
      </Button>
    </div>
  );
}
