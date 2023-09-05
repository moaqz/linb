"use client";

import CreateLinkDialog from "@/components/create-link-dialog";
import LinksList from "@/components/links-list";
import { ArrowLongLeftIcon } from "@/components/ui/icons";
import Link from "next/link";
import { useState } from "react";

function Page({ params }: { params: { id: string } }) {
  const [page, setPage] = useState(1);

  const updatePage = (n: number) => {
    setPage(n);
  };

  return (
    <section className="pb-20">
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/collections"
          className="text-xl sm:text-2xl font-semibold inline-flex items-center gap-1 transition-all hover:underline"
        >
          <ArrowLongLeftIcon width={24} height={24} />
          Collections
        </Link>
        <CreateLinkDialog page={page} collectionId={params.id} />
      </div>

      <LinksList collectionId={params.id} page={page} updatePage={updatePage} />
    </section>
  );
}

export default Page;
