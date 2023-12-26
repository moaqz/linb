import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

import { getCollectionById } from "@/features/collections/queries";
import {
  CreateLinkModal,
  LinkCard,
  LinksEmptyState,
  Pagination,
} from "@/features/links/components";
import { getTotalUserLinks, getUserLinks } from "@/features/links/queries";
import { ArrowLongLeftIcon } from "@/features/ui";
import { AuthRequiredError } from "@/lib/expection";
import { notFound } from "next/navigation";

const LIMIT_PER_PAGE = 12;

async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const collectionId = Number(params.id);
  const user = await currentUser();
  if (user == null) {
    throw new AuthRequiredError();
  }

  const [collection] = await getCollectionById(collectionId);
  if (!collection || collection.userId !== user.id) {
    notFound();
  }

  // Number of records to skip
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const offset = (page - 1) * LIMIT_PER_PAGE;

  const totalRecords = await getTotalUserLinks({
    collectionId,
    userId: user.id,
  });
  const totalPageCount = Math.ceil(totalRecords.counter / LIMIT_PER_PAGE);

  const links = await getUserLinks({
    collectionId,
    userId: user.id,
    limit: LIMIT_PER_PAGE,
    offset,
  });

  return (
    <section className="pb-20">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/collections"
          className="group inline-flex items-center gap-1 text-xl font-semibold sm:text-2xl"
        >
          <ArrowLongLeftIcon
            className="group-hover:-translate-x-1 group-hover:transition-transform"
            width={24}
            height={24}
          />
          <span>{collection.name}</span>
        </Link>

        <CreateLinkModal collectionId={params.id} />
      </div>

      {links && links.length === 0 ? (
        <LinksEmptyState />
      ) : (
        <div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {links.map((link) => (
              <LinkCard key={link.id} link={link} collectionId={collectionId} />
            ))}
          </div>

          <Pagination
            collectionId={collectionId}
            currentPage={page}
            totalPages={totalPageCount}
          />
        </div>
      )}
    </section>
  );
}

export default Page;
