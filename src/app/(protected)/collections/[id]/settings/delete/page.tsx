import { notFound } from "next/navigation";

import { ConfirmDeletion } from "@/features/collections/components";
import { getCollectionInformation } from "@/features/collections/queries";

async function Page({ params }: { params: { id: string } }) {
  const collectionId = Number(params.id);
  const [collection] = await getCollectionInformation(collectionId);

  if (collection == null) {
    notFound();
  }

  return (
    <div className="max-w-lg space-y-4">
      <h2 className="text-xl font-semibold">Delete Collection</h2>
      <div className="text-md border-2 border-black bg-white p-4 font-semibold text-gray-600">
        Permanently delete collection{" "}
        <span className="font-bold text-black">{collection.name}</span>. This
        action is irreversible and requires an empty collection. If there are
        any links in this collection, you cannot delete it.
      </div>

      <ConfirmDeletion collectionId={collection.id} />
    </div>
  );
}

export default Page;
