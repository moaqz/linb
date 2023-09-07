"use client";

import { useState } from "react";
import useSWR from "swr";

import {
  LinksEmptyState,
  Pagination,
  LinkCardSkeleton,
  LinkCard,
  LinksErrorState,
} from "@/features/links/components";
import { Link } from "../types";
import { fetcher } from "../fetcher";

type LinksResponse = {
  links: Link[];
  totalPages: number;
};

export function LinksList({ collectionId }: { collectionId: string }) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isValidating, error } = useSWR<LinksResponse>(
    `/api/collections/${collectionId}/links?page=${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
      onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
        if (error.status === 404) {
          return;
        }

        // Only retry up to 5 times.
        if (retryCount >= 5) {
          return;
        }

        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    },
  );

  const updatePage = (n: number) => {
    setPage(n);
  };

  if (!isValidating && error) {
    return <LinksErrorState />;
  }

  if (isLoading || isValidating || !data) {
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
