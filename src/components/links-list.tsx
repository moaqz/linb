"use client";

import Link from "next/link";
import useSWR from "swr";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LinkIcon,
  PencilSquareIcon,
  TrashIcon,
} from "./ui/icons";
import LinkCardSkeleton from "./skeletons/link-card-skeleton";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Link = {
  id: number;
  name: string;
  url: string;
};

type LinksResponse = {
  links: Link[];
  totalPages: number;
};

function LinkCard(props: Link) {
  return (
    <div className="relative">
      <Link
        href={props.url}
        target="_blank"
        className="border-2 border-black bg-white shadow-[2px_3px] px-2 py-2.5 transition-shadow hover:shadow-none flex flex-col gap-1"
      >
        <span className="font-semibold">{props.name}</span>
        <div className="inline-flex items-center gap-1 text-gray-600">
          <LinkIcon width={14} height={14} />
          <span className="text-sm">{props.url}</span>
        </div>
      </Link>

      <div className="flex items-center gap-1 absolute top-0 right-0 p-3">
        <button className="text-red-400">
          <TrashIcon width={16} height={16} />
        </button>
        <button className="text-green-600">
          <PencilSquareIcon width={16} height={16} />
        </button>
      </div>
    </div>
  );
}

function LinksEmptyState() {
  return (
    <div className="text-center flex flex-col items-center">
      <Image
        src="/result-not-found-illustration.svg"
        alt="Illustration of no result found"
        width={250}
        height={250}
      />
      <p className="text-xl font-bold mb-1">No results found</p>
      <p className="text-gray-500">Add Links to grow your collection</p>
    </div>
  );
}

interface IPagination {
  currentPage: number;
  totalPages: number;
  updatePage: (n: number) => void;
}

function Pagination(props: IPagination) {
  const handlePrevPageClick = () => {
    if (props.currentPage <= 1) {
      return;
    }

    props.updatePage(props.currentPage - 1);
  };

  const handleNextPageClick = () => {
    if (props.currentPage >= props.totalPages) {
      return;
    }

    props.updatePage(props.currentPage + 1);
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      <button
        className="inline-flex items-center gap-2 w-fit px-2 py-1.5 bg-yellow-400 border-2 border-black font-semibold shadow-[2px_3px] transition-shadow hover:shadow-none disabled:cursor-not-allowed"
        onClick={handlePrevPageClick}
        disabled={props.currentPage <= 1} // Disable when on the first page.
      >
        <ChevronLeftIcon width={20} height={20} />
        <span>Prev</span>
      </button>

      <span className="font-semibold">
        Page {props.currentPage} of {props.totalPages}
      </span>

      <button
        className="inline-flex items-center gap-2 w-fit px-2 py-1.5 bg-yellow-400 border-2 border-black font-semibold shadow-[2px_3px] transition-shadow hover:shadow-none disabled:cursor-not-allowed"
        onClick={handleNextPageClick}
        disabled={props.currentPage >= props.totalPages} // Disable on the last page.
      >
        <span>Next</span>
        <ChevronRightIcon width={20} height={20} />
      </button>
    </div>
  );
}

function LinksList({
  collectionId,
  page,
  updatePage,
}: {
  collectionId: string;
  page: number;
  updatePage: (n: number) => void;
}) {
  const { data, isLoading } = useSWR<LinksResponse>(
    `/api/collections/${collectionId}/links?page=${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  if (isLoading || !data) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => {
          return <LinkCardSkeleton key={idx} />;
        })}
      </div>
    );
  }

  if (!isLoading && data?.links && data.links.length === 0) {
    return <LinksEmptyState />;
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.links.map((link) => {
          return <LinkCard key={link.id} {...link} />;
        })}
      </div>
      <Pagination
        currentPage={page}
        totalPages={data.totalPages}
        updatePage={updatePage}
      />
    </>
  );
}

export default LinksList;
