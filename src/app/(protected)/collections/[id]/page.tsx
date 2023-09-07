import Link from "next/link";

import { LinksList, CreateLinkModal } from "@/features/links/components";
import { ArrowLongLeftIcon } from "@/features/ui";

function Page({ params }: { params: { id: string } }) {
  return (
    <section className="pb-20">
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/collections"
          className="group text-xl sm:text-2xl font-semibold inline-flex items-center gap-1"
        >
          <ArrowLongLeftIcon
            className="group-hover:-translate-x-1 group-hover:transition-transform"
            width={24}
            height={24}
          />
          <span>Collections</span>
        </Link>

        <CreateLinkModal collectionId={params.id} />
      </div>

      <LinksList collectionId={params.id} />
    </section>
  );
}

export default Page;
