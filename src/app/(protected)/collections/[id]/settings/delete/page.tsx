import { notFound } from "next/navigation";

import { getCollectionInformation } from "@/features/collections/queries";
import { ConfirmDeletion } from "@/features/collections/components";

async function Page({ params }: { params: { id: string } }) {
  const collectionId = Number(params.id);
  const [collection] = await getCollectionInformation(collectionId);

  if (collection == null) {
    notFound();
  }

  return (
    <div className="space-y-4 max-w-lg">
      <h2 className="text-xl font-semibold">Delete Collection</h2>
      <div className="p-4 text-md bg-white text-gray-600 border-2 border-black font-semibold">
        Permanently delete collection{" "}
        <span className="text-black font-bold">{collection.name}</span>. This
        action is irreversible and requires an empty collection. If there are
        any links in this collection, you cannot delete it.
      </div>

      <ConfirmDeletion collectionId={collection.id} />
    </div>
  );
}

export default Page;
